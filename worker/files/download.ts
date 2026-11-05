import { ResumeError } from '../resume/error';
import { parseFileName } from './name';

export async function downloadFile(
	request: Request,
	bucket: R2Bucket,
	segment: string,
) {
	const name = parseFileName(segment);
	const file = await bucket.get(`files/${name}`);

	if (!file) {
		throw new ResumeError('File not found', 404);
	}

	// Uploaded files are served as downloads from a sandbox so they can never run
	// scripts on this origin.
	return new Response(request.method === 'HEAD' ? null : file.body, {
		headers: {
			'Content-Type':
				file.httpMetadata?.contentType ?? 'application/octet-stream',
			'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(name)}`,
			'Content-Length': String(file.size),
			'Content-Security-Policy': 'sandbox',
			'Cache-Control': 'no-store',
			'X-Content-Type-Options': 'nosniff',
			ETag: file.httpEtag,
		},
	});
}
