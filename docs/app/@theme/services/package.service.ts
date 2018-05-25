import { Injectable } from '@angular/core';

@Injectable()
export class NgdPackageService {

  getNebularVersion(): string {
    return this.package.version;
  }

  detDependencyVersion(dependency: string): string {
    return this.package.dependencies[dependency];
  }

  getKeywords(): string[] {
    return this.package.keywords;
  }

  private get package() {
    return require('../../../../package.json');
  }
}
