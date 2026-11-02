import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { CodeExample } from '@/components/code-example';
import type { LibraryGroupData } from '@/projects/schema';
import { GroupDescription } from './description';

export function LibraryGroup({ group }: { group: LibraryGroupData }) {
	return (
		<section
			id={group.id}
			aria-labelledby={`${group.id}-heading`}
			className="scroll-mt-32"
		>
			<h2
				data-project-title
				data-category-id={group.id}
				id={`${group.id}-heading`}
				className="text-2xl font-medium tracking-tight"
			>
				{group.title}
			</h2>
			<p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
				<GroupDescription group={group} />
			</p>
			<ul
				aria-label={`${group.title} packages`}
				className="mt-6 grid gap-3 sm:grid-cols-2"
			>
				{group.libraries.map((library) => (
					<li key={library.name} className="min-w-0 rounded-xl border p-5">
						<Link
							to="/projects/jfdevelops/$library"
							params={{ library: library.name.replace('@jfdevelops/', '') }}
							className="flex items-start gap-2 font-mono text-xs leading-6 text-primary underline underline-offset-4"
						>
							<span className="min-w-0 break-all">{library.name}</span>
							<ArrowUpRight
								className="mt-1.5 size-3 shrink-0"
								aria-hidden="true"
							/>
						</Link>
						<p className="mt-2 text-xs leading-6 text-muted-foreground">
							{library.description}
						</p>
					</li>
				))}
			</ul>
			<CodeExample title="Get started" language="Shell" code={group.install} />
			<CodeExample
				title={group.example.title}
				language={group.example.language}
				code={group.example.code}
			/>
			<Link
				to={group.example.sourceUrl}
				className="text-xs text-primary underline underline-offset-4"
			>
				Read the full documentation <span aria-hidden="true">↗</span>
			</Link>
		</section>
	);
}
