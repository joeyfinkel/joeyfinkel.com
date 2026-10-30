// Adapted from ReUI: https://reui.io/docs/components/radix/timeline
import { type HTMLAttributes, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { TimelineContext } from './context';

// Components
interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
	defaultValue?: number;
	value?: number;
	onValueChange?: (value: number) => void;
	orientation?: 'horizontal' | 'vertical';
}

export function Timeline({
	defaultValue = 1,
	value,
	onValueChange,
	orientation = 'vertical',
	className,
	children,
	...props
}: TimelineProps) {
	const [activeStep, setInternalStep] = useState(defaultValue);

	const setActiveStep = useCallback(
		(step: number) => {
			if (value === undefined) {
				setInternalStep(step);
			}
			onValueChange?.(step);
		},
		[value, onValueChange],
	);

	const currentStep = value ?? activeStep;

	return (
		<TimelineContext.Provider
			value={{ activeStep: currentStep, setActiveStep }}
		>
			<div
				className={cn(
					'group/timeline flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col',
					className,
				)}
				data-orientation={orientation}
				data-slot="timeline"
				{...props}
			>
				{children}
			</div>
		</TimelineContext.Provider>
	);
}
