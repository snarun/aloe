"use strict";
/**
 * Application Cache
 *
 * @export
 * @class AppCache
 */
var AppCache = (function () {
    /**
     * Creates an instance of AppCache.
     *
     *
     * @memberOf AppCache
     */
    function AppCache() {
        var _this = this;
        /**
         * Add a document to the cache. In cache, all are treated as
         * documents irrespective of the object type.
         * @param {string} name [name of the document]
         * @param {any} document [any object that is to be cached]
         *
         * @memberOf AppCache
         */
        this.add = function (name, document) {
            var self = _this;
            return new Promise(function (resolve, reject) {
                self.store.upsert(name, function (doc) {
                    if (!doc.touched) {
                        doc.touched = true;
                        doc.title = document;
                        return doc;
                    }
                    return false; // don't update the document, its already touched.
                }).then(function (res) {
                    //release the lock with true
                    resolve(true);
                }).catch(function (err) {
                    // release the lock with false
                    reject(false);
                });
            });
        };
        /**
         * retrieves the document from cache, as per document name.
         * @param {string} name [name of the document]
         *
         *
         * @memberOf AppCache
         */
        this.get = function (name) {
            var self = _this;
            return new Promise(function (resolve, reject) {
                self.store.get(name).then(function (doc) {
                    resolve(doc);
                }).catch(function (err) {
                    resolve(undefined);
                });
            });
        };
        /**
         * Removes a specific document from the store based on the name given.
         * @param {string} name [name of the document]
         *
         *
         * @memberOf AppCache
         */
        this.remove = function (name) {
            _this.store.get(name).then(function (doc) {
                return this.store.remove(doc);
            }).then(function (result) {
                // handle result;
            }).catch(function (err) {
                
            });
        };
        this.pouch = require('pouchdb');
        this.pouch.plugin(require('pouchdb-upsert'));
    }
    /**
     * Creates a new instance of application cache.
     *
     * @param {string} store
     * @returns {*} instance of the application cache
     *
     * @memberOf AppCache
     */
    AppCache.prototype.createStore = function (store) {
        this.store = new this.pouch(store);
        if (!this.store.adapter) {
            this.store = new this.pouch(store);
        }
        return this.store;
    };
    /**
     * Gets the current instance of the application cache.
     *
     * @returns {*} the instance of the application cache
     *
     * @memberOf AppCache
     */
    AppCache.prototype.getStore = function () {
        return this.store;
    };
    /**
     * Destroys the store instance
     *
     * @returns {Promise<boolean>}
     *
     * @memberOf AppCache
     */
    AppCache.prototype.destroy = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            if (self.store) {
                self.store.destroy().then(function (response) {
                    resolve(true);
                }).catch(function (err) {
                    reject(false);
                });
            }
        });
    };
    return AppCache;
}());
exports.AppCache = AppCache;
//# sourceMappingURL=app.cache.js.map