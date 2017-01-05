/**
 * @fileOverview Webpack Configuration Information.
 *  
 */
var webpackMerge = require('webpack-merge');
var path = require('path');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

/*
 * Webpack Plugins
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

/*
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig({
  env: ENV
}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR
});

/**
 * Webpack Configuration
 * ref: http://webpack.github.io/docs/configuration.html#cli
 * 
 */
module.exports = function (options) {
  return webpackMerge(commonConfig({
    env: ENV
  }), {


    /**
     * Developer tool to enhance debugging
     * 
     * ref: http://webpack.github.io/docs/configuration.html#devtool
     * ref: https://github.com/webpack/docs/wiki/build-performance#sourcemaps 
     */
    devtool: 'cheap-module-eval-source-map',

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

      // publicPath: 'http://localhost:8080/',

      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * ref: http://webpack.github.io/docs/configuration.html#output-filename
       */
      filename: '[name].bundle.js',

      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * ref: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
       */
      sourceMapFilename: '[name].map',

      /** The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * ref: http://webpack.github.io/docs/configuration.html#output-chunkfilename
       */
      chunkFilename: '[id].chunk.js',

      library: 'ac_[name]',
      libraryTarget: 'var',
    },
    plugins: [

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
        debug: true,
        options: {
          context: __dirname,
          output: {
            path: './'
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

    /**
     * Webpack Development Server configuration
     * Description: The webpack-dev-server is a little node.js Express server.
     * The server emits information about the compilation state to the client,
     * which reacts to those events.
     *
     * ref: https://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * ref: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  })
};
