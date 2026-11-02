import { createFileRoute } from '@tanstack/react-router';
import { projectConfig } from './-utils/config';

const getPage = projectConfig.getComponent.forResource({
	resource: 'material-ui-helper',
});

export const Route = createFileRoute('/projects/material-ui-helper')({
	component: function MaterialUiHelperRoute() {
		return getPage();
	},
	errorComponent: function MaterialUiHelperError() {
		return getPage({ component: 'errorComponent' });
	},
	notFoundComponent: function MaterialUiHelperNotFound() {
		return getPage({ component: 'notFoundComponent' });
	},
});
