/// <reference path="../../../typings/tsd.d.ts" />
export declare type DispatchToken = any;
/**
 * Class to handle dispatcher methods.  Every action is sent to all stores
 * via the callbacks the stores register with the dispatcher.
 *
 */
export declare class SysDispatcher<TPayLoad> {
    _callbacks: {
        [key: string]: (payload: TPayLoad) => void;
    };
    _isDispatching: boolean;
    _isHandled: {
        [key: string]: boolean;
    };
    _isPending: {
        [key: string]: boolean;
    };
    _lastID: number;
    _pendingPayLoad: TPayLoad;
    constructor();
    /**
     * Registers a callback to be invoked with every dispatched payload. Returns
     * a token that can be used with 'waitFor()'
     *
     * @param {TPayLoad} callback function associated
     * @returns {string}
     *
     * @memberOf SysDispatcher
     */
    register(callback: (payload: TPayLoad) => void): string;
    /**
      * Removes a callback based on its token.
      *
      * @param {DispatchToken} id
      *
      * @memberOf SysDispatcher
      */
    unregister(id: DispatchToken): void;
    /**
     * Waits for the callbacks specified to be invoked before continuing execution
     * of the current callback. This method should only be used by a callback in
     * response to a dispatched payload.     *
     * @param {Array<DispatchToken>} ids
     *
     * @memberOf SysDispatcher
     */
    waitFor(ids: Array<DispatchToken>): void;
    /**
     * Dispatches a payload to all registered callbacks
     *
     * @param {TPayLoad} payload
     *
     * @memberOf SysDispatcher
     */
    dispatch(payload: TPayLoad): void;
    /**
     * checks whether the dispatcher still dispatches
     *
     * @returns {boolean}
     *
     * @memberOf SysDispatcher
     */
    isDispatching(): boolean;
    /**
     * Call the callback stored with the given id.
     *
     * @param {DispatchToken} id
     *
     * @memberOf SysDispatcher
     */
    _invokeCallback(id: DispatchToken): void;
    /**
     * Keep a track of actions
     *
     * @param {TPayLoad} payload
     *
     * @memberOf SysDispatcher
     */
    _startDispatching(payload: TPayLoad): void;
    /**
     * Stops dispatching
     *
     *
     * @memberOf SysDispatcher
     */
    _stopDispatching(): void;
}
