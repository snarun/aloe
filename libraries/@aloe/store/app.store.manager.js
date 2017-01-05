"use strict";
/**
 * Manages store instances.
 *
 * @class AppStoreManager
 */
var AppStoreManager = (function () {
    function AppStoreManager() {
        this.__stores = [];
    }
    /**
     * Registers a store instance.
     *
     * @param {number} idx
     * @param {Store} store
     *
     * @memberOf AppStoreManager
     */
    AppStoreManager.prototype.register = function (idx, store) {
        if (store != undefined) {
            this.__stores.push({ "index": idx, "store": store });
        }
    };
    /**
     * Get the registered store instance from store.
     *
     * @param {number} idx
     * @returns {Store}
     *
     * @memberOf AppStoreManager
     */
    AppStoreManager.prototype.getStore = function (idx) {
        var result = $.grep(this.__stores, function (element, idx) {
            return element.index == idx;
        });
        return ((result != undefined) && (result.length == 1)) ? result[0].store : null;
    };
    return AppStoreManager;
}());
exports.AppStoreManager = AppStoreManager;
// Export the class
var StoreManager = new AppStoreManager();
exports.StoreManager = StoreManager;
//# sourceMappingURL=app.store.manager.js.map