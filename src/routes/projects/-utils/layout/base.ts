import {
  createDefinedResourceLayout,
  createProp,
} from '@jfdevelops/react-layout';
import {
  ProjectCategory,
  ProjectLayout,
  ProjectSource,
  ProjectDescription,
  ProjectTitle,
} from '../../-components/layout';

export const projectLayouts = createDefinedResourceLayout({
  resources: ['panedeck', 'material-ui-helper', 'jfdevelops'],
  options: {
    title: createProp.string(),
    description: createProp.string(),
    presentation: createProp.string.enum(['docs', 'article']),
    meta: createProp
      .object({
        source: createProp.string.literal('github'),
        owner: createProp.string(),
        repo: createProp.string(),
        label: createProp.string(),
      })
      .or(
        createProp.object({
          source: createProp.string.literal('npm'),
          package: createProp.string(),
          label: createProp.string(),
        }),
      ),
  },
  props: {
    include: {
      presentation: {
        required: true,
        suppliedVia: 'config',
      },
    },
  },
  composables: (create) => ({
    TitleWrapper: create({
      name: 'Layout',
      wrapWith: ProjectLayout,
    }),
    Title: create({
      name: 'Title',
      wrapWith: ProjectTitle,
    }),
    Description: create({
      name: 'Description',
      wrapWith: ProjectDescription,
    }),
    Category: create({
      name: 'Category',
      wrapWith: ProjectCategory,
    }),
    Source: create({
      name: 'Source',
      wrapWith: ProjectSource,
    }),
  }),
});

export const { defineResourceLayout, createRenderState, createReusable } =
  projectLayouts;

export const createSourceUrl = createReusable({
  props: {
    include: {
      options: {
        meta: true,
      },
    },
  },
  fn: ({ meta }) => {
    if (meta.source === 'github') {
      const { owner, repo, source } = meta;

      return `https://${source}.com/${owner}/${repo}`;
    }

    if (meta.source === 'npm') {
      const { package: packageName, source } = meta;

      return `https://${source}.com/package/${packageName}`;
    }

    return '';
  },
});
