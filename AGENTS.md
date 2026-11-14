# AGENTS.md

Guidance for AI coding agents in this repo. Human contributors: see the
[Contribute](./README.md#contribute) section of the README.

This is `crypto-uid`: it generates cryptographically secure, URL- and cookie-safe UIDs using the
Web Crypto API (`crypto.getRandomValues`). It is a small, published npm library written in
TypeScript with no runtime dependencies; keep it that way.

The toolchain is the Rust-based oxc stack: [oxlint](https://oxc.rs/) to lint,
[oxfmt](https://oxc.rs/) to format, [tsdown](https://tsdown.dev/) (Rolldown + oxc) to build and emit
declarations, and [Vitest](https://vitest.dev/) to test; TypeScript (`tsc --noEmit`) type-checks and
`size-limit` budgets the bundle. Browser behaviour is covered by [Playwright](https://playwright.dev/)
(library e2e). There is no Babel, ESLint, Prettier, TSLint, Jest, or Rollup; do not reintroduce them.

## Workflow

- Clarify the design before implementing. For anything non-trivial, agree on the approach first.
- One unit of change per commit. Never mix unrelated changes. Present the change for review before
  committing.
- Every change ships with tests. Run local CI before calling it done, and do not claim it passes
  without running it.
- Verify against the code and the tools: read before you answer, run before you assert.

Local CI (must be green before review):

```shell
npm run type-check      # tsc --noEmit
npm run lint            # oxlint
npm run lint:type-aware # oxlint --type-aware (non-blocking in CI, but run it)
npm run format:check    # oxfmt --check
npm run build           # tsdown -> dist/
npm run test:cov        # vitest with coverage
npm run size            # size-limit bundle budget
```

The prek git hooks (installed via `npm install`) auto-run oxfmt and oxlint on staged code and
validate the commit message, but they do not run type-check, the build, or the tests, and they do
not format Markdown. Run the commands above yourself, and run `npm run format` after editing
docs/Markdown or CI's `format:check` will fail on it.

Browser tests need Chromium (`npx playwright install --with-deps chromium`):

```shell
npm run test:e2e        # library: exercises the built bundle in real Chromium
```

## Writing: code, comments, docs, commits

- Concise and to the point. No fluff. Explain the non-obvious; do not narrate the obvious.
- ASCII only. No em-dash and no `--`; write `-`. Use `->` not the arrow glyph, `!=` not the
  not-equal glyph, and so on.
- Comments justify _why_, not _what_. Delete any comment that restates the code.
- Formatting is not a matter of taste: oxfmt owns it. Run `npm run format` rather than
  hand-formatting. House style (`.oxfmtrc.json`) is double quotes, two-space indent, semicolons, no
  trailing commas, no bracket spacing (`{a, b}`), arrow parens omitted when possible, and a
  120-column print width.

## Commits

- [Conventional Commits](https://www.conventionalcommits.org/); the type set is enforced by a
  commit-msg hook and consumed by semantic-release. Write the subject in the present tense,
  imperative voice: `fix: handle empty byte length`, not `fixed` or `fixes`.
- `feat:`/`fix:`/`perf:` cut a release; a `BREAKING CHANGE:` footer in the commit body cuts a major
  (semantic-release uses the default `angular` preset, which ignores `feat!:` without a
  `BREAKING CHANGE:` footer). `chore:`/`ci:`/`docs:`/`test:`/`refactor:`/`style:`/`build:` do not
  cut a release. Pick the type with that in mind.
- Keep the body minimal, or omit it. A good subject plus the diff is usually enough; add a body only
  for what the code cannot show (why, a trade-off, a non-obvious consequence). Never restate the
  change or narrate the diff.

## Tests

- Unit tests live beside the source as `src/*.spec.ts` and run under Vitest with the jsdom
  environment.
- `e2e/*.e2e.ts` are Playwright tests for library behaviour in a real browser against a fixture page
  that imports the built `dist/` (so `npm run build` runs first via `pretest:e2e`).
- Coverage must not drop. New code ships with tests that hold or raise it. Measure with
  `npm run test:cov`.

## Code conventions

- Source is TypeScript (ESM); no JSX.
- The published API is what `src/index.ts` re-exports (`uid` and `default`). Keep the README usage
  examples in step with any public change.

## Build and publish

- `npm run build` bundles with tsdown into `dist/` (ESM `.js`, CJS `.cjs`, and `.d.ts` emitted from
  source). Do not hand-edit anything in `dist/` - it is generated.
- What ships to npm is the `files` allowlist in `package.json` (`dist` and `src`, minus specs); keep
  it accurate. The `size-limit` budget in `package.json` guards the bundle size.
- Releases are automated by semantic-release from the commit history; the repo version stays
  `0.0.0-development` and is set at publish time. Never bump the version by hand. Runtime is Node
  `>= 22` (`engines`).

## CI workflows

- GitHub Actions live in `.github/workflows` (`test.yml` runs lint/test/size/e2e; `release.yml`;
  `verify-release.yml`). Write the workflow `name:`, every job name, and every named step in
  Sentence case (match the existing files).
- Dependabot groups patch/minor bumps and auto-merges patches on green CI (`.github/dependabot.yml`,
  `dependabot-auto-merge.yml`).
- Keep workflows minimal and scoped to one purpose; prefer the built-in `GITHUB_TOKEN` over a
  personal access token.
