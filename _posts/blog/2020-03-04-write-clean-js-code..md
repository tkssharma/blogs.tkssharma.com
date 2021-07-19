---
date: 2020-03-04
title: 'Writee clean Code in Javscript'
template: post
thumbnail: '../thumbnails/js.png'
slug: write-clean-code-js
categories:
  - Popular
  - Javascript
  - Typescript
tags:
  - Javascript
---
In this article, I will share what I apply to improve my JavaScript coding skill, what I have learned and done in practice to be effective.

## Editor

Currently, there are countless types of editors out there and we don’t know which one to choose for productivity.

With me, except for Android code required to use Android Studio or iOS using Xcode, I mostly only use Visual Studio Code.

This is an editor developed by Microsoft. Yeah, It’s Microsoft, sounds good!!! Supports almost languages, countless additional plugins, AI code suggestions, beautiful interface, and light (not as Sublime Text, but it’s … still light 😄)

![](https://cdn-images-1.medium.com/max/2000/1*lTpMRACShdK48QxiA3G8pw.png)

In the past, I only used Sublime Text (VSCode was not popular at that time). Tons of plugin (which I will talk below) like automatically detect and fix errors, format code, git lens, terminal, … It saves me a lot of time because I’m no longer have to fix the small errors that are common when coding.

If you code PHP, you will like PHPStorm. Python, you will like PyCharm. It’s true that those editors (IDE) are powerful but only for one language. I am a Fullstack Developer, with JavaScript, HTML, PHP, NodeJS and React Docker, … then I use VSCode Because it is extremely powerful, support a lot of plugins, especially autocomplete is very smart ❤️

## follow styldeGuide using eslint/tslint plugins

Note: this guide assumes you are using Babel, and requires that you use babel-preset-airbnb or the equivalent. It also assumes you are installing shims/polyfills in your app, with airbnb-browser-shims or the equivalent.

*   https://github.com/airbnb/javascript
*  https://google.github.io/styleguide/jsguide.html


## Love for Eslint

One of the things that makes me spend the most time and frustrating is syntax errors. Errors like don’t declare variables/functions, null pointer, missing accents, … As our code gets bigger, your eyes will be tired of having to read dozens of files at a time, crazy minds, trembling hands typing each line of code 😄, leading to our being overlooked and making mistakes.

When I use ESLint, this is a plugin that helps to find errors, check syntax, format code, thereby reducing bugs when coding, and helping the code look better when formatted according to popular standards in the world. ESLint supports many big brothers: JavaScript, React, Vue, …

Especially using ESLint with VSCode, they are the perfect couple. Code typing will be checked for errors/syntax immediately and suggestions on how to use functions and variables for optimal always. There is also auto-format code, oh my god love it ❤️.

![](https://cdn-images-1.medium.com/max/2000/1*9pA1vFsmWgsoACoXlZyPEw.gif)

Besides ESLint, there is also Prettier used to format the code, but I prefer ESLint because it supports error detection and code suggestions for optimal.


## Must have Plugins

ESLint
-------
Category: linter

ESLint turns the most popular JavaScript linter into a VS Code extension. If you are using ESLint in your projects already, grab the extension and let it work its magic. If you aren’t, seriously you should try linting your code — maybe try this extension that does some of the work for you?

Prettier
----------

Category: formatter
Prettier doesn’t need much of an introduction. It’s an opinionated code formatter turned into an extension for VS Code. If you want to make your code prettier (pun unintended), you should consider installing this handy little extension.

## The optimal directory structure

One of the things that I recently came to “accept” and told myself:
> Do not try to optimize the project structure from the beginning

In the past, when starting a project, whether It’s big or small, I always spent a lot of time trying to choose a project structure that was optimal. I google to read all kinds of “NodeJS folder structure best practices”, “ReactJS code structure , … but then still wondered whether this is optimal or not, should I choose the framework to code? … , very time-consuming.

And I also realized that even though at first I tried to follow a structure that was supposed to be good then just a few days later, my code turned into a mess. 😄 Because my system thinking is not good, doesn’t matter initially how beautiful the code is, it’s just broken eventually.
> Do not think too much about what architecture to choose, how to organize it from the beginning. Select a direction or a library, framework and start working on it, doing it while improving so that it is good and practical.

If any of you are interested in a well-structured project, I share with you a NodeJS framework called NestJS, I read a lot about their docs and found that their architecture is very good (quite similar to AngularJS, Although I don’t like Angular much 😄)

## Console.log wherever It’s “smell”

I’m pretty sure console.log is what I use the most when coding JavaScript. The main purpose of this is to see if the data at the position you are interested in is actually true or not.

I personally think that programming, regardless of the language, mostly revolves around data, so if you see any code that is disturbing, maybe not right, you should console.log to make sure.

There are also many who say that the debuggershould look more professional. Chrome also supports placing Debug in lines of code that help you know better. In fact, this is not necessary for me personally, console.log also notice which line in the code, and use console.log faster, more convenient, but I saw the tutorial of the world famous coder from Google Facebook, They still use console.log 😄

But you should also note that when console.log is finished, check everything is fine, then delete it, do not put it on git. They will be very frustrated and sore eyes (like me 😄)

## Comment on time

In the process of coding, there will be many times when we have long, complicated code. We are afraid that after a long time and we read it the second time, we will not know what this code is doing anymore. Or with a humanitarian heart, we want people who come after to read the code can understand what it does.

Personally, I find it really useful to write comments, especially when the project has many people working on it. And we don’t want to ask the friend who wrote the code each time we do not understand. While that friend also is so busy to fix a ton of bugs that testers give him. Then if the code is explained itself, the following people can understand immediately and save time.

But the comment must also look reasonable and cute 😉. It is not necessary to comment on everything. It will sometimes make your code difficult to read and make others suffer from eye pain 😄

![](https://cdn-images-1.medium.com/max/2000/1*HGup_dNrrzO7T2XUJnBlRw.png)

When writing code, I will choose the name of the variable/function so that it is easy to understand, do not let a long class/function handle too much. Instead, I split up into smaller classes/functions (but do not split too much, it must be reasonable not to get eye pain again). And just comment when you feel it is necessary, practice writing code so that it is“self-explain”. Just read and know what it does.

![](https://cdn-images-1.medium.com/max/2000/1*C5Nq0QRCMAAhdGhk7sVFBw.png)

## Use ES6,7,8,9 standards

JavaScript is a very fast growing language along with the addition of many powerful functions/libraries available. As far as I know, every year “people” publish JavaScript standards called ECMAScript or ES for short. Each of these standards includes a set of new features built into JavaScript.

* 2015 ECMAScript 6 (ES6)

* 2016 ECMAScript 7 (ES7)

* 2017 ECMAScript 8 (ES8)

* 2018 ECMAScript 9 (ES9)

* 2019 ECMAScript 10 (ES10)

* ….

So, if we take advantage of the power of the ECMA, our code will look much better, optimized and look much cooler than just using the traditional for and if, while loops 😄 ( cute as the writer of this article 🤣🤣)

Below I have a few examples of functions/operators I use most when coding:

```javascript
// Loop using forEach
arr.forEach((item, index) => {
    // TODO
})

// Loop using for...of
for (const item of arr) {
    await something()
}

// Clone new array (not changing the old one)
const arr = [1,2,3]
const newArray = arr.map(item => item * 2)
console.log(newArray)

// Filter array by condition
const arr = [1,2,3,1]
const newArray = arr.filter(item => {
    if (item === 1) { return item }
})
console.log(newArray)

// Join array
const arr1 = [1,2,3]
const arr2 = [4,5,6]
const arr3 = [...arr1, ...arr2]
console.log(arr3)

// Get a property of object
const { email, address } = user
console.log(email, address)

// Copy object/array
const obj = { name: 'my name' }
const clone = { ...obj }
console.log(obj === clone)
```
## Skip Promise / Callback and switch to Async / Await now

The disadvantage of Promise/Callback
While coding, we have to work with API a lot. When calling API from backend or from third parties to get data and display, we will do as follows:

```javascript
// Get user list
axios.get('/users')
.then(response => {
    console.log(response)
})
.catch(error => {
    console.log(error)
})
```
And if we want to call another API only after successfully retrieving the list of users, then usually you will do as below:

```javascript
// Get users
axios.get('/users')
.then(response => {
   console.log(response)
   // Get addresses
   axios.get('/addresses')
    .then(response1 => {
        console.log(response1)
    })
    .catch(error1 => {
        console.log(error1)
    })
})
.catch(error => {
    console.log(error)
})
```
The bad thing comes when we want to call a series of APIs in order. And this is exactly what you see when the project scale bigger, the requests processed were more and more complicated 😂😂:

![](https://cdn-images-1.medium.com/max/2000/1*N-oJJRJe0NwxP3h8Rqv5vA.jpeg)

## Async / await saving the world

Since ES6 (2015), async/await has been introduced as an alternative to Promise/callbacks for handling asynchronous operations. The great thing about async/await is that it helps us write asynchronous code that looks like synchronization, the code runs line by line, looks very neat.

We can rewrite the code above using async / await:

```javascript
async function test () {
    try {
        const users = await axios.get('/users')
        
        const addresses = await axios.get('/addresses')
    } catch (error) {
        console.log(error)
    }
}

test()
```
There are some notes:

* awaitalways comes with async

* use try/catch to catch errors handling operations within the async function

* The nature of awaitis that it will wait until the Promise returns the value, so sometimes use awaittoo much will make our app slow.

Another nice thing about using async/await instead of regular Promise / Callback is when using try/catch to catch async/await errors. It also catches all other errors inside the try/catchblock, not just async/await

## Improve code quality with Typescript

The story begins …

When I first started programming with C, then Java. They are languages that quite strong and require extremely strict code. Requires clear and full definition of data types (string, boolean, …) or access specifications (public, private, protected, …). That day I was very tired of running because I have no idea whether this is public or private, what its data type is, just run until the error is reported

After moving to JavaScript (or PHP, Python), it has been greatly simplified because no matter what the data type is. Just declare the variable and use:

    let x = 1
    
    const test = 'This is a test'
    
    const arr = [1, 2, 3, 4, 5]

This is also one of the things that made me love JS from the beginning because the syntax is very “liberal”, less messy, looks clean and beautiful code 😄. But life is not like a dream Gradually I realized that when the project has many people, or after code a while then come back to read. It is really tangled. Because I don’t know what this variable is, what type of data will this function return? …

    const var1 = db.column1
    const var2 = db.column2
    const var3 = db.column3
    const var4 = db.column4

So what do we do now ?? console.log Of course

    const var1 = db.column1
    console.log(var1) // -> string
    const var2 = db.column2
    console.log(var2) // -> boolean (true/false)
    const var3 = db.column3
    console.log(var3) // -> number
    const var4 = db.column4
    console.log(var4) // -> array

It just wastes my time, and it is unlikely that I will come back to read in the future, or new readers of code can understand. Then I/they have to do a few dozen console.log statements to understand. What does the code do?

Typescript solves this problem
Typescript, in my opinion, is an “upgrade version” of JavaScript. Now our JavaScript code will have clearly defined types (string, boolean, number, …), accessible access functions (public, private), … and many other things. Code written in Typescript will be compiled into plain JavaScript, so we can run as usual, no need for specialized Typescript scripts or anything else. Check out some examples 😉:

```javascript
class Shape { 
   Area:number 
   
   constructor(a:number) { 
      this.Area = a 
   } 
} 
class Circle extends Shape { 
   disp():void { 
      console.log("Area of the circle:  "+this.Area) 
   } 
}
var obj = new Circle(223); 
obj.disp()
```

I heard about TypeScript 2 years ago, but still don’t like it and don’t want to use it because I just love the liberal nature of JavaScript. Sometimes I want to try it out but my eyes are sensitive, their disease is worse each time I look at something messy 😆😆

But a while ago I decided to switch to TypeScript because of the headache issues I mentioned when I read the old or other people’s code. Also, the dev community tends to switch to TypeScript a lot and review very well.

Currently, TypeScript is trending in JavaScript dev brothers. Libraries or frameworks (Angular, React or Vue) pay attention to support for TypeScript. For you who do not know: Vue 3 is 100% Typescript rewrite 😉. At the same time TypeScript developed by Microsoft so you are assured of the quality and support.

## CI/CD — Code -> Test->Deploy

Automation test
Listen to me, the project you are working on. Sooner or later, it will crumble.
The best way to deal with it is by doing and improving at the same time. Always spend 20% of your time working on improvement. And the only way to ensure that while your improvement is not producing bugs (or generating the least bugs), writing tests.

And just let you know. You can write test even before coding (The Head First Java suggests this way)

CI / CD — Test and deploy continuously

CI / CD (Continuous integration / continuous integration), this is a trend now, a new way to help us write code, test and deploy automatically and continuously.

![](https://cdn-images-1.medium.com/max/2000/1*p1e9rejsegdyt8gS3S2C2Q.png)

Actually almost CI/CD tools are integrated into Github, GitLab, BitBucket. So you don’t need to worry about it. Your work is to set up then push code. DevOps platforms (Github, gitlab, bit bucket) will take care of the rest.

## Conclude

Ok, that’s it. Hope that you guys can learn and find a way to improve your JavaScript coding skill after reading my article. And if you like it, please give me some 👏
