import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
	const { theme = 'system', setTheme } = useTheme();
	const next =
		theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
	const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;
	const label = `Theme: ${theme}. Switch to ${next}`;

	return (
		<Button
			type="button"
			variant="ghost"
			size="icon"
			className="size-11 shrink-0 rounded-full"
			aria-label={label}
			title={label}
			onClick={() => setTheme(next)}
		>
			<Icon className="size-4" aria-hidden="true" />
		</Button>
	);
}
