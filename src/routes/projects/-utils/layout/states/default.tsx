import { StickyHeader } from '@/components/sticky-header';
import { ThemeSelect } from '@/components/theme-select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { createProp } from '@jfdevelops/react-layout';
import { createBreadcrumbComposable } from '@jfdevelops/react-layout-composable-breadcrumb';
import { Link } from '@tanstack/react-router';
import { ArrowLeftIcon, ArrowUpRightIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useBreadcrumbs } from '../../use-breadcrumbs';
import { useHeadingVisible } from '../../heading-visible';
import { error } from './error';
import { notFound } from './not-found';
import {
  createRenderState,
  createSourceUrl,
  defineResourceLayout,
} from '../base';
import { layout } from './layout';

const projectBreadcrumbs = createBreadcrumbComposable({
  name: 'ProjectBreadcrumbs',
  props: {
    segments: createProp.array(
      createProp.object({
        label: createProp.string(),
        to: createProp.string(),
        hash: createProp.string().optional(),
      }),
    ),
  },
  render: function ProjectBreadcrumbs({ segments }) {
    const navRef = useRef<HTMLElement>(null);
    const visible = useHeadingVisible();
    const currentPath = segments.at(-1)?.to;

    useEffect(() => {
      if (visible && currentPath && navRef.current) {
        navRef.current.scrollLeft = navRef.current.scrollWidth;
      }
    }, [visible, currentPath]);

    return (
      <nav
        ref={navRef}
        aria-label='Breadcrumb'
        aria-hidden={!visible}
        inert={!visible}
        data-header-breadcrumbs
        data-visible={visible}
        tabIndex={visible ? 0 : -1}
        className={cn(
          'col-start-1 row-start-1 min-w-0 overflow-x-auto py-1 scrollbar-thin transition-[opacity,translate] duration-300 motion-reduce:transition-none',
          visible
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2 opacity-0',
        )}
      >
        <ol className='flex w-max min-w-full items-center gap-2 whitespace-nowrap text-sm'>
          {segments.map((item, index) => (
            <li key={item.to} className='flex shrink-0 items-center gap-2'>
              {index > 0 && (
                <span aria-hidden='true' className='text-muted-foreground'>
                  /
                </span>
              )}
              {index === segments.length - 1 ? (
                <span aria-current='page' className='font-medium'>
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  hash={item.hash}
                  activeOptions={{ exact: true }}
                  className='text-muted-foreground hover:text-primary'
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  },
});

const defaultState = createRenderState.fromState({
  ref: layout,
  props: {
    include: {
      title: true,
      description: true,
      meta: true,
      segments: {
        required: false,
        suppliedVia: 'config',
      },
    },
    custom: {
      category: createProp.string(),
      children: createProp.component({ type: 'ReactNode' }),
    },
  },
  composables: () => ({
    ...projectBreadcrumbs,
    Layout: layout.asComposable(),
  }),
  render: function ProjectLayout(
    { category, children, description, meta, title },
    { composables, resources },
  ) {
    const breadcrumbs = useBreadcrumbs({ resources: resources.current, title });
    const sourceUrl = createSourceUrl({ meta });

    return (
      <composables.Layout
        breadcrumbs={<composables.ProjectBreadcrumbs segments={breadcrumbs} />}
      >
        <composables.TitleWrapper>
          <composables.Title>{title}</composables.Title>
          <composables.Description>{description}</composables.Description>
          <composables.Category>{category}</composables.Category>
          <composables.Source>
            <Link to={sourceUrl} reloadDocument>
              <img
                src={`/brands/${meta.source}.svg`}
                alt={`${meta.source} logo`}
                width={20}
                height={20}
                className='size-5 dark:invert'
              />
              {meta.label}
              <ArrowUpRightIcon aria-hidden='true' />
            </Link>
          </composables.Source>
        </composables.TitleWrapper>
        {children}
      </composables.Layout>
    );
  },
});

export const {
  createResourceLayout: createProjectLayout,
  createResourceConfig,
} = defineResourceLayout({
  render: {
    ...defaultState,
    ...notFound,
    ...error,
  },
});
