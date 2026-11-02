import { publicationSchema } from '../../src/resume/schema';

export async function getPublication(bucket: R2Bucket) {
	const current = await bucket.get('current.json');

	return current ? publicationSchema.parse(await current.json()) : null;
}
