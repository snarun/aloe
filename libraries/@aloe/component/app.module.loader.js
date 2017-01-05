"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var LoaderCallback = (function () {
    /**
     * Creates an instance of LoaderCallback.
     *
     * @param {any} callback
     *
     * @memberOf LoaderCallback
     */
    function LoaderCallback(callback) {
        this.callback = callback;
    }
    return LoaderCallback;
}());
exports.LoaderCallback = LoaderCallback;
/**
export  * Loads the container
export  *
export  * @param {Function} callback
export  * @returns
export  */
exports.load = function (callback) {
    return new LoaderCallback(callback);
};
/**
 * NgModuleFactoryLoader that uses Promise to load NgModule type and then compiles them.
 * @experimental
 */
/**
 *
 *
 * @export
 * @class AsyncNgModuleLoader
 * @implements {NgModuleFactoryLoader}
 */
var AsyncNgModuleLoader = (function () {
    /**
     * Creates an instance of AsyncNgModuleLoader.
     *
     * @param {Compiler} compiler
     *
     * @memberOf AsyncNgModuleLoader
     */
    function AsyncNgModuleLoader(compiler) {
        this.compiler = compiler;
    }
    /**
     *
     *
     * @param {(string|LoaderCallback)} modulePath
     * @returns {Promise<NgModuleFactory<any>>}
     *
     * @memberOf AsyncNgModuleLoader
     */
    AsyncNgModuleLoader.prototype.load = function (modulePath) {
        var _this = this;
        if (modulePath instanceof LoaderCallback) {
            var loader = modulePath.callback();
            return Promise
                .resolve(loader)
                .then(function (type) { return checkNotEmpty(type, '', ''); })
                .then(function (type) { return _this.compiler.compileModuleAsync(type); });
        }
        return Promise.resolve(null);
    };
    return AsyncNgModuleLoader;
}());
AsyncNgModuleLoader = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Compiler])
], AsyncNgModuleLoader);
exports.AsyncNgModuleLoader = AsyncNgModuleLoader;
function checkNotEmpty(value, modulePath, exportName) {
    if (!value) {
        throw new Error("Cannot find '" + exportName + "' in '" + modulePath + "'");
    }
    return value;
}
//# sourceMappingURL=app.module.loader.js.map