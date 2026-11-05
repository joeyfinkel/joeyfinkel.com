import { useRouter } from '@tanstack/react-router';
import { Lock } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { UploadForm } from './form';

export function UploadDialog() {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button">
					<Lock aria-hidden="true" />
					Upload file
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload a file</DialogTitle>
					<DialogDescription>
						Enter the password to upload. A file with the same name is replaced.
					</DialogDescription>
				</DialogHeader>
				<UploadForm
					onUploaded={() => {
						setOpen(false);
						void router.invalidate();
					}}
				/>
			</DialogContent>
		</Dialog>
	);
}
