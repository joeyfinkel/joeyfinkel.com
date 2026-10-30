import { useTheme } from 'next-themes';

export function ThemeSelect() {
	const { theme = 'system', setTheme } = useTheme();

	return (
		<select
			aria-label="Color theme"
			value={theme}
			onChange={(event) => setTheme(event.target.value)}
			className="h-8 rounded-md border bg-background px-2 text-xs text-foreground outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
		>
			<option value="system">System theme</option>
			<option value="light">Light theme</option>
			<option value="dark">Dark theme</option>
		</select>
	);
}
