/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import {
  FormStyle,
  getLocaleDayNames,
  getLocaleFirstDayOfWeek,
  getLocaleMonthNames,
  TranslationWidth,
} from '@angular/common';


@Injectable()
export class NbLocaleService {
  protected locale: string;

  constructor(@Inject(LOCALE_ID) locale: string) {
    this.locale = locale;
  }

  /**
   * returns first day of the week, it can be 1 if week starts from monday
   * and 0 if from sunday and so on.
   * */
  getFirstDayOfWeek(): number {
    return getLocaleFirstDayOfWeek(this.locale);
  }

  getMonthName(date: Date): string {
    const index: number = date.getMonth();
    return this.getMonthNameByIndex(index);
  }

  getMonthNameByIndex(index: number): string {
    return getLocaleMonthNames(this.locale, FormStyle.Format, TranslationWidth.Abbreviated)[index];
  }

  getDayOfWeekNames(): string[] {
    return getLocaleDayNames(this.locale, FormStyle.Format, TranslationWidth.Narrow);
  }

}