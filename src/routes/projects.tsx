import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { ProjectsError } from './projects/-components/error';
import { ProjectsNotFound } from './projects/-components/not-found';

export const Route = createFileRoute('/projects')({
	beforeLoad: ({ location }) => {
		if (location.pathname.replace(/\/$/, '') === '/projects') {
			throw redirect({ to: '/', hash: 'projects' });
		}
	},
	component: Outlet,
	errorComponent: ProjectsError,
	notFoundComponent: ProjectsNotFound,
});
