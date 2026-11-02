import { createFileRoute, notFound } from '@tanstack/react-router';
import { Jfdevelops } from './-components/content';
import { LibraryGroup } from './-components/group';
import { loadCatalog } from './-utils/load';

export const Route = createFileRoute(
	'/projects/jfdevelops/categories/$category',
)({
	component: CategoryPage,
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

	return (
		<Jfdevelops>
			<LibraryGroup group={group} />
		</Jfdevelops>
	);
}
