import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { StickyHeader } from '@/components/sticky-header';
import { ThemeSelect } from '@/components/theme-select';
import { Experience } from './-home/components/experience';
import { HireMe } from './-home/components/hire-me';
import { Project } from './-home/components/project';
import { loadHome } from './-home/utils/load';
import { projects } from './-home/utils/projects';

export const Route = createFileRoute('/')({
	component: Home,
	loader: loadHome,
});

function Home() {
	const resume = Route.useLoaderData();

	return (
		<div className="mx-auto max-w-3xl px-6 sm:px-10">
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:bg-background focus:p-3"
			>
				Skip to content
			</a>
			<StickyHeader>
				<Link to="/" className="text-sm font-semibold tracking-tight">
					Joey Finkel<span className="text-primary">.</span>
				</Link>
				<nav
					aria-label="Main navigation"
					className="flex flex-wrap items-center gap-x-4 gap-y-3 text-xs text-muted-foreground"
				>
					<Link to="/" hash="projects" className="hover:text-primary">
						Projects
					</Link>
					<Link to="/" hash="experience" className="hover:text-primary">
						Experience
					</Link>
					<Link to="/" hash="hire-me" className="hover:text-primary">
						Hire me
					</Link>
					<Link
						to="."
						href={resume.resumeUrl}
						reloadDocument
						className="hover:text-primary"
					>
						Resume
					</Link>
					<a
						href="https://github.com/joeyfinkel"
						className="flex items-center gap-1 hover:text-primary"
					>
						GitHub <ArrowUpRight className="size-3.5" aria-hidden="true" />
					</a>
					<ThemeSelect />
				</nav>
			</StickyHeader>
			<main id="main">
				<section className="py-12 sm:py-16" aria-labelledby="intro">
					<h1
						id="intro"
						className="text-3xl font-medium tracking-tight sm:text-4xl"
					>
						Hi, I'm Joey.
					</h1>
					<p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">
						I'm a software developer. I work on web applications, open-source
						libraries, and developer tools. Here are some of my projects and the
						places I've worked.
					</p>
				</section>
				<section
					id="projects"
					className="scroll-mt-8"
					aria-labelledby="projects-heading"
				>
					<div className="mb-6 flex items-baseline justify-between">
						<h2 id="projects-heading" className="text-sm font-medium">
							Projects
						</h2>
					</div>
					<ul className="grid gap-4 sm:grid-cols-2">
						{projects.map((project) => (
							<Project
								key={project.name}
								project={project}
								publishedLibraryCount={resume.publishedLibraryCount}
							/>
						))}
					</ul>
				</section>
				<Experience
					experience={resume.experience}
					resumeUrl={resume.resumeUrl}
					unavailable={resume.unavailable}
				/>
				<HireMe />
			</main>
			<footer className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t py-8 text-xs text-muted-foreground">
				<p>Joey Finkel</p>
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
