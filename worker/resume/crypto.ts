export async function digest(value: string | Uint8Array<ArrayBuffer>) {
	const bytes =
		typeof value === 'string' ? new TextEncoder().encode(value) : value;
	const hash = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));

	return Array.from(hash, (byte) => byte.toString(16).padStart(2, '0')).join(
		'',
	);
}

export async function secretsMatch(value: string, expected: string) {
	const encoder = new TextEncoder();
	const [actualHash, expectedHash] = await Promise.all([
		crypto.subtle.digest('SHA-256', encoder.encode(value)),
		crypto.subtle.digest('SHA-256', encoder.encode(expected)),
	]);

	return timingSafeEqual(
		new Uint8Array(actualHash),
		new Uint8Array(expectedHash),
	);
}

import { timingSafeEqual } from 'node:crypto';
