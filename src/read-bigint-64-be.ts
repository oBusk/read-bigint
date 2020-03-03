import { getFirstAndLast } from "./common";

// https://github.com/nodejs/node/blob/v13.9.0/lib/internal/buffer.js#L141-L157
export function readBigInt64BE(buffer: Buffer, offset = 0): bigint {
    const { first, last } = getFirstAndLast(buffer, offset);

    const val =
        (first << 24) + // Overflow
        buffer[++offset] * 2 ** 16 +
        buffer[++offset] * 2 ** 8 +
        buffer[++offset];
    return (
        (BigInt(val) << BigInt(32)) +
        BigInt(
            buffer[++offset] * 2 ** 24 +
                buffer[++offset] * 2 ** 16 +
                buffer[++offset] * 2 ** 8 +
                last,
        )
    );
}
