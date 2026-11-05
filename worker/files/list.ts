import type { FileList } from '../../src/files/schema';
import { getPublication } from '../resume/publication';

type Entry = FileList['files'][number];

export async function listFiles(bucket: R2Bucket) {
	const [listing, publication] = await Promise.all([
		bucket.list({ prefix: 'files/', limit: 1000 }),
		getPublication(bucket),
	]);
	const files: Entry[] = listing.objects.map((object) => {
		const name = object.key.slice('files/'.length);

		return {
			name,
			href: `/api/files/${encodeURIComponent(name)}`,
			size: object.size,
			uploadedAt: object.uploaded.toISOString(),
			source: 'upload',
		};
	});

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
