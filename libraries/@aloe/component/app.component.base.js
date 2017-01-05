"use strict";
var Rx_1 = require("rxjs/Rx");
var moment;
moment = require('moment/min/moment-with-locales.min');
/**
 * @description: Base class for all components in the application.
 * @export
 * @abstract
 * @class ComponentBase
 */
var ComponentBase = (function () {
    /**
     * @param {*} stores
     * @param {boolean} val
     * @description creates an instance of the class
     *
     * @memberOf ComponentBase
     */
    function ComponentBase(viewState) {
        this.viewState = viewState;
        // define state template; 
        // All views should access state data through "state.changes.propertyname"  
        this._state = new Rx_1.BehaviorSubject({});
        this.dateHandler = moment;
        this.loading = true;
        this.subscribeEvents(viewState);
    }
    /**
     * Subscribe to View's state. On receiving the viewState changes, set them in component's state object
     * Updating the state object will cause Angular to re-render the component.
     *
     * @protected
     * @abstract
     * @param {ViewState} viewState
     *
     * @memberOf ComponentBase
     */
    ComponentBase.prototype.subscribeEvents = function (viewState) {
        var _this = this;
        // subscribe to state changes in view model.
        viewState.stateChanges.subscribe(function (x) {
            
            
            _this._state.next({
                changes: x
            });
        });
    };
    Object.defineProperty(ComponentBase.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    ComponentBase.prototype.ngOnDestroy = function () {
        // release viewState events
        this.viewState.unbind();
        // release derived class events, if any;
        this.disposeEvents();
    };
    /**
     * @description sets the loading. An object in standby state means, it is still not fully loaded yet.
     * @returns {void}
     *
     * @memberOf ComponentBase
     */
    ComponentBase.prototype.standby = function () {
        this.loading = true;
    };
    /**
     * @description sets the loading. An object in ready state means, it is loaded and lifted to DOM.
     * @returns {void}
     *
     * @memberOf ComponentBase
     */
    ComponentBase.prototype.ready = function () {
        this.loading = false;
    };
    return ComponentBase;
}());
exports.ComponentBase = ComponentBase;
//# sourceMappingURL=app.component.base.js.map