import { authDocument } from './document';
import { escapeHtml } from './escape';
import { authResponse } from './response';

export function authErrorPage(message: string, status: number) {
	const nonce = crypto.randomUUID();

	return authResponse(
		authDocument(
			'Connection needs attention',
			`<h1>Let’s try that connection again.</h1>
<p role="alert" class="notice">${escapeHtml(message)}</p>
<p>Close this window, return to Claude, and choose Connect again. Keep the authorization in the same browser and allow cookies for joeyfinkel.com.</p>
<a class="button" href="/">Back to my site</a>`,
			nonce,
		),
		nonce,
		status,
	);
}
