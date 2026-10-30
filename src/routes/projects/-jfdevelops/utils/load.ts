import { catalogSchema } from '@/projects/schema';

export async function loadCatalog() {
	const response = await fetch('/api/projects/jfdevelops', {
		signal: AbortSignal.timeout(10000),
	});

	if (!response.ok) {
		throw new Error('Library catalog unavailable');
	}

	return catalogSchema.parse(await response.json());
}
