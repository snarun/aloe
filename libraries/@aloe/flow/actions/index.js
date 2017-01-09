"use strict";
var fn = require("../../helpers/app.functions");
var utils = require("../utils/aloeUtils");
function makeAction(aloe, namespace, name, implementation, obj) {
    var id = utils.uid(aloe._actionsRegistry, namespace + "." + name);
    aloe._actionsRegistry[id] = 1;
    var data = { id: id, namespace: namespace, name: name };
    var dispatch = function (payload) { return aloe.dispatch(id, payload, data); };
    var action = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var invocationResult = implementation.apply(obj, args);
        var actionResult = invocationResult;
        // async functions that return promises should not be dispatched
        if (invocationResult !== undefined && !fn.isPromise(invocationResult)) {
            if (fn.isFunction(invocationResult)) {
                // inner function result should be returned as an action result
                actionResult = invocationResult.dispatch(dispatch, aloe);
            }
            else {
                dispatch(invocationResult);
            }
        }
        if (invocationResult === undefined) {
            utils.warn("An action was called but nothing was dispatched");
        }
        return actionResult;
    };
    action["defer"] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return setTimeout(function () { return action.apply(null, args); });
    };
    action["id"] = id;
    action["data"] = data;
    // ensure each reference is unique in the namespace
    var container = aloe.actions[namespace];
    var namespaceId = utils.uid(container, name);
    container[namespaceId] = action;
    // generate a constant
    var constant = utils.formatAsConstant(namespaceId);
    container[constant] = id;
    return action;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeAction;
//# sourceMappingURL=index.js.map