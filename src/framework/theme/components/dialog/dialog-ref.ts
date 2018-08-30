import { ComponentRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NbFocusTrap, NbFocusTrapFactoryService, NbOverlayRef } from '../cdk';
import { NbDialogConfig } from './dialog-config';


/**
 * The `NbDialogRef` helps to manipulate dialog after it was created.
 * The dialog can be dismissed by using `close` method of the dialogRef.
 * You can access rendered component as `content` property of the dialogRef.
 * `onBackdropClick` streams click events on the backdrop of the dialog.
 * */
export class NbDialogRef<T> {

  /**
   * Stream of backdrop click events.
   * */
  readonly onBackdropClick: Observable<MouseEvent>;
  protected alive: boolean = true;
  protected focusTrap: NbFocusTrap;
  protected componentRef: ComponentRef<T>;
  protected onClose$: Subject<any> = new Subject();
  readonly onClose: Observable<any> = this.onClose$.asObservable();

  constructor(protected overlayRef: NbOverlayRef,
              protected config: NbDialogConfig,
              protected document: Document,
              protected focusTrapFactory: NbFocusTrapFactoryService) {
    this.onBackdropClick = this.overlayRef.backdropClick();
  }

  set content(componentRef: ComponentRef<T>) {
    this.componentRef = componentRef;
  }

  get componentInstance(): T {
    return this.componentRef.instance;
  }

  /**
   * Hides dialog.
   * */
  close(res?: any) {
    this.alive = false;
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.onClose$.next(res);
  }
}
