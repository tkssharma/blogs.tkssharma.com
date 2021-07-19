---
date: 2020-02-26
title: 'Immutable JS with Redux state Manager'
template: post
thumbnail: '../thumbnails/react.png'
slug: immutable-js-with-redux-state-manager
categories:
  - Popular
  - ReactJS
tags:
  - ReactJS
---

## [Redux and Immutability](https://scotch.io/tutorials/using-immutablejs-in-react-redux-applications#toc-redux-and-immutability)

In the React ecosystem, [Redux](http://redux.js.org/), a state management paradigm, is fast becoming the preferred implementation of Facebook’s [Flux](https://facebook.github.io/flux/) architecture.

One of Redux’s core [tenets](http://redux.js.org/docs/introduction/ThreePrinciples.html) is maintaining state immutability to ensure state determinism, this is core principle of redux to manage state and don’t change current state always create new state object

You probably have one question now though.

## What is immutability?
> *An immutable object is one whose state cannot be modified once created. Enforcing immutability means ensuring that once objects are created, they cannot be modified.if you change it will create new object without modifying existing one.*

What is ImmutableJS?

[Immutable.js](https://facebook.github.io/immutable-js/) is a library that provides us with several immutable data structures, making it easier to implement immutability within our applications.

Any changes to data created using these data structures returns a new object that is the result of the changes.
> *Immutable.js presents an API which does not update the data in-place, but instead always yields new updated data.*

Other than the benefit of not having to worry about accidentally mutating the state of our application directly, Immutable.js data structures are highly performant because of the library’s implementation of [structural sharing](https://medium.com/@dtinth/immutable-js-persistent-data-structures-and-structural-sharing-6d163fbd73d2) through hash maps and vector tries.

If you’d like to read about how it does this, I’ve posted a few handy references in the reference section of this article.

Before we dig deep into using Immutable.js with Redux, let’s look at immutability in general in JavaScript.

Immutable data structure in Javascript

First of all, why is *immutability* important? Well, mutating data can produce code that’s hard to read and error prone. For primitive values (like numbers and strings), it is pretty easy to write ‘immutable’ code, because primitive values cannot be mutated themselves. Variables containing primitive types always point to the actual value. If you pass it to another variable, the other variable get’s a fresh copy of that value.

Objects (and arrays) are a different story, they are passed by *reference*. This means that if you would pass an object to another variable, they will both refer to the same object. If you would then mutate the object from either variable, they will both reflect the changes. Example:

![](https://cdn-images-1.medium.com/max/3088/1*pZA_hfZ26cCqQ7a_uJeOPA.png)

Can you see the problem here? When we change newObj, we also automatically change the old objvariable. This is because they refer to the same object. In most cases this is unwanted behaviour and *bad* practice. Let’s see how we can solve this.

## Going immutable

Instead of passing the object and mutating it, we will be better off creating a completely new object:

![](https://cdn-images-1.medium.com/max/3108/1*4UKc8wQwExfqXIrhyzLvcQ.png)

Object.assign is an ES6 feature that takes objects as parameters. It will *merge* all objects you pass it into the *first* one. You are probably wondering why the first parameter is an empty object {}. If the first parameter would be ‘person’ we would still mutate person. If it would be { age: 30 }, we’d overwrite *30*with *28* again because that would be coming after. This solution works, we kept person intact, we treated it as *immutable*!

However, EcmaScript actually has a *special syntax* that enables us to do this even more easily. It’s called *object spread* and it is currently in *Stage 2* (draft). But now worries, it’s already available using the [Babel](https://babeljs.io/docs/plugins/preset-stage-2/)transpiler. It looks as follows:

![](https://cdn-images-1.medium.com/max/3048/1*YUUJfzA5ATycEuJxKsaOZA.png)

Again, same result. This time, even cleaner code. First, the ‘spread’ operator (...), copies all the properties from person to the new object. Then we define a new ‘age’ property that overrides the old one. Note that order matters, if age: 30 would be defined above ...person, it would be overridden by age: 28.

How about removing an item? No we won’t use delete, this would again, mutate the object. This actually is a bit harder, you can do it as follows:

![](https://cdn-images-1.medium.com/max/3448/1*x4x0dA8eHcwYZ4lpI-_a5g.png)

As you can see we pretty much have to code the whole operation ourselves. You could put this functionality in a central place as a generic utility. But how does mutation and immutability work for arrays?

## Arrays

Let’s do a little example of how you could add an item to an array in a mutating way:

The same problem as with objects. We’re desperately failing in creating a new array, we just mutated the old one. Gladly ES6 contains a *spread operator* for array’s! This feature is even already in the final version of ES6. Here’s how to use it:

![](https://cdn-images-1.medium.com/max/3720/1*zy_UehhTzM_AIuk2mbLXFg.png)

Nice, that was easy! We created a *new* array containing the old characters *plus* ‘Luke’, leaving the old array intact.

Let’s see how to do some other operations on arrays, without mutating the original one:

![](https://cdn-images-1.medium.com/max/3488/1*nWAz5XPU6deg725s-dunwg.png)

See how nice these ‘functional’ operators are? The ES6 *arrow function* syntax makes them even more neat. They return a new array every time you run them, one exception is the *ancient* sort method:

Yeah, I know. In my opinion *push* and *sort* should have the same behaviour as *map, filter* and *concat*, return new arrays. But they don’t and changing that now would probably break the internet. If you need to use sort, you can use *slice* to fix this:

### So we have object.assign … operator , Map, Slice , Filter which can help us to get immutable objects

## Redux with Reducers

An example of reducer where we are returning state object based on action coming from redux action. Here we are using …Operator, Filter, map, Object assign to return immutable state object.

    const reviews = (state=[], action) => {
      switch (action.type) {
        case 'ADD_REVIEW':
          return [
            ...state, {
              id: action.id,
              reviewer: action.reviewer,
              text: action.text,
              rating: action.rating,
              flag: false
            }
          ]
        case 'DELETE_REVIEW':
          return state.filter(review => review.id !== action.id);
        case 'FLAG_REVIEW':
          return state.map(review => review.id === action.id ? Object.assign({}, review, { flag: action.flag}): review)
        case 'RATE_REVIEW':
          return state.map(review => review.id === action.id ? {...review, rating: action.rating }: review)
        default:
          return state;
      }
    }

Now same picture will change with the help of Immutable JS we can use data structures provided by immutable js to achieve this without using map, filter, object assign.

## Immutable.js provides many Persistent Immutable data structures including: List, Stack, Map, OrderedMap, Set, OrderedSet and Record.

These data structures are highly efficient on modern JavaScript VMs by using structural sharing via [hash maps tries](http://en.wikipedia.org/wiki/Hash_array_mapped_trie) and [vector tries](http://hypirion.com/musings/understanding-persistent-vector-pt-1) as popularized by Clojure and Scala, minimizing the need to copy or cache data.

Immutable.js also provides a lazy [Seq](https://facebook.github.io/immutable-js/docs/#/Seq), allowing efficient chaining of collection methods like map and filter without creating intermediate representations. Create some [Seq](https://facebook.github.io/immutable-js/docs/#/Seq) with [Range](https://facebook.github.io/immutable-js/docs/#/Range) and [Repeat](https://facebook.github.io/immutable-js/docs/#/Repeat).

Want to hear more? Watch the presentation about Immutable.js:

## Getting started

Install [immutable](https://facebook.github.io/immutable-js/docs/#/) using npm.

npm install immutable

Then require it into any module.

![](https://cdn-images-1.medium.com/max/2248/1*Bz6TDBRmUW6YbjRcEnQNNQ.png)

### Using TypeScript with Immutable.js v4

Immutable.js type definitions embrace ES2015. While Immutable.js itself supports legacy browsers and environments, its type definitions require TypeScript’s 2015 lib. Include either "target":"es2015" or "lib": "es2015" in your tsconfig.json, or provide --target es2015 or --lib es2015 to the tsc command.

The difference for the immutable collections is that methods which would mutate the collection, like push, set, unshift or splice, instead return a new immutable collection. Methods which return new arrays, like slice or concat, instead return new immutable collections.

    const {List} = require('immutable')

    const list1 = List([1, 2]);

    const list2 = list1.push(3, 4, 5);

    const list3 = list2.unshift(0);

    const list4 = list1.concat(list2, list3);

    assert.equal(list1.size, 2);

    assert.equal(list2.size, 5);

Almost all of the methods on [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) will be found in similar form on [Immutable.List](https://facebook.github.io/immutable-js/docs/#/List), those of [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) found on [Immutable.Map](https://facebook.github.io/immutable-js/docs/#/Map), and those of [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) found on [Immutable.Set](https://facebook.github.io/immutable-js/docs/#/Set), including collection operations like forEach() and map().

Accepts raw JavaScript objects.

Designed to inter-operate with your existing JavaScript, Immutable.js accepts plain JavaScript Arrays and Objects anywhere a method expects an [Collection](https://facebook.github.io/immutable-js/docs/#/Collection).

    const {Map} = require('immutable')

    const map1 = Map({a: 1, b: 2, c: 3, d: 4})

    const map2 = Map({c: 10, a: 20, t: 30})

    const obj = {

    d: 100,

    o: 200,

    g: 300

    }

    const map3 = map1.merge(map2, obj);

    *// Map { a: 20, b: 2, c: 10, d: 100, t: 30, o: 200, g: 300 }*

## How reducers will change with Redux

    import { List, Map } from 'Immutable';
    import types from '../../actionTypes';

    const reviews = (state=List(), action) => {
      switch (action.type) {
        case types.reviews.ADD_REVIEW:
          const newReview = Map(
            { id: action.id,
              item_id: action.item_id,
              reviewer: action.reviewer,
              text: action.text,
              rating: action.rating,
              flag: false
            }
          )
          return state.push(newReview);  // Note that Immutable's push will return a new array
        case types.reviews.DELETE_REVIEW:
          return state.filter(review => review.id !== action.id);
        case types.reviews.FLAG_REVIEW:
          return state.map(review => review.id === action.id ? Object.assign({}, review, { flag: action.flag}): review)
        case types.reviews.RATE_REVIEW:
          return state.map(review => review.id === action.id ? {...review, rating: action.rating }: review)
        default:
          return state;
      }
    }
