import type { OAuthHelpers } from '@cloudflare/workers-oauth-provider';

declare global {
	interface Env {
		// Injected by OAuthProvider during request dispatch, not a Wrangler binding.
		OAUTH_PROVIDER?: OAuthHelpers;
	}
}
