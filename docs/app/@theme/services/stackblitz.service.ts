import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NB_DOCUMENT } from '@nebular/theme';
import { forkJoin as observableForkJoin, Observable } from 'rxjs';
import { NgdCodeLoaderService } from './code-loader.service';
import { map } from 'rxjs/operators';
import { NgdPackageService } from './package.service';

const STACKBLITZ_URL = 'https://run.stackblitz.com/api/angular/v1';

const dependencies = [
  '@angular/animations',
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/forms',
  '@angular/http',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
  'core-js',
  'rxjs',
  'zone.js',
  'hammerjs',
  'moment',
];

@Injectable()
export class NgdStackblitzService {

  private form: HTMLFormElement;

  constructor(@Inject(NB_DOCUMENT) private document,
              private http: HttpClient,
              private codeLoader: NgdCodeLoaderService,
              private packageService: NgdPackageService) {
  }

  load({ id, files, name }): Observable<null> {
    this.createForm(id);
    this.loadMetadata(name);
    return this.loadFiles(files);
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

  private loadFiles(paths: string[]): Observable<null> {
    return observableForkJoin(paths.map(path => this.loadFile(path)));
  }

  private loadFile(path: string): Observable<null> {
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
    return dependencies.reduce((deps, dep) => ({ ...deps, [dep]: this.packageService.detDependencyVersion(dep) }), {});
  }
}
