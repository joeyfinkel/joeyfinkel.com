import { getRouteApi, Link } from '@tanstack/react-router';
import { ArrowUpRight, FileText } from 'lucide-react';
import { BrandIcon } from '@/components/brand-icon';
import { resumeUrl } from '@/lib/resume-url';
import { cn } from '@/lib/utils';

const rootRoute = getRouteApi('__root__');

export function SiteNavigation({
	onNavigate,
	className,
}: {
	onNavigate?: () => void;
	className?: string;
}) {
	const hasCredentials = rootRoute.useLoaderData({
		select: ({ credentials }) => credentials.length > 0,
	});

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
			{hasCredentials && (
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
			<Link
				to={resumeUrl}
				onClick={onNavigate}
				className="inline-flex items-center gap-2 hover:text-primary"
			>
				<FileText className="size-4" aria-hidden="true" />
				Resume
			</Link>
			<Link
				to={new URL('https://github.com/joeyfinkel').href}
				onClick={onNavigate}
				className="inline-flex items-center gap-1 hover:text-primary"
			>
				<BrandIcon name="github" />
				GitHub
				<ArrowUpRight className="size-3.5" aria-hidden="true" />
			</Link>
		</nav>
	);
}
