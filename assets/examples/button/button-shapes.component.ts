import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-shapes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-shapes.component.html',
  styles: [`
    [nbButton] {
      margin-right: 0.75rem;
      margin-bottom: 1rem;
    }
  `],
})
export class NbButtonShapesComponent {
}
