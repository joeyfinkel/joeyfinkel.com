# joeyfinkel.com

A small personal project showcase built with React, TypeScript, Vite, TanStack
Router, Tailwind CSS, and shadcn/ui. Cloudflare serves static assets plus a small
Worker for resume publishing. R2 stores resume versions; KV stores OAuth grants.

## Development

Use Node 24 (see `.node-version`) and the pnpm version in `package.json`.

```sh
pnpm install
pnpm dev
```

Local development uses Portless at `https://joeyfinkel.localhost` (or the URL
reported by Portless when using an existing proxy configuration). `pnpm preview`
also runs through Portless. Do not start Vite directly.

`AGENTS.md` is copied from `jfdevelops/glammed-by-arielie`. Its backend and admin
rules apply when those features exist. The frontend remains static; the resume
service uses Workers rather than Convex.

```sh
pnpm check
pnpm cf-typegen
pnpm test
pnpm build
pnpm typecheck
pnpm deploy:check
```

The router generates `src/routeTree.gen.ts` during development and builds. Run
the build before typechecking a fresh clone. Commit generated route updates.

## Structure

- `src/routes/`: file-based routes; a route's private components and data live
  beside it in a `-` prefixed folder, which the router ignores.
- `src/components/ui/`: shared shadcn components.
- `src/lib/`: shared utilities.
- `public/`: static assets.

Keep features contained, import directly from their defining files, and avoid
barrel exports. The home page's project list lives in `src/routes/-home/projects.ts`.

Add UI components with `pnpm dlx shadcn@latest add <component>`.

## Color theme

The site follows the device color scheme by default and responds to changes
while open. The header's device, sun, and moon icon controls select system,
light, or dark mode. Each control has an accessible label and pressed state.
The preference is stored locally; choosing System theme follows the device again.
`next-themes` applies the theme before rendering to avoid a flash of the wrong theme.

## Continuous integration

GitHub Actions runs on pull requests to `main`, all branch pushes, and manual
dispatch. It installs with a frozen lockfile, checks
formatting and lint, builds production assets, checks TypeScript, verifies the
generated route tree is committed, and validates Cloudflare packaging with a dry
run. The build runs before typechecking so route generation works on fresh clones.

Actions are pinned to commit SHAs and updated by Dependabot. The workflow has
read-only repository permissions and requires no Cloudflare credentials.
`deploy.yml` publishes the exact `main` commit after its CI push workflow succeeds.
Pull request and feature-branch workflows cannot trigger a production deployment.
Manual dispatch is restricted to `main` and repeats validation before deployment.

Create a GitHub `production` environment with `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` secrets. The token needs Workers deployment permissions
for the intended account and permission to manage the configured custom domain.
GitHub environment protection rules can require approval before publishing.
Deployments are serialized; credentials are exposed only to the deployment step.
Local publishing remains available through `pnpm deploy`.

## Experience and resume

Employment history is maintained in `src/routes/-home/utils/experience.ts`, based on
the supplied master resume. The current consulting role appears first, followed
by previous roles. Dates and overlapping engagements are preserved.

The experience section uses the [ReUI timeline](https://reui.io/docs/components/radix/timeline),
adapted into individual components in `src/components/reui/timeline/` with the
upstream MIT license. It uses the existing Radix Slot and `cn` utility.

Company logos are served locally from `public/companies/`; a generic icon is
used when a logo is missing or fails to load. Asset sources are recorded there.

`public/resume.pdf` is the original master resume, used until the first publication.
After that, `/resume.pdf` and the timeline read the published version from R2.
Resume links include the timeline's revision so an already-open page continues
to link to its matching PDF. Failed or incomplete uploads never replace the
current version. A service outage shows an experience retry message while the
project showcase remains available.

See [resume publishing setup](docs/resume-publishing.md) for Cloudflare setup,
Claude connector authorization, and instructions for the Job Search project.

## Hosting

`wrangler.jsonc` configures static assets, SPA routing, and the custom domain
`joeyfinkel.com`. The domain must be an active Cloudflare zone in the deployment
account. Authenticate with `pnpm exec wrangler login`, then run `pnpm deploy`.
Wrangler attaches the custom domain during deployment. No credentials belong in
the repository. `pnpm deploy:check` validates packaging without publishing.

See [Cloudflare Static Assets](https://developers.cloudflare.com/workers/static-assets/)
and [custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
