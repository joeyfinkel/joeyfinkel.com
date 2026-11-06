import { getRouteApi } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { TechnologyLinks } from '@/components/technology-links';
import { JfdevelopsPage } from '../-utils/page';

const route = getRouteApi('/projects/jfdevelops');

export function Jfdevelops({ children }: { children: ReactNode }) {
	const catalog = route.useLoaderData();

	return (
		<JfdevelopsPage
			category={
				<>
					<span>{catalog.publishedLibraryCount} published libraries</span>
					<TechnologyLinks icons={['react', 'typescript']} />
				</>
			}
		>
			<div className="py-8">{children}</div>
		</JfdevelopsPage>
	);
}
