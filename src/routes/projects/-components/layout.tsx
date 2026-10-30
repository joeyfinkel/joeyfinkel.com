import { Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { ThemeSelect } from '@/components/theme-select';
import { Button } from '@/components/ui/button';

export function ProjectLayout({
	title,
	category,
	description,
	sourceUrl,
	sourceLabel = 'View on GitHub',
	children,
}: {
	title: string;
	category: string;
	description: string;
	sourceUrl: string;
	sourceLabel?: string;
	children: ReactNode;
}) {
	return (
		<div className="mx-auto max-w-4xl px-6 sm:px-10">
			<Link
				to="."
				hash="project-main"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:bg-background focus:p-3"
			>
				Skip to content
			</Link>
			<header className="flex flex-wrap items-center justify-between gap-4 border-b py-6">
				<Link
					to="/"
					hash="projects"
					className="inline-flex items-center gap-2 text-sm font-medium"
				>
					<ArrowLeft className="size-4" aria-hidden="true" />
					All projects
				</Link>
				<ThemeSelect />
			</header>
			<main id="project-main" className="pb-12">
				<div className="border-b py-14 sm:py-20">
					<p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
						{category}
					</p>
					<h1 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
						{title}
					</h1>
					<p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
						{description}
					</p>
					<Button
						asChild
						variant="outline"
						className="mt-6 rounded-full bg-transparent shadow-none"
					>
						<Link to={sourceUrl} reloadDocument>
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
