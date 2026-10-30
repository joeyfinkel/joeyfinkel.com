import { createMcpHandler } from 'agents/mcp/server';
import { z } from 'zod';
import { createResumeServer } from './server';

export const mcpHandler = {
	async fetch(request, env, ctx) {
		const auth = z
			.object({
				props: z.object({ owner: z.literal(true) }),
				auth: z.object({ scope: z.array(z.string()) }),
			})
			.safeParse(ctx);

		if (!auth.success || !auth.data.auth.scope.includes('resume:publish')) {
			return new Response('Publishing permission required', { status: 403 });
		}

		const hostname = new URL(env.SITE_ORIGIN).hostname;

		return createMcpHandler(() => createResumeServer(env), {
			responseMode: 'json',
			route: '/mcp',
			allowedHostnames: [hostname, 'joeyfinkel.localhost'],
			allowedOriginHostnames: [hostname, 'joeyfinkel.localhost', 'claude.ai'],
			corsOptions: false,
		})(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
