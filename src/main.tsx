import { RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { router } from './router';
import './styles.css';

const root = document.getElementById('root');

if (!root) {
	throw new Error('Missing application root');
}

createRoot(root).render(
	<StrictMode>
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			storageKey="joeyfinkel-theme"
			disableTransitionOnChange
		>
			<RouterProvider router={router} />
		</ThemeProvider>
	</StrictMode>,
);
