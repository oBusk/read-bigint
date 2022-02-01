import { readBigInt64LE } from "./read-bigint-64-le";

const ZERO_64BIT_SIGNED_INTEGER = Object.freeze([
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
]);
const MAX_64BIT_SIGNED_INTEGER_LE = Object.freeze([
    0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f,
]);
const MAX_64BIT_SIGNED_INTEGER = "9223372036854775807";
const MIN_64BIT_SIGNED_INTEGER_LE = Object.freeze([
    0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80,
]);
const MIN_64BIT_SIGNED_INTEGER = `-${MAX_64BIT_SIGNED_INTEGER}`;

describe("readBigInt64LE", () => {
    let buffer: Buffer;

    describe("values", () => {
        test("can get 0", () => {
            buffer = Buffer.from(ZERO_64BIT_SIGNED_INTEGER);

            expect(readBigInt64LE(buffer).toString()).toBe("0");
        });

        test("can get maximum number", () => {
            buffer = Buffer.from(MAX_64BIT_SIGNED_INTEGER_LE);

            expect(readBigInt64LE(buffer).toString()).toBe(
                MAX_64BIT_SIGNED_INTEGER,
            );
        });

        test("can get minimum number", () => {
            buffer = Buffer.from(MIN_64BIT_SIGNED_INTEGER_LE);

            expect(readBigInt64LE(buffer).toString()).toBe(
                MIN_64BIT_SIGNED_INTEGER,
            );
        });
    });

    describe("argument:", () => {
        beforeEach(() => {
            buffer = Buffer.from([
                ...MAX_64BIT_SIGNED_INTEGER_LE,
                ...ZERO_64BIT_SIGNED_INTEGER,
            ]);
        });

        describe("buffer:", () => {
            it("throws if buffer is too small", () => {
                buffer = Buffer.from(ZERO_64BIT_SIGNED_INTEGER.slice(-1));
                expect(() => readBigInt64LE(buffer)).toThrow(
                    /memory outside buffer bounds/,
                );
            });

            it("throws if buffer argument is not buffer", () => {
                expect(() =>
                    // @ts-expect-error
                    readBigInt64LE(ZERO_64BIT_SIGNED_INTEGER),
                ).toThrow(/argument must be of type/);
                expect(() =>
                    // @ts-expect-error
                    readBigInt64LE("buffer"),
                ).toThrow(/argument must be of type/);
                expect(() =>
                    // @ts-expect-error
                    readBigInt64LE(0),
                ).toThrow(/argument must be of type/);
                expect(() =>
                    // @ts-expect-error
                    readBigInt64LE({ [0]: "hello" }),
                ).toThrow(/argument must be of type/);
            });
        });

        describe("offset:", () => {
            describe("handles legal offsets:", () => {
                it("0", () => {
                    expect(readBigInt64LE(buffer, 0).toString()).toBe(
                        MAX_64BIT_SIGNED_INTEGER,
                    );
                });
                it("1", () => {
                    expect(readBigInt64LE(buffer, 1).toString()).toBe(
                        "36028797018963967",
                    );
                });
                it("2", () => {
                    expect(readBigInt64LE(buffer, 2).toString()).toBe(
                        "140737488355327",
                    );
                });
                it("7", () => {
                    expect(readBigInt64LE(buffer, 7).toString()).toBe("127");
                });
                it("8", () => {
                    expect(readBigInt64LE(buffer, 8).toString()).toBe("0");
                });
            });

            it("throws if trying to read outside buffer", () => {
                expect(() => readBigInt64LE(buffer, -1)).toThrow(
                    /out of range/,
                );
                expect(() => readBigInt64LE(buffer, -999)).toThrow(
                    /out of range/,
                );
                expect(() => readBigInt64LE(buffer, 9)).toThrow(/out of range/);
            });

            it("throws 'out of range' if offset is not an integer", () => {
                // matches native buffer readBigInt
                expect(() => readBigInt64LE(buffer, 0.1)).toThrow(
                    /out of range/,
                );
                expect(() => readBigInt64LE(buffer, 9.00000000000001)).toThrow(
                    /out of range/,
                );
            });

            it("throws 'argument type' error if offset is not a number", () => {
                expect(() =>
                    readBigInt64LE(
                        buffer,
                        // @ts-expect-error
                        BigInt("1"),
                    ),
                ).toThrow(/argument must be of type/);
                expect(() =>
                    readBigInt64LE(
                        buffer,
                        // @ts-expect-error
                        "1",
                    ),
                ).toThrow(/argument must be of type/);
            });
        });
    });
});
