// Adapted from ReUI: https://reui.io/docs/components/radix/timeline
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
// TimelineContent
export function TimelineContent({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('text-muted-foreground text-sm', className)}
			data-slot="timeline-content"
			{...props}
		/>
	);
}
