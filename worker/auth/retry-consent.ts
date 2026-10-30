import {
	AuthorizationError,
	CimdFetchError,
	type OAuthHelpers,
} from '@cloudflare/workers-oauth-provider';
import { authErrorPage } from './error-page';
import { renderConsent } from './render-consent';

export async function retryConsent(
	request: Request,
	oauth: OAuthHelpers,
	message: string,
	status: number,
) {
	try {
		return await renderConsent(request, oauth, message, status);
	} catch (error) {
		if (
			error instanceof AuthorizationError ||
			error instanceof CimdFetchError
		) {
			return authErrorPage(message, status);
		}

		throw error;
	}
}
