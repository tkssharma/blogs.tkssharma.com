---
date: 2020-03-06
title: 'javascript Memory Management | Garbage collection'
template: post
thumbnail: '../thumbnails/js.png'
slug: javascript-garbage-collection-memory-management
categories:
  - Popular
  - Javascript
tags:
  - Javascript
---

Memory Management and garbage collection in Javascript. Slightly unfamiliar topic since in javascript we are not performing any memory operation explicitly however it is good to know how it works.

In the low-level languages like C, developers need to manually allocate and deallocate the memory using malloc(), calloc(), realloc() and free() methods. In the high-level languages like Java, Javascript we don’t need to explicitly allocate or release the memory. Javascript values are allocated when things are created (objects, Strings..) and freed automatically when they are no longer used. This process is called as Garbage collection.
Memory Life Cycle:

Irrespective of any language (high-level or low-level), Memory life cycle will be almost similar as the below.

Memory Life Cycle In the high-level language, We will just read and write to the memory explicitly (Use Memory). In the low-level language, all the three steps developer needs to take care explicitly.

Since allocation and deallocation happen automatically, that doesn’t mean developers not to care about memory management. Poor coding may lead to memory leaks, it is a condition where memory is not released even though that is no longer used by the application. So it is very important to learn more about the memory management.
Memory Allocation in Javascript:

When declaring the variable, Javascript will automatically allocate the memory for the variables.
```javascript
var numberVar = 100;
var stringVar = 'node simplified';
var objectVar = {a: 1};
var a = [1, null, 'abra'];
function f(a) { return a + 2; }
```
When the memory is no longer needed anymore, then the allocated memory will be released. Memory leak and most of the memory related issue come while releasing the memory. The hardest part is finding the memory which is no longer needed and it is tracked down by the garbage collector.
Garbage collection: It is the process of finding memory which is no longer used by the application and releasing it. To find the memory which is no longer used, few algorithms will be used by the garbage collector and in this section we will look into main garbage collection algorithms and its limitations. we will look into following algorithms.

- Reference-counting garbage collection
- Mark-and-sweep algorithm

Reference-counting garbage collection:

It is most important garbage collection algorithm and in which when there is no reference to an object then it will be automatically garbage collected. This algorithm considers zero referencing object as an object that is no longer used by the application.
```javascript
var o = { a: { b: 2 } }; o = 1;
function func() { 
var o = {}; 
var o2 = {}; 
o.a = o2; 
o2.a = o; 
return 'true'; 
} 
func();
```
Consider the above code snippet in which o is referenced to o2 and o2 is referenced to o and it creates a cycle. When the scope goes out of the method, then these two objects are useless however garbage collector unable to free the memory since those two still got the reference to each other. It leads to memory leaks in the application.

Mark-and-sweep algorithm:
-------------------------

The garbage collector uses this algorithm will free the memory when an object is unreachable rather than zero referencing object. The garbage collector will first find all the global objects or root objects and will find all the reference to this global objects and reference to the reference object and so on. Using this algorithm garbage collector will identify the reachable and unreachable objects. All the unreachable objects will be automatically garbage collected. This algorithm is far superior to the above algorithm and object which doesn’t have reference will be unreachable objects too so zero reference objects will be garbage collected and cycle limitation will be solved by this algorithm.


## JavaScript memory management explained

Alright, in order to understand JS memory we need to remember two rules throughout the following article, these are pretty simple:

* Primitive types *(string, number, boolean)* are passed as a copy to function arguments.

* Objects are passed as a reference to function arguments

* Functions and arrays (and null, but it’s not really mutable as the two others) are considered as Objects by JavaScript

You can just verify that behavior try this typeof [] in your browser console and you’ll end up with object being printed.

### How references work in JavaScript and how to interpret it

What you see below is for JavaScript’ engines in general, no matter the framework or environment, but we will see later why this can be tedious with ReactJS and hooks.

    const someObject = { a: 5 };
    const someArray = [1, 2];

You might be tempted to read the following statement as « someObject is created at { a: 5 } reference location (memory location) » but in fact, you should read it as « someObject variable reference point to the object { a: 5 } reference ».

The above statements can be split as follows

    | const someObject   | =                   | { a: 5 };
    | const someArray    | =                   | [1, 2]
    | variable reference | assignment operator | object Reference

You can also have a look at those two GIST that add more explanations: [This one](https://gist.github.com/siwalikm/dbf0e71f6e7e3406369b2cff1a6eb416) and [this one](https://gist.github.com/rtablada/81507edfdfce8063be9a7728c7ae7135).

Ok now we have the basics, let’s see why this can be problematic if badly understood.

## JavaScript closures and references

A quick remember about closures
#### A [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) is a function that remembers its outer variables and can access them. In JavaScript, almost all functions are naturally closures.

While using JavaScript you’re using closure and managing scopes every time and by doing this you need to understand how references work.

Within closure, there is a notion of Lexical Environment which hold values of different scopes. I won’t develop that much here if you want to know more, feel free to read details [here](https://javascript.info/closure#lexical-environment).

➡️ Primitive types with arguments are passed as a copy. What’s following is a quick example.

In the below example, modifying a or b has no side effects at all arg within scope 2. Also modifying arg within scope 2 has no effect on whether a or b.

Remember: scopes are delimited within brackets { }.

    // Scope 1
    let a = 5;
    let b = "hello";

    function test(arg) {
      // Scope 2
      arg = "Something else";
    }

    test(a)
    test(b)

➡️ Objects are passed as reference, we will study that through closure with mutations and assignation.

callByValue
-----------

```javascript
function callByValue(varOne, varTwo) { 
  console.log("Inside Call by Value Method"); 
  varOne = 100; 
  varTwo = 200; 
  console.log("varOne =" + varOne +"varTwo =" +varTwo); 
} 
let varOne = 10; 
let varTwo = 20; 
console.log("Before Call by Value Method"); 
console.log("varOne =" + varOne +"varTwo =" +varTwo); 
callByValue(varOne, varTwo) 
console.log("After Call by Value Method"); 
console.log("varOne =" + varOne +"varTwo =" +varTwo); 

output will be : 
--------------- 
Before Call by Value Method 
varOne =10 varTwo =20 
Inside Call by Value Method 
varOne =100 varTwo =200 
After Call by Value Method 
varOne =10 varTwo =20
```

callByReference
--------------

```javascript
function callByReference(varObj) { 
  console.log("Inside Call by Reference Method"); 
  varObj.a = 100; 
  console.log(varObj); 
} 
let varObj = {a:1};
console.log("Before Call by Reference Method"); 
console.log(varObj);
callByReference(varObj) 
console.log("After Call by Reference Method"); 
console.log(varObj);
output will be : 
--------------- 
Before Call by Reference Method 
{a: 1} 
Inside Call by Reference Method 
{a: 100} 
After Call by Reference Method 
{a: 100}
```

### Assignation vs Mutation with closure in JavaScript

As closure and callback are the core of JavaScript programming and event-driven programming you will much time rely on such things.

In the following example, there is a quick NodeJS snippet, which will mimic the behavior of displaying messages to users that are registered to a topic. But this code is a bit dynamic:

* During the program execution, the subscribed users will change. I’m mimicking this using a setInterval function every 10 seconds. Sometimes one interest user is added, sometimes one is removed.

* Every second, we send a random message to subscribed users.

At the end of the file, there are two setInterval functions that are responsible for mutating our array of subscribed users. We also created a variable scope thank to closure function calledstartListeningForMessages.

Let’s try the code

Feel free to use your own NodeJS environment or this one hosted in the cloud: [https://repl.it/languages/nodejs](https://repl.it/languages/nodejs)

```javascript
const events = require("events");

// Vars
let interestedUsers = [];
const goodPlanTopic = new events.EventEmitter();

function startListeneningForMessages(topic, listeningUsers) {
  // Each time a message is received, we sent a notification to user interest in our topic
  function onNewMessage(newMessage) {
    listeningUsers.forEach(user =>
      console.log("Sent message to [" + user + "] : " + newMessage),
    );
  }

  // Subscribe to topic
  topic.on("message", onNewMessage);

  // We return function used to cancel listener
  return () => topic.off("message", onNewMessage);
}

// Every second we have a new appearing message (pushed in emitter).
setInterval(() => {
  goodPlanTopic.emit(
    "message",
    "Text message N°" +
      Math.random()
        .toFixed(6)
        .substr(2),
  );
}, 1000);

// Start programm
startListeningForMessages(goodPlanTopic, interestedUsers); // We are passing our array
console.log("Started, wait 10 seconds before first event…");

// Second scenario by mutating
setInterval(() => {
  if (Math.random > 0.5) {
    console.log("New user will be removed (and repercuted)");
    interestedUsers.splice(
      Math.floor(Math.random() * interestedUsers.length),
      1,
    );
  } else {
    console.log("New user will be added (and repercuted)");
    interestedUsers.push(
      "user" +
        Math.random()
          .toFixed(3)
          .substr(2),
    );
  }
}, 10000);
```
Script usage description

Try to start the program with the first setInterval uncommented, then invert and uncomment the second one and comment the first.

Do you see the difference?

### Explanation

* In the first interval, nothing shows. That’s because we are replacing the reference of our array. Even if passed as reference listeningUsers argument still point to the old interestedUsers pointer reference. That way interestedUsers is getting reassigned while the old interestedUsers still exists but can’t be garbage collected as reference still exists nor accessed outside of the closure scope. This could be a memory leak, but in our case, it’s even worse because we are not synchronized anymore in our interest list.

* In the second interval, things change. That’s because we are using mutating methods from the Array object. That way the reference is not changing but elements inside the array are. By doing so we are not losing the context through our closure function.

That’s why you should always ask yourself whether you should mutate or reassign something and think about side effects while using out of scope variables.

### This also applies to objects!

For an object that’s pretty much the same, if you edit a key of the object inside the closure function, it’s okay as you still point to the same reference. But if you re-assign the object inside the function, you lose the reference.

## What about React hooks?

Same thing here, as useState will only cause re-render if Object.is comparison returns false after calling the setter if you use useState and don’t change the reference your UI will not get updated.

That’s why generally we ask for useEffect and clean closure scope on state change, but sometimes by doing so, during the timeframe of unsubscribe/resubscribe with new values you might lose some events from the event listener. Also its really important when having object state or array state
