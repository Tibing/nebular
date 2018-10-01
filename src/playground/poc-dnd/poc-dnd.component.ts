/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'nb-poc-dnd',
  styleUrls: ['./poc-dnd.component.scss'],
  templateUrl: 'poc-dnd.component.html',
})

export class NbPocDNDComponent {
  items = ['Zero', 'One', 'Two', 'Three'];

  onDropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
