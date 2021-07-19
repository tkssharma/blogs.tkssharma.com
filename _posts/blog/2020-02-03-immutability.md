---
date: 2019-12-23
title: 'Immutability in Javascript | Array & Objects'
template: post
thumbnail: '../thumbnails/js.png'
slug: Immutability-in-Javascript
categories:
  - Javascript
tags:
  - Array
  - Objects
  - Immutability
  - Javascript
---

In object-oriented and functional programming, an immutable object (unchangeable object) is an object whose state cannot be modified after it is created. This is in contrast to a mutable object (changeable object), which can be modified after it is created.

[Immutable](http://en.wikipedia.org/wiki/Immutable_object) data cannot be changed once created, leading to much simpler application development, no defensive copying, and enabling advanced memoization and change detection techniques with simple logic.

Immutable.js provides many Persistent Immutable data structures including: `List`, `Stack`, `Map`, `OrderedMap`, `Set`, `OrderedSet` and `Record`.

Immutability
============

Immutability is a core principle in functional programming. In this post, I am going to list some of the best practices used to keep data structures immutable in JavaScript without using any third-party libraries.

A mutable object is an object whose state can be modified after it is created. An immutable object is an object whose state cannot be modified after it is created. Examples of native JavaScript values that are immutable are numbers and strings. Examples of native JavaScript values that are mutable include objects, arrays, functions, classes, sets, and maps.

mutability
==========

So why does this matter? Consider the following code examples:

```
let a = {  
    foo: 'bar'  
};let b = a;a.foo = 'test';console.log(b.foo); // test  
console.log(a === b) // truelet a = 'test';  
let b = a;  
a = a.substring(2);console.log(a) //st  
console.log(b) //test  
console.log(a === b) //falselet a =  ['foo', 'bar' ];  
let b = a;a.push('baz')console.log(b); //  ['foo', 'bar', 'baz' ]  
console.log(a === b) // truelet a = 1;  
let b = a;  
a++;console.log(a) //2  
console.log(b) //1  
console.log(a === b) //false
```

What we see is that for mutable values, updating state applies across all _references_ to that variable. So changing a value in one place changes it for all references to that object. For the immutable data types, we have no way of changing the internal state of the data, so the reference always gets reassigned to a new object. The biggest implication of this is that for immutable data, equality is more reliable since we know that a value’s state won’t be changed out from under us.

Finally, it’s worth noting that it’s still possible to treat JavaScript objects as immutable. This can first be done through [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze), which shallowly renders a JavaScript object immutable. But it can also be done with programmer discipline

If we want to rely on object’s being immutable, it’s possible to enforce that all object updates are done through something like `Object.assign(a, {foo: 'bar'})` rather than `a.foo = 'bar'`, and all array updates are done through functions that generate new arrays like `Array.prototype.map`, `Array.prototype.filter`, or `Array.prototype.concat`, rather than mutating methods like `Array.prototype.push`, `Array.prototye.pop`, or `Array.prototype.sort`. This is less reliable without language level constraints but has become popular in the React ecosystem for dealing with data for folks who don’t want to introduce abstractions like Immutable.js.

Which data types are immutable in Javascript then?
==================================================

Primitives data types like string, number and boolean are immutable by default, they cannot be altered so you do not need to apply any “magic” to keep them immutable. We cannot say the same for objects and arrays which are mutable by default, because they are only references.  
Following, We will go through some operations that will help us to keep also objects and arrays immutable. Let’s make an array and object immutable by using some hacks or using some development discipline.

Operations on arrays.
=====================

Cloning an array of primitive data types.
-----------------------------------------

```
const sourceArray =  [1,2,3 ];  
const clonedArray =  [...sourceArray ];  
// or you can do  
const clonedArray = sourceArray.slice(0);
```

Cloning an array of objects which props are primitive data types.
-----------------------------------------------------------------

```
const sourceArray =  [{ a: 1}, { b: 2 }, { c: 3} ];  
const clonedArray = sourceArray.map(item => ({...item}));
```

Adding a new element into an array.
-----------------------------------

```
const sourceArray =  [1,2,3 ];  
const newArray =  [...sourceArray, 4 ];  
const sourceArray =  [{ a: 1}, { b: 2 }, { c: 3} ];  
const newArray =  [...sourceArray, { d: 4} ];
```

Removing an element from an array.
----------------------------------

```
const itemToRemove = 3;  
const sourceArray =  [1,2,3 ];  
const newArray = sourceArray.filter(item => item !== itemToRemove);
```

Replacing an element into an array.
-----------------------------------

```
const itemToAdd = { id: 2, a: 4 };  
const sourceArray =  [{id: 1, a: 1}, {id: 2, a: 2}, {id: 3, a: 3} ];// replacing without caring about position  
const newArray =  [...sourceArray.filter(item => item.id !== itemToAdd.id), itemToAdd ];// replacing caring about position  
const indexOldElement = sourceArray.findIndex(({ id }) => id == itemToAdd.id);  
const newArray = Object.assign( [...sourceArray ], { [indexOldElement ]: itemToAdd});// or you can do  
const newArray =  [...sourceArray.slice(0, indexOldElement), itemToAdd, ...sourceArray.slice(indexOldElement + 1) ]
```

Adding a new prop.
------------------

```
const sourceObj = { a: 1, b: 2};  
const newProp = { c: 3 };  
const newObj = { ...sourceObj, ...newProp};  
// or you can do  
const c = 3;  
const newObj = { ...sourceObj, c};  
// newObj = { a: 1, b: 2, c: 3};
```

Removing a prop.
----------------

```
const sourceObj = { a: 1, b: 2, c: 3};  
const { b, ...newObj } = sourceObj;  
// console.log(newObj) => { a: 1, c: 3};
```

Update a nested Object which props are primitives.
--------------------------------------------------

```
const sourceObj = { a: 1, b: 2, c: { d: 3, e :4 } };  
const c = { ...sourceObj.c, f: 5 }  
const newObj = { ...sourceObj, c };
```

Update a nested Object which props are not primitives.
------------------------------------------------------

```
const sourceObj = { a: 1, b: 2, c: { d:  [1, 2, 3  ], e :4 } };  
const d =  [ ...sourceObj.c.d, 4  ];  
const c = { ...sourceObj.c, d }  
const newObj = { ...sourceObj, c };
```

Unfortunately, the process of correctly applying immutable updates to nested object can easily become verbose and hard to read.

Mutable Array Methods — Immutable Way
=====================================

Let’s play with some examples, Change these methods to the immutable way

*   Push
*   Unshift
*   Pop
*   Shift
*   Removal and inserting of items
*   Sort and reverse

Push
====

Push is an operation that adds a new item on top of the array.

```
const fruits =  ['orange', 'apple', 'lemon' ];  
fruits.push('banana');   
// =  ['orange', 'apple', 'lemon', 'banana' ]
```

The resulting array is a concatenation of the original array and the item. Let’s try to accomplish that in an immutable way:

```
const fruits =  ['orange', 'apple', 'lemon' ];  
const newFruits =  [...fruits, 'banana' ];   
// =  ['orange', 'apple', 'lemon', 'banana' ]
```

The spread operator `...` here is ‘spreading’ the items of the array as arguments.

Unshift
=======

Unshift is an operation similar to [push](https://ultimatecourses.com/blog/all-about-immutable-arrays-and-objects-in-javascript#push). However, instead of adding the item at the end we will prepend the item at the beginning of the array.

```
const fruits =  ['orange', 'apple', 'lemon' ];  
fruits.unshift('banana');   
// =  ['banana', 'orange', 'apple', 'lemon' ]
```

Similarly, we will use a spread operation to achieve immutability, but with a slight modification:

```
const fruits =  ['orange', 'apple', 'lemon' ];  
const newFruits =  ['banana', ...fruits ];   
// =  ['banana', 'orange', 'apple', 'lemon' ]
```

Pop
===

Pop is an operation that removes the last item from the end of the array and returns it.

```
const fruits =  ['orange', 'apple', 'lemon', 'banana' ];  
const lastFruit = fruits.pop();   
// = 'banana', fruits =  ['orange', 'apple', 'lemon' ]
```

To remove the item in an immutable way we will use `slice`. Note that we are making a copy of the last item before this operation. If the copy is not needed we can skip the second line, of course.

```
const fruits =  ['orange', 'apple', 'lemon', 'banana' ];  
const newFruits = fruits.slice(0, fruits.length - 1);   
// =  ['orange', 'apple', 'lemon' ]
```

Shift
=====

The shift is an operation similar to [pop](https://ultimatecourses.com/blog/all-about-immutable-arrays-and-objects-in-javascript#pop), but instead of removing the item from the end we remove the item from the beginning of the array.

```
const fruits =  ['orange', 'apple', 'lemon', 'banana' ];  
const firstFruit = fruits.shift();   
// fruits =  ['apple', 'lemon', 'banana' ]
```

Our immutable solution is equivalent to the immutable `pop`. We don’t have to specify the end limit of `slice` operation if we want to take all items until the end.

```
const fruits =  ['orange', 'apple', 'lemon', 'banana' ];  
const newFruits = fruits.slice(1);   
// =  ['apple', 'lemon', 'banana' ]
```

Removal and inserting of items
==============================

To add or remove an item from an array, we usually use `splice`.

```
const fruits =  ['orange', 'apple', 'lemon', 'banana' ];  
// remove two items from position 1, and replace it with   
// 'strawberry'  
fruits.splice(1, 2, 'strawberry');  
// =  ['orange', 'strawberry', 'banana' ]
```

Combined `slice` and `spread` gives us the same result, but in an immutable fashion:

```
const fruits =  ['orange', 'apple', 'lemon', 'banana' ];  
const newFruits =  [...fruits.slice(0, 1), 'strawberry', ...fruits.slice(3) ];   
// =  ['orange', 'strawberry', 'banana' ]
```

Sort and reverse
================

`Sort` and `reverse` are operators that, respectively, sort and invert the array’s items order.

```
const fruits =  ['orange', 'apple', 'lemon', 'banana' ];  
fruits.sort(); // =  ['apple', 'banana', 'lemon', 'orange' ];  
fruits.reverse(); // =  ['orange', 'lemon', 'banana', 'apple' ];
```

Both, `sort` and `reverse`, are mutable in nature. However, using spread, we can make a copy of the array so the mutation happens on the copy, instead of the original array.

```
const fruits =  ['orange', 'apple', 'lemon', 'banana' ];  
const sorted =  [...fruits ].sort();   
// =  ['apple', 'banana', 'lemon', 'orange' ];  
const inverted =  [...fruits ].reverse();   
// =  ['banana', 'lemon', 'apple', 'orange' ];  
const sortedAndInverted =  [...sorted ].reverse();   
// =  ['orange', 'lemon', 'banana', 'apple' ];
```

Thanks to the immutability, we can now separate sorting from inversion. As a result, we have all four variants (including the original array) available.

You can use the immutable js library to manage set and List of data with immutable behavior.