export const projects = [
	{
		name: 'PaneDeck',
		slug: 'panedeck',
		to: '/projects/panedeck',
		category: 'Desktop application',
		description:
			'Group your Windows apps into splits and tabs, then move and resize them together as one focused workspace.',
		tags: ['Windows', 'C#', '.NET'],
		action: 'Explore PaneDeck',
		number: '01',
	},
	{
		name: 'Material UI Helper',
		slug: 'material-ui-helper',
		to: '/projects/material-ui-helper',
		category: 'Developer library',
		description:
			'Turn MUI Data Grid filters into LINQ queries on your .NET backend, for in-memory collections and query providers.',
		tags: ['C#', 'LINQ', 'MUI'],
		action: 'Explore Material UI Helper',
		number: '02',
	},
	{
		name: 'jfdevelops',
		slug: 'jfdevelops',
		to: '/projects/jfdevelops',
		category: 'Library collection',
		description:
			'A collection of open-source TypeScript and React libraries for layouts, multi-step forms, typed errors, and developer tools.',
		tags: ['React', 'TypeScript', 'Open source'],
		action: 'Browse the libraries',
		number: '03',
	},
] as const;
