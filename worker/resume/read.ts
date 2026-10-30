import { z } from 'zod';
import { experience } from '../../src/routes/-home/utils/experience';
import { ResumeError } from './error';
import { getPublication } from './publication';

export async function readResume(request: Request, env: Env) {
	const url = new URL(request.url);
	const requestedRevision = url.searchParams.get('revision');
	const revision = requestedRevision
		? z.uuid().parse(requestedRevision)
		: undefined;
	const publication = await getPublication(env.RESUMES, revision);

	if (url.pathname === '/api/resume') {
		return Response.json(
			{
				revision: publication?.revision ?? null,
				experience: publication?.experience ?? experience,
				resumeUrl: publication
					? `/resume.pdf?revision=${publication.revision}`
					: '/resume.pdf',
			},
			{ headers: { 'Cache-Control': 'no-store' } },
		);
	}

	if (!publication) {
		const initial = await env.ASSETS.fetch(
			new Request(new URL('/resume.pdf', request.url)),
		);
		const headers = new Headers(initial.headers);
		headers.set('Cache-Control', 'no-store');

		return new Response(request.method === 'HEAD' ? null : initial.body, {
			status: initial.status,
			headers,
		});
	}

	const pdf = await env.RESUMES.get(`pdfs/${publication.revision}.pdf`);

	if (!pdf) {
		throw new ResumeError('Published PDF unavailable', 503);
	}

	return new Response(request.method === 'HEAD' ? null : pdf.body, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'inline; filename="Joseph_Finkel_Resume.pdf"',
			'Content-Length': String(pdf.size),
			'Cache-Control': 'no-store',
			'X-Content-Type-Options': 'nosniff',
			ETag: pdf.httpEtag,
		},
	});
}
