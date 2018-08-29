# UID Generator

> A small package for generating cryptographically secure UIDs in the browser, safe for both cookie and URL usage.

This package is a mirror of [uid-safe](https://github.com/crypto-utils/uid-safe), but meant to be used in a browser env.
Additionally it comes bundled with TypeScript typings.


# Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Browser Support](#browser-support)
* [Contribute](#contribute)


### Installation
You can install this package from [NPM](https://www.npmjs.com):
```bash
npm add webuid
```

Or with [Yarn](https://yarnpkg.com/en):
```bash
yarn add webuid
```

*NOTE*: [TypeScript](https://www.typescriptlang.org) type definitions are bundled with the package.


### Usage
Generate a random UID:
```ts
import {uid} from 'webuid';
const id = uid(6);
```


### Browser Support
-------------------
You can expect this lib to run wherever [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) is supported.


### Contribute
--------------
If you wish to contribute, please use the following guidelines:
* Use [Conventional Commits](https://conventionalcommits.org)
* Use `yarn test:cov` to ensure tests are still passing and there are no lint issues
* Use `[ci skip]` in commit messages to skip a build
