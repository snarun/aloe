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
var Rx_1 = require("rxjs/Rx");
var app_dialog_size_1 = require("./app.dialog.size");
var DialogService = (function () {
    function DialogService(compiler) {
        this.compiler = compiler;
        // we can use this to determine z-index of multiple modals
        this.activeInstances = 0;
    }
    DialogService.prototype.registerViewContainerRef = function (vcRef) {
        this.vcRef = vcRef;
    };
    DialogService.prototype.registerInjector = function (injector) {
        this.injector = injector;
    };
    DialogService.prototype.registerRevealHandler = function (handler) {
        this.revealHandler = handler;
    };
    DialogService.prototype.registerAppContextModule = function (appcontext) {
        this.appContext = appcontext;
        
    };
    // Create<t>(component: Type<t>, parameters?: Object, module: Type<{}> = AppModule): Observable<componentref<t>>
    //module: any, 
    DialogService.prototype.create = function (component, settings, parameters) {
        var _this = this;
        // we return a stream so we can  access the componentref
        var componentRef$ = new Rx_1.ReplaySubject();
        // compile the component based on its type and create a component factory
        this.compiler.compileModuleAndAllComponentsAsync(this.appContext)
            .then(function (factory) {
            // look for the componentfactory in the modulefactory
            var componentFactory = factory.componentFactories.filter(function (item) { return item.componentType === component; })[0];
            // the injector will be needed for DI in the custom component
            var childInjector = core_1.ReflectiveInjector.resolveAndCreate([], _this.injector);
            // create the actual component
            var componentRef = _this.vcRef.createComponent(componentFactory, 0, childInjector);
            // pass the @Input parameters to the instance
            Object.assign(componentRef.instance, parameters);
            _this.activeInstances++;
            // add a destroy method to the modal instance
            componentRef.instance["destroy"] = function () {
                _this.activeInstances--;
                // this will destroy the component
                componentRef.destroy();
            };
            // the component is rendered into the ViewContainerRef, so we can update and complete the stream
            componentRef$.next(componentRef);
            componentRef$.complete();
            // Inject Foundation aspects
            var __reveal;
            var id = '#' + _this.revealHandler;
            _this.setDialogSize(settings, id);
            $(document).foundation();
            
            
            setTimeout(function () {
                var $instance = new Foundation.Reveal($(id), {
                    closeOnEsc: false,
                    closeOnClick: false
                });
                $instance.open();
                //set the dialog size.
                //self.__$$resolvedContainer.instance.dialogSize = options.dialogSize;
            }, 15);
            
        });
        return componentRef$;
    };
    DialogService.prototype.setDialogSize = function (settings, mId) {
        var _modal = $(mId);
        _modal.removeClass();
        _modal.addClass("reveal");
        switch (settings.dialogSize) {
            case app_dialog_size_1.DialogSize.SMALL:
                _modal.addClass("tiny");
                break;
            case app_dialog_size_1.DialogSize.MEDIUM:
                _modal.addClass("medium");
                break;
            case app_dialog_size_1.DialogSize.LARGE:
                _modal.addClass("large");
                break;
            case app_dialog_size_1.DialogSize.LARGEX10:
                _modal.addClass("largex10");
                break;
            case app_dialog_size_1.DialogSize.LARGEX15:
                _modal.addClass("largex15");
                break;
            case app_dialog_size_1.DialogSize.LARGEX20:
                _modal.addClass("largex20");
                break;
            case app_dialog_size_1.DialogSize.FULL:
                _modal.addClass("full");
                break;
        }
    };
    return DialogService;
}());
DialogService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Compiler])
], DialogService);
exports.DialogService = DialogService;
//# sourceMappingURL=app.dialog.service.js.map