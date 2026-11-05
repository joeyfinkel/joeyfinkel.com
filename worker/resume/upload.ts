import { PDFDocument } from 'pdf-lib';
import { readBody } from './body';
import { digest, secretsMatch } from './crypto';
import { getDraft } from './draft';
import { ResumeError } from './error';
import { uploadLatex } from './upload-latex';

export async function uploadResume(
	request: Request,
	bucket: R2Bucket,
	revision: string,
) {
	const draft = await getDraft(bucket, revision);
	const token =
		request.headers.get('authorization')?.replace(/^Bearer /, '') ?? '';

	if (
		!token ||
		!(await secretsMatch(await digest(token), draft.uploadTokenHash))
	) {
		throw new ResumeError('Invalid upload token', 401);
	}

	const contentType = request.headers.get('content-type')?.split(';')[0];

	if (contentType === 'application/x-tex') {
		return uploadLatex(request, bucket, revision, draft.latexSha256);
	}

	if (contentType !== 'application/pdf') {
		throw new ResumeError(
			'Upload must be application/pdf or application/x-tex',
			415,
		);
	}

	const bytes = await readBody(request, 2 * 1024 * 1024);

	if ((await digest(bytes)) !== draft.pdfSha256) {
		throw new ResumeError(
			'PDF checksum does not match the prepared publication',
		);
	}

	try {
		const document = await PDFDocument.load(bytes, { updateMetadata: false });

		if (document.getPageCount() < 1) {
			throw new Error('No pages');
		}
	} catch {
		throw new ResumeError('Upload must be a readable, unencrypted PDF');
	}

	const stored = await bucket.put(`pdfs/${revision}.pdf`, bytes, {
		onlyIf: { etagDoesNotMatch: '*' },
		httpMetadata: { contentType: 'application/pdf' },
		customMetadata: { sha256: draft.pdfSha256 },
	});

	if (!stored) {
		throw new ResumeError('This draft already has an uploaded PDF', 409);
	}

	return Response.json(
		{ revision, uploaded: true },
		{ headers: { 'Cache-Control': 'no-store' } },
	);
}
