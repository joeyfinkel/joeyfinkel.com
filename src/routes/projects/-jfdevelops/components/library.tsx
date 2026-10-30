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
			<Link
				to="/projects/jfdevelops"
				search={{ category: group.id }}
				className="text-xs text-primary underline underline-offset-4"
			>
				{group.title}
			</Link>
			<h2
				id="library-heading"
				className="mt-4 break-words text-2xl font-medium tracking-tight"
			>
				{library.name}
			</h2>
			<p className="mt-4 text-sm leading-7 text-muted-foreground">
				{library.description}
			</p>
			<CodeExample
				title="Install this library"
				language="Shell"
				code={install}
			/>
			<Link
				to={new URL(`https://www.npmjs.com/package/${library.name}`).href}
				className="inline-flex items-center gap-2 text-sm text-primary underline underline-offset-4"
			>
				Package documentation on npm
				<ArrowUpRight className="size-4" aria-hidden="true" />
			</Link>
			<div className="mt-8 border-t pt-6">
				<h3 className="text-base font-medium">How it fits together</h3>
				<p className="mt-3 text-sm leading-7 text-muted-foreground">
					{group.description}
				</p>
				<Link
					to="/projects/jfdevelops"
					search={{ category: group.id }}
					className="mt-4 inline-block text-sm text-primary underline underline-offset-4"
				>
					See the {group.title} example and companion libraries
				</Link>
			</div>
		</article>
	);
}
