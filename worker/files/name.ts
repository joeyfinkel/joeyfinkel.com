import { fileNameSchema } from '../../src/files/schema';
import { ResumeError } from '../resume/error';

export function parseFileName(segment: string) {
	let decoded: string;

	try {
		decoded = decodeURIComponent(segment);
	} catch {
		throw new ResumeError('Invalid file name');
	}

	const parsed = fileNameSchema.safeParse(decoded);

	if (!parsed.success) {
		throw new ResumeError('Invalid file name');
	}

	return parsed.data;
}
