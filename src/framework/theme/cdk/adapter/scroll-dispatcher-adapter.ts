import { Injectable, NgZone } from '@angular/core';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';

import { NbPlatform } from '../mapping';
import { NbLayoutScrollService } from '../../theme/services/scroll.service';

@Injectable()
export class NbScrollDispatcherAdapter extends ScrollDispatcher {
  constructor(_ngZone: NgZone, _platform: NbPlatform, protected scrollService: NbLayoutScrollService) {
    super(_ngZone, _platform);
  }

  scrolled(auditTimeInMs?: number): Observable<CdkScrollable | void> {
    return this.scrollService.onScroll();
  }
}

