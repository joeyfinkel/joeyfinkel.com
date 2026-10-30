import { type ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function StickyHeader({ children }: { children: ReactNode }) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		function updateScroll() {
			setScrolled(window.scrollY > 32);
		}

		updateScroll();
		window.addEventListener('scroll', updateScroll, { passive: true });

		return () => window.removeEventListener('scroll', updateScroll);
	}, []);

	return (
		<header className="sticky top-0 z-50 py-3">
			<div
				data-scrolled={scrolled}
				className={cn(
					'flex flex-wrap items-center justify-between gap-4 border border-transparent border-b-border bg-background/95 px-5 py-3 backdrop-blur-md transition-[border-radius,box-shadow,border-color] duration-300 motion-reduce:transition-none',
					scrolled && 'rounded-3xl border-border shadow-sm sm:rounded-full',
				)}
			>
				{children}
			</div>
		</header>
	);
}
