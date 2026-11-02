import { Link, useMatch } from '@tanstack/react-router';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';

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
		<div className="mt-4 space-y-5 border-l pl-3">
			<Link
				to="/projects/jfdevelops"
				activeOptions={{ exact: true }}
				activeProps={{ className: 'text-primary' }}
				onClick={() => setOpenMobile(false)}
				className="block text-xs font-medium hover:text-primary"
			>
				All libraries
			</Link>
			{catalog.groups.map((group) => (
				<div key={group.id}>
					<Link
						to="/projects/jfdevelops/categories/$category"
						params={{ category: group.id }}
						activeOptions={{ exact: true }}
						activeProps={{ className: 'text-primary' }}
						onClick={() => setOpenMobile(false)}
						className="block text-xs font-semibold hover:text-primary"
					>
						{group.title}
					</Link>
					<ul className="mt-3 space-y-1 border-l pl-3">
						{group.libraries.map((library) => (
							<li key={library.name}>
								<Link
									to="/projects/jfdevelops/$library"
									params={{
										library: library.name.replace('@jfdevelops/', ''),
									}}
									activeOptions={{ exact: true }}
									activeProps={{ className: 'bg-secondary text-primary' }}
									onClick={() => setOpenMobile(false)}
									className="block break-words rounded-md px-2 py-1.5 text-xs leading-5 text-muted-foreground hover:bg-secondary hover:text-foreground"
								>
									{library.name.replace('@jfdevelops/', '')}
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
