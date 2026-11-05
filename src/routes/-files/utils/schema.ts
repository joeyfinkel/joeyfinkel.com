import { z } from 'zod';
import { fileNameSchema, maxFileBytes } from '@/files/schema';

export const uploadSchema = z.object({
	password: z.string().min(1, 'Enter the password'),
	file: z
		.instanceof(File, { error: 'Choose a file to upload' })
		.refine((file) => file.size > 0, 'That file is empty')
		.refine(
			(file) => file.size <= maxFileBytes,
			`Files can be at most ${maxFileBytes / 1024 / 1024} MB`,
		)
		.refine(
			(file) => fileNameSchema.safeParse(file.name).success,
			'Rename the file using letters, numbers, spaces, and . _ - ( ) + @ only',
		),
});
