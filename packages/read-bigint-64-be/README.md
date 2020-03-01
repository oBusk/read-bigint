# readBigInt64BE

> 👓💯 Read Signed Big-Endian BigInt from Buffer

## Install

```bash
npm install read-bigint-64-be
```

## Usage

```js
import { readBigInt64BE } from "read-bigint-64-be";

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

The method is a copy of the native
[`buf.readBigInt64BE()`](https://nodejs.org/docs/latest-v13.x/api/buffer.html#buffer_buf_readbigint64be_offset)
, which should be used instead when targeting Node >=12.0.0.

## License

MIT
