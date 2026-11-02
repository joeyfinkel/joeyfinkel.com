import { type Experience, experienceSchema } from '@/resume/schema';

export async function loadResume() {
	try {
		const response = await fetch('/api/resume', {
			cache: 'no-store',
			signal: AbortSignal.timeout(10000),
		});

		if (!response.ok) {
			throw new Error('The resume could not be loaded. Please try again.');
		}

		const data = await response.json();
		const experience = experienceSchema.parse(data.experience);

		return { experience, unavailable: false };
	} catch {
		const experience: Experience = [];

		return { experience, unavailable: true };
	}
}
