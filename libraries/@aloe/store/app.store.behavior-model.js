"use strict";
var guid_1 = require("../helpers/guid");
var BehaviorModel = (function () {
    function BehaviorModel() {
        this.__serviceInstances = [];
        this.__id = guid_1.Guid.newGuid();
    }
    // protected registerServiceMethods(service: ServiceType): void {
    //     this.__serviceInstances.push(service.getEntry());
    // };
    BehaviorModel.prototype.execute = function (service, context, callback) {
        var self = this;
        // get the service from registry.
        // var __service = this.__serviceInstances.filter(function (entry) {
        //     return entry.name === service; // Get only elements, which have service name.
        // }).shift()[0].instance;
        return new Promise(function (resolve, reject) {
            if (service) {
                service.call(context).subscribe(function (value) {
                    resolve(callback(value));
                }, function (error) {
                    reject(callback(error));
                }, function () {
                    // operation completed.
                });
            }
        });
    };
    return BehaviorModel;
}());
exports.BehaviorModel = BehaviorModel;
// export class ServiceType {
//     private name: string;
//     private classmethod: ServiceBase
//     constructor(name: string, instance: ServiceBase) {
//     }
//     public getEntry() {
//         return {
//             name: this.name,
//             classmethod: this.classmethod
//         }
//     }
// } 
//# sourceMappingURL=app.store.behavior-model.js.map