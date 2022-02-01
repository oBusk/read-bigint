import { readBigInt64BE } from "./read-bigint-64-be";

const ZERO_64BIT_SIGNED_INTEGER = Object.freeze([
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
]);
const MAX_64BIT_SIGNED_INTEGER_BE = Object.freeze([
    0x7f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
]);
const MAX_64BIT_SIGNED_INTEGER = "9223372036854775807";
const MIN_64BIT_SIGNED_INTEGER_BE = Object.freeze([
    0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
]);
const MIN_64BIT_SIGNED_INTEGER = `-${MAX_64BIT_SIGNED_INTEGER}`;

describe("readBigInt64BE", () => {
    let buffer: Buffer;

    describe("values", () => {
        test("can get 0", () => {
            buffer = Buffer.from(ZERO_64BIT_SIGNED_INTEGER);

            expect(readBigInt64BE(buffer).toString()).toBe("0");
        });

        test("can get maximum number", () => {
            buffer = Buffer.from(MAX_64BIT_SIGNED_INTEGER_BE);

            expect(readBigInt64BE(buffer).toString()).toBe(
                MAX_64BIT_SIGNED_INTEGER,
            );
        });

        test("can get minimum number", () => {
            buffer = Buffer.from(MIN_64BIT_SIGNED_INTEGER_BE);

            expect(readBigInt64BE(buffer).toString()).toBe(
                MIN_64BIT_SIGNED_INTEGER,
            );
        });
    });

    describe("argument:", () => {
        beforeEach(() => {
            buffer = Buffer.from([
                ...MAX_64BIT_SIGNED_INTEGER_BE,
                ...ZERO_64BIT_SIGNED_INTEGER,
            ]);
        });

        describe("buffer:", () => {
            it("throws if buffer is too small", () => {
                buffer = Buffer.from(ZERO_64BIT_SIGNED_INTEGER.slice(-1));
                expect(() => readBigInt64BE(buffer)).toThrow(
                    /memory outside buffer bounds/,
                );
            });

            it("throws if buffer argument is not buffer", () => {
                expect(() =>
                    readBigInt64BE(
                        // @ts-expect-error
                        ZERO_64BIT_SIGNED_INTEGER,
                    ),
                ).toThrow(/argument must be of type/);

                expect(() =>
                    readBigInt64BE(
                        // @ts-expect-error
                        "buffer",
                    ),
                ).toThrow(/argument must be of type/);

                expect(() =>
                    readBigInt64BE(
                        // @ts-expect-error
                        0,
                    ),
                ).toThrow(/argument must be of type/);

                expect(() =>
                    readBigInt64BE({
                        // @ts-expect-error
                        [0]: "hello",
                    }),
                ).toThrow(/argument must be of type/);
            });
        });

        describe("offset:", () => {
            describe("handles legal offsets:", () => {
                it("0", () => {
                    expect(readBigInt64BE(buffer, 0).toString()).toBe(
                        MAX_64BIT_SIGNED_INTEGER,
                    );
                });
                it("1", () => {
                    expect(readBigInt64BE(buffer, 1).toString()).toBe("-256");
                });
                it("2", () => {
                    expect(readBigInt64BE(buffer, 2).toString()).toBe("-65536");
                });
                it("7", () => {
                    expect(readBigInt64BE(buffer, 7).toString()).toBe(
                        "-72057594037927936",
                    );
                });
                it("8", () => {
                    expect(readBigInt64BE(buffer, 8).toString()).toBe("0");
                });
            });

            it("throws if trying to read outside buffer", () => {
                expect(() => readBigInt64BE(buffer, -1)).toThrow(
                    /out of range/,
                );
                expect(() => readBigInt64BE(buffer, -999)).toThrow(
                    /out of range/,
                );
                expect(() => readBigInt64BE(buffer, 9)).toThrow(/out of range/);
            });

            it("throws 'out of range' if offset is not an integer", () => {
                // matches native buffer readBigInt
                expect(() => readBigInt64BE(buffer, 0.1)).toThrow(
                    /out of range/,
                );
                expect(() => readBigInt64BE(buffer, 9.00000000000001)).toThrow(
                    /out of range/,
                );
            });

            it("throws 'argument type' error if offset is not a number", () => {
                expect(() =>
                    readBigInt64BE(
                        buffer,
                        // @ts-expect-error
                        BigInt("1"),
                    ),
                ).toThrow(/argument must be of type/);
                expect(() =>
                    readBigInt64BE(
                        buffer,
                        // @ts-expect-error
                        "1",
                    ),
                ).toThrow(/argument must be of type/);
            });
        });
    });
});
