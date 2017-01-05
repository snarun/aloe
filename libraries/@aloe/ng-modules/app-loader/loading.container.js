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
/**
 * Loading Container is an indicator placer that keeps running, while loading your component.
 * Helps in bringing more responsiveness to your work.
 * @export
 * @class LoadingContainer
 */
var LoadingContainer = (function () {
    function LoadingContainer() {
    }
    return LoadingContainer;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LoadingContainer.prototype, "loading", void 0);
LoadingContainer = __decorate([
    core_1.Component({
        selector: 'app-loading-container',
        template: "\n    <style>\n        .loader-inline{\n        /*margin: 0 0 2em;*/\n        margin:10px;\n        /*height: 100px;*/\n        /*width: 20%;*/\n        text-align: center;\n        /*padding: 1em;*/\n        /*margin: 0 auto 1em;*/\n        display: inline-block;\n        vertical-align: top;\n        /*width:100%;*/\n        text-align:center;\n        }\n        /*\n        Set the color of the icon\n        */\n        svg path,\n        svg rect{\n        fill: #FF6700;\n        }\n    </style>\n    <div [ngSwitch]=\"loading\">\n\t<div *ngSwitchCase=\"false\">\n\t    <ng-content></ng-content>\n        </div>\n\t<div *ngSwitchCase=\"true\" class=\"loader-inline\">\n        <svg version=\"1.1\" id=\"loader-1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n        width=\"25px\" height=\"25px\" viewBox=\"0 0 50 50\" style=\"enable-background:new 0 0 50 50;\" xml:space=\"preserve\">\n        <path fill=\"#000\" d=\"M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z\">\n        <animateTransform attributeType=\"xml\"\n        attributeName=\"transform\"\n        type=\"rotate\"\n        from=\"0 25 25\"\n        to=\"360 25 25\"\n        dur=\"0.6s\"\n        repeatCount=\"indefinite\"/>\n        </path>\n        </svg>\n    </div>\n    </div>"
    }),
    __metadata("design:paramtypes", [])
], LoadingContainer);
exports.LoadingContainer = LoadingContainer;
//# sourceMappingURL=loading.container.js.map