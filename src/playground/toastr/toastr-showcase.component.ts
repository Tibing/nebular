import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'nb-toastr-showcase',
  template: `
    <button class="btn btn-primary" (click)="showToast('top-right', 'success')">Top Right</button>
    <button class="btn btn-primary" (click)="showToast('bottom-right', 'success')">Bottom Right</button>
    <button class="btn btn-primary" (click)="showToast('top-left', 'success')">Top Left</button>
    <button class="btn btn-primary" (click)="showToast('bottom-left', 'success')">Botttm Left</button>
    <button class="btn btn-primary" (click)="showToast('top-right', 'success')">Success</button>
    <button class="btn btn-primary" (click)="showToast('top-right', 'info')">Info</button>
    <button class="btn btn-primary" (click)="showToast('top-right', 'warning')">Warning</button>
    <button class="btn btn-primary" (click)="showToast('top-right', 'primary')">Primary</button>
    <button class="btn btn-primary" (click)="showToast('top-right', 'danger')">Danger</button>
  `,
  styles: [
      `
      /deep/ nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})

export class NbToastrShowcaseComponent {
  constructor(private toastrService: NbToastrService) {
  }

  private index: number = 0;

  showToast(position, status) {
    this.index += 1;
    this.toastrService.show(
      status || 'Success',
      `Toast`,
      { position, status });
  }
}
