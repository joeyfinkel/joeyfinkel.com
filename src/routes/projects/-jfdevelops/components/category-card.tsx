import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import type { LibraryGroupData } from '@/projects/schema';

export function CategoryCard({ group }: { group: LibraryGroupData }) {
	return (
		<section className="min-w-0 rounded-xl border p-5 sm:p-6">
			<h3 className="text-lg font-medium">
				<Link
					to="/projects/jfdevelops/categories/$category"
					params={{ category: group.id }}
					className="flex items-center justify-between gap-3 hover:text-primary"
				>
					{group.title}
					<ArrowUpRight className="size-4" aria-hidden="true" />
				</Link>
			</h3>
			<p className="mt-3 text-xs leading-6 text-muted-foreground">
				{group.description}
			</p>
			<ul className="mt-5 space-y-3 border-t pt-4">
				{group.libraries.map((library) => (
					<li key={library.name}>
						<Link
							to="/projects/jfdevelops/$library"
							params={{ library: library.name.replace('@jfdevelops/', '') }}
							className="block break-words text-xs leading-5 text-primary underline-offset-4 hover:underline"
						>
							{library.name.replace('@jfdevelops/', '')}
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
