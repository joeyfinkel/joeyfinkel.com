import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Credentials } from './-home/components/credentials';
import { Experience } from './-home/components/experience';
import { HomeHeader } from './-home/components/header';
import { HireMe } from './-home/components/hire-me';
import { Project } from './-home/components/project';
import { loadHome } from './-home/utils/load';
import { projects } from './-home/utils/projects';

const rootRoute = getRouteApi('__root__');

export const Route = createFileRoute('/')({
	component: Home,
	loader: loadHome,
});

function Home() {
	const { publishedLibraryCount } = Route.useLoaderData();
	const hasCredentials = rootRoute.useLoaderData({
		select: ({ credentials }) => credentials.length > 0,
	});

	return (
		<div className="mx-auto max-w-[57.5rem] px-6 sm:px-10">
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:bg-background focus:p-3"
			>
				Skip to content
			</a>
			<HomeHeader />
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
					<div className="mb-8">
						<h2
							id="projects-heading"
							className="text-2xl font-medium tracking-tight sm:text-3xl"
						>
							Selected projects
						</h2>
						<p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
							Desktop tools and developer libraries built to make everyday work
							easier.
						</p>
					</div>
					<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{projects.map((project) => (
							<Project
								key={project.name}
								project={project}
								publishedLibraryCount={publishedLibraryCount}
							/>
						))}
					</ul>
				</section>
				<Experience />
				{hasCredentials && <Credentials />}
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
