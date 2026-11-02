import { getRouteApi } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { JfdevelopsPage } from '../-utils/page';

const route = getRouteApi('/projects/jfdevelops');

export function Jfdevelops({ children }: { children: ReactNode }) {
	const catalog = route.useLoaderData();

	return (
		<JfdevelopsPage
			category={`${catalog.publishedLibraryCount} published libraries`}
		>
			<div className="py-8">{children}</div>
		</JfdevelopsPage>
	);
}
