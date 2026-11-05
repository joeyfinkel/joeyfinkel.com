import { Link } from '@tanstack/react-router';
import { Download } from 'lucide-react';
import type { FileList } from '@/files/schema';
import { formatBytes, formatUploadedAt } from '../utils/format';

const sourceLabels = {
	upload: 'Uploaded on this page',
	claude: 'Published by Claude',
} satisfies Record<FileList['files'][number]['source'], string>;

export function FilesTable({ files }: { files: FileList['files'] }) {
	if (files.length === 0) {
		return (
			<p className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
				No files have been uploaded yet.
			</p>
		);
	}

	return (
		<ul className="divide-y rounded-md border">
			{files.map((file) => (
				<li
					key={file.href}
					className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 p-4"
				>
					<div className="min-w-0">
						<Link
							to={new URL(file.href, window.location.origin).href}
							className="inline-flex max-w-full items-center gap-2 font-medium hover:text-primary"
						>
							<Download className="size-4 shrink-0" aria-hidden="true" />
							<span className="truncate">{file.name}</span>
						</Link>
						<p className="mt-1 text-xs text-muted-foreground">
							{sourceLabels[file.source]}
						</p>
					</div>
					<p className="text-xs text-muted-foreground">
						{formatBytes(file.size)} · {formatUploadedAt(file.uploadedAt)}
					</p>
				</li>
			))}
		</ul>
	);
}
