import type { ConsentDescription } from '@cloudflare/workers-oauth-provider';
import { authDocument } from './document';
import { escapeHtml } from './escape';

export function consentPage(
	details: ConsentDescription,
	handle: string,
	nonce: string,
	action: string,
	error?: string,
) {
	const client = escapeHtml(details.clientName);
	const domain = details.clientDomain
		? escapeHtml(details.clientDomain)
		: 'Self-registered client (unverified)';

	return authDocument(
		`Connect ${details.clientName}`,
		`<h1>Connect ${client}?</h1>
<p>Allow this connection to update your public resume and experience timeline.</p>${error ? `<p role="alert" class="notice">${escapeHtml(error)}</p>` : ''}<dl>
<div>
<dt>Client domain</dt>
<dd>${domain}</dd>
</div>
<div>
<dt>Return to</dt>
<dd>${escapeHtml(details.redirectHost)}</dd>
</div>
<div>
<dt>Requested permissions</dt>
<dd class="scope">${details.scope.map(escapeHtml).join(', ')}</dd>
</div>
</dl>${details.redirectIsLoopback ? '<p class="notice">This sends access to an app on your computer. Continue only if you started this connection.</p>' : ''}<form method="post" action="${escapeHtml(action)}">
<input type="hidden" name="handle" value="${escapeHtml(handle)}">
<label for="password">Site publishing password</label>
<input id="password" type="password" name="password" autocomplete="current-password" autocapitalize="off" spellcheck="false" required minlength="32" maxlength="512" aria-describedby="password-help">
<p id="password-help" class="hint">Use the publishing password you saved for this site.</p>
<div class="actions">
<button class="primary" name="decision" value="approve">Authorize publishing</button>
<button name="decision" value="deny" formnovalidate>Cancel</button>
</div>
</form>`,
		nonce,
	);
}
