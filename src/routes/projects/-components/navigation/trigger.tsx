import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

export function ProjectsNavigationTrigger() {
	const { toggleSidebar, openMobile } = useSidebar();

	return (
		<Button
			type="button"
			variant="ghost"
			size="icon"
			className="shrink-0 rounded-full md:hidden"
			aria-label="Open project navigation"
			aria-expanded={openMobile}
			onClick={toggleSidebar}
		>
			<Menu className="size-5" aria-hidden="true" />
		</Button>
	);
}
