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

const httpsUrlSchema = z.url({ protocol: /^https$/ }).max(500);

export const credentialsSchema = z
	.array(
		z
			.object({
				title: z.string().trim().min(1).max(200),
				program: z.string().trim().min(1).max(120).optional(),
				issuer: z.string().trim().min(1).max(120),
				awardedOn: z.iso.date(),
				badge: httpsUrlSchema.optional(),
				url: httpsUrlSchema,
			})
			.strict(),
	)
	.max(30);

export type Credentials = z.infer<typeof credentialsSchema>;

export const publicationSchema = z
	.object({
		revision: z.uuid(),
		publishedAt: z.iso.datetime(),
		experience: experienceSchema,
		credentials: credentialsSchema.optional(),
	})
	.strict();
