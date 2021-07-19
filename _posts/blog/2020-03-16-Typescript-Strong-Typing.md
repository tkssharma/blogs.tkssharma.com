---
date: 2020-03-16
title: 'Typescript from beginner to Strong Typing Part-1'
template: post
thumbnail: '../thumbnails/ts.png'
slug: typescript-from-beginner-to-strong-typing-part-1
categories:
  - Popular
  - Typescript
  - Javascript
tags:
  - Typescript
  - Javascript
---

Since 2012, TypeScript has been a popular choice for programmers coming to JavaScript from more structured languages (like C++ or Java)…

* * *

### Learning Typescript in Depth 3.x.x

![](https://cdn-images-1.medium.com/max/2560/1*0r4CMSULZkUCMfv-hiFU7A.png)

Since 2012, TypeScript has been a popular choice for programmers coming to JavaScript from more structured languages (like C++ or Java). But it’s also been largely dismissed by those native to the JavaScript world.

You may have heard that the Angular team recently [switched to TypeScript for Angular 2](https://vsavkin.com/writing-angular-2-in-typescript-1fa77c78d8e8). So have the teams behind [RxJS](https://github.com/ReactiveX/rxjs), [Ionic](https://blog.ionic.io/announcing-ionic-2-0-0-final/), [Cycle.js](https://cycle.js.org/), [Blueprint](https://github.com/palantir/blueprint), [Dojo](https://dojotoolkit.org/community/roadmap/vision.html), [NativeScript](https://github.com/NativeScript/NativeScript), [Plottable](https://github.com/palantir/plottable), and others.

If you’ve been in JavaScript/Node.js land for a while, it’s easy to assume that the shot-callers for these projects have lost their minds. Or maybe that they were paid off by Microsoft. 👀

[Scrimba - Playlist Understanding Typescript In Depth  
_Scrimba is a community of developers sharing knowledge through interactive coding screencasts._scrimba.com](https://scrimba.com/playlist/pKpMECK "https://scrimba.com/playlist/pKpMECK")[](https://scrimba.com/playlist/pKpMECK)

![](https://cdn-images-1.medium.com/max/800/1*6iZRxm29jTTDu1z91fo0iA.jpeg)

And if you haven’t been watching closely, you may have missed TypeScript’s amazing progress over the past year (and even the past few months).

If you’re still thinking “TypeScript is kinda like CoffeeScript, right?” — this article is for you.

Typescript is something which is adding types in your application to make it full proof application.

### TypeScript is JavaScript with better linting

Probably one of the most common concerns with the idea of using TypeScript is that it isn’t _pure_ JavaScript. Because TypeScript is its own language, it’s assumed your code will be transpiled into a messy glob which you’ll someday be forced to debug.

Besides TypeScript being extremely well-tested and widely in use, it’s worth noting that depending on your configuration, very little “transpiling” is actually happening (if any). TypeScript is just Javascript with optional typings.

let’s Learn Typescript building blocks

#### Typescript Compiler

There are two main ways to get the TypeScript tools:

*   Via npm (the Node.js package manager)
*   By installing TypeScript’s Visual Studio plugins

Visual Studio 2017 and Visual Studio 2015 Update 3 include TypeScript by default. If you didn’t install TypeScript with Visual Studio, you can still [download it](https://www.typescriptlang.org/#download-links).

For NPM users:

    > npm install -g typescript

### Building your first TypeScript file

In your editor, type the following JavaScript code in `greeter.ts`:
```javascript
    function greeter(person) {   
       return "Hello, " + person;
    }
    let user = "Jane User";
    document.body.innerHTML = greeter(user);
```
### Compiling your code

We used a `.ts` extension, but this code is just JavaScript. You could have copy/pasted this straight out of an existing JavaScript app.

At the command line, run the TypeScript compiler:
```javascript
    tsc greeter.ts
```
The result will be a file `greeter.js` which contains the same JavaScript that you fed in. We’re up and running using TypeScript in our JavaScript app!

Now we can start taking advantage of some of the new tools TypeScript offers. Add a `: string` type annotation to the ‘person’ function argument as shown here:
```javascript
    function greeter(person: string) {   
       return "Hello, " + person;
    }
    let user = "Jane User";
    document.body.innerHTML = greeter(user);
```
### Type annotations

Type annotations in TypeScript are lightweight ways to record the intended contract of the function or variable. In this case, we intend the greeter function to be called with a single string parameter. We can try changing the call greeter to pass an array instead:
```javascript
    function greeter(person: string) {  
        return "Hello, " + person;
    }
    let user = [0, 1, 2];
    document.body.innerHTML = greeter(user);
```
Re-compiling, you’ll now see an error:
```javascript
    error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```
Similarly, try removing all the arguments to the greeter call. TypeScript will let you know that you have called this function with an unexpected number of parameters. In both cases, TypeScript can offer static analysis based on both the structure of your code, and the type annotations you provide.

Notice that although there were errors, the `greeter.js` file is still created. You can use TypeScript even if there are errors in your code. But in this case, TypeScript is warning that your code will likely not run as expected.

Union Type, optional type, array literal with types

The non-primitive group includes void, string literal, tuple, any, unknown, and never

### Void & NeverTypes

In TypeScript 2.0, a new primitive type called `never` was introduced. It represents the type of values that never occur. The `never` type is used in the following two places:

*   As the return type of functions that never return.
*   As the type of variables under type guards that are never true.

### Union Types

Union types are closely related to intersection types, but they are used very differently. Occasionally, you’ll run into a library that expects a parameter to be either a `number` or a `string`. For instance, take the following function:

Takes a string and adds "padding" to the left. * If 'padding' is a string, then 'padding' is appended to the left side. If 'padding' is a number, then that number of spaces is added to the left side. 

```javascript
function padLeft(value: string, padding: any) { 
     if (typeof padding === "number") {    
           return Array(padding + 1).join(" ") + value;  
      }   
    if (typeof padding === "string") { 
           return padding + value;    
      }  
    throw new Error(`Expected string or number, got '${padding}'.`);}
    padLeft("Hello world", 4); // returns "    Hello world"
```
The problem with `padLeft` is that its `padding` parameter is typed as `any`. That means that we can call it with an argument that’s neither a `number` nor a `string`, but TypeScript will be okay with it.

### Enums

Enums allow us to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases. TypeScript provides both numeric and string-based enums.

### Numeric enums

We’ll first start off with numeric enums, which are probably more familiar if you’re coming from other languages. An enum can be defined using the `enum` keyword.
```javascript
    enum Direction {   
       Up = 1,    Down,    Left,    Right
       }
```
Above, we have a numeric enum where `Up` is initialized with `1`. All of the following members are auto-incremented from that point on. In other words, `Direction.Up` has the value `1`, `Down` has `2`, `Left` has `3`, and `Right` has `4`.

### Interfaces

One of TypeScript’s core principles is that type-checking focuses on the _shape_ that values have. This is sometimes called “duck typing” or “structural subtyping”. In TypeScript, interfaces fill the role of naming these types, and are a powerful way of defining contracts within your code as well as contracts with code outside of your project.

#### Our First Interface

The easiest way to see how interfaces work is to start with a simple example:
```javascript
    function printLabel(labelledObj: { label: string }) {    console.log(labelledObj.label);}

    let myObj = {size: 10, label: "Size 10 Object"};printLabel(myObj);
```

The type-checker checks the call to `printLabel`. The `printLabel` function has a single parameter that requires that the object passed in has a property called `label` of type string. Notice that our object actually has more properties than this, but the compiler only checks that _at least_ the ones required are present and match the types required. There are some cases where TypeScript isn’t as lenient, which we’ll cover in a bit.

We can write the same example again, this time using an interface to describe the requirement of having the `label`property that is a string:

```javascript
    interface LabelledValue {   
       label: string;
      }
    function printLabel(labelledObj: LabelledValue) {   
       console.log(labelledObj.label);}
    let myObj = {size: 10, label: "Size 10 Object"};printLabel(myObj);
```
### Generics<T>

To start off, let’s do the “hello world” of generics: the identity function. The identity function is a function that will return back whatever is passed in. You can think of this in a similar way to the `echo` command.

Without generics, we would either have to give the identity function a specific type:
```javascript
    function identity(arg: number): number { 
         return arg;
    }
```
Or, we could describe the identity function using the `any` type:

```javascript
    function identity(arg: any): any { 
         return arg;
    }
```

While using `any` is certainly generic in that it will cause the function to accept any and all types for the type of `arg`, we actually are losing the information about what that type was when the function returns. If we passed in a number, the only information we have is that any type could be returned.

Instead, we need a way of capturing the type of the argument in such a way that we can also use it to denote what is being returned. Here, we will use a _type variable_, a special kind of variable that works on types rather than values.

```javascript
    function identity<T>(arg: T): T {  
        return arg;
    }
```

We’ve now added a type variable `T` to the identity function. This `T` allows us to capture the type the user provides (e.g. `number`), so that we can use that information later. Here, we use `T` again as the return type. On inspection, we can now see the same type is used for the argument and the return type. This allows us to traffic that type information in one side of the function and out the other.

We say that this version of the `identity` function is generic, as it works over a range of types. Unlike using `any`, it’s also just as precise (ie, it doesn’t lose any information) as the first `identity` function that used numbers for the argument and return type.

Once we’ve written the generic identity function, we can call it in one of two ways. The first way is to pass all of the arguments, including the type argument, to the function:

#### Deep Dive in Typescript Types 

A great way to experiment with TypeScript and its type system without even having to install TypeScript is to jump right into coding using the typescriptlang.org TypeScript playground. Jump in, type some code, and hover over the variables, functions and classes to find their types.

The basic types in TypeScript correspond to the primitive types of JavaScript:
```javascript
number
boolean
string
Date
Array<T>
Object
```
So that, if you want to define a string in TypeScript you’d type the following:
```javascript
let myName: string = "Jaime";
```

Because TypeScript’s goal is to make your life easy, in situations like this it’ll be smart enough to infer the type of the myName variable so that you don’t need to explicitly annotate it. Which means that this is enough:
# Lets talk types one by one


Unions
------

Imagine we are building a library that lets you create beautiful visualizations using SVG. In order to set the properties on an SVG element it’d be helpful to have a function that could look something like this:
```javascript
function attr(element, attribute, value) {}
```
The type of each one of these attributes could be expressed as follows:
```javascript
function attr(element: SVGCircleElement, 
              attribute: string, 
              value: string) {}
// And you could use this function like so:

attr(myCircle, "cx", 10);
attr(myCircle, "cy", 10);
attr(myCircle, "r", 5);
This works but… What if you misspell an attribute?

attr(myCircle, "cx", 10);
attr(myCircle, "cy", 10);
attr(myCircle, "radius", 5);
``` 
// => 💥 Doesn't work! There's no radius in SVGCircleElement
It blows up sometime at runtime. And although it may not explode outright, it won’t work as you expected it to. But isn’t this exactly what a type system and TypeScript should help you with? Exactly! A better approach is to take advantage of TypeScript type system and use type literals to further constraint the number of possible attributes:
```javascript
function attr(element: SVGCircleElement,
              attribute: "cx" | "cy" | "r",
              value: string) {}
```
The "cx" | "cy" | "r" is a union type and represents a value that can either be of type "cx", "cy" or "r". You build union types using the | union type operator.


Excellent! So if we now make the same mistake than we just made a second ago, TypeScript will come to the rescue and give us some feedback instantaneously:
```javascript
attr(myCircle, "cx", 10);
attr(myCircle, "cy", 10);
attr(myCircle, "radius", 5); 
// => 💥 Type '"radius"' not assignable to type "cx" | "cy" | "r"
// 🤔 Oh wait! So the radius attribute in a circle is actually called "r"!
```


Type Aliases
-------------

An attribute type defined as we did earlier can be confusing and cumbersome to reuse:
```javascript
function attr(element: SVGCircleElement,
              attribute: "cx" | "cy" | "r",
              value: string) {}
```              
Type aliases are a convenient shorthand to describe a type, something like a nickname that can be used to provide a more descriptive name for a type and allow you to reuse it around your codebase.

So if we wanted to create a type that could represent all the available attributes in an SVGElement a way to go about that would be to create an alias like so:
```javascript
type Attribute = "cx" | "cy" | "r" // etc...
```
Once defined we can rewrite attr function signature:
```javascript
function attr(element: SVGCircleElement,
              attribute: Attribute,
              value: string) {}
```              

Arrays, Tuples and Objects
--------------------------

You can type an array in TypeScript by using the following notation:
```javascript
let numbers: number[] = [1, 2, 3];
```
Or alternatively:
```javascript
let numbers: Array<number> = [1, 2, 3];
```

I like the former because it involves less typing. Since we’re just initializing a variable TypeScript can infer the type, so in this case you can remove the type annotation:

```javascript
// TypeScript can infer that the type 
// of numbers is number[]
let numbers = [1, 2, 3];
numbers.push('wat');
// 💥 Argument of type '"wat"' is not assignable to parameter of type 'number'.
numbers.push(4);
// ✅ Yes!
numbers.psuh(5);
// 💥 Property 'psuh' does not exist on type 'number[]'.(2339)
```

TypeScript also has great support for tuples which can be seen as finite arrays of two, three (triplet), four (quadruplet), or more elements. They come in handy when you need to model a number of finite items that have some relationship between them.

We can define a tuple of two elements like this:

let position: [number, number] = [0, 0];
If we now try to access an element outside of the boundaries of the tuplet TypeScript will come and save us:

let something = position[2];
// 💥 Tuple type '[number, number]' of length '2' has no element at index '2'.
We can follow a similar approach to define tuples with more elements:
```javascript
let triplet: [number, number, number];
let quadruplet: [number, number, number, number];
let quintuplet: [number, number, number, number, number];
```
On occasion you’ll find yourself using objects in TypeScript. This is how you type an object literal:
```javascript
const position: {x:number, y:number} = {x: 0, y: 0};
```
Again, under these circumstances TypeScript can infer the type of the object literal so the type annotation can be omitted:
```javascript
const position = {x: 0, y: 0};
const position = {x: 0, y: 0};

console.log(position.cucumber);
// 💥 Property cucumber doesn't exist in type {x:number, y:number}
```
If you are daring enough to try an access a property that isn’t defined in the object’s type, TypeScript will get angry at you: