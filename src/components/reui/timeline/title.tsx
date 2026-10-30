// Adapted from ReUI: https://reui.io/docs/components/radix/timeline
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
// TimelineTitle
export function TimelineTitle({
	className,
	...props
}: HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h3
			className={cn('text-sm font-medium', className)}
			data-slot="timeline-title"
			{...props}
		/>
	);
}
