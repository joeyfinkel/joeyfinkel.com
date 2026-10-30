import {
	AuthorizationError,
	CimdFetchError,
} from '@cloudflare/workers-oauth-provider';
import { secretsMatch } from '../resume/crypto';
import { ResumeError } from '../resume/error';
import { consentPage } from './page';

export async function authorize(request: Request, env: Env) {
	if (!env.PUBLISH_PASSWORD || env.PUBLISH_PASSWORD.length < 32) {
		throw new ResumeError('Publishing authentication is not configured', 503);
	}

	const oauth = env.OAUTH_PROVIDER;

	if (!oauth) {
		throw new ResumeError('Authorization provider unavailable', 503);
	}

	try {
		if (request.method === 'GET') {
			const authRequest = await oauth.parseAuthRequest(request);
			const details = await oauth.describeConsent(authRequest);
			const consent = await oauth.beginConsent(authRequest);
			consent.headers.set('Content-Type', 'text/html; charset=utf-8');
			consent.headers.set('Cache-Control', 'no-store');
			consent.headers.set(
				'Content-Security-Policy',
				"default-src 'none'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",
			);

			return new Response(consentPage(details, consent.handle), {
				headers: consent.headers,
			});
		}

		if (request.method !== 'POST') {
			throw new ResumeError('Method not allowed', 405);
		}

		if (request.headers.get('origin') !== new URL(request.url).origin) {
			throw new ResumeError('Invalid authorization origin', 403);
		}

		const { success } = await env.AUTH_LIMITER.limit({
			key: request.headers.get('CF-Connecting-IP') ?? 'local',
		});

		if (!success) {
			throw new ResumeError(
				'Too many authorization attempts; try again later',
				429,
			);
		}

		const form = await request.formData();
		const handle = String(form.get('handle') ?? '');

		if (form.get('decision') !== 'approve') {
			const denied = await oauth.denyConsent(request, handle);

			return new Response(null, { status: 302, headers: denied.headers });
		}

		const password = String(form.get('password') ?? '');

		if (!(await secretsMatch(password, env.PUBLISH_PASSWORD))) {
			throw new ResumeError(
				'Authorization failed; restart the connection and try again',
				401,
			);
		}

		const approved = await oauth.approveConsent(request, handle, {
			scope: ['resume:publish'],
		});
		const { redirectTo } = await oauth.completeAuthorization({
			request: approved.request,
			userId: 'site-owner',
			metadata: {},
			scope: ['resume:publish'],
			props: { owner: true },
		});
		approved.headers.set('Location', redirectTo);

		return new Response(null, { status: 302, headers: approved.headers });
	} catch (error) {
		if (error instanceof AuthorizationError && error.redirectTo) {
			return Response.redirect(error.redirectTo, 302);
		}

		if (
			error instanceof AuthorizationError ||
			error instanceof CimdFetchError
		) {
			throw new ResumeError(
				'Invalid or expired connector authorization; start again',
			);
		}

		throw error;
	}
}
