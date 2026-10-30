export const projects = [
	{
		name: 'PaneDeck',
		slug: 'panedeck',
		to: '/projects/panedeck',
		category: 'Desktop application',
		description:
			'Bring your Windows apps together in focused, flexible workspaces. Group windows into splits and tabs, then move and resize them together.',
		tags: ['Windows', 'C#', '.NET'],
		number: '01',
	},
	{
		name: 'Material UI Helper',
		slug: 'material-ui-helper',
		to: '/projects/material-ui-helper',
		category: 'Developer library',
		description:
			'Connect MUI Data Grid filtering to your .NET backend. Translate filter models into LINQ queries for collections and query providers.',
		tags: ['C#', 'LINQ', 'MUI'],
		number: '02',
	},
	{
		name: 'jfdevelops',
		slug: 'jfdevelops',
		to: '/projects/jfdevelops',
		category: 'Open source libraries',
		description:
			'Type-safe layouts, multi-step forms, error handling, and developer tools. Small libraries for the parts of an application you build again and again.',
		tags: ['React', 'TypeScript', 'Open source'],
		number: '03',
	},
] as const;
