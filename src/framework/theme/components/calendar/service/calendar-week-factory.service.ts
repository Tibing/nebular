import { Injectable } from '@angular/core';

import { NbDateTimeUtil } from './date-time-util';
import { NbCalendarCell, NbCalendarMonthBuilderContext } from '../model';
import { batch, range } from '../helpers';
import { NbCalendarCellStateService } from './calendar-cell-state.service';
import { NbLocaleAdapter } from './locale-adapter';

@Injectable()
export class NbCalendarWeeksFactoryService<T> {


  constructor(protected localeAdapter: NbLocaleAdapter,
              protected cellStateService: NbCalendarCellStateService<T>) {
  }

  createWeeks(context: NbCalendarMonthBuilderContext<T>): NbCalendarCell[][] {
    const weeks = this.createDates(context);

    if (context.includeBoundingMonths) {
      this.addBoundingMonths(weeks, context);
    }

    return weeks.map(week => week.map((date: Date) => this.createCellWithState(date, context)));
  }

  private createDates(context: NbCalendarMonthBuilderContext<T>): Date[][] {
    const days = this.createDaysRange(context.activeMonth);
    const startOfWeekDayDiff = this.getStartOfWeekDayDiff(context.activeMonth);
    return batch(days, NbDateTimeUtil.DAYS_IN_WEEK, startOfWeekDayDiff);
  }

  private addBoundingMonths(weeks: Date[][], context: NbCalendarMonthBuilderContext<T>) {
    if (weeks[0].length < NbDateTimeUtil.DAYS_IN_WEEK) {
      const startOfWeekDayDiff = this.getStartOfWeekDayDiff(context.activeMonth);
      weeks[0].unshift(...this.createPrevBoundingDays(context.activeMonth, startOfWeekDayDiff));
    }
    if (weeks[weeks.length - 1].length < NbDateTimeUtil.DAYS_IN_WEEK) {
      weeks[weeks.length - 1].push(...this.createNextBoundingDays(context.activeMonth));
    }
  }

  private createCellWithState(date: Date, context: NbCalendarMonthBuilderContext<T>): NbCalendarCell {
    const cell = { date, state: [] };
    this.cellStateService.assignStates(cell, context);
    return cell;
  }

  private createDaysRange(activeMonth: Date): Date[] {
    const year = activeMonth.getFullYear();
    const month = activeMonth.getMonth();
    const daysInMonth: number = NbDateTimeUtil.getNumberOfDaysInMonth(activeMonth);
    return range(daysInMonth).map(i => NbDateTimeUtil.createDate(year, month, i + 1));
  }

  private createPrevBoundingDays(activeMonth: Date, startOffset: number): Date[] {
    const month = NbDateTimeUtil.addMonth(activeMonth, -1);
    const daysInMonth = NbDateTimeUtil.getNumberOfDaysInMonth(month);
    return this.createDaysRange(month).slice(daysInMonth - startOffset);
  }

  private createNextBoundingDays(activeMonth: Date): Date[] {
    const month = NbDateTimeUtil.addMonth(activeMonth, 1);
    const firstDay = NbDateTimeUtil.getMonthStart(month);
    const weekStartOffset = 7 - this.localeAdapter.getWeekStartDiff(firstDay);
    return this.createDaysRange(month).slice(0, weekStartOffset);
  }

  private getStartOfWeekDayDiff(date: Date): number {
    const startOfMonth = NbDateTimeUtil.getMonthStart(date);
    return this.localeAdapter.getWeekStartDiff(startOfMonth);
  }
}
