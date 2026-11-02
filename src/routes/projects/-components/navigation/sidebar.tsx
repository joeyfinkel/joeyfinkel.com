import type { ReactNode } from 'react';
import { ThemeSelect } from '@/components/theme-select';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { Sidebar, useSidebar } from '@/components/ui/sidebar';

export function ProjectsSidebar({ children }: { children: ReactNode }) {
	const { isMobile, openMobile, setOpenMobile } = useSidebar();

	if (isMobile) {
		return (
			<Sheet open={openMobile} onOpenChange={setOpenMobile}>
				<SheetContent
					side="left"
					className="w-[min(21rem,90vw)] gap-0 bg-background p-6 sm:max-w-none"
				>
					<SheetHeader className="mb-8 gap-1 p-0">
						<SheetTitle className="text-lg font-medium">Projects</SheetTitle>
						<SheetDescription className="text-xs">
							Choose a project, category or library.
						</SheetDescription>
					</SheetHeader>
					{children}
					<div className="mt-6 flex shrink-0 items-center justify-between gap-4 border-t pt-5">
						<p className="text-sm text-muted-foreground">Appearance</p>
						<ThemeSelect />
					</div>
				</SheetContent>
			</Sheet>
		);
	}

	return (
		<Sidebar
			collapsible="none"
			className="sticky top-28 hidden h-fit max-h-[calc(100svh-8rem)] w-60 shrink-0 overflow-y-auto bg-transparent pr-5 md:flex"
		>
			{children}
		</Sidebar>
	);
}
