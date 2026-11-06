import { Link } from '@tanstack/react-router';
import { projects } from '../../../-home/utils/projects';
import { JfdevelopsLinks } from '../navigation/jfdevelops-links';

export function PrototypeNavigation() {
	return (
		<>
			<nav aria-label="Projects" className="project-prototype-nav">
				<h2>Things I've made</h2>
				{projects.map((project) => (
					<Link
						viewTransition
						key={project.slug}
						to={project.to}
						activeProps={{ 'aria-current': 'page' }}
					>
						<span>{project.number}</span>
						{project.name}
					</Link>
				))}
			</nav>
			<div className="project-prototype-library-scroll">
				<JfdevelopsLinks />
			</div>
		</>
	);
}
