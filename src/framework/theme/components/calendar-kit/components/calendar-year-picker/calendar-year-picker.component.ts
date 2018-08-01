/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, Type } from '@angular/core';
import { batch, range } from '../../helpers';
import { NbCalendarCell } from '../calendar-cell';
import { NbCalendarYearCellComponent } from './calendar-year-cell.component';


const defaultYearCount = 20;

@Component({
  selector: 'nb-calendar-year-picker',
  template: `
    <nb-calendar-picker
      class="year-cell"
      [data]="years"
      [selectedValue]="value"
      [cellComponent]="cellComponent"
      (select)="onSelect($event)">
    </nb-calendar-picker>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarYearPickerComponent<T> implements OnChanges {

  @Input() value: Date;

  @Input('cellComponent')
  set _cellComponent(cellComponent: Type<NbCalendarCell<T>>) {
    if (cellComponent) {
      this.cellComponent = cellComponent;
    }
  }
  cellComponent: Type<NbCalendarCell<any>> = NbCalendarYearCellComponent;

  @Output() valueChange = new EventEmitter<Date>();

  years: Date[][];

  ngOnChanges() {
    this.initYears();
  }

  initYears() {
    const selectedYear = this.value.getFullYear();
    const startYear = Math.ceil(selectedYear - defaultYearCount / 2);
    const years = range(defaultYearCount).map(i => this.createYearDateByIndex(i + startYear));
    this.years = batch(years, 4);
  }

  onSelect(year) {
    this.value = year;
    this.valueChange.emit(year);
  }

  private createYearDateByIndex(i: number): Date {
    return new Date(i, this.value.getMonth(), this.value.getDate());
  }
}
