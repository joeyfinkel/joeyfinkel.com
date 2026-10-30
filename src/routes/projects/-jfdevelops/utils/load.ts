import { notFound } from '@tanstack/react-router';
import { catalogViewSchema } from '@/projects/schema';

export async function loadCatalog(selection: {
	category?: string;
	library?: string;
}) {
	const params = new URLSearchParams();

	if (selection.category) {
		params.set('category', selection.category);
	}

	if (selection.library) {
		params.set('library', selection.library);
	}

	const response = await fetch(`/api/projects/jfdevelops?${params}`, {
		signal: AbortSignal.timeout(10000),
	});

	if (response.status === 404) {
		throw notFound();
	}

	if (!response.ok) {
		throw new Error('Library catalog unavailable');
	}

	return catalogViewSchema.parse(await response.json());
}
