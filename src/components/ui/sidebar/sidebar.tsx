import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { useSidebar } from './use-sidebar';

// shadcn/ui Sidebar, adapted to an in-flow docs rail and an accessible mobile sheet.
export function Sidebar({
	className,
	children,
	...props
}: ComponentProps<'aside'>) {
	const { isMobile, openMobile, setOpenMobile } = useSidebar();

	if (isMobile) {
		return (
			<Dialog.Root open={openMobile} onOpenChange={setOpenMobile}>
				<Dialog.Portal>
					<Dialog.Overlay className="fixed inset-0 z-[60] bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" />
					<Dialog.Content className="fixed inset-y-0 left-0 z-[60] w-[min(21rem,90vw)] overflow-y-auto border-r bg-background p-6 data-[state=open]:animate-in data-[state=open]:slide-in-from-left motion-reduce:animate-none">
						<Dialog.Title className="mb-1 text-lg font-medium">
							jfdevelops libraries
						</Dialog.Title>
						<Dialog.Description className="mb-8 text-xs text-muted-foreground">
							Choose a category or library.
						</Dialog.Description>
						<Dialog.Close
							aria-label="Close library navigation"
							className="absolute right-4 top-4 rounded-md p-2 hover:bg-secondary"
						>
							<X className="size-4" aria-hidden="true" />
						</Dialog.Close>
						{children}
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		);
	}

	return (
		<aside
			data-slot="sidebar"
			className={cn(
				'sticky top-28 hidden max-h-[calc(100svh-8rem)] w-60 shrink-0 overflow-y-auto pr-5 md:block',
				className,
			)}
			{...props}
		>
			{children}
		</aside>
	);
}
