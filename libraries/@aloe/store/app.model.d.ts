
import { ServiceBase } from "../services/app.service.base";
/**
 * An abstract base class for Client side domain models.
 *
 * @export
 * @abstract
 * @class Model
 */
export declare abstract class Model {
    private service;
    private errorState;
    constructor(service: ServiceBase);
    /**
     *
     *
     * @protected
     * @param {any} queryservice
     * @param {*} result
     * @returns {Promise<any>}
     *
     * @memberOf Model
     */
    protected toPromise(queryservice: any, result: any): Promise<any>;
    protected getErrorInfo(): any;
}
/**
 * Defines an error state of the application.
 *
 * @export
 * @class ErrorState
 */
export declare class ErrorState {
    private id;
    private info;
    constructor();
    /**
     * Clears the error state
     *
     *
     * @memberOf ErrorState
     */
    clear(): void;
    /**
     * Sets Error state.
     *
     * @param {string} info
     *
     * @memberOf ErrorState
     */
    setError(info: string): void;
    /**
     * Gets Error State
     *
     * @returns {*}
     *
     * @memberOf ErrorState
     */
    getError(): any;
}
