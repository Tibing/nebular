/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, Component, Directive, Input } from '@angular/core';


@Component({
  selector: 'nb-grid',
  template: `
    <ng-content>
    </ng-content>
  `,
  host: { 'class': 'gridster' },
})
export class NbGridComponent implements AfterViewInit {
  ngAfterViewInit() {
    $('nb-grid').gridster({
      widget_selector: '[nbWidget]',
      widget_base_dimensions: ['auto', 140],
      autogenerate_stylesheet: true,
      min_cols: 5,
      max_cols: 16,
      widget_margins: [10, 10],
      resize: { enabled: true },
    });
  }
}

@Directive({
  selector: '[nbWidget]',
  host: {
    '[attr.data-row]': '1',
    '[attr.data-col]': '1',
    '[attr.data-sizex]': 'width',
    '[attr.data-sizey]': 'height',
  },
})
export class NbWidgetDirective {
  @Input() height: number;
  @Input() width: number;
}

@Component({
  selector: 'nb-poc-dnd',
  styleUrls: ['./poc-dnd.component.scss'],
  templateUrl: 'poc-dnd.component.html',
})
export class NbPocDNDComponent {
}
