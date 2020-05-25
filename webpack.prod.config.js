/* eslint-env node */

export const mode = "production";
export const entry = {
    index: "./src/index.js"
};
export const output = {
    filename: "[name].js",
    path: __dirname + "/dist"
};
