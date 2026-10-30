import { createFileRoute } from '@tanstack/react-router';
import { CatalogBrowser } from './-jfdevelops/components/browser';
import { CatalogError } from './-jfdevelops/components/error';
import { CatalogNotFound } from './-jfdevelops/components/not-found';
import { loadCatalog } from './-jfdevelops/utils/load';
import { JfdevelopsPage } from './-jfdevelops/utils/page';

export const Route = createFileRoute('/projects/jfdevelops')({
	component: JfdevelopsLayout,
	loader: () => loadCatalog({}),
	errorComponent: CatalogError,
	notFoundComponent: CatalogNotFound,
});

function JfdevelopsLayout() {
	const catalog = Route.useLoaderData();

	return (
		<JfdevelopsPage
			category={`${catalog.publishedLibraryCount} published libraries`}
		>
			<CatalogBrowser catalog={catalog} />
		</JfdevelopsPage>
	);
}
