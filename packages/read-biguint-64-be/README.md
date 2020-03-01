# readBigUInt64BE

> 👓💯 Read Unsigned Big-Endian BigInt from Buffer

## Install

```bash
npm install read-biguint-64-be
```

## Usage

```js
import { readBigUInt64BE } from "read-biguint-64-be";

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

The method is a copy of the native
[`buf.readBigUInt64BE()`](https://nodejs.org/docs/latest-v13.x/api/buffer.html#buffer_buf_readbiguint64be_offset)
, which should be used instead when targeting Node >=12.0.0.

## License

MIT
