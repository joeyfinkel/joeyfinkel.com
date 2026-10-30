import { Link } from '@tanstack/react-router';
import { StickyHeader } from '@/components/sticky-header';
import { ThemeSelect } from '@/components/theme-select';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileMenu } from './mobile-menu';
import { HomeNavigation } from './navigation';

export function HomeHeader({ resumeUrl }: { resumeUrl: string }) {
	const isMobile = useIsMobile();

	return (
		<StickyHeader>
			<Link
				to="/"
				className="shrink-0 whitespace-nowrap text-sm font-semibold tracking-tight"
			>
				Joey Finkel<span className="text-primary">.</span>
			</Link>
			<div className="hidden items-center gap-4 md:flex">
				<HomeNavigation
					resumeUrl={resumeUrl}
					className="items-center gap-4 text-xs"
				/>
				<ThemeSelect />
			</div>
			{isMobile && <MobileMenu resumeUrl={resumeUrl} />}
		</StickyHeader>
	);
}
