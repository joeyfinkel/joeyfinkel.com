import { useMatches } from '@tanstack/react-router';
import { createReusable } from './layout/base';
import { createProp } from '@jfdevelops/react-layout';

type JoinSegments<
  TSegments extends Array<string>,
  TDelimiter extends string = '/',
  TIncludeLeading extends boolean = false,
> = TSegments extends [infer TFirst, ...infer TRest]
  ? TFirst extends string
    ? TRest extends [string, ...Array<string>]
      ? `${TIncludeLeading extends true ? TDelimiter : ''}${TFirst}${TDelimiter}${JoinSegments<TRest, TDelimiter>}`
      : `${TIncludeLeading extends true ? TDelimiter : ''}${TFirst}`
    : never
  : '';

function joinWithoutLeading<TSegments extends Array<string>>(
  ...segments: TSegments
) {
  return segments.join('/') as JoinSegments<TSegments>;
}

function joinWithLeading<TSegments extends Array<string>>(
  ...segments: TSegments
) {
  return `/${joinWithoutLeading(...segments)}` as const;
}

const createPath = Object.assign(joinWithLeading, {
  withoutLeading: joinWithoutLeading,
});

export const useBreadcrumbs = createReusable({
  props: {
    include: {
      resources: (resources) => resources.single(),
    },
    custom: {
      title: createProp.string(),
    },
  },
  fn: function useBreadcrumbs({ resources, title }) {
    const nested = useMatches({
      select: (matches) => {
        const projectsPath = createPath.withoutLeading(
          'projects',
          'jfdevelops',
        );

        for (const match of matches) {
          if (
            match.routeId === '/projects/jfdevelops/$library' &&
            match.loaderData
          ) {
            const { group, library } = match.loaderData;

            return [
              {
                label: group.title,
                to: createPath(
                  projectsPath,
                  'categories',
                  encodeURIComponent(group.id),
                ),
              },
              {
                label: library.name,
                to: createPath(
                  projectsPath,
                  encodeURIComponent(library.name.replace('@jfdevelops/', '')),
                ),
              },
            ];
          }

          if (
            match.routeId === '/projects/jfdevelops/categories/$category' &&
            match.loaderData
          ) {
            const group = match.loaderData;

            return [
              {
                label: group.title,
                to: createPath(
                  projectsPath,
                  'categories',
                  encodeURIComponent(group.id),
                ),
              },
            ];
          }
        }

        return [];
      },
    });

    return [
      { label: 'Projects', to: '/' as const, hash: 'projects' },
      { label: title, to: createPath('projects', resources) },
      ...nested,
    ];
  },
});
