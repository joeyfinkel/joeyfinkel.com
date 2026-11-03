import {
	type Credentials,
	credentialsSchema,
	type Experience,
	experienceSchema,
} from '@/resume/schema';

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
		const credentials = credentialsSchema.parse(data.credentials);

		return { experience, credentials, unavailable: false };
	} catch {
		const experience: Experience = [];
		const credentials: Credentials = [];

		return { experience, credentials, unavailable: true };
	}
}
