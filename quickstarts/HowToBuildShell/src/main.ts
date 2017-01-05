
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode, Provider } from "@angular/core";
import { decorateModuleRef } from "./environment";

import { AppSettings } from "@aloe/core";

import { bootloader } from "@angularclass/hmr";

import { ShellModule } from "./shell/shell.module";

export function main(): Promise<any> {
  let appSettings = new AppSettings();
  appSettings.cookieName = 'spa'; // Cookie that may be used.
  appSettings.headerName = "SPA_HEADER"; // Custom Http Header
  appSettings.cacheExpiry = 30; // Cache expiry in minutes
  appSettings.serviceURI = ''; // Web Service URL (http)
  appSettings.notificationURI = '';  // Notification Service URL (ws)

  return platformBrowserDynamic([
    {
      provide: 'app.settings',
      useValue: appSettings
    }
  ])
    .bootstrapModule(ShellModule)
    .then(decorateModuleRef)
    .catch(err => console.error(err));
}

if ('production' === process.env.ENV) {
  enableProdMode();
}
// bootloader is only needed to detect that the dom is ready before bootstraping otherwise bootstrap. 
// This is needed because that dom is already ready during reloading.
bootloader(main);