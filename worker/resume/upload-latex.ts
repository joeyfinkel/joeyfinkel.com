import { readBody } from './body';
import { digest } from './crypto';
import { ResumeError } from './error';

export async function uploadLatex(
	request: Request,
	bucket: R2Bucket,
	revision: string,
	expectedSha256: string,
) {
	const bytes = await readBody(request, 512 * 1024);

	if ((await digest(bytes)) !== expectedSha256) {
		throw new ResumeError(
			'LaTeX checksum does not match the prepared publication',
		);
	}

	try {
		const source = new TextDecoder('utf-8', { fatal: true }).decode(bytes);

		if (!source.includes('\\documentclass')) {
			throw new Error('Not a LaTeX document');
		}
	} catch {
		throw new ResumeError('Upload must be a UTF-8 LaTeX document');
	}

	const stored = await bucket.put(`latex/${revision}.tex`, bytes, {
		onlyIf: { etagDoesNotMatch: '*' },
		httpMetadata: { contentType: 'application/x-tex; charset=utf-8' },
		customMetadata: { sha256: expectedSha256 },
	});

	if (!stored) {
		throw new ResumeError('This draft already has an uploaded LaTeX file', 409);
	}

	return Response.json(
		{ revision, uploaded: true, kind: 'latex' },
		{ headers: { 'Cache-Control': 'no-store' } },
	);
}
