import { Link } from '@tanstack/react-router';
import { FileText, Mail } from 'lucide-react';
import { BrandIcon } from '@/components/brand-icon';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { resumeUrl } from '@/lib/resume-url';

export function PersonalLinks() {
	return (
		<nav aria-label="Personal links" className="personal-links">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							to={new URL('https://github.com/joeyfinkel').href}
							reloadDocument
							aria-label="GitHub"
							className="personal-github"
						>
							<BrandIcon name="github" />
						</Link>
					</TooltipTrigger>
					<TooltipContent sideOffset={4}>GitHub</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<Link to={resumeUrl}>
				<FileText size={16} aria-hidden="true" />
				Résumé
			</Link>
			<Link to={new URL('https://jfdevelops.com').href} reloadDocument>
				<Mail size={16} aria-hidden="true" />
				Get in touch
			</Link>
		</nav>
	);
}
