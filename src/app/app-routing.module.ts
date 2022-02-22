/**
 * @module app-routing
 * This is where the router is loaded and configured.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // imported for routing functionality

/**
 * Defined routes are assigned to a constant variable
 */

const routes: Routes = [];

/**
 * Routes arrays are established for routes within @NgModule decorator, which determines template compiling at runtime
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }