/* eslint-env node */

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js",
    },
    devtool: "inline-source-map",
    output: {
        filename: "[name].js",
        path: __dirname + "/dist"
    }
};
