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
	const catalog = new URL(request.url).pathname === '/api/projects/jfdevelops';
	const data = catalog
		? {
				...summary,
				groups: groups.map((group) => ({
					...group,
					libraries: libraries.filter((library) => library.group === group.id),
				})),
			}
		: summary;
	const response = Response.json(data, {
		headers: { 'Cache-Control': 'no-store' },
	});

	return request.method === 'HEAD'
		? new Response(null, { headers: response.headers })
		: response;
}
