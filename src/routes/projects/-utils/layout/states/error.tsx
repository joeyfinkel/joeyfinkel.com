import { createProp } from '@jfdevelops/react-layout';
import { createRenderState } from '../base';

export const error = createRenderState({
	state: 'Error',
	props: {
		custom: {
			message: createProp.string().optional(),
			children: createProp.component({ type: 'ReactNode' }).optional(),
		},
	},
	render: function ProjectError({ message, children }, { composables }) {
		return (
			<composables.TitleWrapper>
				<composables.Title>Something went wrong</composables.Title>
				<composables.Description role="alert">
					{message ?? 'This page could not be loaded. Try again in a moment.'}
				</composables.Description>
				{children && (
					<div className="mt-6 flex flex-wrap items-center gap-3">
						{children}
					</div>
				)}
			</composables.TitleWrapper>
		);
	},
});
