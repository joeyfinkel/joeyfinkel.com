import { SidebarContent } from '@/components/ui/sidebar';
import { JfdevelopsLinks } from './jfdevelops-links';
import { ProjectSwitcher } from './project-switcher';
import { ProjectsSidebar } from './sidebar';

export function ProjectsNavigation() {
	return (
		<ProjectsSidebar>
			<SidebarContent className="gap-0 pb-6">
				<ProjectSwitcher />
				<JfdevelopsLinks />
			</SidebarContent>
		</ProjectsSidebar>
	);
}
