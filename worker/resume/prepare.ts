import { experienceSchema } from '../../src/resume/schema';
import { digest } from './crypto';
import { draftSchema } from './draft';

export async function prepareResume(
	bucket: R2Bucket,
	origin: string,
	input: {
		experience: unknown;
		pdfSha256: string;
	},
) {
	const experience = experienceSchema.parse(input.experience);
	const current = await bucket.head('current.json');
	const revision = crypto.randomUUID();
	const uploadToken = Array.from(
		crypto.getRandomValues(new Uint8Array(32)),
		(byte) => byte.toString(16).padStart(2, '0'),
	).join('');
	const draft = draftSchema.parse({
		revision,
		expiresAt: Date.now() + 15 * 60 * 1000,
		baseEtag: current?.etag ?? null,
		uploadTokenHash: await digest(uploadToken),
		pdfSha256: input.pdfSha256,
		experience,
	});

	await bucket.put(`drafts/${revision}.json`, JSON.stringify(draft));

	return {
		revision,
		expiresAt: new Date(draft.expiresAt).toISOString(),
		uploadUrl: `${origin}/api/resume/upload/${revision}`,
		uploadToken,
		instruction:
			'PUT the exact PDF bytes with Content-Type: application/pdf and Authorization: Bearer <uploadToken>. Then call publish_resume with this revision. Never put the token in a URL.',
	};
}
