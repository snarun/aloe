"use strict";
var Subject_1 = require("rxjs/Subject");
var AbstractObservableModel = (function () {
    function AbstractObservableModel() {
        this._subject = new Subject_1.Subject();
    }
    AbstractObservableModel.prototype.publish = function (result) {
        // ref: https://github.com/ReactiveX/RxJS/issues/1057
        // onNext -> next, onError -> error, onCompleted -> complete
        this._subject.next(result);
        //this.subject.complete(); TO BE VERIFIED - ARUN.
    };
    AbstractObservableModel.prototype.setService = function (service) {
        this.service = service;
    };
    AbstractObservableModel.prototype.$$nullHandler = function () {
        // do nothing;
    };
    AbstractObservableModel.prototype.onChange = function (onSuccess, onFailure, onComplete) {
        var _this = this;
        this.__subscription = this._subject.subscribe(function (data) {
            if ((data !== undefined) && (data !== null)) {
                return onSuccess(data);
            }
            else {
                return _this.$$nullHandler();
            }
        }, function (x) {
            return onFailure(x);
        }, function () {
            return onComplete();
        });
        return this.__subscription;
    };
    AbstractObservableModel.prototype.releaseHooks = function () {
        // Unsubscribe if there is any valid subscription.
        if (this.__subscription.closed === false) {
            this.__subscription.unsubscribe();
        }
    };
    return AbstractObservableModel;
}());
exports.AbstractObservableModel = AbstractObservableModel;
//# sourceMappingURL=app.store.model.js.map