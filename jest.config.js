module.exports = {
    roots: ["<rootDir>/src/"],
    transform: {
        "\\.ts$": "ts-jest",
    },
    testRegex: "\\.spec\\.(ts|js)$",
    moduleFileExtensions: ["ts", "js", "json"],
};
