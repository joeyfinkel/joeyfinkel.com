import OAuthProvider from '@cloudflare/workers-oauth-provider';
import { z } from 'zod';
import { mcpHandler } from './mcp/handler';
import { readBody } from './resume/body';
import { ResumeError } from './resume/error';
import { routes } from './routes';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		try {
			const origin = env.SITE_ORIGIN;
			const provider = new OAuthProvider<Env>({
				apiRoute: '/mcp',
				apiHandler: mcpHandler,
				defaultHandler: routes,
				authorizeEndpoint: '/authorize',
				tokenEndpoint: '/oauth/token',
				clientRegistrationEndpoint: '/oauth/register',
				scopesSupported: ['resume:publish', 'offline_access'],
				requiredScopes: ['resume:publish'],
				resourceMetadata: {
					resource: `${origin}/mcp`,
					authorization_servers: [origin],
				},
				clientIdMetadataDocumentEnabled: true,
			});

			// MCP and OAuth messages are small; PDF uploads have their own 2 MiB cap.
			const boundedRequest =
				request.body &&
				!new URL(request.url).pathname.startsWith('/api/resume/upload/')
					? new Request(request, { body: await readBody(request, 128 * 1024) })
					: request;

			return await provider.fetch(boundedRequest, env, ctx);
		} catch (error) {
			if (error instanceof ResumeError || error instanceof z.ZodError) {
				return Response.json(
					{
						error:
							error instanceof ResumeError
								? error.message
								: 'Invalid resume data',
					},
					{
						status: error instanceof ResumeError ? error.status : 400,
						headers: { 'Cache-Control': 'no-store' },
					},
				);
			}

			console.error(
				JSON.stringify({
					event: 'resume_request_failed',
					error: error instanceof Error ? error.name : 'unknown',
				}),
			);

			return Response.json(
				{ error: 'Resume service temporarily unavailable' },
				{ status: 503, headers: { 'Cache-Control': 'no-store' } },
			);
		}
	},
} satisfies ExportedHandler<Env>;
