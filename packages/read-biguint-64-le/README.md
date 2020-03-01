# readBigUInt64LE

> 👓💯 Read Unsigned Little-Endian BigInt from Buffer

## Install

```bash
npm install read-biguint-64-le
```

## Usage

```js
import { readBigUInt64LE } from "read-biguint-64-le";

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

The method is a copy of the native
[`buf.readBigUInt64LE()`](https://nodejs.org/docs/latest-v13.x/api/buffer.html#buffer_buf_readbiguint64le_offset)
, which should be used instead when targeting Node >=12.0.0.

## License

MIT
