export function Workspace() {
	return (
		<figure className="py-10">
			<div
				className="overflow-hidden rounded-xl border bg-secondary/30 p-3 sm:p-5"
				aria-label="Illustration of an editor, browser, and terminal in a split workspace"
				role="img"
			>
				<div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
					<span className="size-2 rounded-full bg-primary/60" />
					Development workspace
				</div>
				<div className="grid min-h-64 grid-cols-2 gap-2">
					<div className="row-span-2 rounded-lg border bg-background p-4">
						<p className="mb-6 font-mono text-[11px] text-muted-foreground">
							Editor
						</p>
						<div className="space-y-3">
							<div className="h-2 w-3/4 rounded bg-primary/40" />
							<div className="h-2 w-1/2 rounded bg-primary/20" />
							<div className="h-2 w-4/5 rounded bg-primary/20" />
							<div className="h-2 w-2/3 rounded bg-primary/20" />
						</div>
					</div>
					<div className="rounded-lg border bg-background p-4">
						<p className="mb-4 font-mono text-[11px] text-muted-foreground">
							Browser
						</p>
						<div className="h-10 rounded border bg-secondary/50" />
					</div>
					<div className="rounded-lg border bg-background p-4">
						<p className="font-mono text-[11px] text-muted-foreground">
							Terminal
						</p>
						<p className="mt-4 font-mono text-xs text-primary">
							$ pnpm dev<span aria-hidden="true"> ▌</span>
						</p>
					</div>
				</div>
			</div>
			<figcaption className="mt-3 text-xs text-muted-foreground">
				An illustrative workspace: your apps, arranged around what you’re doing.
			</figcaption>
		</figure>
	);
}
