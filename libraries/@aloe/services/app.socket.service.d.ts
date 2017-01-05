import * as Rx from "rxjs/Rx";
/**
 * An abstract service for WebSocket service.
 *
 * @export
 * @class WebSocketService
 */
export declare class WebSocketService {
    private subject;
    /**
     * Connects to the remote location using the given URL
     *
     * @param {any} url
     * @returns {Rx.Subject<MessageEvent>}
     *
     * @memberOf WebSocketService
     */
    connect(url: any): Rx.Subject<MessageEvent>;
    private create(url);
}
