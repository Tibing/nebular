/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { getProjectFromWorkspace, getProjectStyleFile, getProjectTargetOptions } from '@angular/cdk/schematics';
import { Rule, SchematicsException, Tree, UpdateRecorder } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { InsertChange } from '@schematics/angular/utility/change';
import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/workspace';
import { join, normalize, Path } from '@angular-devkit/core';

import { createThemeContent, stylesContent } from './theme-content';
import { Schema } from '../schema';

/**
 * Register Nebular theme in the given project.
 * */
export function addNebularStyles(options: Schema): Rule {
  return (host: Tree) => {
    if (options.prebuiltStyles) {
      insertPrebuiltTheme(host, options);
    } else {
      importCustomizableTheme(host, options);
    }

    return host;
  }
}

function insertPrebuiltTheme(host: Tree, options: Schema) {
  const workspace = getWorkspace(host);
  const project = getProjectFromWorkspace(workspace, options.project);

  const themePath = `./node_modules/@nebular/theme/styles/prebuilt/${options.theme}.css`;

  addStyleToTarget(project, 'build', host, themePath, workspace);
}

function importCustomizableTheme(host: Tree, options: Schema) {
  const workspace = getWorkspace(host);
  const project = getProjectFromWorkspace(workspace, options.project);
  const stylesPath: string = getProjectStyleFile(project, 'scss') as string;

  if (!host.exists(stylesPath)) {
    throwSCSSRequiredForCustomizableThemes();
  }

  const themeContent: string = createThemeContent(options.theme);

  const customThemePath: Path = normalize(join((project.sourceRoot as Path), 'themes.scss'));
  host.create(customThemePath, themeContent);

  const insertion = new InsertChange(stylesPath, 0, stylesContent);
  const recorder: UpdateRecorder = host.beginUpdate(stylesPath);

  recorder.insertLeft(insertion.pos, insertion.toAdd);
  host.commitUpdate(recorder);
}

/**
 * Adds a style entry to the given project target.
 * */
function addStyleToTarget(project: WorkspaceProject, targetName: string, host: Tree,
                          assetPath: string, workspace: WorkspaceSchema) {
  const targetOptions = getProjectTargetOptions(project, targetName);

  if (!targetOptions.styles) {
    targetOptions.styles = [assetPath];
  } else {
    const existingStyles = targetOptions.styles.map((s: any) => typeof s === 'string' ? s : s.input);
    const hasGivenTheme = existingStyles.find((s: any) => s.includes(assetPath));
    const hasOtherTheme = existingStyles.find((s: any) => s.includes('@nebular/theme/styles/prebuilt'));

    if (!hasGivenTheme && !hasOtherTheme) {
      targetOptions.styles.unshift(assetPath);
    }
  }

  host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
}

function throwSCSSRequiredForCustomizableThemes() {
  throw new SchematicsException('No scss root found. Customizable theme requires scss to be enabled in the project.');
}
