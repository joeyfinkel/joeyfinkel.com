import { Link } from '@tanstack/react-router';
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
			<ul aria-label={`${group.title} packages`} className="mt-6">
				{group.libraries.map((library) => (
					<li
						key={library.name}
						className="min-w-0 border-t py-4 first:border-t-0 first:pt-0"
					>
						<Link
							to="/projects/jfdevelops/$library"
							params={{ library: library.name.replace('@jfdevelops/', '') }}
							className="text-sm font-medium break-all underline-offset-4 hover:underline"
						>
							{library.name}
						</Link>
						<p className="mt-1 text-[13px] leading-6 text-muted-foreground">
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
