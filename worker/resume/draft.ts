import { z } from 'zod';
import { experienceSchema } from '../../src/resume/schema';
import { ResumeError } from './error';

export const draftSchema = z.object({
	revision: z.uuid(),
	expiresAt: z.number(),
	baseEtag: z.string().nullable(),
	uploadTokenHash: z.string(),
	pdfSha256: z.string().regex(/^[a-f0-9]{64}$/),
	experience: experienceSchema,
});

export async function getDraft(bucket: R2Bucket, revision: string) {
	const key = z.uuid().parse(revision);
	const object = await bucket.get(`drafts/${key}.json`);

	if (!object) {
		throw new ResumeError('Resume draft not found', 404);
	}

	const draft = draftSchema.parse(await object.json());

	if (draft.expiresAt < Date.now()) {
		throw new ResumeError(
			'Resume draft expired; prepare a new publication',
			410,
		);
	}

	return draft;
}
