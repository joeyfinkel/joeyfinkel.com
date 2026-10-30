import { Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { StickyHeader } from '@/components/sticky-header';
import { ThemeSelect } from '@/components/theme-select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ProjectLayout({
	title,
	category,
	description,
	sourceUrl,
	sourceLabel = 'View on GitHub',
	children,
	presentation,
}: {
	title: string;
	category: string;
	description: string;
	sourceUrl: string;
	sourceLabel?: string;
	children: ReactNode;
	presentation: string;
}) {
	const isGitHub = new URL(sourceUrl).hostname === 'github.com';

	return (
		<div
			className={cn(
				'mx-auto px-6 sm:px-10',
				presentation === 'docs' ? 'max-w-6xl' : 'max-w-4xl',
			)}
		>
			<Link
				to="."
				hash="project-main"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:bg-background focus:p-3"
			>
				Skip to content
			</Link>
			<StickyHeader>
				<Link
					to="/"
					hash="projects"
					className="inline-flex items-center gap-2 text-sm font-medium"
				>
					<ArrowLeft className="size-4" aria-hidden="true" />
					All projects
				</Link>
				<ThemeSelect />
			</StickyHeader>
			<main id="project-main" className="pb-12">
				<div className="border-b py-8 sm:py-10">
					<h1 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
						{title}
					</h1>
					<p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
						{description}
					</p>
					<p className="mt-3 text-sm text-muted-foreground">{category}</p>
					<Button
						asChild
						variant="outline"
						className="mt-6 rounded-full bg-transparent shadow-none"
					>
						<Link to={sourceUrl} reloadDocument>
							<img
								src={isGitHub ? '/brands/github.svg' : '/brands/npm.svg'}
								alt=""
								width={20}
								height={20}
								className="size-5 dark:invert"
							/>
							{sourceLabel}
							<ArrowUpRight aria-hidden="true" />
						</Link>
					</Button>
				</div>
				{children}
			</main>
			<footer className="flex flex-wrap justify-between gap-4 border-t py-8 text-xs text-muted-foreground">
				<Link to="/">Joey Finkel</Link>
				<Link
					to="/"
					hash="hire-me"
					className="text-primary underline underline-offset-4"
				>
					Have a project in mind? Let’s talk.
				</Link>
			</footer>
		</div>
	);
}
