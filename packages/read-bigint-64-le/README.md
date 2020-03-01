# readBigInt64LE

> 👓💯 Read Signed Little-Endian BigInt from Buffer

## Install

```bash
npm install read-bigint-64-le
```

## Usage

```js
import { readBigInt64LE } from "read-bigint-64-le";

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

The method is a copy of the native
[`buf.readBigInt64LE()`](https://nodejs.org/docs/latest-v13.x/api/buffer.html#buffer_buf_readbigint64le_offset)
, which should be used instead when targeting Node >=12.0.0.

## License

MIT
