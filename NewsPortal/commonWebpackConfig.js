'use strict';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    entry: {
        vendor: ["element-closest", "babel-polyfill", "whatwg-fetch"],
        app: ["./styles/less/main.less", "./js/app"]
    },
    output: {
        path: __dirname + "/public",
        filename: "[name].js"
    },
    devServer: {
        contentBase: './',
        port: 9000
    },
    module: {
        rules: [{
            test: /js/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ["env"]
            }
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "less-loader"]
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new CommonsChunkPlugin({
            name: "vendor"
        })
    ]
};
