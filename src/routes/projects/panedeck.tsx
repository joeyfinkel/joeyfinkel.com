import { createFileRoute, Link } from '@tanstack/react-router';
import { CodeExample } from '@/components/code-example';
import { ProjectLayout } from './-components/layout';
import { Workspace } from './-panedeck/components/workspace';

export const Route = createFileRoute('/projects/panedeck')({
	component: PaneDeck,
});

function PaneDeck() {
	return (
		<ProjectLayout
			title="PaneDeck"
			category="Windows · C# · .NET"
			description="Bring your existing desktop apps into focused workspaces. Split, tab, move, and resize windows together without changing the way those apps work."
			sourceUrl="https://github.com/joeyfinkel/panedeck"
		>
			<Workspace />
			<section className="border-t py-10" aria-labelledby="panedeck-usage">
				<h2 id="panedeck-usage" className="text-2xl font-medium tracking-tight">
					A workspace for the task at hand
				</h2>
				<p className="mt-4 text-sm leading-7 text-muted-foreground">
					Keep an editor beside a browser, put reference windows into tabs, and
					move the complete group as one workspace.
				</p>
				<ol className="mt-6 grid gap-6 text-sm leading-7 sm:grid-cols-3">
					<li>
						<span className="font-mono text-xs text-primary">01 / Split</span>
						<p className="mt-2">
							Hold{' '}
							<kbd className="rounded border px-1.5 py-0.5 font-mono text-xs">
								Shift
							</kbd>{' '}
							while dragging one window over another. Drop at an edge to place
							them side by side.
						</p>
					</li>
					<li>
						<span className="font-mono text-xs text-primary">02 / Tab</span>
						<p className="mt-2">
							Use the tab destination above the target window to group apps into
							tabs. Switch between them from the shared strip.
						</p>
					</li>
					<li>
						<span className="font-mono text-xs text-primary">03 / Arrange</span>
						<p className="mt-2">
							Move the group from its topbar, drag a shared divider to resize
							panes, or detach a tab to restore its window.
						</p>
					</li>
				</ol>
			</section>
			<section className="border-t py-10" aria-labelledby="panedeck-run">
				<h2 id="panedeck-run" className="text-2xl font-medium tracking-tight">
					Run from source
				</h2>
				<p className="mt-4 text-sm leading-7 text-muted-foreground">
					Use Windows 11, pnpm, and a compatible .NET 10 SDK. Run the following
					from the cloned repository.
				</p>
				<CodeExample
					title="Start the Windows application"
					language="Shell"
					code={
						'git clone https://github.com/joeyfinkel/panedeck.git\ncd panedeck\npnpm dev:windows'
					}
				/>
				<Link
					to={
						new URL(
							'https://github.com/joeyfinkel/panedeck/blob/main/apps/windows/README.md',
						).href
					}
					className="text-sm text-primary underline underline-offset-4"
				>
					Read the setup and gesture guide
				</Link>
			</section>
		</ProjectLayout>
	);
}
