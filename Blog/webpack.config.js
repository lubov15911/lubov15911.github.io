'use strict';

module.exports = {
    entry: ["./client/index.js"],
    output: {
        path: __dirname + "/public",
        filename: "[name].js"
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ["env", "react"]
            }
        }]
    }
};
