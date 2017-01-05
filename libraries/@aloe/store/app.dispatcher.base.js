/**
 * The implementation is based on Facebook's Flux archtiecture pattern.
 * Dependencies and Cascading updates are often a problem in a scaling
 * MVC application and is a challenge. Unidirectional workflow is an
 * answer to it by inverting the control to stores.
 *
 * The dispatcher is the central hub that manages all data flow in the
 * application. It is a registry of callbacks into the stores and has no
 * intelligence of its own. Instead it just distributes actions to the stores.
 * Each store registers itself and provides a callback. When an action creator
 * provides the dispatcher with a new action, all stores in the application
 * receive the action via the callbacks in the registry.
 *
 * When a user interacts with an Angular view, the view propagates an
 * action through a central dispatcher, to the various stores that holds
 * the application's data and business logic, which updates all of the views
 * that are affected. This works especially well with Angular code, which
 * allows the store to send updates without specifying how to transition
 * views between states.
 *
 */
///<reference path="../../typings/tsd.d.ts"/> 
"use strict";
//declare function require(name: string);
var _prefix = "ID_";
var invariant;
invariant = require('invariant');
/**
 * Class to handle dispatcher methods.  Every action is sent to all stores
 * via the callbacks the stores register with the dispatcher.
 *
 */
var SysDispatcher = (function () {
    //{[key: DispatchToken]: (payload: TPayload) => void};
    /// initialize all the private variables.
    function SysDispatcher() {
        this._callbacks = {};
        this._isDispatching = false;
        this._isHandled = {};
        this._isPending = {};
        this._lastID = 1;
    }
    /**
     * Registers a callback to be invoked with every dispatched payload. Returns
     * a token that can be used with 'waitFor()'
     *
     * @param {TPayLoad} callback function associated
     * @returns {string}
     *
     * @memberOf SysDispatcher
     */
    SysDispatcher.prototype.register = function (callback) {
        invariant(!this._isDispatching, 'Dispatcher.registered(...): Cannot register in the middle of a dispatch');
        var id = _prefix + this._lastID++;
        this._callbacks[id] = callback;
        return id;
    };
    /**
      * Removes a callback based on its token.
      *
      * @param {DispatchToken} id
      *
      * @memberOf SysDispatcher
      */
    SysDispatcher.prototype.unregister = function (id) {
        invariant(!this._isDispatching, 'Dispatcher.unregister(...): Cannot unregister in the middle of a dispatch');
        invariant(this._callbacks[id], 'Dispatcher.unregister(...): "%s" does not map to a registered callback.', id);
        delete this._callbacks[id];
    };
    /**
     * Waits for the callbacks specified to be invoked before continuing execution
     * of the current callback. This method should only be used by a callback in
     * response to a dispatched payload.     *
     * @param {Array<DispatchToken>} ids
     *
     * @memberOf SysDispatcher
     */
    SysDispatcher.prototype.waitFor = function (ids) {
        // uses the invariant, to provide descriptive errors in development but
        // generic errors in production.
        invariant(this._isDispatching, 'Dispatcher.waitFor(...): Must be invoked while dispatching');
        for (var j = 0; j < ids.length; j++) {
            var id = ids[j];
            if (this._isPending[id]) {
                invariant(this._isHandled[id], 'Dispatcher.waitFor(...): Circular dependency detected while ' +
                    'waiting for "%s" .', id);
                continue;
            }
            invariant(this._callbacks[id], 'Dispatcher.waitFor(...): "%s" does not map to a registered callback.', id);
            this._invokeCallback(id);
        }
    };
    /**
     * Dispatches a payload to all registered callbacks
     *
     * @param {TPayLoad} payload
     *
     * @memberOf SysDispatcher
     */
    SysDispatcher.prototype.dispatch = function (payload) {
        //
        // throw error when a dispatch is already in progress.
        invariant(!this._isDispatching, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.');
        this._startDispatching(payload);
        try {
            for (var id in this._callbacks) {
                if (this._isPending[id]) {
                    continue;
                }
                this._invokeCallback(id);
            }
        }
        finally {
            this._stopDispatching();
        }
    };
    /**
     * checks whether the dispatcher still dispatches
     *
     * @returns {boolean}
     *
     * @memberOf SysDispatcher
     */
    SysDispatcher.prototype.isDispatching = function () {
        return this._isDispatching;
    };
    /**
     * Call the callback stored with the given id.
     *
     * @param {DispatchToken} id
     *
     * @memberOf SysDispatcher
     */
    SysDispatcher.prototype._invokeCallback = function (id) {
        this._isPending[id] = true;
        this._callbacks[id](this._pendingPayLoad);
        this._isHandled[id] = true;
    };
    /**
     * Keep a track of actions
     *
     * @param {TPayLoad} payload
     *
     * @memberOf SysDispatcher
     */
    SysDispatcher.prototype._startDispatching = function (payload) {
        for (var id in this._callbacks) {
            this._isPending[id] = false;
            this._isHandled[id] = false;
        }
        this._pendingPayLoad = payload;
        this._isDispatching = true;
    };
    /**
     * Stops dispatching
     *
     *
     * @memberOf SysDispatcher
     */
    SysDispatcher.prototype._stopDispatching = function () {
        delete this._pendingPayLoad;
        this._isDispatching = false;
    };
    return SysDispatcher;
}());
exports.SysDispatcher = SysDispatcher;
//# sourceMappingURL=app.dispatcher.base.js.map