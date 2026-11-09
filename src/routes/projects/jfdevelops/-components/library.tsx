import { Link } from '@tanstack/react-router';
import { CodeExample } from '@/components/code-example';
import type { LibraryGroupData } from '@/projects/schema';
import { GroupDescription } from './description';

export function LibraryDetail({
	library,
	group,
}: {
	library: LibraryGroupData['libraries'][number];
	group: LibraryGroupData;
}) {
	const install = `pnpm add ${library.name}${group.id === 'forms' ? '@beta' : ''}`;

	return (
		<article aria-labelledby="library-heading">
			<h2
				data-project-title
				data-category-id={group.id}
				data-category-title={group.title}
				id="library-heading"
				className="break-words text-2xl font-medium tracking-tight"
			>
				{library.name}
			</h2>
			<p className="mt-4 text-sm leading-7 text-muted-foreground">
				{library.description}
			</p>
			<p className="mt-3 text-sm text-muted-foreground">
				Category:{' '}
				<Link
					to="/projects/jfdevelops/categories/$category"
					params={{ category: group.id }}
					className="text-primary underline underline-offset-4"
				>
					{group.title}
				</Link>
			</p>
			<CodeExample
				title="Install this library"
				language="Shell"
				code={install}
			/>
			<p className="flex flex-wrap gap-6 text-sm">
				<Link
					to={library.githubUrl}
					className="text-primary underline underline-offset-4"
				>
					GitHub <span aria-hidden="true">↗</span>
				</Link>
				<Link
					to={new URL(`https://www.npmjs.com/package/${library.name}`).href}
					className="text-primary underline underline-offset-4"
				>
					npm <span aria-hidden="true">↗</span>
				</Link>
			</p>
			<div className="mt-8 border-t pt-6">
				<h3 className="text-base font-medium">How it fits together</h3>
				<p className="mt-3 text-sm leading-7 text-muted-foreground">
					<GroupDescription group={group} />
				</p>
				<Link
					to="/projects/jfdevelops/categories/$category"
					params={{ category: group.id }}
					className="mt-4 inline-block text-sm text-primary underline underline-offset-4"
				>
					See the {group.title} example and companion libraries
				</Link>
			</div>
		</article>
	);
}
