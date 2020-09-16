# Read BigInt

[![NPM Version](https://img.shields.io/npm/v/read-bigint)](https://www.npmjs.com/package/read-bigint)
[![Node.js CI](https://github.com/oBusk/read-bigint/workflows/Node.js%20CI/badge.svg)](https://github.com/oBusk/read-bigint/actions?query=workflow%3A%22Node.js+CI%22)
[![CodeQL](https://github.com/oBusk/read-bigint/workflows/CodeQL/badge.svg)](https://github.com/oBusk/read-bigint/actions?query=workflow%3ACodeQL)
[![Dependabot: enabled](https://badgen.net/badge/dependabot/enabled/green?icon=dependabot)](https://github.com/oBusk/read-bigint/network/updates)
[![codecov](https://codecov.io/gh/oBusk/read-bigint/branch/master/graph/badge.svg)](https://codecov.io/gh/oBusk/read-bigint)
[![Bundlesize](https://img.shields.io/bundlephobia/minzip/read-bigint)](https://bundlephobia.com/result?p=read-bigint)
[![Bundle Watched](https://img.shields.io/badge/bundle-watched-blue.svg)](https://bundlewatch.io)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> 👓💯 Read Unsigned/Signed Big/Little-Endian BigInt from Buffer

## Install

```bash
npm install read-bigint
```

-   [Supported Node versions](./package.json#L24) aim to be
    [Latest current and LTS](https://nodejs.org/en/download/releases/) as well as trying to keep up to date
    with the latest supported node in
    [Google cloud functions](https://cloud.google.com/functions/docs/concepts/nodejs-runtime).

## Usage

```js
import {
    readBigInt64BE,
    readBigInt64LE,
    readBigUInt64BE,
    readBigUInt64LE,
} from "read-bigint";

const buffer = Buffer.from([
    0x00,
    0x11,
    0x22,
    0x33,
    0x44,
    0x55,
    0x66,
    0x77,
    0x88,
]);

readBigInt64BE(buffer, /* offset */ 1); // => 1234605616436508552n
readBigInt64LE(buffer, /* offset */ 1); // => -8613303245920329199n
readBigUInt64BE(buffer, /* offset */ 1); // => 1234605616436508552n
readBigUInt64LE(buffer, /* offset */ 1); // => 9833440827789222417n
```

The purpose of this package is to be able to read native BigInt from native Buffer.
This is mostly useful when targeting Node 10 (LTS Dubnium), which supports BigInt, but does not have
native methods for reading BigInt from Buffer. On Node 12 or any later version of Node, you should use the
[native Buffer methods](https://nodejs.org/docs/latest-v13.x/api/buffer.html#buffer_buf_readbigint64be_offset)
instead.

## API

Each of the exported methods is a direct copy of the Native Buffer.readBigInt() methods.

-   `readBigInt64BE(buffer, offset)`

    Copy of native
    [`buffer.readBigInt64BE(offset)`](https://nodejs.org/docs/latest-v13.x/api/buffer.html#buffer_buf_readbigint64be_offset)

-   `readBigInt64LE(buffer, offset)`

    Copy of native
    [`buffer.readBigInt64LE(offset)`](https://nodejs.org/docs/latest-v13.x/api/buffer.html#buffer_buf_readbigint64le_offset)

-   `readBigUInt64BE(buffer, offset)`

    Copy of native
    [`buffer.readBigUInt64LE(offset)`](https://nodejs.org/docs/latest-v13.x/api/buffer.html#buffer_buf_readbiguint64be_offset)

-   `readBigUInt64BE(buffer, offset)`

    Copy of native
    [`buffer.readBigUInt64LE(offset)`](https://nodejs.org/docs/latest-v13.x/api/buffer.html#buffer_buf_readbiguint64be_offset)

## License

MIT
