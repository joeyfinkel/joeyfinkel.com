import { getRouteApi } from '@tanstack/react-router';
import { JfdevelopsPage } from '../utils/page';
import { CatalogBrowser } from './browser';

const route = getRouteApi('/projects/jfdevelops');

export function Jfdevelops() {
	const catalog = route.useLoaderData();

	return (
		<JfdevelopsPage
			category={`${catalog.publishedLibraryCount} published libraries`}
		>
			<CatalogBrowser catalog={catalog} />
		</JfdevelopsPage>
	);
}
