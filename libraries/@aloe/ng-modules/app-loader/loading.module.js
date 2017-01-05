"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var loading_container_1 = require("./loading.container");
/**
 * NgModule for Loading Indicator
 *
 * @export
 * @class LoadingModule
 */
var LoadingModule = LoadingModule_1 = (function () {
    function LoadingModule() {
    }
    LoadingModule.forRoot = function () {
        return {
            ngModule: LoadingModule_1
        };
    };
    return LoadingModule;
}());
LoadingModule = LoadingModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        declarations: [
            loading_container_1.LoadingContainer
        ],
        exports: [
            loading_container_1.LoadingContainer,
            common_1.CommonModule
        ]
    }),
    __metadata("design:paramtypes", [])
], LoadingModule);
exports.LoadingModule = LoadingModule;
var LoadingModule_1;
//# sourceMappingURL=loading.module.js.map