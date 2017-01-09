import { AppDispatcher } from "./store/app.dispatcher";
export declare type AloeFlowConfiguration = {
    config;
    dispatcher;
    batchingFunction;
};
export declare class AbstractActions {
    constructor(...args: any[]);
    displayName: string;
    name: string;
    actions: any;
}
export declare class AloeFlow {
    _actionsRegistry: any;
    actions: any;
    stores: any;
    config: any;
    dispatcher: AppDispatcher;
    batchingFunction: any;
    constructor(config: AloeFlowConfiguration);
    dispatch(action: any, data: any, details: any): void;
    generateActions(...actionNames: any[]): {};
    createAction(name: any, implementation: any, obj: any): (...args: any[]) => any;
    createActions(ActionsClass: any, exportObj?: {}, ...argsForConstructor: any[]): {};
    addActions(name: any, ActionsClass: any, ...args: any[]): void;
    getActions(name: any): any;
    getStores(name: any): any;
}
export declare let aloeFlow: AloeFlow;
