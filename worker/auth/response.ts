export function authResponse(
	html: string,
	nonce: string,
	status = 200,
	headers = new Headers(),
) {
	headers.set('Content-Type', 'text/html; charset=utf-8');
	headers.set('Cache-Control', 'no-store');
	headers.set('Referrer-Policy', 'no-referrer');
	headers.set('X-Content-Type-Options', 'nosniff');
	headers.set(
		'Content-Security-Policy',
		`default-src 'none'; style-src 'nonce-${nonce}'; script-src 'nonce-${nonce}'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'`,
	);

	return new Response(html, { status, headers });
}
