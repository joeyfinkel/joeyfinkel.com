import { Link } from '@tanstack/react-router';
import { ArrowRight, Braces, Package, PanelsTopLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { projects } from '../utils/projects';

export function Project({
	project,
	publishedLibraryCount,
}: {
	project: (typeof projects)[number];
	publishedLibraryCount: number | null;
}) {
	const icons = {
		panedeck: PanelsTopLeft,
		'material-ui-helper': Braces,
		jfdevelops: Package,
	};
	const Icon = icons[project.slug];
	const isLibraryProject = project.slug === 'jfdevelops';
	const libraryLabel =
		publishedLibraryCount === null
			? 'Explore the libraries'
			: `${publishedLibraryCount} published libraries`;

	return (
		<li className={cn(isLibraryProject && 'sm:col-span-2')}>
			<Link
				to={project.to}
				className="group flex h-full flex-col rounded-xl border p-6 transition-colors hover:border-primary/50 hover:bg-secondary/30 sm:p-8"
			>
				<div className="flex items-center justify-between">
					<span className="flex size-11 items-center justify-center rounded-xl border bg-secondary/60 text-primary">
						<Icon className="size-5" aria-hidden="true" />
					</span>
					<ArrowRight
						className="size-5 text-primary transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
						aria-hidden="true"
					/>
				</div>
				<h3 className="mt-6 text-2xl font-medium tracking-tight">
					{project.name}
				</h3>
				<p className="mt-3 max-w-xl flex-1 text-sm leading-7 text-muted-foreground">
					{project.description}
				</p>
				<p className="mt-4 text-sm text-muted-foreground">{project.category}</p>
				<ul
					className="mt-5 flex flex-wrap gap-x-4 gap-y-2"
					aria-label="Technologies"
				>
					{project.tags.map((tag) => (
						<li
							key={tag}
							className="font-mono text-[11px] text-muted-foreground"
						>
							{tag}
						</li>
					))}
				</ul>
				<p className="mt-6 border-t pt-4 text-xs font-medium text-primary">
					{isLibraryProject ? libraryLabel : 'Explore project'}
				</p>
			</Link>
		</li>
	);
}
