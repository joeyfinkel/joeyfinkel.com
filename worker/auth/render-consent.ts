import type { OAuthHelpers } from '@cloudflare/workers-oauth-provider';
import { consentPage } from './page';
import { authResponse } from './response';

export async function renderConsent(
	request: Request,
	oauth: OAuthHelpers,
	error?: string,
	status = 200,
) {
	const authRequest = await oauth.parseAuthRequest(request);
	const details = await oauth.describeConsent(authRequest);
	const consent = await oauth.beginConsent(authRequest);
	const nonce = crypto.randomUUID();
	const url = new URL(request.url);

	return authResponse(
		consentPage(
			details,
			consent.handle,
			nonce,
			url.pathname + url.search,
			error,
		),
		nonce,
		status,
		consent.headers,
	);
}
