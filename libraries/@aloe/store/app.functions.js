"use strict";
exports.isFunction = function (x) { return typeof x === 'function'; };
/**
 * Verifies whether the object is mutable.
 *
 * @export
 * @param {any} target
 * @returns target
 */
function isMutableObject(target) {
    var Ctor = target.constructor;
    return (!!target
        &&
            Object.prototype.toString.call(target) === '[object Object]'
        &&
            exports.isFunction(Ctor)
        &&
            !Object.isFrozen(target)
        &&
            (Ctor instanceof Ctor || target.type === 'AltStore'));
}
exports.isMutableObject = isMutableObject;
/**
 * Iterates through the object array
 *
 * @export
 * @param {any} f
 * @param {any} o
 */
function eachObject(f, o) {
    o.forEach(function (from) {
        Object.keys(Object(from)).forEach(function (key) {
            f(key, from[key]);
        });
    });
}
exports.eachObject = eachObject;
/**
 * Assigns, source to targets
 *
 * @export
 * @param {any} target
 * @param {any} source
 * @returns target
 */
function assign(target) {
    var source = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        source[_i - 1] = arguments[_i];
    }
    eachObject(function (key, value) { return target[key] = value; }, source);
    return target;
}
exports.assign = assign;
//# sourceMappingURL=app.functions.js.map