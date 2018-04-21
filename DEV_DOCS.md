# Things you must follow before contributing
- Don’t overcomplicate
- Don’t make things too abstract
- Use tslint, styles-lint to check the code style
- Use lifecycle interfaces
- Use default angular view encapsulation
- Use changeDetection: ChangeDetectionStrategy.OnPush where applicable
- Never forget [document your changes add create some examples](#documentation)
- Write tests
- Create playground page per each new component/feature


# New Feature Checklist
- lint checks are passing
- tests are added/updated and passing
- showcase in the playground updated
- Styles variables added/updated
- tsdocs added/updated
- commit message is properly formatted
- for the override styles - registered in a list of overrides
- component *.theme registered in a list of component themes
- looks great on all default themes
- requires approval from several core team contributors

# Objectives
The aim of the project is to create a set of useful Angular modules which help to bootstrap the development.

We have to:
  - [x] make it modular
  - [x] publish it as npm package
  - [x] customizable color themes with HOT reload support
  - [x] create a library of custom layout components
  - [x] expanded documentation and guides
  - [x] replace ng2-bootstrap with ng-bootstrap
  - [x] get rid of jQuery
  - [x] follow Angular code style
  - [x] use Angular CLI

# Framework Structure
- src
    - app - Components playground, used for components development showcase, also covered with UI tests
    - docs - Documentation and framework website built on top on the framework
    - backend - Small backend example
    - framework - Framework itself, divided into npm packages
        - theme - `@nebular/theme` npm package, main framework package
        - auth - `@nebular/auth` npm package, auth package (login, register, etc)       
        - icons - `nebular-icons` npm package, cool icons font
        - security - `@nebular/security` npm package, security framework package
        
      
      
## Auth // TODO      

## Theme
Theme module is the main framework module, consisting of:
 
  - custom UI Kit components (layout, cards, tabs, etc)
  - css-themes with hot reload support 
  - appearance overrides for 3rd party libraries.

### UI Kit structure 

Located in `theme/components`.
Each component consists of the standard angular component structure + `*.theme.scss` file, 
which is a customizable part (customizable here means dependable on a specific theme variables) of component's styles.

### Services

Located in `theme/services`.
Global theme services.

### Styles structure

Located in `theme/styles`

- core/ - Common mixins and functions
- global/ - Root of the 3rd party components overrides and other global styles
- prebuilt/ - Technical files of which css themes will be compiled
- themes/ - built-in themes
- common/ - Shared components styles
- all.scss -Exports all themes' variables, theming engine and global styles
- components.scss - Exports all themes' variables and theming engine but DOES NOT export global styles (should be used in a component)
- globals.scss - Exports all global styles (overrides, components' `*.theme.scss` themes, fonts, etc)
- themes.scss - All built-in themes
- theming.scss - Theme system engine 

#### CSS Themes

- Problem
  Customizable themes support doesn't work good with angular, as encapsulated in framework components' styles can't access user app variables unless you make them non-encapsulated and export as scss-files).
  Thus, we need to ask a user to include the framework styles separately as global styles, so that it is possible to change SASS variables before the theme styles are processed.
  
- Solution
  The solution is to separate component's styles into configurable (with SASS variables) and non-configurable (hardcoded) styles.
  Then place hardcoded styles into `*.component.scss`, and dynamic styles into `*.theme.scss`.
  The `*.theme` files will be included into one `*theme` file with access to the theme variables. This file has to be included by the user into their project.
  
- Disadvantages
    - We separate styles, thus it's hard to read the styles in the development mode.
    - Theme styles are not encapsulated, basically are global styles.
  
- Possible future solution
    - CSS variables (currently lack of browsers support)
 
  
#### Multi Themes

- Problem
  We cannot change SCSS variables in the runtime as user change the theme (possible with CSS variables but browser support is quite limited). 
  
- Solution
  Thus, we need to build multiple instances of styles in the runtime and encapsulate each theme's bunch of styles under some .theme-name class:
   ```
    .nb-theme-default {
      nb-layout {
        color: black;
      }
    }
    .nb-theme-red {
      nb-layout {
        color: red;
      }
    }
    
   ```
  Then, by changing a css class on the root element (nb-layout) we can change the page appearance in the runtime.
  
  - SCSS MAP
    Moreover, to have an arbitrary amount of themes we need to store the variables as an `SCSS `.
    Then, each component' styles (user components' styles) needs to be wrapped into `nb-install-component` mixing, 
    which will be called in a loop for each theme, setting its own variables.
    Variables then accessible through `nb-theme(var-name)` function.
    Finally, example of such component will look like:
    ```
      @import '@nebular/theme/styles/component';
      
      @include nb-install-component() {
        div {
          color: nb-theme(primary-fg);
        }
      }
    ```
    
- Disadvantages
  - Double (triple, multiple) sizes of generated css file. 

- Possible future solution
  - CSS variables

   
### JS Themes - // TODO

TBD

# Documentation

Documentation is generated by the custom generator built on top of @nebular/theme.
You have to use typedoc everywhere for the documentation purpose.

## How to add page to the documentation

Docs application splitted on the sections which you can find in the apps sidebar.
Each section contains some pages.
If you wanna add new page in the documentation, please, open `structure.ts`
file in the root of docs application and add new page in the required section:

```
{
  type: 'page',
  name: 'Awesom page',
  children: [
    ... blocks
  ],
},
```

If it's completely new feature, maybe it would be better to create a new section:

```
{
  type: 'section',
  name: 'New super section',
  children: [
    ... pages
  ],
},
```

Page can contain multiple blocks of the following types:

- [markdown](#markdown-block)
- [component](#component-block)
- [tabbed component](#tabbed-component-block)

### Markdown block

Renders plain markdown file from the `articles` dir.
For example, if you wanna add getting started article you have to do the following:

- put `getting-started.md` file in the `articles` folder.
- add markdown block to the page children:

```
{
  type: 'block',
  block: 'markdown',
  source: 'getting-started.md',
},
```

### Component block

If you have to render all the information about componend parsed with typedoc
you have to use component blocks:

```
{
  type: 'block',
  block: 'component',
  source: 'MyNewComponentName',
},
```

### Tabbed component block

Tabbed component block will render component description splitted on the following tabs:
- Overview - This is typedoc comment above component
- Theme - Theme variables listed in the typedoc comment above component with `@styles` tag, for example:

```
/**
 * ...
 *
 * @styles
 *
 * var1
 * var2
 *
 * ...
 */
```

- API - parsing result of the typedoc above public methods and props
- Examples - live examples listed in the typedoc comment above component

## Examples

When you're developing new funcitonality, please, always add some examples describing it.
You have the following ways to add examples in your component documentation:
- [Add raw code](#add-raw-code)
- [Display inline examples from playground](#inline-examples)
- [Render live examples from playground](#live-examples)
- [Render stacked examples from palyground(live + inline)](#stacked-examples)

### Add raw code

If you wan't to describe small thing in two lines of code you can just add something similar in your typedoc comment:

````
```html
<my-component></my-component>
```
````

And don't forget specify language above your example.

### Inline examples

Inline example is an example file from our playground.
Let's see how can we add inline example on the page:

- Create example file in the playground folder. All files from playground folder will be coppied to the assets of the docs app.
- Add `@inline-example(my-component/my-component.component.html)` somewhere in your typedoc comment.

Also, if you wanna render all the component, not only one file from it, you can specify it's without file extension:
`@inline-example(my-component/my-component.component)`
in this case all the files with `my-component.component` name will be rendered.

### Live examples

Live example it's just playground page rendered in the iframe. So, to be able to use it
you have to add example component in the playground and specify route for it.
Then you need to pass this route name in `@live-example(my-super-route)` tag.

### Stacked examples

It's combination of the live and inline examples. When you add `@example(my-example)`
in your typedoc comment, docs'll try to find component with name `my-example` and route with the same name and render them with switch.
To give the user capability switch between live and inline representation of the example.

# Release

To start a new release (publish the framework packages on NPM) you need:

1. create a new release branch called `release:v1.0.2`
2. `npm run release:prepare` - this will create ready for publishing packages in src/.lib
3. `npm run release:validate` - this will build prod & AOT builds of the playground app using prepared packages in src/.lib and run e2e tests again it.
4. MANUALLY update a version in main ./package.json to a new one
5. 
  * `npm run version:bump`
  * update `package-lock.json`
  * update dependent modules with correct peer module versions 
6. 
  * `npm run version:changelog`
  * fix/expand changelog manually
7. push the branch, create PR, approve - merge
8. pull the upstream (master)   
9. `npm run release` - run prepare & validate and finally publish the packages to NPM
10. create and push git tag
11. create release on github
12. publish docs  

#ngx-admin development on the latest Nebular sources

1. `rm -rf node_modules/@nebular` to remove the package installed
2. run `npm link` for each Nebular module in *nebular/src/framework* except for *icons*
3. make sure you don't have *node_modules* in Nebular project (this may cause an issue an issue the angular-cli)
4. link Nebular in ngx-admin: `npm link @nebular/{auth,theme}`
5. run ngx-admin with corresponding flag `npm start -- --preserve-symlinks`

#ngx-admin release
1. update version
2. create changelog
3. create PR, approve, pull
4. create a tag
5. create changelog
6. merge into `sandbox`, create changelog
7. create PR, approve, pull
8. create a tag
9. create changelog
10. create github release

#ngx-admin demo update
1. pull the sources 
2. check everything is running correctly
3. relate `demo` branch onto `master`
4. build with npm run build:prod
5. upload code using `scp -r dist/ server_details`


# TODO
 - steps to start the development
 - describe framework and demo dependencies
 - create a new component guide
 - usage guide
 - move nebular-icons in separate repository
