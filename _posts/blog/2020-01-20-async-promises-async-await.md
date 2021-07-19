---
date: 2020-01-20
title: 'Async Waterfall, Promises and Async Await conversion'
template: post
thumbnail: '../thumbnails/node.png'
slug: writing-javascript-using-promises-and-async-await
categories:
  - Popular
tags:
  - NodeJS
  - Javascript
---

Async functions enable us to write promise based code as if it were synchronous, but without blocking the execution thread. ... Using async simply implies that a promise will be returned, and if a promise is not returned, JavaScript automatically wraps it in a resolved promise with its value

```javascript
async function myFirstAsyncFunction() {
  try {
    const fulfilledValue = await promise;
  }
  catch (rejectedValue) {
  }
}
```

If you use the async keyword before a function definition, you can then use await within the function. When you await a promise, the function is paused in a non-blocking way until the promise settles. If the promise fulfills, you get the value back. If the promise rejects, the rejected value is thrown.

# Lets quickly check on Promises 

promises were introduced which are more managed way to execute any asynchronous code.
How they solved the problem of callback hell for asynchronous code execution was by providing a chain-able API to execute callbacks.
Following is the example of a promise enabled async function fetch to get some data from some remote URL. The final response is provided to the callbacks via .then function on fetch promise.

Following is the example to create a promise around async code from setTimeout:
```javascript
const afterSomeTime = (time) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
  return promise;
}
const executeAfterSomeTime = (callback, time) => afterSomeTime(time).then(callback);
executeAfterSomeTime(() => console.log('Hello after 1500ms'), 1500);
```
## Promise Nested/Chains
Promise chains are not new but are worth mentioning because of "how promises behave".
The way promises behave is that when you create a promise, promise's prototype provides who methods named then, catch and finally. These methods of promise will handle the resolve, reject or settlement cases of promise.

But the interesting thing is that these methods return the promise again with the any return value as a response/resolve. Which means that the success handler of then function can return promise as well.So based on the promise result, you can create another promise and return it in the success handler.

Let’s take a look at an example: nested promises

```javascript
document
  .querySelector('#submit')
  .addEventListener('click', function() { 
    // read data from DOM
    const name = document.querySelector('#name').value;

    // send to backend
    fetch(`/users?name=${name}`)
      .then(user => {
        fetch(`/posts?userId=${user.id}`)
          .then(posts => {
            fetch(`/comments?post=${posts[0].id}`)
              .then(comments => {
                //display comments on DOM
              });
          });
      });
  });
```  
The above chain can be simply written as below and it look nice and clean

```javascript
document
  .querySelector('#submit')
  .addEventListener('click', function() { 
    // read data from DOM
    const name = document.querySelector('#name').value;

    // send to backend
    fetch(`/users?name=${name}`)
      .then(user => fetch(`/posts?userId=${user.id}`)))
      .then(posts => fetch(`/comments?post=${posts[0].id}`)))
      .then(comments => {
        //display comments on DOM
      });
  });
```  
Async/Await
Async/Await is a new way to write cleaner and more understandable code.
So taking example for code written above, let's rewrite with async/await.
First thing to remember here is that async is used to create asynchronous function and await is used while calling that function.

Lets see the example from promise chains:
```javascript
const getData = async (url) => fetch(url);
document
  .querySelector('#submit')
  .addEventListener('click', function() { 
      // read data from DOM
      const name = document.querySelector('#name').value;
      // send to backend
      const user = await fetch(`/users?name=${name}`);
      const posts = await fetch(`/posts?userId=${user.id}`);
      const comments = await fetch(`/comments?post=${posts[0].id}`);
      //display comments on DOM
  });
```  

### Little more about async and Promises
```javascript
function logFetch(url) {
  return fetch(url)
    .then(response => response.text())
    .then(text => {
      console.log(text);
    }).catch(err => {
      console.error('fetch failed', err);
    });
}
```
And here's the same thing using async functions:

```javascript
async function logFetch(url) {
  try {
    const response = await fetch(url);
    console.log(await response.text());
  }
  catch (err) {
    console.log('fetch failed', err);
  }
}
```

It's the same number of lines, but all the callbacks are gone. This makes it way easier to read, especially for those less familiar with promises. Note: Anything you await is passed through Promise.resolve(), so you can safely await non-native promises.
Async return values, Async functions always return a promise, whether you use await or not. That promise resolves with whatever the async function returns, or rejects with whatever the async function throws. So with:

```javascript
// wait ms milliseconds
function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}
async function hello() {
  await wait(500);
  return 'world';
}
```
calling hello() returns a promise that fulfills with "world".
```javascript
async function foo() {
  await wait(500);
  throw Error('bar');
}
```
…calling foo() returns a promise that rejects with Error('bar').
Example: Streaming a response
The benefit of async functions increases in more complex examples. Say we wanted to stream a response while logging out the chunks, and return the final size.

Note: The phrase "logging out the chunks" made me sick in my mouth.
Here it is with promises:
```javascript
function getResponseSize(url) {
  return fetch(url).then(response => {
    const reader = response.body.getReader();
    let total = 0;
    return reader.read().then(function processResult(result) {
      if (result.done) return total;
      const value = result.value;
      total += value.length;
      console.log('Received chunk', value);
      return reader.read().then(processResult);
    })
  });
}
```
Check me out, Jake "wielder of promises" Archibald. See how I'm calling processResult inside itself to set up an asynchronous loop? Writing that made me feel very smart. But like most "smart" code, you have to stare at it for ages to figure out what it's doing, like one of those magic-eye pictures from the 90's.

Let's try that again with async functions:
```javascript
async function getResponseSize(url) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  let result = await reader.read();
  let total = 0;

  while (!result.done) {
    const value = result.value;
    total += value.length;
    console.log('Received chunk', value);
    // get the next result
    result = await reader.read();
  }
  return total;
}
```
All the "smart" is gone. The asynchronous loop that made me feel so smug is replaced with a trusty, boring, while-loop. Much better. In future, we'll get async iterators, which would replace the while loop with a for-of loop, making it even neater.

Note: I'm sort-of in love with streams. If you're unfamiliar with streaming, check out my guide.
Other async function syntax
We've seen async function() {} already, but the async keyword can be used with other function syntax:
```javascript
Arrow functions
// map some URLs to json-promises
const jsonPromises = urls.map(async url => {
  const response = await fetch(url);
  return response.json();
});
```

Note: array.map(func) doesn't care that I gave it an async function, it just sees it as a function that returns a promise. It won't wait for the first function to complete before calling the second.
Object methods
```javascript
const storage = {
  async getAvatar(name) {
    const cache = await caches.open('avatars');
    return cache.match(`/avatars/${name}.jpg`);
  }
};
```
storage.getAvatar('jaffathecake').then(…);
```javascript
Class methods
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}
```

Note: Class constructors and getters/setters cannot be async.
### Careful! Avoid going too sequential
Although you're writing code that looks synchronous, ensure you don't miss the opportunity to do things in parallel.
```javascript
async function series() {
  await wait(500); // Wait 500ms…
  await wait(500); // …then wait another 500ms.
  return "done!";
}
```

The above takes 1000ms to complete, whereas:

```javascript
async function parallel() {
  const wait1 = wait(500); // Start a 500ms timer asynchronously…
  const wait2 = wait(500); // …meaning this timer happens in parallel.
  await wait1; // Wait 500ms for the first timer…
  await wait2; // …by which time this timer has already finished.
  return "done!";
}
```

The above takes 500ms to complete, because both waits happen at the same time. Let's look at a practical example…
Example: Outputting fetches in order
Say we wanted to fetch a series URLs and log them as soon as possible, in the correct order.
```javascript
function logInOrder(urls) {
  // fetch all the URLs
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // log them in order
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
```

Yeah, that's right, I'm using reduce to chain a sequence of promises. I'm so smart. But this is a bit of so smart coding we're better off without.

However, when converting the above to an async function, it's tempting to go too sequential:

Not recommended - too sequential
```javaScript
async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
```

Looks much neater, but my second fetch doesn't begin until my first fetch has been fully read, and so on. This is much slower than the promises example that performs the fetches in parallel. Thankfully there's an ideal middle-ground:

### Recommended - nice and parallel

```javascript
async function logInOrder(urls) {
  // fetch all the URLs in parallel
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // log them in sequence
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```
# Examples 
It is shorthand for chaining promises, equivalent to calling a chain of then functions and returning a promise in each of the callbacks in the then function.
For example, this:
```javascript
const asyncFunction = async () => {
  const promise1Result = await promsise1;
  console.log(promise1Result);
  const promise2Result = await promsise2;
  console.log(promise2Result);
}
```
Is the same as this:
```javascript
const asyncFunction = () => {
  promise1
  .then((promise1Result) => {
    console.log(promise1Result);
    return promise2
  })
  .then((promise2Result) => {
    console.log(promise2Result);
  })
}
```

# Async Flows: Parallel, Serial, Waterfall

Async utility has a number of control flows. Let’s discuss the most popular ones and their use cases:
### Parallel
When we have to run multiple tasks independent of each other without waiting until the previous task has completed, parallel comes into the picture.

```javascript
async.parallel(tasks, callback)
```

```javascript
async.parallel([
  function(callback) {
    setTimeout(function() {
      console.log('Task One');
      callback(null, 1);
    }, 200);
  },
  function(callback) {
    setTimeout(function() {
      console.log('Task Two');
      callback(null, 2);
    }, 100);
  }
],
function(err, results) {
  console.log(results);
  // the results array will equal [1, 2] even though
  // the second function had a shorter timeout.
});
```
### Series execution 
When we have to run multiple tasks which depend on the output of the previous task, series comes to our rescue.
```javascript
async.series(tasks, callback)
```
```javascript
async.series([
  function(callback) {
    console.log('one');
    callback(null, 1);
  },
  function(callback) {
    console.log('two');
    callback(null, 2);
  },
  function(callback) {
    console.log('three');
    callback(null, 3);
  }
],
function(err, results) {
  console.log(result);
  // results is now equal to [1, 2, 3]
});
```
### Waterfall
When we have to run multiple tasks which depend on the output of the previous task, Waterfall can be helpful.

```javascript
async.waterfall(tasks, callback)
```

```javascript
async.waterfall([
  function(callback) {
    callback(null, 'Task 1', 'Task 2');
  },
  function(arg1, arg2, callback) {
    // arg1 now equals 'Task 1' and arg2 now equals 'Task 2'
    let arg3 = arg1 + ' and ' + arg2;
    callback(null, arg3);
  },
  function(arg1, callback) {
    // arg1 now equals 'Task1 and Task2'
    arg1 += ' completed';
    callback(null, arg1);
  }
], function(err, result) {
  // result now equals to 'Task1 and Task2 completed'
  console.log(result);
});
```
 Mostly can decide in what way we want to add async functionality in our application using promises, callbacks or async/await
Like in below example order of execution define the execution plan of these promises 
 ```javascript
 function resolveAfter2Seconds() {
  console.log("starting slow promise")
  return new Promise(resolve => {
    setTimeout(function() {
      resolve("slow")
      console.log("slow promise is done")
    }, 2000)
  })
}

function resolveAfter1Second() {
  console.log("starting fast promise")
  return new Promise(resolve => {
    setTimeout(function() {
      resolve("fast")
      console.log("fast promise is done")
    }, 1000)
  })
}

async function sequentialStart() {
  console.log('==SEQUENTIAL START==')

  // 1. Execution gets here almost instantly
  const slow = await resolveAfter2Seconds()
  console.log(slow) // 2. this runs 2 seconds after 1.

  const fast = await resolveAfter1Second()
  console.log(fast) // 3. this runs 3 seconds after 1.
}

async function concurrentStart() {
  console.log('==CONCURRENT START with await==');
  const slow = resolveAfter2Seconds() // starts timer immediately
  const fast = resolveAfter1Second() // starts timer immediately

  // 1. Execution gets here almost instantly
  console.log(await slow) // 2. this runs 2 seconds after 1.
  console.log(await fast) // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
}
``` 