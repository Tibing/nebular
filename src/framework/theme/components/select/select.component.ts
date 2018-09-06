/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  Component,
  ComponentRef,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';

import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbOverlayRef,
  NbOverlayService,
  NbPortalDirective,
  NbPosition,
  NbPositionBuilderService,
  NbTrigger,
  NbTriggerStrategy,
  NbTriggerStrategyBuilder,
} from '../cdk';
import { defer, merge, Observable } from 'rxjs';
import { NB_SELECT, NbOptionComponent } from './option.component';
import { NB_DOCUMENT } from '../../theme.options';
import { convertToBoolProperty } from '../helpers';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'nb-select-label',
  template: '<ng-content></ng-content>',
})
export class NbSelectLabelComponent {
}

@Component({
  selector: 'nb-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    { provide: NB_SELECT, useExisting: NbSelectComponent },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NbSelectComponent),
      multi: true,
    },
  ],
})
export class NbSelectComponent<T> implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  /**
   * Select size, available sizes:
   * `xxsmall`, `xsmall`, `small`, `medium`, `large`
   */
  @Input() size: string;

  /**
   * Select status (adds specific styles):
   * `primary`, `info`, `success`, `warning`, `danger`
   */
  @Input() status: string = 'primary';

  /**
   * Select shapes: `rectangle`, `round`, `semi-round`
   */
  @Input() shape: string;

  /**
   * Adds `hero` styles
   */
  @Input() hero: boolean;

  /**
   * Disables the select
   */
  @Input() disabled: boolean;

  /**
   * If set element will fill its container
   */
  @Input() fullWidth: boolean;

  /**
   * Adds `outline` styles
   */
  @Input() outline: boolean;

  /**
   * Renders select placeholder if nothing selected.
   * */
  @Input() placeholder: string = '';

  /**
   * Will be emitted when selected value changes.
   * */
  @Output() selectedChange: EventEmitter<T | T[]> = new EventEmitter();

  /**
   * Accepts selected item or array of selected items.
   * */
  @Input('selected')
  set _selected(value: T | T[]) {
    this.writeValue(value);
  }

  /**
   * Gives capability just write `multiple` over the element.
   * */
  @Input('multiple')
  set _multiple(multiple: boolean) {
    this.multiple = convertToBoolProperty(multiple);
  }

  /**
   * List of `NbOptionComponent`'s components passed as content.
   * TODO maybe it would be better provide wrapper
   * */
  @ContentChildren(NbOptionComponent, { descendants: true }) options: QueryList<NbOptionComponent<T>>;

  /**
   * Custom select label, will be rendered instead of default enumeration with coma.
   * */
  @ContentChild(NbSelectLabelComponent) customLabel;

  /**
   * NbCard with options content.
   * */
  @ViewChild(NbPortalDirective) portal: NbPortalDirective;

  multiple: boolean = false;

  /**
   * List of selected options.
   * */
  selectionModel: NbOptionComponent<T>[] = [];

  positionStrategy: NbAdjustableConnectedPositionStrategy;

  /**
   * Current overlay position because of we have to toggle overlayPosition
   * in [ngClass] direction and this directive can use only string.
   */
  overlayPosition: NbPosition = '' as NbPosition;

  /**
   * Stream of events that will fire when one of the options fire selectionChange event.
   * */
  selectionChange: Observable<NbOptionComponent<T>> = defer(() => {
    return merge(...this.options.map(it => it.selectionChange));
  });

  ref: NbOverlayRef;

  /**
   * Function passed through control value accessor to propagate changes.
   * */
  protected onChange: Function = () => {};

  constructor(@Inject(NB_DOCUMENT) protected document,
              protected overlay: NbOverlayService,
              protected hostRef: ElementRef,
              protected positionBuilder: NbPositionBuilderService) {
  }

  /**
   * Determines is select opened.
   * */
  get isOpened(): boolean {
    return this.ref && this.ref.hasAttached();
  }

  /**
   * Returns width of the select button.
   * */
  get hostWidth(): number {
    return this.hostRef.nativeElement.getBoundingClientRect().width;
  }

  /**
   * Content rendered in the label.
   * */
  get selectionView() {
    if (!this.selectionModel.length) {
      return this.placeholder;
    }

    if (this.selectionModel.length > 1) {
      return this.selectionModel.map((option: NbOptionComponent<T>) => option.content).join(', ');
    }

    return this.selectionModel[0].content;
  }

  ngOnInit() {
    this.createOverlay();
  }

  ngAfterViewInit() {
    this.subscribeOnTriggers();
    this.subscribeOnPositionChange();
    this.subscribeOnSelectionChange();
  }

  ngOnDestroy() {
    this.ref.dispose();
  }

  show() {
    if (this.isOpened) {
      return;
    }

    this.ref.attach(this.portal);
  }

  hide() {
    if (this.isOpened) {
      this.ref.detach();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: T | T[]): void {
    if (!value) {
      return;
    }

    if (this.options) {
      this.setSelection(value);
    }
  }

  /**
   * Selects option or clear all selected options if value is null.
   * */
  protected handleSelect(option: NbOptionComponent<T>) {
    if (option.value) {
      this.selectOption(option);
    } else {
      this.reset();
    }
  }

  /**
   * Deselect all selected options.
   * */
  protected reset() {
    this.selectionModel.forEach((option: NbOptionComponent<T>) => option.deselect());
    this.selectionModel = [];
    this.hide();
    this.emitSelected(null);
  }

  /**
   * Determines how to select option as multiple or single.
   * */
  protected selectOption(option: NbOptionComponent<T>) {
    if (this.multiple) {
      this.handleMultipleSelect(option);
    } else {
      this.handleSingleSelect(option);
    }
  }

  /**
   * Select single option.
   * */
  protected handleSingleSelect(option: NbOptionComponent<T>) {
    const selected = this.selectionModel.pop();

    if (selected && selected !== option) {
      selected.deselect();
    }

    this.selectionModel = [option];
    option.select();
    this.hide();

    this.emitSelected(option.value);
  }

  /**
   * Select for multiple options.
   * */
  protected handleMultipleSelect(option: NbOptionComponent<T>) {
    if (option.selected) {
      this.selectionModel = this.selectionModel.filter(s => s.value !== option.value);
      option.deselect();
    } else {
      this.selectionModel.push(option);
      option.select();
    }

    this.emitSelected(this.selectionModel.map((opt: NbOptionComponent<T>) => opt.value));
  }

  protected createOverlay() {
    const scrollStrategy = this.createScrollStrategy();
    this.positionStrategy = this.createPositionStrategy();
    this.ref = this.overlay.create({ positionStrategy: this.positionStrategy, scrollStrategy });
  }

  protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy {
    return this.positionBuilder
      .connectedTo(this.hostRef)
      .position(NbPosition.BOTTOM)
      .offset(0)
      .adjustment(NbAdjustment.VERTICAL);
  }

  protected createScrollStrategy() {
    return this.overlay.scrollStrategies.block();
  }

  protected subscribeOnTriggers() {
    const triggerStrategy: NbTriggerStrategy = new NbTriggerStrategyBuilder()
      .document(this.document)
      .trigger(NbTrigger.CLICK)
      .host(this.hostRef.nativeElement)
      .container(() => this.getContainer())
      .build();

    triggerStrategy.show$.subscribe(() => this.show());
    triggerStrategy.hide$.subscribe(() => this.hide());
  }

  protected subscribeOnPositionChange() {
    this.positionStrategy.positionChange
      .subscribe((position: NbPosition) => this.overlayPosition = position);
  }

  protected subscribeOnSelectionChange() {
    this.selectionChange.subscribe((option: NbOptionComponent<T>) => this.handleSelect(option));
  }

  protected getContainer() {
    return this.ref && this.ref.hasAttached() && <ComponentRef<any>> {
      location: {
        nativeElement: this.ref.overlayElement,
      },
    };
  }

  /**
   * Propagate selected value.
   * */
  protected emitSelected(selected: T | T[]) {
    this.onChange(selected);
    this.selectedChange.emit(selected);
  }

  /**
   * Set selected value in model.
   * */
  protected setSelection(value: T | T[]) {
    const isArray: boolean = Array.isArray(value);

    if (this.multiple && !isArray) {
      throw new Error('Can\'t assign single value if select is marked as multiple');
    }

    if (!this.multiple && isArray) {
      throw new Error('Can\'t assign array if select is not marked as multiple');
    }

    if (isArray) {
      (<T[]> value).forEach((option: T) => this.selectValue(option));
    } else {
      this.selectValue(<T> value);
    }
  }

  /**
   * Selects value.
   * */
  protected selectValue(value: T) {
    const corresponding = this.options.find((option: NbOptionComponent<T>) => option.value === value);
    corresponding.select();
  }
}
