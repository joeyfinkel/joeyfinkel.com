import { createFileRoute, notFound } from '@tanstack/react-router';
import { LibraryGroup } from '../-jfdevelops/components/group';
import { CatalogNotFound } from '../-jfdevelops/components/not-found';
import { loadCatalog } from '../-jfdevelops/utils/load';

export const Route = createFileRoute(
	'/projects/jfdevelops/categories/$category',
)({
	component: CategoryPage,
	notFoundComponent: CatalogNotFound,
	loader: async ({ params }) => {
		const catalog = await loadCatalog({ category: params.category });

		if (!catalog.selectedGroup) {
			throw notFound();
		}

		return catalog.selectedGroup;
	},
});

function CategoryPage() {
	const group = Route.useLoaderData();

	return <LibraryGroup group={group} />;
}
