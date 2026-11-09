import { Link } from '@tanstack/react-router';
import type { LibraryGroupData } from '@/projects/schema';
import { GroupDescription } from './description';

export function CategoryCard({ group }: { group: LibraryGroupData }) {
	return (
		<section data-library-category className="min-w-0 border-b py-6">
			<h3 className="text-base font-medium">
				<Link
					viewTransition
					to="/projects/jfdevelops/categories/$category"
					params={{ category: group.id }}
					className="hover:text-primary"
				>
					{group.title} <span aria-hidden="true">↗</span>
				</Link>
			</h3>
			<p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
				<GroupDescription group={group} />
			</p>
			<ul className="mt-4 space-y-4">
				{group.libraries.map((library) => (
					<li key={library.name}>
						<Link
							viewTransition
							to="/projects/jfdevelops/$library"
							params={{ library: library.name.replace('@jfdevelops/', '') }}
							className="text-sm font-medium break-words underline-offset-4 hover:underline"
						>
							{library.name}
						</Link>
						<p className="mt-1 text-[13px] leading-6 text-muted-foreground">
							{library.description}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
