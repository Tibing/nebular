/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  InjectionToken,
  Input,
  Output,
} from '@angular/core';
import { convertToBoolProperty } from '../helpers';


/**
 * Token that provides `NbSelectComponent` for child options.
 * */
export const NB_SELECT = new InjectionToken('select');

@Component({
  selector: 'nb-option',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nb-checkbox *ngIf="withCheckbox" [(ngModel)]="selected">
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </nb-checkbox>

    <ng-container *ngIf="!withCheckbox">
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </ng-container>

    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class NbOptionComponent<T> {
  /**
   * Option value that will be fired on selection.
   * */
  @Input() value: T;

  @Input('disabled')
  set _disabled(disabled: boolean) {
    this.disabled = convertToBoolProperty(disabled);
  }

  /**
   * Fires value on click.
   * */
  @Output() selectionChange: EventEmitter<NbOptionComponent<T>> = new EventEmitter();

  selected: boolean = false;
  disabled: boolean = false;

  constructor(protected elementRef: ElementRef,
              @Inject(NB_SELECT) protected parent,
              protected cd: ChangeDetectorRef) {
  }

  /**
   * Determines should we render checkbox.
   * */
  get withCheckbox(): boolean {
    return this.multiple && !!this.value;
  }

  get content() {
    return this.elementRef.nativeElement.textContent;
  }

  get multiple() {
    return this.parent.multiple;
  }

  @HostBinding('class.selected')
  get selectedClass(): boolean {
    return this.selected;
  }

  @HostBinding('class.disabled')
  get disabledClass(): boolean {
    return this.disabled;
  }

  @HostListener('click')
  onClick() {
    this.selectionChange.emit(this);
  }

  select() {
    this.selected = true;
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  deselect() {
    this.selected = false;
    this.cd.markForCheck();
    this.cd.detectChanges();
  }
}
