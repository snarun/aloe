/// <reference path="../../../node_modules/rxjs/Rx.d.ts" />
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
    protected bindStateListeners(obj: any): void;
    private viewlisteners$;
    private bindStateAction(storeinstance, handler);
}
