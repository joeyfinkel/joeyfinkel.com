import { createProp } from '@jfdevelops/react-layout';
import { createRenderState } from '../../base';
import { layout } from './layout';

export const error = createRenderState.fromState({
	ref: layout,
	state: 'Error',
	props: {
		custom: {
			message: createProp.string().optional(),
			children: createProp.component({ type: 'ReactNode' }).optional(),
		},
	},
	composables: () => ({
		Layout: layout.asComposable(),
	}),
	render: function ProjectsError({ message, children }, { composables }) {
		return (
			<composables.Layout>
				<composables.TitleWrapper>
					<composables.Title>
						This project could not be loaded
					</composables.Title>
					<composables.Description role="alert">
						{message ??
							'Something went wrong while loading this project. Try again in a moment.'}
					</composables.Description>
				</composables.TitleWrapper>
				{children}
			</composables.Layout>
		);
	},
});
