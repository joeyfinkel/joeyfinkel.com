import {
	type ErrorComponentProps,
	Link,
	useRouter,
} from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { SiteLayout } from './layout';

export function RouteError({ error, reset }: ErrorComponentProps) {
	const router = useRouter();
	const message = error instanceof Error ? error.message : String(error);

	return (
		<SiteLayout>
			<p className="font-mono text-sm text-muted-foreground">Error</p>
			<h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
				Something went wrong
			</h1>
			<p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
				An unexpected error stopped this page from loading. You can try again or
				head back home.
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
					<Link to="/">Back to home</Link>
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
