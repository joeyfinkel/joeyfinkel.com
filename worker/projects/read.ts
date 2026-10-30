import { groups } from './groups';
import { libraries } from './libraries';

export function readProjects(request: Request) {
	if (!['GET', 'HEAD'].includes(request.method)) {
		return new Response('Method not allowed', {
			status: 405,
			headers: { Allow: 'GET, HEAD' },
		});
	}

	const summary = { publishedLibraryCount: libraries.length };
	const url = new URL(request.url);
	const catalog = url.pathname === '/api/projects/jfdevelops';
	const category = url.searchParams.get('category');
	const libraryName = url.searchParams.get('library');
	const catalogGroups = groups.map((group) => ({
		...group,
		libraries: libraries.filter((library) => library.group === group.id),
	}));
	const selectedLibrary = libraryName
		? libraries.find((library) => library.name === libraryName)
		: null;
	const selectedGroup =
		catalogGroups.find(
			(group) => group.id === (category ?? selectedLibrary?.group),
		) ?? null;

	if (
		catalog &&
		((libraryName && !selectedLibrary) ||
			(category && !selectedGroup) ||
			(selectedLibrary && selectedLibrary.group !== selectedGroup?.id))
	) {
		return Response.json(
			{ error: 'Category or library not found' },
			{ status: 404 },
		);
	}
	const data = catalog
		? {
				...summary,
				groups: catalogGroups,
				selectedGroup,
				selectedLibrary: selectedLibrary ?? null,
			}
		: summary;
	const response = Response.json(data, {
		headers: { 'Cache-Control': 'no-store' },
	});

	return request.method === 'HEAD'
		? new Response(null, { headers: response.headers })
		: response;
}
