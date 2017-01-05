import { Store } from './app.store';
/**
 * Manages store instances.
 *
 * @class AppStoreManager
 */
export declare class AppStoreManager {
    __stores: any[];
    /**
     * Registers a store instance.
     *
     * @param {number} idx
     * @param {Store} store
     *
     * @memberOf AppStoreManager
     */
    register(idx: number, store: Store): void;
    /**
     * Get the registered store instance from store.
     *
     * @param {number} idx
     * @returns {Store}
     *
     * @memberOf AppStoreManager
     */
    getStore(idx: number): Store;
}
declare let StoreManager: AppStoreManager;
export { StoreManager };
