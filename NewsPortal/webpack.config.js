'use strict';
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: ["./styles/main.less", "element-closest", "babel-polyfill", "whatwg-fetch", "./js/app"],
    output: {
        path: __dirname + "/public",
        filename: "app.js"
    },
    module: {
        rules: [{
            test: /js/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "less-loader"]
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ]
};
