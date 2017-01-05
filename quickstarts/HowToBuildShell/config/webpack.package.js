const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const {
  ENV,
  dir,
  APP_VERSION,
  APP_NAME
} = require('./helpers');

const banner =
  `/**
 * ${APP_NAME} v${APP_VERSION} (https://www.infosys.com)
 * Copyright 2016
 * Licensed under MIT
 */`;

module.exports = function (env) {
  return webpackMerge(commonConfig({
    env: ENV
  }, {
    devtool: 'source-map',
    module: {
      exprContextCritical: false,
      rules: [{
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader'
        ],
        exclude: [/\.(spec|e2e|d)\.ts$/]
      }, {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap'
        ]
      }]
    },
    entry: {
      'index': './src/index.ts'
    },
    output: {
      path: dir('release'),
      libraryTarget: 'umd',
      library: 'ng2d3',
      umdNamedDefine: true
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: banner,
        raw: true,
        entryOnly: true
      }),
    ]
  }))
}
