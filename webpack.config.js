var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'var',
        library: 'SCROLLBAR'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'scroll.html',
            template: 'src/assets/test.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    // devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};