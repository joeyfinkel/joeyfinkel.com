import { createFileRoute, Link } from '@tanstack/react-router';
import { ProjectLayout } from './-components/layout';
import { CatalogError } from './-jfdevelops/components/error';
import { LibraryGroup } from './-jfdevelops/components/group';
import { loadCatalog } from './-jfdevelops/utils/load';

export const Route = createFileRoute('/projects/jfdevelops')({
	component: Jfdevelops,
	loader: loadCatalog,
	errorComponent: CatalogError,
});

function Jfdevelops() {
	const catalog = Route.useLoaderData();

	return (
		<ProjectLayout
			title="jfdevelops"
			category={`${catalog.publishedLibraryCount} published libraries`}
			description="Small, focused packages for building TypeScript and React applications. Find the pieces you need, see how they fit together, and start with a working pattern."
			sourceUrl="https://www.npmjs.com/search?q=%40jfdevelops"
			sourceLabel="Browse on npm"
		>
			<nav
				aria-label="Library groups"
				className="flex flex-wrap gap-x-6 gap-y-3 border-b py-6 text-xs text-primary"
			>
				{catalog.groups.map((group) => (
					<Link
						key={group.id}
						to="/projects/jfdevelops"
						hash={group.id}
						className="underline underline-offset-4"
					>
						{group.title}
					</Link>
				))}
			</nav>
			{catalog.groups.map((group) => (
				<LibraryGroup key={group.id} group={group} />
			))}
		</ProjectLayout>
	);
}
