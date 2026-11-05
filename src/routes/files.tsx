import { createFileRoute } from '@tanstack/react-router';
import { FilesTable } from './-files/components/table';
import { UploadDialog } from './-files/components/upload-dialog';
import { loadFiles } from './-files/utils/load';
import { SiteLayout } from './-site/components/layout';

export const Route = createFileRoute('/files')({
	component: FilesPage,
	loader: loadFiles,
});

function FilesPage() {
	const { files } = Route.useLoaderData();

	return (
		<SiteLayout>
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<p className="font-mono text-sm text-muted-foreground">Files</p>
					<h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
						Uploaded files
					</h1>
				</div>
				<UploadDialog />
			</div>
			<div className="mt-8">
				<FilesTable files={files} />
			</div>
		</SiteLayout>
	);
}
