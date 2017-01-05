

// Angular
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
// RxJS
import 'rxjs';
// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...

declare var require: any;

export interface window {
    $: any;
    jQuery: any;
    jqxBaseFramework: any;
    Globalize: any;
    jqx: any;
    pageHeight: any;
    pageWidth: any;
    app: any;
    intervals: any;
    methodCounters: any;
    progressJS: any;
}

// JQuery Definitions
let jQuery = require("jquery/dist/jquery");
(<any>window).$ = jQuery;
(<any>window).jQuery = jQuery;

// Accelerated JavaScript Animations
var Velocity = require("velocity-animate/velocity.min");
require("velocity-animate/velocity.ui.min")
