/**
 * @fileOverview Webpack Configuration Information. 
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

var path = require('path');
/**
 * Webpack Plugins
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const V8LazyParseWebpackPlugin = require('v8-lazy-parse-webpack-plugin');

/**
 * Webpack constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(commonConfig({
  env: ENV
}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: false
});

const banner =
  `/**
 * ${helpers.APP_NAME} v${helpers.APP_VERSION} (https://www.infosys.com)
 * Copyright 2016
 * Licensed under MIT
 */`;

module.exports = function (env) {
  return webpackMerge(commonConfig({
    env: ENV
  }), {

    /**
     * Developer tool to enhance debugging
     *
     * ref: http://webpack.github.io/docs/configuration.html#devtool
     * ref: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'source-map',

    /**
     * Options affecting the output of the compilation.
     *
     * ref: http://webpack.github.io/docs/configuration.html#output
     */
    output: {

      /**
       * Output directory as absolute path.
       * ref: http://webpack.github.io/docs/configuration.html#output-path
       */
      path: helpers.root('dist'),

      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * See: http://webpack.github.io/docs/configuration.html#output-filename
       */
      filename: '[name].[chunkhash].bundle.map',

      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * ref: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
       */
      sourceMapFilename: '[name].[chunkhash].bundle.map',

      /**
       * The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
       */
      chunkFilename: '[id].[chunkhash].chunk.js'
    },

    /**
     * Add additional plugins to the compiler.
     *
     * ref: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [

      /**
       * Plugin: WebpackMd5Hash
       * Description: Plugin to replace a standard webpack chunkhash with md5.
       *
       * ref: https://www.npmjs.com/package/webpack-md5-hash
       */
      new WebpackMd5Hash(),

      /**
       * Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       * 
       * Environment helpers
       * 
       * ref: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       * 
       */
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': METADATA.HMR,
        }
      }),

      /**
       * Minimize all Javascript output of chunks.
       * Loaders are switched to minimizing mode.
       *  
       * ref: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
       * 
       */
      new UglifyJsPlugin({
        beautify: false, //prod
        output: {
          comments: false
        }, //prod
        mangle: {
          screw_ie8: true
        }, //prod
        compress: {
          screw_ie8: true,
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false // we need this for lazy v8
        },
      }),

      /**
       * Append content before or after js bundle
       */

      new webpack.BannerPlugin({
        banner: banner,
        raw: true, // tells webpack to prepend the text as it is
        entryOnly: true // setting to false, adds the text to all generated files
      }),
      /**
       * Replace resources that matches resourceRegExp with newResource. 
       *  
       * ref: http://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
       * 
       */
      new NormalModuleReplacementPlugin(
        /angular2-hmr/,
        helpers.root('config/empty.js')
      ),

      new NormalModuleReplacementPlugin(
        /zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
        helpers.root('config/empty.js')
      ),

      /**
       * Moves every chunks to a separate css output file.
       * Styles are no longer inlined to the javascript, but separate in a css bundle file.
       * 
       * ref: https://github.com/webpack/extract-text-webpack-plugin
       * 
       */
      new ExtractTextPlugin({
        filename: '[contenthash].css',
        disable: false,
        allChunks: true
      }),

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * ref: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          context: __dirname,
          output: {
            path: './'
          },
          /**
           * Html loader advanced options
           *
           * See: https://github.com/webpack/html-loader#advanced-options
           */
          // TODO: Need to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
          htmlLoader: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
            customAttrSurround: [
              [/#/, /(?:)/],
              [/\*/, /(?:)/],
              [/\[?\(?/, /(?:)/]
            ],
            customAttrAssign: [/\)?\]?=/]
          },
          sassLoader: {
            includePaths: [
              path.resolve(__dirname, 'styles'),
              path.resolve(__dirname, 'src')
            ]
          }
        }
      }),
    ],

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  });
}
