import { createExecutionContext } from 'cloudflare:test';
import { env } from 'cloudflare:workers';
import { expect, it } from 'vitest';
import { catalogSchema, summarySchema } from '../src/projects/schema';
import worker from '../worker';
import { libraries } from '../worker/projects/libraries';

it('returns the same authoritative count for the home card and grouped catalog', async () => {
	const summaryResponse = await worker.fetch(
		new Request('https://joeyfinkel.com/api/projects'),
		env,
		createExecutionContext(),
	);
	const summary = summarySchema.parse(await summaryResponse.json());
	const catalogResponse = await worker.fetch(
		new Request('https://joeyfinkel.com/api/projects/jfdevelops'),
		env,
		createExecutionContext(),
	);
	const catalog = catalogSchema.parse(await catalogResponse.json());
	const names = catalog.groups.flatMap((group) =>
		group.libraries.map((library) => library.name),
	);

	expect(summary.publishedLibraryCount).toBe(libraries.length);
	expect(catalog.publishedLibraryCount).toBe(summary.publishedLibraryCount);
	expect(new Set(names).size).toBe(libraries.length);
	expect(names.slice().sort()).toEqual(
		libraries.map((library) => library.name).sort(),
	);
	expect(
		catalog.groups.every(
			(group) => group.libraries.length > 0 && group.example.code.length > 0,
		),
	).toBe(true);
});

it('groups related packages together without dropping secondary integrations', async () => {
	const response = await worker.fetch(
		new Request('https://joeyfinkel.com/api/projects/jfdevelops'),
		env,
		createExecutionContext(),
	);
	const catalog = catalogSchema.parse(await response.json());
	const devtools = catalog.groups.find((group) => group.id === 'devtools');

	expect(devtools?.libraries.map((library) => library.name)).toEqual(
		expect.arrayContaining([
			'@jfdevelops/devtools-kit',
			'@jfdevelops/devtools-kit-react',
			'@jfdevelops/react-layout-devtools-core',
			'@jfdevelops/react-layout-devtools-react',
			'@jfdevelops/react-layout-devtools-vite',
		]),
	);
});
