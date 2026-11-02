import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { SiteLayout } from '../../-site/components/layout';

export function ProjectsNotFound() {
	return (
		<SiteLayout>
			<p className="font-mono text-sm text-muted-foreground">404</p>
			<h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
				Project not found
			</h1>
			<p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
				There is no project at this address. Pick one of the projects below or
				browse the full list.
			</p>
			<div className="mt-8 flex flex-wrap items-center gap-3">
				<Button asChild>
					<Link to="/" hash="projects">
						Browse all projects
					</Link>
				</Button>
				<Button asChild variant="outline">
					<Link to="/projects/jfdevelops">jfdevelops</Link>
				</Button>
				<Button asChild variant="outline">
					<Link to="/projects/panedeck">PaneDeck</Link>
				</Button>
				<Button asChild variant="outline">
					<Link to="/projects/material-ui-helper">Material UI Helper</Link>
				</Button>
			</div>
		</SiteLayout>
	);
}
