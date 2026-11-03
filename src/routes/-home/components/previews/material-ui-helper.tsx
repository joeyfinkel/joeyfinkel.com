import { ArrowDownIcon, FilterIcon } from 'lucide-react';

export function MaterialUiHelperPreview() {
	return (
		<div
			role="img"
			aria-label="A MUI Data Grid filter for name contains desk becomes a LINQ query on the backend."
			className="flex size-full flex-col justify-center gap-2 p-4 font-mono text-[11px] leading-5"
		>
			<div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
				<FilterIcon className="size-3.5 text-primary" aria-hidden="true" />
				<span className="text-muted-foreground">Name</span>
				<span>contains</span>
				<span className="rounded bg-primary/15 px-1.5 text-primary">
					"desk"
				</span>
				<span className="ml-auto font-sans text-[10px] text-muted-foreground">
					Data Grid
				</span>
			</div>
			<ArrowDownIcon
				className="mx-auto size-3.5 text-muted-foreground"
				aria-hidden="true"
			/>
			<div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
				<span className="truncate">
					products.<span className="text-primary">Where</span>(p =&gt;
					p.Name.Contains("desk"))
				</span>
				<span className="ml-auto shrink-0 font-sans text-[10px] text-muted-foreground">
					LINQ
				</span>
			</div>
		</div>
	);
}
