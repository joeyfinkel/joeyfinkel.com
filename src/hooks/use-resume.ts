import { getRouteApi } from '@tanstack/react-router';

const rootRoute = getRouteApi('__root__');

export function useResume() {
	return rootRoute.useLoaderData();
}
