var path = require('path');
var webpack = require('webpack');
var helpers = require('./helpers');

/**
 * Webpack Plugins
 */
const AssetsPlugin = require('assets-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const webpackstrip = require('webpack-strip');

/**
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot'); // for hot module replacement.

const METADATA = {
  title: 'Project Starter Template',
  baseUrl: '/ngbp1/',
  isDevServer: helpers.isWebpackDevServer()
}

/**
 * Webpack configuration
 * @see  http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
  isProd = options.env === 'production';
  return {

    /*
     * entry point for the bundle. Ref:
     * http://webpack.github.io/docs/configuration.html#entry
     */
    entry: {
      'polyfills': './src/polyfills.ts',
      'vendor': './src/vendor.ts',
      'app': './src/main.ts',
      'styles': './src/styles.ts'
    },

    /*
     * options affecting the resolving of modules. Ref:
     * http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

      /*
       * an array of extensions that should be used to resolve modules. Ref:
       * http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.js', '.json'],

      // An array of directory names to be resolved to the current directory
      modules: [
        helpers.root('src'),
        helpers.root('styles'),
        helpers.root('node_modules')
      ],
    },

    /*
     * options affecting the normal modules. Comprises, loaders, rules etc.
     */
    module: {
      loaders: [

        /*
         * Typescript loader support for .ts and angular2 async routes using
         * .async.ts replace templateUrl and stylesUrl with require()
         *
         * Test specifications will be excluded from the bundle.
         *
         * ref: https://github.com/s-panferov/awesome-typescript-loader 
         * ref: https://github.com/TheLarkInn/angular2-template-loader
         */
//'webpack-strip?strip[]=debug,strip[]=console.log'
        {
          test: /\.ts$/,
          use: [
            '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
            'awesome-typescript-loader',
            'angular2-template-loader',
            'angular2-router-loader',
            'webpack-strip?strip[]=debug,strip[]=console.log'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },

        /*
         * Json loader support for *.json file. 
         * ref: https://github.com/webpack/json-loader
         */
        {
          test: /\.json$/,
          loader: 'json-loader'
        },

        /*
         * HTML loader support *.html files. 
         * ref: https://github.com/webpack/raw-loader      
         */
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },

        /* SVG loader support for *svg files 
         * ref: https://github.com/sairion/svg-inline-loader
         */
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },

        /*
         * Pace module might not resolve under normal webpack process. To get
         * around this until its fixed, AMD loading of pace should be disabled.  
         * ref: http://github.hubspot.com/pace/docs/welcome/ 
         * ref: https://github.com/webpack/imports-loader
         */
        {
          test: require.resolve("pace-progress"),
          loader: "imports?define=>false"
        },

        /*
         * css loader support for *.css files
         */
        {
          test: /\.css$/,
          exclude: [helpers.root('src', 'app')],
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [{
              loader: 'css-loader',
              query: {

              }
            }]
          })
        },


        /*
         * scss loader support for *.scss files 
         * ref: https://github.com/webpack/css-loader 
         * ref: https://github.com/jtangelder/sass-loader 
         * ref: https://github.com/webpack/style-loader
         */
        {
          // Load the SCSS files of Foundation. Foundation styles are global to
          // the application.
          test: /\.scss$/,
          include: [
            helpers.root('styles'),
            helpers.root('node_modules'),
          ],
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [{
              loader: 'css-loader'
            }, {
              loader: 'sass-loader'
            }]
          })
        },

        /*
         * scss files associated to modules may not injected correctly to the
         * angular chain, if styles loader are used. for such scenarios, the
         * processed styles should be loaded as a string and then pass on to the
         * angular. Uses raw-loader for this purpose.
         *
         * ref: https://github.com/webpack/raw-loader       
         * ref: https://github.com/jtangelder/sass-loader
         */
        {
          // Load the component specific scss. They're module specific
          test: /\.scss$/,
          exclude: [/\styles\/main\.scss$/],
          include: [helpers.root('src')],
          loaders: ['raw-loader', 'sass-loader']
        },


        /*
         * file loader support for static assets. 
         * ref:https://github.com/webpack/file-loader
         */
        {
          test: /\.(png|jpe?g|gif|woff|woff2|ttf|otf|eot|ico)$/,
          loader: 'file-loader?name=assets/[name].[hash].[ext]'
        },

        /*
         * loader support for svg files 
         * ref: https://github.com/webpack/url-loader
         */
        {
          test: /\.svg$/,
          loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=assets/[name].[hash].[ext]'
        },
      ]
    },
    plugins: [

      /*
       * The project uses momentjs for date time management and webpack includes
       * locale reference in every file of locale directory, which leads to dev
       * warnings. To provide more contextual information to webpack,
       * contextreplacementplugin is used which allows to override the inferred
       * information. Note - applicable to MomentJs Fix -
       * http://stackoverflow.com/questions/25384360/how-to-prevent-moment-js-from-loading-locales-with-webpack
       */
      new ContextReplacementPlugin(
        /\.\/locale$/,
        'empty-module',
        false,
        /js$/
      ),
      /*
       * To manage the assets that are generated with hash.
       */
      new AssetsPlugin({
        path: helpers.root('dist'),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),

      /*
       * do type checking in a separate process, so webpack don't have to wait
       */
      // https://github.com/s-panferov/awesome-typescript-loader/issues/293 
      // we're using awesometypscript-loader 3.0.0 beta version. ForkCheckerPlugin is built into this. 
      // https://github.com/s-panferov/awesome-typescript-loader/issues/274
      //new ForkCheckerPlugin(),


      /*
       * copies files and directories in webpack. This includes project static
       * assets. ref: https://www.npmjs.com/package/copy-webpack-plugin
       */
      new CopyWebpackPlugin(
        [{
          from: 'node_modules/pace-progress/pace.js',
          to: 'assets'
        }, {
          from: 'src/web.config',
          to: 'web.config'
        }, {
          from: 'node_modules/@spastyles/fonts/*.*',
          flatten: true,
          to: 'assets'
        }, {
          from: "public/images/*.*",
          flatten: true,
          to: 'assets'
        }], {
          ignore: [
            '*.css',
            '*.txt'
          ]
        }),

      /*
       * Shares common code between pages. The plugin identifies common modules
       * and put them into a common chunk. ref:
       * https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
       * ref: https://github.com/angular/angular/issues/11580
       */
      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
      }),

      /*
       * to enhance html webpack plugin functionality with async and defer
       * attributes for script elements. 
       * ref: https://github.com/numical/script-ext-html-webpack-plugin
       */
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),

      /*
       * Simplifies creation of HTML files to serve your webpack bundles. This
       * is especially useful for webpack bundles that include a hash in the
       * filename which changes every compilation. ref:
       * https://github.com/ampedandwired/html-webpack-plugin
       */
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: METADATA.title,
        chunksSortMode: 'dependency',
        metadata: METADATA,
        inject: 'head'
      }),


      /*
       * If a publicPath is set in the webpack output configuration, it will be
       * automatically added to href attributes, you can disable that by adding
       * a "=href": false property. You can also enable it to other attribute by
       * settings "=attName": true.
       *
       * The configuration supplied is map between a location (key) and an
       * element definition object (value) The location (key) is then exported
       * to the template under then htmlElements property in webpack
       * configuration.
       *
       * Example: Adding this plugin configuration new HtmlElementsPlugin({
       *    headTags: { ... }
       * })
       *
       * Means we can use it in the template like this:
       * <%= webpackConfig.htmlElements.headTags %>
       *
       * Dependencies: HtmlWebpackPlugin
       */
      new HtmlElementsPlugin({
        headTags: require('./head-config.common')
      }),


      // Fix Angular 2
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)async/,
        helpers.root('node_modules/@angular/core/src/facade/async.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)collection/,
        helpers.root('node_modules/@angular/core/src/facade/collection.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)errors/,
        helpers.root('node_modules/@angular/core/src/facade/errors.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)lang/,
        helpers.root('node_modules/@angular/core/src/facade/lang.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)math/,
        helpers.root('node_modules/@angular/core/src/facade/math.js')
      ),
    ],

    /*
     * Include polyfills or mocks for various node stuff Description: Node
     * configuration
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
  }
}

/*
* Webpack constants
*/
const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src')
]

const cssModuleExcludes = [
  /node_modules/,
  helpers.root('styles'),
  helpers.root('src'),
]
