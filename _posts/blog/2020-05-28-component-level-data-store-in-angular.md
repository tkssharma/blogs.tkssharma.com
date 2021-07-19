---
date: 2020-04-27
title: 'Creating Component level Data Store services using Observables in Angular'
template: post
featured:  '../thumbnails/rxlogo.png'
thumbnail: '../thumbnails/rxlogo.png'
slug: Creating-Component-level-data-Store-services-using-Observables-in-Angular
categories:
  - Popular
tags:
  - typescript
  - javascript
  - Angular
---

First i will try to give basic idea what we are going to talk in this Blog
We will first talk about Reactive Programming and RX js in angular and then how can we use this pattern in Angular to act as mini Component level store so that we dont need to use Redux or NgRx Library to manage state of our components

- State management in Angular Application
- State management in Angular Small Application using Observable Store

First part we are not looking at as it detailed topic how to manage state using NgRx Library or Redux Version of it, You have to do Learning for this.

Second Part we will try to solve which many application face when they are not using any state manegement Library and wanted to do in Mini Store with Angular (Component level data store services)

Before starting Let's just have a quick refresh on Terminilogy

What is Reactive Programming
----------------------------

Let’s see the definition of Reactive programming from different sources.

This is how Andre Staltz, the creator of cycle.js (A functional and reactive JavaScript framework for predictable code) defines it:
Reactive Programming is programming with asynchronous data streams
This means when you are writing code that deals with asynchronous operations and streams of data, you are doing reactive programming.
Now, this is the definition from Wikipedia which is more in-depth:

In computing, reactive programming is a declarative programming paradigm concerned with data streams and the propagation of change.

This means reactive programming is a declarative (vs. a procedural) style of programming that works on streams of data.

For a detailed guide on reactive programming and data streams, check out: The introduction to Reactive Programming you've been missing.

What is Stream
--------------

A stream is an essential concept in reactive programming so it's worth seeing the definition before we proceed further.

In all definitions we’ve seen the word stream.

So what is a stream?

Simply put:
A stream refers to values of data overtime.
We'll see later that Observables and streams are very related concepts.

What is RxJS
------------
Now, that we’ve seen the conceps of reactive programming and data streams, let’s see what RxJS is.

RxJS is a popular library among web developers. It provides functional and reactive programming patterns for working with events and streams of data and has been integrated in many web development libraries and frameworks such as Angular.

RxJS makes it easy for JavaScript developers to write asynchronous code using composable Observables instead of callbacks and Promises.

RxJS stands for Reactive Extensions for JavaScript and it actually has implementations in other programming languages such as Java, Python, Ruby, and PHP etc. It's also available for platforms such as Android. Check out the complete list of supported languages and platforms

### In angular we are using Observables from RXJS

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

#### Now How can we use all these things to built Mini Store

- we are creating BehaviorSubject as initilizing it with some default state 
- Then convering that subject to Observable which component can subscribe to

BehaviorSubject is a type of subject, a subject is a special type of observable so you can subscribe to messages like any other observable. The unique features of BehaviorSubject are:

- It needs an initial value as it must always return a value on subscription even if it hasn't received a next()
- Upon subscription, it returns the last value of the subject. A regular observable only triggers when it receives an onnext
- at any point, you can retrieve the last value of the subject in a non-observable code using the getValue() method.
Unique features of a subject compared to an observable are:

- It is an observer in addition to being an observable so you can also send values to a subject in addition to subscribing to it.
- In addition, you can get an observable from behavior subject using the asObservable() method on BehaviorSubject.

Now this BehaviorSubject will manage our data as Observables
```javascript 
  readonly DataQueueColumn = this.DataQueueColumn$.asObservable();
  readonly DataQueue = this.DataQueue$.asObservable();
```
Our typescript component can access it using service instance
```javascript
  DataQueue: Observable<BusinessConfirmTask[]> = this.DataQueueService.DataQueue;
  DataQueueColumn: Observable<any> = this.DataQueueService.DataQueueColumn;
```
Our Data Store Service
---------------------

```javascript

export class DataStoreService {
  private DataQueue$ = new BehaviorSubject<BusinessConfirmTask[]>([]);
  readonly DataQueue = this.DataQueue$.asObservable();
  private dataStore: {
    DataQueue: BusinessConfirmTask[],
    DataQueueColumn: any
  } = { DataQueue: [], DataQueueColumn: null };
  private DataQueueColumn$ = new BehaviorSubject(null);
  readonly DataQueueColumn = this.DataQueueColumn$.asObservable();


  constructor(private service: DataQueueService) { }

  getDataQueueData(): void {
    this.service.getDataQueueData()
      // transform Data in service, can be used for data stream manipulation
      // just a simple example
      .pipe(
        map((i: BusinessConfirmTask[]) => i),
        catchError(error => Observable.throw(error)),
        finalize(() => console.log('done'))
      )
      // subscribe to Http service
      .subscribe((data: BusinessConfirmTask[]) => {
        this.dataStore.DataQueue = data;
        this.DataQueue$.next(Object.assign({}, this.dataStore).DataQueue);
        // handle Error while subscribe
      }, error => console.log('Could not load data.'));
  }
  getDataQueueColumn(): void {
    this.service.getDataQueueColumn()
      // subscribe to Http service
      .subscribe(data => {
        this.dataStore.DataQueueColumn = data;
        this.DataQueueColumn$.next(Object.assign({}, this.dataStore).DataQueueColumn);
        // handle Error while subscribe
      }, error => console.log('Could not load data.'));
  }
}
```

In componnet we can get Observables Object 

```javascript
export class DataQueueComponent implements OnInit {
  @Input() ticketId: string;
  public rowData: any[];
  private columnDefs: ColumnDef[];
  public tableOptions: TableGridOptions;
  DataQueue: Observable<BusinessConfirmTask[]> = this.DataQueueService.DataQueue;
  DataQueueColumn: Observable<any> = this.DataQueueService.DataQueueColumn;

  constructor(
    private DataQueueService: DataStoreService,
    private dialog: MatDialog
  ) { }
}
```
Now in out Html Template we can use async pipe to just consume that data which will give us benefit that we don't need to unsubscribe these subscription as it neever happened

Above Example is good but writing same code in every service will lead us to lot of duplication, we can make it little more structured by creating base store class 

At the core of observable store pattern is the abstract Store class. It leverages RxJS to achieve data flow similar to Redux. It is implemented like this:


```javascript
import {Observable, BehaviorSubject} from 'rxjs';

export class Store<T> {
    state$: Observable<T>;
    private _state$: BehaviorSubject<T>;

    protected constructor(initialState: T) {
        this._state$ = new BehaviorSubject(initialState);
        this.state$ = this._state$.asObservable();
    }
    get state(): T {
        return this._state$.getValue();
    }
    setState(nextState: T): void {
         console.log(nextState);
         this._state$.next(nextState);
    }
}
```
The store’s state (_state$) is a RxJS BehaviorSubject. Changing the state means pushing new state object into the _state$ stream via the setState method. Interested entities can subscribe to state updates by subscribing to the state$ property. It is also possible to get the current state via the state property without subscribing to state updates.


Store class provides a unified interface for all features’ store services to extend. In the next section we’ll have a look at how to use the abstract Store class to implement an example feature store service.

Features’ stores
Feature specific stores are Angular Injectables extending the abstract Store class:

```javascript
export class DataStoreService extends Store<BusinessQueueState> {
```

In the code snippet above note the BusinessQueueState type used when extending the Store. Specifying BusinessQueueState as the store type adds correct type definitions to the generic store.

BusinessQueueState is a class representing state object with initial values. 
```javascript
export class BusinessQueueState {
  DataQueue: BusinessConfirmTask[];
  DataQueueColumn: any;
}
```
One last thing to do to make this simple example work is to add a super call to DataStoreService constructor in order to correctly initialize the state when creating a new instance of DataStoreService:
```javascript
constructor () {
  super(new BusinessQueueState());
}
```
With the above code in place, each instance of DataStoreService has a way of setting its state and getting the current state or an observable of the state. To make it more useful, additional methods to modify the state (similar to Redux reducers) should be added:
```javascript
@Injectable()
export class DataStoreService extends Store<BusinessQueueState> {
  constructor(private service: DataAPIService) {
    super(new BusinessQueueState());
  }
  getQueueData(): void {
    this.service.getQueueData().subscribe(data => {
      this.setState({
        ...this.state,
        QueuData: data,
       });
    });
  }
    getQueueColumnData(): void {
    this.service.getQueueColumnData().subscribe(data => {
      this.setState({
        ...this.state,
        DataQueueColumn: data,
       });
    });
  }
```
In the example above DataStoreService's functionality was extended by defining getQueueColumnData and getQueueData methods. In essence, these methods modify the state by pushing new state objects into the observable state$ stream via the setState method.

Note how it is impossible to modify the state without notifying listeners about the change. This characteristic of observable stores makes them a perfect fit for implementing one-way data flow in Angular apps - much like with Redux or a similar state management library.

Using injectable store services
-------------------------------

App’s state could all be stored in a single global state object. But as the app grows, so does the state object and it can quickly become too big to easily extend it with new features. So instead of storing the whole state in one place, it is better to split the state into smaller chunks. A good way to split the properties is to group them by feature and extract these groups into separate state objects, managed by corresponding stores.

There are two types of stores that emerge from splitting:

- global stores that contain globally used state,
- component stores that contain the states used by a single component.
  
To set up a store containing global state accessed by different services and components, the store is listed as a provider in a module’s providers list (root app module or a feature specific module). This way Angular adds a new global provider to its dependency injector. The state in global stores will be available until the page is reloaded.

```javascript
@NgModule({
  ...
  providers: [ExampleGlobalStore],
})
export class AppModule {
  ...
}
```

Note that many global stores can be defined as providers in app’s modules, each managing its own subset of global state. The codebase stays much more maintainable this way, since each store follows the principle of single responsibility.

To use a global store in different parts of the app, the store needs to be defined as their dependency. This way Angular injects the same instance of a global store (defined as singleton provider in AppModule or any other module) into every component/ service depending on it.

```javascript
@Component({ ... })
export class ExampleComponent {
  constructor (private exampleGlobalStore: ExampleGlobalStore) {
    // ExampleComponent has access to global state via exampleGlobalStore reference
  }
}
```
Not all state needs to be global though. Component specific state should only exist in memory if a component is using it. Once user navigates to a different view and the component is destroyed, its state should be cleaned-up too. This can be achieved by adding the store to a list of component’s providers. This way we get “self-cleaning” stores that are kept in memory as long as components using them are kept in memory.

```javascript
@Component({
  ...
  providers: [ExampleComponentStore],
})
export class ExampleComponent {
  ...
}
```
Private component stores are used in the same way as global stores by defining them as dependencies in the components’ constructors. The key difference is that these component specific stores are not singletons. Instead, Angular creates a new instance of the store each time a component depending on it is created. As a consequence, multiple instances of the same component can be present in the DOM at the same time, each one of them having its own store instance with its own state.

Subscribing to state updates in components’ templates
-----------------------------------------------------

```javascript
@Component({
  selector: 'app-unreadable-queue',
  templateUrl: './unreadable-queue.component.html',
  styleUrls: ['./unreadable-queue.component.scss'],
  providers : [DataServiceStore],
})
export class QueueComponent implements OnInit {
  @Input() ticketId: string;
  public rowData: any[];
  public tableOptions: TableGridOptions;
  DataQueue$: Observable<BusinessQueueState> = this.store$.state$;
  constructor(
    private store$: DataServiceStore,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.store$.getQueueData();
    this.store$.getQueueColumn();
  }
  ```
  In template we can async pipe 
  In case a component doesn’t execute any logic on state update and it only serves as a proxy to pass the state to its template, Angular provides a nice shortcut to subscribe to state updates directly from templates via the async pipe. ngFor in the example below will redraw a list of candidates every time the state is updated.

```html
    <oc-data-grid
    [tableOptions]="{
      columnDefs: (DataQueue$ | async).QueueColumns,
      pagination: true,
      height: '350px'
    }"
    [rowData]="(DataQueue$ | async).QueuData">
  </oc-data-grid>
```       
