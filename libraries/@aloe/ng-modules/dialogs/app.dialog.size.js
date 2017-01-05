"use strict";
/**
 * Defines Dialog Size
 *
 * @export
 * @enum {number}
 */
var DialogSize;
(function (DialogSize) {
    /**
     * SMALL DIALOG - Set the width to 40%
     */
    DialogSize[DialogSize["SMALL"] = 0] = "SMALL";
    /**
     * MEDIUM DIALOG - Set the width to 60%
     */
    DialogSize[DialogSize["MEDIUM"] = 1] = "MEDIUM";
    /**
     * LARGE DIALOG - Set the width to 70%
     */
    DialogSize[DialogSize["LARGE"] = 2] = "LARGE";
    /**
     * LARGEX10 Dialog - Set the width 10% more than LARGE dialog
     */
    DialogSize[DialogSize["LARGEX10"] = 3] = "LARGEX10";
    /**
     * LARGEX15 Dialog - Set the width 15% more than LARGE dialog
     */
    DialogSize[DialogSize["LARGEX15"] = 4] = "LARGEX15";
    /**
     * LARGEX20 Dialog - Set the width 20% more than LARGE dialog
     */
    DialogSize[DialogSize["LARGEX20"] = 5] = "LARGEX20";
    /**
     * FULL Dialog - Set the width and height to 100%
     */
    DialogSize[DialogSize["FULL"] = 6] = "FULL";
})(DialogSize = exports.DialogSize || (exports.DialogSize = {}));
//# sourceMappingURL=app.dialog.size.js.map