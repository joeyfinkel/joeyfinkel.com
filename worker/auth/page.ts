import type { ConsentDescription } from '@cloudflare/workers-oauth-provider';

function escapeHtml(value: string) {
	return value.replace(
		/[&<>"']/g,
		(character) => `&#${character.charCodeAt(0)};`,
	);
}

export function consentPage(details: ConsentDescription, handle: string) {
	const client = escapeHtml(details.clientName);
	const domain = details.clientDomain
		? `Client domain: ${escapeHtml(details.clientDomain)}`
		: 'This client registered itself; its name is unverified.';

	return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Authorize resume publishing</title></head>
<body><main><h1>Connect ${client} to your personal site?</h1>
<p>${domain}</p><p>Access will return to <strong>${escapeHtml(details.redirectHost)}</strong>.</p>
${details.redirectIsLoopback ? '<p>This sends access to an app on your computer. Continue only if you started this connection.</p>' : ''}
<p>This grants permission to stage and publish your public resume and experience timeline.</p>
<p>Requested scopes: ${details.scope.map(escapeHtml).join(', ')}</p>
<form method="post"><input type="hidden" name="handle" value="${escapeHtml(handle)}">
<p><label>Site publishing password <input type="password" name="password" autocomplete="current-password" required minlength="32" maxlength="512"></label></p>
<button name="decision" value="approve">Authorize publishing</button>
<button name="decision" value="deny" formnovalidate>Cancel</button></form>
</main></body></html>`;
}
