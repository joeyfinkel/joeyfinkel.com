import { createRootRoute, Outlet } from '@tanstack/react-router';
import { RouteError } from './-site/components/error';
import { NotFound } from './-site/components/not-found';
import { loadResume } from './-site/utils/resume';

export const Route = createRootRoute({
	component: RootLayout,
	loader: loadResume,
	// The resume rarely changes, so load it once per visit instead of on every navigation.
	staleTime: Number.POSITIVE_INFINITY,
	notFoundComponent: NotFound,
	errorComponent: RouteError,
});

function RootLayout() {
	return <Outlet />;
}
