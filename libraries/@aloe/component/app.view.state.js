"use strict";
var Rx_1 = require("rxjs/Rx");
/**
 * Represents the state of the view.
 *
 * @export
 * @abstract
 * @class ViewState
 */
var ViewState = (function () {
    /**
     * Creates an instance of ViewState.
     *
     * @param {Store} store
     *
     * @memberOf ViewState
     */
    function ViewState(store) {
        this._state = {};
        this.subject = new Rx_1.BehaviorSubject({});
        this._store = store;
        this.bindStoreEvents();
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
    ViewState.prototype.bindStoreEvents = function () {
        var _this = this;
        this._vmtoken$ = this._store.subscribe(function () {
            _this.OnStoreChanged();
        });
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
        if (this._vmtoken$)
            this._vmtoken$();
    };
    return ViewState;
}());
exports.ViewState = ViewState;
//# sourceMappingURL=app.view.state.js.map