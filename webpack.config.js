var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'var',
        library: 'SportDIGI'
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
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                },
                'css-loader',
            ]
        }]
    }
};