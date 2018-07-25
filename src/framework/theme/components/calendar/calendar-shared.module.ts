/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';


import { NbLocaleAdapter } from './service/locale-adapter';
import { NbNativeLocaleAdapter } from './service/native-locale-adapter';
import { NbDateTimeUtil } from './service/date-time-util';

import {
  NbCalendarCellComponent,
  NbCalendarDatePipe,
  NbCalendarDaysNamesComponent,
  NbCalendarHeaderComponent,
  NbCalendarMonthPickerComponent,
  NbCalendarMonthViewComponent,
  NbCalendarNavigationComponent,
  NbCalendarPageableNavigationComponent,
  NbCalendarWeekComponent,
  NbCalendarYearPickerComponent,
} from './components';


const NB_CALENDAR_PROVIDERS = [
  NbDateTimeUtil,
  { provide: NbLocaleAdapter, useClass: NbNativeLocaleAdapter },
];

const COMPONENTS = [
  NbCalendarHeaderComponent,
  NbCalendarNavigationComponent,
  NbCalendarPageableNavigationComponent,
  NbCalendarDaysNamesComponent,
  NbCalendarWeekComponent,
  NbCalendarYearPickerComponent,
  NbCalendarMonthPickerComponent,
  NbCalendarMonthViewComponent,
  NbCalendarCellComponent,
];

const PIPES = [
  NbCalendarDatePipe,
];

@NgModule({
  imports: [NbSharedModule],
  exports: [...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
  providers: [...NB_CALENDAR_PROVIDERS],
})
export class NbCalendarSharedModule {

}
