import { Outlet } from '@tanstack/react-router';
import { SidebarProvider } from '@/components/ui/sidebar/provider';
import { SidebarTrigger } from '@/components/ui/sidebar/trigger';
import type { CatalogView } from '@/projects/schema';
import { CatalogNavigation } from './navigation';

export function CatalogBrowser({ catalog }: { catalog: CatalogView }) {
	return (
		<SidebarProvider className="py-8">
			<CatalogNavigation catalog={catalog} />
			<div className="min-w-0 flex-1" id="catalog-content">
				<SidebarTrigger />
				<Outlet />
			</div>
		</SidebarProvider>
	);
}
