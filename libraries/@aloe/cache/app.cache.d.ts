
/**
 * Application Cache
 *
 * @export
 * @class AppCache
 */
export declare class AppCache {
    store: any;
    pouch: any;
    /**
     * Creates an instance of AppCache.
     *
     *
     * @memberOf AppCache
     */
    constructor();
    /**
     * Creates a new instance of application cache.
     *
     * @param {string} store
     * @returns {*} instance of the application cache
     *
     * @memberOf AppCache
     */
    createStore(store: string): any;
    /**
     * Gets the current instance of the application cache.
     *
     * @returns {*} the instance of the application cache
     *
     * @memberOf AppCache
     */
    getStore(): any;
    /**
     * Destroys the store instance
     *
     * @returns {Promise<boolean>}
     *
     * @memberOf AppCache
     */
    destroy(): Promise<boolean>;
    /**
     * Add a document to the cache. In cache, all are treated as
     * documents irrespective of the object type.
     * @param {string} name [name of the document]
     * @param {any} document [any object that is to be cached]
     *
     * @memberOf AppCache
     */
    add: (name: string, document: any) => Promise<boolean>;
    /**
     * retrieves the document from cache, as per document name.
     * @param {string} name [name of the document]
     *
     *
     * @memberOf AppCache
     */
    get: (name: string) => Promise<any>;
    /**
     * Removes a specific document from the store based on the name given.
     * @param {string} name [name of the document]
     *
     *
     * @memberOf AppCache
     */
    remove: (name: string) => void;
}
