export declare function getInternalMethods(Obj: any, isProto: any): {};
export declare function getPrototypeChain(Obj: any, methods?: {}): any;
export declare function warn(msg: any): void;
export declare function uid(container: any, name: any): any;
export declare function formatAsConstant(name: any): any;
export declare function dispatchIdentity(x: any, ...a: any[]): any;
export declare function fsa(id: any, type: any, payload: any, details: any): {
    type: any;
    payload: any;
    meta: any;
    id: any;
    action: any;
    data: any;
    details: any;
};
export declare function dispatch(id: any, actionObj: any, payload: any, alt: any): any;
