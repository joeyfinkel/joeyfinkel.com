import { Link } from '@tanstack/react-router';
import { MobileMenu } from '@/components/mobile-menu';
import { SiteNavigation } from '@/components/site-navigation';
import { StickyHeader } from '@/components/sticky-header';

export function HomeHeader({ showCredentials }: { showCredentials: boolean }) {
	return (
		<StickyHeader>
			<Link
				to="/"
				className="shrink-0 whitespace-nowrap text-sm font-semibold tracking-tight"
			>
				Joey Finkel<span className="text-primary">.</span>
			</Link>
			<div className="hidden items-center gap-4 md:flex">
				<SiteNavigation
					showCredentials={showCredentials}
					className="items-center gap-4 text-xs"
				/>
			</div>
			<MobileMenu showCredentials={showCredentials} />
		</StickyHeader>
	);
}
