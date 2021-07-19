---
date: 2020-02-06
title: 'Reactive Programming in Vanilla Javascript'
template: post
thumbnail: '../thumbnails/js.png'
slug: programming-reactive-programming-frp
categories:
  - javascript
tags:
  - javascript
  - rx/js
  - Reactive Programming
---

<img class="cp t u fy ak" src="https://miro.medium.com/max/5484/1*Mv0gADYZ77P7qCBKK7MsrA.png" width="2742" height="1258" role="presentation"/>

RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code. This project is a rewrite of Reactive-Extensions/RxJS with better performance, better modularity, better debuggable call stacks while staying mostly backward compatible, with some breaking changes that reduce the API surface

I took a challenge to explain RxJS to developers in a simplistic way. The hardest part of the learning RxJS is **“Thinking in Reactively”**.

> _Think of RxJS as “LoDash” for handling asynchronous events._

**So, What Exactly, Reactive Programming is?**

When using reactive programming, data streams are going to be the spine of your application. Events, messages, calls, and even failures are going to be conveyed by a data stream. With reactive programming, you observe these streams and react when a value is emitted.

So, in your code, you are going to create data streams of anything and from anything: click events, HTTP requests, ingested messages, availability notifications, changes on a variable, cache events, measures from a sensor, literally anything that may change or happen. This has an interesting side-effect on your application: it’s becoming inherently asynchronous.

<img class="cp t u fy ak" src="https://miro.medium.com/max/1060/0*W6kfiJLbQRbFCUPC.jpg" width="530" height="289" role="presentation"/>

Reactive programming is a programming paradigm for writing code, mainly concerned with **asynchronous data streams.** Just a different way of building software applications which will “react” to changes that happen instead of the typical way of writing software where we explicitly write code (aka “imperative” programming) to handle those changes.

RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the [Observable](https://rxjs-dev.firebaseapp.com/guide/observable), satellite types (Observer, Schedulers, Subjects) and operators inspired by [Array#extras](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.6) (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

_Think of RxJS as Lodash for events._

ReactiveX combines the [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) with the [Iterator pattern](https://en.wikipedia.org/wiki/Iterator_pattern) and [functional programming with collections](http://martinfowler.com/articles/collection-pipeline/#NestedOperatorExpressions) to fill the need for an ideal way of managing sequences of events.

The essential concepts in RxJS which solve async event management are:

*   **Observable**: represents the idea of an invokable collection of future values or events.
*   **Observer**: is a collection of callbacks that knows how to listen to values delivered by the Observable.
*   **Subscription**: represents the execution of an Observable, is primarily useful for canceling the execution.
*   **Operators**: are pure functions that enable a functional programming style of dealing with collections with operations like `map`, `filter`, `concat`, `reduce`, etc.
*   **Subject**: is the equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
*   **Schedulers**: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. `setTimeout` or `requestAnimationFrame` or others.

Stream
======

<img class="cp t u fy ak" src="https://miro.medium.com/max/1888/1*8iq9DA0IzahU1ZcA20CA9g.png" width="944" height="505" role="presentation"/>

example of two observables getting merge ->filter -> map

A stream is a sequence of ongoing events ordered in time. It can be anything like user inputs, button clicks or data structures. You can listen to a stream and react to it accordingly. You can use functions to combine, filter or map streams.

Stream emit three things during its timeline, a value, an error, and complete signal. We have to catch this asynchronous event and execute functions accordingly.

Both promise and observables are built to solve problems around async (to avoid “callback hell”).

**Types of async operations in modern web applications**

*   DOM Events- (mouse events, touch events, keyboard events, form events etc)
*   Animations — (CSS Transitions and Animations, requestAnimationFrame etc)
*   [AJAX](https://www.thoughtco.com/use-asynchronous-or-synchronous-ajax-2037228)
*   [WebSockets](https://pusher.com/websockets)
*   [SSE — Server-Sent Events](https://en.wikipedia.org/wiki/Server-sent_events)
*   Alternative inputs (voice, joystick etc)

If you’re still confused, don’t worry, this normally doesn’t make much sense at this point. Let’s dive in a step by step.

Observable
==========

<img class="cp t u fy ak" src="https://miro.medium.com/max/1478/0*eWZGtQ1pKv48Odyz.jpg" width="739" height="244" role="presentation"/>

*   An Observable is just a function, with a few special characteristics. It takes in an “observer” (an object with “next”, “error” and “complete” methods on it), and returns cancellation logic.
*   Observables provide support for passing messages between publishers and subscribers in your application.
*   Observables offer significant benefits over other techniques for event handling, asynchronous programming, and handling multiple values.
*   Observables are lazy. It doesn’t start producing data until you subscribe to it.
*   `subscribe()` returns a subscription, on which a consumer can be a call `unsubscribe()` to cancel the subscription and tear down the producer.
*   RxJS offers a number of functions that can be used to create new observables. These functions can simplify the process of creating observables from things such as events, timers, promises, and so on. For example:

```
const button = document.querySelector("button");  
    const observer = {  
      next: function(value) {  
        console.log(value);  
      },  
      error: function(err) {  
        console.error(err);  
      },  
      complete: function() {  
        console.log("Completed");  
      }  
    };// Create an Observable from event  
    const observable = Rx.Observable.fromEvent(button, "click");  
    // Subscribe to begin listening for async result  
    observable.subscribe(observer);
```

Subscription
============

<img class="cp t u fy ak" src="https://miro.medium.com/max/986/0*zGBOa0rw-R02wNPy.jpg" width="493" height="352" role="presentation"/>

*   An Observable instance begins publishing values only when someone subscribes to it. You subscribe by calling the `subscribe()` method of the instance, passing an `observer` object to receive the notifications.
*   A Subscription has one important method, `unsubscribe()`, that takes no argument and just disposes of the resource held by the subscription.

```
const button = document.querySelector("button");  
    const observable = Rx.Observable.fromEvent(button, "click");  
    const subscription = observable.subscribe(event => console.log(event));  
    // Later:  
    // This cancels the ongoing Observable execution which  
    // was started by calling subscribe with an Observer.  
    subscription.unsubscribe();
```

Observer
========

<img class="cp t u fy ak" src="https://miro.medium.com/max/1760/0*4-E7cyXpqJwdgS2Q.jpg" width="880" height="270" role="presentation"/>

*   An `observer` is an object literal with `next()`, `error()` and `complete()` functions. In the above example, the observer is the object literal we pass into our `.subscribe()` method.
*   When an Observable produces values, it then informs the observer, by calling `.next()` method when a new value was successfully captured and `.error()` when an error occurred.
*   When we subscribe to an Observable, it will keep passing values to an observer until the complete signal.
*   Example of an observer.

```
// observer is just object literal with next(), error() and complete() functions  
    // Howerver, next() function is required, remaining error() and complete() functions are optional   
    const observer = {  
      next: function(value) {  
        console.log(value);  
      },  
      error: function(err) {  
        console.error(err);  
      },  
      complete: function() {  
        console.log("Completed");  
      }  
    };
```

Operators
=========

<img class="cp t u fy ak" src="https://miro.medium.com/max/1510/0*PEYJstYTwxg9WGx_.png" width="755" height="291" role="presentation"/>

*   Operators are functions that build on the Observables foundation to enable sophisticated manipulation of collections.
*   An Operator is essentially a pure function which takes one Observable as input and generates another Observable as output.
*   There are operators for different purposes, and they may be categorized as creation, transformation, filtering, combination, multicasting, error handling, utility, etc.
*   Operators pass each value from one operator to the next before proceeding to the next value in the set. This is different from array operators (map and filter) which will process the entire array at each step.
*   For example,

```
const observable = Rx.Observable.of(1, 2, 3)  
                     .map(value => value * value);  
observable.subscribe(x => console.log(x));
```

*   RxJS provides many operators, but only a handful are used frequently. For a list of operators and usage samples, visit the [RxJS API Documentation](http://reactivex.io/rxjs/manual/overview.html#operators).

<img class="cp t u fy ak" src="https://miro.medium.com/max/1156/0*qpLvh9KAwEGS_5di.png" width="578" height="388" role="presentation"/>

Let’s Talk one by one Creation, Filtering and Transformation of Observables

`Creating Observables using( .create/of/from/timer)`
====================================================

Let’s start with the `create` Operator, the one we used in the previous articles to create an Observable.

As Stated in documentation “ `Rx.Observable.create` is an alias for the `Observable` constructor” is the best way to describe it.

The syntax of this method is pretty straight forward, it takes a single function as input, which in turn is passed the observer which can emit values with `.next()`, throw errors with `.error()` and complete with `.complete()` .

Often It is difficult to use to create a method to create a complex observable. So we have many more so-called creation operators which makes using `observables` very simple and easy.

`Of`
----

First comes `Of` operator, probably the simplest creation operator of all.

```
var numbers = Rx.Observable.of(10, 20, 30);  
numbers.subscribe(x => {console.log(x);},   
err => {  console.log(err);}, () => {  
  console.log('done');  
});
```

This operator creates an `Observable` that emits the values you specify as `arguments`, immediately one after the other, and then emits a complete notification.

<img class="cp t u fy ak" src="https://miro.medium.com/max/2560/0*MIZFDowH5316WwD_.png" width="1280" height="340" role="presentation"/>

Using it is also very simple. Check out the example below.

FromEventPattern
----------------

Next comes `FromEventPattern` that creates an Observable from an API based on addHandler/remove handler functions.

The `FromEventPattern` the method takes two arguments one is `addHandler` and the other is `removeHandler`.The `addHandler` is called when the output Observable is subscribed, and `removeHandler` is called when the Subscription is unsubscribed.

<img class="cp t u fy ak" src="https://miro.medium.com/max/2560/0*DYkVDw5blitZIMaD.png" width="1280" height="340" role="presentation"/>

```
function addClickHandler(handler) {  
  document.addEventListener('click', handler);  
}function removeClickHandler(handler) {  
  document.removeEventListener('click', handler);  
}var clicks = Rx.Observable.fromEventPattern(  
  addClickHandler,  
  removeClickHandler  
);  
clicks.subscribe(x => console.log(x));
```

`FromEvent` method creates an `Observable` that emits events of a specific type coming from the given event target.

For example, you can use this method to create an `Observable` from `DOM` events, or Node `EventEmitter` events or others.

You can say it is syntactic sugar for the `FromEventPattern` to handle the cases of `Dom Events` and Node `EventEmitter` .

This method takes two arguments one is the `target` (like a dom element) and an `eventName` .The event handler is attached when the output `Observable` is subscribed, and removed when the `Subscription` is unsubscribed.

<img class="cp t u fy ak" src="https://miro.medium.com/max/2560/0*Zy9ZmrRZ8O9SquG3.png" width="1280" height="340" role="presentation"/>

Syntax of the `FromEvent` is as follows

```
var clicks = Rx.Observable.fromEvent(document, 'click');  
clicks.subscribe(ev => console.log(ev));
```

FromPromise
-----------

`FromPromise` the method simply converts a promise into an `Observable`.It returns an `Observable` that just emits the `Promise’s` resolved value then completes.

```
var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));  
result.subscribe(x => console.log(x), e => console.error(e));
```

This method takes a promise as an input.

Interval
--------

`Interval` creates an `Observable` that emits sequential numbers every specified interval of time. It starts with `0` and it never ends.

```
var numbers = Rx.Observable.interval(1000);  
numbers.subscribe(x => console.log(x));var numbers = Rx.Observable.range(1, 10);  
numbers.subscribe(x => console.log(x));var numbers = Rx.Observable.timer(3000, 1000);  
numbers.subscribe(x => console.log(x));
```

This method takes the Time Interval at which the number is to be emitted in ms.

<img class="cp t u fy ak" src="https://miro.medium.com/max/2560/0*CbzdaZQjyYje_Acj.png" width="1280" height="340" role="presentation"/>

Range
-----

`Range` creates an Observable that emits a sequence of numbers within a specified range.`Range` operator emits a range of sequential integers, in order, where you select the `start` of the range and its `length`.

This method takes 2 arguments one is the `start` and the other is `length` of the sequence.

```
var numbers = Rx.Observable.range(1, 10);  
numbers.subscribe(x => console.log(x));
```

<img class="cp t u fy ak" src="https://miro.medium.com/max/2560/0*S8w_yiw-xNQkzShm.png" width="1280" height="340" role="presentation"/>

Syntax of range observable goes something like this.

Timer
-----

`Timer` creates an Observable that starts emitting after an `initialDelay` and emits ever-increasing numbers after each `period` of time thereafter.

If the second argument is not passed it just emits `0` after the initial delay and completes.

```
var numbers = Rx.Observable.timer(3000, 1000);  
numbers.subscribe(x => console.log(x));
```

<img class="cp t u fy ak" src="https://miro.medium.com/max/2560/0*BUlm4ajUxVGyUZZE.png" width="1280" height="340" role="presentation"/>

The Syntax os Timer goes as follows.

There are few Utility creation operators that are used in conjunction with other operators to handle certain cases. Some of them are listed below.

Empty
-----

`empty` operator works exactly as its name suggests.It emits no values and immediately emits a `complete` notification.

You can use it as shown below

Throw
-----

Similarly `Throw` method is used to throw an error and do nothing.

```
var result = Rx.Observable.throw(new Error('oops!'))result.subscribe(  
  x => {  
    console.log(x);  
  },  
  err => {  
    console.log(`There is an error.`);  
    console.log(err);  
  },  
  () => {  
    console.log(`Done.`);  
  }  
);
```

Its syntax is similar to `empty`.

Subject as an Observable and Observer
=====================================

<img class="cp t u fy ak" src="https://miro.medium.com/max/1522/0*Ys9gTYo8k-f1ZSOc.jpg" width="761" height="321" role="presentation"/>

*   RxJS Subject is a special type of Observable that allows values to be **multicasted to many Observers**. While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), **Subjects are multicast**.
*   A **subject** in RxJS is **a special hybrid that can act as both an Observable and an Observer at the same time.**
*   In the example below, we have two Observers attached to a Subject, and we feed some values to the Subject:

```
const subject = new Rx.Subject();subject.subscribe({  
      next: v => console.log("observerA: " + v)  
    });  
    subject.subscribe({  
      next: v => console.log("observerB: " + v)  
    });subject.next(1);  
    subject.next(2);// output  
    // observerA: 1  
    // observerB: 1  
    // observerA: 2  
    // observerB: 2
```

Observable vs Promise
=====================

<img class="cp t u fy ak" src="https://miro.medium.com/max/1760/0*0f27E1zCX94ifRVx.jpg" width="880" height="384" role="presentation"/>

For better understanding, we’re going to compare and contrast the ES6 Promise API to the Observable library RxJS. We will see how similar Promises and Observables are as well as how they differ and why we would want to use Observables over promises in certain situations.

**Single value vs multiple values**

*   If you make a request through the promise and wait for a response. You can be sure that there won’t be multiple responses to the same request. You can create a Promise, which resolves with some value.
*   The promise is always resolved with the first value passed to the resolve function and ignores further calls to it.
*   On the contrary, Observables allow you to resolve multiple values until we call `observer.complete()` function.
*   Example of Promise and Observable.

```
// creating demoPromise using ES6 Promise API  
    const demoPromise = new Promise((resolve, reject) => {  
      asyncOperation((err, value) => {  
        if (err) {  
          reject(err); // error occured. We will catch error inside chain .catch()  
        } else {  
          resolve(value); // value received. we will get value inside .then() chain method  
        }  
      });  
    });// creating a demoObservable using Rxjs.Observable API  
    const demoObservable = Rx.Observable.create(observer => {  
      asyncOperation((err, value) => {  
        if (err) {  
          observer.error(err); // instead of reject(err)  
        } else {  
          observer.next(value); // instead of resolve(value)  
          observer.complete(); // optional. once your async task finished then call observer.complete()  
        }  
      });  
    });
```

**Eager vs lazy**

*   Promises are eager by design meaning that a promise will start doing whatever task you give it as soon as the promise constructor is invoked.
*   Observables are lazy. The observable constructor gets called only when someone actually subscribes to an Observable means nothing happens until you subscribe to it.
*   Examples,

```
// demoPromise started emmiting values but still we have not call .then() method on promise  
    const demoPromise = new Promise((resolve, reject) => {  
      setTimeout(() => {  
        console.log('emmit value');  
        resolve(100);  
      }, 3000);  
    });// demoObservable not started emmiting values unitll we subscribe to it.  
    const demoObservable = new Observable(observer => {  
      setInterval(() => {  
        if (err) {  
          observer.error('DemoError throw'); // instead of reject(err)  
        } else {  
          observer.next('value'); // instead of resolve(value)  
          observer.complete(); // optional. once your async task finished then call observer.complete()  
        }  
      });  
    });
```

**Not cancellable vs cancellable**

*   One of the first things new promise users often wonder about is how to cancel a promise. ES6 promises do not support cancellation yet. It is, the reality of the matter is cancellation is really an important scenario in client-side programming.
*   Use a third-party library like a `bluebird` or `axios` they offer promise cancellation feature.
*   Observable support cancellation of asynchronous task by calling `unsubscribe()` method on Observable.
*   When you subscribe to an Observable, you get back a Subscription, which represents the ongoing execution. Just call `unsubscribe()` to cancel the execution.
*   Example of cancellable observable

```
const observable = Rx.Observable.from([10, 20, 30]);  
    const subscription = observable.subscribe(x => console.log(x));  
    // Later:  
    subscription.unsubscribe(); // its will stop ongoing execution
```

Practical Examples — Operators (Big List)
=========================================
RxJS
----

### Edit description

#### rxjs-dev.firebaseapp.com

](https://rxjs-dev.firebaseapp.com/guide/operators)

**Map operator**

```
const observable = Rx.Observable.from(2, 4, 6, 8);  
observable.map(value => value * value).subscribe(result => console.log(result));
```

Filter Operator
---------------

```
import { fromEvent } from 'rxjs';  
import { filter } from 'rxjs/operators';const clicks = fromEvent(document, 'click');  
const clicksOnDivs = clicks.pipe(filter(ev => ev.target.tagName === 'DIV'));  
clicksOnDivs.subscribe(x => console.log(x));
```

**distinctUntilChanged Operator**

```
import { of } from 'rxjs';  
import { distinctUntilChanged } from 'rxjs/operators';of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4).pipe(  
    distinctUntilChanged(),  
  )  
  .subscribe(x => console.log(x)); // 1, 2, 1, 2, 3, 4
```

**Do Operator**

```
const dogs = Rx.Observable.of("Buddy", "Charlie", "Cooper", "Rocky");  
// do operator used for debugging purpose  
dogs  
.do(dog => console.log(dog))  
.filter(dog => dog === "Cooper")  
.do(dog => console.log(dog))  
.subscribe(dog => console.log(dog));
```

**Debounce and Throttle**

*   Debounce — Wait X time, then give me the last value.
*   Throttle — Give me the first value, then wait X time.

```
const input = document.querySelector("input");  
const observable = Rx.Observable.fromEvent(input, "keyup");observable.debounceTime(3000).subscribe(event => console.log(event));observable.throttleTime(1000).subscribe(event => console.log(event));
```

**Conclusion**

— explore more on RX with Angular

— explore RX JS Operators and deal with Vanilla JS