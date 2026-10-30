import { createExecutionContext } from 'cloudflare:test';
import { env } from 'cloudflare:workers';
import { PDFDocument } from 'pdf-lib';
import { expect, it } from 'vitest';
import { z } from 'zod';
import { experience } from '../src/routes/-home/utils/experience';
import worker from '../worker';
import { digest } from '../worker/resume/crypto';

const origin = 'https://joeyfinkel.com';

async function request(path: string, init?: RequestInit) {
	const headers = new Headers(init?.headers);
	headers.set('Host', 'joeyfinkel.com');

	return worker.fetch(
		new Request(origin + path, {
			...init,
			headers,
		}),
		env,
		createExecutionContext(),
	);
}

async function callTool(
	token: string,
	name: string,
	args: Record<string, unknown>,
) {
	const response = await request('/mcp', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/event-stream',
			Authorization: `Bearer ${token}`,
			'MCP-Protocol-Version': '2025-06-18',
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			id: 2,
			method: 'tools/call',
			params: { name, arguments: args },
		}),
	});
	expect(response.status).toBe(200);
	const text = await response.text();
	const message = text.startsWith('event:')
		? (text
				.split('\n')
				.find((line) => line.startsWith('data: '))
				?.slice(6) ?? '{}')
		: text;
	const result = z
		.object({
			result: z.object({
				isError: z.boolean().optional(),
				content: z.array(
					z.object({ type: z.literal('text'), text: z.string() }),
				),
			}),
		})
		.parse(JSON.parse(message));
	expect(result.result.isError).not.toBe(true);

	return z
		.record(z.string(), z.unknown())
		.parse(JSON.parse(result.result.content[0]?.text ?? '{}'));
}

async function authorizationPage() {
	const registration = await request('/oauth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			client_name: 'Resume connector <script>alert(1)</script>',
			redirect_uris: ['https://claude.ai/test/callback'],
			grant_types: ['authorization_code', 'refresh_token'],
			response_types: ['code'],
			token_endpoint_auth_method: 'none',
		}),
	});
	expect(registration.status).toBe(201);
	const client = await registration.json<{ client_id: string }>();
	const verifier = 'test-verifier-'.repeat(5);
	const challengeBytes = new Uint8Array(
		await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)),
	);
	const challenge = btoa(String.fromCharCode(...challengeBytes))
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');
	const query = new URLSearchParams({
		client_id: client.client_id,
		redirect_uri: 'https://claude.ai/test/callback',
		response_type: 'code',
		scope: 'resume:publish',
		resource: `${origin}/mcp`,
		code_challenge: challenge,
		code_challenge_method: 'S256',
		state: 'test-state',
	});
	const response = await request(`/authorize?${query}`);
	expect(response.status).toBe(200);
	const html = await response.text();
	const handle = html.match(/name="handle" value="([^"]+)"/)?.[1];
	expect(handle).toBeTruthy();
	expect(html).not.toContain('<script>alert(1)</script>');
	expect(response.headers.get('Content-Security-Policy')).toContain(
		"frame-ancestors 'none'",
	);
	const cookie = response.headers
		.getSetCookie()
		.map((value) => value.split(';')[0])
		.join('; ');

	return {
		client,
		verifier,
		handle: handle ?? '',
		cookie,
		path: `/authorize?${query}`,
	};
}

it('authenticates the owner through browser-bound consent and PKCE, then serves MCP tools', async () => {
	const auth = await authorizationPage();
	const approval = await request('/authorize', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Origin: origin,
			Cookie: auth.cookie,
			'CF-Connecting-IP': crypto.randomUUID(),
		},
		body: new URLSearchParams({
			handle: auth.handle,
			decision: 'approve',
			password: env.PUBLISH_PASSWORD,
		}),
	});
	expect(approval.status).toBe(302);
	const redirect = new URL(
		approval.headers.get('Location') ?? 'https://invalid.test',
	);
	expect(redirect.origin).toBe('https://claude.ai');
	const tokenResponse = await request('/oauth/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			grant_type: 'authorization_code',
			client_id: auth.client.client_id,
			redirect_uri: 'https://claude.ai/test/callback',
			code: redirect.searchParams.get('code') ?? '',
			code_verifier: auth.verifier,
			resource: `${origin}/mcp`,
		}),
	});
	expect(tokenResponse.status).toBe(200);
	const token = await tokenResponse.json<{ access_token: string }>();
	const toolsResponse = await request('/mcp', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/event-stream',
			Authorization: `Bearer ${token.access_token}`,
			'MCP-Protocol-Version': '2025-06-18',
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			id: 1,
			method: 'tools/list',
			params: {},
		}),
	});
	expect(toolsResponse.status, await toolsResponse.clone().text()).toBe(200);
	const text = await toolsResponse.text();
	const tools = z
		.object({
			result: z.object({ tools: z.array(z.object({ name: z.string() })) }),
		})
		.parse(
			JSON.parse(
				text.startsWith('event:')
					? (text
							.split('\n')
							.find((line) => line.startsWith('data: '))
							?.slice(6) ?? '{}')
					: text,
			),
		);
	expect(tools.result.tools.map((tool) => tool.name)).toEqual([
		'get_published_resume',
		'prepare_resume',
		'publish_resume',
	]);
	const document = await PDFDocument.create();
	document.addPage().drawText('Connector publishing integration test');
	const pdf = new Uint8Array(await document.save());
	const draft = z
		.object({ revision: z.uuid(), uploadUrl: z.url(), uploadToken: z.string() })
		.parse(
			await callTool(token.access_token, 'prepare_resume', {
				experience,
				pdfSha256: await digest(pdf),
			}),
		);
	const upload = await request(new URL(draft.uploadUrl).pathname, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/pdf',
			Authorization: `Bearer ${draft.uploadToken}`,
		},
		body: pdf,
	});
	expect(upload.status).toBe(200);
	const publication = await callTool(token.access_token, 'publish_resume', {
		revision: draft.revision,
	});
	expect(publication.revision).toBe(draft.revision);
	const current = await request('/api/resume');
	expect(await current.json()).toMatchObject({ revision: draft.revision });
	const publishedPdf = await request('/resume.pdf');
	expect(new Uint8Array(await publishedPdf.arrayBuffer())).toEqual(pdf);
});

it('rejects incorrect owner passwords and cross-origin consent submissions', async () => {
	const auth = await authorizationPage();
	const body = new URLSearchParams({
		handle: auth.handle,
		decision: 'approve',
		password: 'wrong-password',
	});
	const denied = await request('/authorize', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Origin: origin,
			Cookie: auth.cookie,
			'CF-Connecting-IP': crypto.randomUUID(),
		},
		body,
	});
	expect(denied.status).toBe(401);
	const crossOrigin = await request('/authorize', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Origin: 'https://untrusted.test',
			Cookie: auth.cookie,
		},
		body,
	});
	expect(crossOrigin.status).toBe(403);
});

it('requires the browser consent cookie even with a correct owner password', async () => {
	const auth = await authorizationPage();
	const response = await request('/authorize', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Origin: origin,
			'CF-Connecting-IP': crypto.randomUUID(),
		},
		body: new URLSearchParams({
			handle: auth.handle,
			decision: 'approve',
			password: env.PUBLISH_PASSWORD,
		}),
	});
	expect(response.status).toBe(400);
});

it.each(['missing cookie', 'expired transaction'])(
	'renews a rejected %s without bypassing browser consent',
	async (failure) => {
		const auth = await authorizationPage();

		if (failure === 'expired transaction') {
			await env.OAUTH_KV.delete(
				`transaction:${await digest(new TextEncoder().encode(auth.handle))}`,
			);
		}

		const rejected = await request(auth.path, {
			method: 'POST',
			headers: {
				Origin: origin,
				Cookie: failure === 'missing cookie' ? '' : auth.cookie,
				'CF-Connecting-IP': crypto.randomUUID(),
			},
			body: new URLSearchParams({
				handle: auth.handle,
				decision: 'approve',
				password: env.PUBLISH_PASSWORD,
			}),
		});
		const html = await rejected.text();
		const renewedHandle =
			html.match(/name="handle" value="([^"]+)"/)?.[1] ?? '';
		const renewedCookie = rejected.headers
			.getSetCookie()
			.map((value) => value.split(';')[0])
			.join('; ');

		expect(rejected.status).toBe(400);
		expect(rejected.headers.get('Content-Type')).toContain('text/html');
		expect(rejected.headers.get('Location')).toBeNull();
		expect(html).toContain('Your password was accepted');
		expect(html).not.toContain(env.PUBLISH_PASSWORD);
		expect(renewedHandle).toBeTruthy();
		expect(renewedHandle).not.toBe(auth.handle);
		expect(renewedCookie).toContain('__Host-oauth-consent-');

		const approved = await request(auth.path, {
			method: 'POST',
			headers: {
				Origin: origin,
				Cookie: renewedCookie,
				'CF-Connecting-IP': crypto.randomUUID(),
			},
			body: new URLSearchParams({
				handle: renewedHandle,
				decision: 'approve',
				password: env.PUBLISH_PASSWORD,
			}),
		});

		expect(approved.status).toBe(302);
		expect(approved.headers.get('Location')).toMatch(/^https:\/\/claude\.ai\//);

		const replay = await request(auth.path, {
			method: 'POST',
			headers: {
				Origin: origin,
				Cookie: renewedCookie,
				'CF-Connecting-IP': crypto.randomUUID(),
			},
			body: new URLSearchParams({
				handle: renewedHandle,
				decision: 'approve',
				password: env.PUBLISH_PASSWORD,
			}),
		});

		expect(replay.status).toBe(400);
		expect(replay.headers.get('Location')).toBeNull();
	},
);

it('keeps wrong-password retries on the themed consent page and validates requests before creating a session', async () => {
	const auth = await authorizationPage();
	const wrongPassword = await request(auth.path, {
		method: 'POST',
		headers: {
			Origin: origin,
			Cookie: auth.cookie,
			'CF-Connecting-IP': crypto.randomUUID(),
		},
		body: new URLSearchParams({
			handle: auth.handle,
			decision: 'approve',
			password: 'incorrect-password-with-at-least-32-characters',
		}),
	});
	const html = await wrongPassword.text();

	expect(wrongPassword.status).toBe(401);
	expect(html).toContain('That publishing password did not match');
	expect(html).toContain('<form');
	expect(html).toContain('name="password"');
	expect(wrongPassword.headers.get('Content-Security-Policy')).toContain(
		"style-src 'nonce-",
	);
	expect(wrongPassword.headers.get('Content-Security-Policy')).not.toContain(
		'unsafe-inline',
	);

	const invalid = await request('/authorize?client_id=unregistered');

	expect(invalid.status).toBe(400);
	expect(invalid.headers.get('Content-Type')).toContain('text/html');
	expect(invalid.headers.getSetCookie()).toHaveLength(0);
	expect(await invalid.text()).toContain('This connection request');
});
