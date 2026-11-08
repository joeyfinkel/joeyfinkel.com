import { Link, useMatch } from '@tanstack/react-router';

export function JfdevelopsLinks() {
	const catalog = useMatch({
		from: '/projects/jfdevelops',
		shouldThrow: false,
		select: (match) => match.loaderData,
	});

	if (!catalog) {
		return null;
	}

	return (
		<nav aria-label="Library navigation" className="project-site-libraries">
			<Link
				viewTransition
				to="/projects/jfdevelops"
				activeOptions={{ exact: true }}
				activeProps={{ 'aria-current': 'page' }}
			>
				All libraries
			</Link>
			{catalog.groups.map((group) => (
				<section key={group.id}>
					<h3>
						<Link
							viewTransition
							to="/projects/jfdevelops/categories/$category"
							params={{ category: group.id }}
							activeOptions={{ exact: true }}
							activeProps={{ 'aria-current': 'page' }}
						>
							{group.title}
						</Link>
					</h3>
					<ul>
						{group.libraries.map((library) => (
							<li key={library.name}>
								<Link
									viewTransition
									to="/projects/jfdevelops/$library"
									params={{
										library: library.name.replace('@jfdevelops/', ''),
									}}
									activeOptions={{ exact: true }}
									activeProps={{ 'aria-current': 'page' }}
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
