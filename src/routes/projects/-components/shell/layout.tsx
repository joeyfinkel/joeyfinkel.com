import { Link, useLocation } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ProjectMobileMenu } from './mobile-menu';
import { ProjectNavigation } from './navigation';
import './shell.css';

export function ProjectShell({
	children,
	breadcrumbs,
}: {
	children: ReactNode;
	breadcrumbs: ReactNode;
}) {
	const pathname = useLocation({ select: (location) => location.pathname });

	return (
		<div className="project-site">
			<SidebarProvider open className="contents">
				<header className="project-site-header">
					<div className="project-site-toolbar">
						<ProjectMobileMenu key={pathname} />
						{breadcrumbs}
						<ThemeToggle />
					</div>
				</header>
				<div className="project-site-layout">
					<aside className="project-site-sidebar">
						<Link viewTransition to="/" className="project-site-name">
							Joey Finkel
						</Link>
						<p>Software developer & independent builder</p>
						<Link viewTransition to="/" className="project-site-back">
							← Back to home
						</Link>
						<div className="project-site-desktop-nav">
							<ProjectNavigation />
						</div>
					</aside>
					<main id="project-main" className="project-site-content">
						{children}
						<footer className="project-site-footer">
							<Link viewTransition to="/">
								Joey Finkel
							</Link>
							<span>Made for the web.</span>
						</footer>
					</main>
				</div>
			</SidebarProvider>
		</div>
	);
}
