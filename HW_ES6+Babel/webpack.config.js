'use strict';

module.exports = {
    entry: [ "element-closest", "babel-polyfill", "whatwg-fetch", "./js/app" ],
    output: {
        filename: "app.js"
    },
    module: {
        rules: [{
            test: /js/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    }
};
