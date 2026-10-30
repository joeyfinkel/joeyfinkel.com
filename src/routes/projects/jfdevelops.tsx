import { createFileRoute, Link } from '@tanstack/react-router';
import { catalogSearchSchema } from '@/projects/schema';
import { CatalogBrowser } from './-jfdevelops/components/browser';
import { CatalogError } from './-jfdevelops/components/error';
import { loadCatalog } from './-jfdevelops/utils/load';
import { JfdevelopsPage } from './-jfdevelops/utils/page';

export const Route = createFileRoute('/projects/jfdevelops')({
	component: Jfdevelops,
	validateSearch: catalogSearchSchema,
	loaderDeps: ({ search }) => search,
	loader: ({ deps }) => loadCatalog(deps),
	errorComponent: CatalogError,
	notFoundComponent: function CatalogNotFound() {
		return (
			<JfdevelopsPage category="Open source libraries">
				<div className="py-10">
					<h2 className="text-xl font-medium">Library or category not found</h2>
					<Link
						to="/projects/jfdevelops"
						search={{}}
						className="mt-4 inline-block text-primary underline underline-offset-4"
					>
						Browse all libraries
					</Link>
				</div>
			</JfdevelopsPage>
		);
	},
});

function Jfdevelops() {
	const catalog = Route.useLoaderData();

	return (
		<JfdevelopsPage
			category={`${catalog.publishedLibraryCount} published libraries`}
		>
			<CatalogBrowser catalog={catalog} />
		</JfdevelopsPage>
	);
}
