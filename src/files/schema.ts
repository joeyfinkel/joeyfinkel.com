import { z } from 'zod';

export const maxFileBytes = 10 * 1024 * 1024;

export const fileNameSchema = z
	.string()
	.trim()
	.min(1)
	.max(100)
	.regex(
		/^[\p{L}\p{N}_][\p{L}\p{N}_ .()+@-]*$/u,
		'Use letters, numbers, spaces, and . _ - ( ) + @ only',
	);

export const fileListSchema = z.object({
	files: z.array(
		z.object({
			name: z.string(),
			href: z.string().startsWith('/'),
			size: z.number().int().nonnegative(),
			uploadedAt: z.iso.datetime(),
			source: z.enum(['upload', 'claude']),
		}),
	),
});

export type FileList = z.infer<typeof fileListSchema>;
