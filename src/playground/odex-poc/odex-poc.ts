/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, Component, ComponentRef, ElementRef, Injectable, Input } from '@angular/core';
import { NbCalendarRangeDayCellComponent } from '@nebular/theme/components/calendar/calendar-range-cells';
import {
  NbCalendarMonthModelService,
  NbCalendarRange,
  NbComponentPortal,
  NbDateService,
  NbOverlay,
  NbOverlayRef,
} from '@nebular/theme';
import { fromEvent, Observable, Subject } from 'rxjs';
import { OverlayPositionBuilder } from '@angular/cdk/overlay';
import { takeWhile } from 'rxjs/operators';

@Injectable()
export class NbCalendarCommunicatorService {
  protected mouseUp$: Subject<any> = new Subject();
  readonly mouseUp: Observable<any> = this.mouseUp$.asObservable();
  protected mouseDown$: Subject<any> = new Subject();
  readonly mouseDown: Observable<any> = this.mouseDown$.asObservable();

  onMouseDown(data: any) {
    this.mouseDown$.next(data);
  }

  onMouseUp(date: Date) {
    this.mouseUp$.next(date);
  }
}

@Component({
  selector: 'nb-calendar-custom-range-day-cell',
  styles: [`
    :host {
      text-align: center;
    }

    div {
      user-select: none;
    }

    span {
      font-size: 75%;
      opacity: 0.75;
    }
  `],
  template: `
    <div
      class="day-cell"
      [class.today]="today"
      [class.selected]="selected"
      [class.bounding-month]="boundingMonth"
      [class.start]="start"
      [class.end]="end"
      [class.in-range]="inRange"
      [class.disabled]="disabled">
      {{ day }}
    </div>
  `,
  host: {
    '(mousedown)': 'onMouseDown()',
    '(mouseup)': 'onMouseUp()',
    'class': 'range-cell',
  },
})
export class NbCalendarCustomRangeDayCellComponent extends NbCalendarRangeDayCellComponent<Date> {
  constructor(protected communicator: NbCalendarCommunicatorService,
              protected dateService: NbDateService<Date>,
              protected el: ElementRef) {
    super(dateService);
  }

  onMouseDown() {
    this.communicator.onMouseDown({
      date: this.date,
      el: this.el.nativeElement,
    });
  }

  onMouseUp() {
    this.communicator.onMouseUp(this.date);
  }
}

@Component({
  selector: 'nb-draggable-range',
  styles: [`:host {
    cursor: move;
    position: absolute;
  }`],
  template: `
    <nb-card>
      <nb-card-body>
        <nb-calendar-picker-row [row]="row" [component]="comp" [selectedValue]="selectedValue"></nb-calendar-picker-row>
      </nb-card-body>
    </nb-card>
  `,
  host: {
    '[style.top.px]': 'top',
    '[style.left.px]': 'left',
  },
})
export class NbDraggableRangeComponent {
  @Input() row: Date[];
  @Input() selectedValue: NbCalendarRange<Date>;
  top: number;
  left: number;
  comp = NbCalendarRangeDayCellComponent;
}

@Component({
  selector: 'nb-odex-poc',
  template: `
    <nb-calendar-range [(range)]="range" [dayCellComponent]="dayCell"
                       size="large"></nb-calendar-range>
  `,
  entryComponents: [NbCalendarCustomRangeDayCellComponent, NbDraggableRangeComponent],
  providers: [NbCalendarCommunicatorService],
})
export class NbOdexPocComponent implements AfterViewInit {
  range: NbCalendarRange<Date> = {
    start: new Date(),
    end: new Date(2018, 8, 21),
  };
  dayCell = NbCalendarCustomRangeDayCellComponent;
  ref: NbOverlayRef;
  protected active: Date;
  protected draggable: ComponentRef<any>;

  constructor(protected dateService: NbDateService<Date>,
              protected communicator: NbCalendarCommunicatorService,
              protected overlay: NbOverlay,
              protected monthModel: NbCalendarMonthModelService<Date>,
              protected posBuilder: OverlayPositionBuilder) {
    this.communicator.mouseDown.subscribe(date => this.handleDown(date));
    this.communicator.mouseUp.subscribe(this.handleUp.bind(this));
  }

  ngAfterViewInit(): void {
    if (this.range && this.range.start && this.range.end) {
      this.range = {
        start: this.dateService.addDay(this.range.start, 7),
        end: this.dateService.addDay(this.range.end, 7),
      }
    }
  }

  protected handleDown({ date, el }) {
    if (this.range && this.range.start && this.range.end
      && this.dateService.isBetween(date, this.range.start, this.range.end)) {
      // build overlay
      this.active = date;
      this.ref = this.overlay.create();
      this.draggable = this.ref.attach(new NbComponentPortal(NbDraggableRangeComponent));
      this.draggable.instance.row = this.rowSlice(date);
      this.draggable.instance.selectedValue = this.range;

      // drag
      fromEvent(document, 'mousemove')
        .pipe(takeWhile(() => !!this.active))
        .subscribe((e: MouseEvent) => {
          this.draggable.instance.left = e.screenX;
          this.draggable.instance.top = e.screenY;
          this.draggable.changeDetectorRef.detectChanges();
        });
    }
  }

  // destroy
  protected handleUp(date: Date) {
    this.draggable.destroy();
    this.ref.detach();
    this.ref.dispose();
    this.range = {
      start: this.dateService.addDay(date,
        this.dateService.getDate(this.range.start) - this.dateService.getDate(this.active)),
      end: this.dateService.addDay(date,
        this.dateService.getDate(this.range.end) - this.dateService.getDate(this.active)),
    };
    this.active = null;
  }

  protected rowSlice(date: Date): Date[] {
    const daysGrid: Date[][] = this.monthModel.createDaysGrid(date);
    const activeRow: Date[] = daysGrid.find((row: Date[]) =>
      !!row.filter((day: Date) => this.dateService.isSameDaySafe(day, date)).length);
    return activeRow.slice(
      activeRow.findIndex((day: Date) => this.dateService.isSameDaySafe(day, this.range.start)),
      activeRow.findIndex((day: Date) => this.dateService.isSameDaySafe(day, this.range.end)),
    );
  }
}
