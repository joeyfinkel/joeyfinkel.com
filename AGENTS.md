<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->

## Shared project rules

## Local development and preview

- Always run and access the app through Portless using the project's configured
  Portless URL. Use `pnpm dev` for local development; never bypass Portless by
  starting Vite directly or opening a raw `localhost` or `127.0.0.1` port URL.
- Use Portless for preview servers too. If Portless is unavailable or fails,
  diagnose it instead of falling back to a direct port.
- Stop any servers, builds, tests, or watchers you started when asked. Do not
  stop processes started by the user or another task without authorization.

## Admin async UI states

Before changing async data states in any admin route, dashboard widget, data
table, or side panel, read and follow
[the admin async UI state architecture](.agents/rules/admin-async-ui-states.md).

## Server-owned collection operations

- Filtering, searching, sorting, pagination, and aggregate/filter counts for
  application data must be performed by the server. Client components pass
  those parameters to backend queries and render the returned results.
- Never filter or sort application records in client components, derive filter
  counts from the currently loaded client result set, or hardcode those counts.

## Required libraries

- **Forms use the shared TanStack Form hook** — `useAppForm` from
  `@/components/form`, never raw `useForm` or `useState` + `onSubmit`. It
  registers `field.TextField` (label + input for text/email/password, with the
  password reveal toggle) and `form.SubmitButton`; reach for those before
  hand-rolling a labelled input or a submit button. Build reusable field
  clusters with the exported `withForm` / `withFieldGroup`.
- **Debounced input uses TanStack Pacer** (`@tanstack/react-pacer`) —
  `useDebouncer` for debounced callbacks, `useDebouncedValue` for debounced
  values. Never hand-roll `setTimeout` / `clearTimeout` debouncing.
- **Validate on the client too.** A form must surface a validation error and
  disable its submit control for input it can already tell is invalid (for
  example, inviting someone who is already an administrator). The server check
  stays, but the user should not have to submit to discover the problem.

## Navigation

- Every clickable navigation control in the UI must be a `Link` (or a
  `createLink` primitive). Do not call `navigate()` from an `onClick` to move
  the user to another screen, section, or search state.
- `navigate()` is only for side effects: closing overlays, post-submit
  redirects, auth flows, and other outcomes that are not a user-facing link.

## Component and file organization

- Never re-export values, components, functions, or types from another file.
  This is an application, not a library. Import directly from the file that
  defines the symbol; do not add barrel exports or compatibility re-exports.

- Keep files small and single-purpose. One component, hook, or cohesive helper
  per file. A file that accumulates several components or many functions must be
  split.
- Group a route's private code into `components/` and `utils/` directories
  beside the route, and nest further subfolders for a cohesive unit (e.g.
  `-team/components/invite-administrator/{dialog.tsx,form.ts}`,
  `-team/components/member-actions/{index.tsx,invitation-actions.tsx}`).
- Do not prefix a file name with the directory it already lives in. Inside
  `-team/` a table component is `components/table.tsx`, not
  `components/team-table.tsx`.

## Code styling

Dense, wall-of-code files are hard to scan. Prefer breathing room: blank lines
around blocks, grouped declarations, and a blank line before every `return`.
`src/routes/admin/$resource/-exports/page.tsx` is an example of what **not** to
do — declarations, hooks, and returns are packed with no spacing.

- Put a blank line before any `return` statement.
- Group variables together and group functions together (do not interleave
  unrelated declarations).
- Put a blank line before and after any function or any code block delimited by
  `{}`.
- Always use `function` when defining a new top level functions, except for callbacks. Use `const` only when
  assigning a function returned by a higher-order function (HOF), then call that
  result later.
- I never want to see the `function` keyword for props that are functions or callbacks. The only exception to this is a prop or callback that defines a React component. Here, the `function` keyword helps with React Devtools
- Always use `{}` when writing `if`, any type of `for`, or `while` statements
- Never put conditional class-name logic directly in `className`. Use the `cn`
  utility for conditional classes.

### Spacing and grouping

```ts
// Bad — no breathing room (like -exports/page.tsx)
function ExportRows({ cursor = null }: { cursor?: string | null }) {
	const [loadNext, setLoadNext] = useState(false);
	const args = Route.useSearch({
		select: ({ search, exportType }) => ({
			search: search?.trim() || undefined,
			format: exportType ?? 'all',
		}),
	});
	const { data } = useSuspenseQuery(
		convexQuery(api.generatedExports.list, {
			...args,
			paginationOpts: { cursor, numItems: 50 },
		}),
	);
	return (
		<>
			{data.page.map((record) => (
				<div key={record._id}>{record.title}</div>
			))}
		</>
	);
}
function ExportsToolbar() {
	const navigate = Route.useNavigate();
	const search = Route.useSearch({ select: (state) => state.search ?? '' });
	const [searchValue, setSearchValue] = useState(search);
	useEffect(() => setSearchValue(search), [search]);
	const hasFilters = Boolean(search);
	return <div>{/* ... */}</div>;
}

// Good — blank lines before returns, around blocks, and between functions;
// variables grouped, then logic
function ExportRows({ cursor = null }: { cursor?: string | null }) {
	const [loadNext, setLoadNext] = useState(false);
	const args = Route.useSearch({
		select: ({ search, exportType }) => ({
			search: search?.trim() || undefined,
			format: exportType ?? 'all',
		}),
	});
	const { data } = useSuspenseQuery(
		convexQuery(api.generatedExports.list, {
			...args,
			paginationOpts: { cursor, numItems: 50 },
		}),
	);

	return (
		<>
			{data.page.map((record) => (
				<div key={record._id}>{record.title}</div>
			))}
		</>
	);
}

function ExportsToolbar() {
	const navigate = Route.useNavigate();
	const search = Route.useSearch({ select: (state) => state.search ?? '' });
	const [searchValue, setSearchValue] = useState(search);
	const hasFilters = Boolean(search);

	useEffect(() => {
		setSearchValue(search);
	}, [search]);

	return <div>{/* ... */}</div>;
}
```

### `function` vs `const`

```ts
// Good — always define new functions with `function`
function getFileEndpoint(token: string) {
	return `${siteUrl}/exports/file?token=${encodeURIComponent(token)}`;
}

// Good — `const` only for a function returned by an HOF, then call it later
const result = callHOF('hello');

result('this is the result');

// Bad — never create a new function with `const` + arrow
const getFileEndpoint = (token: string) =>
	`${siteUrl}/exports/file?token=${encodeURIComponent(token)}`;
```
## General rules

- Only ever make the changes I ask. If there's something else you thing can/should be changed because of something I ask, stop and ask me
- Look for `'@agent' | '@agents'` in comments and apply the change that it says there - typically in it's own commit, unless it says or makes sense to include in the same commit


## Commits

- Use `type(scope): summary`, for example
  `fix(admin): make filter, sort, group and reset controls links`.
- Types: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`, `ci`.
- The scope is the product area the change touches, such as `admin`, `auth`,
  `booking`, `payments`, `documents`, `templates`, `settings` or `header`.
- Write the summary in lowercase and say what the change does for the user or
  the code, not which files moved.
- The subject line is the whole message. Add a short body only when the reason
  for the change isn't clear from the subject.
- Never add trailers: no `Co-Authored-By`, no session links.


## Logging into the app

- You, the agent have permission to login while developing locally
- You can create any amount of **plain** user accounts
- When you need admin access, use the following credentials:
  username: agent@example.com
  password: Test1234!
