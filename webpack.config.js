const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        "index": "./src/index.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "extension")
    }
};
