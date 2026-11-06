import { Link, useLocation } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PrototypeMobileMenu } from './mobile-menu';
import { PrototypeNavigation } from './navigation';
import './prototype.css';

// Throwaway extension of homepage variant B, using the existing project content.
export function ProjectPrototype({
	children,
	breadcrumbs,
}: {
	children: ReactNode;
	breadcrumbs: ReactNode;
}) {
	const pathname = useLocation({ select: (location) => location.pathname });

	return (
		<div className="project-prototype">
			<SidebarProvider open className="contents">
				<header className="project-prototype-header">
					<div className="project-prototype-toolbar">
						<PrototypeMobileMenu key={pathname} />
						{breadcrumbs}
						<ThemeToggle />
					</div>
				</header>
				<div className="project-prototype-layout">
					<aside className="project-prototype-sidebar">
						<Link
							viewTransition
							to="/"
							search={{ variant: 'B' }}
							className="project-prototype-name"
						>
							Joey Finkel
						</Link>
						<p>Software developer & independent builder</p>
						<Link
							viewTransition
							to="/"
							search={{ variant: 'B' }}
							className="project-prototype-back"
						>
							← Back to home
						</Link>
						<div className="project-prototype-desktop-nav">
							<PrototypeNavigation />
						</div>
					</aside>
					<main id="project-main" className="project-prototype-content">
						{children}
						<footer className="project-prototype-footer">
							<Link viewTransition to="/" search={{ variant: 'B' }}>
								Joey Finkel
							</Link>
							<span>Made for the web.</span>
						</footer>
					</main>
				</div>
			</SidebarProvider>
			<div className="project-prototype-label">PROTOTYPE B · Work index</div>
		</div>
	);
}
