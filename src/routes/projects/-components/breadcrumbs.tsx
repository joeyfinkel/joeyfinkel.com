import { Link } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function ProjectBreadcrumbs({
	items,
	visible,
}: {
	items: { label: string; to: string; hash?: string }[];
	visible: boolean;
}) {
	const navRef = useRef<HTMLElement>(null);
	const currentPath = items.at(-1)?.to;

	useEffect(() => {
		if (visible && currentPath && navRef.current) {
			navRef.current.scrollLeft = navRef.current.scrollWidth;
		}
	}, [visible, currentPath]);

	return (
		<nav
			ref={navRef}
			aria-label="Breadcrumb"
			aria-hidden={!visible}
			inert={!visible}
			data-header-breadcrumbs
			data-visible={visible}
			tabIndex={visible ? 0 : -1}
			className={cn(
				'col-start-1 row-start-1 min-w-0 overflow-x-auto py-1 [scrollbar-width:thin] transition-[opacity,translate] duration-300 motion-reduce:transition-none',
				visible
					? 'translate-y-0 opacity-100'
					: 'pointer-events-none translate-y-2 opacity-0',
			)}
		>
			<ol className="flex w-max min-w-full items-center gap-2 whitespace-nowrap text-sm">
				{items.map((item, index) => (
					<li key={item.to} className="flex shrink-0 items-center gap-2">
						{index > 0 && (
							<span aria-hidden="true" className="text-muted-foreground">
								/
							</span>
						)}
						{index === items.length - 1 ? (
							<span aria-current="page" className="font-medium">
								{item.label}
							</span>
						) : (
							<Link
								to={item.to}
								hash={item.hash}
								activeOptions={{ exact: true }}
								className="text-muted-foreground hover:text-primary"
							>
								{item.label}
							</Link>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
}
