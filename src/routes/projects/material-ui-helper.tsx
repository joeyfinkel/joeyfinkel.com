import { createFileRoute, Link } from '@tanstack/react-router';
import { CodeExample } from '@/components/code-example';
import { ProjectLayout } from './-components/layout';
import { examples } from './-material-ui-helper/utils/examples';

export const Route = createFileRoute('/projects/material-ui-helper')({
	component: MaterialUiHelper,
});

function MaterialUiHelper() {
	return (
		<ProjectLayout
			title="Material UI Helper"
			category="C# · .NET · LINQ"
			description="Take the filter model from MUI X Data Grid and apply it to your .NET data. One extension method works with in-memory collections and IQueryable sources."
			sourceUrl="https://github.com/joeyfinkel/material-ui-helper"
		>
			<section className="py-10" aria-labelledby="filter-example">
				<h2 id="filter-example" className="text-2xl font-medium tracking-tight">
					From a grid filter to a query
				</h2>
				<p className="mt-4 text-sm leading-7 text-muted-foreground">
					A user searches for products whose name contains “desk.” Send the
					filter model to your API, deserialize it, and apply it to the
					collection or query.
				</p>
				<CodeExample
					title="The filter sent by the client"
					language="JSON"
					code={examples.filter}
				/>
				<CodeExample
					title="Apply it in your .NET endpoint"
					language="C#"
					code={examples.query}
				/>
				<p className="text-sm leading-7 text-muted-foreground">
					The helper builds a filtered sequence. With IQueryable, execution
					remains deferred until your application enumerates or materializes the
					query.
				</p>
			</section>
			<section className="border-t py-10" aria-labelledby="filter-setup">
				<h2 id="filter-setup" className="text-2xl font-medium tracking-tight">
					Use it in a project
				</h2>
				<p className="mt-4 text-sm leading-7 text-muted-foreground">
					This is an early-stage library, currently used through a project
					reference rather than a NuGet package. Clone the repository beside
					your app, then add the reference.
				</p>
				<CodeExample
					title="Reference the library"
					language="Shell"
					code={examples.install}
				/>
				<p className="text-sm leading-7 text-muted-foreground">
					It targets .NET 8 and requires a compiler supporting C# 14. Filters
					currently combine with AND; nested fields and some operators have
					limitations.
				</p>
				<Link
					to={
						new URL(
							'https://github.com/joeyfinkel/material-ui-helper#current-limitations',
						).href
					}
					className="mt-4 inline-block text-sm text-primary underline underline-offset-4"
				>
					Review supported operators and current limitations
				</Link>
			</section>
		</ProjectLayout>
	);
}
