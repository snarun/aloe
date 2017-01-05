"use strict";
/**
 * Bridge to hook the service with cache.
 * @deprecated since version Angular 2.4.1
 * @export
 * @class ServiceBridge
 */
var ServiceBridge = (function () {
    function ServiceBridge() {
    }
    /**
     * Hook the Cache to the service.
     *
     * @static
     * @param {ServiceBase} instance [Service instance]
     * @param {AppCache} cacheInstance [Cache instance]
     * @returns {ServiceBase} [Service Base]
     *
     * @memberOf ServiceBridge
     */
    ServiceBridge.hook = function (instance, cacheInstance) {
        instance.setCache(cacheInstance);
        return instance;
    };
    return ServiceBridge;
}());
exports.ServiceBridge = ServiceBridge;
//# sourceMappingURL=app.service.bridge.js.map