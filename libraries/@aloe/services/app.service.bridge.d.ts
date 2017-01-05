import { AppCache } from "../cache/app.cache";
import { ServiceBase } from "./app.service.base";
/**
 * Bridge to hook the service with cache.
 * @deprecated since version Angular 2.4.1
 * @export
 * @class ServiceBridge
 */
export declare class ServiceBridge {
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
    static hook(instance: ServiceBase, cacheInstance: AppCache): ServiceBase;
}
