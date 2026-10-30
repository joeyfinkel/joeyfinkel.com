import { useMatches } from '@tanstack/react-router';

export function useBreadcrumbs(title: string, projectPath: string) {
	const nested = useMatches({
		select: (matches) => {
			for (const match of matches) {
				if (
					match.routeId === '/projects/jfdevelops/$library' &&
					match.loaderData
				) {
					const { group, library } = match.loaderData;

					return [
						{
							label: group.title,
							to: `/projects/jfdevelops/categories/${encodeURIComponent(group.id)}`,
						},
						{
							label: library.name,
							to: `/projects/jfdevelops/${encodeURIComponent(library.name.replace('@jfdevelops/', ''))}`,
						},
					];
				}

				if (
					match.routeId === '/projects/jfdevelops/categories/$category' &&
					match.loaderData
				) {
					const group = match.loaderData;

					return [
						{
							label: group.title,
							to: `/projects/jfdevelops/categories/${encodeURIComponent(group.id)}`,
						},
					];
				}
			}

			return [];
		},
	});

	return [
		{ label: 'Projects', to: '/', hash: 'projects' },
		{ label: title, to: projectPath },
		...nested,
	];
}
