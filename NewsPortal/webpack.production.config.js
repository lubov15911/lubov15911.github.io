'use strict';
const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
let ProdConfig = require('./commonWebpackConfig');

ProdConfig.devtool = 'source-map';
ProdConfig.plugins.push(new UglifyJsPlugin({ minimize: true, sourceMap: true }));
module.exports = ProdConfig;
