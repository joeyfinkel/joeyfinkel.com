import { ArrowUpRight } from 'lucide-react';
import type { projects } from '../projects';

export function Project({ project }: { project: (typeof projects)[number] }) {
	return (
		<li>
			<a
				href={project.href}
				className="group grid gap-5 border-t py-8 transition-colors hover:bg-secondary/40 sm:grid-cols-[2rem_1fr_auto] sm:gap-6 sm:py-10"
			>
				<span
					className="pt-1 font-mono text-xs text-muted-foreground"
					aria-hidden="true"
				>
					{project.number}
				</span>
				<div>
					<p className="mb-2 text-xs text-muted-foreground">
						{project.category}
					</p>
					<h3 className="text-2xl font-medium tracking-tight">
						{project.name}
					</h3>
					<p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
						{project.description}
					</p>
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
				</div>
				<ArrowUpRight
					className="size-5 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
					aria-hidden="true"
				/>
			</a>
			{project.libraries ? (
				<ul
					className="mb-8 flex flex-wrap gap-5 text-xs sm:pl-14"
					aria-label="jfdevelops libraries"
				>
					{project.libraries.map((library) => (
						<li key={library.name}>
							<a
								href={library.href}
								className="inline-flex items-center gap-1 text-primary underline underline-offset-4"
							>
								{library.name}{' '}
								<ArrowUpRight className="size-3" aria-hidden="true" />
							</a>
						</li>
					))}
				</ul>
			) : null}
		</li>
	);
}
