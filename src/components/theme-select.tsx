import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeSelect() {
	const { theme = 'system', setTheme } = useTheme();
	const modes = [
		{ value: 'system', label: 'System theme', Icon: Monitor },
		{ value: 'light', label: 'Light theme', Icon: Sun },
		{ value: 'dark', label: 'Dark theme', Icon: Moon },
	];

	return (
		<fieldset className="m-0 flex min-w-0 items-center gap-0.5 rounded-full border p-0.5">
			<legend className="sr-only">Color theme</legend>
			{modes.map(({ value, label, Icon }) => (
				<Button
					key={value}
					type="button"
					variant={theme === value ? 'secondary' : 'ghost'}
					size="icon-sm"
					className="rounded-full"
					aria-label={label}
					aria-pressed={theme === value}
					title={label}
					onClick={() => setTheme(value)}
				>
					<Icon className="size-3.5" aria-hidden="true" />
				</Button>
			))}
		</fieldset>
	);
}
