import {
	type ErrorComponentProps,
	Link,
	useRouter,
} from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { SiteLayout } from '../../-site/components/layout';

export function ProjectsError({ error, reset }: ErrorComponentProps) {
	const router = useRouter();
	const message = error instanceof Error ? error.message : String(error);

	return (
		<SiteLayout>
			<p className="font-mono text-sm text-muted-foreground">Error</p>
			<h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
				This project could not be loaded
			</h1>
			<p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
				Something went wrong while loading this project. You can try again or
				browse the other projects.
			</p>
			<div className="mt-8 flex flex-wrap items-center gap-3">
				<Button
					type="button"
					onClick={() => {
						reset();
						void router.invalidate();
					}}
				>
					Try again
				</Button>
				<Button asChild variant="outline">
					<Link to="/" hash="projects">
						Browse all projects
					</Link>
				</Button>
			</div>
			{import.meta.env.DEV && (
				<p
					role="alert"
					className="mt-6 break-words font-mono text-xs text-destructive"
				>
					{message}
				</p>
			)}
		</SiteLayout>
	);
}
