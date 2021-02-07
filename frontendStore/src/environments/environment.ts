// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Role } from "src/app/entity/Role";

export const environment = {
  production: false,
  stripe_key: 'pk_test_51IFiXoAE6Ixp3fxxIVwgn4XHav4gOoAZk0gC5IJylVU01Ul9ABwRLhs13nA6lEo3fZkonyKy1YsjySFODOqdqtKL00PXOmBSr9'
};
export const apiUrl = '//localhost:8080/api/auth';
export const storeUrl = '//localhost:8080/api/store';
export const adminUrl ='//localhost:8080/api/admin';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
