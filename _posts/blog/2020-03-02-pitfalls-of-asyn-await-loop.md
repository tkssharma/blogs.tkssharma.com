---
date: 2020-03-02
title: 'The Pitfalls of Async/Await in Array Loops'
template: post
thumbnail: '../thumbnails/js.png'
slug: Pitfalls-async-await-in-loop
categories:
  - Popular
  - Javascript
tags:
  - Javascript
---

Using async/await while looping through arrays in Javascript loop seems simple, but there’s some non-intuitive behavior to look out for when combining the two. Let’s take a look at three different examples to see what you should look out for, and which loop is best for specific use cases.

Control flows are dead simple with async/await but my personal favorite practice of async/await is loops, a simple async loop can be represented in multiple ways and of course we will follow this up with parallel execution.

Series loop
--------------

```javascript
async (items) => {
  for (let i = 0; i < items.length; i++) {
    const result = await db.get(items[i]);
    console.log(result);
  }
}
```

Delayed loop
---------------

We can utilize the concept of timeouts within our loop, for example if we wanted to create a method that would add a random number to an array once a second for a total of 10 seconds we could use either setTimeout or setImmediate with a counter or a for loop awaiting the timeoutPromise we implemented earlier:

A loop through a given number of items that performs a number of asynchronous actions, in our example below stop the loop on each step to fetch some data from the database and log the results and then continue to the next item, going one by one, thus creating a series loop:
```javascript
const randForTen = async () => {
  let results = [];
  
  for (let i = 0; i < 10; i++) {
    await timeoutPromise(1000);
    results.push(Math.random());
  }
  
  return results;
}
```

3. Parallel loop
----------------

```javascript
async (items) => {
  let promises = [];
  
  for (let i = 0; i < items.length; i++) {
    promises.push(db.get(items[i]));
  }
  
  const results = await Promise.all(promises);
  console.log(results);
}
```
This can be more elegantly represented with Array#map, and it helps that we get a little more functional with our implementation for real-world use-cases, by mapping the array of items into an array of promises and awaiting the values:

```javascript
async (items) => {
  // Note that async functions return a promise
  const promises = items.map(async (item) => {
    const result = await db.get(item);
    // Log individual results as they finish
    console.log(result);
    return result;
  });
  const results = await Promise.all(promises);
  console.log(results);
}
```
If it runs in parallel, parallelize. Parallel loops can be created by pushing a promise into an array that will later resolve into a value thus all promises start at the exact same time and can take their own time to finish, the final results will be ordered automatically by Promise#all:


## forEach and map for Async Execution

Let's talk about use of Array.forEach and Array.map methods for async execution 

```javascript
const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3'
];

async function getTodos() {
  await urls.forEach(async (url, idx) => { 
    const todo = await fetch(url);
    console.log(`Received Todo ${idx+1}:`, todo);
  });
  
  console.log('Finished!');
}

getTodos();
```
    Finished!
    Received Todo 2, Response: { ··· }
    Received Todo 1, Response: { ··· }
    Received Todo 3, Response: { ··· }

⚠️ Problem 1:

The code above will happily execute. However, notice that Finished!* *was logged out first despite our use of await before urls.forEach. The first problem is that you can’t await the entire loop when using forEach.

⚠️ ️Problem 2:

In addition, despite the use of await within the loop, it didn’t wait for each request to finish before executing the next one. So, the requests were logged out of order. If the first request takes longer than the following requests, it could still finish last.

For both of those reasons, forEach should not be relied upon if you’re using async/await.


## Promise.all

Let’s solve the issue of waiting on the entire loop to finish. Since the await operation creates a promise under the hood, we can use Promise.all to await all the requests that were kicked during the loop to finish:

```javascript
const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3'
];

async function getTodos() {
  const promises = urls.map(async (url, idx) => 
    console.log(`Received Todo ${idx+1}:`, await fetch(url))
  );

  await Promise.all(promises);

  console.log('Finished!');
}

getTodos();
```
    Received Todo 1, Response: { ··· }
    Received Todo 2, Response: { ··· }
    Received Todo 3, Response: { ··· }
    Finished!

We’ve solved the issue of waiting on every request to finish before continuing onward. It also appears that we resolved the issue of the requests happening out of order, but that’s not *exactly* the case.

As mentioned earlier, Promise.all executes all of the promises given to it *in parallel*. It won’t wait for the first request to come back before executing the second, or third request. For most purposes this is fine, and it’s a very performant solution. But, if you truly need each request to happen *in order*, Promise.all won’t solve for that.


## for...of

We now know that forEach doesn’t respect async/await at all, and Promise.all only works if the order of execution doesn’t matter. Let’s look at a solution that solves for both cases.

The for...of loop executes in the order one would expect — waiting on each previous await operation to complete before moving on to the next:

```javascript
const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3'
];

async function getTodos() {
  for (const [idx, url] of urls.entries()) {
    const todo = await fetch(url);
    console.log(`Received Todo ${idx+1}:`, todo);
  }

  console.log('Finished!');
}

getTodos();
```

    Received Todo 1, Response: { ··· }
    Received Todo 2, Response: { ··· }
    Received Todo 3, Response: { ··· }
    Finished!

I particularly like how this method allows the code to remain linear — which is one of the key benefits of using async/await. I find it much easier to read than the alternatives.

If you don’t need access to the index, the code becomes even more concise:

    for (const url of urls) { ··· }

One of the major downsides of using a for...of loop is that it performs poorly compared to the other looping options in Javascript. However, the performance argument is negligible when using it to await asynchronous calls, since the intention is to hold up the loop until each call resolves. I typically only use for...of if asynchronous order of execution matters.

Note: You can also use basic for loops to get all of the benefits of for...of, but I like the simplicity and readability that for...of brings to the table.

👏 If you found this article helpful and would like to see more, please let me know by leaving some claps! 🔗 Follow for more articles like this.
