
import { NgModuleFactory, NgModuleFactoryLoader, Compiler } from '@angular/core';
export declare class LoaderCallback {
    callback: any;
    /**
     * Creates an instance of LoaderCallback.
     *
     * @param {any} callback
     *
     * @memberOf LoaderCallback
     */
    constructor(callback: any);
}
/**
export  * Loads the container
export  *
export  * @param {Function} callback
export  * @returns
export  */
export declare let load: any;
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
export declare class AsyncNgModuleLoader implements NgModuleFactoryLoader {
    private compiler;
    /**
     * Creates an instance of AsyncNgModuleLoader.
     *
     * @param {Compiler} compiler
     *
     * @memberOf AsyncNgModuleLoader
     */
    constructor(compiler: Compiler);
    /**
     *
     *
     * @param {(string|LoaderCallback)} modulePath
     * @returns {Promise<NgModuleFactory<any>>}
     *
     * @memberOf AsyncNgModuleLoader
     */
    load(modulePath: string | LoaderCallback): Promise<NgModuleFactory<any>>;
}
