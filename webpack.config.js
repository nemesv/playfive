var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        main: './app/main.js',
        vendor: './app/vendor.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    devServer:{
        publicPath: '/dist/'
    },
    plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            })
        ]
};