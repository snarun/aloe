/// <reference path="../../../typings/tsd.d.ts" />
import { ViewContainerRef, ComponentFactoryResolver, OnDestroy } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { ViewState, State } from "./app.view.state";
/**
 * @description: Base class for all components in the application.
 * @export
 * @abstract
 * @class ComponentBase
 */
export declare abstract class ComponentBase implements OnDestroy {
    protected viewState: ViewState;
    private _state;
    /**
     * Uses moment as date handlers.
     *
     * @type {*}
     * @memberOf ComponentBase
     */
    dateHandler: any;
    /**
     * @param {*} stores
     * @param {boolean} val
     * @description creates an instance of the class
     *
     * @memberOf ComponentBase
     */
    constructor(viewState: ViewState);
    /**
     * Subscribe to View's state. On receiving the viewState changes, set them in component's state object
     * Updating the state object will cause Angular to re-render the component.
     *
     * @protected
     * @abstract
     * @param {ViewState} viewState
     *
     * @memberOf ComponentBase
     */
    protected subscribeEvents(viewState: ViewState): void;
    readonly state: Observable<State>;
    /**
     * All event subscriptions should be unsubscribed here.
     *
     * @protected
     * @abstract
     *
     * @memberOf ComponentBase
     */
    protected abstract disposeEvents(): void;
    ngOnDestroy(): void;
    /**
     * @description holds a reference to the active view container associated to the component
     *
     * @type {ViewContainerRef}
     * @memberOf ComponentBase
     */
    viewContainerRef: ViewContainerRef;
    /**
     * @description holds a reference to the resolver associated to the component
     *
     * @type {ComponentFactoryResolver}
     * @memberOf ComponentBase
     */
    resolver: ComponentFactoryResolver;
    /**
     *
     * @description identifies the state of the object. i.e; whether it is loaded or still loading.
     * @type {boolean}
     * @memberOf ComponentBase
     */
    loading: boolean;
    /**
     * @description sets the loading. An object in standby state means, it is still not fully loaded yet.
     * @returns {void}
     *
     * @memberOf ComponentBase
     */
    standby(): void;
    /**
     * @description sets the loading. An object in ready state means, it is loaded and lifted to DOM.
     * @returns {void}
     *
     * @memberOf ComponentBase
     */
    ready(): void;
}
