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
			'Composable React layouts and type-safe multi-step forms. Reusable libraries for building application interfaces with less friction.',
		href: 'https://github.com/jfdevelops',
		tags: ['React', 'TypeScript', 'Open source'],
		number: '03',
		libraries: [
			{
				name: 'React Layout',
				href: 'https://www.npmjs.com/package/@jfdevelops/react-layout',
			},
			{
				name: 'Multi-Step Form',
				href: 'https://github.com/jfdevelops/multi-step-form',
			},
		],
	},
];
