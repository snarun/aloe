import { Type, Compiler, ViewContainerRef, ComponentRef, Injector } from '@angular/core';
import { Observable } from 'rxjs/Rx';
export declare class DialogService {
    private compiler;
    private vcRef;
    private injector;
    activeInstances: number;
    constructor(compiler: Compiler);
    registerViewContainerRef(vcRef: ViewContainerRef): void;
    registerInjector(injector: Injector): void;
    private revealHandler;
    registerRevealHandler(handler: string): void;
    private appContext;
    registerAppContextModule(appcontext: Type<{}>): void;
    create<T>(component: Type<T>, settings: Object, parameters?: Object): Observable<ComponentRef<T>>;
    setDialogSize(settings: any, mId: string): void;
}
