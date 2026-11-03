export function Workspace() {
	return (
		<figure className="py-10">
			<div className="overflow-hidden rounded-xl border bg-secondary/30">
				<img
					src="/projects/panedeck-workspace.webp"
					alt="PaneDeck workspace with Cursor showing React code on the left, a browser preview of a demo app at the top right, and a PowerShell terminal with passing tests at the bottom right, all grouped under PaneDeck's tab bar."
					width={1702}
					height={1087}
					className="block h-auto w-full"
				/>
			</div>
			<figcaption className="mt-3 text-xs text-muted-foreground">
				An editor, browser preview, and test terminal grouped into one PaneDeck
				workspace.
			</figcaption>
		</figure>
	);
}
