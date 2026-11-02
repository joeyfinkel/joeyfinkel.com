import { Link } from '@tanstack/react-router';
import {
	SidebarContent,
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { projectLinks } from '../../-utils/links';
import { JfdevelopsLinks } from './jfdevelops-links';
import { ProjectsSidebar } from './sidebar';

export function ProjectsNavigation() {
	const { setOpenMobile } = useSidebar();

	return (
		<ProjectsSidebar>
			<SidebarContent>
				<nav aria-label="Project navigation" className="pb-6">
					{projectLinks.map((group) => (
						<SidebarGroup key={group.links[0]?.resource}>
							<SidebarMenu>
								{group.links.map((link) => (
									<SidebarMenuItem key={link.resource}>
										<SidebarMenuButton asChild>
											<Link
												to={link.href.given}
												activeProps={{
													className:
														'bg-sidebar-accent text-sidebar-accent-foreground',
												}}
												onClick={() => setOpenMobile(false)}
											>
												{link.label}
											</Link>
										</SidebarMenuButton>
										{link.resource === 'jfdevelops' && <JfdevelopsLinks />}
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroup>
					))}
				</nav>
			</SidebarContent>
		</ProjectsSidebar>
	);
}
