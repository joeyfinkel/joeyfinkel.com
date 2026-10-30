// Adapted from ReUI: https://reui.io/docs/components/radix/timeline
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
// TimelineHeader
export function TimelineHeader({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn(className)} data-slot="timeline-header" {...props} />
	);
}
