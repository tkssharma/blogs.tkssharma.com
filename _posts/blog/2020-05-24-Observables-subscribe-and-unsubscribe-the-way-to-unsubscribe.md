---
date: 2020-04-24
title: 'when to unsubscribe observable in Angular'
template: post
featured:  '../thumbnails/angular.png'
thumbnail: '../thumbnails/angular.png'
slug: when-to-unsubscribe-observable-in-angular
categories:
  - Popular
tags:
  - typescript
  - reactjs
  - javascript
---

What is observable in Angular 
----------------------------

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

1. We have created a method in service, suppose in BookService, to fetch data over HTTP.  
```javascript
getBooksFromStore(): Observable<Book[]> {
   return this.http.get<Book[]>(this.bookUrl);
} 
```
2. In our component we will Ibject this service and call method to get Data 
```javascript
ngOnInit() {
    this.getsoftBooks();
} 
getsoftBooks() {
   this.bookService.getBooksFromStore().subscribe(books => this.softBooks = books);
} 
```
Now coming to our Point when to unsubscribe Observable
------------------------------------------------------
Angular' Event system is built with observable and we see Observables everywhere, you might have seen .subscribe method at many places in Code 

Example 

- HttpClient Module returns Observable
- route change event is observable stream
- FormValue change event return observable stream of Data

Now lets ee what all we need to unsubscribe 
---------------------------------------------

1. FormValuechange Event 
  
```javascript
export class TestComponent {
    private subscr:Subscription;
    private statussubscr:Subscription;

  ngOnInit() {
    this.form = new FormGroup({...});
    this.subscr  = this.form.valueChanges.subscribe(console.log);
    this.statusChanges = this.form.statusChanges.subscribe(console.log);
  }
  ngOnDestroy() {
    this.subscr.unsubscribe();
    this.statussubscr.unsubscribe();
  }
}
```
2. Router change Events 

```javascript
export class TestComponent {
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(console.log);
    this.route.queryParams.subscribe(console.log);
    this.route.fragment.subscribe(console.log);
    this.route.data.subscribe(console.log);
    this.route.url.subscribe(console.log);
    
    this.router.events.subscribe(console.log);
  }

  ngOnDestroy() {
    // You should unsubscribe from each observable here
  }
}
```

3. infinite Observables (keep sending stream of Data)

```javascript
export class TestComponent {

  constructor(private element : ElementRef) { }

  interval: Subscription;
  click: Subscription;

  ngOnInit() {
    this.interval = Observable.interval(1000).subscribe(console.log);
    this.click = Observable.fromEvent(this.element.nativeElement, 'click').subscribe(console.log);
  }

  ngOnDestroy() {
    this.interval.unsubscribe();
    this.click.unsubscribe();
  }
}
```
4. Redux Store using ngRx

```javascript
export class TestComponent {

  constructor(private store: Store) { }

  todos: Subscription;

  ngOnInit() {
     this.todos = this.store.select('todos').subscribe(console.log);  
  }

  ngOnDestroy() {
    this.todos.unsubscribe();
  }
}
```
## What all don't need Unsubscribe (Anything which is finite)

1. Async Pipe

``Using AsyncPipe with Observables``

AsyncPipes for Observables automatically subscribes to the observable, renders the output, and then also unsubscribes when the component is destroyed. 
So, we don’t need to handle the cleanup logic ourselves. There is no need to unsubscribe manually in the component. Angular handles subscriptions of async pipes for us automatically using ngOnDestroy. AsyncPipe uses the OnPush change detection out of the box. 

```javascript
@Component({
  selector: 'test',
  template: `<todos [todos]="todos$ | async"></todos>`
})
export class TestComponent {

  constructor(private store: Store) { }

  ngOnInit() {
     this.todos$ = this.store.select('todos');
  }
}
```
2. Finite Observable — Like Http call 

```javascript
export class TestComponent {
  constructor(private http: Http) { }
  ngOnInit() {
    Observable.timer(1000).subscribe(console.log);
    this.http.get('http://api.com').subscribe(console.log);
  }
}
```
Conclusion -

We should avoid doing unsubscribe for Each and Every Observables
Some Finite Observable which gets unsubscribe by itself.
