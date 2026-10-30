import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { CodeExample } from '@/components/code-example';
import type { LibraryGroupData } from '@/projects/schema';

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
			<div className="flex flex-wrap gap-3">
				<Link
					to={library.githubUrl}
					className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm hover:bg-secondary"
				>
					<img
						src="/brands/github.svg"
						alt=""
						width={20}
						height={20}
						className="size-5 dark:invert"
					/>
					GitHub
					<ArrowUpRight
						className="size-3.5 text-muted-foreground"
						aria-hidden="true"
					/>
				</Link>
				<Link
					to={new URL(`https://www.npmjs.com/package/${library.name}`).href}
					className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm hover:bg-secondary"
				>
					<img
						src="/brands/npm.svg"
						alt=""
						width={20}
						height={20}
						className="size-5 dark:invert"
					/>
					npm
					<ArrowUpRight
						className="size-3.5 text-muted-foreground"
						aria-hidden="true"
					/>
				</Link>
			</div>
			<div className="mt-8 border-t pt-6">
				<h3 className="text-base font-medium">How it fits together</h3>
				<p className="mt-3 text-sm leading-7 text-muted-foreground">
					{group.description}
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
