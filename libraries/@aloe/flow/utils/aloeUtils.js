"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var fn = require("../../helpers/app.functions");
/*eslint-disable*/
var builtIns = Object.getOwnPropertyNames(NoopClass);
var builtInProto = Object.getOwnPropertyNames(NoopClass.prototype);
/*eslint-enable*/
function getInternalMethods(Obj, isProto) {
    var excluded = isProto ? builtInProto : builtIns;
    var obj = isProto ? Obj.prototype : Obj;
    return Object.getOwnPropertyNames(obj).reduce(function (value, m) {
        if (excluded.indexOf(m) !== -1) {
            return value;
        }
        value[m] = obj[m];
        return value;
    }, {});
}
exports.getInternalMethods = getInternalMethods;
function getPrototypeChain(Obj, methods) {
    if (methods === void 0) { methods = {}; }
    return Obj === Function.prototype
        ? methods
        : getPrototypeChain(Object.getPrototypeOf(Obj), fn.assign(getInternalMethods(Obj, true), methods));
}
exports.getPrototypeChain = getPrototypeChain;
function warn(msg) {
    /* istanbul ignore else */
    /*eslint-disable*/
    if (typeof console !== 'undefined') {
        console.warn(new ReferenceError(msg));
    }
    /*eslint-enable*/
}
exports.warn = warn;
function uid(container, name) {
    var count = 0;
    var key = name;
    while (Object.hasOwnProperty.call(container, key)) {
        key = name + String(++count);
    }
    return key;
}
exports.uid = uid;
function formatAsConstant(name) {
    return name.replace(/[a-z]([A-Z])/g, function (i) {
        return i[0] + "_" + i[1].toLowerCase();
    }).toUpperCase();
}
exports.formatAsConstant = formatAsConstant;
function dispatchIdentity(x) {
    var a = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        a[_i - 1] = arguments[_i];
    }
    if (x === undefined)
        return null;
    return a.length ? [x].concat(a) : x;
}
exports.dispatchIdentity = dispatchIdentity;
function fsa(id, type, payload, details) {
    return {
        type: type,
        payload: payload,
        meta: __assign({ dispatchId: id }, details),
        id: id,
        action: type,
        data: payload,
        details: details,
    };
}
exports.fsa = fsa;
function dispatch(id, actionObj, payload, alt) {
    var data = actionObj.dispatch(payload);
    if (data === undefined)
        return null;
    var type = actionObj.id;
    var namespace = type;
    var name = type;
    var details = { id: type, namespace: namespace, name: name };
    var dispatchLater = function (x) { return alt.dispatch(type, x, details); };
    if (fn.isFunction(data))
        return data(dispatchLater, alt);
    // XXX standardize this
    return alt.dispatcher.dispatch(fsa(id, type, data, details));
}
exports.dispatch = dispatch;
/* istanbul ignore next */
function NoopClass() { }
//# sourceMappingURL=aloeUtils.js.map