import { Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { StickyHeader } from '@/components/sticky-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ProjectsNavigation } from '../../../../-components/navigation';
import { ProjectsNavigationTrigger } from '../../../../-components/navigation/trigger';
import { ProjectPrototype } from '../../../../-components/prototype/layout';
import { HeadingVisibleContext } from '../../../heading-visible';
import { useBreadcrumbs } from '../../../use-breadcrumbs';
import { useHeaderTitle } from '../../../use-header-title';
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
	render: function ProjectsLayout({ presentation, children }, { composables }) {
		const { headerRef, mainRef, heading } = useHeaderTitle();
		const breadcrumbs = useBreadcrumbs();

		if (import.meta.env.DEV) {
			return (
				<ProjectPrototype
					breadcrumbs={
						<HeadingVisibleContext value={true}>
							<composables.ProjectBreadcrumbs segments={breadcrumbs} />
						</HeadingVisibleContext>
					}
				>
					{children}
				</ProjectPrototype>
			);
		}

		return (
			<div
				className={cn(
					'mx-auto flex min-h-svh flex-col px-6 sm:px-10',
					presentation === 'docs' ? 'max-w-6xl' : 'max-w-4xl',
				)}
			>
				<SidebarProvider open className="contents">
					<Link
						to="."
						hash="project-main"
						className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:bg-background focus:p-3"
					>
						Skip to content
					</Link>
					<StickyHeader ref={headerRef}>
						<div className="grid min-w-0 flex-1 items-center">
							<Link
								to="/"
								hash="projects"
								aria-hidden={Boolean(heading)}
								tabIndex={heading ? -1 : undefined}
								className={cn(
									'col-start-1 row-start-1 inline-flex w-fit items-center gap-2 text-sm font-medium',
									heading && 'invisible pointer-events-none',
								)}
							>
								<ArrowLeftIcon className="size-4" aria-hidden="true" />
								All projects
							</Link>
							<HeadingVisibleContext value={Boolean(heading)}>
								<composables.ProjectBreadcrumbs segments={breadcrumbs} />
							</HeadingVisibleContext>
						</div>
						<ProjectsNavigationTrigger />
					</StickyHeader>
					<div className="flex min-h-0 flex-1 items-start gap-10 pt-4">
						<ProjectsNavigation />
						<main
							ref={mainRef}
							id="project-main"
							className="min-w-0 flex-1 pb-12"
						>
							{children}
						</main>
					</div>
				</SidebarProvider>
				<footer className="flex flex-wrap justify-between gap-4 border-t py-8 text-xs text-muted-foreground">
					<Link to="/">Joey Finkel</Link>
					<Link
						to="/"
						hash="hire-me"
						className="text-primary underline underline-offset-4"
					>
						Have a project in mind? Let&apos;s talk.
					</Link>
				</footer>
			</div>
		);
	},
});
