"use strict";
var Rx_1 = require("rxjs/Rx");
var fn = require("../helpers/app.functions");
/**
 * Represents the state of the view.
 *
 * @export
 * @abstract
 * @class ViewState
 */
var ViewState = (function () {
    function ViewState() {
        this._state = {};
        this.subject = new Rx_1.BehaviorSubject({});
        this.viewlisteners$ = [];
    }
    /**
     * Sets the state.
     *
     * @protected
     * @param {*} props
     *
     * @memberOf ViewModel
     */
    ViewState.prototype.setState = function (props) {
        for (var key in props) {
            this._state[key] = props[key];
        }
        this.subject.next(this._state);
    };
    Object.defineProperty(ViewState.prototype, "stateChanges", {
        /**
         * Returns the current state tree of your application
         *
         * @readonly
         *
         * @memberOf ViewModel
         */
        get: function () {
            return this.subject;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Unbinds associated subscriptions
     *
     *
     * @memberOf ViewState
     */
    ViewState.prototype.unbind = function () {
        this.viewlisteners$.map(function (listener) {
            console.log("unbinding view listener..");
            listener.unsubscribe();
        });
    };
    ViewState.prototype.bindStateListeners = function (obj) {
        var _this = this;
        fn.eachObject(function (methodName, storeinstance) {
            var listener = _this[methodName];
            if (!listener) {
                throw new ReferenceError(methodName + " defined but does not exist in " + _this);
            }
            _this.bindStateAction(storeinstance, listener);
        }, [obj]);
    };
    ViewState.prototype.bindStateAction = function (storeinstance, handler) {
        var _this = this;
        if (!storeinstance) {
            throw new ReferenceError('Invalid action reference passed in');
        }
        if (!fn.isFunction(handler)) {
            throw new TypeError('bindAction expects a function');
        }
        this.viewlisteners$.push(storeinstance.listen(function () {
            handler.call(_this);
        }));
    };
    return ViewState;
}());
exports.ViewState = ViewState;
// /**
//  * An abstract method for handling store changed event. 
//  * View should get in touch with store for changed information.
//  * 
//  * @protected
//  * @abstract
//  * 
//  * @memberOf ViewState
//  */
// protected abstract OnStoreChanged(): void;
// if (this._vmtoken$)
//     this._vmtoken$();
// /**
//  * Creates an instance of ViewState.
//  * 
//  * @param {Store} store
//  * 
//  * @memberOf ViewState
//  */
// constructor(store: Store) {
//     this._store = store;
// } 
//# sourceMappingURL=app.view.state.js.map