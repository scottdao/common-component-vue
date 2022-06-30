const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    title: 'doc-react-components',
    template: path.join(__dirname, 'examples/src/index.html'),
})

module.exports = {
    entry: path.join(__dirname, 'examples/src/index.js'),
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [htmlWebpackPlugin, new webpack.HotModuleReplacementPlugin()],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 3001,
        hot: true,
    },
    cache: true,
}