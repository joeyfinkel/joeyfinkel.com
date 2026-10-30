// Adapted from ReUI: https://reui.io/docs/components/radix/timeline
import { createContext, useContext } from 'react';

// Types
type TimelineContextValue = {
	activeStep: number;
	setActiveStep: (step: number) => void;
};

// Context
export const TimelineContext = createContext<TimelineContextValue | undefined>(
	undefined,
);

export function useTimeline() {
	const context = useContext(TimelineContext);

	if (!context) {
		throw new Error('useTimeline must be used within a Timeline');
	}

	return context;
}
