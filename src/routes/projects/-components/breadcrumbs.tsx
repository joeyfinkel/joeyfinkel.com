import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

export function ProjectBreadcrumbs({
	projectTitle,
	heading,
}: {
	projectTitle: string;
	heading: {
		title: string;
		categoryId?: string;
		categoryTitle?: string;
	} | null;
}) {
	const isNested = heading && heading.title !== projectTitle;

	return (
		<nav
			aria-label="Breadcrumb"
			aria-hidden={!heading}
			inert={!heading}
			data-header-breadcrumbs
			data-visible={Boolean(heading)}
			className={cn(
				'col-start-1 row-start-1 min-w-0 transition-[opacity,translate] duration-300 motion-reduce:transition-none',
				heading
					? 'translate-y-0 opacity-100'
					: 'pointer-events-none translate-y-2 opacity-0',
			)}
		>
			<ol className="flex min-w-0 items-center gap-2 text-sm">
				<li className="shrink-0">
					<Link
						to="/"
						activeOptions={{ exact: true }}
						hash="projects"
						className="text-muted-foreground hover:text-primary"
					>
						Projects
					</Link>
				</li>
				{isNested && (
					<li className="hidden shrink-0 items-center gap-2 sm:flex">
						<span aria-hidden="true" className="text-muted-foreground">
							/
						</span>
						<Link
							to="/projects/jfdevelops"
							activeOptions={{ exact: true }}
							className="text-muted-foreground hover:text-primary"
						>
							{projectTitle}
						</Link>
					</li>
				)}
				{heading?.categoryTitle && heading.categoryId && (
					<li className="hidden shrink-0 items-center gap-2 lg:flex">
						<span aria-hidden="true" className="text-muted-foreground">
							/
						</span>
						<Link
							to="/projects/jfdevelops/categories/$category"
							activeOptions={{ exact: true }}
							params={{ category: heading.categoryId }}
							className="text-muted-foreground hover:text-primary"
						>
							{heading.categoryTitle}
						</Link>
					</li>
				)}
				<li className="flex min-w-0 items-center gap-2">
					<span aria-hidden="true" className="text-muted-foreground">
						/
					</span>
					<span
						aria-current="page"
						className="truncate font-medium"
						title={heading?.title}
					>
						{heading?.title}
					</span>
				</li>
			</ol>
		</nav>
	);
}
