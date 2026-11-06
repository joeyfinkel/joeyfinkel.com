import { ProjectShell } from '../../../../-components/shell/layout';
import { HeadingVisibleContext } from '../../../heading-visible';
import { useBreadcrumbs } from '../../../use-breadcrumbs';
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
	render: function ProjectsLayout({ children }, { composables }) {
		const breadcrumbs = useBreadcrumbs();

		return (
			<ProjectShell
				breadcrumbs={
					<HeadingVisibleContext value={true}>
						<composables.ProjectBreadcrumbs segments={breadcrumbs} />
					</HeadingVisibleContext>
				}
			>
				{children}
			</ProjectShell>
		);
	},
});
