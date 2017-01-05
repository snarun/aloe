import { Type, Component, OnInit, AfterViewInit, ViewEncapsulation, ViewContainerRef, ComponentFactoryResolver, Inject } from '@angular/core';
import { AppSettings } from "@aloe/core";
import { ShellModule } from "./shell.module";

import { Routes, RouterModule } from "@angular/router";
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'shell',
    templateUrl: './shell.template.html',
    styleUrls: ['./shell.template.scss'],
    encapsulation: ViewEncapsulation.Emulated
})

export class Shell implements OnInit, AfterViewInit {
    // set the application context.
    appcontext: Type<{}> = ShellModule;

    constructor( @Inject('app.settings') private appSettings: AppSettings, private viewContainerRef: ViewContainerRef, private resolver: ComponentFactoryResolver) {

    }  

    ngOnInit() {
        $(document).on('open.zf.reveal', '[data-reveal]', function () {
            $('body').css('overflow', 'hidden');
            setTimeout(() => {
                $('.reveal-overlay').css('overflow-y', 'hidden');
            }, 500);
        });
        $(document).on('close.zf.reveal', '[data-reveal]', function () {
            $('body').css('overflow', 'visible');
        });
    }

    ngAfterViewInit() {
        //$(document).foundation();
        $('#status').velocity({ opacity: 0 }, { display: "none" });
        $('#preloader').velocity({ opacity: 0 }, { display: "none" }); // will fade out the white DIV that covers the website.
        $('body').delay(350).css({
            'overflow': 'visible'
        });
        var theme_list_open = false;
        $(document).ready(function () {
            function e() {
                var e = $("#switcher")
                    .height(); $("#iframe")
                        .attr("height",
                        $(window).height() - e + "px")
            }
            var IS_IPAD = navigator.userAgent.match(/iPad/i) != null;
            $(window).resize(function () { e() }).resize();

        }
        )
    }
}