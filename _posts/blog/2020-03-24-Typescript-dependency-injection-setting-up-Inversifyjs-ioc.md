---
date: 2020-03-24
title: 'dependency injection: setting up InversifyJS IoC for Typescript Apps'
template: post
thumbnail: '../thumbnails/ts.png'
slug: dependency-injection-with-Typescript-project-InversifyJS
categories:
  - Popular
  - Typescript
  - Javascript
tags:
  - Typescript
  - Javascript
---

The main goal of Inversion of control and Dependency Injection is to remove dependencies of an application. This makes the system more decoupled and maintainable.

1. What is Inversion of Control (IoC)
-------------------------------------

In traditional programming, the flow of the business logic is determined by objects that are statically assigned to one another. With inversion of control, the flow depends on the object graph that is instantiated by the assembler and is made possible by object interactions being defined through abstractions. The binding process is achieved through dependency injection, although some argue that the use of a service locator also provides inversion of control.

Inversion of control as a design guideline serves the following purposes:

There is a decoupling of the execution of a certain task from implementation.
Every module can focus on what it is designed for.
Modules make no assumptions about what other systems do but rely on their contracts.
Replacing modules has no side effect on other modules.

2. What is Dependency Injection (DI)
-----------------------------------

IoC is a design paradigm with the goal of giving more control to the targeted components of your application, the ones getting the work done. While Dependency injection is a pattern used to create instances of objects that other objects rely on without knowing at compile time which class will be used to provide that functionality. IoC relies on dependency injection because a mechanism is needed in order to activate the components providing the specific functionality.

The two concepts work together in this way to allow for much more flexible, reusable, and encapsulated code to be written. As such, they are important concepts in designing object-oriented solutions.


3. How to implement IoC
-----------------------

In object-oriented programming like ``Typescript``, there are several basic techniques to implement inversion of control. These are:

- using a factory pattern
- using a service locator pattern

- using a dependency injection of any given below type:
*   a constructor injection
*   a setter injection
*   an interface injection


I’m going to show you an example based on a node demo project which consists of a service class depending on two other classes, and the main TypeScript file which is utilizing this service. The structure of the project is like

Add inversify to the project
----------------------------

To implement DI in the project I’m going to use InversifyJS as the IoC (inversion of the control) container.
First, we need to add inversify and reflect-metadata to the project
```javascript
yarn add -D inversify reflect-metadata
```

Second: update the tsconfig.json by adding extra settings to compilerOptions section
```json
{
    "compilerOptions": {
        "target": "es5",
        "lib": ["es6"],
        "types": ["reflect-metadata"],
        "module": "commonjs",
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

Project setup after the use of the dependency injection (DI)
After the InversifyJS is installed and TypeScript compiler is configured to support InversifyJS, we can update our application’s code.

conatiner.ts
------------
Before to enjoy the sweet fruits of dependency injection, we have to configure the IoC container, so that the classes can resolve their own dependencies from the centralized container.
We do this by creating a new inversify IOC Container and providing it with the bindings of the classes. The bindings allow the container to map requested dependency with an instance of it.

```javascript
import { Container } from 'inversify';
import 'reflect-metadata';
import { BaseService } from './app/models';
import { Logger } from './config/logger';
import { Util } from './utility/util';
import TYPES from './types';

const container = new Container();
container.bind<Logger>(TYPES.LoggerService).to(Logger);
container.bind<Util>(TYPES.UtilService).to(Util);
export { container };

```


Lets talk a Look how we need to create services with @injectable

After the container is set up the dependencies can be made injectable by importing injectable decorator from inversify and decorating classes with @injectable decorators. This decorator will be handled and applied to the JavaScript output using reflect-metadata package during TypeScript compilation.

In below example we are injecting logger service using @inject in constructor
```javascript
// just an example 
import { inject, injectable } from 'inversify';
import { Logger } from '../config/logger';
import TYPES from '../types';

@injectable()
export class Util {
  constructor(@inject(TYPES.LoggerService) private logger: Logger) {}
    public utilMethod(error: Error): void {
    this.logger.log('error', 'From runtime error >>> %s', error);
  }
}
```
Another example Logger service with @injectable()
```javascript
import { Request, Response } from 'express';
import {injectable} from 'inversify';
import 'reflect-metadata';
const expressWinston = require('express-winston');
const { createLogger, format, transports } = winston;

@injectable()
class Logger {
  private logger: any;
  constructor() {
    this.logger = createLogger({
    });
  }
}
```

Now the new keyword can be removed from the service class. And the dependencies can be injected straight into the class’ constructor by using @inject decorator. Like we have injected Logger service in Util service as LoggerService service already available in IOC container.
example 
```javascript
// @inject to inject service 
@injectable()
export class Util {
  constructor(@inject(TYPES.LoggerService) private logger: Logger) {}
    public utilMethod(error: Error): void {
    this.logger.log('error', 'From runtime error >>> %s', error);
  }
}
```
Plain and simple way to get service instance using .get(<T>), after this you can call method from that service, always its better to inject service in constructor of a class and get instance of service inside class 
Like as below

```javascript
 constructor(@inject(TYPES.LoggerService) private logger: Logger,
            @inject(TYPES.UtilService) private util: Util) {}
}
```

```javascript
const TYPES = {
  LoggerService: Symbol('LoggerService')
};

export default TYPES;
```

Dependency injection is a pattern which removes the responsibility of manually creating class dependencies each time we want to use a particular class. Instead, we configure the Inversion of Control (IoC) container to do this for us.

More example from Inversify 

## Installation

You can get the latest release and the type definitions using npm:

```
$ npm install inversify reflect-metadata --save
```

The InversifyJS type definitions are included in the inversify npm package. 

:warning: **Important!** InversifyJS requires TypeScript >= 2.0 and the `experimentalDecorators`, `emitDecoratorMetadata`, `types` and `lib` 
compilation options in your `tsconfig.json` file.

```js
{
    "compilerOptions": {
        "target": "es5",
        "lib": ["es6"],
        "types": ["reflect-metadata"],
        "module": "commonjs",
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

InversifyJS requires a modern JavaScript engine with support for:

- [Reflect metadata](https://rbuckton.github.io/reflect-metadata/)
- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) (Only required if using [provider injection](https://github.com/inversify/InversifyJS/blob/master/wiki/provider_injection.md))
- [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) (Only required if using [activation handlers](https://github.com/inversify/InversifyJS/blob/master/wiki/activation_handler.md))


Check out the [Environment support and polyfills](https://github.com/inversify/InversifyJS/blob/master/wiki/environment.md)
page in the wiki and the [Basic example](https://github.com/inversify/inversify-basic-example) to learn more.

## The Basics
Let’s take a look at the basic usage and APIs of InversifyJS with TypeScript:

### Step 1: Declare your interfaces and types

Our goal is to write code that adheres to the [dependency inversion principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle). 
This means that we should "depend upon Abstractions and do not depend upon concretions". 
Let's start by declaring some interfaces (abstractions).

```ts
// file interfaces.ts

export interface Warrior {
    fight(): string;
    sneak(): string;
}

export interface Weapon {
    hit(): string;
}

export interface ThrowableWeapon {
    throw(): string;
}
```

InversifyJS need to use the type as identifiers at runtime. We use symbols as identifiers but you can also use classes and or string literals.
 
```ts
// file types.ts

const TYPES = {
    Warrior: Symbol.for("Warrior"),
    Weapon: Symbol.for("Weapon"),
    ThrowableWeapon: Symbol.for("ThrowableWeapon")
};

export { TYPES };

```

> **Note**: It is recommended to use Symbols but InversifyJS also support the usage of Classes and string literals (please refer to the features section to learn more).

### Step 2: Declare dependencies using the `@injectable` & `@inject` decorators
Let's continue by declaring some classes (concretions). The classes are implementations of the interfaces that we just declared. All the classes must be annotated with the `@injectable` decorator. 

When a class has a  dependency on an interface we also need to use the `@inject` decorator to define an identifier for the interface that will be available at runtime. In this case we will use the Symbols `Symbol.for("Weapon")` and `Symbol.for("ThrowableWeapon")` as runtime identifiers.

```ts
// file entities.ts

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Weapon, ThrowableWeapon, Warrior } from "./interfaces";
import { TYPES } from "./types";

@injectable()
class Katana implements Weapon {
    public hit() {
        return "cut!";
    }
}

@injectable()
class Shuriken implements ThrowableWeapon {
    public throw() {
        return "hit!";
    }
}

@injectable()
class Ninja implements Warrior {

    private _katana: Weapon;
    private _shuriken: ThrowableWeapon;

    public constructor(
	    @inject(TYPES.Weapon) katana: Weapon,
	    @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
    ) {
        this._katana = katana;
        this._shuriken = shuriken;
    }

    public fight() { return this._katana.hit(); }
    public sneak() { return this._shuriken.throw(); }

}

export { Ninja, Katana, Shuriken };
```

If you prefer it you can use property injection instead of constructor injection so you don't have to declare the class constructor:

```ts
@injectable()
class Ninja implements Warrior {
    @inject(TYPES.Weapon) private _katana: Weapon;
    @inject(TYPES.ThrowableWeapon) private _shuriken: ThrowableWeapon;
    public fight() { return this._katana.hit(); }
    public sneak() { return this._shuriken.throw(); }
}
```

### Step 3: Create and configure a Container
We recommend to do this in a file named `inversify.config.ts`. This is the only place in which there is some coupling.
In the rest of your application your classes should be free of references to other classes.
```ts
// file inversify.config.ts

import { Container } from "inversify";
import { TYPES } from "./types";
import { Warrior, Weapon, ThrowableWeapon } from "./interfaces";
import { Ninja, Katana, Shuriken } from "./entities";

const myContainer = new Container();
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

export { myContainer };
```

### Step 4: Resolve dependencies
You can use the method `get<T>` from the `Container` class to resolve a dependency.
Remember that you should do this only in your [composition root](http://blog.ploeh.dk/2011/07/28/CompositionRoot/)
to avoid the [service locator anti-pattern](http://blog.ploeh.dk/2010/02/03/ServiceLocatorisanAnti-Pattern/).

```ts
import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import { Warrior } from "./interfaces";

const ninja = myContainer.get<Warrior>(TYPES.Warrior);
```

