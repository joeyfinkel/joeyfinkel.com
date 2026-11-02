import { createFileRoute, notFound } from '@tanstack/react-router';
import { LibraryDetail } from '../-jfdevelops/components/library';
import { loadCatalog } from '../-jfdevelops/utils/load';

export const Route = createFileRoute('/projects/jfdevelops/$library')({
	component: PackagePage,
	loader: async ({ params }) => {
		const catalog = await loadCatalog({
			library: `@jfdevelops/${params.library}`,
		});

		if (!catalog.selectedLibrary || !catalog.selectedGroup) {
			throw notFound();
		}

		return { library: catalog.selectedLibrary, group: catalog.selectedGroup };
	},
});

function PackagePage() {
	const { library, group } = Route.useLoaderData();

	return <LibraryDetail library={library} group={group} />;
}
