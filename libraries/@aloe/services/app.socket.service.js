"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Rx = require("rxjs/Rx");
// Socket should listen to a service and a port.
// const CHAT_URL = 'ws://localhost:3005';
/**
 * An abstract service for WebSocket service.
 *
 * @export
 * @class WebSocketService
 */
var WebSocketService = (function () {
    function WebSocketService() {
    }
    /**
     * Connects to the remote location using the given URL
     *
     * @param {any} url
     * @returns {Rx.Subject<MessageEvent>}
     *
     * @memberOf WebSocketService
     */
    WebSocketService.prototype.connect = function (url) {
        if (!this.subject) {
            this.subject = this.create(url);
        }
        return this.subject;
    };
    // Observable using RxJs
    WebSocketService.prototype.create = function (url) {
        var ws = new WebSocket(url);
        var observable = Rx.Observable.create(function (obs) {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
        });
        var observer = {
            next: function (data) {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        };
        return Rx.Subject.create(observer, observable);
    };
    return WebSocketService;
}());
WebSocketService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], WebSocketService);
exports.WebSocketService = WebSocketService;
//# sourceMappingURL=app.socket.service.js.map