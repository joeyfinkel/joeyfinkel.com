import { escapeHtml } from './escape';
import { authStyles } from './styles';

export function authDocument(title: string, content: string, nonce: string) {
	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>${escapeHtml(title)} · Joey Finkel</title>
<style nonce="${nonce}">${authStyles}</style>
<script nonce="${nonce}">try{const theme=localStorage.getItem('joeyfinkel-theme');document.documentElement.dataset.theme=theme==='dark'||(theme!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light'}catch{document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}</script>
</head>
<body>
<main>
<a class="brand" href="/">Joey Finkel<span>.</span>
</a>
<section class="card">${content}</section>
<p class="footer">Resume publishing for joeyfinkel.com</p>
</main>
</body>
</html>`;
}
