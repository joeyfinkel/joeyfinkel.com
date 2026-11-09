import { ProjectShell } from '../../../../-components/shell/layout';
import { createRenderState } from '../../base';
import { projectBreadcrumbs } from '../breadcrumbs';

export const layout = createRenderState({
	state: 'Layout',
	props: {
		include: {
			presentation: true,
			segments: {
				required: false,
				suppliedVia: 'config',
			},
		},
	},
	composables: () => ({
		...projectBreadcrumbs,
	}),
	render: function ProjectsLayout({ children }) {
		return <ProjectShell>{children}</ProjectShell>;
	},
});
