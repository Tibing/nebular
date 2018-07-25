/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

import { NbDateTimeUtil } from './service/date-time-util';
import { NbCalendarWeeksFactoryService } from './service/calendar-week-factory.service';
import { NbBaseCalendarComponent } from './base-calendar.component';
import { NbCalendarCellStateService, NbCalendarBaseCellStateService  } from './service';

/**
 * Basic example with including bounding dates
 * @stacked-example(Calendar Date Picker, calendar/calendar-test.component)
 *
 * Example with range selection
 * @stacked-example(Calendar Date Range Picker, calendar/calendar-range-test.component)
 *
 * @styles
 *
 * calendar-width:
 * calendar-height:
 * calendar-padding:
 * calendar-fg:
 * calendar-bg:
 * calendar-selected-item:
 * calendar-active-item:
 * calendar-between-item:
 * calendar-hovered-item:
 * calendar-inactive-opacity:
 * calendar-cell-width:
 * calendar-cell-height:
 * calendar-month-cell-width:
 * calendar-month-cell-height:
 * calendar-year-cell-width:
 * calendar-year-cell-height:
 * calendar-border-radius:
 * calendar-row-padding:
 * calendar-weekday-width:
 * calendar-weekday-height:
 * calendar-weekday-font-size:
 * calendar-weekday-font-weight:
 * calendar-weekday-fg:
 * calendar-holiday-fg:
 *
 */
@Component({
  selector: 'nb-calendar',
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html',
  providers: [
    NbCalendarWeeksFactoryService,
    { provide: NbCalendarCellStateService, useClass: NbCalendarBaseCellStateService },
  ],
})
export class NbCalendarComponent extends NbBaseCalendarComponent<Date> {

  constructor(dateTimeUtil: NbDateTimeUtil) {
    super(dateTimeUtil);
  }

  onDateChange(date: Date) {
    this.date = date;
    this.dateChange.emit(date);
  }

  protected getInitialActiveMonthFromValue(): Date {
    return this.date;
  }
}
