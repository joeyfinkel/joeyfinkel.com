import { Link, useMatch } from '@tanstack/react-router';
import {
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar,
} from '@/components/ui/sidebar';

export function JfdevelopsLinks() {
	const { setOpenMobile } = useSidebar();
	const catalog = useMatch({
		from: '/projects/jfdevelops',
		shouldThrow: false,
		select: (match) => match.loaderData,
	});

	if (!catalog) {
		return null;
	}

	return (
		<SidebarMenuSub>
			<SidebarMenuSubItem>
				<SidebarMenuSubButton asChild>
					<Link
						to="/projects/jfdevelops"
						activeOptions={{ exact: true }}
						activeProps={{
							className: 'bg-sidebar-accent text-sidebar-accent-foreground',
						}}
						onClick={() => setOpenMobile(false)}
					>
						All libraries
					</Link>
				</SidebarMenuSubButton>
			</SidebarMenuSubItem>
			{catalog.groups.map((group) => (
				<SidebarMenuSubItem key={group.id}>
					<SidebarMenuSubButton asChild className="font-semibold">
						<Link
							to="/projects/jfdevelops/categories/$category"
							params={{ category: group.id }}
							activeOptions={{ exact: true }}
							activeProps={{
								className: 'bg-sidebar-accent text-sidebar-accent-foreground',
							}}
							onClick={() => setOpenMobile(false)}
						>
							{group.title}
						</Link>
					</SidebarMenuSubButton>
					<SidebarMenuSub>
						{group.libraries.map((library) => (
							<SidebarMenuSubItem key={library.name}>
								<SidebarMenuSubButton
									asChild
									className="h-auto min-h-7 break-words leading-5"
								>
									<Link
										to="/projects/jfdevelops/$library"
										params={{
											library: library.name.replace('@jfdevelops/', ''),
										}}
										activeOptions={{ exact: true }}
										activeProps={{
											className:
												'bg-sidebar-accent text-sidebar-accent-foreground',
										}}
										onClick={() => setOpenMobile(false)}
									>
										{library.name.replace('@jfdevelops/', '')}
									</Link>
								</SidebarMenuSubButton>
							</SidebarMenuSubItem>
						))}
					</SidebarMenuSub>
				</SidebarMenuSubItem>
			))}
		</SidebarMenuSub>
	);
}
