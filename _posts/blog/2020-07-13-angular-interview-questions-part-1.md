---
date: 2020-06-13
title: 'Angular Interview Questions Part-1'
template: post
featured:  '../thumbnails/angular.png'
thumbnail: '../thumbnails/angular.png'
slug: angular-interview-qiestions-part-1
categories:
  - Popular
tags:
  - angular
  - interview
  - crack jobs
  - javascript
---

## 3 common methods that we can use to share data between Angular components.

1. Sharing Data via Input
2. Sharing Data via Output and EventEmitter
3. Sharing Data with a Service

### Parent to Child via @Input() decorator.

When you declare a variable in the child component with the @Input() decorator, it allows that variable to be “received” from the parent component template.

#### parent.component.ts

```js
import { Component } from "@angular/core"

@Component({
  selector: "app-parent",
  template: "parent.component.html",
  styleUrls: ["./parent.component.css"],
})
export class ParentComponent {
  Message = "Parent to Child"
  constructor() {}
}
```

#### parent.component.html

See that the way a prop is passed from the parent.component.html is using the syntax

`[prop]="prop"`

To compare with React it would be like

`<ChildComp firstName={firstName}>`

```js
<app-child [Message]="Message"></app-child>

```

#### child.component.ts

```js
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: './child.component.html,
  styleUrls: ['./child.component.css']
})
export class ChildComponent {

  @Input() Message: string;

  constructor() { }

}

```

#### child.component.html

```html
<h1>
  Message from Parent : {{Message}}
  <h1></h1>
</h1>
```

#### What Is ContentChildren?

ContentChildren is a parameter decorator that is used to fetch the QueryList of elements or directives from the content DOM. The QueryList is updated whenever the child element/component is added or removed.

The child element reference is set in QueryList just before the ngAfterContentInit lifecycle Hook method.

Below, we are using the ContentChildren to get the QueryList containing the list of the child component ChildComp. The list is stored in the contentChildren variable in the Parent component.

```ts
@ContentChildren(ChildComp) contentChildren : QueryList<ChildComp>;

```

Let’s see an example that utilizes the power of ContentChildren…
We are creating a child component `TabComponent` with an input property object `tab` and a function that prints the title property of the tab object. The template just displays the properties.

Component hierarchy is as below

```
--- AppComponent
  --- TabListComponent
      --- TabComponent

```

```ts
import { Component, Input } from "@angular/core"
@Component({
  selector: "app-tab",
  template: `<h4>{{ tab.title }}</h4>
    <p>{{ tab.content }}</p>`,
})
export class TabComponent {
  @Input() tab: object
  printTitle() {
    console.log(this.tab.title)
  }
}
```

Now TabListComponent

```ts
import {
  ContentChildren,
  QueryList,
  Component,
  AfterContentInit,
} from "@angular/core"
import { TabComponent } from "./tab.component"
@Component({
  selector: "app-tab-list",
  template: `<ng-content></ng-content>`,
})
export class TabListComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabList: QueryList<TabComponent>
  ngAfterContentInit() {
    this.tabList.toArray()[0].printTitle()
  }
}
```

TabListComponent is the parent component where we are accessing the child component TabComponent list from the content DOM using the ContentChildren decorator.

As the child element references are set in QueryList just before the ngAfterContentInit callback, we are accessing the QueryList in the ngAfterContentInit lifecycle Hook.

In the template, we are using the ng-content directive which projects the elements in between the <app-tab-list><app-tab-list> tag to the component’s view.

The elements added between the selector element are said to be content-projected elements and are accessible by ContentChildren.

As you can see, we are able to access the child component method (`printTitle`) from the parent component (as shown in the ngAfterContentInit method).

Finally, this is the top view component with the above two selectors in its template.

```js
import { Component, Input, OnInit } from "@angular/core"

@Component({
  selector: "app-root",
  template: ` <app-tab-list>
    <app-tab *ngFor="let tab of tabs" [tab]="tab"></app-tab>
  </app-tab-list>`,
})
export class AppComponent implements OnInit {
  tabs = []
  ngOnInit() {
    this.tabs = [
      { title: "First Tab title", content: "First Tab content" },
      { title: "Second Tab title", content: "Second Tab content" },
      { title: "Third Tab title", content: "Third Tab content" },
    ]
  }
}
```

Note: If we have a single child content element then we can use ContentChild instead of ContentChildren.


What are decorators?
[docs.angularjs.org/guide/decorators](https://docs.angularjs.org/guide/decorators)

Decorators are a design pattern that is used to separate modification or decoration of a class without modifying the original source code. In Angular, decorators are functions that allow a service, directive or filter to be modified prior to its usage.

In angular you create classes for everything, be it components, services, directives, etc.

So, how does angular compiler compiles your code and transforms it into ready-to-be-run scripts in browser?

This happens because of decorators. In simple term, decorators allows you to attach meta data with the typescript class using which angular knows whether that class is a component or directive or module or etc.

Normally prefixed with an ‘@’

<img src="./decorators.webp">

As a design pattern decorator :

Attaches additional responsibilities to an object dynamically
Offers flexible alternative to sub-classing for extending functionality

There are four main types of decorators:

Class decorators, e.g. @Component and @NgModule

Property decorators for properties inside classes, e.g. @Input and @Output

Method decorators for methods inside classes, e.g. @HostListener

Parameter decorators for parameters inside class constructors, e.g. @Inject
@ContentChildren is also a parameter decorator that is used to fetch the QueryList of elements or directives from the content DOM. The QueryList is updated whenever the child element/component is added or removed.

Notice the () on @Component which is a Class Decorators. This means that the @Component is called once JavaScript encounters @Component(). In turn, this means that there must be a Component function somewhere that returns a function matching one of the decorator signatures outlined above. This is an example of the decorator factory pattern.

[ultimatecourses.com/blog/angular-decorators](https://ultimatecourses.com/blog/angular-decorators)

Class Decorators

Angular offers us a few class decorators. These are the top-level decorators that we use to express intent for classes. They allow us to tell Angular that a particular class is a component, or module, for example. And the decorator allows us to define this intent without having to actually put any code inside the class.

A @Component and @NgModule decorator example with classes:

```js
import { NgModule, Component } from "@angular/core"

@Component({
  selector: "example-component",
  template: "<div>Woo a component!</div>",
})
export class ExampleComponent {
  constructor() {
    console.log("Hey I am a component!")
  }
}

@NgModule({
  imports: [],
  declarations: [],
})
export class ExampleModule {
  constructor() {
    console.log("Hey I am a module!")
  }
}
```

Notice how both classes by themselves are effectively the same. No code is needed within the class to tell Angular that it is a component or a module. All we need to do is decorate it, and Angular will do the rest.

Here’s the list of decorators available in Angular:

@NgModule
@Component
@Injectable
@Directive
@Pipe
@Input
@Output
@HostBinding
@HostListener
@ContentChild
@ContentChildren
@ViewChild
@ViewChildren

### Further Reading

[list-of-all-decorators-available-in-angular-71bdf4ad6976](https://medium.com/@madhavmahesh/list-of-all-decorators-available-in-angular-71bdf4ad6976)

## what is Decorators

A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.

For example, given the decorator @sealed we might write the sealed function as follows:

```js
function sealed(target) {
  // do something with 'target' ...
}
```

The following is an example of a class decorator (@sealed) applied to the Greeter class:

```js
@sealed
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return "Hello, " + this.greeting
  }
}

// We can define the @sealed decorator using the following function declaration:

function sealed(constructor: Function) {
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}
```

Property Decorators
These are probably the second most common decorators that you’ll come across. They allow us to decorate specific properties within our classes - an extremely powerful mechanism.

Let’s take a look at @Input(). Imagine that we have a property within our class that we want to be an input binding.

Without decorators, we’d have to define this property in our class anyway for TypeScript to know about it, and then somewhere else tell Angular that we’ve got a property that we want to be an input.

With decorators, we can simply put the @Input() decorator above the property - which Angular’s compiler will automatically create an input binding from the property name and link them.

```ts
import { Component, Input } from "@angular/core"

@Component({
  selector: "example-component",
  template: "<div>Woo a component!</div>",
})
export class ExampleComponent {
  @Input()
  exampleProperty: string
}
```

We’d then pass the input binding via a component property binding:

```js
<example-component
  [exampleProperty]="exampleData">
</example-component>
```



The @ViewChild and @ViewChildren decorators in Angular provide a way to access and manipulate DOM elements, directives and components. In this tutorial, we'll see an Angular 9 example of how to use the two decorators.

You can use ViewChild if you need to query one element from the DOM and ViewChildren for multiple elements. In other words, they behave the same, only the former returns one reference, while the latter returns multiple references as a QueryList object.

Usually, these decorators are paired with template reference variables. A template reference variable is simply a named reference to a DOM element within a template. You can view it as something similar to the id attribute of an html element. You mark a DOM element with a template reference and then query it inside a class using the ViewChild decorator.

## What's ViewChild in Angular?

ViewChild is a decorator that creates a view or DOM query. According to the docs

Property decorator that configures a view query. The change detector looks for the first element or the directive matching the selector in the view DOM. If the view DOM changes, and a new child matches the selector, the property is updated.

The decorator takes the following meta information:

selector - the selector of the element to query. This can be a directive type or a name.
read - read a different token from the queried elements.
static - This is new in Angular 8 and indicates whether or not to resolve query results before change detection runs.

ViewChild can take the following selectors:

- Classes with the @Component or @Directive decorators i.e components and directives,
- Template reference variables,
- Providers,
- TemplateRef

Now, let's assume in my src/app/app.component.ts file I am doing the query of the child component using ViewChild.

```ts
import { Component, ViewChild, AfterViewInit } from "@angular/core"

import { HelloComponent } from "./hello.component"

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit {
  name = "Angular"
  @ViewChild(HelloComponent, { static: false }) hello: HelloComponent

  ngAfterViewInit() {
    console.log("Hello ", this.hello.name)
  }
}
```

Now in the console (browser dev-tool), you should get `Hello Angular`:

Now, let's explain the code.

First, we imported HelloComponent and ViewChild and AfterViewInit from the @angular/core package:

```javascript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HelloComponent } from './hello.component';

```

Next, we create a query called hello that takes HelloComponent as the selector and has static equals to false:

```javascript
@ViewChild(HelloComponent, {static: false}) hello: HelloComponent;

```

In Angular 9, timing for ContentChild and ViewChild needs to be specified explicitly.

If you want to know, [​Why do I have to specify {static: false}? Isn't that the default?](https://angular.io/guide/static-query-migration#why-do-i-have-to-specify-static-false-isnt-that-the-default)

Next, in the ngAfterViewInit() life-cycle hook, we can use the query to access the DOM element for the hello component. In our example, we accessed the name property of the component, after it's mounted in the DOM, which contains the Angular string:

```javascript
  ngAfterViewInit() {
    console.log('Hello ', this.hello.name);
  }

```

We can access any properties and even methods from the queried component.

## Angular LifeCycle Hooks 

ngOnInit() is called after ngOnChanges() was called the first time. ngOnChanges() is called every time inputs are updated by change detection.

ngOnInit() is called right after the directive's data-bound properties have been checked for the first time, and before any of its children have been checked. It is invoked only once when the directive is instantiated.

ngAfterViewInit() is called once after ngAfterContentChecked(). `ngAfterViewInit()` is called after all child components are initialized and checked.

ngAfterViewInit() is called after the view is initially rendered. This is why @ViewChild() depends on it. You can't access view members before they are rendered.

When I say rendered - It means, it's added to the DOM. If you set `display: hidden` it's till rendered, but not visible on the screen. But if you investigate the DOM using the browsers devtools, you'll be able to see the markup.

ngAfterViewInit() is called after a component's view, and its children's views, are created. Its a lifecycle hook that is called after a component's view has been fully initialized.

ngAfterViewInit() is called when the bindings of the children directives (or components) have been checked for the first time. Hence its perfect for accessing and manipulating DOM with Angular 2 components.

#### ngAfterContentInit vs ngAfterViewInit

Content is what is passed as children usually to be projected at some <ng-content> element of a component.
View is the template of the current component.

The view is initialized after the content and `ngAfterViewInit()` is therefore called after `ngAfterContentInit()`

#### When should you use ngAfterViewInit?

ngAfterViewInit is useful when you want to call a lifecycle hook after all child components have been initialized and checked. The word "check" here used in the sense of change-detection

Lets see and example

```js
import { Component, OnInit, DoCheck, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-home",
  template: `<a (click)="clickMe()">Click me</a>`,
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    console.log("onInit called");
  }
  ngDoCheck() {
    console.log("do check");
  }
  ngAfterViewInit() {
    console.log("after view init");
  }
  clickMe() {
    console.log("link clicked");
  }
}
```

In the example above, ngAfterViewInit() gets called one time after ngDoCheck.

Triggering the clickMe() function WILL NOT trigger ngAfterViewInit().

Remember from [official doc](https://angular.io/guide/lifecycle-hooks#lifecycle-sequence) -

ngDoCheck() - Detect and act upon changes that Angular can't or won't detect on its own.

Called during every change detection run, immediately after ngOnChanges() and ngOnInit().

#### Further Reading

[https://angular.io/guide/lifecycle-hooks#component-lifecycle-hooks-overview](https://angular.io/guide/lifecycle-hooks#component-lifecycle-hooks-overview)


