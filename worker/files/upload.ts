import { maxFileBytes } from '../../src/files/schema';
import { readBody } from '../resume/body';
import { secretsMatch } from '../resume/crypto';
import { ResumeError } from '../resume/error';
import { parseFileName } from './name';

export async function uploadFile(request: Request, env: Env, segment: string) {
	if (!env.FILES_PASSWORD) {
		throw new ResumeError('File uploads are not configured yet', 503);
	}

	const { success } = await env.AUTH_LIMITER.limit({
		key: `files:${request.headers.get('CF-Connecting-IP') ?? 'local'}`,
	});

	if (!success) {
		throw new ResumeError('Too many attempts; try again later', 429);
	}

	const password =
		request.headers.get('authorization')?.replace(/^Bearer /, '') ?? '';

	if (!password || !(await secretsMatch(password, env.FILES_PASSWORD))) {
		throw new ResumeError('That password did not match', 401);
	}

	const name = parseFileName(segment);
	const bytes = await readBody(request, maxFileBytes);

	if (bytes.byteLength === 0) {
		throw new ResumeError('The file is empty');
	}

	await env.RESUMES.put(`files/${name}`, bytes, {
		httpMetadata: {
			contentType:
				request.headers.get('content-type') || 'application/octet-stream',
		},
	});

	return Response.json(
		{ name },
		{ status: 201, headers: { 'Cache-Control': 'no-store' } },
	);
}
