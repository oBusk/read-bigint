import { getFirstAndLast } from "./common.js";

// https://github.com/nodejs/node/blob/v13.9.0/lib/internal/buffer.js#L103-L121
export function readBigUInt64BE(buffer: Buffer, offset = 0): bigint {
    const { first, last } = getFirstAndLast(buffer, offset);

    const hi =
        first * 2 ** 24 +
        buffer[++offset] * 2 ** 16 +
        buffer[++offset] * 2 ** 8 +
        buffer[++offset];

    const lo =
        buffer[++offset] * 2 ** 24 +
        buffer[++offset] * 2 ** 16 +
        buffer[++offset] * 2 ** 8 +
        last;

    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
}
