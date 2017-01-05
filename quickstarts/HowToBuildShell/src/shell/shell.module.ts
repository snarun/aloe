import { NgModule, ErrorHandler, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { removeNgStyles, createNewHosts, createInputTransfer } from "@angularclass/hmr";

import { LoadingModule, AppSettings } from "@aloe/core";

import { AppState, InternalStateType } from '../app.service';

import { Shell } from './shell.container';
import { ShellErrorHandler } from "./shell.error.handler";

const APP_PROVIDERS = [
    AppSettings,
    AppState
];

type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        LoadingModule,
    ],
    exports: [],
    declarations: [
        Shell
    ],
    entryComponents: [],
    providers: [
        APP_PROVIDERS,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: ErrorHandler, useClass: ShellErrorHandler },
    ],
    bootstrap: [Shell]
})

export class ShellModule {

    constructor(public appRef: ApplicationRef, public appState: AppState) { }

    public hmrOnInit(store: StoreType) {
        if (!store || !store.state) {
            return;
        }
        console.log("HMR Store ", JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;

        // set input values
        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }

        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    public hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);

        // save state
        const state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    public hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}