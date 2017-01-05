/// <reference path="../../../node_modules/rxjs/Rx.d.ts" />
import { Store } from "../store/app.store";
import { BehaviorSubject } from 'rxjs/Rx';
export declare type DefaultState = () => {};
export declare type State = DefaultState | {};
/**
 * Represents the state of the view.
 *
 * @export
 * @abstract
 * @class ViewState
 */
export declare abstract class ViewState {
    private _store;
    private _state;
    private subject;
    /**
     * Sets the state.
     *
     * @protected
     * @param {*} props
     *
     * @memberOf ViewModel
     */
    protected setState(props: any): void;
    /**
     * An abstract method for handling store changed event.
     * View should get in touch with store for changed information.
     *
     * @protected
     * @abstract
     *
     * @memberOf ViewState
     */
    protected abstract OnStoreChanged(): void;
    /**
     * Creates an instance of ViewState.
     *
     * @param {Store} store
     *
     * @memberOf ViewState
     */
    constructor(store: Store);
    private _vmtoken$;
    private bindStoreEvents();
    /**
     * Returns the current state tree of your application
     *
     * @readonly
     *
     * @memberOf ViewModel
     */
    readonly stateChanges: BehaviorSubject<State>;
    /**
     * Unbinds associated subscriptions
     *
     *
     * @memberOf ViewState
     */
    unbind(): void;
}
