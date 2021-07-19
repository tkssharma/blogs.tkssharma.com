---
date: 2020-03-20
title: 'Understnding Subject and Operators for Reactive Programming'
template: post
thumbnail: '../thumbnails/angular.png'
slug: Understnding-Subject-and-Operators-for-Reactive-Programming-angular
categories:
  - Popular
  - Angular
  - Javascript
tags:
  - Typescript
  - Angular
---

Understnding Subject for Reactive Programming
----------------------------------------------

Subjects are used for multicasting Observables. This means that Subjects will make sure each subscription gets the exact same value as the Observable execution is shared among the subscribers. You can do this using the Subject class. But rxjs offers different types of ``Subjects``, ``BehaviorSubject``, ``ReplaySubject`` and ``AsyncSubject``.

The BehaviorSubject
-------------------

One of the variants of the Subject is the BehaviorSubject. The BehaviorSubject has the characteristic that it stores the “current” value. This means that you can always directly get the last emitted value from the BehaviorSubject.

There are two ways to get this last emited value. You can either get the value by accessing the .value property on the BehaviorSubject or you can subscribe to it. If you subscribe to it, the BehaviorSubject will directly emit the current value to the subscriber. Even if the subscriber subscribes much later than the value was stored. See the example below:
```javascript
import * as Rx from "rxjs";

const subject = new Rx.BehaviorSubject();

// subscriber 1
subject.subscribe((data) => {
    console.log('Subscriber A:', data);
});

subject.next(Math.random());
subject.next(Math.random());

// subscriber 2
subject.subscribe((data) => {
    console.log('Subscriber B:', data);
});

subject.next(Math.random());

console.log(subject.value)

// output
// Subscriber A: 0.24957144215097515
// Subscriber A: 0.8751123892486292
// Subscriber B: 0.8751123892486292
// Subscriber A: 0.1901322109907977
// Subscriber B: 0.1901322109907977
// 0.1901322109907977
```

* We first create a subject and subscribe to that with Subscriber A. The Subject then emits it’s value and Subscriber A will log the random number.
* The subject emits it’s next value. Subscriber A will log this again
Subscriber B starts with subscribing to the subject. Since the subject is a BehaviorSubject the new subscriber will automatically receive the last stored value and log this.
* The subject emits a new value again. Now both subscribers will receive the values and log them.
* Last we log the current Subjects value by simply accessing the .value property. This is quite nice as it’s synchronous. You don’t have to call subscribe to get the value.

Last but not least, you can create BehaviorSubjects with a start value. When creating Observables this can be quite hard. With BehaviorSubjects this is as easy as passing along an initial value. See the example below:

```javascript
import * as Rx from "rxjs";

const subject = new Rx.BehaviorSubject(Math.random());

// subscriber 1
subject.subscribe((data) => {
    console.log('Subscriber A:', data);
});

// output
// Subscriber A: 0.24957144215097515
```
![RX](https://i.stack.imgur.com/VyiFf.png)

The ReplaySubject
------------------

The ReplaySubject is comparable to the BehaviorSubject in the way that it can send “old” values to new subscribers. It however has the extra characteristic that it can record a part of the observable execution and therefore store multiple old values and “replay” them to new subscribers.

When creating the ReplaySubject you can specify how much values you want to store and for how long you want to store them. In other words you can specify: “I want to store the last 5 values, that have been executed in the last second prior to a new subscription”. See example code below:

![rx](https://miro.medium.com/max/1880/1*_trxWw965KWpqhomPl-f0w.png)

```javascript
import * as Rx from "rxjs";

const subject = new Rx.ReplaySubject(2);

// subscriber 1
subject.subscribe((data) => {
    console.log('Subscriber A:', data);
});

subject.next(Math.random())
subject.next(Math.random())
subject.next(Math.random())

// subscriber 2
subject.subscribe((data) => {
    console.log('Subscriber B:', data);
});

subject.next(Math.random());

// Subscriber A: 0.3541746356538569
// Subscriber A: 0.12137498878080955
// Subscriber A: 0.531935186034298
// Subscriber B: 0.12137498878080955
// Subscriber B: 0.531935186034298
// Subscriber A: 0.6664809293975393
// Subscriber B: 0.6664809293975393
```
The AsyncSubject
-----------------

While the BehaviorSubject and ReplaySubject both store values, the AsyncSubject works a bit different. The AsyncSubject is aSubject variant where only the last value of the Observable execution is sent to its subscribers, and only when the execution completes. See the example code below:

```javascript
import * as Rx from "rxjs";

const subject = new Rx.AsyncSubject();

// subscriber 1
subject.subscribe((data) => {
    console.log('Subscriber A:', data);
});

subject.next(Math.random())
subject.next(Math.random())
subject.next(Math.random())

// subscriber 2
subject.subscribe((data) => {
    console.log('Subscriber B:', data);
});

subject.next(Math.random());
subject.complete();
```
Quick Compare 

BehaviourSubject
BehaviourSubject will return the initial value or the current value on Subscription
```javascript
var subject = new Rx.BehaviorSubject(0);  // 0 is the initial value

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)  // output initial value, then new values on `next` triggers
});

subject.next(1);  // output new value 1 for 'observer A'
subject.next(2);  // output new value 2 for 'observer A', current value 2 for 'Observer B' on subscription

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)  // output current value 2, then new values on `next` triggers
});

subject.next(3);
With output:

observerA: 0
observerA: 1
observerA: 2
observerB: 2
observerA: 3
observerB: 3
```

Subject
Subject doesnot return the current value on Subscription. It triggers only on .next(value) call and return/output the value

```javascript
var subject = new Rx.Subject();

subject.next(1); //Subjects will not output this value

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(2);
subject.next(3);
```
There is a lot going on in Rxjs and multicasting is on of most important things in the library. Hope this article helped you to understand how sharing operators work and what is their difference. Thanks for reading.

Lets explore more on RX operators in my next blog
