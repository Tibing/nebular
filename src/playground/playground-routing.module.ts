/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbPlaygroundComponent } from './playground.component';

import { NbPopoverExampleComponent } from './popover';
import { NbSearchComponent, NbSearchCustomizedComponent } from './search';


export const routes: Routes = [
  {
    path: '',
    component: NbPlaygroundComponent,
    children: [
      {
        path: 'popover/popover-example.component',
        component: NbPopoverExampleComponent,
      },
      {
        path: 'search',
        component: NbSearchComponent,
      },
      {
        path: 'search-2',
        component: NbSearchCustomizedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NbPlaygroundRoutingModule {
}
