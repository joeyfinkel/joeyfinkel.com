import { publicationSchema } from '../../src/resume/schema';
import { ResumeError } from './error';

export async function getPublication(bucket: R2Bucket, revision?: string) {
	const current = await bucket.get('current.json');
	const latest = current ? publicationSchema.parse(await current.json()) : null;

	if (!revision || revision === latest?.revision) {
		return latest;
	}

	const archived = await bucket.get(`published/${revision}.json`);

	if (!archived) {
		throw new ResumeError('Published resume not found', 404);
	}

	return publicationSchema.parse(await archived.json());
}
