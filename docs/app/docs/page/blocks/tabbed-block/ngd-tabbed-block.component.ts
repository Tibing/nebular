import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-tabbed-block',
  styleUrls: ['./ngd-tabbed-block.component.scss'],
  templateUrl: './ngd-tabbed-block.component.html',
})
export class NgdTabbedBlockComponent {

  @Input() source = [];

  hasDescription(component): boolean {
    return component && (
      component.name ||
      component.shortDescription ||
      component.description
    );
  }

  hasExamples(component): boolean {
    return component &&
      component.examples &&
      component.examples.length > 0;
  }

  hasTheme(component): boolean {
    return component.styles &&
      component.styles.length > 0;
  }

  hasProps(component): boolean {
    return component &&
      component.props &&
      component.props.length > 0;
  }

  hasMethods(component): boolean {
    return component &&
      component.methods &&
      component.methods.length > 0 &&
      component.methods.some(method => method.shortDescription || method.description);
  }
}
