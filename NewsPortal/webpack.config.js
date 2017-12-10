'use strict';
let DevConfig = require('./commonWebpackConfig');

DevConfig.devtool = 'eval';
module.exports = DevConfig;
