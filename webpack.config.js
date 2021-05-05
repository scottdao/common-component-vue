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
const babelConfig = {
    cacheDirectory: true,
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: [
                        'last 2 versions',
                        'Firefox ESR',
                        '> 1%',
                        'ie >= 11',
                        'iOS >= 8',
                        'Android >= 4',
                    ],
                },
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            'babel-plugin-import',
            {
                libraryName: 'ant-design-vue',
                libraryDirectory: '', // default: lib
                style: true,
            },
        ],
        ['@vue/babel-plugin-jsx', { mergeProps: false, enableObjectSlots: false }],
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-transform-object-assign',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-class-properties',
    ],
};
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
                test: /\.(vue)$/,
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