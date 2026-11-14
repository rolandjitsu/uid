# UID Generator

> A small package for generating cryptographically secure UIDs in the browser, safe for both cookie and URL usage.

[![npm](https://img.shields.io/npm/v/crypto-uid.svg?style=flat-square)](https://www.npmjs.com/package/crypto-uid)
![Tests](https://img.shields.io/github/actions/workflow/status/rolandjitsu/uid/test.yml?branch=main&style=flat-square&label=tests)
[![coverage](https://img.shields.io/coveralls/github/rolandjitsu/uid/main?style=flat-square)](https://coveralls.io/github/rolandjitsu/uid?branch=main)

This package is a mirror of [uid-safe](https://github.com/crypto-utils/uid-safe), but meant to be used in a browser env.
Additionally, it comes bundled with [TypeScript](https://www.typescriptlang.org) typings.

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Browser Support](#browser-support)
- [Contribute](#contribute)
- [License](#license)

## Installation

You can install this package from [NPM](https://www.npmjs.com):

```bash
npm add crypto-uid
```

### CDN

For CDN usage, load the ESM build directly from a CDN such as [esm.sh](https://esm.sh) or [jsDelivr](https://www.jsdelivr.com/package/npm/crypto-uid):

```html
<script type="module">
  import {uid} from "https://esm.sh/crypto-uid";

  const id = uid(6);
  console.log(id);
</script>
```

## Usage

### ES6

Generate a random UID:

```ts
import {uid} from "crypto-uid";

const id = uid(6);
```

Or using the default export:

```ts
import uid from "crypto-uid";

const id = uid(6);
```

### CommonJS

Generate a random UID:

```ts
const {uid} = require("crypto-uid");

const id = uid(6);
```

## Browser Support

You can expect this lib to run wherever [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) is supported.

## Contribute

If you wish to contribute, please use [Conventional Commits](https://www.conventionalcommits.org).

### Development

Development requires [Node.js](https://nodejs.org) >= 22. Install the dependencies with:

```bash
npm install
```

The project is built with [tsdown](https://tsdown.dev) (Rolldown), type-checked with [TypeScript](https://www.typescriptlang.org), tested with [Vitest](https://vitest.dev) and linted/formatted with [oxlint](https://oxc.rs) and [oxfmt](https://oxc.rs).

| Command                   | Description                                                                      |
| ------------------------- | -------------------------------------------------------------------------------- |
| `npm test`                | Run the test suite in watch mode.                                                |
| `npm run test:cov`        | Run the tests once with coverage (runs type-check, lint and format check first). |
| `npm run test:e2e`        | Run Playwright browser e2e tests in headless Chromium.                           |
| `npm run type-check`      | Type-check the sources without emitting.                                         |
| `npm run lint`            | Lint the sources (oxlint).                                                       |
| `npm run lint:fix`        | Apply safe lint fixes.                                                           |
| `npm run lint:type-aware` | Type-aware lint via tsgolint (alpha).                                            |
| `npm run format`          | Format the sources (oxfmt).                                                      |
| `npm run format:check`    | Check formatting without writing.                                                |
| `npm run build`           | Build the outputs into `dist/`.                                                  |
| `npm run dev`             | Build in watch mode.                                                             |
| `npm run size`            | Check the bundle size against the `size-limit` budget.                           |
| `npm run hooks:install`   | Install the git hooks (`prek install`).                                          |
| `npm run hooks:run`       | Run every git hook over the whole repo.                                          |

The build emits into `dist/`:

- `dist/index.js` - ES module
- `dist/index.cjs` - CommonJS module
- `dist/index.d.ts` - TypeScript declarations

### Git hooks

Git hooks are managed with [prek](https://github.com/j178/prek), a fast Rust drop-in for the [pre-commit](https://pre-commit.com) framework (configured in [`.pre-commit-config.yaml`](.pre-commit-config.yaml)). On commit they format and lint the staged files with oxfmt/oxlint, and check the message against [Conventional Commits](https://www.conventionalcommits.org) - the same convention [semantic-release](https://semantic-release.gitbook.io) uses to cut releases.

prek is a standalone binary, so install it once (e.g. `uv tool install prek`, `brew install prek`, or see the [install docs](https://github.com/j178/prek#installation)). `npm install` then wires up the hooks automatically; run `npm run hooks:install` to (re)install them by hand. The hooks are optional - CI enforces the same lint, format and commit checks - but they catch issues before you push.

## License

MIT
