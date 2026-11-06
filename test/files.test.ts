import { createExecutionContext } from 'cloudflare:test';
import { env } from 'cloudflare:workers';
import { beforeEach, expect, it } from 'vitest';
import { maxFileBytes } from '../src/files/schema';
import worker from '../worker';

const origin = 'https://joeyfinkel.com';
const password = 'test-only-files-password';

async function request(path: string, init?: RequestInit) {
	const headers = new Headers(init?.headers);
	headers.set('Host', 'joeyfinkel.com');
	headers.set('CF-Connecting-IP', crypto.randomUUID());

	return worker.fetch(
		new Request(origin + path, { ...init, headers }),
		env,
		createExecutionContext(),
	);
}

function put(name: string, body: BodyInit, token = password) {
	return request(`/api/files/${encodeURIComponent(name)}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'text/plain',
		},
		body,
	});
}

beforeEach(async () => {
	const objects = await env.RESUMES.list();
	await env.RESUMES.delete(objects.objects.map((object) => object.key));
});

it('lists no files before anything is uploaded', async () => {
	const response = await request('/api/files');

	expect(response.status).toBe(200);
	expect(await response.json()).toEqual({ files: [] });
});

it('rejects uploads with a missing or wrong password', async () => {
	const missing = await request('/api/files/notes.txt', {
		method: 'PUT',
		body: 'hello',
	});
	const wrong = await put('notes.txt', 'hello', 'wrong-password');

	expect(missing.status).toBe(401);
	expect(wrong.status).toBe(401);
	expect(await env.RESUMES.head('files/notes.txt')).toBeNull();
});

it('stores an upload, lists it, and serves it as a sandboxed download', async () => {
	const uploaded = await put('My Notes (1).txt', 'hello');

	expect(uploaded.status).toBe(201);

	const list = await request('/api/files');
	const { files } = await list.json<{
		files: { name: string; href: string; size: number; source: string }[];
	}>();

	expect(files).toEqual([
		expect.objectContaining({
			name: 'My Notes (1).txt',
			size: 5,
			source: 'upload',
		}),
	]);

	const download = await request(files[0].href);

	expect(await download.text()).toBe('hello');
	expect(download.headers.get('Content-Disposition')).toContain('attachment');
	expect(download.headers.get('Content-Security-Policy')).toBe('sandbox');
	expect(download.headers.get('X-Content-Type-Options')).toBe('nosniff');
});

it('replaces a file uploaded with the same name', async () => {
	await put('notes.txt', 'first');
	await put('notes.txt', 'second version');

	const download = await request('/api/files/notes.txt');
	const { files } = await (await request('/api/files')).json<{
		files: unknown[];
	}>();

	expect(await download.text()).toBe('second version');
	expect(files).toHaveLength(1);
});

// This crosses R2's 1,000-object page boundary with real storage writes.
// Allow slower CI workers enough time for fixture creation and pagination.
it('lists uploads across every storage page', async () => {
	await Promise.all(
		Array.from({ length: 1001 }, (_, index) =>
			env.RESUMES.put(`files/file-${index}.txt`, 'x'),
		),
	);

	const { files } = await (await request('/api/files')).json<{
		files: { name: string }[];
	}>();

	expect(files).toHaveLength(1001);
	expect(files.map((file) => file.name)).toContain('file-1000.txt');
}, 15_000);

it('rejects unsafe names, empty files, and oversized files', async () => {
	expect((await put('../secret.txt', 'x')).status).toBe(400);
	expect((await put('.hidden', 'x')).status).toBe(400);
	expect((await put('empty.txt', '')).status).toBe(400);
	expect((await put('big.bin', new Uint8Array(maxFileBytes + 1))).status).toBe(
		413,
	);
	expect((await request('/api/files/missing.txt')).status).toBe(404);
});

it('lists the published resume files with how they were uploaded', async () => {
	const publishedAt = new Date().toISOString();

	await env.RESUMES.put(
		'current.json',
		JSON.stringify({
			revision: 'a'.repeat(8) + '-aaaa-4aaa-8aaa-' + 'a'.repeat(12),
			publishedAt,
			experience: [
				{
					company: 'Example',
					role: 'Developer',
					start: '2024-01',
					period: '2024 - Present',
					location: 'Remote',
					highlights: ['Built things'],
					technologies: [],
				},
			],
		}),
	);
	await env.RESUMES.put(
		'pdfs/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa.pdf',
		new Uint8Array(3),
	);
	await env.RESUMES.put(
		'latex/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa.tex',
		new Uint8Array(4),
	);

	const { files } = await (await request('/api/files')).json<{
		files: { name: string; href: string; source: string }[];
	}>();

	expect(files.map((file) => [file.name, file.href, file.source])).toEqual(
		expect.arrayContaining([
			['Joseph_Finkel_Resume.pdf', '/resume.pdf', 'claude'],
			['Joseph_Finkel_Resume.tex', '/resume.tex', 'claude'],
		]),
	);
});
