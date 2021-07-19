---
date: 2020-02-15
title: 'Shopping Cart with Angular Observables/Subject/Subscription'
template: post
thumbnail: '../thumbnails/angular.png'
slug: Build-shopping-cart-with-Observables-subject-Subscription
categories:
  - Popular
  - Angular
tags:
  - Angular
  - Javascript
---
It’s easy enough to find descriptions of observables, including [excellent deep dives](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) covering their use within Functional Reactive methods of programming. I’d like to take a step back from these deeper dives and explain a bit why we need to understand observables as Angular and/or NativeScript developers.

So, what are observables?

In the [Angular docs](https://angular.io/docs/ts/latest/guide/glossary.html#!#O), they are described as a sort of array:

You can think of an observable as an array whose items arrive asynchronously over time. Observables help you manage asynchronous data, such as data coming from a backend service. Observables are used within Angular itself, including Angular’s event system and its http client service. To use observables, Angular uses a third-party library called Reactive Extensions (RxJS). Observables are a proposed feature for ES 2016, the next version of JavaScript.*

## [Learning Objectives](https://codecraft.tv/courses/angular/http/http-with-observables/#_learning_objectives)

Our goal in this lecture is not to just replace *Promises* with *Observables* but instead to go a deeper and implement most of our functionality with an *Observable Chain*.

Working with Observables does require a different way of thinking about programming, It’s my hope that after this lecture you will have a much better idea of how to solve similar problems with RxJS and observables.

## Returning an Observable from the service

In the promise example we stored the returned results on the service itself in the results propery.

In this observable example we are instead going to make the search function *return* an observable which the AppComponent is going to subscribe to, like

    import {Observable} from 'rxjs';
    .
    getAllProducts(): Observable<product[]> { .. }

The return type is Observable<product[]>, it’s going to return an observable where each item in the observable is product[], each item in the observable is going to be an *array* of productItem.

That’s our intention at least but we need to adjust our search function to make it a reality, a first step would look like so:

    getAllProducts() : Observable <product[]> {
        return this.httpclient.get(url)
          .map((res : Response) => res.json())
          .catch((error : any) => Observable.throw('Server error'));
      }

We’ve removed the Promise code and since httpclient.get(…​) returns an Observable, specifically an Observable of Response types so the type would be Observable<Response>, we just return that instead.

httpclient is just as wrapper written over Http service

    [@Injectable](http://twitter.com/Injectable)()
    export class HttpClient {
      constructor(private http : Http, private loaderService : LoaderService) {}
       post(url : string, body : any = {}) {
         return this.request(url, RequestMethod.Post, body);
       }
       get(url : string) {
         return this.request(url, RequestMethod.Get);
       }
      }

However the above has two problems:

1. The return type of httpclient.get(…​) is Observable<Response> and not Observable<products[]>

1. It’s missing the code to convert the raw JSON to our products domain model.

Basically we still need to convert the Response to an array of products.

We can do that with our Observable by running a map operation where we convert each Response to an array of product, like so:(shown in highlighted text)

    getAllProducts() : Observable <products[]> {
        return this.httpclient.get(url)
          .map((res : Response) => res.json())
          .catch((error : any) => Observable.throw('Server error'));
      }

thishttpclien.get(apiURL) returns an Observable.map is an observable operator which calls a function for each item on its input stream and pushes the result of the function to it’s output stream. In this case each input item is a Response object.We loop over each item in the results property of the Response object and transform the item via a function.We convert the raw data returned from the iTunes API into an instance of products

### Important

map in this instance is an operator from RxJS so to use it we need to explicitly import it via:

    import 'rxjs/add/operator/map';

The end result is that the code above converts the Observable<Response> that gets returned from this.http.get(…​) to an Observable<products[]> which it then returns to the caller.

The caller in our case is the AppComponent so we need to change that to work with Observables as well.

One way to use this Observable in our AppComponent would be just to subscribe to it and store the results locally, like so:

    export class AppComponent implements OnInit {
        constructor(private Http : HttpClient) {
            this.URL ='[http://localhost:3000/api'](http://localhost:3000/api');
        }
        cart : product[];
        URL : string;
        ngOnInit() {
            this.Http.get(this.URL)
                .map((response : Response) => response.json())
                .subscribe((result:any) => {
                    this.cart = result;
                });
        }
    }

We subscribe to the Observable<products[]> returned from the service and store each productItem to our local results property.

In this component i am using lifecycle method to get api response while initializing components.

    Copy<div  *ngFor="let item of results"> ... </div>

Running the above application works, we can congratulate ourselves for using Observables with HTTPrequest, but we can go deeper.

## Part- 2 — Cont
[tkssharma/Web-Development-with-Angular-2-and-Bootstrap
*Web-Development-with-Angular-2-and-Bootstrap — Web Development with Angular 2 and Bootstrap Course on Packt*github.com](https://github.com/tkssharma/Web-Development-with-Angular-2-and-Bootstrap/tree/master/ng-2-training/ng-2-cart)

https://stackblitz.com/edit/cart-app

## Communicating Between Components with Observable & Subject

Observables provide support for passing messages between publishers and subscribers in your application. Observables offer significant benefits over other techniques for event handling, asynchronous programming, and handling multiple values.

Observables are declarative — that is, you define a function for publishing values, but it is not executed until a consumer subscribes to it. The subscribed consumer then receives notifications until the function completes, or until they unsubscribe.

## What are Subjects?

Subject is both an Observable and Observer.

1. Observer — he has the next, error, and complete methods.

1. Observable — he has all the Observable operators, and you can subscribe to him.

Subject can act as a bridge/proxy between the source Observable and many observers, making it possible for multiple observers to share the same Observable execution.

Let’s see how we can share the same execution in our first example:

```javascript
const interval$ = Rx.Observable.interval(1000);
const subject = new Rx.Subject();
interval$.subscribe(subject);
```
First, we are creating new Subject. Now remember that the Subject is also an Observer, and what observers can do? They can listen to Observables with the next(), error() and complete() methods. If you log the subject, you can see that the subject has these methods.

![](https://cdn-images-1.medium.com/max/2000/1*WbekEuPxC4fQmuw9S63-nw.png)

So in our case, the Subject is observing the interval observable. In simple words when you have new values let me know.

Now let’s move to the next part.

```javascript
subject.subscribe(val => console.log(`First observer ${val}`));

setTimeout(() => {
  subject.subscribe(val => console.log(`Second observer ${val}`))
}, 2000);
```
The Subject is also Observable, and what we can do with Observables? We can subscribe to them.

In our case, we are subscribing to the Subject. But what values the Subject gives us?

If you remember the Subject is observing the interval Observable, so every time the interval send values to the Subject, the Subject send this values to all his observers. 
So the Subject acts as a proxy/bridge, and because of that, there is only one execution.
- Oh, I got new value from the interval Observable, I am passing this value to all my observers (listeners)

Don’t forget that every Subject is also an Observer so we can use the Observer methods next(), error(), complete(). Let’s see an example:

Lets understand this using live application in Angular 5

This cart application has two components shopping list and product list components. We need to establish communication between these components so that whatever items being added in cart can be shown in List

![](https://cdn-images-1.medium.com/max/4770/1*_oHsbD4hkdFlE5NYqIIjtA.png)

Lets first understand terms which we will be using with observables

## BehaviorSubject & Subject

is a type of subject, a subject is a special type of observable so you can subscribe to messages like any other observable. The unique features of BehaviorSubject are:

* It needs an initial value as it must always return a value on subscription even if it hasn’t received a next()

* Upon subscription it returns the last value of the subject. A regular observable only triggers when it receives an onnext

* at any point you can retrieve the last value of the subject in a non-observable code using the getValue() method.

Unique features of a subject compared to an observable are:

* It is an observer in addition to being an observable so you can also send values to a subject in addition to subscribing to it.

In addition you can get an observable from behavior subject using the asobservable() method on BehaviorSubject.

Observable is a Generic, and BehaviorSubject is technically a sub-type of Observable because BehaviorSubject is an observable with specific qualities.

Example with BehaviorSubject:

    // Behavior Subject
    // a is an initial value. if there is a subscription 
    // after this, it would get "a" value immediately
    let bSubject = new BehaviorSubject("a"); 
    bSubject.next("b");
    bSubject.subscribe((value) => {
      console.log("Subscription got", value); // Subscription got b, 
    });
    bSubject.next("c"); // Subscription got c
    bSubject.next("d"); // Subscription got d

Example 2 with regular subject:

    // Regular Subject
    let subject = new Subject(); 
    subject.next("b");
    subject.subscribe((value) => {
      console.log("Subscription got", value); // Subscription wont get 
                                              // anything at this point
    });
    subject.next("c"); // Subscription got c
    subject.next("d"); // Subscription got d

An observable can be created from both Subject and BehaviorSubject using subject.asobservable(). Only difference being you can't send values to an observable using next() method.

Lets use these concepts with out application to add data in cart when use click on add to cart button from productItem component.

    [@Injectable](http://twitter.com/Injectable)()
    export class cartService {
      constructor(private httpclient : HttpClient) {}
      private cartSubject = new Subject<CartState>();
        Products : product[]= [];
        CartState = this.cartSubject.asObservable();

    addProduct(_product:any) {
        this.Products.push(_product)
        this.cartSubject.next(<CartState>{loaded: true, products:    this.Products});
        }
     }

Here what i need is updating ProductList and show it on productList component in Cart. We have created subject here for CartState which will have list of products in its object.

Now expose CartState as observable using .asObservable() method and modify this object based on user action from component, Its service inject it in component and trigger addProduct method.

Add product method will publish new data using .next() .next(<CartState>{loaded: true, products: this.Products}) so when we trigger .next() all subscriber will get updated value from it.

*Lets see all of them together*

1. CartService

```javascript
@Injectable()
export class cartService {
  constructor(private httpclient : HttpClient) {}
  private cartSubject = new Subject<CartState>();
    Products : product[]= [];
    CartState = this.cartSubject.asObservable();
    addProduct(_product:any) {
      console.log('in service');
      this.Products.push(_product)
      this.cartSubject.next(<CartState>{loaded: true, products:  this.Products});
    }
    removeProduct(id:number) {
      this.Products = this.Products.filter((_item) =>  _item.id !== id )
      this.cartSubject.next(<CartState>{loaded: false , products:  this.Products});
    }

  getAllProducts() : Observable <any> {
    return this.httpclient.get(url).map((res : Response) => res.json())
      .catch((error : any) => Observable.throw('Server error'));
  }

}
```
2. ProductItemComponent

```javascript
export default class shoppingCartItem {
    @Input()product : product;
    constructor(private _cartService : cartService) {}
    AddProduct(_product : product) {
        _product.added = true;
        this
            ._cartService
            .addProduct(_product);
    }
    RemoveProduct(_product : product) {
        _product.added = false;
        this
            ._cartService
            .removeProduct(_product.id);
    }
}
```
Finally here we are subscribing the Subject exposed and getting updated values it and remember to destroy Subscription in ngOnDestroy method so when user click on addToCart it will be updating subject data which is an exposed observables and will publish new data to all subscribers.

```javascript
export default class shoppingList {
    loaded : boolean = true
    products : product[];
    private subscription : Subscription;
    constructor(private _cartService : cartService) {}
    ngOnInit() {
        // this.loaderService.show();
        this.subscription = this._cartService.CartState
            .subscribe((state : CartState) => {
                this.products = state.products;
                console.log(this.products);
            });

    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
```
I hope you have enjoyed it , check code from here
[tkssharma/Web-Development-with-Angular-2-and-Bootstrap
*Web-Development-with-Angular-2-and-Bootstrap — Web Development with Angular 2 and Bootstrap Course on Packt*github.com](https://github.com/tkssharma/Web-Development-with-Angular-2-and-Bootstrap/tree/master/ng-2-training/ng-2-cart)
