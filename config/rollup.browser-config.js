import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";

export default {
    input: {
        index: "src/index.ts",
        common: "src/common.ts",
        "read-bigint-64-be": "src/read-bigint-64-be.ts",
        "read-bigint-64-le": "src/read-bigint-64-le.ts",
        "read-biguint-64-be": "src/read-biguint-64-be.ts",
        "read-biguint-64-le": "src/read-biguint-64-le.ts",
    },
    output: { dir: "browser/dist", format: "esm", preserveModules: true },
    plugins: [
        replace({
            preventAssignment: true,
            "process.env.LOG_TOKENS": String(!!process.env.LOG_TOKENS),
            "process.env.LOG_STREAM": String(!!process.env.LOG_STREAM),
        }),
        babel({
            babelHelpers: "bundled",
            configFile: "./config/babel.config.js",
            presets: [["@babel/env", { modules: false }]],
        }),
        typescript({ declaration: true, outDir: "browser/dist" }),
    ],
    treeshake: { moduleSideEffects: false, propertyReadSideEffects: false },
};
