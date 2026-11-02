import { createResourceLinks } from './layout/states/default';

export const projectLinks = createResourceLinks.withGroups([
	{
		links: {
			panedeck: {
				label: 'PaneDeck',
				href: '/projects/panedeck',
			},
			'material-ui-helper': {
				label: 'Material UI Helper',
				href: '/projects/material-ui-helper',
			},
			jfdevelops: {
				label: 'jfdevelops',
				href: '/projects/jfdevelops',
			},
		},
	},
]);
