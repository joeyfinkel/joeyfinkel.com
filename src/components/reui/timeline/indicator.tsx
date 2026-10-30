// Adapted from ReUI: https://reui.io/docs/components/radix/timeline

import { Slot } from '@radix-ui/react-slot';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// TimelineIndicator
interface TimelineIndicatorProps extends HTMLAttributes<HTMLDivElement> {
	asChild?: boolean;
}

export function TimelineIndicator({
	asChild = false,
	className,
	children,
	...props
}: TimelineIndicatorProps) {
	const Comp = asChild ? Slot : 'div';

	return (
		<Comp
			aria-hidden="true"
			className={cn(
				'border-primary/20 group-data-completed/timeline-item:border-primary absolute size-4 rounded-full border-2 group-data-[orientation=horizontal]/timeline:-top-6 group-data-[orientation=horizontal]/timeline:left-0 group-data-[orientation=horizontal]/timeline:-translate-y-1/2 group-data-[orientation=vertical]/timeline:top-0 group-data-[orientation=vertical]/timeline:-left-6 group-data-[orientation=vertical]/timeline:-translate-x-1/2',
				className,
			)}
			data-slot="timeline-indicator"
			{...props}
		>
			{children}
		</Comp>
	);
}
