"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//Dispatcher is used to broadcast payloads to registered callbacks.
var app_dispatcher_base_1 = require("./app.dispatcher.base");
/**
 * An Application specific dispatcher class derived from SysDispatcher.
 */
var AppDispatcher = (function (_super) {
    __extends(AppDispatcher, _super);
    function AppDispatcher() {
        return _super.apply(this, arguments) || this;
    }
    return AppDispatcher;
}(app_dispatcher_base_1.SysDispatcher));
exports.AppDispatcher = AppDispatcher;
exports.Dispatcher = new AppDispatcher();
//# sourceMappingURL=app.dispatcher.js.map