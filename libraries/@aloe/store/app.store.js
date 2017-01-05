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
var app_dispatcher_1 = require("./app.dispatcher");
var app_store_manager_1 = require("./app.store.manager");
var app_cache_1 = require("../cache/app.cache");
var Subject_1 = require("rxjs/Subject");
var app_settings_1 = require("../app.settings");
var fn = require("./app.functions");
// export type DefaultStoreListener = () => {};
// export type StoreListener = DefaultStoreListener | {};
/**
 * An abstract definition of Store.
 *
 * @export
 * @abstract
 * @class Store
 */
var Store = (function () {
    /**
     * Creates an instance of Store.
     *
     * @param {string} name
     *
     * @memberOf Store
     */
    function Store(name, appSettings) {
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
        this.instance.__dispatcher = app_dispatcher_1.Dispatcher;
        this.instance.__name = name;
        this.storeInfo = new Subject_1.Subject();
        this.nextListeners = this.currentListeners;
        // lets register the store with the manager;
        app_store_manager_1.StoreManager.register(this.getStoreType(), this);
        this.register();
        // Store needs a physical cache to keep the stuff. Lets create it.
        this.initializeAndRegisterCache();
    }
    Store.prototype.ensureCanMutateNextListeners = function () {
        if (this.nextListeners === this.currentListeners) {
            this.nextListeners = this.currentListeners.slice();
        }
    };
    Store.prototype.bindActionHandlers = function (obj) {
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
    Store.prototype.bindAction = function (symbol, handler) {
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
    Store.prototype.bindActions = function (actions) {
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
    Store.prototype.initializeAndRegisterCache = function () {
        var appCache = new app_cache_1.AppCache();
        this.__cache = appCache.createStore(this.__name);
        this.cache = appCache;
    };
    Store.prototype.register = function () {
        // let initialDataLoadToken = Dispatcher.register((payload: any) => {
        //     if (payload.type === ReferenceActionTypes.LOAD_INITIAL_DATA) {
        //         this.loadInitialData(payload.data);
        //     }
        // });
        var _this = this;
        // this.tokens$.push(Dispatcher.register((payload:any)=>{
        // }))
        
        this.tokens$.push(app_dispatcher_1.Dispatcher.register(function (payload) {
            if (_this._actionListeners.hasOwnProperty(payload.type)) {
                _this._actionListeners[payload.type].map(function (m) {
                    //Dispatcher.waitFor(this.tokens$);
                    
                    
                    m.call(_this, payload.data);
                });
            }
        }));
        // Dispatcher.register(this.handler = (payload: any) => {
        //     if (this._actionListeners.hasOwnProperty(payload.type)) {
        //         this._actionListeners[payload.type].map(m => {
        //             
        //             m.call(this, payload.data);
        //         })
        //     }
        // })
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
    Store.prototype.registerService = function (name, service) {
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
     *
     *
     * @protected
     * @param {*} iClass
     * @param {string} servicename
     * @returns {*}
     *
     * @memberOf Store
     */
    Store.prototype.oHook = function (iClass, servicename) {
        var service = this.serviceregistry.find(function (service) {
            return service.name === servicename;
        }).service;
        var oClass = new iClass();
        oClass.service = service;
        return oClass;
    };
    // /**
    //  * Registers cache to the services
    //  * 
    //  * @protected
    //  * @abstract
    //  * @param {AppCache} cache
    //  * 
    //  * @memberOf Store
    //  */
    // protected abstract registerCacheToServices(cache: AppCache): void;
    Store.prototype.subscribe = function (listener) {
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
    Store.prototype.dispatch = function () {
        var listeners = this.currentListeners = this.nextListeners;
        listeners.map(function (listener) {
            listener();
        });
    };
    return Store;
}());
Store = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject('app.settings')),
    __metadata("design:paramtypes", [String, app_settings_1.AppSettings])
], Store);
exports.Store = Store;
//# sourceMappingURL=app.store.js.map