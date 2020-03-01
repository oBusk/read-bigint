import readBigUInt64LE from ".";

const ZERO_64BIT = Object.freeze([
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00
]);
const MAX_64BIT_UNSIGNED_INTEGER_HEX = Object.freeze([
    0xff,
    0xff,
    0xff,
    0xff,
    0xff,
    0xff,
    0xff,
    0xff
]);
const MAX_64BIT_UNSIGNED_INTEGER = "18446744073709551615";

describe("readBigUInt64LE", () => {
    let buffer: Buffer;

    describe("values", () => {
        test("can get 0", () => {
            buffer = Buffer.from(ZERO_64BIT);

            expect(readBigUInt64LE(buffer).toString()).toBe("0");
        });

        test("can get maximum number", () => {
            buffer = Buffer.from(MAX_64BIT_UNSIGNED_INTEGER_HEX);

            expect(readBigUInt64LE(buffer).toString()).toBe(
                MAX_64BIT_UNSIGNED_INTEGER
            );
        });
    });

    describe("argument:", () => {
        beforeEach(() => {
            buffer = Buffer.from([
                ...MAX_64BIT_UNSIGNED_INTEGER_HEX,
                ...ZERO_64BIT
            ]);
        });

        describe("buffer:", () => {
            it("throws if buffer is too small", () => {
                buffer = Buffer.from(ZERO_64BIT.slice(-1));
                expect(() => readBigUInt64LE(buffer)).toThrow(
                    /memory outside buffer bounds/
                );
            });

            it("throws if buffer argument is not buffer", () => {
                expect(() => readBigUInt64LE(ZERO_64BIT as any)).toThrow(
                    /argument must be of type/
                );
                expect(() => readBigUInt64LE("buffer" as any)).toThrow(
                    /argument must be of type/
                );
                expect(() => readBigUInt64LE(0 as any)).toThrow(
                    /argument must be of type/
                );
                expect(() => readBigUInt64LE({ [0]: "hello" } as any)).toThrow(
                    /argument must be of type/
                );
            });
        });

        describe("offset:", () => {
            describe("handles legal offsets:", () => {
                it("0", () => {
                    expect(readBigUInt64LE(buffer, 0).toString()).toBe(
                        MAX_64BIT_UNSIGNED_INTEGER
                    );
                });
                it("1", () => {
                    expect(readBigUInt64LE(buffer, 1).toString()).toBe(
                        "72057594037927935"
                    );
                });
                it("2", () => {
                    expect(readBigUInt64LE(buffer, 2).toString()).toBe(
                        "281474976710655"
                    );
                });
                it("7", () => {
                    expect(readBigUInt64LE(buffer, 7).toString()).toBe("255");
                });
                it("8", () => {
                    expect(readBigUInt64LE(buffer, 8).toString()).toBe("0");
                });
            });

            it("throws if trying to read outside buffer", () => {
                expect(() => readBigUInt64LE(buffer, -1)).toThrow(
                    /out of range/
                );
                expect(() => readBigUInt64LE(buffer, -999)).toThrow(
                    /out of range/
                );
                expect(() => readBigUInt64LE(buffer, 9)).toThrow(
                    /out of range/
                );
            });

            it("throws 'out of range' if offset is not an integer", () => {
                // matches native buffer readBigInt
                expect(() => readBigUInt64LE(buffer, 0.1)).toThrow(
                    /out of range/
                );
                expect(() =>
                    readBigUInt64LE(buffer, 9.000000000000000001)
                ).toThrow(/out of range/);
            });

            it("throws 'argument type' error if offset is not a number", () => {
                expect(() =>
                    readBigUInt64LE(buffer, BigInt("1") as any)
                ).toThrow(/argument must be of type/);
                expect(() => readBigUInt64LE(buffer, "1" as any)).toThrow(
                    /argument must be of type/
                );
            });
        });
    });
});
