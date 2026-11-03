import { summarySchema } from '@/projects/schema';

async function loadLibraryCount() {
	try {
		const response = await fetch('/api/projects', {
			signal: AbortSignal.timeout(10000),
		});

		if (!response.ok) {
			return null;
		}

		return summarySchema.parse(await response.json()).publishedLibraryCount;
	} catch {
		return null;
	}
}

export async function loadHome() {
	const publishedLibraryCount = await loadLibraryCount();

	return { publishedLibraryCount };
}
