import { createProp } from '@jfdevelops/react-layout';
import { createRenderState, defineResourceLayout } from '../../base';
import { notFound } from '../../states/not-found';
import { error } from './error';
import { layout } from './layout';

const defaultState = createRenderState.fromState({
	ref: layout,
	props: {
		custom: {
			children: createProp.component({ type: 'ReactNode' }),
		},
	},
	composables: () => ({
		Layout: layout.asComposable(),
	}),
	render: function ProjectsPageContent({ children }, { composables }) {
		return <composables.Layout>{children}</composables.Layout>;
	},
});

export const { createResourceLayout: createProjectsLayout } =
	defineResourceLayout({
		render: {
			...defaultState,
			...notFound,
			...error,
		},
	});
