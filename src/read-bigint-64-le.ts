import { boundsErrorMsg, errInvalidArgTypeMsg } from "./error-messages";

// https://github.com/nodejs/node/blob/v13.9.0/lib/internal/buffer.js#L123-L139
export function readBigInt64LE(buffer: Buffer, offset = 0): bigint {
    if (!Buffer.isBuffer(buffer)) {
        throw new Error(
            errInvalidArgTypeMsg("buffer", "Buffer", typeof buffer)
        );
    }
    if (typeof (offset as unknown) !== "number") {
        throw new Error(
            errInvalidArgTypeMsg("offset", "number", typeof offset)
        );
    }
    const first = buffer[offset] as number | undefined;
    const last = buffer[offset + 7] as number | undefined;
    if (first === undefined || last === undefined) {
        throw new Error(boundsErrorMsg(offset, buffer.length - 8));
    }

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
                buffer[++offset] * 2 ** 24
        )
    );
}
