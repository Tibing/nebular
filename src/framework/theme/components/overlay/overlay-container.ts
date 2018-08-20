import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';


@Injectable()
export class NbOverlayContainer extends OverlayContainer {
  protected _createContainer(): void {
    const container = this._document.createElement('div');

    container.classList.add('cdk-overlay-container');
    this._document.querySelector('nb-layout').appendChild(container);
    this._containerElement = container;
  }
}
