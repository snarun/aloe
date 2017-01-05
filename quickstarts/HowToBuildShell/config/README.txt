             _                  _   
 __ __ _____| |__ _ __  __ _ __| |__
 \ V  V / -_) '_ \ '_ \/ _` / _| / /
  \_/\_/\___|_.__/ .__/\__,_\__|_\_\
                 |_|                

Webpack is a module bundler that works great with most modern of front-end
workflows including Babel, ReactJS, CommonJS, among others. A coniguration file
in Webpack is basically a common.js module. The config file is a place to put
all your configuration, loaders and other specific information relating to your
build.

This folder holds the configuration details of Webpack, the bundling tool.

config/                      * application configuration
├── html-elements-plugin     * a webpack plugin to simplify the creation of html files for webpack bundles. 
│   └── index.js             *  configuration information for html-elements-plugin
├── head-config.common.js    * configuration for head elements added during the creation of html.
├── helpers.js               * helper functions for configuration files
├── webpack.common.js        * common information that are applicable for both production and development versions
├── webpack.dev.js           * development webpack config
└── webpack.prod.js          * production webpack config


 