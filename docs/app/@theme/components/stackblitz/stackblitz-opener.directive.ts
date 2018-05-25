import { ChangeDetectorRef, Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { NgdStackblitzService } from '../../services';

@Directive({
  selector: '[ngdStackblitzOpener]',
  providers: [NgdStackblitzService],
})
export class NgdStackblitzOpenerDirective implements OnInit {

  @Input('ngdStackblitzOpener') content;

  @HostBinding('disabled')
  isDisabled = true;

  constructor(private stackblitz: NgdStackblitzService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.load();
  }

  @HostListener('click')
  openStackblitz() {
    this.stackblitz.submit();
  }

  private load() {
    this.stackblitz.load(this.content)
      .subscribe(() => {
        this.isDisabled = false;
        this.cd.detectChanges();
      });
  }
}
