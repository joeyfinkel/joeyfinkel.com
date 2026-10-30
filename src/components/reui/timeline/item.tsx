// Adapted from ReUI: https://reui.io/docs/components/radix/timeline
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { useTimeline } from './context';

// TimelineItem
interface TimelineItemProps extends HTMLAttributes<HTMLDivElement> {
	step: number;
}

export function TimelineItem({ step, className, ...props }: TimelineItemProps) {
	const { activeStep } = useTimeline();

	return (
		<div
			className={cn(
				'group/timeline-item has-[+[data-completed]]:**:data-[slot=timeline-separator]:bg-primary relative flex flex-1 flex-col gap-0.5 group-data-[orientation=horizontal]/timeline:mt-8 group-data-[orientation=horizontal]/timeline:not-last:pe-8 group-data-[orientation=vertical]/timeline:ms-8 group-data-[orientation=vertical]/timeline:not-last:pb-6',
				className,
			)}
			data-completed={step <= activeStep || undefined}
			data-slot="timeline-item"
			{...props}
		/>
	);
}
