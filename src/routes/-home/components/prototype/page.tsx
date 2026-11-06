import { Link } from '@tanstack/react-router';
import { TechnologyLinks } from '@/components/technology-links';
import { ThemeToggle } from '@/components/theme-toggle';
import { projects } from '../../utils/projects';
import { PrototypePersonalLinks } from './personal-links';
import { PrototypeSwitcher } from './switcher';
import './prototype.css';

// Throwaway exploration: three quieter homepage structures on /?variant=.
export function HomePrototype({ variant }: { variant: 'A' | 'B' | 'C' }) {
	return (
		<div className="home-prototype" data-variant={variant}>
			<main className="prototype-page">
				<header className="prototype-intro">
					<div className="prototype-identity">
						<h1>Joey Finkel</h1>
						<ThemeToggle />
					</div>
					<p className="prototype-role">
						Software developer & independent builder
					</p>
					<p className="prototype-bio">
						I build web applications, open-source libraries, and tools that make
						everyday work a little easier.
					</p>
					<p className="prototype-bio">
						Working independently through{' '}
						<Link to={new URL('https://jfdevelops.com').href} reloadDocument>
							JF Develops
						</Link>
						.
					</p>
					<TechnologyLinks />
					<PrototypePersonalLinks />
				</header>
				<section
					className="prototype-work"
					aria-labelledby="prototype-work-heading"
				>
					<h2 id="prototype-work-heading">A few things I've made</h2>
					<ul>
						{projects.map((project) => (
							<li key={project.slug}>
								<span className="prototype-number" aria-hidden="true">
									{project.number}
								</span>
								<div>
									<Link
										viewTransition
										to={project.to}
										className="prototype-project-name"
									>
										{project.name} <span aria-hidden="true">↗</span>
									</Link>
									<p>{project.description}</p>
								</div>
							</li>
						))}
					</ul>
				</section>
				<footer className="prototype-footer">
					<span>Joey Finkel</span>
					<span>Made for the web.</span>
				</footer>
			</main>
			<PrototypeSwitcher variant={variant} />
		</div>
	);
}
