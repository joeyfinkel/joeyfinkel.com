import { useMatches } from '@tanstack/react-router';
import { projectLinks } from './links';

type BreadcrumbOption = {
	label: string;
	to: string;
	hash?: string;
};

export type BreadcrumbSegment = BreadcrumbOption & {
	options?: Array<BreadcrumbOption>;
};

type JoinSegments<
	TSegments extends Array<string>,
	TDelimiter extends string = '/',
	TIncludeLeading extends boolean = false,
> = TSegments extends [infer TFirst, ...infer TRest]
	? TFirst extends string
		? TRest extends [string, ...Array<string>]
			? `${TIncludeLeading extends true ? TDelimiter : ''}${TFirst}${TDelimiter}${JoinSegments<TRest, TDelimiter>}`
			: `${TIncludeLeading extends true ? TDelimiter : ''}${TFirst}`
		: never
	: '';

function joinWithoutLeading<TSegments extends Array<string>>(
	...segments: TSegments
) {
	return segments.join('/') as JoinSegments<TSegments>;
}

function joinWithLeading<TSegments extends Array<string>>(
	...segments: TSegments
) {
	return `/${joinWithoutLeading(...segments)}` as const;
}

const createPath = Object.assign(joinWithLeading, {
	withoutLeading: joinWithoutLeading,
});

export function useBreadcrumbs() {
	const projectOptions = projectLinks.flatMap((group) =>
		group.links.map((link) => ({
			label: link.label,
			to: link.href.given,
		})),
	);
	const project = useMatches({
		select: (matches) => {
			for (const match of matches) {
				const routeId = match.routeId.replace(/\/$/, '');
				for (const group of projectLinks) {
					const link = group.links.find(
						({ resource }) => routeId === createPath('projects', resource),
					);

					if (link) {
						return {
							label: link.label,
							to: createPath('projects', link.resource),
							options: projectOptions,
						};
					}
				}
			}

			return null;
		},
	});
	const catalog = useMatches({
		select: (matches) =>
			matches.find((match) => match.routeId === '/projects/jfdevelops')
				?.loaderData,
	});
	const nested = useMatches({
		select: (matches) => {
			const projectsPath = createPath.withoutLeading('projects', 'jfdevelops');

			for (const match of matches) {
				if (
					match.routeId === '/projects/jfdevelops/$library' &&
					match.loaderData
				) {
					const { group, library } = match.loaderData;
					const groupOptions = catalog?.groups.map((catalogGroup) => ({
						label: catalogGroup.title,
						to: createPath(
							projectsPath,
							'categories',
							encodeURIComponent(catalogGroup.id),
						),
					}));
					const libraryOptions = group.libraries.map((groupLibrary) => ({
						label: groupLibrary.name,
						to: createPath(
							projectsPath,
							encodeURIComponent(groupLibrary.name.replace('@jfdevelops/', '')),
						),
					}));

					return [
						{
							label: group.title,
							to: createPath(
								projectsPath,
								'categories',
								encodeURIComponent(group.id),
							),
							options: groupOptions,
						},
						{
							label: library.name,
							to: createPath(
								projectsPath,
								encodeURIComponent(library.name.replace('@jfdevelops/', '')),
							),
							options: libraryOptions,
						},
					];
				}

				if (
					match.routeId === '/projects/jfdevelops/categories/$category' &&
					match.loaderData
				) {
					const group = match.loaderData;
					const groupOptions = catalog?.groups.map((catalogGroup) => ({
						label: catalogGroup.title,
						to: createPath(
							projectsPath,
							'categories',
							encodeURIComponent(catalogGroup.id),
						),
					}));

					return [
						{
							label: group.title,
							to: createPath(
								projectsPath,
								'categories',
								encodeURIComponent(group.id),
							),
							options: groupOptions,
						},
					];
				}
			}

			return [];
		},
	});

	return [
		{ label: 'Projects', to: '/' as const, hash: 'projects' },
		...(project ? [project] : []),
		...nested,
	] satisfies Array<BreadcrumbSegment>;
}
