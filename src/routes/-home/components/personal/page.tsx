import { Link } from '@tanstack/react-router';
import { ThemeToggle } from '@/components/theme-toggle';
import { projects } from '../../utils/projects';
import { PersonalLinks } from './personal-links';
import './personal.css';

export function HomePage() {
	return (
		<div className="personal-home">
			<main id="main" className="personal-page">
				<header className="personal-intro">
					<div className="personal-identity">
						<h1>Joey Finkel</h1>
						<ThemeToggle />
					</div>
					<p className="personal-role">
						Software developer & independent builder
					</p>
					<p className="personal-bio">
						I build web applications, open-source libraries, and tools that make
						everyday work a little easier.
					</p>
					<p className="personal-bio">
						Working independently through{' '}
						<Link to={new URL('https://jfdevelops.com').href} reloadDocument>
							JF Develops
						</Link>
						.
					</p>
					<p className="personal-stack">React · TypeScript · C# / .NET</p>
					<PersonalLinks />
				</header>
				<section
					id="projects"
					className="personal-work"
					aria-labelledby="personal-work-heading"
				>
					<h2 id="personal-work-heading">A few things I've made</h2>
					<ul>
						{projects.map((project) => (
							<li key={project.slug}>
								<span className="personal-number" aria-hidden="true">
									{project.number}
								</span>
								<div>
									<Link
										viewTransition
										to={project.to}
										className="personal-project-name"
									>
										{project.name} <span aria-hidden="true">↗</span>
									</Link>
									<p>{project.description}</p>
								</div>
							</li>
						))}
					</ul>
				</section>
				<footer className="personal-footer">
					<span>Joey Finkel</span>
					<span>Made for the web.</span>
				</footer>
			</main>
		</div>
	);
}
