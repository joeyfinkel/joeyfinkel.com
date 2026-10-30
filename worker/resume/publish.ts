import { publicationSchema } from '../../src/resume/schema';
import { getDraft } from './draft';
import { ResumeError } from './error';

export async function publishResume(bucket: R2Bucket, revision: string) {
	const draft = await getDraft(bucket, revision);
	const current = await bucket.get('current.json');
	const existing = current
		? publicationSchema.parse(await current.json())
		: null;

	if (existing?.revision === revision) {
		await bucket.put(`published/${revision}.json`, JSON.stringify(existing));

		return existing;
	}

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

	// The current record switches both public resources in one conditional write.
	// Archive only successful publications so a draft URL never exposes a PDF.
	await bucket.put(`published/${revision}.json`, JSON.stringify(publication));

	return publication;
}
