"use strict";
///<reference path ="../../typings/jasmine-matchers.d.ts"/>
var customMatchers = {
    toBeTrue: function () {
        return {
            compare: function (actual, expected) {
                var pass = actual === true ? true : false;
                var message = "";
                var result = {
                    pass: pass,
                    message: message
                };
                return result;
            }
        };
    }
};
var app_cache_1 = require("./app.cache");
describe('offline caching test suite =>', function () {
    var cache;
    beforeEach(function () {
        jasmine.addMatchers(customMatchers);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
        // methods that are to be executed before the script
        cache = new app_cache_1.AppCache();
    });
    it('should create an instance of the AppCache class', function () {
        // check whether the instance is created;  
        expect(cache instanceof app_cache_1.AppCache).toBeTruthy();
    });
    it('should create a store as per the name given ', function () {
        if (cache) {
            var store = cache.createStore("store");
            expect(store).not.toBe(null);
            expect(store.name).toEqual("store");
        }
    });
    // promise test
    it('should destory the newly created store', function (done) {
        if (cache) {
            var store = cache.createStore('store2bedestroyed');
            expect(store).not.toBe(null);
            expect(store.name).toEqual('store2bedestroyed');
            cache.destroy().then(function (response) {
                expect(response).toBeTrue();
                done();
            }, function (error) {
                done();
            });
        }
    });
    // promise test
    it('should add a document to the store', function (done) {
        if (cache) {
            var store = cache.createStore('storeA');
            var doc = { name: "hello world " };
            cache.add('test document', doc).then(function (response) {
                expect(response).toBeTrue();
                done();
            });
        }
    });
    it('should retrieve the document from store, based on tag', function (done) {
        if (cache) {
            var store = cache.createStore('storeA');
            cache.get('test document').then(function (response) {
                expect(response).not.toBe(undefined);
                done();
            });
        }
    });
});
//# sourceMappingURL=app.cache.spec.js.map