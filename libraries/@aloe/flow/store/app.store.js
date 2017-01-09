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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var _1 = require("../");
var app_cache_1 = require("../../cache/app.cache");
var Subject_1 = require("rxjs/Subject");
var app_settings_1 = require("../../app.settings");
var fn = require("../../helpers/app.functions");
// export type DefaultStoreListener = () => {};
// export type StoreListener = DefaultStoreListener | {};
/**
 * An abstract definition of Store.
 *
 * @export
 * @abstract
 * @class Store
 */
var AbstractStore = (function () {
    /**
     * Creates an instance of AbstractStore.
     *
     * @param {string} name
     * @param {AppSettings} [appSettings]
     *
     * @memberOf AbstractStore
     */
    function AbstractStore(name, appSettings) {
        this.appSettings = appSettings;
        // holds instance variables.
        // Not to be used externally.
        this.instance = {};
        this.handler = function () { };
        // To make the store as Observable
        this.storeInfo = new Subject_1.Subject();
        this.errorState = [];
        this.currentListeners = [];
        this._actionListeners = [];
        this.__models = [];
        this.tokens$ = [];
        this.serviceregistry = [];
        this.isDispatching = false;
        this.__name = name;
        this.instance.__dispatcher = _1.aloeFlow.dispatcher; // Dispatcher;
        this.instance.__name = name;
        this.storeInfo = new Subject_1.Subject();
        this.nextListeners = this.currentListeners;
        // register store with aloe flow.
        _1.aloeFlow.stores[name] = this;
        this.register();
        // Store needs a physical cache to keep the stuff. Lets create it.
        this.initializeAndRegisterCache();
        this.bind();
    }
    /**
     * Ensures whether the listeners can be mutated.
     *
     * @protected
     *
     * @memberOf AbstractStore
     */
    AbstractStore.prototype.ensureCanMutateNextListeners = function () {
        if (this.nextListeners === this.currentListeners) {
            this.nextListeners = this.currentListeners.slice();
        }
    };
    /**
     * Binds to those actions, where the store should respond to
     *
     * @protected
     * @param {any} obj
     *
     * @memberOf Store
     */
    AbstractStore.prototype.bindActionListeners = function (obj) {
        var _this = this;
        fn.eachObject(function (methodName, symbol) {
            var listener = _this[methodName];
            if (!listener) {
                throw new ReferenceError(methodName + " defined but does not exist in " + _this.__name);
            }
            if (Array.isArray(symbol)) {
                symbol.forEach(function (action) {
                    _this.bindAction(action, listener);
                });
            }
            else {
                _this.bindAction(symbol, listener);
            }
        }, [obj]);
    };
    AbstractStore.prototype.bindAction = function (symbol, handler) {
        if (!symbol) {
            throw new ReferenceError('Invalid action reference passed in');
        }
        if (!fn.isFunction(handler)) {
            throw new TypeError('bindAction expects a function');
        }
        // You can pass in the constant or the function itself
        var key = symbol.id ? symbol.id : symbol;
        this._actionListeners[key] = this._actionListeners[key] || [];
        this._actionListeners[key].push(handler.bind(this));
        //this.boundListeners.push(key)
    };
    AbstractStore.prototype.bindActions = function (actions) {
        var _this = this;
        fn.eachObject(function (action, symbol) {
            var matchFirstCharacter = /./;
            var assumedEventHandler = action.replace(matchFirstCharacter, function (x) {
                return "on" + x[0].toUpperCase();
            });
            if (_this[action] && _this[assumedEventHandler]) {
                // If you have both action and onAction
                throw new ReferenceError("You have multiple action handlers bound to an action: " +
                    (action + " and " + assumedEventHandler));
            }
            var handler = _this[action] || _this[assumedEventHandler];
            if (handler) {
                _this.bindAction(symbol, handler);
            }
        }, [actions]);
    };
    /**
     * Initialize and Register Cache Services
     *
     * @private
     *
     * @memberOf Store
     */
    AbstractStore.prototype.initializeAndRegisterCache = function () {
        var appCache = new app_cache_1.AppCache();
        this.__cache = appCache.createStore(this.__name);
        this.cache = appCache;
    };
    AbstractStore.prototype.register = function () {
        var _this = this;
        this.dispatchToken = _1.aloeFlow.dispatcher.register(function (payload) {
            if (_this._actionListeners.hasOwnProperty(payload.type)) {
                _this._actionListeners[payload.type].map(function (m) {
                    //console.log("calling m ==> ", m);
                    m.call(_this, payload.data);
                    // notifies listeners.
                    _this.dispatch();
                });
            }
        });
    };
    /**
     * Register Service to the registry
     *
     * @protected
     * @param {string} name
     * @param {ServiceBase} service
     *
     * @memberOf Store
     */
    AbstractStore.prototype.registerService = function (name, service) {
        var isDuplicate = false;
        var value = { 'name': name, 'service': service };
        this.serviceregistry.forEach(function (element) {
            if (JSON.stringify(value) === JSON.stringify(element)) {
                isDuplicate = true;
                return false;
            }
        });
        if (!isDuplicate) {
            this.serviceregistry.push({ 'name': name, 'service': service });
        }
    };
    /**
     * Hook listeners to the store.
     *
     * @param {any} listener
     * @returns
     *
     * @memberOf AbstractStore
     */
    AbstractStore.prototype.listen = function (listener) {
        if (typeof listener !== 'function') {
            throw new Error("Expected listener to be a function");
        }
        var isSubscribed = true;
        this.ensureCanMutateNextListeners();
        this.nextListeners.push(listener);
        var self = this;
        return function unsubscribe() {
            if (!isSubscribed) {
                return;
            }
            isSubscribed = false;
            self.ensureCanMutateNextListeners();
            var index = self.nextListeners.indexOf(listener);
            self.nextListeners.splice(index, 1);
        };
    };
    /**
     * Dispatches notifications to all listeners.
     *
     * @protected
     *
     * @memberOf AbstractStore
     */
    AbstractStore.prototype.dispatch = function () {
        var listeners = this.currentListeners = this.nextListeners;
        listeners.map(function (listener) {
            listener();
        });
    };
    /**
     * Waits for the actions to be completed on given stores.
     *
     * @protected
     * @param {any} sources
     *
     * @memberOf AbstractStore
     */
    AbstractStore.prototype.waitFor = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        if (!sources.length) {
            throw new ReferenceError('Dispatch tokens not provided');
        }
        var sourcesArray = sources;
        if (sources.length === 1) {
            sourcesArray = Array.isArray(sources[0]) ? sources[0] : sources;
        }
        var _tokens = sourcesArray.map(function (source) {
            return source.dispatchToken || source;
        });
        _1.aloeFlow.dispatcher.waitFor(_tokens);
    };
    return AbstractStore;
}());
AbstractStore = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject('app.settings')),
    __metadata("design:paramtypes", [String, app_settings_1.AppSettings])
], AbstractStore);
exports.AbstractStore = AbstractStore;
// /**
//  * 
//  * 
//  * @protected
//  * @param {*} iClass
//  * @param {string} servicename
//  * @returns {*}
//  * 
//  * @memberOf Store
//  */
// protected oHook(iClass: any, servicename: string): any {
//     let service = this.serviceregistry.find((service: any) => {
//         return service.name === servicename;
//     }).service;
//     let oClass = new iClass();
//     oClass.service = service;
//     return oClass;
// }
//# sourceMappingURL=app.store.js.map