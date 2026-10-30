import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Project } from './-home/components/project';
import { projects } from './-home/projects';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
	return (
		<div className="mx-auto max-w-3xl px-6 sm:px-10">
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:bg-background focus:p-3"
			>
				Skip to content
			</a>
			<header className="flex items-center justify-between border-b py-7">
				<Link to="/" className="text-sm font-semibold tracking-tight">
					Joey Finkel<span className="text-primary">.</span>
				</Link>
				<nav
					aria-label="Main navigation"
					className="flex items-center gap-6 text-xs text-muted-foreground"
				>
					<Link to="/" hash="projects" className="hover:text-primary">
						Projects
					</Link>
					<a
						href="https://github.com/joeyfinkel"
						className="flex items-center gap-1 hover:text-primary"
					>
						GitHub <ArrowUpRight className="size-3.5" aria-hidden="true" />
					</a>
				</nav>
			</header>
			<main id="main">
				<section
					className="pb-20 pt-20 sm:pb-24 sm:pt-28"
					aria-labelledby="intro"
				>
					<p className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
						<span
							className="size-1.5 rounded-full bg-primary"
							aria-hidden="true"
						/>
						A little corner of the internet
					</p>
					<h1
						id="intro"
						className="max-w-xl text-5xl leading-[1.1] font-medium tracking-[-0.045em] sm:text-6xl"
					>
						Building things.
						<br />
						<span className="text-muted-foreground">Making them useful.</span>
					</h1>
					<p className="mt-7 max-w-md text-base leading-8 text-muted-foreground">
						I’m Joey, a software developer. This is home to the projects I’m
						working on, the libraries I’ve created, and the ideas I’m turning
						into something real.
					</p>
					<Button
						asChild
						variant="outline"
						className="mt-8 rounded-full bg-transparent px-5 shadow-none"
					>
						<Link to="/" hash="projects">
							Explore my work <ArrowDown aria-hidden="true" />
						</Link>
					</Button>
				</section>
				<section
					id="projects"
					className="scroll-mt-8"
					aria-labelledby="projects-heading"
				>
					<div className="mb-6 flex items-baseline justify-between">
						<h2 id="projects-heading" className="text-sm font-medium">
							Selected projects
						</h2>
						<span className="font-mono text-[11px] text-muted-foreground">
							Always a work in progress
						</span>
					</div>
					<ul>
						{projects.map((project) => (
							<Project key={project.name} project={project} />
						))}
					</ul>
				</section>
			</main>
			<footer className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t py-8 text-xs text-muted-foreground">
				<p>
					Joey Finkel{' '}
					<span className="mx-2" aria-hidden="true">
						/
					</span>{' '}
					Built with intention.
				</p>
				<a
					href="https://github.com/joeyfinkel"
					className="flex items-center gap-1 hover:text-primary"
				>
					Find me on GitHub{' '}
					<ArrowUpRight className="size-3.5" aria-hidden="true" />
				</a>
			</footer>
		</div>
	);
}
