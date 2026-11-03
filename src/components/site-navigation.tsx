import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { resumeUrl } from '@/lib/resume-url';
import { cn } from '@/lib/utils';

export function SiteNavigation({
	onNavigate,
	showCredentials = false,
	className,
}: {
	onNavigate?: () => void;
	showCredentials?: boolean;
	className?: string;
}) {
	return (
		<nav
			aria-label="Main navigation"
			className={cn('flex gap-5 text-sm text-muted-foreground', className)}
		>
			<Link
				to="/"
				hash="projects"
				onClick={onNavigate}
				className="hover:text-primary"
			>
				Projects
			</Link>
			<Link
				to="/"
				hash="experience"
				onClick={onNavigate}
				className="hover:text-primary"
			>
				Experience
			</Link>
			{showCredentials && (
				<Link
					to="/"
					hash="credentials"
					onClick={onNavigate}
					className="hover:text-primary"
				>
					Credentials
				</Link>
			)}
			<Link
				to="/"
				hash="hire-me"
				onClick={onNavigate}
				className="hover:text-primary"
			>
				Hire me
			</Link>
			<Link to={resumeUrl} onClick={onNavigate} className="hover:text-primary">
				Resume
			</Link>
			<Link
				to={new URL('https://github.com/joeyfinkel').href}
				onClick={onNavigate}
				className="inline-flex items-center gap-1 hover:text-primary"
			>
				GitHub
				<ArrowUpRight className="size-3.5" aria-hidden="true" />
			</Link>
		</nav>
	);
}
