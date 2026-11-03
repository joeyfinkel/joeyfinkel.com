import { publicationSchema } from '../../src/resume/schema';

export async function getPublication(bucket: R2Bucket) {
	const current = await bucket.get('current.json');

	if (!current) {
		return null;
	}

	const publication = publicationSchema.parse(await current.json());

	// Publications made before credentials existed have none to show.
	return {
		...publication,
		credentials: publication.credentials ?? [],
	};
}
