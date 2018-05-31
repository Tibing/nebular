import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NB_DOCUMENT } from '@nebular/theme';
import { forkJoin as observableForkJoin, Observable } from 'rxjs';
import { NgdCodeLoaderService } from './code-loader.service';
import { map } from 'rxjs/operators';
import { NgdPackageService } from './package.service';
import { NgdStackblitzTemplateService } from './stackblitz-template';

const STACKBLITZ_URL = 'https://run.stackblitz.com/api/angular/v1';

const TEMPLATE_FILES = [
  'index.html',
  'main.ts',
];

const EXTERNAL_DEPENDENCIES = [
  '@angular/animations',
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/forms',
  '@angular/http',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
  'nebular-icons',
  'core-js',
  'rxjs',
  'zone.js',
  'bootstrap',
];

const NEBULAR_DEPENDENCIES = [
  '@nebular/theme',
  '@nebular/auth',
  '@nebular/security',
];

@Injectable()
export class NgdStackblitzService {

  private form: HTMLFormElement;

  constructor(@Inject(NB_DOCUMENT) private document,
              private http: HttpClient,
              private codeLoader: NgdCodeLoaderService,
              private packageService: NgdPackageService,
              private templateService: NgdStackblitzTemplateService) {
  }

  load({ id, files, name, withLayout }): Observable<null> {
    this.createForm(id);
    this.loadMetadata(name);
    this.loadTemplate(id, withLayout);
    return this.loadFiles(id, files);
  }

  submit() {
    this.document.body.appendChild(this.form);
    this.form.submit();
    this.document.body.removeChild(this.form);
  }

  private createForm(id: string) {
    const indexFile = `app%2F${id}.ts`;
    this.form = this.createFormElement(indexFile);
  }

  private loadMetadata(name: string) {
    this.packageService.getKeywords().forEach((tag, i) => this.appendInput(`tags[${i}]`, tag));
    this.appendInput('private', 'true');
    this.appendInput('description', name);
    this.appendInput('dependencies', JSON.stringify(this.getDependencies()));
  }

  private loadFiles(id: string, paths: string[]): Observable<null> {
    return observableForkJoin(
      ...this.loadExamples(paths),
    );
  }

  private loadExamples(paths: string[]): Observable<void>[] {
    return paths.map(path => this.loadFile(path));
  }

  private loadTemplate(id: string, withLayout: boolean) {
    const { index, main, cli } = this.templateService.createTemplate(id, withLayout);
    this.appendFile('index.html', index);
    this.appendFile('main.ts', main);
    this.appendFile('.angular-cli.json', cli);
  }

  private loadFile(path: string): Observable<void> {
    return this.codeLoader.load(path)
      .pipe(map(file => this.appendFile(path, file)));
  }

  private createFormElement(indexFile: string): HTMLFormElement {
    const form = this.document.createElement('form');
    form.action = `${STACKBLITZ_URL}?file=${indexFile}`;
    form.method = 'post';
    form.target = '_blank';
    return form;
  }

  private appendFile(path: string, file: string) {
    this.appendInput(`files[${path}]`, file);
  }

  private appendInput(name: string, value: string): void {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    this.form.appendChild(input);
  }

  private getDependencies() {
    return {
      ...this.getExternalDependencies(),
      ...this.getNebularDependencies(),
      // TODO maybe we can load them automatically? It's peers of bootstrap
      'jquery': '1.9.1',
      'popper.js': '^1.12.9',
    };
  }

  private getExternalDependencies() {
    return EXTERNAL_DEPENDENCIES.reduce((deps, dep) => ({
      ...deps,
      [dep]: this.packageService.detDependencyVersion(dep),
    }), {});
  }

  private getNebularDependencies() {
    return NEBULAR_DEPENDENCIES.reduce((deps, dep) => ({
      ...deps,
      [dep]: this.packageService.getNebularVersion(),
    }), {});
  }
}
