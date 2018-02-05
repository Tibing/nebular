/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, TemplateRef,
  Type,
} from '@angular/core';
import { NbPlacement, NbPositioningHelper } from './positioning.helper';
import { NbPopoverComponent } from './popover.component';
import { NbThemeService } from '../../services/theme.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { NbPosition, NbAdjustmentHelper, NbAdjustment } from './adjustment.helper';
import { NbPopoverMode, NbTriggerHelper } from './trigger.helper';

/**
 * Popover can be one of the following types:
 * template, component or plain js string.
 * So NbPopoverContent provides types alias for this purposes.
 * */
export type NbPopoverContent = string | TemplateRef<any> | Type<any>;

/**
 * Powerful popover directive.
 *
 * @example popover can accept different content {@link NbPopoverContent}
 * and render it in the {@link NbPopoverComponent} such as:
 * TemplateRef
 * ```
 * <button [nbPopover]="templateRef"></button>
 * <ng-template #templateRef>
 *   <span>Hello, Popover!</span>
 * </ng-template>
 * ```
 *
 * Any components
 * ```
 * <button [nbPopover]="NbCardComponent"></button>
 * ```
 *
 * Just strings
 * ```
 * <button [nbPopover]="'Hello, Popover!'"></button>
 * ```
 *
 * @example moreover popover has different placements, such as: top, bottom, left and right
 * which can be used as following:
 * ```
 * <button [nbPopover]="'Hello, Popover!'" [nbPopoverPlacement]="'left'"></button>
 * ```
 * */
@Directive({ selector: '[nbPopover]' })
export class NbPopoverDirective implements OnInit, OnDestroy {

  /**
   * Popover content which will be rendered in {@link NbPopoverComponent}.
   * see {@link NbPopoverContent}
   * */
  @Input('nbPopover')
  content: NbPopoverContent;

  /**
   * Position will be calculated relatively host element based on the placement.
   * see {@link NbPlacement}
   * */
  @Input('nbPopoverPlacement')
  placement: NbPlacement = NbPlacement.TOP;

  /**
   * Container placement will be changes automatically based on this strategy if container can't fit view port.
   * Set this property to null if you want to disable automatically adjustment.
   * see {@link NbAdjustment} {@link NbAdjustmentHelper}
   * */
  @Input('nbPopoverAdjust')
  adjustment: NbAdjustment = NbAdjustment.CLOCKWISE;

  /**
   * Describes when the container will be shown.
   * Available options for now: 'click' and 'hover'
   * see {@link NbPopoverMode}
   * */
  @Input('nbPopoverMode')
  mode: NbPopoverMode = NbPopoverMode.CLICK;

  /**
   * Returns true if popover already shown.
   * @return boolean
   * */
  get isShown(): boolean {
    return !!this.containerRef;
  }

  /**
   * Returns true if popover hidden.
   * @return boolean
   * */
  get isHidden(): boolean {
    return !this.containerRef;
  }

  /**
   * Is used for unsubscribe all subscriptions after component destructuring.
   * */
  private alive: boolean = true;

  private containerRef: ComponentRef<NbPopoverComponent>;

  private get container(): NbPopoverComponent {
    return this.containerRef.instance;
  }

  private get containerElement(): HTMLElement {
    return this.containerRef.location.nativeElement;
  }

  private get hostElement(): HTMLElement {
    return this.hostRef.nativeElement;
  }

  constructor(private hostRef: ElementRef, private themeService: NbThemeService) {
  }

  ngOnInit() {
    this.registerTriggers();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  /**
   * Show popover if it is hidden.
   * */
  show() {
    if (this.isHidden) {
      this.renderPopover();
    }
  }

  /**
   * Hide popover if it's shown.
   * */
  hide() {
    if (this.isShown) {
      this.destroyPopover();
    }
  }

  /**
   * Toggle popover state.
   * */
  toggle() {
    if (this.isShown) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Adjust popover position on window resize.
   * Window resize may change host element position, so popover relocation required.
   *
   * TODO
   * Fix tslint to add capability make HostListener private.
   * */
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.isShown) {
      this.place();
    }
  }

  /**
   * Subscribe to the popover triggers created from the {@link NbPopoverDirective#mode}.
   * see {@link NbTriggerHelper}
   * */
  private registerTriggers() {
    const { open, close } = NbTriggerHelper.createTrigger(this.hostElement, () => this.containerRef, this.mode);

    open.pipe(takeWhile(() => this.alive))
      .subscribe(() => this.toggle());

    close.pipe(takeWhile(() => this.alive))
      .subscribe(() => this.hide());
  }

  /**
   * Renders popover putting {@link NbPopoverComponent} in the top of {@link NbLayoutComponent}
   * and positioning container based on {@link NbPopoverDirective#placement}
   * and {@link NbPopoverDirective#adjustment}.
   * */
  private renderPopover() {
    this.themeService.appendToLayoutTop(NbPopoverComponent)
      .pipe(takeWhile(() => this.alive))
      .subscribe((containerRef: ComponentRef<NbPopoverComponent>) => {
        this.containerRef = containerRef;
        this.patchPopoverContent(this.content);
        /**
         * Have to call detectChanges because on this phase {@link NbPopoverComponent} isn't inserted in the DOM
         * and haven't got calculated size.
         * But we should have size on this step to calculate popover position correctly.
         *
         * TODO
         * I don't think we have to call detectChanges each time we're using {@link NbThemeService#appendToLayoutTop}.
         * Investigate, maybe we can create method in the {@link NbThemeService}
         * which will call {@link NbThemeService#appendToLayoutTop} and 'do' detectChanges,
         * instead of performing this call by service client.
         * */
        this.containerRef.changeDetectorRef.detectChanges();
        this.place();
      });
  }

  /**
   * Destroys the {@link NbPopoverComponent} and nullify its reference;
   * */
  private destroyPopover() {
    this.containerRef.destroy();
    this.containerRef = null;
  }

  /**
   * Moves {@link NbPopoverComponent} relatively host component based on the {@link NbPopoverDirective#placement}.
   * */
  private place() {
    const hostRect = this.hostElement.getBoundingClientRect();
    const containerRect = this.containerElement.getBoundingClientRect();

    this.adjust(containerRect, hostRect);
  }

  /**
   * Set container content.
   * */
  private patchPopoverContent(content: NbPopoverContent) {
    this.container.content = content;
  }

  /**
   * Set container placement.
   * */
  private patchPopoverPlacement(placement: NbPlacement) {
    this.container.placement = placement;
  }

  /**
   * Set container position.
   * */
  private patchPopoverPosition({ top: top, left: left }) {
    this.container.positionTop = top;
    this.container.positionLeft = left;
  }

  /**
   * Calculates container adjustment and sets container position and placement.
   * */
  private adjust(containerRect: ClientRect, hostRect: ClientRect) {
    const { placement, position } = this.performAdjustment(containerRect, hostRect);

    this.patchPopoverPlacement(placement);
    this.patchPopoverPosition(position);
  }

  /**
   * Checks if {@link NbPopoverDirective#adjustment} can be performed and runs it.
   * If not, just calculates element position.
   * */
  private performAdjustment(placed: ClientRect, host: ClientRect): NbPosition {
    if (this.adjustment) {
      return this.calcAdjustment(placed, host);
    }

    return this.calcPosition(placed, host);
  }

  /**
   * Calculate adjustment.
   * see {@link NbAdjustmentHelper}.
   * */
  private calcAdjustment(placed: ClientRect, host: ClientRect): NbPosition {
    return NbAdjustmentHelper.adjust(placed, host, this.placement, this.adjustment)
  }

  /**
   * Calculate position.
   * see {@link NbPositioningHelper}
   * */
  private calcPosition(placed: ClientRect, host: ClientRect): NbPosition {
    return {
      position: NbPositioningHelper.calcPosition(placed, host, this.placement),
      placement: this.placement,
    }
  }
}