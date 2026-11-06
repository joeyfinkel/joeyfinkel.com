import { Link } from '@tanstack/react-router';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type BreadcrumbDropdownProps = {
	current: {
		label: string;
		to: string;
	};
	options: Array<{
		label: string;
		to: string;
		hash?: string;
	}>;
	isCurrentPage: boolean;
};

export function BreadcrumbDropdown({
	current,
	options,
	isCurrentPage,
}: BreadcrumbDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				aria-current={isCurrentPage ? 'page' : undefined}
				className="inline-flex items-center gap-1 rounded-sm font-medium outline-hidden transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:text-primary"
			>
				{current.label}
				<ChevronDownIcon className="size-3.5" aria-hidden="true" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				{options.map((option) => (
					<DropdownMenuItem key={option.to} asChild>
						<Link
							viewTransition
							to={option.to}
							hash={option.hash}
							className="justify-between"
						>
							{option.label}
							{option.to === current.to && (
								<CheckIcon className="text-primary" aria-hidden="true" />
							)}
						</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
