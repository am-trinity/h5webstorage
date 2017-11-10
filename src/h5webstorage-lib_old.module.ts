import { NgModule, Provider } from '@angular/core';
import { STORAGE_OPTIONS, SERDES_OBJECT } from './base-storage.service';
import { LocalStorageService, LOCAL_STORAGE_OBJECT } from './local-storage.service';
import { SessionStorageService, SESSION_STORAGE_OBJECT } from './session-storage.service';
import { StorageOptions } from './storage-options';

/**
 * Makes the  LocalStorage and SessionStorage objects available throught the application. Should be
 * added to the RootModule imports list.
 */
@NgModule({})
export class WebStorageModule {
  static forRoot() {
    return {
      ngModule: WebStorageModule,
      providers: [
        LocalStorageService, SessionStorageService,
        { provide: LOCAL_STORAGE_OBJECT, useValue: localStorage },
        { provide: SESSION_STORAGE_OBJECT, useValue: sessionStorage },
        { provide: SERDES_OBJECT, useValue: { stringify: JSON.stringify, parse: JSON.parse } },
        ConfigureStorage({ prefix: '' })
      ]
    };
  }
}

/**
 * Creates a provider for the StorageOptions
 * @param options - A {@link StorageOptions} object
 */
export function ConfigureStorage(options: StorageOptions): Provider {
  return { provide: STORAGE_OPTIONS, useValue: options };
}



