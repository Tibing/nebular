/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { fromEvent } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { range } from '@nebular/theme/components/calendar-kit/helpers';

const BREAKPOINTS = 12;
const BREAKPOINT_WIDTH = Math.floor(window.innerWidth / BREAKPOINTS);
const BREAKPOINT_HEIGHT = Math.floor(window.innerHeight / BREAKPOINTS);

@Component({
  selector: 'nb-poc-dnd',
  styleUrls: ['./poc-dnd.component.scss'],
  templateUrl: 'poc-dnd.component.html',
})

export class NbPocDNDComponent {
  items = range(12);

  onDropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  addItem() {
    this.items.push(this.items.length);
  }

  startResize(e) {
    e.stopPropagation();
    e.preventDefault();

    const item: HTMLElement = e.target.parentElement.parentElement;
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = parseInt(document.defaultView.getComputedStyle(item).width, 10);
    const startHeight = parseInt(document.defaultView.getComputedStyle(item).height, 10);
    let alive = true;

    fromEvent(document, 'mousemove')
      .pipe(takeWhile(() => alive))
      .subscribe(event => {
        // @ts-ignore
        item.style.width = (startWidth + event.clientX - startX) + 'px';
        // @ts-ignore
        item.style.height = (startHeight + event.clientY - startY) + 'px';
      });

    fromEvent(document, 'mouseup')
      .pipe(takeWhile(() => alive))
      .subscribe(event => {
        item.classList.add('nb-justifying');
        setTimeout(() => item.classList.remove('nb-justifying'), 350);

        // @ts-ignore
        const width = (startWidth + event.clientX - startX);
        item.style.width = Math.round(width / BREAKPOINT_WIDTH) * BREAKPOINT_WIDTH + 'px';

        // @ts-ignore
        const height = (startHeight + event.clientY - startY);
        item.style.height = Math.round(height / BREAKPOINT_HEIGHT) * BREAKPOINT_HEIGHT + 'px';

        alive = false;
      })
  }
}
