import { ReactLayoutDevtools } from '@jfdevelops/react-layout-devtools-react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { RouteError } from './-site/components/error';
import { NotFound } from './-site/components/not-found';
import { projectLayouts } from './projects/-utils/layout/base';

export const Route = createRootRoute({
	component: RootLayout,
	notFoundComponent: NotFound,
	errorComponent: RouteError,
});

function RootLayout() {
	return (
		<>
			<Outlet />
			{import.meta.env.DEV && <ReactLayoutDevtools source={projectLayouts} />}
		</>
	);
}
