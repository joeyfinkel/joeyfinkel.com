import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
	component: Outlet,
	notFoundComponent: function NotFound() {
		return (
			<main className="mx-auto max-w-3xl px-6 py-24">
				<h1 className="mb-4 text-3xl font-semibold">Page not found</h1>
				<Link to="/" className="underline underline-offset-4">
					Back to home
				</Link>
			</main>
		);
	},
});
