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

		if (
			typeof data.resumeUrl !== 'string' ||
			!/^\/resume\.pdf(?:\?revision=[a-f0-9-]+)?$/.test(data.resumeUrl)
		) {
			throw new Error('Invalid resume link');
		}

		return { experience, resumeUrl: data.resumeUrl, unavailable: false };
	} catch {
		const experience: Experience = [];

		return { experience, resumeUrl: '/resume.pdf', unavailable: true };
	}
}
