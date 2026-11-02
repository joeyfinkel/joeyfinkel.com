import { createProjectLayout } from '../../-utils/layout/states/default';

export const MaterialUiHelperPage = createProjectLayout({
	resource: 'material-ui-helper',
	name: 'MaterialUiHelperPage',
	presentation: 'article',
	title: 'Material UI Helper',
	description:
		'Take the filter model from MUI X Data Grid and apply it to your .NET data. One extension method works with in-memory collections and IQueryable sources.',
	meta: {
		source: 'github',
		label: 'View on GitHub',
		repo: 'material-ui-helper',
		owner: 'joeyfinkel',
	},
});
