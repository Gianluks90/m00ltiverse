import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { APP_CONFIG } from "shared-core";
import { F00DS_CONFIG } from "./config/f00ds.config";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(routes),
    { provide: APP_CONFIG, useValue: F00DS_CONFIG }

  ],
};
