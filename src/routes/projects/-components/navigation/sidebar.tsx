import type { ReactNode } from 'react';
import { MobileSidebar } from '@/components/mobile-sidebar';
import { ThemeSelect } from '@/components/theme-select';
import { Sheet } from '@/components/ui/sheet';
import { Sidebar, useSidebar } from '@/components/ui/sidebar';

export function ProjectsSidebar({ children }: { children: ReactNode }) {
	const { isMobile, openMobile, setOpenMobile } = useSidebar();

	if (isMobile) {
		return (
			<Sheet open={openMobile} onOpenChange={setOpenMobile}>
				<MobileSidebar
					title="Projects"
					description="Choose a project, category or library."
				>
					{children}
					<div className="mt-6 flex items-center justify-between gap-4 border-t pt-5">
						<p className="text-sm text-muted-foreground">Appearance</p>
						<ThemeSelect />
					</div>
				</MobileSidebar>
			</Sheet>
		);
	}

	return (
		<Sidebar
			collapsible="none"
			className="sticky top-28 hidden h-fit max-h-[calc(100svh-8rem)] w-[17rem] shrink-0 overflow-y-auto bg-transparent md:flex"
		>
			{children}
		</Sidebar>
	);
}
