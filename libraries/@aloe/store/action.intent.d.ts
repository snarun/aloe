/**
 * An abstract class ActionIntents
 * ActionIntents is responsible for creating an ACtion, but also for passing the action
 * along to the Dispatcher.
 */
export declare abstract class ActionIntent {
    name: string;
    action: any;
    /**
     * Dispatches the paylod
     *
     * @param {*} payload
     *
     * @memberOf ActionIntent
     */
    dispatch(payload: any): void;
}
