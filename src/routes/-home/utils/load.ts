import { summarySchema } from '@/projects/schema';
import { loadResume } from './resume';

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
	const [resume, publishedLibraryCount] = await Promise.all([
		loadResume(),
		loadLibraryCount(),
	]);

	return { ...resume, publishedLibraryCount };
}
