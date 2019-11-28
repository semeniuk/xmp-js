import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import builtins from "rollup-plugin-node-builtins";

const out = format => ({
    file: `${__dirname}/dist/xmp.${format}${process.env.NODE_ENV === "production" ? ".min" : ""}.js`,
    format,
    name: "XMP"
});

module.exports = {
    input: "src/index.js",
    output: [
        out("iife"),
        out("cjs"),
        out("esm")
    ],
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        resolve(),
        commonjs(),
        builtins(),
        (process.env.NODE_ENV === "production" && terser())
    ]
};
