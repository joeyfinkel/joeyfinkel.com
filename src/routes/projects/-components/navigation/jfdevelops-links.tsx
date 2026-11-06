import { Link, useMatch } from '@tanstack/react-router';
import { useSidebar } from '@/components/ui/sidebar';

const linkClassName =
	'relative block rounded-md px-3 py-1.5 text-sm leading-5 break-words text-sidebar-foreground/80 outline-hidden transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sidebar-ring';
const activeLinkClassName =
	'bg-sidebar-accent font-medium text-sidebar-foreground before:absolute before:inset-y-1.5 before:left-0 before:w-0.5 before:rounded-full before:bg-primary';

export function JfdevelopsLinks() {
	const { setOpenMobile } = useSidebar();
	const catalog = useMatch({
		from: '/projects/jfdevelops',
		shouldThrow: false,
		select: (match) => match.loaderData,
	});

	if (!catalog) {
		return null;
	}

	return (
		<nav aria-label="Library navigation" className="mt-6 border-t pt-6">
			<Link
				viewTransition
				to="/projects/jfdevelops"
				activeOptions={{ exact: true }}
				className={linkClassName}
				activeProps={{ className: activeLinkClassName }}
				onClick={() => setOpenMobile(false)}
			>
				All libraries
			</Link>
			{catalog.groups.map((group) => (
				<section key={group.id} className="mt-6">
					<Link
						viewTransition
						to="/projects/jfdevelops/categories/$category"
						params={{ category: group.id }}
						activeOptions={{ exact: true }}
						className="block rounded-md px-3 py-1 text-xs font-medium text-muted-foreground outline-hidden transition-colors hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sidebar-ring"
						activeProps={{ className: 'text-sidebar-foreground' }}
						onClick={() => setOpenMobile(false)}
					>
						{group.title}
					</Link>
					<ul className="mt-1 flex flex-col gap-0.5 pl-2">
						{group.libraries.map((library) => (
							<li key={library.name}>
								<Link
									viewTransition
									to="/projects/jfdevelops/$library"
									params={{
										library: library.name.replace('@jfdevelops/', ''),
									}}
									activeOptions={{ exact: true }}
									className={linkClassName}
									activeProps={{ className: activeLinkClassName }}
									onClick={() => setOpenMobile(false)}
								>
									{library.label}
								</Link>
							</li>
						))}
					</ul>
				</section>
			))}
		</nav>
	);
}
