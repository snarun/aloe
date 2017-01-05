
export declare abstract class BehaviorModel {
    private __id;
    private __serviceInstances;
    constructor();
    protected execute(service: any, context: any, callback: any): Promise<any>;
}
