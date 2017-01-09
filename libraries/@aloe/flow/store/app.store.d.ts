import { AppCache } from "../../cache/app.cache";
import { Subject } from 'rxjs/Subject';
import { ServiceBase } from "../../services/app.service.base";
import { AppSettings } from "../../app.settings";
/**
 * An abstract definition of Store.
 *
 * @export
 * @abstract
 * @class Store
 */
export declare abstract class AbstractStore {
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
    /**
     * Ensures whether the listeners can be mutated.
     *
     * @protected
     *
     * @memberOf AbstractStore
     */
    protected ensureCanMutateNextListeners(): void;
    /**
     * Binds to those actions, where the store should respond to
     *
     * @protected
     * @param {any} obj
     *
     * @memberOf Store
     */
    protected bindActionListeners(obj: any): void;
    private _actionListeners;
    private bindAction(symbol, handler);
    private bindActions(actions);
    /**
     * An abstract method to bind the action listeners.
     *
     * @protected
     * @abstract
     *
     * @memberOf Store
     */
    protected abstract bind(): void;
    /**
     * Creates an instance of AbstractStore.
     *
     * @param {string} name
     * @param {AppSettings} [appSettings]
     *
     * @memberOf AbstractStore
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
    __models: any[];
    private tokens$;
    dispatchToken: any;
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
     * Hook listeners to the store.
     *
     * @param {any} listener
     * @returns
     *
     * @memberOf AbstractStore
     */
    listen(listener: any): () => void;
    private isDispatching;
    /**
     * Dispatches notifications to all listeners.
     *
     * @protected
     *
     * @memberOf AbstractStore
     */
    private dispatch();
    /**
     * Waits for the actions to be completed on given stores.
     *
     * @protected
     * @param {any} sources
     *
     * @memberOf AbstractStore
     */
    protected waitFor(...sources: any[]): void;
}
