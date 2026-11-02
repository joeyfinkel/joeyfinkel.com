import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { SiteLayout } from './layout';

export function NotFound() {
	return (
		<SiteLayout>
			<p className="font-mono text-sm text-muted-foreground">404</p>
			<h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
				Page not found
			</h1>
			<p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
				The page you are looking for does not exist, or it has moved somewhere
				else.
			</p>
			<div className="mt-8 flex flex-wrap items-center gap-3">
				<Button asChild>
					<Link to="/">Back to home</Link>
				</Button>
				<Button asChild variant="outline">
					<Link to="/" hash="projects">
						Browse projects
					</Link>
				</Button>
			</div>
		</SiteLayout>
	);
}
