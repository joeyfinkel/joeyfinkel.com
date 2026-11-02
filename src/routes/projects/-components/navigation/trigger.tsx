import { PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

export function ProjectsNavigationTrigger() {
	const { toggleSidebar, openMobile } = useSidebar();

	return (
		<Button
			type="button"
			variant="outline"
			className="mb-6 gap-2 md:hidden"
			aria-expanded={openMobile}
			onClick={toggleSidebar}
		>
			<PanelLeft className="size-4" aria-hidden="true" />
			Browse projects
		</Button>
	);
}
