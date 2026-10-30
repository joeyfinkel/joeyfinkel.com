// Adapted from ReUI: https://reui.io/docs/components/radix/timeline

import { Slot } from '@radix-ui/react-slot';
import type { TimeHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// TimelineDate
// TimeHTMLAttributes (not the generic HTMLAttributes) so the <time>-specific `dateTime`
// attribute is accepted — matches the base wrapper's useRender.ComponentProps<"time">.
interface TimelineDateProps extends TimeHTMLAttributes<HTMLTimeElement> {
	asChild?: boolean;
}

export function TimelineDate({
	asChild = false,
	className,
	...props
}: TimelineDateProps) {
	const Comp = asChild ? Slot : 'time';

	return (
		<Comp
			className={cn(
				'text-muted-foreground mb-1 block text-xs font-medium group-data-[orientation=vertical]/timeline:max-sm:h-4',
				className,
			)}
			data-slot="timeline-date"
			{...props}
		/>
	);
}
