import { Link } from '@tanstack/react-router';
import { type ReactNode, useRef } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { ProjectNavigation } from './navigation';
import './shell.css';

export function ProjectShell({ children }: { children: ReactNode }) {
	const mainRef = useRef<HTMLElement>(null);

	return (
		<div className="project-site">
			<Link
				to="."
				search
				hash="project-main"
				onClick={() => mainRef.current?.focus({ preventScroll: true })}
				className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-background focus-visible:p-3 focus-visible:shadow-md"
			>
				Skip to content
			</Link>
			<div className="project-site-layout">
				<aside className="project-site-sidebar">
					<div className="project-site-identity">
						<Link viewTransition to="/" className="project-site-name">
							Joey Finkel
						</Link>
						<ThemeToggle />
					</div>
					<p>Software developer & independent builder</p>
					<Link viewTransition to="/" className="project-site-back">
						← Back to home
					</Link>
					<ProjectNavigation />
				</aside>
				<main
					ref={mainRef}
					id="project-main"
					tabIndex={-1}
					className="project-site-content"
				>
					{children}
					<footer className="project-site-footer">
						<Link viewTransition to="/">
							Joey Finkel
						</Link>
						<Link
							to={new URL('https://github.com/joeyfinkel').href}
							reloadDocument
						>
							GitHub
						</Link>
						<Link to={new URL('https://jfdevelops.com').href} reloadDocument>
							JF Develops
						</Link>
					</footer>
				</main>
			</div>
		</div>
	);
}
