import { libraries } from './libraries';

export const projects = [
	{
		name: 'PaneDeck',
		category: 'Desktop application',
		description:
			'Bring your Windows apps together in focused, flexible workspaces. Group windows into splits and tabs, then move and resize them together.',
		href: 'https://github.com/joeyfinkel/panedeck',
		tags: ['Windows', 'C#', '.NET'],
		number: '01',
	},
	{
		name: 'Material UI Helper',
		category: 'Developer library',
		description:
			'Connect MUI Data Grid filtering to your .NET backend. Translate filter models into LINQ queries for collections and query providers.',
		href: 'https://github.com/joeyfinkel/material-ui-helper',
		tags: ['C#', 'LINQ', 'MUI'],
		number: '02',
	},
	{
		name: 'jfdevelops',
		category: 'Open source libraries',
		description:
			'Type-safe layouts, multi-step forms, error handling, and developer tools. Explore all of my published packages on npm.',
		href: 'https://www.npmjs.com/search?q=%40jfdevelops',
		tags: ['React', 'TypeScript', 'Open source'],
		number: '03',
		libraries,
	},
];
