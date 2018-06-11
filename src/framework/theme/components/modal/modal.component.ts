import { ChangeDetectorRef, Component, Input, TemplateRef, Type, ViewChild } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { NbPortalContent } from '../portal/portal-outlet';

@Component({
  selector: 'nb-modal',
  styleUrls: ['./modal.component.scss'],
  template: `
    <ng-container *ngIf="isTemplate">
      <ng-container *ngTemplateOutlet="content; context: context"></ng-container>
    </ng-container>
    <ng-container *ngIf="isComponent" [ngComponentOutlet]="content"></ng-container>
    <ng-container *ngIf="isPrimitive">
      <div class="primitive-popover">{{content}}</div>
    </ng-container>
  `,
  host: { '(click)': 'onClick($event)' },
})
export class NbModalComponent {

  /**
   * Content which will be rendered.
   * */
  @Input()
  content: NbPortalContent;

  /**
   * Context which will be passed to rendered component instance.
   * */
  @Input()
  context: Object;

  @Input()
  onClick: (any) => void;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  /**
   * If content type is TemplateRef we're passing context as template outlet param.
   * But if we have custom component content we're just assigning passed context to the component instance.
   * */
  @ViewChild(NgComponentOutlet)
  set componentOutlet(el) {
    if (this.isComponent) {
      Object.assign(el._componentRef.instance, this.context);
      /**
       * Change detection have to performed here, because another way applied context
       * will be rendered on the next change detection loop and
       * we'll have incorrect positioning. Because rendered component may change its size
       * based on the context.
       * */
      this.changeDetectorRef.detectChanges();
    }
  }

  /**
   * Check that content is a TemplateRef.
   *
   * @return boolean
   * */
  get isTemplate(): boolean {
    return this.content instanceof TemplateRef;
  }

  /**
   * Check that content is an angular component.
   *
   * @return boolean
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
