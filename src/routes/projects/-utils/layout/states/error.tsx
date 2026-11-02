import { createProp } from '@jfdevelops/react-layout';
import { createRenderState } from '../base';
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
  render: function ProjectError({ message, children }, { composables }) {
    return (
      <composables.Layout>
        <composables.TitleWrapper>
          <composables.Title>Something went wrong</composables.Title>
          <composables.Description role='alert'>
            {message ?? 'This page could not be loaded. Try again in a moment.'}
          </composables.Description>
        </composables.TitleWrapper>
        {children}
      </composables.Layout>
    );
  },
});
