# joeyfinkel.com

A small personal project showcase built with React, TypeScript, Vite, TanStack
Router, Tailwind CSS, and shadcn/ui. Cloudflare Workers Static Assets serves the
compiled site. There is no application server, database, or runtime API.

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
rules apply when those features exist; this site remains a static application.

```sh
pnpm check
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
while open. The header theme selector can override it with light or dark mode.
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
Publishing remains an explicit `pnpm deploy` operation.
## Experience and resume

Employment history is maintained in `src/routes/-home/experience.ts`, based on
the supplied master resume. The current consulting role appears first, followed
by previous roles. Dates and overlapping engagements are preserved.

The experience section uses the [ReUI timeline](https://reui.io/docs/components/radix/timeline),
adapted into individual components in `src/components/reui/timeline/` with the
upstream MIT license. It uses the existing Radix Slot and `cn` utility.

Company logos are served locally from `public/companies/`; a generic icon is
used when a logo is missing or fails to load. Asset sources are recorded there.

`public/resume.pdf` is an unchanged copy of the supplied master resume, served
at `https://joeyfinkel.com/resume.pdf` after deployment. Replace that file to
publish an updated resume. Header and experience links open the PDF directly.

## Hosting

`wrangler.jsonc` configures static assets, SPA routing, and the custom domain
`joeyfinkel.com`. The domain must be an active Cloudflare zone in the deployment
account. Authenticate with `pnpm exec wrangler login`, then run `pnpm deploy`.
Wrangler attaches the custom domain during deployment. No credentials belong in
the repository. `pnpm deploy:check` validates packaging without publishing.

See [Cloudflare Static Assets](https://developers.cloudflare.com/workers/static-assets/)
and [custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
