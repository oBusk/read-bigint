import { readBigUInt64BE } from "./read-biguint-64-be";

const ZERO_64BIT = Object.freeze([
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
]);
const MAX_64BIT_UNSIGNED_INTEGER_HEX = Object.freeze([
    0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
]);
const MAX_64BIT_UNSIGNED_INTEGER = "18446744073709551615";

describe("readBigUInt64BE", () => {
    let buffer: Buffer;

    describe("values", () => {
        test("can get 0", () => {
            buffer = Buffer.from(ZERO_64BIT);

            expect(readBigUInt64BE(buffer).toString()).toBe("0");
        });

        test("can get maximum number", () => {
            buffer = Buffer.from(MAX_64BIT_UNSIGNED_INTEGER_HEX);

            expect(readBigUInt64BE(buffer).toString()).toBe(
                MAX_64BIT_UNSIGNED_INTEGER,
            );
        });
    });

    describe("argument:", () => {
        beforeEach(() => {
            buffer = Buffer.from([
                ...MAX_64BIT_UNSIGNED_INTEGER_HEX,
                ...ZERO_64BIT,
            ]);
        });

        describe("buffer:", () => {
            it("throws if buffer is too small", () => {
                buffer = Buffer.from(ZERO_64BIT.slice(-1));
                expect(() => readBigUInt64BE(buffer)).toThrow(
                    /memory outside buffer bounds/,
                );
            });

            it("throws if buffer argument is not buffer", () => {
                expect(() =>
                    readBigUInt64BE(
                        // @ts-expect-error
                        ZERO_64BIT,
                    ),
                ).toThrow(/argument must be of type/);
                expect(() =>
                    readBigUInt64BE(
                        /// @ts-expect-error
                        "buffer",
                    ),
                ).toThrow(/argument must be of type/);
                expect(() =>
                    readBigUInt64BE(
                        // @ts-expect-error
                        0,
                    ),
                ).toThrow(/argument must be of type/);
                expect(() =>
                    readBigUInt64BE({
                        // @ts-expect-error
                        [0]: "hello",
                    }),
                ).toThrow(/argument must be of type/);
            });
        });

        describe("offset:", () => {
            describe("handles legal offsets:", () => {
                it("0", () => {
                    expect(readBigUInt64BE(buffer, 0).toString()).toBe(
                        MAX_64BIT_UNSIGNED_INTEGER,
                    );
                });
                it("1", () => {
                    expect(readBigUInt64BE(buffer, 1).toString()).toBe(
                        "18446744073709551360",
                    );
                });
                it("2", () => {
                    expect(readBigUInt64BE(buffer, 2).toString()).toBe(
                        "18446744073709486080",
                    );
                });
                it("7", () => {
                    expect(readBigUInt64BE(buffer, 7).toString()).toBe(
                        "18374686479671623680",
                    );
                });
                it("8", () => {
                    expect(readBigUInt64BE(buffer, 8).toString()).toBe("0");
                });
            });

            it("throws if trying to read outside buffer", () => {
                expect(() => readBigUInt64BE(buffer, -1)).toThrow(
                    /out of range/,
                );
                expect(() => readBigUInt64BE(buffer, -999)).toThrow(
                    /out of range/,
                );
                expect(() => readBigUInt64BE(buffer, 9)).toThrow(
                    /out of range/,
                );
            });

            it("throws 'out of range' if offset is not an integer", () => {
                // matches native buffer readBigInt
                expect(() => readBigUInt64BE(buffer, 0.1)).toThrow(
                    /out of range/,
                );
                expect(() => readBigUInt64BE(buffer, 9.00000000000001)).toThrow(
                    /out of range/,
                );
            });

            it("throws 'argument type' error if offset is not a number", () => {
                expect(() =>
                    readBigUInt64BE(
                        buffer,
                        // @ts-expect-error
                        BigInt("1"),
                    ),
                ).toThrow(/argument must be of type/);
                expect(() =>
                    readBigUInt64BE(
                        buffer,
                        // @ts-expect-error
                        "1",
                    ),
                ).toThrow(/argument must be of type/);
            });
        });
    });
});
