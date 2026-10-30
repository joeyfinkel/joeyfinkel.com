import { z } from 'zod';

export const experienceSchema = z
	.array(
		z
			.object({
				company: z.string().trim().min(1).max(120),
				role: z.string().trim().min(1).max(160),
				start: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
				period: z.string().trim().min(1).max(80),
				location: z.string().trim().min(1).max(160),
				highlights: z.array(z.string().trim().min(1).max(800)).min(1).max(8),
				technologies: z.array(z.string().trim().min(1).max(60)).max(15),
				logo: z
					.enum([
						'/companies/jf-develops.png',
						'/companies/febyte.png',
						'/companies/ecom-diversify.png',
					])
					.optional(),
			})
			.strict(),
	)
	.min(1)
	.max(30);

export type Experience = z.infer<typeof experienceSchema>;

export const publicationSchema = z
	.object({
		revision: z.uuid(),
		publishedAt: z.iso.datetime(),
		experience: experienceSchema,
	})
	.strict();
