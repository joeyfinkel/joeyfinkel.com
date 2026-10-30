import {
	AuthorizationError,
	CimdFetchError,
} from '@cloudflare/workers-oauth-provider';
import { secretsMatch } from '../resume/crypto';
import { ResumeError } from '../resume/error';
import { authErrorPage } from './error-page';
import { renderConsent } from './render-consent';
import { retryConsent } from './retry-consent';

export async function authorize(request: Request, env: Env) {
	if (!env.PUBLISH_PASSWORD || env.PUBLISH_PASSWORD.length < 32) {
		return authErrorPage(
			'Publishing authentication is not configured yet.',
			503,
		);
	}

	const oauth = env.OAUTH_PROVIDER;

	if (!oauth) {
		return authErrorPage(
			'The authorization provider is unavailable. Try again later.',
			503,
		);
	}

	let passwordVerified = false;

	try {
		if (request.method === 'GET') {
			return await renderConsent(request, oauth);
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
			return retryConsent(
				request,
				oauth,
				'That publishing password did not match. Please try again.',
				401,
			);
		}

		passwordVerified = true;

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
		if (error instanceof ResumeError) {
			return authErrorPage(error.message, error.status);
		}

		if (error instanceof AuthorizationError && error.redirectTo) {
			return Response.redirect(error.redirectTo, 302);
		}

		if (
			error instanceof AuthorizationError ||
			error instanceof CimdFetchError
		) {
			if (request.method === 'POST' && error instanceof AuthorizationError) {
				console.warn(
					JSON.stringify({
						event: 'connector_consent_rejected',
						code: error.code,
						reason: error.description,
					}),
				);

				return retryConsent(
					request,
					oauth,
					passwordVerified
						? 'Your password was accepted, but the connection request could not be completed. A fresh authorization session is ready. Enter your password again. If this repeats, allow cookies for this site and reconnect from Claude.'
						: 'The browser authorization session expired. A fresh session is ready. You can try again or cancel.',
					400,
				);
			}

			return authErrorPage(
				'This connection request is invalid or expired.',
				400,
			);
		}

		console.error(
			JSON.stringify({
				event: 'connector_authorization_failed',
				error: error instanceof Error ? error.name : 'unknown',
			}),
		);

		return authErrorPage(
			'The authorization service is temporarily unavailable. Please try again later.',
			503,
		);
	}
}
