import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { NbToastComponent } from './toast.component';
import { NB_TOAST_RIGHT_POSITIONS } from './toastr-position.service';
import { NbToast, NbToastPosition } from './model';


const voidState = style({
  transform: 'translateX({{ direction }}110%)',
  height: 0,
  margin: 0,
});

const defaultOptions = { params: { direction: '' } };

@Component({
  selector: 'nb-toastr-container',
  template: `
    <nb-toast [@fadeIn]="fadeIn" *ngFor="let toast of content" [toast]="toast"></nb-toast>`,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [voidState, animate(100)], defaultOptions),
      transition(':leave', [animate(100, voidState)], defaultOptions),
    ]),
  ],
})
export class NbToastrContainerComponent implements OnInit {
  @Input()
  content: NbToast[] = [];

  @Input()
  context: Object;

  @Input()
  position: NbToastPosition;

  @ViewChildren(NbToastComponent)
  toasts: QueryList<NbToastComponent>;

  fadeIn;

  ngOnInit(): void {
    const direction = NB_TOAST_RIGHT_POSITIONS.includes(this.position) ? '' : '-';
    this.fadeIn = { value: '', params: { direction } };
  }
}