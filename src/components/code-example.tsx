export function CodeExample({
	title,
	language,
	code,
}: {
	title: string;
	language: string;
	code: string;
}) {
	return (
		<figure className="my-6 min-w-0 overflow-hidden rounded-xl border bg-secondary/30">
			<figcaption className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3 text-xs text-muted-foreground">
				<span>{title}</span>
				<span className="font-mono">{language}</span>
			</figcaption>
			<section
				aria-label={title}
				// biome-ignore lint/a11y/noNoninteractiveTabindex: Scrollable code regions need keyboard access.
				tabIndex={0}
				className="max-w-full overflow-x-auto p-4 text-xs leading-6 outline-offset-[-2px] focus-visible:outline-2 focus-visible:outline-ring sm:p-6"
			>
				<pre>
					<code>{code}</code>
				</pre>
			</section>
		</figure>
	);
}
