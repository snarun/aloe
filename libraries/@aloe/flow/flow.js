"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app_dispatcher_1 = require("./store/app.dispatcher");
var fn = require("../helpers/app.functions");
var utils = require("./utils/aloeUtils");
var actions_1 = require("./actions");
var AbstractActions = (function () {
    function AbstractActions() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    }
    return AbstractActions;
}());
exports.AbstractActions = AbstractActions;
var AloeFlow = (function () {
    function AloeFlow(config) {
        this.config = config.config !== undefined ? config.config : {};
        this._actionsRegistry = {};
        this.actions = { global: {} };
        this.stores = {};
        this.dispatcher = config.dispatcher !== undefined ? config.dispatcher : new app_dispatcher_1.AppDispatcher();
        this.batchingFunction = config.batchingFunction !== undefined ? config.batchingFunction : (function (callback) { return callback(); });
    }
    AloeFlow.prototype.dispatch = function (action, data, details) {
        var _this = this;
        this.batchingFunction(function () {
            var id = Math.random().toString(18).substr(2, 16);
            // support straight dispatching of FSA-style actions
            if (action.hasOwnProperty('type') && action.hasOwnProperty('payload')) {
                var fsaDetails = {
                    id: action.type,
                    namespace: action.type,
                    name: action.type
                };
                return _this.dispatcher.dispatch(utils.fsa(id, action.type, action.payload, fsaDetails));
            }
            if (action.id && action.dispatch) {
                return utils.dispatch(id, action, data, _this);
            }
            return _this.dispatcher.dispatch(utils.fsa(id, action, data, details));
        });
    };
    AloeFlow.prototype.generateActions = function () {
        var actionNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actionNames[_i] = arguments[_i];
        }
        var actions = { name: 'global' };
        return this.createActions(actionNames.reduce(function (obj, action) {
            obj[action] = utils.dispatchIdentity;
            return obj;
        }, actions));
    };
    AloeFlow.prototype.createAction = function (name, implementation, obj) {
        return actions_1.default(this, 'global', name, implementation, obj);
    };
    AloeFlow.prototype.createActions = function (ActionsClass, exportObj) {
        var _this = this;
        if (exportObj === void 0) { exportObj = {}; }
        var argsForConstructor = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            argsForConstructor[_i - 2] = arguments[_i];
        }
        var actions = {};
        var key = utils.uid(this._actionsRegistry, ActionsClass.displayName || ActionsClass.name || 'Unknown');
        if (fn.isFunction(ActionsClass)) {
            fn.assign(actions, utils.getPrototypeChain(ActionsClass));
            var ActionsGenerator = (function (_super) {
                __extends(ActionsGenerator, _super);
                function ActionsGenerator() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return _super.apply(this, args) || this;
                }
                ActionsGenerator.prototype.generateActions = function () {
                    var actionNames = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        actionNames[_i] = arguments[_i];
                    }
                    actionNames.forEach(function (actionName) {
                        actions[actionName] = utils.dispatchIdentity;
                    });
                };
                return ActionsGenerator;
            }(AbstractActions));
            fn.assign(actions, new (ActionsGenerator.bind.apply(ActionsGenerator, [void 0].concat(argsForConstructor)))());
        }
        else {
            fn.assign(actions, ActionsClass);
        }
        this.actions[key] = this.actions[key] || {};
        fn.eachObject(function (actionName, action) {
            if (!fn.isFunction(action)) {
                exportObj[actionName] = action;
                return;
            }
            // create the action
            exportObj[actionName] = actions_1.default(_this, key, actionName, action, exportObj);
            // generate a constant
            var constant = utils.formatAsConstant(actionName);
            exportObj[constant] = exportObj[actionName].id;
        }, [actions]);
        return exportObj;
    };
    AloeFlow.prototype.addActions = function (name, ActionsClass) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.actions[name] = Array.isArray(ActionsClass)
            ? this.generateActions.apply(this, ActionsClass)
            : this.createActions.apply(this, [ActionsClass, undefined].concat(args));
    };
    AloeFlow.prototype.getActions = function (name) {
        return this.actions[name];
    };
    AloeFlow.prototype.getStores = function (name) {
        return this.stores[name];
    };
    return AloeFlow;
}());
exports.AloeFlow = AloeFlow;
var config = {
    config: {},
    dispatcher: new app_dispatcher_1.AppDispatcher(),
    batchingFunction: (function (callback) { return callback(); })
};
exports.aloeFlow = new AloeFlow(config);
//export default AloeFlow;
// export class ActionsClass implements IActionsClass {
//     displayName: string;
//     name: string; 
// }
// export interface IActionsClass {
//     displayName: string,
//     name: string
// } 
//# sourceMappingURL=flow.js.map