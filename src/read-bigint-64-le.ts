import { getFirstAndLast } from "./common";

// https://github.com/nodejs/node/blob/v13.9.0/lib/internal/buffer.js#L123-L139
export function readBigInt64LE(buffer: Buffer, offset = 0): bigint {
    const { first, last } = getFirstAndLast(buffer, offset);

    const val =
        buffer[offset + 4] +
        buffer[offset + 5] * 2 ** 8 +
        buffer[offset + 6] * 2 ** 16 +
        (last << 24); // Overflow
    return (
        (BigInt(val) << BigInt(32)) +
        BigInt(
            first +
                buffer[++offset] * 2 ** 8 +
                buffer[++offset] * 2 ** 16 +
                buffer[++offset] * 2 ** 24,
        )
    );
}
