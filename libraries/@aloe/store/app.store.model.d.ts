import { ISubscription } from "rxjs/Subscription";
import { ServiceBase } from "../services/app.service.base";
export declare abstract class ObservableModel {
    protected service: ServiceBase;
    private _subject;
    constructor();
    protected abstract onSuccess(): void;
    protected abstract onError(): void;
    protected abstract onComplete(): void;
    protected publish(result: any): void;
    protected __subscription: ISubscription;
    setService(service: ServiceBase): void;
    private $$nullHandler();
    onChange(onSuccess: any, onFailure: any, onComplete: any): ISubscription;
    releaseHooks(): void;
}
