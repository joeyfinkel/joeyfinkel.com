import { z } from 'zod';

const errorSchema = z.object({ error: z.string() });

export async function uploadFile({
	password,
	file,
}: {
	password: string;
	file: File;
}) {
	const response = await fetch(`/api/files/${encodeURIComponent(file.name)}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${password}`,
			'Content-Type': file.type || 'application/octet-stream',
		},
		body: file,
	});

	if (response.ok) {
		return;
	}

	const body = errorSchema.safeParse(await response.json().catch(() => null));

	throw new Error(
		body.success ? body.data.error : 'The upload failed. Please try again.',
	);
}
