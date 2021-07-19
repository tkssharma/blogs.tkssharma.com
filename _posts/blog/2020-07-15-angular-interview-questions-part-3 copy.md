---
date: 2020-06-15
title: 'Angular Interview Questions Part-3'
template: post
featured:  '../thumbnails/angular.png'
thumbnail: '../thumbnails/angular.png'
slug: angular-interview-qiestions-part-3
categories:
  - Popular
tags:
  - angular
  - interview
  - crack jobs
  - javascript
---

## Observable in Angular

Observable isn’t an Angular specific feature, but a new standard for managing async data that will be included in the ES7 release. Angular uses observables extensively in the event system and the HTTP service.

Most simply, observables are lazy collections of multiple values over time. Instead of thinking about it as a singular event or piece of data that we use at a single point in time, it should be thought about as a collection of events or pieces of data over a period of time. "A stream is a sequence of data elements made available over time".

### Observable is an abstraction of asynchronous stream of data. For example, when we look at Observable<string>, it represents a stream of strings which will be delivered one by one over the time.

If you are used to utilizing promises or something more obscure you will most likely implement code that is only run once and then succeed or fail. Observables, on the other hand, are data streams. They can keep emitting values and any subscriptions will receive and process them separately at the time they each arrive.

Observables are declarative—that is, you define a function for publishing values, but it is not executed until a consumer subscribes to it. The subscribed consumer then receives notifications until the function completes, or until they unsubscribe.

Observables are lazy

You could think of lazy observables as newsletters. For each subscriber a new newsletter is created. They are then only send to those people, and not to anyone else.

Observables can have multiple values over time

Now if you keep that subscription to the newsletter open, you will get a new one every once and a while. The sender decides when you get it but all you have to do is just wait until it comes straight into your inbox.

### Comparison with Promise

If you come from the world of promises this is a key difference as promises always return only one value. Another thing is that observables are cancelable. If you don’t want your newsletter anymore, you unsubscribe. With promises this is different, you can’t cancel a promise. If the promise is handed to you, the process that will produce that promise’s resolution is already underway, and you generally don’t have access to prevent that promise’s resolution from executing.

### Push vs pull

A key thing to understand when using observables is that observables push. Push and pull are two different ways that describe how a data producer communicates with the data consumer.

### Pull

When pulling, the data consumer decides when it get’s data from the data producer. The producer is unaware of when data will be delivered to the consumer.
Every javascript function uses the pull. The function is a Producer of data, and the code that calls the function is consuming it by “pulling” out a single return value from its call.

### Push

When pushing, it works the other way around. The data producer (the creator of the newsletter) decides when the consumer (the subscriber to the newsletter) gets the data.
Promises are the most common way of push in JavaScript today. A promise (the producer) delivers a resolved value to registered callbacks (the consumers), but unlike functions, it is the promise which is in charge of determining precisely when that value is “pushed” to the callbacks.
Observables are a new way of pushing data in JavaScript. An observable is a Producer of multiple values, “pushing” them to subscribers.

### Observables in Angular

If you start using Angular you will probably encounter observables when setting up your HTTP requests. So let’s start there.

```js
import { Observable } from "rxjs/Rx"
import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"

@Injectable()
export class HttpClient {

    constructor(
        public http: Http
    ) {}

    public fetchUsers() {
        return this.http.get("/api/users").map((res: Response) => res.json())
    }
}

```

We have now created a simple HttpClient with a fetchUsers method that returns an observable. We probably like to display the users in some sort of list, so let’s do something with this method. Since this method returns an observable we have to subscribe to it. In Angular we can subscribe to an observable in two ways:
Manner 1:

We subscribe to an observable in our template using the async pipe. The benefit of this is that Angular deals with your subscription during the lifecycle of a component. Angular will automatically subscribe and unsubscribe for you. Don’t forget to import the “CommonModule” into your module, as the async pipe will be exposed from that.

component.ts

```js
import { Component } from "@angular/core"
import { Observable } from "rxjs/Rx"

// client
import { HttpClient } from "../services/client"

// interface
import { IUser } from "../services/interfaces"

@Component({
    selector: "user-list",
    templateUrl:  "./template.html",
})
export class UserList {

    public users$: Observable<IUser[]>

    constructor(
        public client: HttpClient,
    ) {}

    // do a call to fetch the users on init of component
    // the fetchUsers method returns an observable
    // which we assign to the users$ property of our class
    public ngOnInit() {
        this.users$ = this.client.fetchUsers()
    }
}
```

And the corresponding template, where I am using the pipe ("|") and async to subscribe to the Observable.

```html
<!-- We use the async pipe to automatically subscribe/unsubscribe to our observable -->
<ul class="user__list" *ngIf="(users$ | async).length">
    <li class="user" *ngFor="let user of users$ | async">
        {{ user.name }} - {{ user.birth_date }}
    </li>
</ul>
```

Note the dollar sign. Using the dollar sign in the name of a variable that is an observable, is considered best practice. This way it’s easy to identify if your variable is an observable or not.

## Key Points about Observables

-   1. Observables are not executed until a consumer subscribes. The subscribe() executes the defined behavior once, and it can be called again. Each subscription has its own computation. Resubscription causes recomputation of values.

### Manner 2:

We subscribe to the observable ourselves using the actual subscribe() method. This can be handy if you would first like to do something with the data before displaying it. The downside is that you have to manage the subscription yourself.

```js
import { Component } from "@angular/core"

// client
import { HttpClient } from "../services/client"

// interface
import { IUser } from "../services/interfaces"

@Component({
    selector: "user-list",
    templateUrl:  "./template.html",
})
export class UserList {

    public users: IUser[]

    constructor(
        public client: HttpClient,
    ) {}
    public ngOnInit() {
        this.client.fetchUsers().subscribe((users: IUser[]) => {
            this.users = users
        })
    }
}

```

And then the template

```html
<ul class="user__list" *ngIf="users.length">
    <li class="user" *ngFor="let user of users">
        {{ user.name }} - {{ user.birth_date }}
    </li>
</ul>
```

As you can see the template logic is quite similar, the component logic can actually become much different and more complex if you go for manner 2. In general, for simple projects and component, I would recommend to choose manner 1. As this is the most easy and you don’t have to manually manage your subscriptions. Keeping your subscriptions open while not using them is a memory leak and therefore not good.

### Creating an observable yourself

Now that you know how to deal with common observables that are given to you by Angular, it’s good to know how you create an observable yourself. The simplest version looks like this:

Observable.ts

```js
import { Observable } from "rxjs/Observable";

// create observable
const simpleObservable = new Observable(observer => {
    // observable execution
    observer.next("bla bla bla");
    observer.complete();
});

// subscribe to the observable
simpleObservable.subscribe();

// dispose the observable
simpleObservable.unsubscribe();
```

#### It would be better to handle the subscription in the parent component itself:

```js
// GOOD
// app.component.ts
@Component({
    selector: 'app',
    template: `
        <user-detail [user]="user$|async"></user-detail>
    `
})
class AppComponent implements OnInit {
    users$: Observable<User[]> = this.http.get(...);
    user: User;
    ngOnInit(){
        // the app component (smart) subscribes to the user$ which will
        // do an XHR call here
        this.users$ = this.http.get(...);
    }
    ...
}

// user-detail.component.ts
@Component({
    selector: 'user-detail',
    template: `

    `
})
class UserDetailComponent {
    // This component doesn't even know that we are using RxJS which
    // results in better decoupling
    @Input() user: User;
}

```

The responsibility of the component is clear. The user-detail is meant to be dumb and is completely decoupled from its parent.

There are however situations where we would like to create a stream from an input. In that case we could take a look at this library: ngx-reactivetoolkit

#### Further Reading

1. [understanding-creating-and-subscribing-to-observables-in-angular-426dbf0b04a3](https://medium.com/@luukgruijs/understanding-creating-and-subscribing-to-observables-in-angular-426dbf0b04a3)

2. [https://angular.io/guide/observables](https://angular.io/guide/observables)

### Example-1

A very simple example usecase in an angular component file - accessControl.component.ts - which is using reselect package - I have the following

```js
@select(currentRolesListDataSelector)

accessControl$: Observable<Role[]>;
accessControl: Role[];
```

In the above,

accessControl\$ is name for observable , and

accessControl is name for the variable

And below is the way I access it inside `ngOnInit()`

```js

ngOnInit() {

this.accessControl$.subscribe(hello => {
	console.log("accessControl ", hello);
	this.accessControl = hello;
});

}
```

### Example-2 - Http's Observable

Angular 7 Http Service now returns an Observable by default instead of a Promise.
Let's see how we can handle this.
First adding the HttpModule in the app.module.ts:

```js
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    .
    .
    HttpModule
    ]
    .
    .
})
export class AppModule {}

```

```js
import { Http } from '@angular/http';
export class AppComponent {

  constructor(private http: Http) { }

}

extractData(response) {
  const body = response.json();
  return body || { };
}

// Now we make a request to a cool API service:

ngOnInit() {
  this.http.get('https://jsonplaceholder.typicode.com/posts')
    .pipe(map(this.extractData))
    .subscribe(this.handleData, this.handleError, this.handleComplete);
}

```

The subscribe method allows us to handle three cases:

When it's all good and there are data (we will call a method named handleData)
When it's very bad and there is an error (we will call a method named handleError)
When the flow gets closed (we will call a method named handleComplete)

### Map

Map’s job is to transform things.

map is a pretty simple operator. It takes a projection function (here its the extractData function), and applies it to each value that comes from the source observable.


## Observables compared to promises

Observables are often compared to promises. Here are some key differences:

Observables are declarative; computation does not start until subscription. Promises execute immediately on creation. This makes observables useful for defining recipes that can be run whenever you need the result.

Observables provide many values. Promises provide one. This makes observables useful for getting multiple values over time.

Observables differentiate between chaining and subscription. Promises only have .then() clauses. This makes observables useful for creating complex transformation recipes to be used by other part of the system, without causing the work to be executed.

Observables subscribe() is responsible for handling errors. Promises push errors to the child promises. This makes observables useful for centralized and predictable error handling.


## what is Subject

Subjects are used for multicasting Observables. This means that Subjects will make sure each subscription gets the exact same value as the Observable execution is shared among the subscribers.

You can do this using the Subject class. But rxjs offers different types of Subjects, namely: BehaviorSubject, ReplaySubject and AsyncSubject.

[.subscribe is not an Angular2 thing. It's a method that comes from rxjs library which Angular is using internally.](https://stackoverflow.com/questions/44921788/what-is-subscribe-in-angular/51935993)

[Source Doc](https://rxjs-dev.firebaseapp.com/api/index/class/Observable#subscribe-)

[reactivex.io/documentation/operators/subscribe.html](http://reactivex.io/documentation/operators/subscribe.html)
A typical implementation of the Subscribe operator may accept one to three methods (which then constitute the observer), or it may accept an object (sometimes called an Observer or Subscriber) that implements the interface which includes those three methods:

onNext

An Observable calls this method whenever the Observable emits an item. This method takes as a parameter the item emitted by the Observable.

onError

An Observable calls this method to indicate that it has failed to generate the expected data or has encountered some other error. This stops the Observable and it will not make further calls to onNext or onCompleted. The onError method takes as its parameter an indication of what caused the error (sometimes an object like an Exception or Throwable, other times a simple string, depending on the implementation).

onCompleted

An Observable calls this method after it has called onNext for the final time, if it has not encountered any errors.

### Difference between the methods .pipe() and .subscribe() on a RXJS observable

First, consider this function deposit() - It returns the Subscription object, becuase thats what is created when you call a `.subscribe()`.

```ts
    deposit(account, amount){
    return this.http.get('url')
    .subscribe(res => {
        return res;
    }
}
```

And now with .pipe()

```ts
    deposit(account, amount){
    return this.http.get('url')
    .pipe(
        map(res => {
            return res;
        });
    );
}
```

In the second case, while using pipe, if you do not subscribe, nothing happens. pipe just combines several operators together. The second example return an Observable, but it does not execute. So if I want to actually get the emitted value of the Observable, then I have to use `.subscirbe()` after using `.pipe()`

The pipe method is for chaining observable operators, and the subscribe is for activating the observable and listening for emitted values.

The pipe method was added to allow webpack to drop unused operators from the final JavaScript bundle. It makes it easier to build smaller files.
