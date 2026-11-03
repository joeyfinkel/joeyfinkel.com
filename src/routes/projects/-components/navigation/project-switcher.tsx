import { Link, useLocation } from '@tanstack/react-router';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/sidebar';
import { projectLinks } from '../../-utils/links';

export function ProjectSwitcher() {
	const { setOpenMobile } = useSidebar();
	const pathname = useLocation({ select: (location) => location.pathname });
	const links = projectLinks.flatMap((group) => group.links);
	const current = links.find(
		(link) =>
			pathname === link.href.given ||
			pathname.startsWith(`${link.href.given}/`),
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex w-full items-center justify-between gap-2 rounded-lg border bg-background px-3 py-2.5 text-left outline-hidden transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sidebar-ring data-[state=open]:bg-sidebar-accent">
				<span className="min-w-0">
					<span className="block text-[11px] text-muted-foreground">
						Project
					</span>
					<span className="block truncate text-sm font-medium">
						{current?.label ?? 'Choose a project'}
					</span>
				</span>
				<ChevronsUpDownIcon
					className="size-4 shrink-0 text-muted-foreground"
					aria-hidden="true"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="start"
				className="w-(--radix-dropdown-menu-trigger-width)"
			>
				<DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
					Projects
				</DropdownMenuLabel>
				{links.map((link) => (
					<DropdownMenuItem key={link.resource} asChild>
						<Link
							to={link.href.given}
							className="justify-between"
							onClick={() => setOpenMobile(false)}
						>
							{link.label}
							{link.resource === current?.resource && (
								<CheckIcon className="text-primary" aria-hidden="true" />
							)}
						</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
