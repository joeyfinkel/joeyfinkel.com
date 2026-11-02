import { createProp } from '@jfdevelops/react-layout';
import { createRenderState } from '../base';

export const notFound = createRenderState({
	state: 'NotFound',
	props: {
		custom: {
			title: createProp.string().optional(),
			description: createProp.string().optional(),
			children: createProp.component({ type: 'ReactNode' }).optional(),
		},
	},
	render: function ProjectNotFound(
		{ title = 'Page not found', description, children },
		{ composables },
	) {
		return (
			<composables.TitleWrapper>
				<composables.Title>{title}</composables.Title>
				{description && (
					<composables.Description>{description}</composables.Description>
				)}
				{children && (
					<div className="mt-6 flex flex-wrap items-center gap-3">
						{children}
					</div>
				)}
			</composables.TitleWrapper>
		);
	},
});
