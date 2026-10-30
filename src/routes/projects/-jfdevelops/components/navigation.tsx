import { Link } from '@tanstack/react-router';
import { Sidebar } from '@/components/ui/sidebar/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { cn } from '@/lib/utils';
import type { CatalogView } from '@/projects/schema';

export function CatalogNavigation({ catalog }: { catalog: CatalogView }) {
	const { setOpenMobile } = useSidebar();

	return (
		<Sidebar>
			<nav aria-label="Library navigation" className="space-y-6 pb-6">
				<Link
					to="/projects/jfdevelops"
					activeOptions={{ exact: true }}
					search={{}}
					onClick={() => setOpenMobile(false)}
					aria-current={!catalog.selectedGroup ? 'page' : undefined}
					className="block text-sm font-medium text-primary"
				>
					All libraries
				</Link>
				{catalog.groups.map((group) => (
					<div key={group.id}>
						<Link
							to="/projects/jfdevelops"
							activeOptions={{ exact: true }}
							search={{ category: group.id }}
							onClick={() => setOpenMobile(false)}
							aria-current={
								catalog.selectedGroup?.id === group.id &&
								!catalog.selectedLibrary
									? 'page'
									: undefined
							}
							className={cn(
								'block text-xs font-semibold hover:text-primary',
								catalog.selectedGroup?.id === group.id && 'text-primary',
							)}
						>
							{group.title}
						</Link>
						<ul className="mt-3 space-y-1 border-l pl-3">
							{group.libraries.map((library) => (
								<li key={library.name}>
									<Link
										to="/projects/jfdevelops"
										activeOptions={{ exact: true }}
										search={{ category: group.id, library: library.name }}
										onClick={() => setOpenMobile(false)}
										aria-current={
											catalog.selectedLibrary?.name === library.name
												? 'page'
												: undefined
										}
										className={cn(
											'block break-words rounded-md px-2 py-1.5 text-xs leading-5 text-muted-foreground hover:bg-secondary hover:text-foreground',
											catalog.selectedLibrary?.name === library.name &&
												'bg-secondary text-primary',
										)}
									>
										{library.name.replace('@jfdevelops/', '')}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</nav>
		</Sidebar>
	);
}
