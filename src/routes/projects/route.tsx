import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
} from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { RetryButton } from './-components/retry-button';
import { ProjectsPage } from './-utils/page';

export const Route = createFileRoute('/projects')({
	beforeLoad: ({ location }) => {
		if (location.pathname.replace(/\/$/, '') === '/projects') {
			throw redirect({ to: '/', hash: 'projects' });
		}
	},
	component: function ProjectsRoute() {
		return (
			<ProjectsPage>
				<Outlet />
			</ProjectsPage>
		);
	},
	errorComponent: function ProjectsRouteError({ error }) {
		return (
			<ProjectsPage.Error
				message={
					import.meta.env.DEV && error instanceof Error
						? error.message
						: undefined
				}
			>
				<RetryButton />
			</ProjectsPage.Error>
		);
	},
	notFoundComponent: function ProjectsRouteNotFound() {
		return (
			<ProjectsPage.NotFound
				title="Project not found"
				description="There is no project at this address. Pick one from the list or browse them all."
			>
				<Button asChild>
					<Link to="/" hash="projects">
						Browse all projects
					</Link>
				</Button>
			</ProjectsPage.NotFound>
		);
	},
});
