/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NbDateTimeUtil } from './service/date-time-util';
import { NbCalendarViewMode } from './model';

export abstract class NbBaseCalendarComponent<T> implements OnInit {

  @Input() date: T;

  @Output() dateChange = new EventEmitter<T>();

  @Output() activeMonthChange = new EventEmitter();

  today: Date;

  ViewMode = NbCalendarViewMode;

  activeMonth: Date;
  activeViewMode: NbCalendarViewMode = NbCalendarViewMode.DATE;
  activeYear: number;

  protected constructor(protected dateTimeUtil: NbDateTimeUtil) {
  }

  ngOnInit() {
    this.today = this.dateTimeUtil.createNowDate();
    this.activeMonth = this.getInitialActiveMonthFromValue() || this.today;
    this.activeYear = Math.ceil(this.dateTimeUtil.getYear(this.activeMonth) - 10);
  }

  setViewMode(viewMode: NbCalendarViewMode) {
    this.activeViewMode = viewMode;
  }

  setActiveMonth(activeMonth: Date) {
    this.activeMonth = activeMonth;
  }

  prevMonth() {
    this.changeActiveMonth(-1);
  }

  nextMonth() {
    this.changeActiveMonth(1);
  }

  prevYears() {
    this.activeYear -= 1;
  }

  nextYears() {
    this.activeYear += 1;
  }

  abstract onDateChange(date: Date);

  protected abstract getInitialActiveMonthFromValue(): Date;

  private changeActiveMonth(direction) {
    this.activeMonth = this.dateTimeUtil.add(this.activeMonth, direction, 'm');
    this.activeMonthChange.emit(this.activeMonth);
  }
}
