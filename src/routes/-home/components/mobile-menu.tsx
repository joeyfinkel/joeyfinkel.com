import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ThemeSelect } from '@/components/theme-select';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { HomeNavigation } from './navigation';

export function MobileMenu({ resumeUrl }: { resumeUrl: string }) {
	const [open, setOpen] = useState(false);
	const isMobile = useIsMobile();

	useEffect(() => {
		if (!isMobile) {
			setOpen(false);
		}
	}, [isMobile]);

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="shrink-0 rounded-full md:hidden"
					aria-label="Open navigation"
				>
					<Menu className="size-5" aria-hidden="true" />
				</Button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-[60] bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" />
				<Dialog.Content className="fixed inset-x-4 top-4 z-[60] max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl border bg-background p-6 shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 motion-reduce:animate-none">
					<Dialog.Title className="text-base font-medium">
						Navigation
					</Dialog.Title>
					<Dialog.Description className="sr-only">
						Site links and color theme settings.
					</Dialog.Description>
					<Dialog.Close asChild>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="absolute right-3 top-3 rounded-full"
							aria-label="Close navigation"
						>
							<X className="size-5" aria-hidden="true" />
						</Button>
					</Dialog.Close>
					<HomeNavigation
						resumeUrl={resumeUrl}
						onNavigate={() => setOpen(false)}
						className="mt-7 flex-col items-start gap-1 [&>a]:w-full [&>a]:py-3"
					/>
					<div className="mt-6 flex items-center justify-between gap-4 border-t pt-5">
						<p className="text-sm text-muted-foreground">Appearance</p>
						<ThemeSelect />
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
