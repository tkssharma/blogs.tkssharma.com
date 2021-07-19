---
date: 2020-02-06
title: 'Importance of RX JS in Data Streams | Power of RX in 5 Minutes'
template: post
thumbnail: '../thumbnails/js.png'
slug: programming-reactive-programming-js
categories:
  - javascript
tags:
  - javascript
  - rx/js
  - Reactive Programming
---


<img class="cp t u gi ak" src="https://miro.medium.com/max/2340/1*ewFkyPZmyQOwidQnnUqFng.jpeg" width="1170" height="658" role="presentation"/>

RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code. This project is a rewrite of Reactive-Extensions/RxJS with better performance, better modularity, better debuggable call stacks while staying mostly backward compatible, with some breaking changes that reduce the API surface

> _Reactive programming is an asynchronous programming paradigm concerned with data streams and the propagation of change. This means that it becomes possible to express static (e.g. arrays) or dynamic (e.g. event emitters) data streams with ease via the employed programming language(s)._

— [https://en.wikipedia.org/wiki/Reactive_programming](https://en.wikipedia.org/wiki/Reactive_programming)

> _An API for asynchronous programming with observable streams_

— [http://reactivex.io/](http://reactivex.io/)

-----------------------------

### learn-rxjs: Clear examples, explanations, and resources for RxJS.

#### [legacy.gitbook.com] (https://legacy.gitbook.com/book/btroncone/learn-rxjs/details)[

Observable
----------

### In ReactiveX an observer subscribes to an Observable. Then that observer reacts to whatever item or sequence of items…

#### reactivex.io

](http://reactivex.io/documentation/observable.html)

The building blocks of Reactive Programming
===========================================

[Observables](http://reactivex.io/documentation/observable.html)
================================================================

*   Observables are the **data source /stream**
*   can emit multiple values, just one, or none
*   can also emit errors
*   can be infinite or finite, in which case they emit their completion event

[Subscribers](http://reactivex.io/documentation/observable.html)
================================================================

*   Subscribers **subscribe** to Observables
*   they consume/observe the data
*   they also receive the errors and completion events from the Observable

[Operators](http://reactivex.io/documentation/operators.html)
=============================================================

*   used to **create** Observables (timers, ranges, from other data sources)
*   used to **transform** Observables (map, buffer, group, scan, etc)
*   used to **filter** Observables (filter, distinct, skip, debounce, etc)
*   used to **combine** Observables (zip, merge, combine latest, etc)

Operators are the horse-power behind observables, providing an elegant, declarative solution to complex asynchronous tasks. This section contains all RxJS operators, included with clear, executable examples. Links to additional resources and recipes for each operator are also provided, when applicable.

*   Combination
*   Conditional
*   Creation
*   Error Handling
*   Multicasting
*   Filtering
*   Transformation
*   Utility

Let’s have a deep dive in Observables and in the Context of Angular
===================================================================

*   what _Observables_ are.
*   Know what _RxJS_ is and how it relates to _Observables_.
*   Know what _operators_ are, how to find out about the list of operators and how to understand an operators function by using marble diagrams.
*   Know how to build a simple application using _RxJS_.

[Observables](https://codecraft.tv/courses/angular/reactive-programming-with-rxjs/observables-and-rxjs/#_observables)
=====================================================================================================================

Streams so far are just a _concept_, an idea.

We link streams together using operators so in our previous example the `add` a function is an operation, specifically, it’s an operation which combines two streams to create a third.

_Observable_ is a new primitive type which acts as a _blueprint_ for how we want to create streams, subscribe to them, react to new values, and combine streams together to build new ones.

It’s currently in the discussion whether or not Observables make it into the _ES7_ version of JavaScript.

We are still trying to roll out ES6 so even if it makes it, it will be many years before ES7 becomes something we can code with natively.

Until then we need to use a library that gives us the _Observable_ primitive and that’s where _RxJS_ comes in.

[RxJS](https://codecraft.tv/courses/angular/reactive-programming-with-rxjs/observables-and-rxjs/#_rxjs)
=======================================================================================================

_RxJS_ stands for *R*eactive E*x*tensions for *J*ava*S*cript and its a library that gives us an implementation of Observables for JavaScript.

Note
----

Observables might become a core part of the JavaScript language in the future, so we can think of RxJS as a placeholder for when that arrives.

RxJS is the JavaScript _implementation_ of the ReactiveX API, which can be found [here](http://reactivex.io/).

The API has _multiple_ implementations in _different languages_, so if you learn RxJS you’ll know how to write **RxJAVA, Rx.NET, RxPY etc…​**

[Library](https://codecraft.tv/courses/angular/reactive-programming-with-rxjs/observables-and-rxjs/#_library)
=============================================================================================================

Let’s explain RxJS by working through a simple example.

To reduce file size the RxJS library is broken up into many different parts, one main one and one for each operation you want to use.

For our example we’ll add the `rx.all.js` library which contains _all_ the operators.

We create a simple index.html file and add the `rx.all.js` library in via a `script` tag.

Note
----

In Angular since we are using modules we’ll be adding in RxJS using `import` statements. We are using script tags here just for simplicity of setup.

```
Copy<!DOCTYPE html>  
<html>  
<head>  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/4.1.0/rx.all.js"></script>  
  <script src="main.js"></script>  
</head>  
<body>  
</body>  
</html>
```

We also create a `main.js` where we will start adding our RxJS code.

[interval](https://codecraft.tv/courses/angular/reactive-programming-with-rxjs/observables-and-rxjs/#_interval)
===============================================================================================================

The first thing we need to to is get an instance of an RxJS Observable, we do this like so:

JavaScript

```
Copylet obs = Rx.Observable;
```

An observable **isn’t** a stream. An observable is a _blueprint_ which describes a _set_ of streams and how they are connected together with `operations`.

I want our observable to create a _single_ stream and push onto that stream a number every second, incremented by 1.

With RxJS to define an observable to achieve the above, we would use the operator `interval`, like so:

JavaScript

```
Copylet obs = Rx.Observable  
    .interval(1000);
```

The operation `interval` takes as the first param the number of milliseconds between each _push_ of the number onto the stream.

<img class="cp t u gi ak" src="https://miro.medium.com/max/658/0*kzvuVQQrneIGzmL-.gif" width="329" height="401" role="presentation"/>

Tip
---

In RxJS operators act on an observable and return an observable with the operator applied, so we can `chain` operators together creating an _Observable Chain_, like so:

JavaScript

```
Copylet obs = Rx.Observable  
    .operator1();  
    .operator2();  
    .operator3();  
    .operator4();  
    .operator5();
```

[subscribe](https://codecraft.tv/courses/angular/reactive-programming-with-rxjs/observables-and-rxjs/#_subscribe)
=================================================================================================================

In RxJS land no one can hear you _scream,_ unless you subscribe.

This observable is _cold_, that means it’s not currently pushing out numbers.

The observable will become _hot_ and start pushing numbers onto its first stream, when it gets it’s the first _subscriber_, like so:

JavaScript

```
Copylet obs = Rx.Observable  
    .interval(1000);obs.**subscribe**(value => console.log("Subscriber: " + value));
```

By calling `subscribe` onto an observable it:

1.  Turns the observable _hot_ so it starts producing.
2.  Lets us pass in a callback function so we react when anything is pushed onto the _final stream_ in the observable chain.

Our application now starts printing out:

```
CopySubscriber: 0  
Subscriber: 1  
Subscriber: 2  
Subscriber: 3  
Subscriber: 4  
Subscriber: 5  
Subscriber: 6  
Subscriber: 7  
Subscriber: 8  
Subscriber: 9  
Subscriber: 10
```

[take](https://codecraft.tv/courses/angular/reactive-programming-with-rxjs/observables-and-rxjs/#_take)
=======================================================================================================

But it just keeps on printing, forever, we just want the first 3 items so we use another operator called `take`.

We pass to that operator the _number of items_ we want to take from the first stream. It creates a second stream and only pushes onto it the number of items we’ve requested, like so:

<img class="cp t u gi ak" src="https://miro.medium.com/max/834/0*uEs8eZev6Bl8blei.gif" width="417" height="400" role="presentation"/>

JavaScript

```
Copylet obs = Rx.Observable  
    .interval(1000)  
    .take(3);obs.subscribe(value => console.log("Subscriber: " + value));
```

This now prints out the below, and then stops:

```
CopySubscriber: 0  
Subscriber: 1  
Subscriber: 2
```

[map](https://codecraft.tv/courses/angular/reactive-programming-with-rxjs/observables-and-rxjs/#_map)
=====================================================================================================

Finally I want to add another operator called `map`, this takes as input the output stream from `take`, convert each value to a date and pushes that out onto a third stream like so:

<img class="cp t u gi ak" src="https://miro.medium.com/max/1144/0*DdVLR7nGxPUKGNKS.gif" width="572" height="401" role="presentation"/>

JavaScript

```
Copylet obs = Rx.Observable  
    .interval(1000)  
    .take(3)  
    .map((v) => Date.now());obs.subscribe(value => console.log("Subscriber: " + value));
```

[Other operators](https://codecraft.tv/courses/angular/reactive-programming-with-rxjs/observables-and-rxjs/#_other_operators)
=============================================================================================================================

The above example showed a very very small subset of the total number of operators available to you when using RxJS.

The hardest part of _learning_ RxJS is understanding each of these operators and how to use them.

In that regard even though you are writing in JavaScript learning RxJS is closer to learning another language altogether.

You can find a list of the operators by looking at the official documentation [here](http://reactivex.io/rxjs/manual/overview.html#operators).

The documentation for the operators we just used above is:

*   [Interval](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-interval)
*   [Take](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-take)
*   [Map](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-map)

[Marble Diagrams](https://codecraft.tv/courses/angular/reactive-programming-with-rxjs/observables-and-rxjs/#_marble_diagrams)
=============================================================================================================================

Trying to understand an operator by just reading some words is pretty difficult.

This is why in this lecture I’ve tried to use animations as much as possible.

The Rx team use something called a _marble_ diagram to visually describe an operators function.

[

RxMarbles: Interactive diagrams of Rx Observables
-------------------------------------------------

### Learn, build, and test Rx functions on Observables

#### rxmarbles.com

](https://rxmarbles.com/)

This is the official marble diagram for the `map` operator:

<img class="cp t u gi ak" src="https://miro.medium.com/max/1280/0*AgvU7-ya7Jw3Y6WV.png" width="640" height="270" role="presentation"/>

*   The line at the top represents _time_ and the _marbles_ with numbers 1, 2 and 3 represent the _input_ stream over time.
*   The line at the bottom represents the _output_ stream after each of the marbles has been processed through the operator.
*   The bit in the middle is the operator, in this example, the operator is a `map` the function which multiplies each _marble_ in the input stream by 10 and pushes them to the output stream.

So in the above, the value 1 gets pushed out onto the output stream as 10.

These diagrams are actually _interactive_.

To understand how an operator works we move the marbles around in the input stream and see how this affects the output stream, like so:

<img class="cp t u gi ak" src="https://miro.medium.com/max/1628/0*A2Fl6WaxF-4fnqHq.gif" width="814" height="273" role="presentation"/>

_Marbles_ for the above operators are [Take](http://reactivex.io/documentation/operators/take.html) and [Map](http://reactivex.io/documentation/operators/map.html)

Where do we see Observable in Angular 8 Application
---------------------------------------------------

What exactly are asynchronous data streams? Let’s take each word separately and put it into context.

*   **_Asynchronous_**, in JavaScript means we can call a function and register a _callback_ to be notified when results are available, so we can continue with execution and avoid the Web Page from being unresponsive. This is used for ajax calls, DOM-events, Promises, WebWorkers and WebSockets.
*   **_Data_**, raw information in the form of JavaScript data types as: Number, String, Objects (Arrays, Sets, Maps).
*   **_Streams_**, sequences of data made available over time. As an example, opposed to Arrays you don’t need all the information to be present in order to start using them.

RxJs
====

The Rx implementation follows the pattern described above. However, some terms and details are different. So let’s take a look at how to subscribe to subjects in RxJs.

Creating a RxJs Subject
=======================

Creating a subject is very easy. Just import the Subject class from the Rx package. This package is included in every angular application, so we do not need to install it separately.

```
import { Subject } from 'rxjs/Subject'
```

Next, we create a new instance of the class. Subject is generic, so we have to define the type of the payload. In this example, our stream will only contain strings.

```
const subject = new Subject<string>()
```

Subscribing to RxJs Streams
===========================

Next, we want to subscribe to our subject, to receive the values that it emits. To do so, just call the subscribe method. It expects a callback function with the value as the first parameter. As the second parameter, you can also register a callback, that is called when an error occurs. That callback gets the error as a parameter. However, having that is optional.

```
subject.subscribe(value => {  
  // value is the value of the received data  
})
```

As mentioned before, subscribing to the subject itself does totally work. The subject itself, however, should never leave the place it was created. For example, you should not return the subject in a function. Otherwise, it becomes hard to understand, where new values enter the stream.

For that reason, **the library contains the observable**. Thankfully converting a subject to an observable is very easy. Just call the observable() method. That way, the caller of the function can only subscribe, but not published.

```
import { Observable } from 'rxjs/Observable'function someFunc(): Observable<number> {  
  const subject = new Subject<number>()  
  return subject.asObservable()  
}
```

Hot & Cold
==========

There are two types of observables. Hot and cold ones. Hot observables are just like the TV station from our example. They always broadcast. It doesn’t matter if there is actually a TV somewhere, that receives the signal. Even if there is no one subscribed to them. Also, if you connect to that observable, you can be at any point in the stream. Missed values, before you connected, cannot be accessed.

Cold observables, on the other hand, are like watching a DVD. They start when you want, typically from the beginning. Cold observables do not produce any output unless there is somebody subscribed to them. They start pushing values to the stream when the subscribe method is called.

Why is this important? There are some services in the angular framework, that return cold observables. One example is the HttpClient. If you don’t subscribe to the result of a request, the request is not actually made!

Unsubscribing
=============

The subscribe() method returns a subscription. Make sure to unsubscribe from that at some if you no longer need it. Otherwise, you create immortal objects and memory leaks.

A good point in angular to unsubscribe from observables is the ngOnDestroy lifecycle event.

```
import { Subject } from "rxjs/Subject";  
import { Observable } from "rxjs/Observable";  
import { Subscription } from "rxjs/Subscription";private subscription: Subscription  
ngOnInit(){  
  this.subscription = new Subject().subscribe();  
}ngOnDestroy(){  
  this.subscription.unsubscribe();  
}
```

Publishing Data with Subjects
=============================

To receive data, somebody has to actually send the data, right? To do so, we use the subject, since the observable is not capable of sending data to the stream.

To push data to the observable’s data stream, we call the next() method. As the parameter, we pass in the value/object we want to broadcast.

```
const subject = new Subject<string>()  
subject.next('string 1')
```

RxJs Operators: Create a pipeline!
==================================

RxJs is not only a great way to decouple your code and handle async broadcasting. It also provides a bunch of operators, that can be used to modify observable streams. However, these operators are where it can get very complex quickly. The good news?

You don’t need those. Actually, you probably will never use most of them. I don’t say that you shouldn’t. Try all of them if you want to. You can see the full [list of operators](http://reactivex.io/documentation/operators.html) here. However, they can be difficult to get your head around. In this article, I will only show you the most common and useful of them.

Map
===

You probably know Array.prototype.map() already. The RxJs map operator does exactly the same. You provide it with a function, that gets applied to all elements that enter the stream before they reach the subscriber.

The following example increases the value of all numbers of the stream by 1.

Also, make sure the operator from the add directory. That way, every operator can be imported separately, to keep the bundle size as small as possible.

Using the map-function, the example looks like this:

```
import { map } from 'rxjs/operators'const observable$ = subject.asObservable()  
observable$.pipe(map(x => x + 1)).subscribe()
```

But why did they change it? The new approach has two major benefits. The main difference to the old is that the operators are now standalone functions. They are not prototype methods of observable anymore.

That allows for bundling them into so-called ECMAScript modules. See how the import call is different? That’s because of the new module format. This format allows for better tree-shaking (keeping unused code out of your application) which results in a smaller application size.

Furthermore, it has become very easy to write your own operators. As operators are just standalone functions now, you can just create your own. Every function that takes an observable and returns one will do.

Filter
======

With the help of the filter operator, it is possible to filter the elements of a stream using a condition. Just like the map operator, the filter operator expects a function. This time, the function has to return either true or false. If you return false, the element is not sent to the subscribers.

In this example, all the stream only contains numbers greater than 1.

```
import { filter } from 'rxjs/operators'observable$  
  .pipe(  
    filter(x => {  
      return x > 0 ? true : false  
    })  
  )  
  .subscribe()
```

Let’s see How can we create Observables using **“fromEvent, of, from” or using new Observable constructor.**

```
let fakeAsyncData$ = new Observable(observer => {  
  setTimeout(() => {  
    observer.next('New data is coming');  
    observer.complete();  
  }, 2000);  
});fakeAsyncData$.subscribe({  
  next(val) { console.log(val) } ,  
  error(e) { console.log(e) } ,  
  complete() { console.log('complete') }   
});  
----------------------------------------------------let array$ = Observable.fromArray([1,2,3]);  
array$.subscribe({  
 next(val) { console.log(val) } ,  
 error(e) { console.log(e) } ,  
 complete() { console.log(‘complete’) }   
});  
----------------------------------------------------var button = document.getElementById(‘button’);  
let clicks$ = Observable.fromEvent(button, 'click')  
              .map(e => `${e.pageX}px`);  
let unsubscribe = clicks$.subscribe({  
  next(val) { console.log(val) } ,  
  error(e) { console.log(e) } ,  
  complete() { console.log('complete') }   
});
```

In Angular we generally not creating observables we are just subscribing them and getting data from Streams, Different places where we see Observables being subscribed

1.  Route Change subscription
2.  Angular Form Value change subscription
3.  Angular HTTP service Data subscription

Route Change subscription, subscribing for the Route change

```
export class AppComponent { constructor(private router: Router) { this.router.events.subscribe((event: Event) => {  
            if (event instanceof NavigationStart) {  
                // Show loading indicator  
            } if (event instanceof NavigationEnd) {  
                // Hide loading indicator  
            } if (event instanceof NavigationError) {  
                // Hide loading indicator // Present error to user  
                console.log(event.error);  
            }  
        }); }  
}
```

Form Value Change subscription in Angular Reactive Forms

```
myForm: FormGroup;  
formattedMessage: string;  
constructor(private formBuilder: FormBuilder) {}  
ngOnInit() {  
  this.myForm = this.formBuilder.group({  
    name: '',  
  });  
  this.onChanges();  
}  
onChanges(): void {  
  this.myForm.valueChanges.subscribe(val => {  
    this.formattedMessage =  
    `Hello`;  
  });  
}
```

Creating service with HTTP Client and subscribing this

```
getServiceData(){  
return this.http.get<Product[]>(this.productsUrl)  
    .pipe(  
      map(products =>  
        products.map(product => ({  
          ...product,  
          price: product.price * 1.5  
        }) as Product)  
      )  
      catchError(this.handleError)  
  );  
}  
// in component   
**this._service.getServiceData.subscribe(data => { //deal with data})**
```

Observables are way more than we think, they provide huge benefit with caching, data manipulation, merging two data streams or manipulating data based on conditions, Till now in angular we are applying different operator once we receive a data stream from service like

```
getServiceData(){  
return this.http.get<Product[]>(this.productsUrl)  
    .pipe(  
 **     map(products => product.price),    
      tap(price => console.log(price)),  
      filter(price => price > 5)  
      take(3)**  
       )  
      catchError(this.handleError)  
  );  
}
```[

RxJS and Reactive Programming — Animations and visual lessons
-------------------------------------------------------------

### Learn RxJS and Reactive Programming principles. Watch streams and JavaScript Observable in action. See how reactive…

#### reactive.how

](https://reactive.how/)[

Launchpad for RxJS
------------------

### A visual exploration of all RxJS operators and creation functions.

#### reactive.how

](https://reactive.how/rxjs/concat)

**Observable** and **subject** both are observable’s means an observer can track them. but both of them have some unique characteristics. Further, there are a total of 3 types of subjects each of them again has unique characteristics. lets try to to understand each of them.

<img class="cp t u gi ak" src="https://miro.medium.com/max/1558/0*Nlbis6dJEHlPzkEU.png" width="779" height="222" role="presentation"/>

[

RxJS Subjects Tutorial — Subjects, BehaviorSubject, ReplaySubject & AsyncSubject
--------------------------------------------------------------------------------

### Note: This tutorial is a part our free comprehensive RxJS Tutorial In the previous tutorial, we learned all about the…

#### coursetro.com

](https://coursetro.com/posts/code/149/RxJS-Subjects-Tutorial---Subjects,-BehaviorSubject,-ReplaySubject-&-AsyncSubject)

CombineLatest two different Observables
---------------------------------------

```
productsWithCategory$ = combineLatest([  
    this.products$,  
    this.productCategoryService.productCategories$  
  ]).pipe(  
    map(([products, categories]) =>  
      products.map(product => ({  
        ...product,  
        price: product.price * 1.5,  
        category: categories.find(c => product.categoryId === c.id).name,  
        searchKey: [product.productName]  
      }) as Product)  
    )  
  );
```

To understand more look into these reference links

RxMarbles: Interactive diagrams of Rx Observables
-------------------------------------------------

### Learn, build, and test Rx functions on Observables
#### [rxmarbles.com] (https://rxmarbles.com/) learn-rxjs · GitBook (Legacy)
-----------------------------

### learn-rxjs: Clear examples, explanations, and resources for RxJS.
#### [legacy.gitbook.com](https://legacy.gitbook.com/book/btroncone/learn-rxjs/details)[
Observable
----------
### In ReactiveX an observer subscribes to an Observable. Then that observer reacts to whatever item or sequence of items…

#### [reactivex.io] (http://reactivex.io/documentation/observable.html)