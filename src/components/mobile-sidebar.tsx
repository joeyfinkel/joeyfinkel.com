import type { ReactNode } from 'react';
import {
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';

export function MobileSidebar({
	title,
	description,
	children,
}: {
	title: string;
	description: string;
	children: ReactNode;
}) {
	return (
		<SheetContent
			side="left"
			className="w-[min(21rem,90vw)] gap-0 bg-background p-6 sm:max-w-none"
		>
			<SheetHeader className="mb-8 gap-1 p-0">
				<SheetTitle className="text-lg font-medium">{title}</SheetTitle>
				<SheetDescription className="text-xs">{description}</SheetDescription>
			</SheetHeader>
			<div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
		</SheetContent>
	);
}
