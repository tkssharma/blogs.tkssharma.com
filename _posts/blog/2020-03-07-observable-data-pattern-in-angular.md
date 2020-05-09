---
layout: blog
category: blog
Title: Reactive Pattern for Data Services in Angular
summary: Reactive Pattern for Data Services in Angular
heroimage: "https://res.cloudinary.com/indepth-dev/image/fetch/w_1000,f_auto/https://admin.indepth.dev/content/images/2020/04/1_CKxgGcXWq_4Whp8cH3eWbQ.png"
tags :
- angular
- javascript
---


# Reactive Pattern for Data Services in Angular 🔭 🎯🎺

In this blog, I will be talking about Different Reactive Pattern in Angular for Service fetching Data for Application

1. NgRx Little Introduction

1. Reactive Pattern for Datastore Service (Micro States)

1. React Stateless Pattern for Data services

## What is NgRx

NGRX is a group of libraries “inspired” by the Redux pattern which in turn is “inspired” by the Flux pattern. Being a little more concise, this means that redux pattern is a simplified version of the Flux pattern and NGRX is an angular/rxjs version of the redux pattern.
> *What do I mean with “angular/rxjs” version of redux… The “angular” part is because ngrx is a library to use within an angular application. The “rxjs” part is because the implementation of ngrx works around a [rxjs](https://rxjs-dev.firebaseapp.com/guide/overview) flow. This means that it works using observables and the different observable operators provided by “rxjs”.*

**The main purpose of this pattern is to provide a predictable state container, based on three main principles**.

NgRx contains same kind of component which we see in Redux, like action, Reducer and Store, additionally we have ngRx effects and selectors

![](https://cdn-images-1.medium.com/max/2000/1*l8BUaoCeEEFM-o5D4XKLPw.png)

For Enterprise Big project where see a use case of using state management at client side then we can add NgRx with Angular and can get the benefit of this.

But in most of the project, we can live without NgRx as Angular itself is reactive in style we just need to manage subscription and Observable stream can act as Temporary state for our components.

Here we will talk about two different patterns of using Observable data services with Angular.

* Manging State using Store Services

* Using stateless Observable services

### Manging State using Store Services

First part we are not looking at as it detailed topic how to manage state using NgRx Library or Redux Version of it, You have to do Learning for this.

Second Part we will try to solve which many application faces when they are not using any state management Library and wanted to do in Mini Store with Angular (Component level data store services)

Before starting Let’s just have a quick refresh on Terminology

## What is Reactive Programming

Let’s see the definition of Reactive programming from different sources.

This is how Andre Staltz, the creator of cycle.js (A functional and reactive JavaScript framework for predictable code) defines it: Reactive Programming is programming with asynchronous data streams This means when you are writing code that deals with asynchronous operations and streams of data, you are doing reactive programming. Now, this is the definition from Wikipedia which is more in-depth:

In computing, reactive programming is a declarative programming paradigm concerned with data streams and the propagation of change.

This means reactive programming is a declarative (vs. a procedural) style of programming that works on streams of data.

For a detailed guide on reactive programming and data streams, check out: The introduction to Reactive Programming you’ve been missing.

## What is Stream

A stream is an essential concept in reactive programming so it’s worth seeing the definition before we proceed further.

In all definitions, we’ve seen the word stream.

So what is a stream?

Simply put: A stream refers to values of data over time. We’ll see later that Observables and streams are very related concepts.

## What is RxJS

Now, that we’ve seen the concepts of reactive programming and data streams, let’s see what RxJS is.

RxJS is a popular library among web developers. It provides functional and reactive programming patterns for working with events and streams of data and has been integrated in many web development libraries and frameworks such as Angular.

RxJS makes it easy for JavaScript developers to write asynchronous code using composable Observables instead of callbacks and Promises.

RxJS stands for Reactive Extensions for JavaScript and it actually has implementations in other programming languages such as Java, Python, Ruby, and PHP etc. It’s also available for platforms such as Android. Check out the complete list of supported languages and platforms

## In angular, we are using Observables from RXJS

Observable is used within Angular itself, including Angular’s event system and its HTTP client service. To use observable, Angular uses a third-party library called Reactive Extensions (RxJS). Observable are a proposed feature for ES 2016, the next version of JavaScript.

To use Observable in our Angular application. we need to use rxjs

    import { Observable } from 'rxjs/Observable';

Angular’s Event System using Observable which take care of data publishing when change occurs and you will receive data if you have subscribed to it,

The only thing which we need to take care of unsubscribing the observable when we are done, In Angular component language we have to unsubscribe this subscription using OnDestry lifecycle method

Basic observable

    const myObservable = Observable.of(1, 2, 3);
         
        // Create observer object
        const myObserver = {
          next: x => console.log('Observer got a next value: ' + x),
          error: err => console.error('Observer got an error: ' + err),
          complete: () => console.log('Observer got a complete notification'),
        };
        myObservable.subscribe(myObserver);

Some methods of Observable class are subscribe, map, mergeMap, switchMap, exhaustMap, debounceTime, of, retry, catch, throw etc.

subscribe is a method of Observable class. subscribe is used to invoke Observable to execute and then it emits the result. If we have an Observable variable that fetches data over an HTTP then actual hit to server takes place only when we subscribe to Observable using subscribe method or async pipe. Here we will discuss subscribemethod to subscribe to Observable.

### Now How can we use all these things to built Mini Store

* we are creating BehaviorSubject as initializing it with some default state

* Then converting that subject to Observable which component can subscribe to

BehaviorSubject is a type of subject, a subject is a special type of observable so you can subscribe to messages like any other observable. The unique features of BehaviorSubject are:

* It needs an initial value as it must always return a value on subscription even if it hasn’t received a next()

* Upon subscription, it returns the last value of the subject. A regular observable only triggers when it receives an on next

* at any point, you can retrieve the last value of the subject in a non-observable code using the getValue() method. Unique features of a subject compared to an observable are:

* It is an observer in addition to being an observable so you can also send values to a subject in addition to subscribing to it.

* In addition, you can get an observable from behaviour subject using the asObservable() method on BehaviorSubject.

Now this BehaviorSubject will manage our data as Observables

At the core of observable store, a pattern is the abstract Store class. It leverages RxJS to achieve data flow similar to Redux. It is implemented like this:

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

The store’s state (_state$) is a RxJS BehaviorSubject. Changing the state means pushing new state object into the _state$ stream via the setState method. Interested entities can subscribe to state updates by subscribing to the state$ property. It is also possible to get the current state via the state property without subscribing to state updates.

Store class provides a unified interface for all features’ store services to extend. In the next section we’ll have a look at how to use the abstract Store class to implement an example feature store service.

Features’ stores Feature specific stores are Angular Injectables extending the abstract Store class:

    export class DataStoreService extends Store<BusinessQueueState> {

In the code snippet above note the BusinessQueueState type used when extending the Store. Specifying BusinessQueueState as the store type adds correct type definitions to the generic store.

BusinessQueueState is a class representing state object with initial values.

    export class BusinessQueueState {
      DataQueue: BusinessConfirmTask[];
      DataQueueColumn: any;
    }

One last thing to do to make this simple example work is to add a super call to DataStoreService constructor in order to correctly initialize the state when creating a new instance of DataStoreService:

    constructor () {
      super(new BusinessQueueState());
    }

With the above code in place, each instance of DataStoreService has a way of setting its state and getting the current state or an observable of the state. To make it more useful, additional methods to modify the state (similar to Redux reducers) should be added:

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

In the example above DataStoreService’s functionality was extended by defining getQueueColumnData and getQueueData methods. In essence, these methods modify the state by pushing new state objects into the observable state$ stream via the setState method.

Note how it is impossible to modify the state without notifying listeners about the change. This characteristic of observable stores makes them a perfect fit for implementing one-way data flow in Angular apps — much like with Redux or a similar state management library.

## Using injectable store services

App’s state could all be stored in a single global state object. But as the app grows, so does the state object and it can quickly become too big to easily extend it with new features. So instead of storing the whole state in one place, it is better to split the state into smaller chunks. A good way to split the properties is to group them by feature and extract these groups into separate state objects, managed by corresponding stores.

There are two types of stores that emerge from splitting:

* global stores that contain globally used state,

* component stores that contain the states used by a single component.

To set up a store containing global state accessed by different services and components, the store is listed as a provider in a module’s providers list (root app module or a feature specific module). This way Angular adds a new global provider to its dependency injector. The state in global stores will be available until the page is reloaded.

    @NgModule({
      ...
      providers: [ExampleGlobalStore],
    })
    export class AppModule {
      ...
    }

Note that many global stores can be defined as providers in app’s modules, each managing its own subset of global state. The codebase stays much more maintainable this way, since each store follows the principle of single responsibility.

To use a global store in different parts of the app, the store needs to be defined as their dependency. This way Angular injects the same instance of a global store (defined as singleton provider in AppModule or any other module) into every component/ service depending on it.

    @Component({ ... })
    export class ExampleComponent {
      constructor (private exampleGlobalStore: ExampleGlobalStore) {
        // ExampleComponent has access to global state via exampleGlobalStore reference
      }
    }

Not all state needs to be global though. Component specific state should only exist in memory if a component is using it. Once user navigates to a different view and the component is destroyed, its state should be cleaned-up too. This can be achieved by adding the store to a list of component’s providers. This way we get “self-cleaning” stores that are kept in memory as long as components using them are kept in memory.

    @Component({
      ...
      providers: [ExampleComponentStore],
    })
    export class ExampleComponent {
      ...
    }

Private component stores are used in the same way as global stores by defining them as dependencies in the components’ constructors. The key difference is that these component specific stores are not singletons. Instead, Angular creates a new instance of the store each time a component depending on it is created. As a consequence, multiple instances of the same component can be present in the DOM at the same time, each one of them having its own store instance with its own state.

## Subscribing to state updates in components

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
      ) { }
      ngOnInit(): void {
        this.store$.getQueueData();
        this.store$.getQueueColumn();
      }

In the template we can async pipe In case a component doesn’t execute any logic on state update and it only serves as a proxy to pass the state to its template, Angular provides a nice shortcut to subscribe to state updates directly from templates via the async pipe. ngFor in the example below will redraw a list of candidates every time the state is updated.

    <oc-data-grid
        [tableOptions]="{
          columnDefs: (DataQueue$ | async).QueueColumns,
          pagination: true,
          height: '350px'
        }"
        [rowData]="(DataQueue$ | async).QueuData">
      </oc-data-grid>

### What about Just using stateless Observables

This is another pattern where you are not worried about the state we are sending to angular component whatever we are getting from services in form of Observables

The only change is we will not have a state in this approach and will be exposing same Observables and use with | async pipe with Angular component template
[**tkssharma/blogs**
*Repository which contains the code of my blog posts and tutorials. Clone or download the wanted part of this…*github.com](https://github.com/tkssharma/blogs)

    @*Injectable*({
        providedIn: 'root'
    })
    *export* *class* PostsService {
    private postUrl = 'https://jsonplaceholder.typicode.com/posts';
        posts*:* *Posts* = [];
        post$ = this.http.*get*<*Posts*>(this.postUrl).*pipe*(
         *shareReplay*()
        );
    constructor(private http*:* *HttpClient*) { }

    }

We have another service to get User and merge both service Data using Pipes

```javascript
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient, private postsService: PostsService) { }

  private userSelectedAction = new Subject<number>();
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  user$ = this.http.get<Users>(this.usersUrl).pipe(shareReplay());
  userWithPost$ = combineLatest(
    this.user$,
    this.postsService.post$
  ).pipe( map( ([users, posts]) => {
    return users.map( user => ({
      ...user,
      posts: posts.filter( post => post.userId == user.id)
    }))
  }));

  selectedUser$ = combineLatest(
    this.userSelectedAction,
    this.userWithPost$
  ).pipe(
    map( ([selectedUserId, users]) => users.find( user => user.id == selectedUserId))
  )
  ```

And We can Inject this service into Angular component where we don’t need to subscribe to these observables data

```javascript
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent  {
  user$ = this.usersService.user$;
  userWithPost$ = this.usersService.userWithPost$;
  selectedUser$ = this.usersService.selectedUser$;
  
  constructor(private usersService: UsersService) {}

  selectUser(id) {
    this.usersService.changeSelectedUser(id);
  }
}
```

In our Component template, we can just use async pipe to get stream Data

```html
<div class="container">

	<div class="block">
		<h1>List of users</h1>
		<ul *ngIf="userWithPost$ | async as userList">
			<li *ngFor="let user of userList">
				<a href="#" (click)="selectUser(user.id)">{{user.username}}</a>
			</li>
		</ul>
	</div>
</div>
```
Now the advantage of this pattern is we are dealing with Observables directly which are stateless and sending this stream data to components with async pipe, we don't need to unsubscribe or subscribe anything async pipe internally managing all these

In last I talked about other simples way to unsubscribe Observables in Angular.

We can decide when to subscribe and when not to based on Observable stream behaviour, for an infinite stream, we must unsubscribe.
[**when to unsubscribe observable in Angular**
*What is observable in Angular Observable are just that - things you wish to observe and take action on. Angular uses…*tkssharma.com](https://tkssharma.com/when-to-unsubscribe-observable-in-angular/)

If you are not using above-mentioned pattern and writing regular services, then you can adopt different ways to unsubscribe

* Let’s get declarative with takeUntil

* Use the take(1) for initialization

```javascript
@Component({
    selector: 'app-books',
    templateUrl: './books.component.html'
})
export class BooksComponent implements OnDestroy, OnInit {
    private ngUnsubscribe = new Subject();

    constructor(private booksService: BookService) { }

    ngOnInit() {
        this.booksService.getBooks()
            .pipe(
               startWith([]),
               filter(books => books.length > 0),
               takeUntil(this.ngUnsubscribe)
            )
            .subscribe(books => console.log(books));

        this.booksService.getArchivedBooks()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(archivedBooks => console.log(archivedBooks));
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
```

[**The Best Way To Unsubscribe RxJS Observable In The Angular Applications!**
*There are many different ways how to handle RxJS subscriptions in Angular applications and we’re going to explore their…*medium.com](https://medium.com/angular-in-depth/the-best-way-to-unsubscribe-rxjs-observable-in-the-angular-applications-d8f9aa42f6a0)
