import type { FileList } from '../../src/files/schema';
import { getPublication } from '../resume/publication';

type Entry = FileList['files'][number];

async function listUploadedFiles(bucket: R2Bucket) {
	const files: Entry[] = [];
	let cursor: string | undefined;

	do {
		const listing = await bucket.list({
			prefix: 'files/',
			limit: 1000,
			cursor,
		});

		files.push(
			...listing.objects.map((object) => {
				const name = object.key.slice('files/'.length);

				return {
					name,
					href: `/api/files/${encodeURIComponent(name)}`,
					size: object.size,
					uploadedAt: object.uploaded.toISOString(),
					source: 'upload' as const,
				};
			}),
		);

		cursor = listing.truncated ? listing.cursor : undefined;
	} while (cursor);

	return files;
}

export async function listFiles(bucket: R2Bucket) {
	const [files, publication] = await Promise.all([
		listUploadedFiles(bucket),
		getPublication(bucket),
	]);

	if (publication) {
		const [pdf, latex] = await Promise.all([
			bucket.head(`pdfs/${publication.revision}.pdf`),
			bucket.head(`latex/${publication.revision}.tex`),
		]);

		if (pdf) {
			files.push({
				name: 'Joseph_Finkel_Resume.pdf',
				href: '/resume.pdf',
				size: pdf.size,
				uploadedAt: publication.publishedAt,
				source: 'claude',
			});
		}

		if (latex) {
			files.push({
				name: 'Joseph_Finkel_Resume.tex',
				href: '/resume.tex',
				size: latex.size,
				uploadedAt: publication.publishedAt,
				source: 'claude',
			});
		}
	}

	files.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));

	return Response.json({ files }, { headers: { 'Cache-Control': 'no-store' } });
}
