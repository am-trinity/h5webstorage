import { Inject, Injectable, Optional, OpaqueToken, NgZone } from '@angular/core';
import { BaseStorageService, STORAGE_OPTIONS, SERDES_OBJECT } from './base-storage.service';
import { StorageOptions } from './storage-options';

/**
 * Token used to inject an object as the storage backend of the SessionStorage object. By default, the storage
 * backend is the native sessionStorage object but can be substituted to allow for testing or customized storage
 * like to remote storage.
 */
export let SESSION_STORAGE_OBJECT = new OpaqueToken('sessionstorage');

/**
 * Represent the native {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage sessionStorage} object.
 * Can be injected into a component that needs access to sessionStorage.
 */
@Injectable()
export class SessionStorageService extends BaseStorageService {
	constructor(ngZone: NgZone,
		@Inject(SESSION_STORAGE_OBJECT) storage: Storage,
		@Inject(SERDES_OBJECT) transformer: JSON,
		@Inject(STORAGE_OPTIONS) @Optional() options?: StorageOptions) {
		super(ngZone, storage, transformer, options);
	}
}
