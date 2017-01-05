
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { Http, CookieXSRFStrategy, Request, RequestOptions, Response } from '@angular/http';
import { AppCache } from "../cache/app.cache";
import { AppSettings } from "../app.settings";
import { Observable } from 'rxjs/Rx';
/**
 * An abstract definition for Service Class.
 *
 * @export
 * @abstract
 * @class ServiceBase
 */
export declare abstract class ServiceBase {
    protected appSettings: AppSettings;
    private __serviceHandle;
    protected http: Http;
    protected options: RequestOptions;
    protected cache: AppCache;
    /**
     * Sets Cache
     *
     * @param {AppCache} cache
     *
     * @memberOf ServiceBase
     */
    setCache(cache: AppCache): void;
    /**
     * Get cached Document
     *
     * @template T
     * @param {string} name
     * @returns {Promise<T>} Promise
     *
     * @memberOf ServiceBase
     */
    getCachedDocument<T>(name: string): Promise<T>;
    /**
     * Add document to cache.
     *
     * @param {string} key
     * @param {*} value
     *
     * @memberOf ServiceBase
     */
    addCache(key: string, value: any): void;
    /**
     * Stops the service.
     *
     *
     * @memberOf ServiceBase
     */
    stop(): void;
    /**
     * Runs Http Operation (POST, GET, PUT, DELETE etc.)
     *
     * @template T
     * @param {HttpOperation} operation
     * @param {string} url
     * @param {*} [payload]
     * @param {*} [options]
     * @returns {Observable<T>} Observable Object
     *
     * @memberOf ServiceBase
     */
    run<T>(operation: HttpOperation, url: string, payload?: any, options?: any): Observable<T>;
    /**
     * Http Post Operation
     *
     * @private
     * @template T
     * @param {string} url
     * @param {*} payload
     * @param {RequestOptions} options
     * @returns {Observable<T>} Observable Object
     *
     * @memberOf ServiceBase
     */
    private __httpPost<T>(url, payload, options);
    /**
     * Http Get Operation
     *
     * @private
     * @template T
     * @param {string} url
     * @param {*} payload
     * @returns {Observable<T>} Observable Object
     *
     * @memberOf ServiceBase
     */
    private __httpGet<T>(url, payload);
    /**
     * Http Put Operation
     *
     * @private
     * @template T
     * @param {string} url
     * @param {*} payload
     * @returns {Observable<T>} Observable Object
     *
     * @memberOf ServiceBase
     */
    private __httpPut<T>(url, payload);
    /**
     * Http Delete Operation
     *
     * @private
     * @template T
     * @param {string} url
     * @returns {Observable<T>} Observable Object
     *
     * @memberOf ServiceBase
     */
    private __httpDelete<T>(url);
    __httpPatch(url: string, payload: any): any;
    /**
     * Creates an instance of ServiceBase.
     * private appSettings: AppSettings
     *
     * @memberOf ServiceBase
     */
    constructor(appSettings?: AppSettings);
    /**
     * Extracts Data from response.
     *
     * @protected
     * @param {Response} res
     * @returns nothing
     *
     * @memberOf ServiceBase
     */
    protected extractData(res: Response): any;
    /**
     * Handle Error
     *
     * @protected
     * @param {*} error
     * @returns nothing
     *
     * @memberOf ServiceBase
     */
    protected handleError(error: any): ErrorObservable<any>;
}
/**
 * Http Operation
 *
 * @export
 * @enum {number}
 */
export declare enum HttpOperation {
    POST = 0,
    PUT = 1,
    GET = 2,
    DELETE = 3,
    PATCH = 4,
}
export declare class SPACookieXSRFStrategy extends CookieXSRFStrategy {
    private appSettings;
    private __cookieName;
    private __headerName;
    constructor(appSettings: AppSettings);
    configureRequest(req: Request): void;
}
