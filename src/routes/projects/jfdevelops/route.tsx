import { createFileRoute } from '@tanstack/react-router';
import { projectConfig } from '../-utils/config';
import { loadCatalog } from './-utils/load';

const getPage = projectConfig.getComponent.forResource({
	resource: 'jfdevelops',
});

export const Route = createFileRoute('/projects/jfdevelops')({
	component: function JfdevelopsRoute() {
		return getPage();
	},
	errorComponent: function JfdevelopsError() {
		return getPage({ component: 'errorComponent' });
	},
	notFoundComponent: function JfdevelopsNotFound() {
		return getPage({ component: 'notFoundComponent' });
	},
	loader: () => loadCatalog({}),
});
