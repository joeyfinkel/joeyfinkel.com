// Set the page background before React loads; next-themes owns later changes.
{
	let preferredTheme = 'system';

	try {
		preferredTheme = localStorage.getItem('joeyfinkel-theme') ?? 'system';
	} catch {
		// Storage may be blocked; the device preference still works.
	}

	const isDark =
		preferredTheme === 'dark' ||
		(preferredTheme === 'system' &&
			matchMedia('(prefers-color-scheme: dark)').matches);

	document.documentElement.classList.toggle('dark', isDark);
	document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
}
