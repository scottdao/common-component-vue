// .babelrc.js

'use strict'

const output = process.env.BABEL_OUTPUT
const modules = output == null ? false : output

const options = {
    presets: [
        ['@babel/preset-env', { targets: { node: true } }]
        // ['@babel/env', { loose: true, modules }],
        // '@babel/react',
        // '@vue/app'
    ],
    plugins: [
        ['@vue/babel-plugin-jsx', { mergeProps: false }],
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-transform-object-assign',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-runtime',
    ],
}

module.exports = options