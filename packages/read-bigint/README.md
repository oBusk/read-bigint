# readBigInt

> 👓💯 Read Signed/Unsigned Big/Little-Endian BigInt from Buffer

## Install

```bash
npm install read-bigint
```

## Usage

```js
import {
    readBigInt64BE,
    readBigInt64LE,
    readBigUInt64BE,
    readBigUInt64LE
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
    0x88
]);

readBigInt64BE(buffer, /* offset */ 1); // => 1234605616436508552n
readBigInt64LE(buffer, /* offset */ 1); // => -8613303245920329199n
readBigUInt64BE(buffer, /* offset */ 1); // => 1234605616436508552n
readBigUInt64LE(buffer, /* offset */ 1); // => 9833440827789222417n
```

Methods can also be installed [independently](https://github.com/oBusk/read-bigint#readme).

## License

MIT
