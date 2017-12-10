'use strict';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const HashedModuleIdsPlugin = require("webpack/lib/HashedModuleIdsPlugin");

let CommonStyles = new ExtractTextPlugin("styles.css");
let ArticleStyles = new ExtractTextPlugin("articles.css");

module.exports = {
    entry: {
        vendor: ["element-closest", "babel-polyfill", "whatwg-fetch"],
        app: ["./styles/less/main.less", "./styles/less/articles.less", "./js/app"]
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
                presets: ["env"],
                plugins: ['syntax-dynamic-import']
            }
        }, {
            test: /main\.less$/,
            use: CommonStyles.extract({
                fallback: "style-loader",
                use: ["css-loader", "less-loader"]
            })
        }, {
            test: /articles\.less$/,
            use: ArticleStyles.extract({
                fallback: "style-loader",
                use: ["css-loader", "less-loader"]
            })
        }, {
            test: /\.json$/,
            loader: './plugins/json-loader'
        }]
    },
    plugins: [
        CommonStyles,
        ArticleStyles,
        new CommonsChunkPlugin({
            name: "vendor"
        }),
        new HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20
        })
    ]
};
