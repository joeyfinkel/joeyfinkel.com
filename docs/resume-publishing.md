# Resume publishing

The frontend remains Vite + TanStack Router. A Cloudflare Worker handles public
reads and a private remote MCP connector. No Start migration or AI API key is
needed: Claude supplies the structured experience from the master resume.

## Cloudflare setup

1. Use the intended Cloudflare account with an active `joeyfinkel.com` zone.
2. The private R2 bucket `joeyfinkel-resumes` and KV namespace
   `joeyfinkel-com-oauth` have been provisioned. Their account and binding IDs
   are configured in `wrangler.jsonc`; those IDs are public configuration.
3. GitHub's `production` environment is restricted to `main` and has the
   `CLOUDFLARE_ACCOUNT_ID` secret configured.
4. Configure `CLOUDFLARE_API_TOKEN` and `PUBLISH_PASSWORD` in that environment.
   The token needs deployment access for the Worker and its custom domain in
   the intended account. Use a unique publishing password of at least 32 characters
   and retain it in your password manager. This is the owner password for connector
   consent, not a Cloudflare token. Never put either credential in source control,
   chat, or Claude project instructions.
5. The deployment workflow uploads `PUBLISH_PASSWORD` alongside the verified build,
   including on the first deployment. It uses a temporary JSON secrets file with
   owner-only permissions and removes it when the deploy step exits. No preliminary
   public Worker deployment is needed. For manual deployments, supply a protected
   JSON file via `pnpm exec wrangler deploy --secrets-file <path>` after building.
6. Merge the reviewed stack. `deploy.yml` publishes only after `main` CI succeeds.
   Manual deployment remains `pnpm deploy`.

For local development, copy `.dev.vars.example` to `.dev.vars`, fill in a local
test password, then run `pnpm cf-typegen` and `pnpm dev`. Development and tests
use local storage emulation. `worker-configuration.d.ts` is generated and ignored.
Changing `SITE_ORIGIN` also changes the OAuth resource identity; production must
remain `https://joeyfinkel.com`.

## Connect Claude

Add a [custom remote connector](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)
with the URL `https://joeyfinkel.com/mcp`. Complete the browser authorization
using the publishing password. The consent page shows the requesting client and
the callback domain; approve only the connection you initiated. OAuth uses PKCE,
browser-bound consent, expiring tokens, and refresh-token rotation. Token
revocation is available through the provider's `/oauth/token` revocation support.

Enable the connector for conversations in the Job Search project. Also enable
Claude's code execution/file creation and allow its network access to
`joeyfinkel.com` for the PDF upload. These are separate capabilities; a connector
alone cannot read a sandbox-local PDF. See [Claude file creation and network settings](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude).

## Instructions to add to Job Search

```text
Keep my public master resume separate from resumes tailored to individual jobs.
When I explicitly ask you to publish my master resume to joeyfinkel.com:

1. Read `get_published_resume` to check the current revision.
2. Finalize the master PDF and derive the experience entries from that exact
   version. Preserve names, titles, dates, and concurrent engagements; never
   invent responsibilities or metrics. Put the current role first, then past roles.
3. Compute the PDF's SHA-256 using code execution. Call `prepare_resume` with
   `pdfSha256` and the complete `experience` array. Each entry contains company,
   role, start (`YYYY-MM`), period (displayed date range), location, highlights,
   and technologies. Optional logo values are the existing local paths for JF
   Develops, Febyte, and Ecom Diversify; omit the logo for other employers.
4. From code execution, PUT the exact PDF bytes to the returned `uploadUrl`, with
   `Content-Type: application/pdf` and `Authorization: Bearer <uploadToken>`.
   Keep this credential out of URLs, shared files, and printed command output.
5. Only after a successful upload, call `publish_resume` with the draft revision.
   If a newer version was published meanwhile, reread it and prepare again;
   do not silently overwrite it.
6. Verify the public PDF and timeline and report the publication revision.

Updating or saving a file inside this project does not itself publish it.
Do not publish job-specific drafts unless I explicitly select one as the master.
```

An upload can use Python's `urllib.request` with the token in the Authorization
header. Do not pass long-lived owner credentials to code execution; only the
short-lived draft upload credential is needed there.

## Publication behavior

- Draft credentials expire after 15 minutes. The PDF limit is 2 MiB. The service
  verifies its checksum, parses it as a readable unencrypted PDF, and accepts it
  only once per draft. MCP/authorization request bodies are capped at 128 KiB.
- Publishing conditionally replaces one `current.json` record containing the
  experience and the revision of an already uploaded PDF. A stale draft receives
  a conflict instead of overwriting newer work. Retrying the current publication
  is safe. Successful versions are archived for links on already-open pages.
- Public reads use `Cache-Control: no-store`; a stable `/resume.pdf` URL always
  resolves to the latest published master. Draft PDFs are not publicly readable.
- The connector relies on Claude to keep the structured experience faithful to
  the PDF. Validation checks shape and exact PDF bytes; it does not fact-check
  resume prose or perform AI extraction.
- Published PDFs are public and historical published revisions remain readable.
  Use this service only for the public master resume. Staged/abandoned drafts are
  private but remain in R2 until deleted. An R2 lifecycle rule may expire the
  `drafts/` metadata prefix after a retention period; do not expire published PDF
  objects while historical links are needed.
- To revoke access, remove the connector and revoke its OAuth grant/token. Changing
  the owner password blocks future authorizations but does not revoke issued grants.

## Validation

```sh
pnpm install --frozen-lockfile
pnpm cf-typegen
pnpm check
pnpm test
pnpm build
pnpm typecheck
pnpm deploy:check
```

Tests execute in workerd with local R2, KV, and rate-limit bindings. They cover
the OAuth/PKCE flow, browser-bound consent, a complete MCP-to-PDF publication,
unauthorized and invalid uploads, draft privacy, expiry, stale writes, exact PDF
integrity, and historical links. No remote resources are modified by tests.
