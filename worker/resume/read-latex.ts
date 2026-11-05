import { getPublication } from './publication';

export async function readLatex(request: Request, env: Env) {
	const publication = await getPublication(env.RESUMES);
	const latex = publication
		? await env.RESUMES.get(`latex/${publication.revision}.tex`)
		: null;

	if (!latex) {
		return Response.json(
			{ error: 'No LaTeX source has been published' },
			{ status: 404, headers: { 'Cache-Control': 'no-store' } },
		);
	}

	return new Response(request.method === 'HEAD' ? null : latex.body, {
		headers: {
			'Content-Type': 'application/x-tex; charset=utf-8',
			'Content-Disposition': 'inline; filename="Joseph_Finkel_Resume.tex"',
			'Content-Length': String(latex.size),
			'Cache-Control': 'no-store',
			'X-Content-Type-Options': 'nosniff',
			ETag: latex.httpEtag,
		},
	});
}
