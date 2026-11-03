// Renders public/og-image.png, the preview card shown when the site is shared.
// It reads the same project list as the home page, so adding a project updates
// the card on the next build.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import sharp from 'sharp';
import { projects } from '../src/routes/-home/utils/projects.ts';

const WIDTH = 1200;
const HEIGHT = 630;
const MAX_PROJECT_NAMES = 4;

const colors = {
	background: '#141916',
	foreground: '#e7eae3',
	primary: '#a3cfb5',
	muted: '#a4ada4',
	border: '#364139',
	dot: '#6b756d',
};

const outputPath = fileURLToPath(
	new URL('../public/og-image.png', import.meta.url),
);

function resolveFont(file) {
	return fileURLToPath(
		new URL(`../node_modules/@fontsource/inter/files/${file}`, import.meta.url),
	);
}

function element(type, style, children) {
	return { type, props: { style, children } };
}

function getProjectNames() {
	const names = projects.slice(0, MAX_PROJECT_NAMES).map(({ name }) => name);
	const hiddenCount = projects.length - names.length;

	if (hiddenCount > 0) {
		names.push(`+${hiddenCount} more`);
	}

	return names;
}

function getProjectList() {
	const children = getProjectNames().flatMap((name, index) => {
		const label = element('div', { display: 'flex' }, name);

		if (index === 0) {
			return [label];
		}

		return [element('div', { display: 'flex', color: colors.dot }, '·'), label];
	});

	return element(
		'div',
		{
			display: 'flex',
			flexWrap: 'wrap',
			alignItems: 'center',
			gap: 14,
			fontSize: 28,
			color: colors.muted,
		},
		children,
	);
}

function getCard() {
	const title = element(
		'div',
		{
			display: 'flex',
			fontSize: 112,
			fontWeight: 600,
			letterSpacing: -4,
			color: colors.foreground,
		},
		[
			element('div', { display: 'flex' }, 'Joey Finkel'),
			element('div', { display: 'flex', color: colors.primary }, '.'),
		],
	);
	const subtitle = element(
		'div',
		{ display: 'flex', marginTop: 12, fontSize: 44, color: colors.muted },
		'Software developer. Projects & libraries.',
	);
	const domain = element(
		'div',
		{
			display: 'flex',
			fontSize: 30,
			fontWeight: 600,
			color: colors.primary,
		},
		'joeyfinkel.com',
	);

	const frame = element(
		'div',
		{
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
			padding: '0 52px 44px',
			border: `2px solid ${colors.border}`,
			borderRadius: 28,
		},
		[
			element(
				'div',
				{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
					justifyContent: 'center',
				},
				[title, subtitle],
			),
			element(
				'div',
				{
					display: 'flex',
					alignItems: 'flex-end',
					justifyContent: 'space-between',
					gap: 40,
				},
				[getProjectList(), domain],
			),
		],
	);

	return element(
		'div',
		{
			display: 'flex',
			boxSizing: 'border-box',
			width: WIDTH,
			height: HEIGHT,
			padding: 60,
			fontFamily: 'Inter',
			backgroundColor: colors.background,
			backgroundImage:
				'radial-gradient(circle at 100% 0%, rgba(163, 207, 181, 0.18), rgba(163, 207, 181, 0) 60%)',
		},
		[frame],
	);
}

async function generate() {
	const [regular, semibold] = await Promise.all([
		readFile(resolveFont('inter-latin-400-normal.woff')),
		readFile(resolveFont('inter-latin-600-normal.woff')),
	]);
	const svg = await satori(getCard(), {
		width: WIDTH,
		height: HEIGHT,
		fonts: [
			{ name: 'Inter', data: regular, weight: 400, style: 'normal' },
			{ name: 'Inter', data: semibold, weight: 600, style: 'normal' },
		],
	});
	const png = await sharp(Buffer.from(svg))
		.png({ compressionLevel: 9 })
		.toBuffer();

	await writeFile(outputPath, png);
}

await generate();
