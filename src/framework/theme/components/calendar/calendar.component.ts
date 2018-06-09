/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NbDateTimeUtil } from './service/date-time-util.interface';

const ViewMode = {
  year: 'year',
  month: 'month',
  date: 'date',
};

const defaultStartYear = 2016;
const defaultYearCount = 20;

/**
 */
@Component({
  selector: 'nb-calendar',
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbCalendarComponent),
    multi: true,
  }],
})
export class NbCalendarComponent<D> implements ControlValueAccessor, OnInit {

  @Input('value') _value: D = null;
  
  @Input()
  boundingMonths: boolean = false;

  newValue: D;

  currentDate: D;
  
  ViewMode = ViewMode;
  viewMode = ViewMode.date;
  
  startYear = defaultStartYear;
  yearCount = defaultYearCount;

  constructor(private dateTimeUtil: NbDateTimeUtil<D>) {
  }

  ngOnInit() {
    this.currentDate = this.dateTimeUtil.createNowDate();
    this.newValue = this.value || this.currentDate;
  }

  prevMonth() {
    this.newValue = this.dateTimeUtil.add(this.newValue, -1, 'm');
  }

  nextMonth() {
    this.newValue = this.dateTimeUtil.add(this.newValue, 1, 'm');
  }
  
  prevYears() {
    this.startYear -= defaultYearCount;
  }
  
  nextYears() {
    this.startYear += defaultYearCount;
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this._value;
  }

  set value(val: D) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(val: D) {
    this.value = val;
  }
}