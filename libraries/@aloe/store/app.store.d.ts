import { AppCache } from "../cache/app.cache";
import { Subject } from 'rxjs/Subject';
import { ServiceBase } from "../services/app.service.base";
import { AppSettings } from "../app.settings";
/**
 * An abstract definition of Store.
 *
 * @export
 * @abstract
 * @class Store
 */
export declare abstract class Store {
    protected appSettings: AppSettings;
    instance: any;
    handler: (parameter: any) => void;
    private __cache;
    protected cache: AppCache;
    private __name;
    protected storeInfo: Subject<any>;
    protected errorState: any;
    protected currentListeners: any;
    protected nextListeners: any;
    protected ensureCanMutateNextListeners(): void;
    protected bindActionHandlers(obj: any): void;
    private _actionListeners;
    private bindAction(symbol, handler);
    private bindActions(actions);
    /**
     * Creates an instance of Store.
     *
     * @param {string} name
     *
     * @memberOf Store
     */
    constructor(name: string, appSettings?: AppSettings);
    /**
     * Initialize and Register Cache Services
     *
     * @private
     *
     * @memberOf Store
     */
    private initializeAndRegisterCache();
    /**
     * Get Store type
     *
     * @protected
     * @abstract
     * @returns {number}
     *
     * @memberOf Store
     */
    protected abstract getStoreType(): number;
    __models: any[];
    private tokens$;
    private register();
    private serviceregistry;
    /**
     * Register Service to the registry
     *
     * @protected
     * @param {string} name
     * @param {ServiceBase} service
     *
     * @memberOf Store
     */
    protected registerService(name: string, service: ServiceBase): void;
    /**
     *
     *
     * @protected
     * @param {*} iClass
     * @param {string} servicename
     * @returns {*}
     *
     * @memberOf Store
     */
    protected oHook(iClass: any, servicename: string): any;
    subscribe(listener: any): () => void;
    private isDispatching;
    protected dispatch(): void;
}
