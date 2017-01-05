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
var app_dialog_service_1 = require("./app.dialog.service");
var guid_1 = require("../../helpers/guid");
var DialogPlaceholderComponent = (function () {
    function DialogPlaceholderComponent(dialogService, injector) {
        this.dialogService = dialogService;
        this.injector = injector;
        this.id = guid_1.Guid.newGuid();
    }
    DialogPlaceholderComponent.prototype.ngOnInit = function () {
        this.dialogService.registerRevealHandler(this.id);
        if (this.context === undefined)
            throw new Error("Application context is not set for dialog placeholder. You should set this through property binding in template..");
        this.dialogService.registerAppContextModule(this.context);
        this.dialogService.registerViewContainerRef(this.viewContainerRef);
        this.dialogService.registerInjector(this.injector);
    };
    return DialogPlaceholderComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.Type)
], DialogPlaceholderComponent.prototype, "context", void 0);
__decorate([
    core_1.ViewChild("dialogContent", { read: core_1.ViewContainerRef }),
    __metadata("design:type", Object)
], DialogPlaceholderComponent.prototype, "viewContainerRef", void 0);
DialogPlaceholderComponent = __decorate([
    core_1.Component({
        selector: 'dialog-placeholder',
        template: "\n    <div class=\"reveal small\" id={{id}} data-reveal>\n        <content #dialogContent></content>  \n        <button class=\"alert small\" (click)=\"closeDialog($event)\" \n        *ngFor=\"let b of buttons; let i=index;\">{{b}}</button>  \n       </div>\n    "
    }),
    __metadata("design:paramtypes", [app_dialog_service_1.DialogService,
        core_1.Injector])
], DialogPlaceholderComponent);
exports.DialogPlaceholderComponent = DialogPlaceholderComponent;
// These 2 items will make sure that you can annotate a modalcomponent with @Modal()
var ModalContainer = (function () {
    function ModalContainer() {
    }
    ModalContainer.prototype.closeModal = function () {
        var id = '#' + $('.reveal').attr('id');
        $(id).foundation('close');
        $(id).foundation('destroy');
        $('.reveal-overlay').remove();
        this.destroy();
    };
    return ModalContainer;
}());
exports.ModalContainer = ModalContainer;
function Modal() {
    return function (target) {
        Object.assign(target.prototype, ModalContainer.prototype);
    };
}
exports.Modal = Modal;
//# sourceMappingURL=app.dialog.placeholder.js.map