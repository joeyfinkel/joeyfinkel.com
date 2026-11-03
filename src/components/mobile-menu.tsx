import { Menu } from 'lucide-react';
import { useState } from 'react';
import { MobileSidebar } from '@/components/mobile-sidebar';
import { ThemeSelect } from '@/components/theme-select';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { SiteNavigation } from './site-navigation';

export function MobileMenu({
	showCredentials = false,
}: {
	showCredentials?: boolean;
}) {
	const [open, setOpen] = useState(false);
	const isMobile = useIsMobile();

	if (!isMobile) {
		return null;
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="shrink-0 rounded-full md:hidden"
					aria-label="Open navigation"
				>
					<Menu className="size-5" aria-hidden="true" />
				</Button>
			</SheetTrigger>
			<MobileSidebar
				title="Navigation"
				description="Site links and color theme settings."
			>
				<SiteNavigation
					onNavigate={() => setOpen(false)}
					showCredentials={showCredentials}
					className="flex-col items-start gap-1 [&>a]:w-full [&>a]:py-3"
				/>
				<div className="mt-6 flex items-center justify-between gap-4 border-t pt-5">
					<p className="text-sm text-muted-foreground">Appearance</p>
					<ThemeSelect />
				</div>
			</MobileSidebar>
		</Sheet>
	);
}
