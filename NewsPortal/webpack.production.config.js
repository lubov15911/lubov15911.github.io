'use strict';
const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
let ProdConfig = require('./commonWebpackConfig');

let babelLoader = ProdConfig.module.rules.find(rule => rule.loader === 'babel-loader');
if (babelLoader) {
    babelLoader.options.plugins.push(__dirname + "/plugins/consoleCleaner");
}

ProdConfig.devtool = 'source-map';
ProdConfig.plugins.push(new UglifyJsPlugin({ minimize: true, sourceMap: true }));
module.exports = ProdConfig;
