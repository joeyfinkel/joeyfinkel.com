import { createExecutionContext } from 'cloudflare:test';
import { env } from 'cloudflare:workers';
import { PDFDocument } from 'pdf-lib';
import { beforeEach, expect, it } from 'vitest';
import { experience } from '../src/routes/-home/utils/experience';
import worker from '../worker';
import { digest } from '../worker/resume/crypto';
import { prepareResume } from '../worker/resume/prepare';
import { publishResume } from '../worker/resume/publish';

const origin = 'https://joeyfinkel.com';

async function request(path: string, init?: RequestInit) {
	const headers = new Headers(init?.headers);
	headers.set('Host', 'joeyfinkel.com');

	return worker.fetch(
		new Request(origin + path, {
			...init,
			headers,
		}),
		env,
		createExecutionContext(),
	);
}

async function pdfBytes() {
	const document = await PDFDocument.create();
	document.addPage().drawText('Joseph Finkel - master resume');

	return new Uint8Array(await document.save());
}

async function stagedResume() {
	const pdf = await pdfBytes();
	const draft = await prepareResume(env.RESUMES, origin, {
		experience,
		pdfSha256: await digest(pdf),
	});

	return { pdf, draft };
}

async function upload(staged: Awaited<ReturnType<typeof stagedResume>>) {
	return request(`/api/resume/upload/${staged.draft.revision}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/pdf',
			Authorization: `Bearer ${staged.draft.uploadToken}`,
		},
		body: staged.pdf,
	});
}

beforeEach(async () => {
	const objects = await env.RESUMES.list();
	await env.RESUMES.delete(objects.objects.map((object) => object.key));
});

it('requires OAuth authentication for MCP and exposes discovery', async () => {
	const response = await request('/mcp', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: '{}',
	});
	expect(response.status).toBe(401);
	expect(response.headers.get('WWW-Authenticate')).toContain(
		'resource_metadata',
	);
	const discovery = await request('/.well-known/oauth-authorization-server');
	expect(discovery.status).toBe(200);
	expect(await discovery.json()).toMatchObject({
		authorization_endpoint: `${origin}/authorize`,
	});
});

it('serves the initial experience before the first publication', async () => {
	const response = await request('/api/resume');
	expect(response.status).toBe(200);
	expect(await response.json()).toMatchObject({
		revision: null,
		experience: JSON.parse(JSON.stringify(experience)),
		resumeUrl: '/resume.pdf',
	});
});

it('keeps drafts private and refuses publishing before upload', async () => {
	const { draft } = await stagedResume();
	expect((await request(`/resume.pdf?revision=${draft.revision}`)).status).toBe(
		404,
	);
	await expect(publishResume(env.RESUMES, draft.revision)).rejects.toThrow(
		'Upload the matching PDF',
	);
	expect(await env.RESUMES.get('current.json')).toBeNull();
});

it('rejects unauthorized uploads and mismatched PDF bytes', async () => {
	const staged = await stagedResume();
	const response = await request(
		`/api/resume/upload/${staged.draft.revision}`,
		{ method: 'PUT', body: staged.pdf },
	);
	expect(response.status).toBe(401);
	const badPdf = await request(`/api/resume/upload/${staged.draft.revision}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/pdf',
			Authorization: `Bearer ${staged.draft.uploadToken}`,
		},
		body: 'not the prepared PDF',
	});
	expect(badPdf.status).toBe(400);
	expect(
		await env.RESUMES.head(`pdfs/${staged.draft.revision}.pdf`),
	).toBeNull();
});

it('publishes a matching pair, preserves exact PDF bytes, and is idempotent', async () => {
	const staged = await stagedResume();
	expect((await upload(staged)).status).toBe(200);
	expect((await upload(staged)).status).toBe(409);
	const publication = await publishResume(env.RESUMES, staged.draft.revision);
	expect(
		(await publishResume(env.RESUMES, staged.draft.revision)).revision,
	).toBe(publication.revision);
	const response = await request('/api/resume');
	const data = await response.json<{ revision: string; resumeUrl: string }>();
	expect(data.revision).toBe(publication.revision);
	expect(response.headers.get('Cache-Control')).toBe('no-store');
	const pdf = await request(data.resumeUrl);
	expect(pdf.headers.get('Content-Type')).toBe('application/pdf');
	expect(new Uint8Array(await pdf.arrayBuffer())).toEqual(staged.pdf);
	const head = await request('/resume.pdf', { method: 'HEAD' });
	expect(await head.text()).toBe('');
	expect(head.headers.get('Content-Type')).toBe('application/pdf');
});

it('rejects stale publications without replacing the current resume', async () => {
	const first = await stagedResume();
	const second = await stagedResume();
	await upload(first);
	await upload(second);
	await publishResume(env.RESUMES, first.draft.revision);
	await expect(
		publishResume(env.RESUMES, second.draft.revision),
	).rejects.toThrow('Another resume was published');
	const response = await request('/api/resume');
	expect(await response.json()).toMatchObject({
		revision: first.draft.revision,
	});
	expect(
		(await request(`/resume.pdf?revision=${second.draft.revision}`)).status,
	).toBe(404);
});

it('keeps historical PDFs available for an already rendered timeline', async () => {
	const first = await stagedResume();
	await upload(first);
	await publishResume(env.RESUMES, first.draft.revision);
	const second = await stagedResume();
	await upload(second);
	await publishResume(env.RESUMES, second.draft.revision);
	const oldPdf = await request(`/resume.pdf?revision=${first.draft.revision}`);
	expect(oldPdf.status).toBe(200);
	expect(new Uint8Array(await oldPdf.arrayBuffer())).toEqual(first.pdf);
});

it('expires upload credentials and validates PDF structure, body size, and metadata', async () => {
	const staged = await stagedResume();
	const object = await env.RESUMES.get(`drafts/${staged.draft.revision}.json`);
	const draft = await object?.json<Record<string, unknown>>();
	await env.RESUMES.put(
		`drafts/${staged.draft.revision}.json`,
		JSON.stringify({ ...draft, expiresAt: 0 }),
	);
	expect((await upload(staged)).status).toBe(410);
	await expect(
		prepareResume(env.RESUMES, origin, {
			experience: [{ ...experience[0], logo: 'https://evil.test/tracker' }],
			pdfSha256: 'a'.repeat(64),
		}),
	).rejects.toThrow();
	const invalid = new TextEncoder().encode('%PDF-1.7 not a document');
	const invalidDraft = await prepareResume(env.RESUMES, origin, {
		experience,
		pdfSha256: await digest(invalid),
	});
	const invalidUpload = await request(
		`/api/resume/upload/${invalidDraft.revision}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/pdf',
				Authorization: `Bearer ${invalidDraft.uploadToken}`,
			},
			body: invalid,
		},
	);
	expect(invalidUpload.status).toBe(400);
	const oversized = await request(
		`/api/resume/upload/${invalidDraft.revision}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/pdf',
				Authorization: `Bearer ${invalidDraft.uploadToken}`,
			},
			body: new Uint8Array(2 * 1024 * 1024 + 1),
		},
	);
	expect(oversized.status).toBe(413);
});
