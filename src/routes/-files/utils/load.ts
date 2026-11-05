import { fileListSchema } from '@/files/schema';

export async function loadFiles() {
	const response = await fetch('/api/files', {
		cache: 'no-store',
		signal: AbortSignal.timeout(10000),
	});

	if (!response.ok) {
		throw new Error('The files could not be loaded. Please try again.');
	}

	return fileListSchema.parse(await response.json());
}
