"use strict";
/**
 * This class is for generating the Guid objects.
 *
 * @export
 * @class Guid
 */
var Guid = (function () {
    function Guid() {
    }
    /**
     * Initializes a new instance of the Guid structure and returns an new Guid string.
     *
     * @static
     * @returns {string}
     *
     * @memberOf Guid
     */
    Guid.newGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return Guid;
}());
exports.Guid = Guid;
//# sourceMappingURL=guid.js.map