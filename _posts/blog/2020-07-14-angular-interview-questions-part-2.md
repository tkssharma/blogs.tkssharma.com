---
date: 2020-06-14
title: 'Angular Interview Questions Part-2'
template: post
featured:  '../thumbnails/angular.png'
thumbnail: '../thumbnails/angular.png'
slug: angular-interview-qiestions-part-2
categories:
  - Popular
tags:
  - angular
  - interview
  - crack jobs
  - javascript
---
## Understanding  TemplateRef

The notion of a template should be familiar for most web developers. It’s a group of DOM elements that are reused in views across the application. Before the HTML5 standard introduced the template tag, most templates arrived to the browser wrapped in a script tag with some variation of the type attribute:

```html
<script id="tpl" type="text/template">
  <span>I am span in template</span>
</script>
```

This approach certainly had many drawbacks like the semantics and the necessity to manually create DOM models. With the template tag a browser parses html and creates a DOM tree but doesn't render it. It can then be accessed through the content property:

```html
<script>
  let tpl = document.querySelector("#tpl")
  let container = document.querySelector(".insert-after-me")
  insertAfter(container, tpl.content)
</script>
<div class="insert-after-me"></div>
<ng-template id="tpl">
  <span>I am span in template</span>
</ng-template>
```

Angular embraces this approach and implements TemplateRef class to work with a template. Here is how it can be used:

```js
@Component({
  selector: "sample",
  template: `<ng-template #tpl>
    <span>I am span in template</span>
  </ng-template>`,
})


export class SampleComponent implements AfterViewInit {
  @ViewChild("tpl") tpl: TemplateRef<any>

  ngAfterViewInit() {
    let elementRef = this.tpl.elementRef
    // outputs `template bindings={}`
    console.log(elementRef.nativeElement.textContent)
  }
}
```

The framework removes the template element from the DOM and inserts a comment in its place. This is how it looks when rendered:

```html
<sample>
  <!--template bindings={}-->
</sample>
```

By itself the TemplateRef class is a simple class. It holds a reference to its host element in the elementRef property and has one method: createEmbeddedView.

However, this method is very useful since it allows us to create a view and return a reference to it as ViewRef.

#### Further Reading

[https://indepth.dev/exploring-angular-dom-manipulation-techniques-using-viewcontainerref/](https://indepth.dev/exploring-angular-dom-manipulation-techniques-using-viewcontainerref/)

#### Template References

We can also have a template injected directly into our component using the ViewChild decorator:

```ts
@Component({
  selector: 'app-root',
  template: `      
      <ng-template #defaultTabButtons>
          <button class="tab-button" (click)="login()">
            {{loginText}}
          </button>
          <button class="tab-button" (click)="signUp()">
            {{signUpText}}
          </button>
      </ng-template>
`})
export class AppComponent implements OnInit {

    @ViewChild('defaultTabButtons')
    private defaultTabButtonsTpl: TemplateRef<any>;

    ngOnInit() {
        console.log(this.defaultTabButtonsTpl);
    }

}
```

Things that are inside `ng-template` component can only be grabbed and used somewhere else later.
To be able to grab this template, I have given it a variable called "defaultTabButtons". 

And then going into the Component code of this file, adding the same "defaultTabButtons" variable inside ViewChild. So this 'defaultTabButtons" acts as a hook to grab thinks inside `ng-template`

As we can see, the template can be injected just like any other DOM element or component, by providing the template reference name defaultTabButtons to the ViewChild decorator.

This means that templates are accessible also at the level of the component class, and we can do things such as for example pass them to child components!

An example of why we would want to do that is to create a more customizable component, where can pass to it not only a configuration parameter or configuration object: we can also pass a template as an input parameter.


#### Important 
Sometime, we need to be able to access the code that is grabbed by the `ViewChild`. To do so, we are going to use a lifecycle hook called `AfterViewInit`.


#### Further Reading

[https://blog.angular-university.io/angular-ng-template-ng-container-ngtemplateoutlet/](https://blog.angular-university.io/angular-ng-template-ng-container-ngtemplateoutlet/)

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

### QueryList —

The return type of ViewChildren is QueryList.

QueryList is an unmodifiable list of items that Angular keeps up to date when the state of the application changes.

A "QueryList,", is a live list of directive and variable bindings contained within a directive. In laymen's terms, its a collection of references to rendered items within the DOM (Document Object Model) tree. The QueryList is an unmodifiable iterator of the current references.

"Unmodifiable" is not the same as "immutable." In fact, the QueryList is a mutable data structure for which the Angular framework manages the state. This is why changes to the underlying DOM references can be observed on the same QueryList instance.

QueryList is just a fancy name for an object that stores a list of items. What is special about this object is when the state of the application changes Angular will automatically update the object items for you.

The type of object that ViewChildren, ContentChildren, and QueryList provide.

Implements an iterable interface, therefore it can be used in both ES6 javascript for (var i of items) loops as well as in Angular templates with \*ngFor="let i of myList".

Changes can be observed by subscribing to the changes Observable.

### QueryList API —

#### Getters —

- first — get the first item
- last — get the last item
- length — get the items length

#### Methods —

map(), filter() , find(), reduce(), forEach(), some().

toArray() — returns the items as javascript array

changes() — Changes can be observed by subscribing to the changes Observable. Any time a child element is added, removed, or moved, the query list will be updated, and the changes observable of the query list will emit a new value.

#### Remember —

The QueryList is initialized only before the ngAfterViewInit lifecycle hook, therefore, is available only from this point.

#### Further Reading

[https://netbasal.com/understanding-viewchildren-contentchildren-and-querylist-in-angular-896b0c689f6e](https://netbasal.com/understanding-viewchildren-contentchildren-and-querylist-in-angular-896b0c689f6e)

## ViewChildren vs ContentChildren —

ViewChildren don’t include elements that exist within the ng-content tag.
ContentChildren includes only elements that exists within the ng-content tag.

#### First a quick review of the main lifecycle hooks for components and directives

constructor : It is invoked when a component or directive is created by calling new on the class.

ngOnChanges : It is invoked whenever there is a change or update in any of the @Input() properties of the component.

ngOnInit : It is invoked every time a given component is initialized. This hook is only once called in its lifetime after the first ngOnChanges .

ngDoCheck : It is invoked whenever the change detector of the given component is called. This allows you to implement your own change detection algorithm for the provided component.

ngOnDestroy : It is invoked right before the component is destroyed by Angular. You can use this hook in order to unsubscribe observables and detach event handlers for avoiding any kind of memory leaks.

#### Difference between ngOnChanges and ngOnInit

ngOnInit() is used to execute any piece of code for ONLY ONE TIME (for eg : data fetch on load).

ngOnChanges() will execute on every @Input() property change.

If you want to execute any component method, based on the @Input() value change, then you should write such logic inside ngOnChanges().

So why do we need ngOnInit() when we have ngOnChanges() ?

It is because you cannot execute one time code, on every @Input() property change. And you cannot use constructor as the replacement of ngOnInit() as well. Because the bindings, such as @Input properties are not available within the constructor.

ngOnChanges will be called first on the life cycle hook when there is a change to the component inputs through the parent.

ngOnInit will be called only once on initializing the component after the first ngOnChanges called.

#### Why is ngOnInit not the first lifecycle hook?

ngOnInit() is called after ngOnChanges() was called the first time.

This ensures that initial values bound to inputs are available when ngOnInit() is called. ngOnChanges() is called after inputs were updated.

SimpleChanges is an Angular/Core feature that can be used to see the changes and a few more details of the declared property names in a component. And also it needs to be used in the Angular ngOnChange method to see the values changes and to do relevant things.

#### SimpleChange

Represents a basic change from a previous to a new value for a single property on a directive instance. Passed as a value in a SimpleChanges object to the ngOnChanges hook.

```ts
class SimpleChange {
    constructor(previousValue: any, currentValue: any, firstChange: boolean);
    previousValue: any;
    currentValue: any;
    firstChange: boolean;
    isFirstChange(): boolean;
}
```

#### PreviesValue :

will give you the value that the property has previously.

#### currentValue:

will give you the current value of the property.

####firstChange():
this is a method and it will return true if the previous value and the current values are the same or else false.

#### For what we can use this?

Let's assume we have these properties declared in the Angular Component.

And whenever a value changes happen to one of these properties you need to run a method or do something in the application. and you need to do it if the changed value is not the same value previously the property had.

So, in this case, we will need an extra variable to hold the current value and check with the new value or some kind of trick to perform this task if we go with basics.
Here you go, this is the place this SimpleChanges going to help you.

And let's assume I need to check the previous value and the current value of the “selecteModuleKey” property and if it's changed then I need to execute a method. So let's get it done as below.

## ngonInit Vs Constructor 

```js
export class App implements OnInit {
  constructor() {
    //called first time before the ngOnInit()
  }

  ngOnInit() {
    //called after the constructor and called  after the first ngOnChanges()
  }
}
```

#### Constructor

A class constructor in Angular is mostly used to inject dependencies. Angular calls this constructor injection pattern.

The Constructor is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses. It has nothing to do with Angular2.
Angular, or better Dependency Injector (DI), analyses the constructor parameters and when it creates a new instance by calling new MyClass() it tries to find providers that match the types of the constructor parameters, resolves them and passes them to the constructor

### NgOnInit

- ngOnChanges is called when an @Input or output binding value changes
- ngOnInit is called after the first ngOnChanges

#### Now when does `ngOnChanges` is called

[angular.io/guide/lifecycle-hooks](https://angular.io/guide/lifecycle-hooks)

Respond when Angular (re)sets data-bound input properties. The method receives a SimpleChanges object of current and previous property values. Called before ngOnInit() and whenever one or more data-bound input properties change.

When Angular calls ngOnInit it has finished creating a component DOM, injected all required dependencies through constructor and processed input bindings. And all of the class members has been defined. So here you have all the required information available which makes it a good place to perform initialization logic.

It’s a common practice to use `ngOnInit` to perform initialization logic even if this logic doesn’t depend on DI, DOM or input bindings.

Mostly we use ngOnInit for all the initialization/declaration and avoid stuff to work in the constructor. The constructor should only be used to initialize class members but shouldn't do actual "work".

So you should use constructor() to setup Dependency Injection and not much else. ngOnInit() is better place to "start" - it's where/when components' bindings are resolved.

[angular.io/api/core/OnInit](https://angular.io/api/core/OnInit)

ngOnInit()

A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked. It is invoked only once when the directive is instantiated.s

Let’s put it all together and see them both in action:

```js
import {Component, OnInit} from '@angular/core';

export class AppComponent implements OnInit {

                  constructor(myService: MyService) {
                  //Let’s assume this will return an array of samples [‘sample 1’, ‘sample 2’, ‘sample 3’]
                  this.samples = myService.getSamples();
                  this.sentence = ‘Number of samples: ’;
  }

ngOnInit() {
  this.countSamples();
}

countSamples() {
  //Result will be ‘Number of samples: 3’
         this.sentence = this.sentence + this.samples.length;
  }
}
```

In this example we are injecting the dependency myService. You should not confuse this with MyService (note the uppercase ‘M’) which is the type of the service. Then we are calling the method myService.getSamples() which will resolve with an array. In our ngOnInit() method we call the function this.countSamples() which is able to work with the (already initialized and resolved) fields this.samples and this.sentence. We can see that countSamples() simply appends the length of this.samples to the string this.sentence.

#### Lastly take a look at the comparison between lifecycle hooks between React and Angular


## ngAfterViewInit vs ngOnInit 

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





