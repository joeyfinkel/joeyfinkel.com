import { cloudflareTest } from '@cloudflare/vitest-plugin';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		cloudflareTest({
			wrangler: { configPath: './wrangler.jsonc' },
			miniflare: {
				bindings: {
					PUBLISH_PASSWORD:
						'test-only-owner-password-with-at-least-32-characters',
					FILES_PASSWORD: 'test-only-files-password',
				},
			},
		}),
	],
	test: { include: ['test/**/*.test.ts'] },
});
