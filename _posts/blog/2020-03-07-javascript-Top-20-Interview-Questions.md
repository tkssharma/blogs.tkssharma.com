---
date: 2020-03-07
title: 'javascript Top 20 Interview Questions part-1'
template: post
thumbnail: '../thumbnails/js.png'
slug: javascript-top-20-interview-questions-part-1
categories:
  - Popular
  - Javascript
tags:
  - Javascript
---



## Write your own debounce method for some event 

```javascript
function debouce(fn, time){
   let timeoutId;

    return function() {
      // Check for existing calls
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        // Invoke fn
        fn.apply(this, arguments);
        // Clear timeout
        timeoutId = null;

      }, time);
    }
}
```

##  Remove Duplicate String (basic)

```javascript
function removeDuplicates(str) {
    const arr = str.split(' ');
    return [...new Set(arr)].join(' ');
}

```

## flatten Array in JS without using flat(n)

```javascript
function flatten(arr) {
	return arr.reduce(function(prev, curr) {
		if (Array.isArray(curr)) {
			prev = prev.concat(flatten(curr));
		} else {
            prev.push(curr);
		}
		return prev;
	}, []);
}

```

### Reverse a given String 

```javascript
function reverse(str) {
    return str.split('').reverse().join('');
}
// Readable reverse
function reverse(str) {
    return str.split(' ').reverse().join(' ');
}

```
### convert timeout function into a promise Implementation

```javascript 
const sleep = time => new Promise((resolve) => {
    setTimeout(()=>{
        resolve();
    }, time);
});

```

## Write your own bind method (using apply to wrap bind method)

```javascript 
function bind(fn, context){
  return () => {
    fn.apply(content, agruments);
  }
}
// exiasitng es5 function
Function.prototype.bind = function(context) {
    const _this = this;
    return function() {
        _this.apply(context);
    }
}
```
## explain call apply and Bind
Up until now we have treated functions as objects that are composed of a name (optional, can also be an anonymous function) and the code it executes when it is invoked. But that isn’t the entire truth. As a truth loving person, I must let you know that a function actually looks closer to the following image:

bind()
------

The official docs say: The bind() method creates a new function that, when called, has its this keyword set to the provided value. (It actually talks about even more stuff, but we’ll leave that for another time :) )
This is extremely powerful. It let’s us explicitly define the value of this when calling a function

```javascript
var pokemon = {
    firstname: 'Pika',
    lastname: 'Chu ',
    getPokeName: function() {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
};
var pokemonName = function() {
    console.log(this.getPokeName() + 'I choose you!');
};
var logPokemon = pokemonName.bind(pokemon);
logPokemon(); // 'Pika Chu I choose you!'
```

Let’s break it down. When we use the bind() method:
the JS engine is creating a new pokemonName instance and binding pokemon as its this variable. It is important to understand that it copies the pokemonName function.

After creating a copy of the pokemonName function it is able to call logPokemon(), although it wasn’t on the pokemon object initially. It will now recognizes its properties (Pika and Chu) and its methods.
And the cool thing is, after we bind() a value we can use the function just like it was any other normal function. We could even update the function to accept parameters, and pass them like so:
```javascript
var pokemon = {
    firstname: 'Pika',
    lastname: 'Chu ',
    getPokeName: function() {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
};

var pokemonName = function(snack, hobby) {
    console.log(this.getPokeName() + 'I choose you!');
    console.log(this.getPokeName() + ' loves ' + snack + ' and ' + hobby);
};

var logPokemon = pokemonName.bind(pokemon); // creates new object and binds pokemon. 'this' of pokemon === pokemon now
logPokemon('sushi', 'algorithms');
```

call(), apply(), fn.call(context, args)
---------------------------------------

The official docs for call() say: The call() method calls a function with a given this value and arguments provided individually.

What that means, is that we can call any function, and explicitly specify what this should reference within the calling function. Really similar to the bind() method! This can definitely save us from writing hacky code (even though we are all still hackerzzz).
- The main differences between bind() and call() is that the call() method: Accepts additional parameters as well
- Executes the function it was called upon right away.
The call() method does not make a copy of the function it is being called on.
call() and apply() serve the exact same purpose. The only difference between how they work is that call() expects all parameters to be passed in individually, whereas apply() expects an array of all of our parameters. Example:

```javascript
var pokemon = {
    firstname: 'Pika',
    lastname: 'Chu ',
    getPokeName: function() {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
};
var pokemonName = function(snack, hobby) {
    console.log(this.getPokeName() + ' loves ' + snack + ' and ' + hobby);
};
pokemonName.call(pokemon,'sushi', 'algorithms'); // Pika Chu  loves sushi and algorithms
pokemonName.apply(pokemon,['sushi', 'algorithms']);
```


###  what is the closure with example 

A closure is an inner function that has access to the variables in the outer (enclosing) function’s scope chain. The closure has access to variables in three scopes; specifically: (1) variable in its own scope, (2) variables in the enclosing function’s scope, and (3) global variables.


```javascript
var globalVar = "xyz";

(function outerFunc(outerArg) {
    var outerVar = 'a';
    
    (function innerFunc(innerArg) {
    var innerVar = 'b';
    
    console.log(
        "outerArg = " + outerArg + "\n" +
        "innerArg = " + innerArg + "\n" +
        "outerVar = " + outerVar + "\n" +
        "innerVar = " + innerVar + "\n" +
        "globalVar = " + globalVar);
    
    })(456);
})(123);
```

###  what will be the output of this code

```javascript
for (var i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}
```

The code sample shown will not display the values 0, 1, 2, 3, and 4 as might be expected; rather, it will display 5, 5, 5, 5, and 5.
The reason for this is that each function executed within the loop will be executed after the entire loop has completed and all will therefore reference the last value stored in i, which was 5.

Closures can be used to prevent this problem by creating a unique scope for each iteration, storing each unique value of the variable within its scope, as follows:

```javascript
for (var i = 0; i < 5; i++) {
    (function(x) {
        setTimeout(function() { console.log(x); }, x * 1000 );
    })(i);
}
```

This will produce the presumably desired result of logging 0, 1, 2, 3, and 4 to the console.

In an ES2015 context, you can simply use let instead of var in the original code:

```javascript
for (let i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}
```

###  How can you clone an Object 

```javascript
var obj = {a: 1 ,b: 2}
var objclone = Object.assign({},obj);
```
Now the value of objclone is {a: 1 ,b: 2} but points to a different object than obj.
Note the potential pitfall, though: Object.clone() will just do a shallow copy, not a deep copy. This means that nested objects aren’t copied. They still refer to the same nested objects as the original:

```javascript
let obj = {
    a: 1,
    b: 2,
    c: {
        age: 30
    }
};
```

```javascript
var objclone = Object.assign({},obj);
console.log('objclone: ', objclone);
obj.c.age = 45;
console.log('After Change - obj: ', obj);           // 45 - This also changes
console.log('After Change - objclone: ', objclone); // 45
```


### Javascript Coding Questions Array Intrersection
1. option-1

```javascript

const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};
intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

```
1. option-2

```javascript

const intersection = (a, b) => {
const x1 = [... new Set(a)];
const x2 = [... new Set(b)]
return x1.filter(i => x2.indexOf(i) !== -1)
};
intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

```

1. option-3

```javascript

const intersection = (a, b) => {
  let x = {}
  let out = [];
  for(var i=0;i < a.length ; i++) {
     x[a[i]] = 1;
  }
   for(var j=0;i < b.length ; j++) {
     if(x[b[j]] && x[b[j]] === 1){
        out.push(b[j])
     }
  }
  return out;
};
intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

```

1. option-4

```javascript
Array.prototype.findDiff = function(b){
      return this.filter(x => b.includes(x)); 
}
[1, 2, 3].findDiff([2, 3])
```

### How to check if JavaScript Object is empty

With JavaScript, it can be difficult to check whether an object is empty. With Arrays, you can easily check with myArray.length, but on the other hand, objects do not work that way.

The best way to check if an object is empty is by using a utility function like the one below.

```javacript
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
```
So if you have an empty object, you can check whether it is empty by using the above function.

```javacript
var myObj = {}; // Empty Object
if(isEmpty(myObj)) {
    // Object is empty (Would return true in this example)
} else {
    // Object is NOT empty
}
```
Alternatively, you can write the isEmpty function on the Object prototype.

```javacript
Object.prototype.isEmpty = function() {
    for(var key in this) {
        if(this.hasOwnProperty(key))
            return false;
    }
    return true;
}
Then you can easily check if the object is empty like so.

var myObj = {
    myKey: "Some Value"
}

if(myObj.isEmpty()) {
    // Object is empty
} else {
    // Object is NOT empty (would return false in this example)
}
```
Extending the object prototype is not the best thing to do as it can cause some browser issues and other issues with certain frameworks (it's also not always reliable in certain environments). The example I gave is pretty much framework agnostic although.

## For..of, for ..in and forEach

for...in is used to iterate over all enumerable properties of an object, including inherited enumerable properties. This iteration statement can be used with arrays strings or plain objects, but not with Map or Set objects.
```javascript
for (let prop in ['a', 'b', 'c']) 
  console.log(prop);            // 0, 1, 2 (array indexes)

for (let prop in 'str') 
  console.log(prop);            // 0, 1, 2 (string indexes)

for (let prop in {a: 1, b: 2, c: 3}) 
  console.log(prop);            // a, b, c (object property names)

for (let prop in new Set(['a', 'b', 'a', 'd'])) 
  console.log(prop);            // undefined (no enumerable properties)
  ```
for...of is used to iterate over iterable objects, iterating over their values instead of their properties. This iteration statement can be used with arrays, strings, Map or Set objects, but not with plain objects.
```javascript
for (let val of ['a', 'b', 'c']) 
  console.log(val);            // a, b, c (array values)

for (let val of 'str') 
  console.log(val);            // s, t, r (string characters)

for (let val of {a: 1, b: 2, c: 3}) 
  console.log(prop);           // TypeError (not iterable)

for (let val of new Set(['a', 'b', 'a', 'd'])) 
  console.log(val);            // a, b, d (Set values)
  ```
Finally, forEach() is a method of the Array prototype, which allows you to iterate over the elements of an array. While forEach() only iterates over arrays, it can access both the value and the index of each element while iterating.
```javascript
['a', 'b', 'c'].forEach(
  val => console.log(val)     // a, b, c (array values)
);

['a', 'b', 'c'].forEach(
  (val, i) => console.log(i)  // 0, 1, 2 (array indexes)
);
```


### write sleep method delay the execution for n-ms

```javascript
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


async function sleepyWork() {
  console.log("I'm going to sleep for 1 second.");
  await sleep(1000);
  console.log('I woke up after 1 second.');
}
```

### Converts an asynchronous function to return a promise.

In Node 8+, you can use util.promisify

Use currying to return a function returning a Promise that calls the original function. Use the ...rest operator to pass in all the parameters.

```javascript 
const promisify = (fn) =>  {
  return (...args) => {
    return fn(...args,  (err, results) => {
      return new Promise((resolve, reject) => (err ? reject(err) : resolve(result));
      })
    })
  }
}

```

```javascript
function demo(data, cb){
  db(data);
}

demo(data, function(data1){
    console.log(data1)
})
promisify(demo(data, cb)).then((data)=> {})

const delay = promisify((d, cb) => setTimeout(cb, d));
delay(2000).then(() => console.log('Hi!')); // // Promise resolves after 2s
```

### run Promises in Series 

Use Array.prototype.reduce() to create a promise chain, where each promise returns the next promise when resolved.

let's use reduce method for doing this

```javascript
let array = [1,2,3,4,5,6];

array.reduce((a, b) => {
      return  a + b;   
}, 0)

array.reduce((accum, next) => {
      return accum.then(next); 
}, Promise.resolve())

// resolve first Promise and return another promise 
const runPromisesInSeries = (promises) => promises.reduce((accum) => accum.then(next), Promise.resolve());
runPromisesInSeries([ () => Promise.resolve('2'), () => Promise.resolve('3')])
```


