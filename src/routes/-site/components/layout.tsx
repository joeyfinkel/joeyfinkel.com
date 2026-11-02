import { Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { StickyHeader } from '@/components/sticky-header';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileMenu } from '../../-home/components/mobile-menu';

export function SiteLayout({ children }: { children: ReactNode }) {
	const isMobile = useIsMobile();

	return (
		<div className="mx-auto flex min-h-svh max-w-4xl flex-col px-6 sm:px-10">
			<StickyHeader>
				<Link
					to="/"
					className="inline-flex w-fit items-center gap-2 text-sm font-medium"
				>
					<ArrowLeftIcon className="size-4" aria-hidden="true" />
					Joey Finkel
				</Link>
				{isMobile && <MobileMenu />}
			</StickyHeader>
			<main className="flex flex-1 flex-col justify-center py-16">
				{children}
			</main>
		</div>
	);
}
