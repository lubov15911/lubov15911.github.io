module.exports = {
    context: __dirname + '/src',
    entry: './index',
    output: {
        path: __dirname + '/src',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './src',
        port: 9000
    },
};