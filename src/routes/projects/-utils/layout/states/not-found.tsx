import { createProp } from '@jfdevelops/react-layout';
import { createRenderState } from '../base';
import { layout } from './layout';

export const notFound = createRenderState.fromState({
  ref: layout,
  state: 'NotFound',
  props: {
    custom: {
      title: createProp.string().optional(),
      description: createProp.string().optional(),
      children: createProp.component({ type: 'ReactNode' }).optional(),
    },
  },
  composables: () => ({
    Layout: layout.asComposable(),
  }),
  render: function ProjectNotFound(
    { title = 'Page not found', description, children },
    { composables },
  ) {
    return (
      <composables.Layout>
        <composables.TitleWrapper>
          <composables.Title>{title}</composables.Title>
          {description && (
            <composables.Description>{description}</composables.Description>
          )}
        </composables.TitleWrapper>
        {children}
      </composables.Layout>
    );
  },
});
