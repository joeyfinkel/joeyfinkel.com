import { Link } from '@tanstack/react-router';
import { Sidebar } from '@/components/ui/sidebar/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { projectLinks } from '../../-utils/links';
import { JfdevelopsLinks } from './jfdevelops-links';

const links = projectLinks.flatMap((group) => group.links);

export function ProjectsNavigation() {
	const { setOpenMobile } = useSidebar();

	return (
		<Sidebar>
			<nav aria-label="Project navigation" className="pb-6">
				<ul className="space-y-4">
					{links.map((link) => (
						<li key={link.resource}>
							<Link
								to={link.href.given}
								activeProps={{ className: 'text-primary' }}
								onClick={() => setOpenMobile(false)}
								className="block text-sm font-medium hover:text-primary"
							>
								{link.label}
							</Link>
							{link.resource === 'jfdevelops' && <JfdevelopsLinks />}
						</li>
					))}
				</ul>
			</nav>
		</Sidebar>
	);
}
