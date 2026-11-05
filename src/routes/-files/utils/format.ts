const units = ['B', 'KB', 'MB', 'GB'];

export function formatBytes(bytes: number) {
	let value = bytes;
	let unit = 0;

	while (value >= 1024 && unit < units.length - 1) {
		value /= 1024;
		unit += 1;
	}

	return `${unit === 0 ? value : value.toFixed(1)} ${units[unit]}`;
}

export function formatUploadedAt(iso: string) {
	return new Intl.DateTimeFormat(undefined, {
		dateStyle: 'medium',
		timeStyle: 'short',
	}).format(new Date(iso));
}
