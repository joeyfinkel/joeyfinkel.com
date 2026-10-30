import { createContext, type Dispatch, type SetStateAction } from 'react';

export const SidebarContext = createContext<{
	isMobile: boolean;
	openMobile: boolean;
	setOpenMobile: Dispatch<SetStateAction<boolean>>;
	toggleSidebar: () => void;
} | null>(null);
