"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var http_1 = require("@angular/http");
var app_settings_1 = require("../app.settings");
var Rx_1 = require("rxjs/Rx");
/**
 * An abstract definition for Service Class.
 *
 * @export
 * @abstract
 * @class ServiceBase
 */
var ServiceBase = (function () {
    /**
     * Creates an instance of ServiceBase.
     * private appSettings: AppSettings
     *
     * @memberOf ServiceBase
     */
    function ServiceBase(appSettings) {
        this.appSettings = appSettings;
        if (this.appSettings === undefined)
            throw new Error("Application Settings is undefined. All services should inject application setting through constructor parameter.");
        var spacookiexsrf = new SPACookieXSRFStrategy(appSettings);
        var __http = core_1.ReflectiveInjector.resolveAndCreate([
            http_1.Http, http_1.BrowserXhr,
            { provide: http_1.ConnectionBackend, useClass: http_1.XHRBackend },
            { provide: http_1.ResponseOptions, useClass: http_1.BaseResponseOptions },
            { provide: http_1.XSRFStrategy, useValue: spacookiexsrf },
            { provide: http_1.RequestOptions, useClass: http_1.BaseRequestOptions }
        ]).get(http_1.Http);
        this.http = __http;
        // Set the Integrated Authentication. 
        this.options = new http_1.RequestOptions({
            withCredentials: true
        });
        
    }
    /**
     * Sets Cache
     *
     * @param {AppCache} cache
     *
     * @memberOf ServiceBase
     */
    ServiceBase.prototype.setCache = function (cache) {
        this.cache = cache;
    };
    /**
     * Get cached Document
     *
     * @template T
     * @param {string} name
     * @returns {Promise<T>} Promise
     *
     * @memberOf ServiceBase
     */
    ServiceBase.prototype.getCachedDocument = function (name) {
        return this.cache.get(name);
    };
    /**
     * Add document to cache.
     *
     * @param {string} key
     * @param {*} value
     *
     * @memberOf ServiceBase
     */
    ServiceBase.prototype.addCache = function (key, value) {
        this.cache.add(key, value);
    };
    /**
     * Stops the service.
     *
     *
     * @memberOf ServiceBase
     */
    ServiceBase.prototype.stop = function () {
        if (this.__serviceHandle) {
            if (this.__serviceHandle.closed === false) {
                this.__serviceHandle.unsubscribe();
            }
        }
    };
    /**
     * Runs Http Operation (POST, GET, PUT, DELETE etc.)
     *
     * @template T
     * @param {HttpOperation} operation
     * @param {string} url
     * @param {*} [payload]
     * @param {*} [options]
     * @returns {Observable<T>} Observable Object
     *
     * @memberOf ServiceBase
     */
    ServiceBase.prototype.run = function (operation, url, payload, options) {
        if (operation === HttpOperation.POST) {
            return this.__httpPost(url, payload, options);
        }
        else if (operation === HttpOperation.GET) {
            
            
            return this.__httpGet(url, payload);
        }
        else if (operation === HttpOperation.PUT) {
            return this.__httpPut(url, payload);
        }
        else if (operation === HttpOperation.PATCH) {
        }
        else if (operation === HttpOperation.DELETE) {
            return this.__httpDelete(url);
        }
    };
    /**
     * Http Post Operation
     *
     * @private
     * @template T
     * @param {string} url
     * @param {*} payload
     * @param {RequestOptions} options
     * @returns {Observable<T>} Observable Object
     *
     * @memberOf ServiceBase
     */
    ServiceBase.prototype.__httpPost = function (url, payload, options) {
        var _this = this;
        var _tempOptions;
        if (options) {
            options.withCredentials = true;
            _tempOptions = options;
        }
        else {
            _tempOptions = this.options;
        }
        var __observableResponse = this.http.post(url, payload, _tempOptions);
        this.__serviceHandle = __observableResponse.subscribe(function (x) {
            // handle the data as it comes in.
        }, function (e) {
            _this.stop();
            throw new Error("Error occured while posting the information");
        }, function () {
            
        });
        return __observableResponse.map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    /**
     * Http Get Operation
     *
     * @private
     * @template T
     * @param {string} url
     * @param {*} payload
     * @returns {Observable<T>} Observable Object
     *
     * @memberOf ServiceBase
     */
    ServiceBase.prototype.__httpGet = function (url, payload) {
        var _this = this;
        var __observableResponse = this.http.get(url, this.options); // ...using get request
        
        this.__serviceHandle = __observableResponse.subscribe(function (x) {
            // handle the data as it comes in.
        }, function (e) {
            _this.stop();
            throw new Error("Error occured while fetching the information");
        }, function () {
            
        });
        return __observableResponse
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    /**
     * Http Put Operation
     *
     * @private
     * @template T
     * @param {string} url
     * @param {*} payload
     * @returns {Observable<T>} Observable Object
     *
     * @memberOf ServiceBase
     */
    ServiceBase.prototype.__httpPut = function (url, payload) {
        var _this = this;
        var __observableResponse = this.http.put(url, payload, this.options); // ...using post request
        this.__serviceHandle = __observableResponse.subscribe(function (x) {
            // handle the data as it comes in.
        }, function (e) {
            _this.stop();
            throw new Error("Error occured while putting the information");
        }, function () {
            
        });
        return __observableResponse
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    /**
     * Http Delete Operation
     *
     * @private
     * @template T
     * @param {string} url
     * @returns {Observable<T>} Observable Object
     *
     * @memberOf ServiceBase
     */
    ServiceBase.prototype.__httpDelete = function (url) {
        var _this = this;
        var __observableResponse = this.http.delete(url, this.options); // ...using delete request
        this.__serviceHandle = __observableResponse.subscribe(function (x) {
            // handle the data as it comes in.
        }, function (e) {
            _this.stop();
            throw new Error("Error occured > http delete operation");
        }, function () {
            
        });
        return __observableResponse
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    ServiceBase.prototype.__httpPatch = function (url, payload) {
    };
    /**
     * Extracts Data from response.
     *
     * @protected
     * @param {Response} res
     * @returns nothing
     *
     * @memberOf ServiceBase
     */
    ServiceBase.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    /**
     * Handle Error
     *
     * @protected
     * @param {*} error
     * @returns nothing
     *
     * @memberOf ServiceBase
     */
    ServiceBase.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
         // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    return ServiceBase;
}());
ServiceBase = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject('app.settings')),
    __metadata("design:paramtypes", [app_settings_1.AppSettings])
], ServiceBase);
exports.ServiceBase = ServiceBase;
/**
 * Http Operation
 *
 * @export
 * @enum {number}
 */
var HttpOperation;
(function (HttpOperation) {
    HttpOperation[HttpOperation["POST"] = 0] = "POST";
    HttpOperation[HttpOperation["PUT"] = 1] = "PUT";
    HttpOperation[HttpOperation["GET"] = 2] = "GET";
    HttpOperation[HttpOperation["DELETE"] = 3] = "DELETE";
    HttpOperation[HttpOperation["PATCH"] = 4] = "PATCH";
})(HttpOperation = exports.HttpOperation || (exports.HttpOperation = {}));
var SPACookieXSRFStrategy = (function (_super) {
    __extends(SPACookieXSRFStrategy, _super);
    // Using @Inject while injecting any dependency inside a constructor
    function SPACookieXSRFStrategy(appSettings) {
        var _this = _super.call(this, appSettings.cookieName, appSettings.headerName) || this;
        _this.appSettings = appSettings;
        
        _this.__cookieName = appSettings.cookieName;
        _this.__headerName = appSettings.headerName;
        return _this;
    }
    SPACookieXSRFStrategy.prototype.configureRequest = function (req) {
    };
    return SPACookieXSRFStrategy;
}(http_1.CookieXSRFStrategy));
SPACookieXSRFStrategy = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [app_settings_1.AppSettings])
], SPACookieXSRFStrategy);
exports.SPACookieXSRFStrategy = SPACookieXSRFStrategy;
//# sourceMappingURL=app.service.base.js.map