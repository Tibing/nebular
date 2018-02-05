/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostBinding, Input, TemplateRef, Type } from '@angular/core';
import { NbPlacement } from './positioning.helper';
import { NbPopoverContent } from './popover.directive';

/**
 * Popover container.
 * Renders provided content inside.
 * */
@Component({
  selector: 'nb-popover',
  styleUrls: ['./popover.component.scss'],
  template: `
    <span class="arrow"></span>

    <ng-container *ngIf="isTemplate" [ngTemplateOutlet]="content"></ng-container>
    <ng-container *ngIf="isComponent" [ngComponentOutlet]="content"></ng-container>
    <ng-container *ngIf="isPrimitive">
      <div class="primitive-popover">{{content}}</div>
    </ng-container>
  `,
})
export class NbPopoverComponent {

  /**
   * Content which will be rendered.
   * */
  @Input()
  content: NbPopoverContent;

  /**
   * Popover calcPosition relatively directive host element.
   * Helps us draw chevron on correct place.
   * */
  @Input()
  @HostBinding('class')
  placement: NbPlacement = NbPlacement.TOP;

  @Input()
  @HostBinding('style.top.px')
  positionTop: number;

  @Input()
  @HostBinding('style.left.px')
  positionLeft: number;

  /**
   * Check that content is a TemplateRef.
   * */
  get isTemplate(): boolean {
    return this.content instanceof TemplateRef;
  }

  /**
   * Check that content is an angular component.
   * */
  get isComponent(): boolean {
    return this.content instanceof Type;
  }

  /**
   * Check that if content is not a TemplateRef or an angular component it means a primitive.
   * */
  get isPrimitive(): boolean {
    return !this.isTemplate && !this.isComponent;
  }
}