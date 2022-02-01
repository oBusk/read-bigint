import * as readBigInt from ".";

describe("Read BigInt", () => {
    it("exports expected methods", () => {
        expect(Object.keys(readBigInt)).toHaveLength(4);
        expect(typeof readBigInt.readBigInt64BE).toBe("function");
        expect(typeof readBigInt.readBigInt64LE).toBe("function");
        expect(typeof readBigInt.readBigUInt64BE).toBe("function");
        expect(typeof readBigInt.readBigUInt64LE).toBe("function");
    });
});
