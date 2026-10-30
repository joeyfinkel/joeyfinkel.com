import { SidebarProvider } from '@/components/ui/sidebar/provider';
import { SidebarTrigger } from '@/components/ui/sidebar/trigger';
import type { CatalogView } from '@/projects/schema';
import { CategoryCard } from './category-card';
import { LibraryGroup } from './group';
import { LibraryDetail } from './library';
import { CatalogNavigation } from './navigation';

export function CatalogBrowser({ catalog }: { catalog: CatalogView }) {
	return (
		<SidebarProvider className="py-8">
			<CatalogNavigation catalog={catalog} />
			<div className="min-w-0 flex-1" id="catalog-content">
				<SidebarTrigger />
				{catalog.selectedGroup ? (
					catalog.selectedLibrary ? (
						<LibraryDetail
							library={catalog.selectedLibrary}
							group={catalog.selectedGroup}
						/>
					) : (
						<LibraryGroup group={catalog.selectedGroup} />
					)
				) : (
					<>
						<h2 className="text-2xl font-medium tracking-tight">
							Choose a library or category to learn more.
						</h2>
						<p className="mt-3 text-sm leading-7 text-muted-foreground">
							Browse the packages below for installation details, examples, and
							documentation.
						</p>
						<div className="mt-7 grid gap-4 lg:grid-cols-2">
							{catalog.groups.map((group) => (
								<CategoryCard key={group.id} group={group} />
							))}
						</div>
					</>
				)}
			</div>
		</SidebarProvider>
	);
}
