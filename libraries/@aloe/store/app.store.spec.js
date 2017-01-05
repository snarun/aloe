"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path ="../../typings/jasmine-matchers.d.ts"/>
var app_store_1 = require("./app.store");
var app_view_state_1 = require("../component/app.view.state");
var action_intent_1 = require("./action.intent");
var app_logger_1 = require("../logger/app.logger");
var MockActionTypes;
(function (MockActionTypes) {
    MockActionTypes[MockActionTypes["COMMAND_A"] = 0] = "COMMAND_A";
})(MockActionTypes || (MockActionTypes = {}));
var MockAction = (function (_super) {
    __extends(MockAction, _super);
    function MockAction() {
        return _super.call(this) || this;
    }
    MockAction.prototype.fireAction = function () {
        var payload = {
            type: MockActionTypes.COMMAND_A,
            data: {
                param: "event value from screen"
            }
        };
        _super.prototype.dispatch.call(this, payload);
    };
    return MockAction;
}(action_intent_1.ActionIntent));
var MockStore = (function (_super) {
    __extends(MockStore, _super);
    function MockStore() {
        return _super.call(this, "MockStore") || this;
    }
    MockStore.prototype.getStoreType = function () {
        return 1;
    };
    MockStore.prototype.registerCacheToServices = function (cache) {
    };
    MockStore.prototype.registerHandlers = function () {
        this.bindActionHandlers({
            longRunningProcess: MockActionTypes.COMMAND_A
        });
    };
    // public register() {
    //     // super.register(this.handler = (payload: any) => {
    //     //     switch (payload.type) {
    //     //         case MockActionTypes.COMMAND_A:
    //     //             this.longRunningProcess();
    //     //             break;
    //     //     }
    //     // })
    // }
    MockStore.prototype.longRunningProcess = function () {
        
        _super.prototype.dispatch.call(this);
    };
    return MockStore;
}(app_store_1.Store));
var MockViewState = (function (_super) {
    __extends(MockViewState, _super);
    function MockViewState(store) {
        return _super.call(this, store) || this;
    }
    MockViewState.prototype.OnStoreChanged = function () {
        
        this.setState({
            name: "arun",
            company: "infosys"
        });
        // build the view model and receives event.
    };
    return MockViewState;
}(app_view_state_1.ViewState));
describe("store testing suite ==> ", function () {
    var store, action, viewmodel;
    beforeEach(function () {
        //jasmine.addMatchers(customMatchers);
        action = new MockAction();
        store = new MockStore();
        viewmodel = new MockViewState(store);
        viewmodel.stateChanges.subscribe(function (changes) {
            
        }, function (error) {
            
        }, function () {
            
        });
    });
    it("should be able to create an instance of the action", function () {
        expect(action instanceof action_intent_1.ActionIntent).toBeTruthy();
    });
    it("should be able to create an instance of the store ", function () {
        expect(store instanceof app_store_1.Store).toBeTruthy();
    });
    it("should be able to register with the dispatcher ", function () {
        store.register(function () {
            app_logger_1.Logger.log(app_logger_1.LogLevel.INFO, "COMMAND_A is invoked and store receives the instruction");
        });
        var _id = "ID_1";
        var msg = store.instance.__dispatcher._callbacks[_id].toString();
        console.info(msg);
        expect(store.instance.__dispatcher._callbacks['ID_1']).not.toBeUndefined();
    });
    it("should be able to fire an action and event should be received at the store", function () {
        action.fireAction();
    });
});
//# sourceMappingURL=app.store.spec.js.map