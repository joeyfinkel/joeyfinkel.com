import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { CategoryCard } from './-components/category-card';
import { Jfdevelops } from './-components/content';

const parentRoute = getRouteApi('/projects/jfdevelops');

export const Route = createFileRoute('/projects/jfdevelops/')({
	component: CatalogOverview,
});

function CatalogOverview() {
	const catalog = parentRoute.useLoaderData();

	return (
		<Jfdevelops>
			<h2 className="text-2xl font-medium tracking-tight">
				Choose a library or category to learn more.
			</h2>
			<p className="mt-3 text-sm leading-7 text-muted-foreground">
				Browse the packages below for installation details, examples, and
				documentation.
			</p>
			<div className="mt-7 grid gap-4 lg:grid-cols-2">
				{catalog.groups.map((group) => (
					<CategoryCard key={group.id} group={group} />
				))}
			</div>
		</Jfdevelops>
	);
}
