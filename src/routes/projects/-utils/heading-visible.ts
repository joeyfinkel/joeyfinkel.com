import { createContext, use } from 'react';

export const HeadingVisibleContext = createContext(false);

export function useHeadingVisible() {
	return use(HeadingVisibleContext);
}
