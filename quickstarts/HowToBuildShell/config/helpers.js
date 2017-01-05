/**
 * Supporting files for webpack processing.
 */
var path = require('path');
const pkg = require('../package.json');
var _root = path.resolve(__dirname, '..');

/**
 * Check whether the process flag is associated
 *
 * @param {any} flag Accepts the flag information
 * @returns nothing
 */
function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

/**
 * Check whether the running instance is of webpackDevServer
 *
 * @returns true or false, based on instance.
 */
function isWebpackDevServer() {
  return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]));
}

/**
 * Get the root path of the application
 *
 * @param {any} args Accepts the relative path.
 * @returns fully qualified root
 */
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}
// Exports the functions.
exports.hasProcessFlag = hasProcessFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;

exports.APP_VERSION = JSON.stringify(pkg.version);
exports.APP_NAME = JSON.stringify(pkg.name);
