---
date: 2020-01-08
title: 'Writing Clean Code using async Await'
template: post
thumbnail: '../thumbnails/js.png'
slug: async-javascript-using-async-await
categories:
  - javascript
  - Popular
tags:
  - javascript
---


![](https://cdn-images-1.medium.com/max/3304/1*c7iahX-wbdY9Nl2xrOj85Q.png)

Have you ever wondered how JavaScript is asynchronous? In this rapid world, complex apps are getting created every day. To manage that complexity, one need good tools to define and modify the code. Promises are such constructs which are introduced to reduce the complexity of Asynchronous JavaScript code. You need to write async code every now and then to load data into your tables of UI, make requests to the server, load DOM elements on priority, write non-blocking code on Node etc.

# What is a Promise?

According to the official website:

A `**Promise**` is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers to an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of the final value, the asynchronous method returns a _promise_ for the value at some point in the future.

In simple words “A promise is a word taken for some action, the other party who gave the promise might fulfill it or deny it”. In the case of fulfilling, the promise gets resolved, and in another case, it gets rejected.

We can create a promise in JavaScript and use it as an upcoming fact to describe few actions. Promises are kind of design patterns to remove the usage of unintuitive callbacks.

![Promise creation and usage](https://cdn-images-1.medium.com/max/1600/1*i9kf_lixMpFftw5rf9m7pw.png)

As the picture depicts, these are the steps for creating and using promises

- A promise can be created in our JavaScript code. Or else it can be returned from an external node package

- Any promise that performs async operations should call any one of the two methods **resolve** or **reject. **The\*\* \*\*code logic should take care of when and where to call these functions. If the operation is successful, pass that data to the code that uses that promise, otherwise pass error

- The code which uses a promise should call **then **function on that promise. It takes two anonymous functions as parameters. The first function executes if the promise is resolved and the second function executes if promise is rejected.

What happens if you try to access the value from promise before it is resolved or rejected. Then promise will be in the **pending** state.

# Pain of writing asynchronous code in Node JS

All Node JS developers agree upon one point. Node development is quite different from other programming languages like Python or Ruby. In Python, you write code in a straight way with expected behavior. But in Node because of asynchronous factors, the code might freak you out with unexpected behavior. Variables you define and assign will not have values at the point where you need it. The scope is a bit tricky. If there is a lot of I/O in your applications God knows what can happen. Basically, Node is not sequential. A different mindset is needed while developing applications on Node platform. One of my friends **Surya **newly started writing few applications using AWS Node SDK. He irritated a lot and almost gave up because of the uncertainty of code by comparing that to his previous ANSI C coding experience.

In this article, I will show how we can use Promises in Node JS to bring certainty to our code when there is a lot of I/O(HTTP requests) performed.

# Creating a Promise

We can create a promise in our Node JS program using the **new** constructor. For all the examples I use **Node v6.5.0**. You should install Node JS on your machine before beginning with this tutorial. Even though promises can be used in browsers, this article mainly focuses on writing asynchronous code on Node.

```
var myPromise = new Promise(function(resolve, reject){
   ....
})
```

So myPromise is a Promise type object which allows us to use it for later.

Everyone knows about the Github API. If not, it is a REST API by provided by Github to fetch the details about **Users**, **Repositories** etc

Let us take one API out of their collection. It is users API. Something like this

```
[https://api.github.com/users/narenaryan](https://api.github.com/users/narenaryan)
```

If you make an HTTP GET request for this URL, you will be returned a JSON with all stats about myself like repos, followers, following, stars etc.

For making an HTTP request from our Node app, let us install a small package which make things clear.

```
sudo npm install request -g
```

request package removes the boilerplate code of inbuilt **http **package.

I am going to use this as an example for our node application. Suppose we have a global variable called **userDetails **in our code and we thought to initialize it. It needs to fetch details of a Github user from Github and load that variable. Then with promises we can do this.

```
var userDetails;

function initialize() {
    // Setting URL and headers for request
    var options = {
        url: '[https://api.github.com/users/narenaryan'](https://api.github.com/users/narenaryan'),
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise
    return new Promise(function(resolve, reject) {
     // Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })

}
```

<iframe
                width="800"
                height="600"
                src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Frepl.it%2F%40tkssharma%2FQueasyReadyInfinity%3Flite%3Dtrue&url=https%3A%2F%2Frepl.it%2F%40tkssharma%2FQueasyReadyInfinity%3Flite%3Dtrue&image=https%3A%2F%2Frepl.it%2Fpublic%2Fimages%2Freplit-logo-800x600.png&key=a19fcc184b9711e1b4764040d3dc5c07&type=text%2Fhtml&schema=repl"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

Where are you initializing declared userData variable above? **initialize**function is returning a promise instead of setting data or returning data. We need to take that promise and handle it in such a way that we can fill the variable and proceed our program from there.

- **options **object is used to set URL and Headers for request

- **request.get **makes a GET request to the Github API

- **body **consists of the JSON response from the server

- We are calling resolve method to pass data back to the handler which implements **then **on the promise.

Now let us create a **main **function where we get the Promise for above function and attach a function callback in the **then **function.

<iframe
                width="0"
                height="0"
                src=""
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

Output looks like this.

![](https://cdn-images-1.medium.com/max/3376/1*aSMe2LPzscC4QH75pU4c2A.png)

Suppose you want to perform an operation after a promise is fulfilled use another then method to transform the data you obtained from the promise.

I need to return gists + repos count of **narenaryan **on github. Then I can simply add one more **then **like this

```
function main() {
    var initializePromise = initialize();
    initializePromise.then(function(result) {
        userDetails = result;
        console.log("Initialized user details");
        // Use user details from here
        return userDetails;
    }, function(err) {
        console.log(err);
    }).then(function(result) {
        // Print the code activity. Prints 110
        console.log(result.public_gists + result.public_repos);
    })
}
```

By chaining **then **functions on a promise we can pass the data to the next functions. If you are writing logic by initializing data and then using it in multiple functions, above example can help you. The above design is good but not great.

We can also queue the asynchronous actions using Promises. Something similar to singleton pattern can be achieved using them.

When a value is returned from **then, **the next **then **can get the value. We can also return a promise from then so that the next chained **then **function can use that to build its own logic.

![](https://cdn-images-1.medium.com/max/3488/1*5Oj4qxp6BaWyAgZzLbddxQ.png)

<iframe
                width="0"
                height="0"
                src=""
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

<iframe
                width="800"
                height="600"
                src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Frepl.it%2F%40tkssharma%2FStaleDotingConfigfiles%3Flite%3Dtrue&url=https%3A%2F%2Frepl.it%2F%40tkssharma%2FStaleDotingConfigfiles%3Flite%3Dtrue&image=https%3A%2F%2Frepl.it%2Fpublic%2Fimages%2Freplit-logo-800x600.png&key=a19fcc184b9711e1b4764040d3dc5c07&type=text%2Fhtml&schema=repl"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

The output is the list of details of my Github followers.

```
[ { login: 'kmvkrish',
    id: 10069490,
    avatar_url: '[https://avatars2.githubusercontent.com/u/10069490?v=3'](https://avatars2.githubusercontent.com/u/10069490?v=3'),
    gravatar_id: '',
    url: '[https://api.github.com/users/tkssharma'](https://api.github.com/users/kmvkrish'),
    html_url: '[https://github.com/tkssharma'](https://github.com/kmvkrish'),
..........
......

}]
```

If you observe above we are returning anotherPromise, but in next **then **we are using data as normal data. The above code is making two HTTP requests to the Github API but finally receiving the correct data and printing it to the console.

# Making a sequence of Promises

We can make a sequence of promises for doing things in a particular order. We can use **Promise.all **function which takes a list of promises in the given order and returns another promise which we can use a **then **method to conclude the logic.

Let us write a sample program using **Promise.all. **We are writing it in ES6 style.

<iframe
                width="0"
                height="0"
                src=""
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

<iframe
                width="800"
                height="600"
                src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Frepl.it%2F%40tkssharma%2FLightAgileMatrix%3Flite%3Dtrue&url=https%3A%2F%2Frepl.it%2F%40tkssharma%2FLightAgileMatrix%3Flite%3Dtrue&image=https%3A%2F%2Frepl.it%2Fpublic%2Fimages%2Freplit-logo-800x600.png&key=d04bfffea46d4aeda930ec88cc64b87c&type=text%2Fhtml&schema=repl"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

**setTimeout **is used to simulate a blocking async operation. We are creating three promises and appending a string to the original variable called **message**. We should use **Promise.all **when we don’t care about the order of execution but finally message should be filled with the expected content.

The output for above program looks like

![](https://cdn-images-1.medium.com/max/1772/1*dKNcdBKknSG1MX_nI_ymgw.png)

**results **are\*\* **the result of each promise in the list. That data is passing to **printResult \*\*function here.

The output clearly tells the final message is getting updated properly irrespective of order.

> Note: **Promise.all** fails if any one of the Promise got rejected. It is an **and**operation between promise fulfillments

Now see this statement from the code

```
console.log("\"\"" + message);
```

Even though this statement is below the Promises, it printed first in the output. Reason is this code will be executed in a non-blocked way. If you are expecting the value to be modified, then implement logic in the **then **function not outside.

# Async/Await

ES 2017 introduced **Asynchronous** functions. Async functions are essentially a cleaner way to work with asynchronous code in JavaScript. In order to understand exactly what these are, and how they work, we first need to understand **Promises**.

If you don’t know what Promises are, you should read above part first, You can’t understand **Async/Await in JavaScript until you understand Promises.**

#### What is Async/Await?

- The newest way to write asynchronous code in JavaScript.

- It is non blocking (just like promises and callbacks).

- Async/Await was created to simplify the process of working with and writing chained promises.

- Async functions return a Promise. If the function throws an error, the Promise will be rejected. If the function returns a value, the Promise will be resolved.

#### Syntax

Writing an async function is quite simple. You just need to add the `async`keyword prior to `function`:

```
**// Normal Function**

function add(x,y){
  return x + y;
}

**// Async Function**

**async function add(x,y){
  return x + y;
}**
```

![](https://cdn-images-1.medium.com/max/1340/1*Q1H8MMDSTVLI_Y-elp702Q.png)

#### Await

Async functions can make use of the `await` expression. This will pause the `async` function and wait for the Promise to resolve prior to moving on.

#### Example Time

Enough talk. To understand what all of this means, lets look at an example! First we’re going to create some code using promises. Once we’ve got something working, we’ll rewrite our function using async/await so you can see just how much simpler it is!

> If you’re using Google Chrome, be sure to follow along by typing in the code into your developer console. You can open the console by pressing Ctrl+Shift+J (Windows / Linux) or Cmd+Opt+J (Mac).

Consider the below code:

```
function doubleAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x * 2);
    }, 2000);
  });
}
```

In this code we have a function called `doubleAfter2Seconds`. This function will take a number as input and will resolve two seconds later with the number doubled.

We can invoke our function and pass in the number 10 to try it out. To do this, we’ll call our function while passing in `10`. Then, after the promise has resolved, we’ll take our returned value and log it to the console. Here’s what this would look like:

```
doubleAfter2Seconds(10).then((r) => {
  console.log(r);
});
```

Awesome!

But what if we want to run a few different values through our function and add the result? Unfortunately, we cant just add our invocations together and log them:

```
let sum =   doubleAfter2Seconds(10)
          + doubleAfter2Seconds(20)
          + doubleAfter2Seconds(30);
console.log(sum);

// undefined
```

The problem with the above code is it doesn’t actually wait for our promises to resolve before logging to the console.

One possible solution is to set up a promise chain. To do this we’ll create a new function called `addPromise`. Our function will take an input value, and will return a Promise. Here’s what the boilerplate code looks like:

```
function addPromise(x){
  return new Promise(resolve => {

// Code goes here...
    // resolve()

});
}
```

Awesome. Now we can add in our calls to our `doubleAfter2Seconds` function. Once we’re done, we can resolve with our new sum. In this example we should be returning `x + 2*a + 2*b + 2*c`. Here’s the code:

```
function addPromise(x){
  return new Promise(resolve => {
    doubleAfter2Seconds(10).then((a) => {
      doubleAfter2Seconds(20).then((b) => {
        doubleAfter2Seconds(30).then((c) => {
          resolve(x + a + b + c);
        })
      })
    })
  });
}
```

Lets walk through the code again, line by line.

- First, we create our function `addPromise`. This function accepts one parameter.

- Next, we create our `new Promise` that we’ll be returning. Note that for the sake of simplicity, we’re not handling rejections/errors.

- Next we invoke `doubleAfter2Seconds` for the first time, passing in a value of `10`. Two seconds later, the return value of `20` will be returned to the `a`variable.

- We invoke `doubleAfter2Seconds` again, this time passing in a value of `20`. Two seconds later, the return value of `40` will be returned to the `b`variable.

- We invoke `doubleAfter2Seconds` one final time, this time passing in a value of `30`. Two seconds later, the return value of `60` will be returned to the `c` variable.

- Finally, we resolve our Promise with the value of `10 + 20 + 40 + 60` or `130`.

When we put all of the code together, here’s what it looks like:

<iframe
                width="0"
                height="0"
                src=""
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

<iframe
                width="800"
                height="600"
                src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Frepl.it%2F%40tkssharma%2FLuminousHoarseAutotote%3Flite%3Dtrue&url=https%3A%2F%2Frepl.it%2F%40tkssharma%2FLuminousHoarseAutotote%3Flite%3Dtrue&image=https%3A%2F%2Frepl.it%2Fpublic%2Fimages%2Freplit-logo-800x600.png&key=a19fcc184b9711e1b4764040d3dc5c07&type=text%2Fhtml&schema=repl"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

#### Switching from Promises to Async/Await.

Awesome! Now lets see just how much easier we could write the above code with Async/Await!

Remove the `addPromise` function, and create a new function named `addAsync`. This function will have the exact same purpose as our `addPromise`did. When you create your `addPromise` function, make use of the `async`keyword. Here’s what that looks like:

```
async function addAsync(x) {

// code here...

}
```

Now that you’ve created an async function, we can make use of the `await`keyword which will pause our code until the Promise has resolved. Here’s how easy that is:

```
async function addAsync(x) {
  const a = await doubleAfter2Seconds(10);
  const b = await doubleAfter2Seconds(20);
  const c = await doubleAfter2Seconds(30);
  return x + a + b + c;
}
```

And here’s the full code:

<iframe
                width="0"
                height="0"
                src=""
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

<iframe
                width="800"
                height="600"
                src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Frepl.it%2F%40tkssharma%2FOrchidJadedLead%3Flite%3Dtrue&url=https%3A%2F%2Frepl.it%2F%40tkssharma%2FOrchidJadedLead%3Flite%3Dtrue&image=https%3A%2F%2Frepl.it%2Fpublic%2Fimages%2Freplit-logo-800x600.png&key=a19fcc184b9711e1b4764040d3dc5c07&type=text%2Fhtml&schema=repl"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

As you can see, we’re still making use of the same `doubleAfter2Seconds`function. Similarly, we’ll be invoking our `addAsync()` function and passing in the value of `10`. Upon completion, we log the resulting value. Let’s walk through this step-by-step:

- First we call `addAsync(10)` passing in the value of `10`.

- Next, we get the value of `a` on line 10. Since the `await` keyword is used, our function pauses for two seconds while we wait for the promise to resolve. Once the promise resolves, `a = 20`.

```
`const a = await `doubleAfter2Seconds`(10);`
```

- Next, we get the value of `b` on line 11. Since the `await` keyword is used, our function pauses for two seconds while we wait for the promise to resolve. Once the promise resolves, `b = 40`.

```
`const b = await `doubleAfter2Seconds`(20);`
```

- Next, we get the value of `c` on line 12. Since the `await` keyword is used, our function pauses for two seconds while we wait for the promise to resolve. Once the promise resolves, `c = 60`.

```
`const c = await `doubleAfter2Seconds`(30);`
```

- Finally, we can return the value of `x + a + b + c`. Since we passed in `10`as our single parameter, we are returning the value of `10 + 20 + 40 + 60`.

- A full six seconds later, our `console.log(sum)`is finally run. The value of `10 + 20 + 40 + 60` is passed in, and `130` is logged to the console.

And that’s it! You’ve just created an asynchronous function in JavaScript!

**As you can see, since Async functions return a Promise, they can be used interchangeably with Promises very easily. Our code is also so much cleaner and easier to read when we use Async/Await instead of long Promise chain.**

**Happy Coding**
