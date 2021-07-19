---
date: 2020-02-22
title: 'Immutability in Javascript'
template: post
thumbnail: '../thumbnails/js.png'
slug: Immutability-in-javascript
categories:
  - Popular
  - Javascript
tags:
  - Javascript
---


## What is Immutability?

You cannot change an Immutable data, you just need to make a copy of that, then update the new one.

Immutability is that simply what is all about.

Functional Programming typically avoids using mutable state.

So why is this so important?

## What I’m going to say

In the motivation section I’ve mentioned some reasons to answer this question, next with an example I explain how to not mutate the data in JavaScript (it’s so simple), and at last I’ve demonstrated Immutability in some other languages like Java, C# and JavaScript libraries like React.js and React Native with some good-to-know facts.

## Motivation

Why using Immutability is important in functional programming?

Here are the key advantages immutability gives you:

### Time Travel Debugging

TTD is the process of stepping back in time through code and Immutability enhance it to have states to reason about in that process,

### Performance Boost

if you have an object and change one of Its properties It takes a long time for like javascript to recognize that property has been changed, It needs to check all of the object properties, by Immutability It already knows what updates are applied by a way more cheaper comparison between versions of states,
> Isolating Failure
> You’ve got a thread running in a critical section that access to shared state, what happens if something goes wrong? You need to terminate all the treads that access shared memory because you don’t know what state the process that terminated left in the shared memory, so basically you lose everything in there. In the immutable state if you lose some process you just lose the state of that particular process, all other processes are not affected by.
> Locality Problem with mutability
> where do you locate your mutable state, you’ve got a process running in Nottingham and a process running in London and they need to share memory where do you share the memory? Assuming you have your shared memory in Leicester what happens if the networks go down but with immutability, each one has their own copy, and when the network does back up you just need to synchronize data again.
> [Francesco Cesarini, Technical Director of Erlang Solutions](https://www.youtube.com/watch?v=8Sf6ToPNiA4)

## Walk-through

### What is Immutability and How to use It?

In JavaScript, some built-in types (numbers, strings) are immutable, but custom objects are generally mutable.

consider this:

    let immutableString = "I'm an Immutable value";

Does It mean a new value cannot be assigned to an Immutable object?

It depends but in this example as is a string absolutely It can be assigned to a new value but a new memory reference would be allocated to that.

    let immutableString = "I'm an Immutable value";
    console.log(immutableString); // I'm an Immutable value
    let newImmutableString = immutableString.replace("an Immutable", "a Mutable");
    console.log(immutableString); // I'm an Immutable value

as you can see the immutableString is not changed because as the name says is Immutable. (I’ve been usedlet here to demonstrate that if I usedconstIt won’t prevent it to be mutable so use const instead)

If the string in JavaScript was mutable It had a different behavior, I’ve used [mutable-string](https://github.com/christophehurpeau/mutable-string) library that gives you mutable string, here’s the demonstration:

    const MutableString = require('mutable-string');
    let mutableString = new MutableString("I'm an Immutable value");
    console.log(mutableString.toString());  // I'm an Immutable value
    let newMutableString = mutableString.replace('an Immutable', new MutableString("a Mutable"));
    console.log(mutableString.toString());  // I'm a Mutable value

In opposite to string in JavaScript, the mutableString is changed in place.

But for objects and arrays in JavaScript making changes on objects/arrays would pass them by reference instead of copying over:

    let mutableArray = [1, 2, 3, 4, 5];
    console.log(mutableArray); // [ 1, 2, 3, 4, 5 ]
    let updateMutableArray = mutableArray.push(6);
    console.log(mutableArray); // [ 1, 2, 3, 4, 5, 6 ]

when we push a new value to the mutableArray, It would be updated in place, not by a new copy.

What if you want it to be Immutable?

you can make it Immutable by using an Immutable array for example List from [immutable.js](https://github.com/immutable-js/immutable-js).

    const {List} = require('immutable');

    let immutableList = List([1, 2, 3, 4, 5]);
    console.log(immutableList.toArray()); // [ 1, 2, 3, 4, 5 ]
    let newImmutableList = immutableList.push(6);
    console.log(immutableList.toArray()); // [ 1, 2, 3, 4, 5 ]

when we push a new value to the immutableList, It would not be changed in place and a new reference to updates would be created for that.

What if you don’t want to use an immutable list or array?

if you don’t want to use an Immutable list you should not use destructive functions in JavaScript and using non-destructive ones for making your work done. we can update our mutableArray example this way:

    let mutableArray = [1, 2, 3, 4, 5];
    console.log(mutableArray); // [ 1, 2, 3, 4, 5 ]
    let updatedMutableArray = [...mutableArray, 6];
    console.log(mutableArray); // [ 1, 2, 3, 4, 5 ]

this way the mutableArray is not changed in place.

but Immutability is not always a good choice, consider this example:

    const a = [1, 2, 3, 4, 5];
    let immutableSum = 0;
    for (let i = 0; i < a.length; i += 1) {
      immutableSum += a[i];
      console.log(immutableSum);
    }

This is the output:

    1
    3
    6
    10
    15

as the loop goes, each cycle creates a new copy of the immutableSum, if this array were contained of 1000 items, 1000 copy was been created. so make sure what behavior you want from them.

## Immutable JS in Javscript


## Immutable.js to the rescue

You can use [Immutable.js](https://github.com/facebook/immutable-js) in your code by installing it as an npm module or loading the source file [immutable.min.js](https://github.com/facebook/immutable-js/blob/master/dist/immutable.min.js).

Let’s explore an immutable map as our first example. A map is basically an object consisting of key-value pairs.

    var person = Immutable.Map({
        name: 'John',
        birth: 594687600000,
        phone: '12345678'
    });

    var changePhone = function( person, newPhone ) {
        return person.set( 'phone', newPhone );
    };

    var person2 = changePhone( person, '87654321' );
    console.log( person2 == person, person2 === person );
    // false false

    console.log( person.get( 'phone' ), person2.get( 'phone' ) );
    // 12345678 87654321

    console.log( person.phone, person2.phone );
    // underfined undefined

First, a person is created with the name, birth and phone attributes. The changePhone function returns a new immutable map. When the changePhone function is executed, person2 is created as a return value, and person2 is strictly different than person. The phone numbers of each person map can be accessed via the get method. The properties of the maps are hidden behind the get/set interface, therefore they cannot be directly accessed or modified.

    var person3 = changePhone( person, '12345678' );
    console.log( person3 == person, person3 === person );
    // true true

    var person4 = changePhone( person, '87654321' );
    var person5 = changePhone( person4, '12345678' );
    console.log( person5 == person, person5 === person );
    // false false

The immutable abstraction is intelligent enough to detect when an attribute is changed to the same value as before. In this case, both == and === comparisons return true, as the return of the o.set method is o. In all other cases, a real change takes place, and a new object reference is returned. This is why person5 is not equal to person even though they have the exact same keys and values. Mind you, in many real-life scenarios, person is supposed to be a thrown-away value after a modification takes place, therefore a comparison between person and person5 is rarely useful.

If we wanted to check the equality of attribute key-value pairs of person and person5, we can use the equals method of the immutable map interface:

    console.log( person5.equals( person ) );
    // true

Immutable data structures are amazing, but we don’t always need them. For instance, we normally send JSON payloads to the server instead of an immutable.js data structure. Therefore, there is a need to convert the immutable.js data structure into a JavaScript object or a JSON string.

    person5.toObject()
    // Object {name: "John", birth: 594687600000, phone: "12345678"}

    person5.toJSON()
    // Object {name: "John", birth: 594687600000, phone: "12345678"}

    JSON.stringify( person5 )
    // '{"name":"John","birth":594687600000,"phone":"12345678"}'

Both the toObject and the toJSON methods return a JavaScript object representation of the immutable map. As a consequence of the return value of toJSON, JSON.stringify can directly be used on immutable data structures to create a JSON string for serialization.

Assuming proper usage of immutable data structures, maintainability of our application is expected to improve. Using immutable data structures indeed results in side-effect free code.

## Immutable.js data structures

Immutable.js has the following data structures:

* List,

* Stack,

* Map,

* OrderedMap,

* Set,

* OrderedSet,

* Record,

* lazy Seq.

Let’s briefly explore all of these data structures.

**List**: a List is an immutable representation of a JavaScript array. The usual array operations are available with the twist that their return value is a new immutable object whenever the content of the original object is changed.

    var qwerty = Immutable.List(['q','w','e','r','t','y']);

    qwerty.size
    // 6

    var qwertyu = qwerty.push( 'u' );
    // Object {size: 7, _origin: 0, _capacity: 7, _level: 5, _root: null…}

    var qwert = qwertyu.pop().pop();
    // Object {size: 5, _origin: 0, _capacity: 5, _level: 5, _root: null…}

    var wertArray = qwert.shift().toJSON();
    // ["w", "e", "r", "t"]

    var qwertyuiArray = qwert.concat( 'y', 'u', 'i' ).toJS();
    // ["q", "w", "e", "r", "t", "y", "u", "i"]

**Stack**: first in, last out data structure, defined with the usual operations. The serialized equivalent of a stack is an array, where the element with index 0 corresponds to the element to be popped. All elements of the stack can be accessed without popping via the get method. However, our only options for modifying the stack are to push and pop.

    var filo = new Immutable.Stack();
    // Object {size: 0, _head: undefined, __ownerID: undefined, __hash: undefined, __altered: false}

    var twoStoreyStack = filo.push( '2nd floor', '1st floor', 'ground floor' );

    twoStoreyStack.size
    // 3

    twoStoreyStack.get()
    // "2nd floor"

    twoStoreyStack.get(1)
    // "1st floor"

    twoStoreyStack.get(2)
    // "ground floor"

    var oneStoreyStack = twoStoreyStack.pop();
    var oneStoreyJSON = JSON.Stringify( oneStoreyStack );
    // '["1st floor","ground floor"]'

**Map**: we have already seen the Map data structure in action. It is the immutable.js representation of a JavaScript object.

**OrderedMap**: an ordered map is a mixture of objects and arrays. It can be treated as an object with the feature that its keys are ordered based on the order in which they were added to the map. Modifying the value belonging to an already added key does not result in a change of the order of keys.

The order of the keys can be re-defined using the sort or sortBy methods, returning a new immutable ordered map.

The dangerous part about using an ordered map is that its serialized form is a simple object. Given that some languages such as PHP also treat their objects as ordered maps, in theory, communicating via order maps could work. In practice, I don’t recommend this form of communication for the sake of clarity.

    var basket = Immutable.OrderedMap()
        .set( 'Captain Immutable 1', 495 )
        .set( 'The Immutable Bat Rises 1', 995 );

    console.log( basket.first(), basket.last() );
    // 495 995

    JSON.stringify( basket );
    // '{"Captain Immutable 1":495,"The Immutable Bat Rises 1":995}'

    var basket2 = basket.set( 'Captain Immutable 1', 695 );
    JSON.stringify( basket2 );
    // '{"Captain Immutable 1":695,"The Immutable Bat Rises 1":995}'

    var basket3 = basket2.sortBy( function( value, key ) {
        return -value;
    } );

    JSON.stringify( basket3 );
    // '{"The Immutable Bat Rises 1":995,"Captain Immutable 1":695}'

**Set**: A Set contains an array of unique elements. All usual operations are available. In theory, the order of elements in the set should not matter.

    var s1 = Immutable.Set( [2, 1] );
    var s2 = Immutable.Set( [2, 3, 3] );
    var s3 = Immutable.Set( [1, 1, 1] );

    console.log( s1.count(), s2.size, s3.count() );
    // 2 2 1

    console.log( s1.toJS(), s2.toArray(), s3.toJSON() );
    // [2, 1] [2, 3] [1]

    var s1S2IntersectArray = s1.intersect( s2 ).toJSON();
    // [2]

**OrderedSet**: An OrderedSet is a Set with elements ordered according to the time of addition. When the order of elements matter, use an ordered set.

    var s1 = Immutable.OrderedSet( [2, 1] );
    var s2 = Immutable.OrderedSet( [2, 3, 3] );
    var s3 = Immutable.OrderedSet( [1, 1, 1] );

    var s1S2S3UnionArray = s1.union( s2, s3 ).toJSON();
    // [2, 1, 3]

    var s3S2S1UnionArray = s3.union( s2, s1 ).toJSON();
    // [1, 2, 3]

**Record**: a record is like a JavaScript class with default values for some keys. When instantiating a record, the values for the keys defined in the record can be given during instantiation. In absence of a value, the default value of the record is used.

    var Canvas = Immutable.Record( { width: 1024, height: 768 } );

    console.log( 'constructor '+ typeof Canvas );
    // constructor function

    var myCanvas = new Canvas();
    myCanvas.toJSON()
    // Object {width: 1024, height: 768}

    myCanvas.width
    // 1024

    var myResizedCanvas = new Canvas( {width: 400, height: 300} );
    myResizedCanvas.width
    // 400

**Seq**: sequences are lazy finite or infinite data structures. Elements of a Seq are only evaluated on demand. Depending on the type of sequence, we can talk about a KeyedSeq, an IndexedSeq or a SetSeq. Finite and infinite sequences can be defined using

* Immutable.Range(),

* Immutable.Repeat(),

* a mutation of a seq using a functional utility such as map, filter.

Finite Seqs can also be defined using enumeration.

    var oneToInfinitySeq = Immutable.Range( 1 );
    var isEven = function( num ) { return num % 2 === 0; }
    var evenPositiveSeq = oneToInfinitySeq.filter( isEven );
    var firstTenPositivesSeq = evenPositiveSeq.take(10);
    firstTenPositivesSeq.toJSON();
    // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

    var firstTenElements = Immutable.Repeat( /* undefined */ )
        .map( Math.random )
        .take( 10 )
        .toJSON();
    // generates an array of ten random numbers

One of the benefits of lazy evaluation is that infinite sequences can be defined. Another one is performance. As a riddle, try to determine the console messages emitted by the following code:

    var toUpper = function( item ) {
        var upperItem = item.toUpperCase();
        console.log( item + 'has been converted to '+ upperItem );
        return upperItem;
    }

    var seasons = Immutable.Seq( ['spring','summer','fall','winter'] )
        .map( toUpper );

    console.log( ‘Item at index 1: ‘, seasons.get( 1 ) );
    console.log( ‘Item at index 0: ‘, seasons.get( 0 ) );
    console.log( ‘Seasons in an array: ‘, seasons.toJS() );

The results may be surprising. Given that evaluation is lazy and we are dealing with a finite data structure, elements of the seasonsSeq can be accessed directly. Therefore, the upper case version of each element is calculated on demand. When the toJS method of seasons is called, all four elements are calculated from scratch. By default, there is no memorization in lazy sequences. Therefore the result is:

    summer has been converted to SUMMER

    Item at index 1: SUMMER

    spring has been converted to SPRING

    Item at index 0: SPRING

    spring has been converted to SPRING

    summer has been converted to SUMMER

    fall has been converted to FALL

    winter has been converted to WINTER

    Seasons in an array: ["SPRING", "SUMMER", "FALL", "WINTER"]

The above observations hold for infinite data structures as well. Elements are only calculated on demand, without memorization.

## Summary

Immutable.js is a nice library providing immutable data structures. It corrects the flaws of underscore.js, namely that operations of different data structures were forced on JavaScript arrays and objects, mixing the concept of data types, and losing immutability. Even though lodash.js attempted to correct some of these flaws, the compatibility with underscore.js still results in a counter-intuitive structure. Although lazy.js came with lazy loading, it was especially known for being a lazy version of underscore.

The name immutable.js very well reflects that we need to deal with immutable data structures as a necessary condition for exercising pure functional programming. The emphasis on using correct data structures results in increased maintainability of your code.
