const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/dist/plugin').default;
const resolve = (dir) => {
    return path.join(__dirname, dir);
};
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    title: 'form-vue-components',
    template: path.join(__dirname, 'examples/src/index.html'),
})
module.exports = {
    entry: path.join(__dirname, 'examples/src/main.js'),
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                // exclude: /pickr.*js/,
                exclude: /node_modules/,
                // options: babelConfig,
            },
            {
                test: /\.(ts|tsx)?$/,
                use: [{
                        loader: 'babel-loader',
                        // options: babelConfig,
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            appendTsSuffixTo: ['\\.vue$'],
                            happyPackMode: false,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.md$/,
                loader: 'raw-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [htmlWebpackPlugin, new webpack.HotModuleReplacementPlugin(), new VueLoaderPlugin()],
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm-bundler.js',
            "@": resolve("src"),
            _c: resolve("src/components"),

        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 3001,
        hot: true,
        host: '127.0.0.1'
    },
    cache: true,
}