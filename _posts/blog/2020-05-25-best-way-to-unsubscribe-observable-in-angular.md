---
date: 2020-04-25
title: 'Best way to unsubscribe observable in Angular'
template: post
featured:  '../thumbnails/angular.png'
thumbnail: '../thumbnails/angular.png'
slug: Best-way-to-unsubscribe-observable-in-angular
categories:
  - Popular
tags:
  - typescript
  - angular
  - javascript
---

What are the possible ways to Unsubscribe Observables Angular
-------------------------------------------------------------

### What is Observable


Observable are just that — things you wish to observe and take action on. Angular uses the Observer pattern which simply means — Observable objects are registered, and other objects observe (in Angular using the subscribe method) them and take action when the observable object is acted on in some way. They are similar to promises, but with some differences. Promises execute once and then are done. Observable continue to be observed after the event occurs. Observable can also be cancelled (you can stop observing an object during runtime). Promises cannot be cancelled — which makes sense, since you’re only executing the promise one time.

Observable are used within Angular itself, including Angular’s event system and its http client service. To use observable, Angular uses a third-party library called Reactive Extensions (RxJS). Observable are a proposed feature for ES 2016, the next version of JavaScript.

To use Observable in our Angular application. we need to use rxjs
```javascript
import { Observable } from 'rxjs/Observable';
```
Angular's Event System using Observable which take care of data publishing when change occures and you will recive data if you have subscribed to it,

The only thing which we need to take care of unsubscribe the observable when we are done, In Angular component language we have to unsubscribe these subscription using OnDestry lifecycycle method

Basic observable
```javascript
   const myObservable = Observable.of(1, 2, 3);
     
    // Create observer object
    const myObserver = {
      next: x => console.log('Observer got a next value: ' + x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
     
    // Execute with the observer object
    myObservable.subscribe(myObserver);
```
Some methods of Observable class are subscribe, map, mergeMap, switchMap, exhaustMap, debounceTime, of, retry, catch, throw etc.

subscribe is a method of Observable class. subscribe is used to invoke Observable to execute and then it emits the result. If we have an Observable variable that fetches data over an HTTP then actual hit to server takes place only when we subscribe to Observable using subscribe method or async pipe. Here we will discuss subscribemethod to subscribe to Observable.

- using subscribe Method 
- using async Pipe 

# Best ways to unsubscribe Observable

There are many different ways how to handle RxJS subscriptions in Angular applications

On our journey we will go through various possible solutions to subscribing to RxJs Observable.
- The .subscribe() aka “The Memory Leak”
- The .unsubscribe()
- Let’s get declarative with takeUntil
- Use the take(1) for initialization
- The | async pipe
- The detour — | async pipe taken too far 😵
- The final destination — NgRx Effects

## The .subscribe() aka “The Memory Leak”

Let’s start with the simplest example. We have a timer which is a infinite cold observable.
Cold Observable is an Observable which will do nothing by itself. Somebody has to subscribe to it to start its execution. Infinite means that once subscribed, observable will never complete .
We subscribe to the timer in ngOnInit method of a component and call console.log every time timer emits a new value.

```javascript
export class SomeComponent implements ngOnInit {
  evenryDSecond$: Observable<number> = timer(0,1000);
  // public timer: Subscription;
  ngOnInit(){
    everySecond$.subscribe(i => console.log(i));
  }
}
```

This is the example of Infinite Observable generating data every second
### Why Is This A Memory Leak
Implementation looks good and does exactly what we expect. What would happen if we navigated to some other screen which is implemented using different components? That movement we will move to nest component but still the stream is generating values as unsubscribe didn't happen yet.
> ### The component will get destroyed but the subscription will live on

More logs will keep getting added to the browser console. More so, if we navigated back to the original route. The component would get recreated together with a new subscription.

When not to unsubscribe a particular Case 
Some components (eg AppComponent) and most of the services (with exception of services from lazy loaded modules and services provided in @Component decorator) in our Angular application will be instantiated only once during the application startup.
If we know that we’re dealing with such a case it is OK to subscribe to an Observable without providing any unsubscription logic.

These components and services will live for the whole duration of the application lifetime so they will not produce any memory leaks.

Eventually, these subscriptions will get cleaned up when we navigate away from application to some other website.

## The .unsubscribe() Method

In the above example it is better to unsubscribe as this is infinite observable and poteential casue of Memory leak 

The memory leaks are created when we destroy and recreate our components but we don’t clean up existing subscriptions. As we re-create our components we keep adding more and more subscriptions, hence the memory leak…

```javascript
export class SomeComponent implements ngOnInit, ngOnDestory {
  evenryDSecond$: Observable<number> = timer(0,1000);
  public timer: Subscription;
  ngOnInit(){
    this.timer = evenryDSecond$.subscribe(i => console.log(i));
  }
  ngOnDestroy(){
    this.timer.unsubscribe()
  }
}
```
or if we have multiple subscription, we can create array and unsubscribe each, a little fancy

```javascript
export class SomeComponent implements ngOnInit, ngOnDestory {
  evenryDSecond1$: Observable<number> = timer(0,1000);
  evenryDSecond2$: Observable<number> = timer(0,1000);

  public subscriptions: Subscription [];
  ngOnInit(){
    this.subscriptions.push(evenryDSecond$.subscribe(i => console.log(i)))
    this.subscriptions.push(evenryDSecond$.subscribe(i => console.log(i)))

  }
  ngOnDestroy(){
    this.subscriptions.forEach(i => i.unsubscribe());
  }
}
```
So is this really wrong? No, it works perfectly fine. The problem with this approach is that we’re mixing observable streams with plain old imperative logic.

We can Improve above example, built in mechanism in the Subscription itself to make this happen.

```javascript
export class SomeComponent implements ngOnInit, ngOnDestory {
  evenryDSecond1$: Observable<number> = timer(0,1000);
  evenryDSecond2$: Observable<number> = timer(0,1000);

  public subscriptions: Subscription = new Subscription();
  ngOnInit(){
    this.subscriptions.add(evenryDSecond$.subscribe(i => console.log(i)))
    this.subscriptions.add(evenryDSecond$.subscribe(i => console.log(i)))

  }
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}
```
## Declarative way using takeUntil 

o let’s move on and make our applications better with a help of the takeUntil RxJS operator (this will also make Ben Lesh happy as a side-effect).
Official Docs: ``takeUntil(notifier: Observable<any>)`` — Emits the values emitted by the source Observable until a notifier Observable emits a value.

takeUntil can be a solution for unsubscription an observables
```javascript
export class TestComponent {

  constructor(private store: Store) { }

  private componetDestroyed: Subject = new Subject();
  todos: Subscription;
  posts: Subscription;

  ngOnInit() {
     this.todos = this.store.select('todos').takeUntil(this.componetDestroyed).subscribe(console.log); 

     this.posts = this.store.select('posts').takeUntil(this.componetDestroyed).subscribe(console.log); 
  }
  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
```
This come with some disadvantages, We have to create additional Subject and correctly implement OnDestroy interface in every component of our application which is quite a lot!
Even bigger problem is that it is a quite error prone process. ``It is VERY easy to forget`` to implement OnDestroy interface. And this itself can go wrong in two different ways

## Another way is using take(1)

The take(1) For Initialization

Some subscriptions only have to happen once during the application startup. They might be needed to kick-start some processing or fire the first request to load the initial data.
In such scenarios we can use RxJS take(1) operator which is great because it automatically unsubscribes after the first execution.

```javascript
export class TestComponent {
   search$: Observable<searchState>;
   searchData: search []:
  constructor(private store: Store) { }
  ngOnInit() {
     this.search$.pipe(take(1)).subscribe(data => this.searchData= data )
  }
  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
```
## Async Pipe (data | async)

Angular comes with built in support for pipes. A pipe is neat little abstraction and corresponding syntax which enables us to decouple implementation of various data transforms which then can be used in templates of multiple components.
One useful example would be | json pipe which is provided out of the box and enables us to display content of Javascript objects. We can use it in a template like this {{ someObject | json }} .

This brings us to the | async pipe which subscribes to the provided Observable behind the scenes and gives us unwrapped plain old Javascript value. This value then can be used in the template as per usual.

#### The | async pipes automatically unsubscribes all active subscriptions when component is destroyed

```javascript
@Component({
  selector: 'async-pipe',
  template: `
 <div class="card card-block">
  <h4 class="card-title">AsyncPipe</h4>
  <p class="card-text" ngNonBindable>{{ observable | async }}
  <p class="card-text">{{ observable | async }}</p> (1)
 </div>
`
})
class AsyncPipeComponent {
  observable: Observable<number>;
  constructor() {
    this.observable = this.getObservable();
  }

  getObservable() {
    return Observable
      .interval(1000)
      .take(10)
      .map((v) => v*v)
  }
}
```

- AsyncPipe is a convenience function which makes rendering data from observables and promises much easier.
- For promises it automatically adds a then callback and renders the response.
- For Observables it automatically subscribes to the observable, renders the output and then also unsubscribes when the component is destroyed so we don’t need to handle the clean up logic ourselves.
- That’s it for the built-in pipes, next up we will look at creating out own custom pipes.
