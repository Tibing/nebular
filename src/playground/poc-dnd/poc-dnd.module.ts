/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */


import { NgModule } from '@angular/core';

import { NbPocDNDComponent } from './poc-dnd.component';
import { RouterModule, Routes } from '@angular/router';
import { NbCardModule, NbLayoutModule } from '@nebular/theme';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: NbPocDNDComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NbPocDNDRoutingModule {
}

@NgModule({
  imports: [
    CommonModule,
    NbPocDNDRoutingModule,
    NbLayoutModule,
    NbCardModule,
    DragDropModule,
  ],
  exports: [],
  declarations: [NbPocDNDComponent],
  providers: [],
})
export class NbPocDNDModule {
}
