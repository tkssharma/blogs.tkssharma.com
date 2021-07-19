---
date: 2020-02-7
title: 'Angular 9 | Rendering Architecture Ivy'
template: post
thumbnail: '../thumbnails/angular.png'
slug: angular-9-rendering-architecture
categories:
  - Angular
  - Popular
tags:
  - Angular
  - Angular 9
  - Javascript
---
Angular 9 | Lets talk about Angular
==========

The Angular bootstrap sequence starts after the load of the `index.html` and the JavaScript bundles produced by Webpack. _Angular Runtime_ creates the _platform_ where the _application_ can be started and finally the root component is rendered.

What follows is related to Angular View Engine and experimented on _Angular 8.2.9_.

View Engine is going to be replaced by Angular Ivy in version 9, detail introduction can be found in this other blog post

**Disclaimer**  
The post contains the thoughts of a preliminary investigation on how Angular works reading some parts of the source code, debugging a simple application and reading how the compiler works. Some terms or definitions could be wrong.

Basics
======

*   _Angular View Engine:_ Angular rendering architecture (compiler and runtime) introduced in version 4 and substituted with Ivy in Angular version 9.
*   _Angular compiler:_ compiles templates and decorators into a code the runtime can execute.
*   _Angular runtime:_ execute the JavaScript code produced by the compiler to run the application.
*   _Object Model (OM):_ a way to model via object-oriented techniques (objects, classes, interfaces, properties, inheritance, encapsulation, etc) a system for development purpose. For instance, Apache POI implements an OM of Microsoft Excel that manipulates via a Java API.
*   _Data Model (DM):_ it represents entities at the database level, it deals with table schema, relationships between tables (FKs, PKs) but not advanced object-oriented concepts like inheritance or polymorphism. DM represents how OM classes are stored in a database.
*   _DOM:_ an object-oriented representation of an HTML document in a tree fashion that can be manipulated via the DOM API, for instance `HTMLButtonElement` is one of the DOM interfaces.
*   _Shadow DOM:_ it allows to separate DOM into smaller and encapsulated object-oriented representations of a HTML element.
*   _Tree and nodes:_ the DOM is organized in a logical tree where its nodes are the components or HTML elements.
*   _Rendering/painting:_ the browser process that transform the DOM into the UI.
*   _Virtual DOM:_ the virtual representation of the real DOM.
*   _Diffing:_ operation that compare two Virtual DOM.
*   _Incremental DOM:_ a technique to render and update an Angular component when change detection is fired.

The plan
========

Hello Reader, this is a long post so feel free to skip certain sections I have used to introduce and give a more complete context to the Angular bootstrap sequence that is the goal

The post starts with an introduction about the DOM and two _rendering strategies_ used to speed up the page repainting. The _incremental DOM_ strategy is the base of the Angular rendering architecture.

The `Welcome to Angular` simple application will help to introduce and talk about the _Angular compiler_, why and how the _Angular declarative syntax_ is transformed into JavaScript code that can be executed by the _Angular runtime_ in the browser. A deep look into the generated code and the Angular source code will show how the framework creates the DOM element and answer to change detection.

Some of the content and mechanisms has been changed with the introduction of the new rendering architecture called Angular Ivy.

Browser DOM
===========

> _The Document Object Model (DOM) connects web pages to scripts or programming languages by representing the structure of a document such as the HTML representing a web page in memory._
> 
> _MDN — Mozilla Developer Network_

**Tip**  
The HTML document is represented in an object-oriented fashion, as objects in a logical tree, by the DOM that also provides the [API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) to manipulate those objects.

The DOM rendered gives the HTML page visible to the end-user.

DOM rendering is slow
=====================

Being the DOM represented as a tree, it makes easier to change and update it. What the user sees is the result of the DOM rendering operation that is the _slow part_. More a page or a component is complex more could take time to render it.

A page is usually made of many components, complex and non-complex. Every time one of them changes the all page (or a big part of it) needs to be re-rendered, a really expensive operation.

**Tip**  
Frequent DOM manipulations make the user interface slow since the re-painting of the user interface is the most expensive part. In general, it is something that is not considered when the page is going to be implemented. For instance, changing the visibility of an element forces the browser to verify/check the visibility of all other DOM nodes.

Actions like changing visibility or the background of an element trigger a repaint. A simple click of the user could correspond to many different actions behind the scene and so many repainting actions slowing down the web page.

Two different techniques have been developed to overcome the rendering issue for complex web applications: _Virtual DOM_ and _Incremental DOM_.

Virtual DOM
===========

The key idea is to _render the DOM the least possible_ . When a change detection occurs, instead of updating the real DOM, frameworks like React updates a _Virtual DOM_.

The Virtual DOM is a _tree_ as well, made of _nodes_ that are the page elements. When a new element is added/removed a new Virtual DOM is created, the _difference_ between the two trees is calculated.

A transformations series is calculated to update the browser DOM so that it _matches_{: .italic-red-text } the latest new Virtual DOM. These transformations are both the minimal operations to be applied to the real DOM and the ones that reduce the performance cost of the DOM update.

**Internals**  
The rendering process happens only on the _difference_. The _bulk changes_ to be applied are optimized to improve the performance cost.

<img class="cp t u hk ak" src="https://miro.medium.com/max/1760/0*UMbC65bGAMHQNMbj.png" width="880" height="246" role="presentation"/>

What Virtual DOM looks like
===========================

The Virtual DOM is something _not official_, no specification is provided _differently_ from DOM and shadow DOM.

It is a _copy_ of the original DOM as a _plain JavaScript object (JSON)_ so that it can be modified how many times we want without affecting the real DOM. Virtual DOM can be divided in chunks so that it is easier to _diffing_ the changes.

Example
-------

When a new item is added to an unordered list of elements a copy of the Virtual DOM containing the new element is created.

The _diffing_ process collects the differences between the two Virtual DOM objects so changes can be transformed in a bulk update against the real DOM.

**Tip**  
No distinction about _reflow_ (element layout that is position recalculation and geometry) and _repaint_ (element visibility) has been done so far since most of the considered actions involve the repaint operation.

How React uses the Virtual DOM
==============================

In React a user interface is made of a set of components, each component has a _state_. For instance, the state of a drop-down menu is the array of the available elements and the current selected one.

Via the [observer pattern](https://www.baeldung.com/java-observer-pattern) React listens to _state change_ to update the Virtual DOM. The _diffing_ process makes React aware of which Virtual DOM objects have changed, _only_ those objects will be updated in the real DOM.

**Tip**  
As the developer you don’t need to be aware of about how DOM manipulation happens at each state change. React does the job optimizing the performance cost behind the scenes.

React reduces the re-painting cost applying updates in bulk _not_ at every single state change.

The _great advantage_ of using the Virtual DOM is that we don’t need any compiler. JSX, for instance, is really close to JavaScript, the key point is _the render function_ that can be implemented using any programming language.

Virtual DOM drawbacks
=====================

*   The Virtual DOM required an _interpreter_ to interpret the component. At compile time no way exists to know which parts of the interpreter will be required at runtime, so the _whole stuff_ has to be loaded by the browser.
*   Every time there is a change, a new Virtual DOM has to be created, maybe a chunk and not the whole tree, but _the memory footprint is high_.

Incremental DOM
===============

The key idea of the incremental DOM is:

> _Every component gets compiled into a series of instructions. These instructions create DOM trees and update them in-place when the data changes._
> 
> _Victor Savkin —_ [_Understanding incremental DOM_](https://blog.nrwl.io/understanding-angular-ivy-incremental-dom-and-virtual-dom-243be844bf36)

Each component is then compiled into _two main instruction sequences_:

*   _view creation:_ invoked the first time the page is rendered, add the component to the DOM;
*   _change detection:_ invoked at every state change to update the component into the DOM.

The advantages of the Incremental DOM are a low memory footprint and a skinny interpreter/runtime tailored on the compiled application.

**Angular Ivy**  
The Incremental DOM strategy is already present in the Angular View Engine. As it will be shown, each component is compiled into a creation function and an update function. Angular Ivy goes further, it allows the _tree-shaking_ of the Angular runtime that is not possible with the current rendering architecture.

Angular compiler
================

An Angular application is mainly made by _Angular components_ organized in a tree fashion. Each component is implemented to accomplish a certain mission, for instance, the navigation bar, the drop-down menu, etc.

Angular component
=================

An Angular component is characterized by a class, _TypeScript code_ that expresses the _logic_, and a decorator that allows defining some _metadata_ such as the `selector`, the `template`, etc. The _HTML template_ represents the _presentation layer_ of the component and it is implemented using a specific _Angular declarative syntax_.

**Tip**  
When the developer writes a component uses TypeScript and the Angular declarative syntax for the template to _bind_ a variable from the logic to the presentation layer and vice versa. Pay attention that _no change detection_ is required to be added. Change detection works at runtime thanks to the compiler that adds it during the compilation phase.

Example
-------

Consider a very simple component, the template can be inline or separated:

```
import { Component } from '@angular/core';@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  
export class AppComponent {  
  title = 'a simple component';  
}
```

A _template_ is a bunch of HTML code with binding variables to _present_{: .italic-red-text }, with a certain look and feel, some content.

```
<div style="text-align:center">  
  <h1>  
    Welcome to {{ title }}!  
  </h1>  
</div>
```

Browser cannot render an Angular component
==========================================

The browser is the _execution environment_, it loads the application and executes it. Unfortunately it cannot execute an Angular component _as it is_.

**Tip** A browser can interpret JavaScript and render HTML but not if written using the _Angular declarative syntax_.  
Angular provides a compiler that, together with the TypeScript one, transforms _“everything in something else”_ that a browser can understand.

During the build of an Angular project, two compilers come into play with _different purposes_:

*   `tsc` is the TypeScript compiler and generates the JavaScript w.r.t. the target specified in the `tsconfig.json`, for instance `target: es2015`.
*   `ngc` is the Angular compiler that translates the templates and decorators into JavaScript. The Angular compiler can work in two different modes:
*   _Ahead-of-Time (AoT):_ work at build time so that the templates are bundled along with the application, suitable for production.
*   _Just-in-Time (JIT):_ templates are not pre-compiled, the compiler comes along with the application, it is loaded by the browser and does the work at runtime, suitable for development.

**Internals**  
During the development phase `ng serve` provides _live reload_ functionality.  
The process goes through `@ngtools/webpack`, compiled code is _not saved to disk_, everything is consumed in memory via streams and emitters.

Angular vs. browser
===================

What are then the _roles_ of the browser and Angular?

Once the Angular application has been _fully transformed into JavaScript_ (HTML templates included), WebPack bundles it along with library dependencies in order to improve performance and load times.

Browser role
============

The _browser role_ is to load the `index.html` and to provide the execution environment, the render and the event loop.

```
<!DOCTYPE html>  
<html lang="en">  
  <head>  
    ...  
  </head>  
  <body>  
    <app-root></app-root> <script src="runtime-es2015.js" type="module"></script>  
    <script src="polyfills-es2015.js" type="module"></script>  
    <script src="styles-es2015.js" type="module"></script>  
    <script src="vendor-es2015.js" type="module"></script>  
    <script src="main-es2015.js" type="module"></script> <!-- nomodule defer -->  
    <script src="runtime-es5.js" nomodule defer></script>  
    ...  
  </body>  
</html>
```

The scripts can be loaded both by modern browsers that supports ESM modules and by old ones that do not support modules via `nomodule defer` attributes.

Angular role
============

Consider an Angular application made of only the component previously introduced. The `main-es2015.js` contains the fully bundled application while `runtime-es2015.js` is the Angular runtime. Finally third party libraries and styles.

**Tip**  
The transformed HTML template into JavaScript becomes a series of instructions that, once called, _render_ the page building the components.  
Skipping some details, roughly an element is a factory function that uses the _injected Angular renderer_ to render the element w.r.t. the _browser platform_.

The _Angular runtime_ bootstraps the `AppModule` that, in turn, creates and renders the root element of the application `<app-root>`. The file `main-es2015.js` contains the _view definition factories_ produced by the compiler and enriched by Webpack.

**Internals**  
If the browser platform is chosen, `@angular/platform-browser`, the element will be rendered creating the `HTML` code into the DOM via the `Document` interface: `document.createElement()`. When something changes, the element will update itself calling the update function.

**Angular Ivy**  
The compilation process of View Engine produces `.metadata.json` and `.ngfactory.js` files. With Angular Ivy no more special files are produced, too complex to manage and to merge them. Ivy instructions are directly put into the component, a component knows how to create and update itself.

Analyze the compiled code
=========================

Let’s see how to compile the application invoking _only_ the `ngc` compiler and nothing else to inspect the compiled code easily and see where the generated JavaScript code invokes the DOM API to create the element.

**Tip**  
The `HTML` template has been compiled into a sequence of JavaScript instructions that will be executed by the Angular runtime. The _goal_ of the coming sections is to find where the `document.createElement()` is invoked after the different Angular entities (platform, application, and component) have been instantiated.

Setup the compilation task
==========================

Open the `package.json` file and add:

```
"scripts": {  
  ...  
  "compile": "ngc"  
},
```

then in the `tsconfig.json` enable the `d.ts` files generation to have the TypeScript definitions:

```
"compilerOptions": {  
  ...  
  "declaration": true,  
  ...  
}
```

One and simple component
========================

Create a new `Welcome to Angular` application via the Angular CLI.

The module and the component
----------------------------

The _module_ is as follows:

```
@NgModule({  
  declarations: [  
    AppComponent  
  ],  
  imports: [  
    BrowserModule  
  ],  
  providers: [],  
  bootstrap: [AppComponent]  
})  
export class AppModule { }
```

then the _component_ of the `Welcome to Angular` application:

```
@Component({  
  selector: 'app-root',  
  template: `  
    <div style="text-align:center">  
      <h1>  
        {% raw %}Welcome to {{ title }}!{% endraw %}  
      </h1>  
    </div>  
  `,  
  styleUrls: []  
})  
export class AppComponent {  
  @Input() title = 'Angular';  
}
```

Compile
-------

Run the command `npm run compile` and look into the folder `dist/out-tsc/src/app` where everything has been transformed into JavaScript and _saved to disk_.

The Angular compiler has produced some files, skip the `.metadata` and `.d.ts` ones:

```
app.module.js               // module class  
app.module.ngfactory.js     // module factory, transformed metadata decorator  
app.component.js            // component class  
app.component.ngfactory.js  // component factory, transformed metadata decorator
```

Module factory function
=======================

The `app.module.ngfactory.js` contains the _factory function creator_:

```
import * as i0 from "@angular/core";  
import * as i1 from "./app.module";  
import * as i2 from "./app.component";  
import * as i3 from "./app.component.ngfactory";  
...  
var AppModuleNgFactory = i0.ɵcmf(i1.AppModule, [i2.AppComponent], function(_l) {...}  
...
```

**Warning**  
The functions produced by the Angular template compiler start with `ɵ` to clearly warn _to not use them_ because for sure the code will change soon in the future.

The function `ɵcmf` stands for _create module factory_, the map between the name and the real function is defined in the following static map object `[Map<ExternalReference, any>](https://github.com/angular/angular/blob/d2222541e8acf0c01415069e7c6af92b2acbba4f/packages/platform-browser-dynamic/src/compiler_reflector.ts#L70)`:

```
function createBuiltinExternalReferencesMap() {  
  const map = new Map<ExternalReference, any>();  
  ...  
  map.set(Identifiers.createModuleFactory, ɵcmf);  
  ...  
  return map;
```

**Angular Ivy**  
The aforementioned map object is one of the reasons why the View Engine is not tree-shakable. Angular Ivy should get rid of or change how this static map is defined to allow the runtime to be tree-shaken by any open-source tool.

What is going to happen
=======================

The compiler has transformed the decorators, `@NgModule` and `@Component`, into JavaScript instructions. Now _"imagine"_ that the TypeScript class has been transpiled into JavaScript and the `@Component` decorator that decorates the class became the factory that tells Angular runtime how to create the component into the DOM (_create view_) and how to update it (_change detection_). The `@NgModule` decorators will tell the Angular runtime how to instantiate the application module and get _service providers_ injected.

The _module factory function_ will create an _application object_ that, in turn, will bootstrap the _application module_ and finally the _root component_.

Module factory implementation
-----------------------------

The module factory function `ɵcmf` creates the [module factory object](https://github.com/angular/angular/blob/d2222541e8acf0c01415069e7c6af92b2acbba4f/packages/core/src/view/entrypoint.ts#L35) `AppModuleNgFactory` previously shown. here the implementation:

```
export function createNgModuleFactory(  
    ngModuleType: Type<any>, bootstrapComponents: Type<any>[],  
    defFactory: NgModuleDefinitionFactory): NgModuleFactory<any> {  
      return new NgModuleFactory_(ngModuleType, bootstrapComponents, defFactory);  
    }
```

it implements the [following interface](https://github.com/angular/angular/blob/d2222541e8acf0c01415069e7c6af92b2acbba4f/packages/core/src/linker/ng_module_factory.ts#L60):

```
export abstract class NgModuleFactory<T> {  
    abstract get moduleType(): Type<T>;  
    abstract create(parentInjector: Injector|null): NgModuleRef<T>;  
}
```

Module creation
---------------

The _module factory object_ can create a _module_ of type `AppModule` defined in the class `app.module.js`, that will bootstrap a component of type `AppComponent` defined in the file `app.component.js`.

The `defFactory` is a _module defintion function_, `ɵmod`, used by the `create` method to produce the real module object. It contains an array of `ɵmpd` _module provider definitions_ that, for instance, tell which sanitizer or producer has to be created and injected:

```
...  
var AppModuleNgFactory = i0.ɵcmf(i1.AppModule, [i2.AppComponent], function(_l) {  
  return i0.ɵmod([  
    ...  
    i0.ɵmpd(4608, i5.DomSanitizer, i5.ɵDomSanitizerImpl, [i4.DOCUMENT]),  
    i0.ɵmpd(6144, i0.Sanitizer, null, [i5.DomSanitizer]),  
    ...  
    i0.ɵmpd(6144, i0.RendererFactory2, null, [i5.ɵDomRendererFactory2]),  
    ...  
  ]  
}
```

Component factory function
==========================

Open `app.component.ngfactory.js` and look at `ɵccf` or _create component factory_ function:

```
import * as i1 from "@angular/core";  
import * as i2 from "./app.component";  
...  
var AppComponentNgFactory = i1.ɵccf(  
  "app-root",  
  i2.AppComponent, /* class or type */  
  View_AppComponent_Host_0, /* factory that produces the app-root, component host, the node defintion */  
  {},  
  {},  
  []  
);
```

it is defined as [follows](https://github.com/angular/angular/blob/d2222541e8acf0c01415069e7c6af92b2acbba4f/packages/core/src/view/refs.ts#L33):

```
export function createComponentFactory(  
    selector: string, componentType: Type<any>, viewDefFactory: ViewDefinitionFactory,  
    inputs: {[propName: string]: string} | null, outputs: {[propName: string]: string},  
    ngContentSelectors: string[]): ComponentFactory<any> { return new ComponentFactory_(  
      selector, componentType, viewDefFactory, inputs, outputs, ngContentSelectors  
    );  
}
```

The factory function is similar to module one except for some more parameters. A component can have `@Input()` and `@Output` properties and hence the arrays `inputs` and `outputs`.

**Tip**  
It starts to be more and more clear how the component declaration is transformed into a set of arguments used by a factory to _programmatically_ create the component at runtime.

Compiled template
-----------------

What happened to the template? This is why you have read so far… I hope 😅

The component template has been transformed into a JavaScript object with the [following interface](https://github.com/angular/angular/blob/d2222541e8acf0c01415069e7c6af92b2acbba4f/packages/core/src/view/types.ts#L53):

```
export interface ViewDefinition extends Definition<ViewDefinitionFactory> {  
  flags: ViewFlags;  
  updateDirectives: ViewUpdateFn;  
  updateRenderer: ViewUpdateFn;  
  handleEvent: ViewHandleEventFn;  
  nodes: NodeDef[];  
  nodeFlags: NodeFlags;  
  rootNodeFlags: NodeFlags;  
  lastRenderRootNode: NodeDef|null;  
  bindingCount: number;  
  outputCount: number;  
  nodeMatchedQueries: number;  
}
```

The _view definition_ `ɵvid` with the `app-root` _host selector_:

```
export function View_AppComponent_Host_0(_l) {  
  return i1.ɵvid(  
    0,  
    [  
      (_l()(),  
        i1.ɵeld(  
          0,0,null,null,1,"app-root",[],null,null,null,  
          View_AppComponent_0,RenderType_AppComponent  
        )),  
      i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [], null, null)  
    ],  
    null,  
    null  
  );  
}
```

_Host selector_ since the component is attached/hosted by the selector, the Angular component is a directive, hence the view definition is characterized by (_links point to the Angular source code on GitHub_):

*   _element definition_, `ɵeld`, the `app-root`, the function produces an `[ElementDef](https://github.com/angular/angular/blob/d2222541e8acf0c01415069e7c6af92b2acbba4f/packages/core/src/view/types.ts#L245)`;
*   _directive definition_, `ɵdid`, the directive that represents the component, the function `[directiveDef](https://github.com/angular/angular/blob/d2222541e8acf0c01415069e7c6af92b2acbba4f/packages/core/src/view/provider.ts#L30)` produces an object of type `[NodeDef](https://github.com/angular/angular/blob/d2222541e8acf0c01415069e7c6af92b2acbba4f/packages/core/src/view/types.ts#L110)`.

Both produced objects are of type `[NodeDef](https://github.com/angular/angular/blob/d2222541e8acf0c01415069e7c6af92b2acbba4f/packages/core/src/view/types.ts#L110)`.

The _element definition_ `ɵeld` references then `View_AppComponent_0`, the other JavaScript code that represents the component template:

```
export function View_AppComponent_0(_l) {  
  return i1.ɵvid(0,  
    [  
      (_l()(),  
      i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),  
      (_l()(), i1.ɵted(1, null, ["Welcome to ", "!"]))  
    ],  
    null,  
    function(_ck, _v) {  
      var _co = _v.component;  
      var currVal_0 = _co.title;  
      _ck(_v, 1, 0, currVal_0);  
    }  
  );  
}
```

The `ɵvid`, `[viewDef](https://github.com/angular/angular/blob/d2222541e8acf0c01415069e7c6af92b2acbba4f/packages/core/src/view/view.ts#L23)` function, takes two view update functions: `updateDirectives` and `updateRenderer` for the change detection along with the function to create the element the first time the application is loaded.

**Tip**  
In a view definition function `ɵvid` there are two interesting things:

*   `NodeDef[]` array of nodes that is responsible of the view creation;
*   `updateDirectives` and `updateRenderer` functions responsible of the change detection update.

**Angular Ivy**  
In Angular Ivy there are no more `.ngfactory.js` files, all the required code for _view creation_ and _change detection_ is inside the component. Imho the incremental DOM if fully implemented in Ivy, what is missing in View Engine is the possibility to tree-shake the runtime to squeeze it as much as possible.

How Angular application bootstraps
==================================

Once the compiled code has been analyzed, it is interesting to see the call sequence to the Angular runtime to find which function renders the component. At the end of the sequence there must be the sought after `document.createElement()` function call to the DOM API.

Build the application and start a live server to debug it into the browser:

```
ng build --aot  
npx http-server dist/test-ivy
```

> _The Angular AOT compiler extracts metadata to interpret the parts of the application that Angular runtime is supposed to manage._

Basically, the compiler manages metadata interpretation and template compilation that can be controlled specifying some template compiler options in the `tsconfig.json`.

**Angular Ivy**  
Activate the Ahead-of-Time compilation to have everything in JavaScript and _saved to disk_ make it easier to inspect the generated code. With Angular Ivy `--aot` is not necessary anymore since it is activated by default. Ivy compilation is so fast that AoT compilation can be always used.

0. IIEF
========

The application starts in the file `main-es2015.js`. The option `--aot` contributes to some optimizations, `bootstrapModule` is replaced by `bootstrapModuleFactory` as you can observe from the file `[main-aot.ts](https://github.com/angular/angular.io/blob/281efb9ca0d278b36e2e7fa0850a807d7005e50b/public/docs/_examples/upgrade-phonecat-3-router/ts/app/main-aot.ts#L7)`:

```
import { platformBrowser } from '@angular/platform-browser';import { AppModuleNgFactory } from './app.module.ngfactory';// *** Follow bootstrapModuleFactory() ***  
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
```

_Pay attention:_ in each piece of code there is a comment that allows following the bootstrap call sequence `// *** Follow`.

**Tip**  
When invoking the `ng build` and not simply the compiler as done before, Webpack bundles what has been produced by the compiler, so opening the files results in a slightly different code.

<img class="cp t u hk ak" src="https://miro.medium.com/max/1236/0*FU3GVy8Ce9ZyhcH1.png" width="618" height="366" role="presentation"/>

_Basically_ the IIEF function bootstraps the platform `PlatformRef`, that, in turn, instantiates the application `ApplicationRef` and then the module along with all the required injectable providers. Finally, the component is created and rendered into the DOM.

**Internals**  
The application code is composed of `app.module.ts` and `app.component.ts`. First Angular runtime has to be started, then it creates the _platform_ linked to the page, starts the _application_ that is the _module_. Once the module has been started the _component_ can be instantiated and rendered.

1. Platform
============

The Angular platform `[PlatfromRef](https://github.com/angular/angular/blob/d2222541e8acf0c01415069e7c6af92b2acbba4f/packages/core/src/application_ref.ts#L235)` is the _entry point for Angular on a web page_. Each page has _exactly one platform_ and services bound to its scope. A _page's platform_ is initialized implicitly when a platform is created via a platform factory (e.g. `platformBrowser`).

```
class PlatformRef {  
    ...  
    /**  
     * Creates an instance of an `@NgModule` for the given platform  
     * for offline compilation.  
     */  
    bootstrapModuleFactory(moduleFactory, options) {  
      // Note: We need to create the NgZone _before_ we instantiate the module,  
      ...  
      return ngZone.run((  
        const ngZoneInjector = Injector.create(  
          {providers: providers, parent: this.injector, name: moduleFactory.moduleType.name}); // from here the ApplicationRef is created and available to be injected  
        const moduleRef = InternalNgModuleRef<M>moduleFactory.create(ngZoneInjector);  
        ...  
        // *** Follow _moduleDoBootstrap() ***  
        // moduleType: *class AppModule*  
        this._moduleDoBootstrap(moduleRef);  
        return moduleRef;  
        ...  
      ));  
    }  
    ...  
    /**  
     * Bootstrap all the components of the module  
     */  
    _moduleDoBootstrap(moduleRef) {  
      ...  
      const appRef = moduleRef.injector.get(ApplicationRef) as ApplicationRef;  
      ...  
      // loop over the array defined in the @NgModule, bootstrap: [AppComponent]  
      moduleRef._bootstrapComponents.forEach((  
        // *** Follow bootstrap() ***  
        // bootstrap the root component *AppComponent* with selector *app-root*  
        f => appRef.bootstrap(f)));  
      ));  
    }  
}
```

_Basically_ change detection is managed by `[Zone.js](https://blog.angularindepth.com/i-reverse-engineered-zones-zone-js-and-here-is-what-ive-found-1f48dc87659b)` that run the module bootstrap. `ApplicationRef` reference is created and then it bootstraps the `AppComponent` component.

2. Application
===============

The `[ApplicationRef](https://github.com/angular/angular/blob/d2222541e8acf0c01415069e7c6af92b2acbba4f/packages/core/src/application_ref.ts#L503)` reference represents an Angular application _running on a page_.

```
class ApplicationRef {  
      ...  
      /**  
       * Bootstrap a new component at the root level of the application.  
       * When bootstrapping a new root component into an application, Angular mounts the  
       * specified application component onto DOM elements identified by the componentType's  
       * selector and kicks off automatic change detection to finish initializing the component.  
       */  
      bootstrap(componentOrFactory, rootSelectorOrNode) {  
        ...  
        /**  
         * Use the componentFactory to create the root element app-root having this information:  
         * componentType: class AppComponent  
         * viewDefFactory: View_AppComponent_Host_0()  
         * selector: app-root  
         */  
        // *** Follow create() ***  
        const compRef = componentFactory.create(Injector.NULL, [], selectorOrNode, ngModule);  
        ...  
      }  
  }
```

3. Root component
==================

Build the root component:

```
class ComponentFactory_ extends ComponentFactory {  
    ...  
    create(injector, projectableNodes, rootSelectorOrNode, ngModule) {  
      const view = Services.createRootView(injector, projectableNodes || [], rootSelectorOrNode, viewDef, ngModule, EMPTY_CONTEXT);  
    }  
  }
```

_Basically_ the Angular `[component_factory.ts](https://github.com/angular/angular/blob/d192a7b47a265aee974fb29bde0a45ce1f1dc80c/packages/core/src/linker/component_factory.ts#L79)` holds the base class method to create a component of a certain type:

```
class ComponentFactory_ extends ComponentFactory<any> { viewDefFactory: ViewDefinitionFactory; /**  
   * Creates a new component.  
   */  
  create(  
      injector: Injector, projectableNodes?: any[][], rootSelectorOrNode?: string|any,  
      ngModule?: NgModuleRef<any>): ComponentRef<any> {  
    if (!ngModule) {  
      throw new Error('ngModule should be provided');  
    }  
    const viewDef = resolveDefinition(this.viewDefFactory);  
    const componentNodeIndex = viewDef.nodes[0].element !.componentProvider !.nodeIndex;  
    // *** Follow createRootView() ***  
    const view = Services.createRootView(  
        injector, projectableNodes || [], rootSelectorOrNode, viewDef, ngModule, EMPTY_CONTEXT);  
    const component = asProviderData(view, componentNodeIndex).instance;  
    if (rootSelectorOrNode) {  
      view.renderer.setAttribute(asElementData(view, 0).renderElement, 'ng-version', VERSION.full);  
    } return new ComponentRef_(view, new ViewRef_(view), component);  
  }  
}
```

_Basically_ the implementation uses the function `resolveDefinition()` to load the view definition. This function will be used many times around the code. The `createRootView()` function creates a `ViewData` object that contains the information that will be used later on to render the node into the DOM.

4. Create nodes
================

The code is going to arrive at the point where the DOM API is called to create and attach the element to the DOM.

```
function createRootView(root, def, context) {  
  const view = createView(root, root.renderer, null, null, def);  
  initView(view, context, context);  
  // *** Follow createViewNodes() ***  
  createViewNodes(view);  
  return view;  
}
```

the function `[function createViewNodes(view: ViewData){...}](https://github.com/angular/angular/blob/d192a7b47a265aee974fb29bde0a45ce1f1dc80c/packages/core/src/view/view.ts#L250)` creates a DOM element w.r.t. its type:

```
function createViewNodes(view) {  
  const nodes = view.nodes;  
  for (let i = 0; i < def.nodes.length; i++) {  
    switch (nodeDef.flags & 201347067 /* Types */) {  
      case 1 /* TypeElement */:  
        // H1 DOM element of type any, the function calls the DOM renderer to render the element  
        // *** Follow createElement() ***  
        const el = (createElement(view, renderHost, nodeDef)));  
        ...  
        // View_AppComponent_0()  
        const compViewDef = resolveDefinition(((nodeDef.element)).componentView)));  
        ...  
        break;  
      case 2 /* TypeText */:  
        ...  
        break;  
      ...  
    }  
  }  
}
```

5. The renderer
================

```
createElement(name: string, namespace?: string): any {  
    if (namespace) {  
      // In cases where Ivy (not ViewEngine) is giving us the actual namespace, the look up by key  
      // will result in undefined, so we just return the namespace here.  
      return document.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);  
    } // *** FOUND ***  
    return document.createElement(name);  
  }
```

**Tip**  
An HTML template is transformed in an _intermediate_ format or Object Model by the Angular compiler.  
Factory functions are automatically generated by the compiler and they are able to produce an object that can create a component or a node or a module. Then a renderer, specified by the chosen platform, will produce DOM elements in case of a DOM renderer.

Conclusions
===========

It has been shown how the Angular compiler transforms the Angular declarative syntax and the decorators into something the Angular runtime can execute. The Angular compiler and the runtime constitute the rendering architecture.

A developer can use a simple syntax without worrying about change detection and performance optimization w.r.t. the DOM updates since the Angular framework, behind the scenes, does all the job. When new optimizations are available can be got transparently and effortlessly.

One of the big issues with the current rendering architecture, View Engine, is to not be tree-shakable and difficult to expand. Angular Ivy will solve all these issues being composed by an _instruction set_ that can be easily expanded and tree-shaken to avoid the delivery of the full Angular runtime to the browser as today.

References
==========

DOM
---

*   [Understanding the critical rendering path](https://bitsofco.de/understanding-the-critical-rendering-path/)
*   [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
*   [What exactly is the DOM](https://bitsofco.de/what-exactly-is-the-dom/)