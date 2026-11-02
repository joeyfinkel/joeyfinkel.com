import { createFileRoute } from '@tanstack/react-router';
import { projectConfig } from './-utils/config';

const getPage = projectConfig.getComponent.forResource({
	resource: 'panedeck',
});

export const Route = createFileRoute('/projects/panedeck')({
	component: function PaneDeckRoute() {
		return getPage();
	},
	errorComponent: function PaneDeckError() {
		return getPage({ component: 'errorComponent' });
	},
	notFoundComponent: function PaneDeckNotFound() {
		return getPage({ component: 'notFoundComponent' });
	},
});
