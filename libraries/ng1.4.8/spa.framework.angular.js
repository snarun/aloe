/**
 * FLAG: SHOULD NOT MODIFY 
 * Base Framework - Single Page Applications (SPA) -
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
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.SPA = factory(root);
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {
    var SPA = {}; // The core SPA definition. SPA holds quite a few objects.
    window.jQuery = window.$ = require('jquery'); // assign jQuery.
    var pace = require('pace-progress'); // load the pace monitor
    var _ = require('underscore'); // load underscore libraries
    var _s = require('underscore.string'); // load underscore string library plugin
    var angular = require('angular'); // load angular


    require('pace-progress').start(); // Start pace to monitor the ajax requests, event loop lag, document ready state, and elements on your page to decide the progress.
    $(document).ajaxStart(function () { // // Restart Pace in ajax execution scope, as Pace may not detect the JQuery Ajax.
        // For more details:  refer https://github.com/HubSpot/pace/issues/110
        pace.restart();
    });
    _.mixin(_s.exports()); // we don't want string plugin to be separate from the underscore core. So, merge it using mixin.

    var _$registry_modules = (function () { // sub utility to keep track of the modules that are loaded into the application
        var _$_modules = function () {
            var _pages = [];

            function add(name, spainstance, anginstance, root) { // add module
                _pages.push({
                    modulename: name,
                    spainstance: spainstance,
                    anginstance: anginstance,
                    root: root
                });
            }

            function get(name) { // get the module instance based on module name
                var instance = null;
                for (var i = 0, l = _pages.length; i < l; i++) {
                    if (_pages[i].modulename === name) {
                        instance = _pages[i];
                        break;
                    }
                }
                return instance;
            }

            function getRootModule() { // get the root module
                var instance = null;
                for (var i = 0, l = _pages.length; i < l; i++) {
                    if (_pages[i].root == true) {
                        instance = _pages[i];
                        break;
                    }
                }
                return instance;
            }
            return { // return the whole as an object.
                add: add,
                get: get,
                getRootModule: getRootModule,
                list: _pages
            }
        }
        return _$_modules;
    })();


    var _$registry_controllers = (function () { // sub utility to keep track of the controllers that are to be loaded to the application. 
        var _$_controllers = function () {
            var _pages = [];

            function add(modulename, controllerlist) { // add controllers.
                _pages.push({
                    module: modulename,
                    list: controllerlist
                });
            }

            function get(modulename) { // get the controller based on name
                var list = null;
                for (var i = 0, l = _pages.length; i < l; i++) {
                    if (_pages[i].module === modulename) {
                        list = _pages[i].list;
                        break;
                    }
                }
                return list;
            }
            return { // return the whole as an object.
                add: add,
                get: get,
                list: _pages
            }
        }
        return _$_controllers;
    })();

    var _$registry_services = (function () {
        var _$_services = function () {
            var _pages = [];

            function add(modulename, serviceslist) { // add services.
                _pages.push({
                    module: modulename,
                    list: serviceslist
                });
            }

            function get(modulename) { // get the services based on name
                var list = null;
                for (var i = 0, l = _pages.length; i < l; i++) {
                    if (_pages[i].module === modulename) {
                        list = _pages[i].list;
                        break;
                    }
                }
                return list;
            }
            return { // return the whole as an object.
                add: add,
                get: get,
                list: _pages
            }
        }
        return _$_services;
    })();


    var __$$$modules = (function () { // sub utility to keep track of the modules that are loaded into the application
        var _instance;

        function createInstance() {
            var obj = new _$registry_modules();
            return obj;
        }
        return {
            instance: function () {
                if (!_instance)
                    _instance = createInstance();
                return _instance;
            }
        };
    })();
    var __$$$controllers = (function () { // sub utility to keep track of the controllers that are to be loaded to the application. 
        var _instance;

        function createInstance() {
            var obj = new _$registry_controllers();
            return obj;
        }
        return {
            instance: function () {
                if (!_instance)
                    _instance = createInstance();
                return _instance;
            }
        };
    })();

    var __$$$services = (function () { // sub utility to keep track of the services that are to be loaded to the application. 
        var _instance;

        function createInstance() {
            var obj = new _$registry_services();
            return obj;
        }
        return {
            instance: function () {
                if (!_instance)
                    _instance = createInstance();
                return _instance;
            }
        };
    })();

    var $$$$Util = SPA.Register = { // expose both the registers as SPA.Register
        modules: __$$$modules.instance(),
        controllers: __$$$controllers.instance(),
        services: __$$$services.instance()
    };

    var __renderGraph = (function () { // sub utility to keep track of the Rendering.
        var ___renderGraph = function () {
            ___renderGraph.makeNode = function () {
                return {
                    module: null,
                    next: null
                };
            }
            this.start = null;
            this.end = null;
            this.add = function (module) {
                if (this.start === null) {
                    this.start = ___renderGraph.makeNode();
                    this.end = this.start;
                } else {
                    this.end.next = ___renderGraph.makeNode();
                    this.end = this.end.next;
                }
                this.end.module = module;
            }
        }
        return ___renderGraph;
    })();

    var __$$$renderGraph = (function () {
        var _instance;

        function createInstance() {
            var obj = new __renderGraph();
            return obj;
        }
        return {
            instance: function () {
                if (!_instance)
                    _instance = createInstance();
                return _instance;
            }
        };
    })();

    var ViewGraph = SPA.RenderGraph = { // expose the Render graph objects as SPA.RenderGraph. 
        List: __$$$renderGraph.instance(),
    };
    var extend = function (protoProps, staticProps) { // Helper function to correctly set up the prototype chain, for subclasses.
        var parent = this;
        var child;
        // The constructor function for the new subclass is either defined by
        // you (the "constructor" property in your `extend` definition), or
        // defaulted by us to simply call the parent's constructor.
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () {
                return parent.apply(this, arguments);
            };
        }
        _.extend(child, parent, staticProps); // Add static properties to the constructor function, if supplied.      
        var Surrogate = function () { // Set the prototype chain to inherit from `parent`, without calling `parent`'s constructor function.
            this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;
        if (protoProps) _.extend(child.prototype, protoProps); // Add prototype properties (instance properties) to the subclass
        child.__super__ = parent.prototype; // Set a convenience property in case the parent's prototype is needed
        return child;
    };

    // Define the root abstract.
    var Root = SPA.Root = function (options) {
            this.id = _.uniqueId('root');
            options || (options = {});
            _.extend(this, _.pick(options, root_properties));
            this.initialize.apply(this, arguments);
        }
        // Default properties of Root module
    var root_properties = ['name', 'sysdeps', 'exceptionsTobeReportedTo'];

    _.extend(Root.prototype, {
        isRoot: true, // Explicit information to define the module as root; As the root instance will be stored in SPA.Register, the property helps to easily identify the stored root instance.
        _instance: '', // placeholder; will be initialized during run time 

        initialize: function (options) {
            if (_(this.sysdeps).isBlank()) // build system dependencies
                throw new Error("Root module requires system dependencies to continue... Please add dependent modules (including third party libraries) in sysdeps property.");
            var _sysdeps = ['spaAppConstants']; // inject spa specific dependencies;
            var requires = $.merge(this.sysdeps, _sysdeps); // merge the injected dependencies with the provided ones from actual class. 
            this._instance = angular.module(this.name, requires); // All set, now create the module.  
            SPA.Register.modules.add(this.name, this, this._instance, true); // Push the newly created module to SPA Register.
            this.injectNgDirective(); // Root module is depended on 'ng' directives. Lets inject it.            
            this.initializeLogging(); // Initialize logging.
            this.initializeConfigurationBlock(); // initialize configuration block             
            this.runOps(); // run client side security, (if used)
        },
        injectNgDirective: function () {
            // By default the ng module is loaded by default when an AngularJS
            // application is started. The module itself contains the essential
            // components for an AngularJS application to function. There should
            // only be a single instance of ng defined for the application.
            var injector = angular.injector(['ng', this.name]);
        },

        initializeConfigurationBlock: function () {
            // Initialize Configuration blocks. This is one of the major
            // functionality of root module, as it covers aspects like module
            // registration, controller registration and render views
            console.log("initializing configuration blocks -- ", this._instance);
            var rootInstance = this._instance;
            // Use the Module configuration to configure the most minimum
            // requirements that are to be fullfilled by the root module.
            rootInstance.config(['$stateProvider', '$urlRouterProvider', 'spaRouteResolverProvider',
                'spaScopeResolverProvider', '$controllerProvider',
                '$compileProvider', '$filterProvider', '$provide', '$httpProvider', '$locationProvider',
                function ($stateProvider, $urlRouterProvider, spaRouteResolverProvider, spaScopeResolverProvider, $controllerProvider,
                    $compileProvider, $filterProvider, $provide, $httpProvider, $locationProvider) { 
                        
                    // Define a single access point for registrations. Dependent modules may use this access point heavily
                    rootInstance.register = {
                        controller: $controllerProvider.register, // The $controller service is used by Angular to create new controllers.
                        directive: $compileProvider.directive, //Register a new directive with the compiler.
                        filter: $filterProvider.register, //Registers a new filter. 
                        factory: $provide.factory, //Register a service factory, which will be called to return the service instance.
                        service: $provide.service // Register a service constructor, which will be invoked with new to create the service instance. 
                    };

                    // Register a common notification service that helps controller communication.
                    rootInstance.register.service('spaNotificationService', function () {
                        var observerService = {};
                        observerService.observers = {};
                        observerService.attach = function (callback, event, id) {
                            if (id) {
                                if (!observerService.observers[event]) {
                                    observerService.observers[event] = {};
                                }

                                if (!observerService.observers[event][id])
                                    observerService.observers[event][id] = [];

                                observerService.observers[event][id].push(callback);
                            }
                        };
                        observerService.detachById = function (id) {
                            for (var event in observerService.observers) {
                                observerService.detachByEventAndId(event, id);
                            }
                        };
                        observerService.detachByEvent = function (event) {
                            if (event in observerService.observers) {
                                delete observerService.observers[event];
                            }
                        };
                        observerService.detachByEventAndId = function (event, id) {
                            if (event in observerService.observers) {
                                if (id in observerService.observers[event]) {
                                    delete observerService.observers[event][id];
                                }
                            }
                        };
                        observerService.notify = function (event, parameters) {
                            for (var id in observerService.observers[event]) {
                                angular.forEach(observerService.observers[event][id], function (callback) {
                                    callback(parameters);
                                });
                            }
                        };
                        return observerService;
                    })
                    // Define an element ready directive that will get invoked when the element is enabled in DOM and rendered.
                    rootInstance.register.directive('elemReady', ['$parse', '$timeout', function ($parse, $timeout) {
                        return {
                            restrict: 'A',
                            link: function ($scope, elem, attrs) {
                                $.wait(getRandom(10, 2500)).then(function () {
                                    elem.ready(function () { 
                                        $scope.$apply(function () {
                                            try {
                                                var func = $parse(attrs.elemReady);
                                                func($scope);
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        })
                                    })
                                });
                            }
                        }
                    }])

                    // Generate random numbers
                    var getRandom = function getRandomInt(min, max) {
                        return Math.floor(Math.random() * (max - min + 1)) + min;
                    }
                    $.wait = function (ms) {
                        var defer = $.Deferred();
                        setTimeout(function () {
                            defer.resolve();
                        }, ms);
                        return defer;
                    };

                    var current = SPA.RenderGraph.List.start;
                    while (current !== null) {
                        // Render the view tree. Since the modules are
                        // initialized from bottom to top, rendering should be
                        // handled from top to bottom.
                        console.log(current.module, ' ---> ');
                        var module = SPA.Register.modules.get(current.module);
                        console.log(module);
                        module.spainstance.registerServices(); // registers services
                        module.spainstance.registerControllers(); // registers controllers.
                        module.spainstance.registerViews(); // registers views.
                        current = current.next;
                    }
                    var rootModule = SPA.Register.modules.getRootModule(); // get the root module
                    rootModule.spainstance.defineUrlStates($stateProvider, $urlRouterProvider,
                        $httpProvider, spaRouteResolverProvider, spaScopeResolverProvider); // Should be handled at the root module definitions.
                }
            ]);
        },

        runOps: function () {
            // Finally, run the application blocks. This is the most appropriate
            // place to handle client side security, such as authentication
            // token authorization with a third party service etc..
            this._instance.run(['$rootScope', '$location',
                function ($rootScope, $location) {
                    console.log("CLIENT SIDE SECURITY PLACEHOLDER------------");
                    console.log($rootScope);
                    //Client-side security.  
                }
            ]);
        },
        initializeLogging: function () {
            // load stack trace js
            var StackTrace = require('stacktrace-js/stacktrace');
            this._instance.factory("spaStackTraceService", function () {
                return ({
                    trace: StackTrace
                })
            })
            this._instance.factory('$exceptionHandler', ['$log', 'spaStackTraceService', '$window', function ($log, logErrorsToBackend, $window) {
                return function myExceptionHandler(exception, cause) {
                    // $log.error.apply($log, 'arguments'); // Pass of the error to the default error handler.
                    $log.error(exception); // Pass of the error to the default error handler.
                    try {
                        var errorMessage = exception.toString();
                        var stackTrace = logErrorsToBackend.trace.fromError(exception).then(function (stackframes) {
                            var stringifiedStack = stackframes.map(function (sf) {
                                return sf.toString();
                            }).join('\n');
                            //console.log("SSF", stringifiedStack);
                            var data = angular.toJson({
                                errorUrl: $window.location.href,
                                errorMessage: errorMessage,
                                stackTrace: stringifiedStack,
                                cause: (cause || "")
                            });
                            //console.log('The data that to be passed on to the server for later viewing ', data);
                        });
                        var __rootModule = SPA.Register.modules.getRootModule();
                        var _url = __rootModule.spainstance.exceptionsTobeReportedTo; // get the remote url from root module.
                        //console.log("The exception may get logged to a remote URL defined in root module. Value =>", _url);
                        $.ajax({
                            type: "POST",
                            url: _url,
                            contentType: "application/json",
                            data: angular.toJson({
                                errorUrl: $window.location.href,
                                errorMessage: errorMessage,
                                stackTrace: stackTrace,
                                cause: (cause || "")
                            })
                        });
                    } catch (err) {
                        $log.warn("Error logging failed");
                        $log.log(err);
                    }
                };
            }])
        },
        defineUrlStates: function ($stateProvider, $urlRouterProvider, $httpProvider, spaRouteResolverProvider) {
            // An abstract definition, should be handled at the root module. You
            // should override this to define states specific for ROOT module
        }
    });
    // Modules are a vital part of UI Composition; Module are nothing but
    // features in the application.
    var Module = SPA.Module = function (options) {
        this.mid = _.uniqueId('module');
        options || (options = {});
        _.extend(this, _.pick(options, module_properties));
        this.initialize.apply(this, arguments);
        console.log(SPA.Register);
    }
    var module_properties = ['name', 'sysdeps', 'modules', 'view', 'controllers', 'services']; // Define the module properties.
    _.extend(Module.prototype, {
        // Copies every property of the derived class to the base object. The
        // source objects are specified using variable arguments; The properties
        // are copied as shallow-copies;
        $$StateParams: '',
        initialize: function (options) {
            // Add the module to render graph.
            SPA.RenderGraph.List.add(this.name);
            if (this.sysdeps == null || this.sysdeps.length == 0) // build the system dependencies
                throw new Error("Module requires system dependencies to continue... Please add dependent modules (including third party libraries) in sysdeps property.");
            var _sysdeps = ['spaAppDirective']; // inject spa specific dependencies;  // 'oc.lazyLoad']; 'dialogs.main' 
            var _req = $.merge(this.sysdeps, _sysdeps);
            var requires = $.merge(_req, this.initializeDepModules()); // merge sysdeps and dependents;  
            // now create the angular module
            try {
                var _moduleInstance = angular.module(this.name); // check whether module exists, if not create the module

            } catch (error) {

                var _moduleInstance = angular.module(this.name, requires); // create the module                
                SPA.Register.modules.add(this.name, this, _moduleInstance, false); // Store the modules in application registry.               
                this.initializeServices(); // Register Services                
                this.initializeControllers(); // Register Controllers
            }
        },
        registerServices: function () { // Register services
            var svcblk = SPA.Register.services.get(this.name); // Get the services from the current module;
            _.each(svcblk, function (svc) { // Register the service from stack
                svc.spainstance.register();
            })
        },
        registerControllers: function () { // Register controllers          
            var ctrlblk = SPA.Register.controllers.get(this.name); // Get the controller from current module.          
            _.each(ctrlblk, function (ctrl) { // Register the controller from stack
                ctrl.spainstance.register();
            });
        },
        registerViews: function () { // Register Views; This will also attach the view to the DOM.
            if (_(this.view).isBlank())
                throw new Error("Module should not be created without a view... Please verify the module " + this.name);
            var __view = this.view; // A module can have only a single view.            
            var _view = new __view(); // initialize the view
            var region = SPA.RegionManager.getRegion(_view.region); // get the region associated to the view.
            var options = {
                'name': _view.name,
                'module': _view.module,
                'instance': _view
            }
            region.add(options); // Add the instance of the view to the region.
            region.show(); // show the region.
        },
        initializeControllers: function () { // Initialize Controllers. 
            if (_(this.controllers).isBlank())
                throw new Error("Module should not be created without a controller... Please verify the module " + this.name);
            var module_name = this.name;
            var ctrlblk = [];
            _.each(this.controllers, function (controller) { // A module can have multiple controllers; Iterate through the passed on list and initialize each one of them.
                var _controller = new controller(); // initialize the controller, one at a time. 
                var ctrl = {};
                ctrl.name = _controller.name;
                ctrl.spainstance = _controller;
                ctrlblk.push(ctrl); // store the initialized instance to the register.
            });
            SPA.Register.controllers.add(module_name, ctrlblk); // add both module and its controllers to the register.
        },
        initializeDepModules: function () { // Initialize Dependent Modules (children)
            var dependents = [];
            _.each(this.modules, function (module) {
                var _module = new module();
                dependents.push(_module.name);
            })
            return dependents;
        },
        initializeServices: function () {
            if (!_(this.services).isBlank()) {
                var module_name = this.name;
                var svcblk = [];
                _.each(this.services, function (service) {
                    var _service = new service();
                    var svc = {};
                    svc.name = _service.name;
                    svc.spainstance = _service;
                    svcblk.push(svc); // store the initialized service instance to the register.
                })
                SPA.Register.services.add(module_name, svcblk);
            }
        }
    });

    /* MODULE ENDS HERE */

    /** PLACEHOLDER FOR EVENTS */

    /* SPA REGION STARTS HERE */
    // Regions are placeholders, where the module view should be rendered.
    var Region = SPA.Region = function (options) {
        this.rid = _.uniqueId('region');
        options || (options = {});
        _.extend(this, _.pick(options, region_properties));
        this.initialize.apply(this, arguments);
    }
    var region_properties = ['name', 'element', 'container', 'template', 'module', 'views'];
    _.extend(Region.prototype, {
        initialize: function (options) { // initialize the region.
            console.log("INITIALIZING REGION..-->", this.name);
            this.name = options.name;
            this.element = options.element;
            this.template = options.template;
            this.module = options.module;
            this.vw = [];
        },
        show: function () {}, // Show the Region
        add: function (view) { // adds the region.
            var _contains = false;
            var ctx = this;
            if (this.vw.length > 0) {
                _.each(this.vw, function (v) {
                    if (v.name === view.name) {
                        _contains = true;
                        console.log("checking...T2345VWCompare", v.name, ctx.vw);
                    }
                });
            }
            if (!_contains)
                this.vw.push(view);

        }, // Stores the view instance.
        activate: function () {}, // Activates the view associated to it.
        getChildRegions: function () { // get child regions.
            var ctxt = this;
            _.each(this.vw, function (view) {
                // GET THE CHILD REGIONS FROM VIEW TEMPLATE*="soft"
                //var region = $("[data-ui-region*='region']",
                //$(view.instance.template)); console.log(view.name);
                //console.log(view.instance.template);
                //console.log($(view.instance.template).attr('data-ui-region'));
                //console.log($(view.instance.template).data('ui-region'));
                ctxt.show();
            });
        },
        getView: function (name) { // gets the view associated to the region.
            var _view = null;
            _.each(this.vw, function (view) {
                if (view.name === name) {
                    _view = view;
                }
            });
            return _view;
        },
        getViewForModule: function (nameOfModule) { // get the view associated to the module
            var _nameOfView = null;
            _.each(this.vw, function (view) {
                if (view.module === nameOfModule) {
                    _nameOfView = view.name;
                }
            })
            return _nameOfView;
        },
        contains: function (nameOfModule) { // check whether view belongs to this module.
            var _contains = false;
            _.each(this.vw, function (view) {
                var _n = view.instance.module.trim();
                if (_n === nameOfModule) {
                    _contains = true;
                }
            });
            return _contains;
        },
        getContainer: function () { // gets  the container
            // retutns the container, where the region is hooked
        },
        getRegionManager: function () { // gets the region manager instance.
            // returns the region manager (future...)
        }
    });

    var RegionManagerBase = SPA.RegionManagerBase = function (options) { // Base class for region manager.
        this.mid = _.uniqueId('regionmanager');
        options || (options = {});
        _.extend(this, _.pick(options, regionmanager_properties));
        this.initialize.apply(this, arguments);
        // register regions
        //console.log("REGISTERING REGION MANAGER");
    }

    var regionmanager_properties = ['name', 'regions'];
    _.extend(RegionManagerBase.prototype, {
        initialize: function (options) {
            //this.name  = options.name;
            this.regions = [];
        },
        discoverRegions: function (template, regionname, modulename) {}, // overrride this in the instance
        addRegionWithName: function (name, element) {}, // override this in the instance
        getContainer: function () { // returns the container, where the region is hooked            
        },
        getRegionManager: function () { // returns the region manager (future...)            
        }
    });
    /* SPA REGION ENDS HERE */


    /* SPA CONTROLLER STARTS HERE */

    /*	Controllers are responsible for handling user input and responses. SPA
    controller classes accepts the handler to perform the user input and
    responses 	*/
    var Controller = SPA.Controller = function (options) {
            this.cid = _.uniqueId('controller');
            options || (options = {});
            _.extend(this, _.pick(options, controller_properties));
            this.initialize.apply(this, arguments);
        }
        // Default properties of Controller class
    var controller_properties = ['name', 'module', 'handler'];

    // Copies every property of the derived class to the base object. The source
    // objects are specified using variable arguments; The properties are copied
    // as shallow-copies;
    _.extend(Controller.prototype, {
        // initialize the controller - Derived class should never override this.
        initialize: function (options) {
            // if (this.injectParams === undefined) throw new Error("Either providers or services are required for the controller to operate. Aborting the operation ");
            this.handler.$inject = this.injectParams; // Inject params, that can be used in controller handler.
        },
        // Register the controller with the root module.
        register: function () {
            var __rootModule = SPA.Register.modules.getRootModule();
            console.log(__rootModule);
            __rootModule.anginstance.register.controller(this.name, this.handler);
        },
    });
    /* SPA CONTROLLER ENDS HERE */


    /* SPA SERVICE STARTS HERE */
    var Service = SPA.Service = function (options) {
            this.sid = _.uniqueId('service');
            options || (options = {});
            _.extend(this, _.pick(options, service_properties));
            this.initialize.apply(this, arguments);
        }
        // default properties of service.
    var service_properties = ['name', 'module', 'handler'] // Services are global and are singleton
    _.extend(Service.prototype, {
        // initialize the service. 
        initialize: function (options) {
            this.handler.$inject = this.injectParams;
        },
        // register the service as a factory to the root module.
        register: function () {
            var __rootModule = SPA.Register.modules.getRootModule();
            console.log(__rootModule);
            console.log("REGISTERING THE SERVICE WITH THE ROOT MODULE ", this.name, this.handler);
            __rootModule.anginstance.register.service(this.name, this.handler);
            console.log("REGISTERED...");
        }
    })

    /* SPA SERVICE ENDS HERE */


    /* SPA VIEW STARTS HERE */
    var View = SPA.View = function (options) { // A module can have a view and a template.
        this.cid = _.uniqueId('view');
        options || (options = {});
        _.extend(this, _.pick(options, view_properties));
        this._ensureElement();
        if (_(this.name).isBlank())
            throw new Error("View name not found.. ");
        if (_(this.template).isBlank())
            throw new Error("HTML template not found..");
        if (_(this.region).isBlank())
            throw new Error("View region is not specified..");
        if (_(this.module).isBlank())
            throw new Error("Module name not found..")
        this.name = this.name;
        this.template = this.template;
        this.region = this.region;
        this.module = this.module;
        console.log('T2345', options, this.region);
        this.initialize.apply(this, arguments);
        this.registerRegions();
    }
    var view_properties = ['model', 'collection', 'el', 'id', 'attributes', 'className',
        'tagName', 'events', 'regionmanager', 'name', 'template', 'region', 'module'
    ];
    // Copies every property of the derived class to the base object. The source
    // objects are specified using variable arguments; The properties are copied
    // as shallow-copies;
    _.extend(View.prototype, {
        tagName: 'div',
        regionmanager: SPA.RegionManager,
        $: function (selector) {
            return this.$el.find(selector);
        },
        initialize: function (options) {

        },
        //Register Regions Regions are defined in views as data attributes.
        //Identify such regions from HTML template and store in the Region
        //Manager.
        registerRegions: function () {
            this.regionmanager = SPA.RegionManager;
            // To process, Region Manager instance is a must. if no such
            // instance found, throw error and halt the operation.
            if (_(this.regionmanager).isBlank())
                throw new Error("Region Manager instance not found");
            // Similarly, View should have a HTML template. If no such template
            // found, throw error and halt the operation.
            if (_(this.template).isBlank())
                throw new Error("Template not found.. ");
            // Discover the regions defined in the HTML template
            this.regionmanager.discoverRegions(this.template, this.region, this.module);
            // now, map the template against a named region
            this.regionmanager.getRegion(this.region).template = this.template;
        },
        getRegion: function () { // Gets the region defined for this module.
            return this.region;
        },
        getTemplate: function () { // Gets the template defined for this module.
            return this.template;
        },
        render: function () { // Render the view. View should call the region's render method.
            return this;
        },
        remove: function () { // Removes the view.
            this.$el.remove();
            return this;
        },
        setElement: function (element, delegate) { // sets view element.     
            this.$el = element instanceof $ ? element : $(element);
            this.el = this.$el[0];
            return this;
        },
        _ensureElement: function () { // ensures whether the view element has attributes.
            if (!this.el) {
                var attrs = _.extend({}, _.result(this, 'attributes'));
                if (this.id) attrs.id = _.result(this, 'id');
                if (this.className) attrs['class'] = _.result(this, 'className');
                var $el = $('<' + _.result(this, 'tagName') + '>').attr(attrs);
                this.setElement($el, false);
            } else {
                this.setElement(_.result(this, 'el'), false);
            }
        }
    });
    /* SPA VIEW ENDS HERE */

    var spascopeservicesapp = angular.module('spaScopeResolverServices', []); // Scope Resolver Services
    spascopeservicesapp.provider('spaScopeResolver', function () { // Scope Resolver Provider
        this.$get = function () {
            return this.scopeServiceInstance;
        }
        this.scopeServiceInstance = function () { // The actual scope handler.
            /*var add = function (scope) { // Adds the scope to the register; 
                console.log(scope.name);
            }*/
            var remove = function (scope) { // gets invoked when the scope is changed and ready for teardown.
                console.log("scope getting destroyed, time to remove ", scope.$$name);
                console.log("spa registry for module ", SPA.Register.modules);
                console.log("spa registry for controllers ", SPA.Register.controllers);
                // remove the controller from register.
                _.each(SPA.Register.controllers.list, function (module) {
                    var f_list = $.grep(module.list, function (controller, idx) { //console.log(n, n.name, i, scope.$$ctrlname);
                        return controller.name !== scope.$$ctrlname
                    });
                    console.log(f_list);
                    module.list = f_list;
                });
                var moduleControllers = SPA.Register.controllers.get(scope.$$name); // remove module reference from controller register, if no controllers exists for that module.
                console.log("moduleControllers", moduleControllers);
                if (moduleControllers.length === 0) {
                    var _list = $.grep(SPA.Register.controllers.list, function (controller, idx) {
                        return controller.module !== scope.$$name
                    })
                    SPA.Register.controllers.list = _list;
                    // remove the module from register
                    var _list = $.grep(SPA.Register.modules.list, function (module, idx) {
                        return module.modulename !== scope.$$name
                    })
                    SPA.Register.modules.list = _list;
                }
                // remove regions as well, on controller destroy.
                //console.log("this.regions", SPA.RegionManager); var
                //__rootModule = SPA.Register.modules.getRootModule();
                //console.log("angular instance of root module",
                //__rootModule.anginstance); console.log("spa registry for
                //controllers ", SPA.Register.controllers);
            }
            return {
                //add: add,
                remove: remove
            }
        }();
    });

    var dialogresolverservicesapp = angular.module('spaDialogResolverServices', []); // dialog resolver services
    dialogresolverservicesapp.provider('spaDialogResolver', function () { // dialog resolver provider.
        this.$get = function () {
            return this.dlgInstance;
        }
        var keyMirror = require('keyMirror');
        // Define action constants.
        var DialogConstants = SPA.DialogConstants = keyMirror({
                LARGE: null, // LARGE 
                TINY: null, // TINY
                SMALL: null, // SMALL
            })
            // $compile, $scope,
        this.dlgInstance = function () { // Uses foundation 6 specifications for dialogs.
            var resolve = function (spec, provider, dialogsize) {
                if (!(angular.isDefined(provider.compile) && angular.isDefined(provider.scope) && angular.isDefined(provider.name)))
                    throw new Error("Provider should be defined before calling the operation. Aborting dialog operation");
                var dlgclass = "small";
                switch (dialogsize) {
                    case DialogConstants.LARGE:
                        dlgclass = "large";
                        break;
                    case DialogConstants.TINY:
                        dlgclass = "tiny";
                        break;
                    case DialogConstants.SMALL:
                        dlgclass = "small";
                        break;
                }
                var div = '<div class="reveal ' + dlgclass + '" id="spaDialogModal" data-reveal ng-controller="' +
                    provider.name + '"><div id="spadialogcontent">' +
                    '</div><button class="close-button"type="button" ng-click="close()">' +
                    '<span aria-hidden="true">&times;</span></button></div>';
                $('body').append(div);
                $('#spadialogcontent').append(spec.template);
                if (spec === undefined) return;
                var module = new spec.module();
                module.registerServices();
                module.registerControllers();
                provider.compile($('#spaDialogModal').contents())(provider.scope);
                //$(document).foundation(); No need to reinitialize the
                //foundation plugin.. *fix
                var popup = new Foundation.Reveal($('#spaDialogModal'), {
                    closeOnEsc: false,
                    closeOnClick: false
                });
                popup.open();
            }
            var close = function () {
                $('.reveal-overlay').remove(); //destroy the controller instance.
                // TO BE FIXED - REMOVES CONTROLLERS FROM SPA CONTROLLE
                // REGISTER.
            }
            return {
                resolve: resolve,
                close: close
            }
        }();
    });

    /* ROUTER RESOLVER SERVICES  STARTS HERE */
    var routeResolver = function () { // router resolver services.
        this.$get = function () {
            return this;
        }
        this.routeConfig = function () { // router configuration
            var moduleDirectory = "/",
                getModuleDirectory = function () {
                    return moduleDirectory;
                };
            return {
                getModuleDirectory: getModuleDirectory
            }
        }();
        this.route = function (routeConfig) { // resolves the route as per the router configuration
            var resolve = function (spec) {
                    var routeDef = {};
                    routeDef.url = spec.route;
                    routeDef.template = spec.template;
                    routeDef.resolve = {
                        load: ['$q', '$rootScope', '$controller', '$state', '$stateParams',
                            function ($q, $rootScope, $controller, $state, $stateParams) {
                                return resolveDependencies($q, $rootScope, $controller, $state, $stateParams, spec.module);
                            }
                        ]
                    };
                    return routeDef;
                },
                resolveDependencies = function ($q, $rootScope, $controller, $state, $stateParams, moduleRef) {
                    $rootScope.safeApply = function (fn) {
                        var phase = this.$root.$$phase;
                        if (phase == '$apply' || phase == '$digest') {
                            if (fn && (typeof (fn) === 'function')) {
                                fn();
                            }
                        } else {
                            this.$apply(fn);
                        }
                    };
                    var defer = $q.defer(); // run the below snippets in promise; as processing may take some time.
                    $rootScope.safeApply(function () { // resolve the modules
                        var resolvedModule = new moduleRef(); // initialize the module
                        resolvedModule.registerServices(); // register services
                        resolvedModule.registerControllers(); // register controllers
                        resolvedModule.$$StateParams = $stateParams; // assign the state parameters
                        var __filter = _.uniq(_.map(resolvedModule.sysdeps, function (deps) { // filter the module specific dependencies
                            if (!(_s.startsWith(deps, 'ng') || _s.startsWith(deps, 'spa')))
                                return deps;
                        }));
                        console.log("__filter", __filter);
                        _.each(__filter, function (modname) { // This should be modules; Initialize each module and activate its views.
                            if (modname != undefined) {
                                var module = SPA.Register.modules.get(modname);
                                console.log("module from spa register ", module);
                                if (module != undefined) {
                                    console.log("module name ", modname, module);
                                    module.spainstance.registerServices();
                                    module.spainstance.registerControllers();
                                    module.spainstance.registerViews();
                                    setTimeout(function () {
                                        console.log("rendering dependent views...", modname);
                                        SPA.RegionManager.activate(modname);
                                    }, 70);
                                }
                            }
                        });
                        console.log("resolved mm ", resolvedModule);
                        defer.resolve(); // its done. now release the promise lock.
                    });
                    return defer.promise; // return a promise immediately on call. 
                };
            return {
                resolve: resolve
            }
        }();
    };
    var routeresolverservicesApp = angular.module('spaRouteResolverServices', []);
    routeresolverservicesApp.provider('spaRouteResolver', routeResolver);
    // Route Resolver ends here
    /* ROUTER RESOLVER SERVICE ENDS HERE */

    // property extension is heavily used; lets assign the base class with the
    // child instances.
    Module.extend = RegionManagerBase.extend = Region.extend = View.extend = Controller.extend = Service.extend = Root.extend = extend;

    var RegionObject = SPA.Region.extend({ // defines the region.
        activate: function (nameOfView) { // activates the view. 
            console.log("printing...T2345", this.name);
            var view = this.getView(nameOfView);
            console.log(this.name, nameOfView, view.instance.region);
            var region = $("[data-ui-region='" + this.name + "']", $(document.body));
            angular.element(document).injector().invoke(['$compile', function ($compile) {
                var scope = angular.element(document.body).scope();
                region.empty().append($compile(view.instance.template)(scope));
            }]);
        },
        show: function (module, append, data) { // show the view
            // start from document.body
            if ($(document.body).attr('data-ui-region') == this.name) {
                $(document.body).empty().append(this.template);
            } else {
                //console.log(this.name);
                var ctxt = this;
                var uiregions = $(document.body).find('[data-ui-region]');
                _.each(uiregions, function (uiregion) {
                    //console.log($(uiregion).attr('data-ui-region'),
                    //ctxt.name);
                    if ($(uiregion).attr('data-ui-region') == ctxt.name) {
                        var $d = $(ctxt.template);
                        if (append == undefined) append = false;
                        if (append)
                            $(uiregion).append($d);
                        else {
                            $(uiregion).empty().append($d); //ctxt.template);
                        }
                        //console.log(angular.element(document).injector())
                        if (angular.element(document).injector() != undefined) {
                            angular.element(document).injector().invoke(function ($compile) {
                                // Create a scope for the passed on template.
                                var $scope = angular.element($d).scope();
                                // Compile the passed on template and get the
                                // output
                                var scope = $scope.$new(true);
                                scope.data = data;
                                var output = $compile($d)(scope);
                                //console.log(data);/ Ensure the scope and been
                                //signalled to digest the data we passed.
                                if ((module == undefined) && ($scope == undefined)) {
                                    scope.$digest();
                                }
                                return scope;
                                ///scope.data = data;/// To be verified further
                                // - testing reqd.  Append the compiled output
                                // to  the region
                                // $(uiregion).empty().append(output);
                            });
                        }
                    }
                });
            }
        },
        map: function (template) { // maps the template
            this.template = template;
        },
        getElement: function () { // gets the view element instance
            return $(this.element);
        }
    });

    var RegionManagerObject = SPA.RegionManagerBase.extend({
        // discover new region object(s) and attach to region manager.
        // Dynamically identify the set of regions from template using the data
        // attributes (data-ui-region) Region name should be unique to function;
        discoverRegions: function (template, regionname, modulename) {
            try {
                // Find the named regions;
                console.log("FINDING NAMED REGIONS OF ...--> ", regionname);
                // Add passed on region to the repository
                var _isPassedOnRegionExists = false;
                var context = this;
                _.each(context.regions, function (region) {
                    if (region.name == regionname) {
                        _isPassedOnRegionExists = true;
                    }
                });
                if (!_isPassedOnRegionExists) {
                    // add the region to the repository
                    var p = {};
                    p.name = regionname;
                    p.element = $(template);
                    p.template = template;
                    p.module = modulename;
                    var region = new RegionObject(p);
                    context.regions.push(region);
                    console.log("STORED THE NAMED REGIONS (PASSED ON) IN REGION MANAGER --> ", context.regions.length);
                }
                var templateRegions = $(template).find('[data-ui-region]');
                var regionParams = {};
                // iterate through the regions found in template
                _.each(templateRegions, function (templateRegion) {
                    regionParams.name = $(templateRegion).attr('data-ui-region');
                    regionParams.module = modulename;
                    var _isRegionExists = false;
                    // Check whether the given region name exists in the
                    // repository
                    _.each(context.regions, function (region) {
                        if (region.name == regionParams.name) {
                            _isRegionExists = true;
                        }
                    });
                    if (!_isRegionExists) {
                        // Continue...
                        regionParams.element = $(templateRegion);
                        console.log("FOUND NAMED REGIONS IN --> ", regionname, "--->", regionParams.name, regionParams.element);
                        // Create a new region object with the values.
                        var region = new RegionObject(regionParams);
                        // Store the regions in the list since no duplicates
                        // found.
                        console.log("STORED THE NAMED REGIONS IN REGION MANAGER --> ", context.regions.length);
                        context.regions.push(region);
                    }
                });
            } catch (error) {
                // Log the error.
                console.log(error);
            }
        },
        getRegion: function (name) { // Get the region by a name. This should be the name defined in the template file. 
            var matched_region = null;
            _.each(this.regions, function (region) {
                if (region.name == name) {
                    matched_region = region;
                    console.log(matched_region.vw, name);
                }
            });
            return matched_region;
        },
        activate: function (nameOfModule) { // activates the view
            _.each(this.regions, function (region) {
                if (region.contains(nameOfModule)) {
                    //var module = SPA.Register.modules.get(nameOfModule);
                    var nameOfView = region.getViewForModule(nameOfModule);
                    console.log("T23456", nameOfView);
                    region.activate(nameOfView);
                }
            });
        }
    });

    var spaRegionManagerObject = (function () { // Get the Region manager object. For the given application instance, there will be only one instance of the RegionManager.
        var instance;

        function createInstance() {
            var object = new RegionManagerObject();
            var params = {};
            params.name = 'bodyRegion';
            params.element = $(document.body);
            var region = new RegionObject(params);
            object.regions.push(region);
            return object;
        }
        return {
            getInstance: function () {
                if (!instance) {
                    instance = createInstance();
                }
                return instance;
            }
        };
    })();

    SPA.RegionManager = spaRegionManagerObject.getInstance(); // returns the active region manager instance
    var Dispatcher = SPA.Dispatcher = new(require('flux').Dispatcher)(); // Creates a dispatcher instance.
    SPA.Dispatcher.handleAction = function (action) { // defines the dispatcher action.
        this.dispatch({
            source: '',
            action: action
        })
    }
    return SPA;
});