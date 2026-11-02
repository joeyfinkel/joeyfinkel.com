import { publicationSchema } from '../../src/resume/schema';
import { getDraft } from './draft';
import { ResumeError } from './error';

export async function publishResume(bucket: R2Bucket, revision: string) {
	const current = await bucket.get('current.json');
	const existing = current
		? publicationSchema.parse(await current.json())
		: null;

	if (existing?.revision === revision) {
		return existing;
	}

	const draft = await getDraft(bucket, revision);
	const pdf = await bucket.head(`pdfs/${revision}.pdf`);

	if (!pdf || pdf.customMetadata?.sha256 !== draft.pdfSha256) {
		throw new ResumeError('Upload the matching PDF before publishing', 409);
	}

	const publication = publicationSchema.parse({
		revision,
		publishedAt: new Date().toISOString(),
		experience: draft.experience,
	});
	const stored = await bucket.put('current.json', JSON.stringify(publication), {
		onlyIf: draft.baseEtag
			? { etagMatches: draft.baseEtag }
			: { etagDoesNotMatch: '*' },
		httpMetadata: { contentType: 'application/json' },
	});

	if (!stored) {
		throw new ResumeError(
			'Another resume was published; prepare again using the latest version',
			409,
		);
	}

	// Only the current resume is kept, so drop the replaced PDF and the used draft.
	const stale = [`drafts/${revision}.json`];

	if (existing) {
		stale.push(`pdfs/${existing.revision}.pdf`);
	}

	await bucket.delete(stale);

	return publication;
}
