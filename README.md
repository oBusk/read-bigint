# Read Big Int

> 👓💯 Packages of Node Buffer methods readBigInt64BE, readBigInt64LE, readBigUInt64BE, and readBigUInt64LE

## Install

```bash
npm install read-bigint
```

## Usage

```js
import * as readBigInt from "read-bigint";
```

The purpose of these packages is to be able to read native BigInt from native Buffer.
This is mostly useful when targeting Node 10 (LTS Dubnium) or Node 11, which supports BigInt, but does not have
native methods for reading BigInt from Buffer. On any later version of Node, you should use the
[native Buffer methods](https://nodejs.org/docs/latest-v13.x/api/buffer.html#buffer_buf_readbigint64be_offset)
instead.

### Core

These functions come bundled with [`read-bigint`](https://github.com/oBusk/read-bigint/tree/master/packages/read-bigint):

-   [`readBigInt64BE`](#readbigint64be)
-   [`readBigInt64LE`](#readbigint64le)
-   [`readBigUInt64BE`](#readbiguint64be)
-   [`readBigUInt64LE`](#readbiguint64le)

#### [`readBigInt64BE`](https://github.com/oBusk/read-bigint/tree/master/packages/read-bigint-64-be)

> 👓💯 Read Signed Big-Endian BigInt from Buffer

```js
const buffer = Buffer.from([
    0x00,
    0x11,
    0x22,
    0x33,
    0x44,
    0x55,
    0x66,
    0x77,
    0x88
]);

readBigInt64BE(buffer, /* offset */ 1); // => 1234605616436508552n
```

#### [`readBigInt64LE`](https://github.com/oBusk/read-bigint/tree/master/packages/read-bigint-64-le)

> 👓💯 Read Signed Little-Endian BigInt from Buffer

```js
const buffer = Buffer.from([
    0x00,
    0x11,
    0x22,
    0x33,
    0x44,
    0x55,
    0x66,
    0x77,
    0x88
]);

readBigInt64LE(buffer, /* offset */ 1); // => -8613303245920329199n
```

#### [`readBigUInt64BE`](https://github.com/oBusk/read-bigint/tree/master/packages/read-biguint-64-be)

> 👓💯 Read Unsigned Big-Endian BigInt from Buffer

```js
const buffer = Buffer.from([
    0x00,
    0x11,
    0x22,
    0x33,
    0x44,
    0x55,
    0x66,
    0x77,
    0x88
]);

readBigUInt64BE(buffer, /* offset */ 1); // => 1234605616436508552n
```

#### [`readBigUInt64LE`](https://github.com/oBusk/read-bigint/tree/master/packages/read-biguint-64-le)

> 👓💯 Read Unsigned Little-Endian BigInt from Buffer

```js
const buffer = Buffer.from([
    0x00,
    0x11,
    0x22,
    0x33,
    0x44,
    0x55,
    0x66,
    0x77,
    0x88
]);

readBigUInt64LE(buffer, /* offset */ 1); // => 9833440827789222417n
```

## License

MIT
