import { Injectable } from '@angular/core';

export interface NgdStackblitzTemplate {
  index: string;
  main: string;
  cli: string;
}

@Injectable()
export class NgdStackblitzTemplateService {

  createTemplate(id: string, withLayout: boolean): NgdStackblitzTemplate {
    const tag = this.createTag(id);
    const component = this.createComponent(tag);

    return {
      index: this.createIndex(),
      main: this.createMain(component, id, withLayout),
      cli: this.createCli(),
    }
  }

  private createTag(id: string): string {
    return /\/(.*)\.component/g.exec(id)[1];
  }

  private createIndex(): string {
    return `<ngd-app-root>Loading...</ngd-app-root>`;
  }

  private createCli(): string {
    return `{
  "apps": [{
    "styles": [
      "node_modules/bootstrap/dist/css/bootstrap.css",
      "node_modules/@nebular/theme/styles/prebuilt/default.css",
      "node_modules/nebular-icons/css/nebular-icons.css"
    ]
  }]
}`;
  }

  private createMain(component: string, id: string, withLayout: boolean): string {
    return `import 'zone.js/dist/zone';

import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {
  NbThemeModule,
  NbCardModule,
  NbCheckboxModule,
  NbLayoutModule,
  NbMenuModule,
  NbPopoverModule,
  NbSidebarModule,
  NbActionsModule,
  NbSearchModule,
  NbTabsetModule,
  NbUserModule,
  NbBadgeModule,
} from '@nebular/theme';

import { ${component} } from './${id}';

@Component({
  selector: 'ngd-app-root',
  template: \`
    ${withLayout ? '<router-outlet></router-outlet>' : `<nb-layout>
      <nb-layout-column>
        <router-outlet></router-outlet>
      </nb-layout-column>   
    </nb-layout>
    `}
  \`,
})
export class NgdAppComponent {
}

@NgModule({
  imports: [
    BrowserModule,
    NbCardModule,
    NbLayoutModule,
    NbPopoverModule,
    NbCheckboxModule,
    NbActionsModule,
    NbSearchModule,
    NbTabsetModule,
    NbUserModule,
    NbBadgeModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    RouterModule.forRoot([
      {
        path: '',
        component: ${component},
      },
    ]),
  ],
  declarations: [NgdAppComponent, ${component}],
  bootstrap: [NgdAppComponent],
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);`;
  }

  private createComponent(tag: string): string {
    return `Nb${tag.split('-').map(this.capitalize).join('')}Component`;
  }

  private capitalize(str): string {
    return str.charAt(0).toUpperCase() + str.substr(1);
  }
}
