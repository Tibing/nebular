/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Rule, Tree } from '@angular-devkit/schematics';
import { dirname, join, normalize } from '@angular-devkit/core';
import * as ts from 'typescript';
import { getComponentTemplateDescriptor, TemplateDescriptor, writeText } from '../../util';
import { wrapHtmlFileTemplateInLayout, wrapInlineTemplateInLayout } from './layout-content';

/**
 * Wraps `AppComponent` in `NbLayoutComponent`. It's required for correct
 * work of Nebular components.
 * */
export function wrapRootComponentInLayout(): Rule {
  return (tree: Tree) => {
    // TODO root component path has to be found from bootstrapped module, not hardcoded
    const componentPath: string = './src/app/app.component.ts';
    const templateDescriptor: TemplateDescriptor = getComponentTemplateDescriptor(tree, componentPath);

    if (templateDescriptor.isInline()) {
      wrapInlineTemplate(tree, templateDescriptor);
    } else {
      wrapHtmlFileTemplate(tree, templateDescriptor);
    }

    return tree;
  }
}

function wrapInlineTemplate(tree: Tree, templateDescriptor: TemplateDescriptor) {
  const { templateProp, componentPath, template } = templateDescriptor;

  const wrappedTemplate = wrapInlineTemplateInLayout(template);
  const recorder = tree.beginUpdate(componentPath)
    .remove(templateProp.initializer.pos, template.length)
    .insertLeft(templateProp.initializer.pos, wrappedTemplate);

  tree.commitUpdate(recorder);
}

function wrapHtmlFileTemplate(tree: Tree, templateDescriptor: TemplateDescriptor) {
  const { templateUrlProp, componentPath, template } = templateDescriptor;

  const templateUrl = (templateUrlProp.initializer as ts.StringLiteral).text;
  const dir = dirname(normalize(componentPath));
  const templatePath = join(dir, templateUrl);

  writeText(tree, templatePath, wrapHtmlFileTemplateInLayout(template));
}
