const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/dist/plugin').default;
const resolve = (dir) => {
    return path.join(__dirname, dir);
};
module.exports = {
    entry: path.join(__dirname, '/src/components/index.js'),
    // output:'',
    output: {
        //出口文件
        //filename: '[name].js',
        filename: "[name].js", // hash为了解决缓存，帮助浏览器判断文件是否更新；
        path: path.resolve(__dirname, "lib"),
        // chunkFilename: "js/[id].js",
    },
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
    plugins: [new VueLoaderPlugin()],
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm-bundler.js',
            "@": resolve("src"),
            _c: resolve("src/components"),

        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    },
    devtool: 'cheap-module-eval-source-map',
    // devServer: {
    //     port: 3001,
    //     hot: true,
    //     host: '127.0.0.1'
    // },
    cache: true,
}