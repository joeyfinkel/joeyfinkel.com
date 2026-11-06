import { Link } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { ProjectNavigation } from './navigation';

export function ProjectMobileMenu() {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="project-site-menu-trigger size-11 shrink-0"
					aria-label="Open project navigation"
				>
					<Menu className="size-5" aria-hidden="true" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="overflow-y-auto px-5 pb-8">
				<SheetHeader className="px-0">
					<SheetTitle>Joey Finkel</SheetTitle>
					<SheetDescription>Projects & libraries</SheetDescription>
				</SheetHeader>
				<div
					onClickCapture={(event) => {
						if (event.target instanceof Element && event.target.closest('a')) {
							setOpen(false);
						}
					}}
				>
					<Link
						viewTransition
						to="/"
						className="inline-flex min-h-11 items-center text-sm text-muted-foreground"
					>
						← Back to home
					</Link>
					<ProjectNavigation />
				</div>
			</SheetContent>
		</Sheet>
	);
}
