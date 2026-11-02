import { Link } from '@tanstack/react-router';
import { StickyHeader } from '@/components/sticky-header';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileMenu } from './mobile-menu';
import { HomeNavigation } from './navigation';

export function HomeHeader() {
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
				<HomeNavigation className="items-center gap-4 text-xs" />
			</div>
			{isMobile && <MobileMenu />}
		</StickyHeader>
	);
}
