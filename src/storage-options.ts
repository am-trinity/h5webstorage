/**
 * Defines options used by the storage classes to determine how they will interact. This will be injected into any Storage classes
 * created with or after creation of the options. Here is a comon usage of StorageOptions:
 *
 *     import {Component} from "@angular/core";
 *     import {ConfigureStorage} from "h5webstorage";
 *
 *     @Component({
 * 	     providers:[ConfigureStorage({ prefix: ''})]
 *     })
 *     export class AppModule{}
 *
 *
 * {@link ConfigureStorage} creates a provider for your configuration options which is injected into the next Storage class instantiated.
 * Since these options were added to the 'AppModule', it will apply globally and all {@link LocalStorage} and {@link SessionStorage} will
 * have these options injected unless overridden by a new set of options.
 *
 * Remember, {@link https://angular.io angular2} has an injection heirarchy and multiple providers for one type can be created. Lets explore
 * how this might work. Using our example above, the prefix '/' is used on all keys for the entire application. This will prevent
 * h5websetorage from assuming it controls all the keys in storage. Let's also assume we have created a wrapper around the `LocalStorage`
 * object to apply business logic to the data and a subset of the keys needs to be read-only admin stuff. How can we set the values if the
 * wrapper of those values are read-only? Here is how I would solve this problem:
 *
 *     import {Component} from "@angular/core";
 *     import {LocalStorage, ConfigureStorage} from "h5webstorage";
 *     import {AppSettings} from "./myApp.settings";
 *     @Component({
 *     	providers: [LocalStorage, ConfigureStorage({ prefix: '/admin/'})]
 *     })
 *     export class AdminPanel{
 *     	constructor(localStorage: LocalStorage, settings: AppSettings){ ... }
 *     }
 *
 * Let me explain what just happened, AdminPanel is a component under AppModule. AppSettings is the global application setting that handles
 * business logic for the storage which has the read-only admin area. AppSettings can see all the application keys that begin with '/' so
 * that includes '/admin/'. AdminPanel takes advantage of the injection heirarcy in angular2 by asking for a new instance of `LocalStorage`.
 * If we stopped there, it would work the exact same way as the `LocalStorage` in AppSettings which is why there is a new `ConfigureStorage`
 * call in the providers array also. This will tell angular2 to inject these new options into the new `LocalStorage` instance which will be
 * scoped to only the '/admin/' keys. `LocalStorage` has no restrictions on which keys it can modify within its scope. Creating, updating,
 * modifying or deleting a key in `LocalStorage` within AdminPanel will reflect immediately in the AppSettings instance.
 */
export interface StorageOptions {
	/**
	 * A string that will proceed the key name in storage. By default, prefix is empty and allows all keys in storage to be accessed.
	 * By setting prefix to a non-empty value, the storage class becomes scoped to values whose keys begin with the specified prefix
	 * and all operations will stay within that scope.
	 */
	prefix?: string;

	/**
	 * Determines what to do when an exception occurs when loading from storage. Setting to true will cause the value retrieved
	 * to be serialized by the loaded transformer. Otherwise, the value will be set to null (default).
	 */
	serializeOnException?: boolean;
}
