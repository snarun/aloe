/**
 * FLAG: SHOULD NOT MODIFY 
 * Base Framework - Single Page Applications (SPA) - Services and Offline Cache
 * Angular JS 1.4.8 / Ver 2.0 / Oct 2016 / author: sna.arun@gmail.com  
 * 
 * This software is released as part of building composite applications using web based technologies with Angular JS 1.4.8 and is flagged as "SHOULD NOT MODIFY".
 * Permission is hereby granted, to any person obtaining a copy of this software to use, publish and distribute or redistribute, subject to the following conditions:
 * a) Code change / modification is not allowed, unless you know what you are doing.
 * b) The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED  "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

'use strict';
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.HttpService = factory(root);
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {
    var HttpService = {};
    var pouchdb = require('pouchdb');
    console.log(pouchdb);
    var getCache = HttpService.getCache = function (store) {
            // Creates the database or opens if it already exists
            var _db = '';
            try {
                _db = new pouchdb(store, {
                    adapter: 'websql'
                });
            } catch (exception) {
                console.log(exception);
                _db = new pouchdb(store);
            }
            return _db;
        }
        // HTTP Service GET operation
    var get = HttpService.get = function (options) {
        if (options === undefined) throw new Error("options cannont be null or empty for a remote GET call");
        if (options.cache === undefined || options.cache === null || options.cache === '' || options.cache === {}) throw new Error('A valid cache object is missing');
        if (options.cacheName === '') throw new Error("A valid service cache pointer is missing. Service cache pointers should be unique.");
        if (options.url === '' || options.url === undefined || options.url === {}) throw new Error("A valid url is a must for remote GET call");
        if (options.params === undefined) throw new Error("parameter should be either an empty string or a json object for remote GET call");
        if ($.isNumeric(options.expire) === false) throw new Error("expiry value should be numeric.");
        var cache = options.cache; // get the cache instance. There should be a valid cache prior to this call.
        var name = options.cacheName; // document name; resultset will be stored under this name in cache.
        var url = options.url; // remote url        
        var headers = options.headers; // the header that to be injected to the request.
        var params = options.params; // data object that to be passed  
        /**
         *  custom headers (passed through options) should be passed by the caller and it should be in the form of an array, like as follows.  
         *  var options.headers = [{name: 'CUSTOM_TOKEN_A', value: 'custom_token_value_a' }, {name: 'CUSTOM_TOKEN_B', value: 'custom_token_value_b' }]
         * 
         */      
        var payload = {
            url: url,
            headers: headers,
            params: params
        };
        var expire = options.expire; // in minutes;
        var defer = $.Deferred();
        // Check whether the data is available in cache.
        cache.get(name).then(function (document) {
            // console.log("document retrieved...", document);
            var documentExpiry = (document.title.expire === undefined || document.title.expire === null) ? 0 : document.title.expire;
            var newTimestamp = require('moment')().unix(); // get the unix timestamp
            var differenceInMinutes = (newTimestamp - document.title.timestamp) / 60;
            if (differenceInMinutes > documentExpiry) {
                // cache document should be updated. 
                cache.remove(document);
                remoteCall(payload)
                    .done(function (data) {
                        // store the data in cache with the timestamp;   
                        storeInCache(data, expire);
                    })
                    .fail(function (data) {
                        defer.reject("Error occured while fetching data from remote URL ", url);
                    })
            } else {
                // retrieve the document from cache and resolve the promise.
                defer.resolve(document.title.data);
            }
        }).catch(function (error) {
            //console.log("NOT FOUND", error);
            remoteCall(payload)
                .done(function (data) {
                    // store the data in cache with the timestamp;     
                    storeInCache(data, expire);
                })
                .fail(function (data) {
                    defer.reject("Error occured while fetching data from remote URL ", url);
                })
        })
        var storeInCache = function (data, expire) {
            //console.log('cache', cache);
            //console.log('defer', defer);
            return cache.put({
                _id: name,
                title: {
                    data: data,
                    timestamp: require('moment')().unix(),
                    expire: expire
                }
            }).then(function (response) {
                defer.resolve(data);
            }).catch(function (error) {
                defer.reject("Error while storing data to cache...");
            });
        }
        var remoteCall = function (payload) {
            var defer1 = $.Deferred();
            $.ajax({
                type: 'GET',
                crossDomain: false, // Cross domain is currently disabled;
                url: payload.url,
                data: payload.params, // Data option of ajax to pass in the required set of data.
                async: true,
                beforeSend: function (xhr) {
                    if (xhr && xhr.overrideMimeType) {
                        xhr.overrideMimeType('application/json;charset=utf-8');
                        if (payload.headers) {
                            $.each(payload.headers, function (idx, header) { // iterate through passed on headers and inject.
                                xhr.setRequestHeader(header.name, header.value);
                            });
                        }
                        xhr.withCredentials = true; // Enabled for cross site Access-Control.
                    }
                },
                dataType: 'json',
                success: function (data, status, xhr) {
                    defer1.resolve(data);
                },
                error: function (xhr, status, err) {
                    defer1.reject("error occured while resolving the service");
                },
                complete: function (xhr, status) {
                    console.log("service call completed ", url);
                }
            });
            return defer1.promise(); // remote call promise
        }
        return defer.promise(); // service get promise.
    }


    // HTTP Service POST operation.
    /**
     * The POST method is little different. It's the method the browser sends the server to ask for a response that takes into account the 
     * data provided in the body of the HTTP request
     */
    var post = HttpService.post = function (options) {
        if (options === undefined) throw new Error("options cannont be null or empty for a remote POST call");
        if (options.url === '' || options.url === undefined || options.url === {}) throw new Error("A valid url is a must for remote POST call");
        if (options.params === undefined) throw new Error("parameter should be either an empty string or a json object for remote POST call");
        var defer = $.Deferred();
        var url = options.url; // remote url
        var params = options.params; // data object that to be passed
        var headers = options.headers;
        /**
         *  custom headers (passed through options) should be passed by the caller and it should be in the form of an array, like as follows.  
         *  var options.headers = [{name: 'CUSTOM_TOKEN_A', value: 'custom_token_value_a' }, {name: 'CUSTOM_TOKEN_B', value: 'custom_token_value_b' }]
         * 
         */      
        $.ajax({
            type: 'POST',
            crossDomain: false, // Cross domain is currently disabled;
            url: url,
            data: params, // Data option of ajax to pass in the required set of data.
            async: true,
            beforeSend: function (xhr) {
                if (xhr && xhr.overrideMimeType) {
                    xhr.overrideMimeType('application/json;charset=utf-8');
                    if (headers) {
                        $.each(headers, function (idx, header) { // iterate through passed on headers and inject.
                            xhr.setRequestHeader(header.name, header.value);
                        });
                    }
                    xhr.withCredentials = true; // Enabled for cross site Access-Control.
                }
            },
            dataType: 'json',
            success: function (data, status, xhr) {
                defer.resolve(data);
            },
            error: function (xhr, status, err) {
                defer.reject("error occured while resolving the service");
            },
            complete: function (xhr, status) {
                console.log("service call completed ", url);
            }
        });
        return defer.promise(); // service post promise.
    }
    return HttpService;
});