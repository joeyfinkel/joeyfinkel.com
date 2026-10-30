import {
	type ComponentProps,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { SidebarContext } from './context';

// Adapted from shadcn/ui's sidebar: the docs navigation stays open on desktop.
export function SidebarProvider({
	className,
	children,
	...props
}: ComponentProps<'div'>) {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = useState(false);
	const toggleSidebar = useCallback(() => setOpenMobile((open) => !open), []);
	const value = useMemo(
		() => ({ isMobile, openMobile, setOpenMobile, toggleSidebar }),
		[isMobile, openMobile, toggleSidebar],
	);

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (isMobile && event.key === 'b' && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		}

		window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isMobile, toggleSidebar]);

	return (
		<SidebarContext.Provider value={value}>
			<div
				data-slot="sidebar-wrapper"
				className={cn('flex w-full items-start gap-10', className)}
				{...props}
			>
				{children}
			</div>
		</SidebarContext.Provider>
	);
}
