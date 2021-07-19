---
date: 2020-05-01
title: 'Most commonly Used Typescript Pattern in Node JS'
template: post
featured:  '../thumbnails/typescript.png'
thumbnail: '../thumbnails/typescript.png'
slug: Most-common-use-of-typescript-patterns
categories:
  - Popular
tags:
  - typescript
  - javascript
  - nodejs
---

## Most Common Design Pattern for Typescript 

We all use design patterns in our code. Sometimes, it's unnecessary, but it could give a nice and understandable structure to your architecture. Since TypeScript is getting more popular, I decided to show some of the popular patterns with its implementation.

Singleton 
---------
Singleton is most of the known patterns in the programming world. Basically, you use this pattern if you need to instantiate a restricted number of instances. You do this by making a private constructor and providing a static method, which returns an instance of the class.

Usage
-----
This pattern is used in other patterns. Abstract factory and builder uses it in itself implementations. Sometimes, you use singletons with facades, because you want to provide only one instance of a Facade.

```javascript
class Singleton {
  private static instance: Singleton | null;
  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    return this.instance;
  }
}
```

Example 
```javascript
import { BehaviorSubject } from 'rxjs';

interface Action {
  type: string;
}

class ActionsBus {
  private static instance: ActionsBus;
  private actionsSubject = new BehaviorSubject<Action>(null);

  get actions$() {
    return this.actionsSubject.asObservable();
  }

  private constructor() {
  }

  static getInstance(): ActionsBus {
    if (!ActionsBus.instance) {
      ActionsBus.instance = new ActionsBus();
    }

    return ActionsBus.instance;
  }

  dispatch(action: Action) {
    this.actionsSubject.next(action);
  }
}
```

- constructor with a private access modifier, so that it isn’t accessible outside of the class body,
- static instance filed which is supposed to reference the single instance of the class,
- static getInstance method which is responsible for returning the instance of the class. In addition, it follows a lazy evaluation strategy, hence it has to create the instance when it’s called for the first time.
```javascript
//illegal since the constructor is private
const illegalActionsBus = new ActionsBus();

const firstActionsBus = ActionsBus.getInstance();
const secondActionsBus = ActionsBus.getInstance();

//both constants reference the same object
console.log(firstActionsBus === secondActionsBus);
```

Factory and Abstract Factory pattern
------------------------------------

Abstract factory is a specific pattern, which used to create an abstract object with an abstract factory. That basically means, that you can put every factory that implements the Abstract Factory and it would return an instance, that implements the Abstract Object interface.

Usage
You define two interfaces: an Abstract Factory’s one and a Subject’s one. Then, you implement whatever you want and expose the interface. A client doesn’t know what is inside, he just gets an object with implement methods of an interface.


```javascript
export interface AbstractProduct {
  method(param?: any): void;
}
export class ConcreteProductA implements AbstractProduct {
  method = (param?: any) => {
    return "Method of ConcreteProductA";
  }
}
export class ConcreteProductB implements AbstractProduct {
  method = (param?: any) => {
    return "Method of ConcreteProductB";
  }
}
export namespace ProductFactory {
  export function createProduct(type: string): AbstractProduct {
    if (type === "A") {
      return new ConcreteProductA();
    } else if (type === "B") {
      return new ConcreteProductB();
    }

    return null;
  }
}
var a: AbstractProduct = ProductFactory.createProduct("A");
var b: AbstractProduct = ProductFactory.createProduct("B");

console.log(a.method());
console.log(b.method());
```

Abstract Factory Pattern
------------------------
```javascript
interface SoundFactory {
  create: Function;
}
interface Sound {
  enable: Function;
}
class FerrariSound implements Sound {
  enable() {
    console.log('Wrooom-wrooom-wrooooom!');
  }
}
class BirdSound implements Sound {
  enable() {
    console.log('Flap-flap-flap');
  }
}
class FerrariSoundFactory implements SoundFactory {
  create() {
    return new FerrariSound();
  }
}
class BirdSoundFactory implements SoundFactory {
  create() {
    return new BirdSound();
  }
}
(() => {
  let factory: SoundFactory | null = null ;
  const type = Math.random() > 0.5 ? 'ferrari' : 'bird';
  switch (type) {
    case 'ferrari':
      factory = new FerrariSoundFactory();
      break;
    case 'bird':
      factory = new BirdSoundFactory();
      break;
  }
  if (factory) {
    const soundMaker = factory.create();
    soundMaker.enable();
  }
})();
```

Observer Pattern
----------------
This pattern suggests, that you have a subject and some observers. Every time you update your subject state, observers get notified about it. This pattern is very handy when you need to tie several objects to each other with abstraction and freedom of implementation. Also, this pattern is a key part of the familiar model-view-controller (MVC) architectural pattern. Strongly used in almost every GUI library.


```javascript
export class Subject {
  private observers: Observer[] = [];

  public register(observer: Observer): void {
    console.log(observer, "is pushed!");
    this.observers.push(observer);
  }

  public unregister(observer: Observer): void {
    var n: number = this.observers.indexOf(observer);
    console.log(observer, "is removed");
    this.observers.splice(n, 1);
  }

  public notify(): void {
    console.log("notify all the observers", this.observers);
    var i: number
      , max: number;
    for (i = 0, max = this.observers.length; i < max; i += 1) {
      this.observers[i].notify();
    }
  }
}

export class ConcreteSubject extends Subject {
  private subjectState: number;

  get SubjectState(): number {
    return this.subjectState;
  }

  set SubjectState(subjectState: number) {
    this.subjectState = subjectState;
  }
}

export class Observer {
  public notify(): void {
    throw new Error("Abstract Method!");
  }
}

export class ConcreteObserver extends Observer {
  private name: string;
  private state: number;
  private subject: ConcreteSubject;

  constructor(subject: ConcreteSubject, name: string) {
    super();
    console.log("ConcreteObserver", name, "is created!");
    this.subject = subject;
    this.name = name;
  }

  public notify(): void {
    console.log("ConcreteObserver's notify method");
    console.log(this.name, this.state);
    this.state = this.subject.SubjectState;
  }

  get Subject(): ConcreteSubject {
    return this.subject;
  }

  set Subject(subject: ConcreteSubject) {
    this.subject = subject;
  }
}
```

Fluent Interface or chainable Pattern 
-------------------------------------
Often used in testing libraries (e.g., Mocha, Cypress), a fluent interface makes code readable as written prose. It is implemented by using method chaining. Basically, every method returns this. (self) and the chaining ends when a chain method returns void. Also, other techniques used for a fluent interface - nested functions and object scoping.

```javascript
class Book {
  private title: string | undefined;
  private author: string | undefined;
  private rating: number | undefined;
  private content: string | undefined;

  setTitle(title: string) {
    this.title = title;
    return this;
  }
  setAuthor(author: string) {
    this.author = author;
    return this;
  }
  setRating(rating: number) {
    this.rating = rating;
    return this;
  }
  setContent(content: string) {
    this.content = content;
    return this;
  }
  getInfo() {
    return `A ${this.title} book is written by ${this.author} with ${
      this.rating
    } out of 5 stars`;
  }
}
console.log(
  new Book()
    .setTitle('Voyna i Mir')
    .setAuthor('Lev Tolstoy')
    .setRating(3)
    .setContent('A very long and boring book... Once ago...')
    .getInfo(),
);
```

You can Explore More from Here 
https://github.com/torokmark/design_patterns_in_typescript

### Design Patterns in TypeScript #

Here are the implementations of the following design patterns in TypeScript:

### Creational ###

* [Singleton](https://github.com/torokmark/design_patterns_in_typescript/tree/master/singleton)
* [Abstract Factory](https://github.com/torokmark/design_patterns_in_typescript/tree/master/abstract_factory)
* [Factory Method](https://github.com/torokmark/design_patterns_in_typescript/tree/master/factory_method)
* [Builder](https://github.com/torokmark/design_patterns_in_typescript/tree/master/builder)
* [Prototype](https://github.com/torokmark/design_patterns_in_typescript/tree/master/prototype)


### Structural Patterns ###

* [Adapter](https://github.com/torokmark/design_patterns_in_typescript/tree/master/adapter)
* [Bridge](https://github.com/torokmark/design_patterns_in_typescript/tree/master/bridge)
* [Composite](https://github.com/torokmark/design_patterns_in_typescript/tree/master/composite)
* [Decorator](https://github.com/torokmark/design_patterns_in_typescript/tree/master/decorator)
* [Facade](https://github.com/torokmark/design_patterns_in_typescript/tree/master/facade)
* [Flyweight](https://github.com/torokmark/design_patterns_in_typescript/tree/master/flyweight)
* [Proxy](https://github.com/torokmark/design_patterns_in_typescript/tree/master/proxy)


### Behavioral Patterns ###

* [Chain of Responsibility](https://github.com/torokmark/design_patterns_in_typescript/tree/master/chain_of_responsibility)
* [Command](https://github.com/torokmark/design_patterns_in_typescript/tree/master/command)
* [Interpreter](https://github.com/torokmark/design_patterns_in_typescript/tree/master/interpreter)
* [Iterator](https://github.com/torokmark/design_patterns_in_typescript/tree/master/iterator)
* [Mediator](https://github.com/torokmark/design_patterns_in_typescript/tree/master/mediator)
* [Memento](https://github.com/torokmark/design_patterns_in_typescript/tree/master/memento)
* [Observer](https://github.com/torokmark/design_patterns_in_typescript/tree/master/observer)
* [State](https://github.com/torokmark/design_patterns_in_typescript/tree/master/state)
* [Strategy](https://github.com/torokmark/design_patterns_in_typescript/tree/master/strategy)
* [Template Method](https://github.com/torokmark/design_patterns_in_typescript/tree/master/template_method)
* [Visitor](https://github.com/torokmark/design_patterns_in_typescript/tree/master/visitor)

## Compile the project

```
$ git clone https://github.com/torokmark/design_patterns_in_typescript.git
$ cd design_patterns_in_typescript
$ tsc
```

There is a `tsconfig.json` file in the root directory which is responsible for the compiler options.

As it is set the default target is Ecmascript5 now.

Any additional options come here.

By default the output is a `patterns.js` file.


To compile only one pattern, use the following command.

```
$ cd design_patterns_in_typescript/visitor
$ tsc --target ES5 --module system --outFile visitor.js visitor.ts
```

## Execute the project

After the compilation of the project, a `patterns.js` is generated by default.
Executing the file is:

```
node patterns.js
```