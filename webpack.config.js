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
    devServer: {
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|dist|buildscripts)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    }
};