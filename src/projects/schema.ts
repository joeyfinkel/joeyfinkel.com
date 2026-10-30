import { z } from 'zod';

export const summarySchema = z.object({
	publishedLibraryCount: z.number().int().nonnegative(),
});
export const catalogSchema = summarySchema.extend({
	groups: z.array(
		z.object({
			id: z.string(),
			title: z.string(),
			description: z.string(),
			install: z.string(),
			example: z.object({
				title: z.string(),
				language: z.string(),
				code: z.string(),
				sourceUrl: z.url(),
			}),
			libraries: z.array(
				z.object({ name: z.string(), description: z.string() }),
			),
		}),
	),
});

export type LibraryGroupData = z.infer<typeof catalogSchema>['groups'][number];

export const catalogSearchSchema = z.object({
	category: z.string().optional(),
	library: z.string().optional(),
});

export const catalogViewSchema = catalogSchema.extend({
	selectedGroup: catalogSchema.shape.groups.element.nullable(),
	selectedLibrary: z
		.object({ name: z.string(), description: z.string() })
		.nullable(),
});

export type CatalogView = z.infer<typeof catalogViewSchema>;
