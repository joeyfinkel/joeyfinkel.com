import { createProp, defineResourceLayout } from '@jfdevelops/react-layout';
import { ProjectLayout } from '../-components/layout';

export const { createResourceLayout: createProjectLayout } =
	defineResourceLayout({
		resources: ['panedeck', 'material-ui-helper', 'jfdevelops'],
		options: {
			title: createProp.string(),
			description: createProp.string(),
			sourceUrl: createProp.string(),
			sourceLabel: createProp.string(),
			presentation: createProp.string(),
		},
		layout: {
			props: {
				include: {
					title: true,
					description: true,
					sourceUrl: true,
					sourceLabel: true,
					presentation: true,
				},
				custom: {
					category: createProp.string(),
					children: createProp.component({ type: 'ReactNode' }),
				},
			},
			render: ProjectLayout,
		},
	});
