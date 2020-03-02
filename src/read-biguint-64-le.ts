import { getFirstAndLast } from "./common";

// https://github.com/nodejs/node/blob/v13.9.0/lib/internal/buffer.js#L83-L101
export function readBigUInt64LE(buffer: Buffer, offset = 0): bigint {
    const { first, last } = getFirstAndLast(buffer, offset);

    const lo =
        first +
        buffer[++offset] * 2 ** 8 +
        buffer[++offset] * 2 ** 16 +
        buffer[++offset] * 2 ** 24;

    const hi =
        buffer[++offset] +
        buffer[++offset] * 2 ** 8 +
        buffer[++offset] * 2 ** 16 +
        last * 2 ** 24;

    return BigInt(lo) + (BigInt(hi) << BigInt(32));
}
