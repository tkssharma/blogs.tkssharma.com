---
date: 2019-01-05
title: 'Learn typescript from basics'
topic: 'Learn typescript from basics''
description: 'Learn typescript from basics''
template: post
thumbnail: '../thumbnails/js.png'
slug: typescript-style-guide-developers
categories:
  - Guides
tag:
  - Javascript
  - typescript
  - es6
tags:
  - Javascript
  - typescript
  - es6
---

## Typing Functions as Values

Ok. So far we’ve seen how you type a function inline using a function declaration for the most part. But JavaScript is very, very fond of functions, and of using functions as values to pass them around and return them from other functions.

This is a function as a value (which we store inside a variable add):

```javascript
const add = (a: number, b: number) => a + b
```

What is the type of the variable add? What is the type of this function?
The type of this function is:

(a: number, b: number) => number;
Which means that instead of using inline types we could rewrite the add function like so:

```javascript
const add: (a: number, b: number) => number = (a, b) => a + b
```

or using an alias:

```javascript
type Add = (a: number, b: number) => number
const add: Add = (a, b) => a + b
```

This example above is quite intesting because the type information is flowing in the opposite way to what we're used to. So far we've been defining types on the expression to the right which flow to the variable that is being assigned (on the left). In this case however, we're defining the type of the variable on the left, and the types flow to the expression on the right. Interesting, isn't it?

This feature of been able to grab types from the context is known as contextual typing and it is a great feature to have because it improves TypeScript type inference capabilities and saves you from typing more annotations than the minimum required.

If this sounds interesting, you may want to take a look at the documentation on TypeScript type inference.

After rewriting the function to use the new full-blown type definition, TypeScript would nod at us knowingly, because it can roll with either inline types or these other separate type definitions. If you take a look at both ways of typing this function side by side:

```javascript
// # 1. Inline
const add = (a: number, b: number) => a + b

// # 2. With full type definition
const add: (a: number, b: number) => number = (a, b) => a + b
```

You are likely to prefer option 1 since it’s more pleasant, easier to read and the types are very near to the params they apply to which eases understanding. So when is option 2 useful?

Option 2 or full type definitions is useful whenever you need to store a function, and when working with higher-order functions.

A higher-order function is a function that either takes another function as a paremeter or returns a function. You can learn more about higher-order functions and other functional programming concepts in this excellent article on the topic.

Let’s illustrate the usefulness of typing functions as values with an example. Imagine we want to design a logger that only logs information under some circumstances. This logger could be modelled as a higher-order function like this one:

```javascript
// Takes a function as a argument
function logMaybe(shouldLog: () => boolean, msg: string) {
  if (shouldLog()) console.log(msg)
}
```

The logMaybe function is a higher-order function because it takes another function shoudLog as a parameter. The shouldLog function is a predicate that returns whether or not something should be logged.

We could use this function to log whether some monster dies a horrible death like so:

```javascript
function attack(target: Target) {
  target.hp -= 10
  logMaybe(() => target.isDead, `${target} died horribly`)
}
```

Another useful use case would be to create a factory of loggers:

```javascript
type Logger = (msg: string) => void
// Returns a function
function createLogger(header: string): Logger {
  return function log(msg: string) {
    console.log(`${header} ${msg}`)
  }
}
```

createLogger is a higher-order function because it returns another function of type Logger that lets you log strings. We can use createLogger to create loggers to our heart’s content:

```javascript
const jaimeLog = createLogger('Jaime says:')

jaimeSays('banana')
// Jaime says: banana
// TypeScript is great at inferring return types so we don’t really need to explicitly type the returning function. This would work as well:

function createLogger(header: string) {
  return function log(msg: string) {
    console.log(`${header} ${msg}`)
  }
}
```

## Function Overloading

One of the features I kind of miss from strongly typed languages like C# is function overloading. The idea that you can define multiple signatures for the same function taking a diverse number of parameters of different types, and upon calling that function the compiler will be able to discriminate between functions and select the correct implementation. This is a very nice way to provide slightly different APIs to solve the same problem. Like, the problem of raising an army of the undead:

```javascript
raiseSkeleton()
// don't provide any arguments and you raise an skeleton
// => raise a skeleton
raiseSkeleton(4)
// provide a number and you raise a bunch of skeletons
// => raise 4 skeletons
raiseSkeleton('king')
// provide a string and you raise a special type of skeleton
// => raise skeleton king
```

JavaScript however doesn’t have a great support for function overloading. You can mimick function overloading in JavaScript but it does require a bunch of boilerplate code to manually discriminate between function signatures. For instance, a possible implementation for the raiseSkeleton function above could be this:

```javascript
function raiseSkeleton(options) {
  if (typeof options === 'number') {
    raiseSkeletonsInNumber(options)
  } else if (typeof options === 'string') {
    raiseSkeletonCreature(options)
  } else {
    console.log('raise a skeleton')
  }

  function raiseSkeletonsInNumber(n) {
    console.log('raise ' + n + ' skeletons')
  }
  function raiseSkeletonCreature(creature) {
    console.log('raise a skeleton ' + creature)
  }
}
```

You can read more about the perils of function overloading in JavaScript in this other article.

TypeScript tries to lessen the burden of writing function overloading somewhat but it doesn’t get all the way there since it is still a superset of JavaScript. The part of function overloading in TypeScript that is really pleasant is the one concerning the world of types.

Let’s go back to the log function we used in earlier examples:

```javascript
function log(msg: string, userId: string) {
  console.log(new Date(), msg, userId)
}
// The type of that function could be defined by this alias:

type Log = (msg: string, userId: string) => void
// And this type definition is equivalent to this other one:

type Log = {
  (msg: string, id: string): void,
}
```

If we wanted to make the log function provide multiple APIs adapted to different use cases we could expand the type definition to include multiple function signatures like this:

```javascript
type Log = {
  (msg: string, id: string): void
  (msg: number, id: string): void
}
```

Which now would allow us to record both string messages as before, but also message codes that are messages obfuscated as numbers which we can match to specific events in our backend.

Following this same approach, a type definition for our raiseSkeleton function would look like this:

```javascript
type raiseSkeleton = {
  (): void
  (count: number): void
  (typeOfSkeleton: string): void
}
// Which we can attach to the real implementation in this manner:

const raiseSkeleton : raiseSkeleton = (options?: number | string) => {
  if (typeof options === 'number') {
    raiseSkeletonsInNumber(options)
  } else if (typeof options === 'string') {
    raiseSkeletonCreature(options)
  } else {
    console.log('raise a skeleton')
  }

  function raiseSkeletonsInNumber(n: number) {
    console.log('raise ' + n + ' skeletons')
  }
  function raiseSkeletonCreature(creature: string) {
    console.log('raise a skeleton ' + creature)
  }
}
```

And alternative type definition which doesn’t require the creation of an alias (but which I find quite more verbose) is the following:

```javascript
// Alternative syntax
function raiseSkeleton(): void;
function raiseSkeleton(count: number): void;
function raiseSkeleton(skeletonType: string): void;
function raiseSkeleton(options?: number | string): void {
  // implementation
}
```

If we take a minute to reflect about function overloading in TypeScript we can come to some conclusions:

TypeScript function overloading mostly affects the world of types
Looking at a type definition it is super clear to see the different APIs an overloaded function supports, which is really nice
You still need to provide an implementation underneath that can handle all possible cases
In summary, function overloading in TypeScript provides a very nice developer experience for the user of an overloaded function, but not so nice a experience for the one implementing that function. So the code author pays the price to provide a nicer DX to the user of that function.

Yet another example is the document.createElement method that we often use when creating DOM elements in the web (although we don’t do it as much in these days of frameworks and high-level abstractions). The document.createElement method is an overloaded function that given a tag creates different types of elements:

```javascript
type CreateElement = {
  (tag: 'a'): HTMLAnchorElement
  (tag: 'canvas'): HTMLCanvasElement
  (tag: 'svg'): SVGSVGElement
  // etc...
}
```

Providing an API like this in TypeScript is really useful because the TypeScript compiler can help you with statement completion (also known in some circles as IntelliSense). That is, as you create an element using the a tag, the TypeScript compiler knows that it will return an HTMLAnchorElement and can give you compiler support to use only the properties that are available in that element and no other. Isn’t that nice?

Argument Destructuring
A very popular pattern for implementing functions these days in JavaScript is argument destructuring. Imagine we have an ice cone spell that we use from time to time to annoy our neighbors. It looks like this:

```javascript
function castIceCone(caster, options) {
  caster.mana -= options.mana
  console.log(`${caster} spends ${options.mana} mana 
and casts a terrible ice cone ${options.direction}`)
}
```

I often use it with the noisy neighbor upstairs when he’s having parties and not letting my son fall asleep. I’ll go BOOOOM!! Ice cone mathafackaaaa!

castIceCone('Jaime', {mana: 10, direction: "towards the upstairs' neighbors balcony for greater justice"});
// => Jaime spends 10 mana and casts a terrible ice cone
// towars the upstairs' neighbors balcony for greater justice
But it feels like a waste to have an options parameter that doesn’t add any value at all to this function signature. A more descriptive and lean alternative to this function takes advantage of argument destructuring to extract the properties we need, so we can use them directly:

```javascript
function castIceCone(caster, { mana, direction }) {
  caster.mana -= mana
  console.log(`${caster} spends ${mana} mana 
and casts a terrible ice cone ${direction}`)
}
```

This removes a lot of noise and it also allows us to set sensible defaults inline which makes sense because the second paremeter should be optional:

```javascript
function castIceCone(caster, { mana = 1, direction = 'forward' } = {}) {
  caster.mana -= mana
  console.log(`${caster} spends ${mana} mana 
and casts a terrible ice cone ${direction}`)
}
```

So how do we type this param in TypeScript? You may be tempted to write something like this:

```javascript
function castIceCone(
  caster: SpellCaster,
  { mana: number, direction: string }
): void {
  caster.mana -= mana
  console.log(`${caster} spends ${mana} mana 
and casts a terrible ice cone ${direction}`)
}
```

But it wouldn’t work. Because that’s legit ES2015 destructuring syntax. It’s the pattern you use when you want to project a property of an object into a variable with a different name. In the example above we’re projecting options.mana into a variable named number, and options.direction into another variable string. Ooops.

The most common way to type the function above is to provide a type for the whole parameter (just like we normally do with any other params):

```javascript
function castIceCone(
  caster: SpellCaster,
  {mana=1, direction="forward"}={} : {mana?: number, direction?:string}
  ): void {
  caster.mana -= mana;
  console.log(`${caster} spends ${mana} mana
and casts a terrible ice cone ${direction}`);
}
```

Both parameters are optional because they have defaults so the user of this function doesn’t have to provide these as arguments if they don’t want. There’s something particularly interesting about this example that you may not have noticed: the types of the parameters as defined in the function declaration are not the types of the parameters inside the function. What? The caller of this function and the body of this function see different types. What??

A caller of castIceCone sees mana as required to be of type number or undefined. But since mana has a default value, within the body of the function it will always be of type number.
Likewise, the caller of the function will see direction as been string or undefined whilst the body of the function knows it’ll always be of type string.
TypeScript argument destructuring can get quite verbose very fast so you may want to consider declaring an alias:

```javascript
type IceConeOptions = {mana?: number, direction?: string}
function castIceCone(
  caster: SpellCaster,
  {mana=1, direction="forward"}={} : IceConeOptions): void {
  caster.mana -= mana;
  console.log(`${caster} spends ${mana} mana
and casts a terrible ice cone ${direction}`);
}
```

or opting out of inline types entirely:

type castIceCone = (caster: SpellCaster, options: IceConeOptions) => void;

```javascript
const castIceCone: castIceCone = (
  caster,
  { mana = 1, direction = 'forward' } = {}
) => {
  caster.mana -= mana
  console.log(`${caster} spends ${mana} mana 
and casts a terrible ice cone ${direction}`)
}
```
