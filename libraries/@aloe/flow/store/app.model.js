"use strict";
var guid_1 = require("../../helpers/guid");
/**
 * An abstract base class for Client side domain models.
 *
 * @export
 * @abstract
 * @class Model
 */
var AbstractModel = (function () {
    function AbstractModel(service) {
        this.service = service;
        this.errorState = new ErrorState();
    }
    /**
     *
     *
     * @protected
     * @param {any} queryservice
     * @param {*} result
     * @returns {Promise<any>}
     *
     * @memberOf Model
     */
    AbstractModel.prototype.toPromise = function (queryservice, result) {
        var self = this;
        self.errorState.clear(); // clear error info before any operation.
        return new Promise(function (resolve, reject) {
            queryservice.call(self.service)
                .subscribe(function (value) {
                resolve(result(value));
            }, function (error) {
                self.errorState.setError(error);
                reject(result(self.errorState.getError()));
            }, function () {
                // operation completed
            });
        });
    };
    AbstractModel.prototype.getErrorInfo = function () {
        return this.errorState.getError();
    };
    return AbstractModel;
}());
exports.AbstractModel = AbstractModel;
/**
 * Defines an error state of the application.
 *
 * @export
 * @class ErrorState
 */
var ErrorState = (function () {
    function ErrorState() {
        this.id = guid_1.Guid.newGuid();
    }
    /**
     * Clears the error state
     *
     *
     * @memberOf ErrorState
     */
    ErrorState.prototype.clear = function () {
        this.info = '';
    };
    /**
     * Sets Error state.
     *
     * @param {string} info
     *
     * @memberOf ErrorState
     */
    ErrorState.prototype.setError = function (info) {
        this.info = info;
        // Log error remotely.
    };
    /**
     * Gets Error State
     *
     * @returns {*}
     *
     * @memberOf ErrorState
     */
    ErrorState.prototype.getError = function () {
        return {
            id: this.id,
            info: this.info
        };
    };
    return ErrorState;
}());
exports.ErrorState = ErrorState;
//# sourceMappingURL=app.model.js.map