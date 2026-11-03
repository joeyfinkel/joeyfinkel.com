import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { projects } from '../utils/projects';
import { JfdevelopsPreview } from './previews/jfdevelops';
import { MaterialUiHelperPreview } from './previews/material-ui-helper';
import { PaneDeckPreview } from './previews/panedeck';

export function Project({
	project,
	publishedLibraryCount,
}: {
	project: (typeof projects)[number];
	publishedLibraryCount: number | null;
}) {
	const previews = {
		panedeck: PaneDeckPreview,
		'material-ui-helper': MaterialUiHelperPreview,
		jfdevelops: JfdevelopsPreview,
	};
	const Preview = previews[project.slug];
	const isLibraryProject = project.slug === 'jfdevelops';
	const hasLibraryCount = isLibraryProject && publishedLibraryCount !== null;
	const description = hasLibraryCount
		? `A collection of ${publishedLibraryCount} open-source TypeScript and React libraries.`
		: project.description;
	const action = hasLibraryCount
		? `Browse ${publishedLibraryCount} libraries`
		: project.action;

	return (
		<li className={cn('flex min-w-0', isLibraryProject && 'sm:col-span-2')}>
			<Link
				to={project.to}
				className="group flex w-full flex-col overflow-hidden rounded-xl border outline-hidden transition-colors hover:border-primary/50 hover:bg-secondary/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
			>
				<div
					className={cn(
						'overflow-hidden border-b bg-secondary/40',
						!isLibraryProject && 'aspect-[1702/1087]',
					)}
				>
					<Preview />
				</div>
				<div className="flex flex-1 flex-col p-6">
					<p className="text-xs font-medium text-primary">{project.category}</p>
					<h3 className="mt-2 text-2xl font-medium tracking-tight">
						{project.name}
					</h3>
					<p className="mt-3 max-w-xl text-sm leading-6 text-foreground/80">
						{description}
					</p>
					<ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
						{project.tags.map((tag) => (
							<li
								key={tag}
								className="rounded-full border px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
							>
								{tag}
							</li>
						))}
					</ul>
					<p className="mt-auto pt-6">
						<span className="flex items-center gap-1.5 border-t pt-4 text-sm font-medium text-primary">
							{action}
							<ArrowRight
								className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
								aria-hidden="true"
							/>
						</span>
					</p>
				</div>
			</Link>
		</li>
	);
}
