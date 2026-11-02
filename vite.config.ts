import { fileURLToPath, URL } from 'node:url';
import { cloudflare } from '@cloudflare/vite-plugin';
import { reactLayoutDevtools } from '@jfdevelops/react-layout-devtools-vite';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		cloudflare(),
		tanstackRouter({ target: 'react', autoCodeSplitting: true }),
		reactLayoutDevtools(),
		react(),
		tailwindcss(),
	],
	resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
});
