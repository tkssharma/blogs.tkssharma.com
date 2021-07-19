---
date: 2020-08-03
title: 'Javascript Testing 2021 | Tools and Libraries for Testing'
template: post
thumbnail: '../thumbnails/mocha.png'
slug: javascript-testing-tools-and-library-2021
categories:
  - testing
  - javascript
  - unit-testing
  - test-runners
tags:
  - jest
  - karma
  - cypress
  - mocha/chai
---


## Testing in Today's world with different Libraries and Tools 

![Software Engineer, React Training, Testing JavaScript Training || from kentcdodd.com](https://kentcdodds.com/static/d8bc410cb6d4ffd1e48e1edd9999a3aa/3e561/banner.jpg)
### JavaScript Unit Testing

JavaScript Unit Testing is a testing method in which JavaScript test code written for a web page or web application module is combined with HTML as an inline event handler and executed in the browser to test if all functionalities work fine. These unit tests are then organized in the test suite.

Each and every suite contains a number of tests designed to be executed for a separate module. Most importantly they don't conflict with any other module and run with fewer dependencies on each other (some critical situations may cause dependencies).

### Why testing is important
Before diving into the various types and concepts of software testing, you should first have a clear understanding of why you should actually care about automated testing in the first place.

#### Building Confidence In Your Code:
To know that your code is working as planned, it needs to be tested in some kind. Manual test work for most small applications but don't provide the security and confidence level you get using automated tests.

- Automated tests make it easy to test almost every possible situation and allow you to run them whenever you are making a change to your code.
- Identifying every success and failure case and writing tests for them will ensure that you are confident with the code you are deploying for production.

### How to write Tests and application

- Use a static type system and a linter to capture basic errors like typos and syntax.
- Write effective unit tests that target the critical behavior and functionality of your application.
- Develop integration tests to audit your application holistically and make sure everything works together correctly in harmony.
- Create end-to-end (e2e) functional tests for automated click-testing of critical paths instead of relying on your users to do it for you.


### Running Tests

- Tests can run in the browser by creating an HTML page with the test libraries and test files included as JS scripts.
- Tests can run in a headless browser which is way to launch browsers where they run without actually rendering on the screen. This way you can run them even in a command line environment and very fast.
- Tests can also be executed in Node.js by simply importing the test files and dependent libraries. jsdom is commonly used in Node.js to simulate a browser-like environment using pure JavaScript.Jsdom simulates whatever you get when you run your JS inside the browser like window, document, body, location, cookies, selectors but it renders nothing real.


### Types of tests
There are a few different types of tests, and it is essential to know how they differ from each other. Most applications will require you to write multiple kinds of tests to get the best result possible.

#### Unit tests:
The purpose of a unit test is to validate the functionality of a relatively small piece of software, independently from other parts. Unit tests are narrow in scope, which allows us to cover all cases to ensure that every single part works correctly.

They are small and highly focused tests that can efficiently be executed on your local machine because of their fast execution time. You are going to have hundreds, if not thousands of these tests and run them on a regular basis while developing.

The only downside to these kinds of tests is that they are not executed on real devices and therefore have lower fidelity than the other types of tests.

#### Integration tests:
Integration tests demonstrate that the different parts of your application work together in a real-life production environment. They verify that two separate modules or components are working together in the way they should.

These tests are of medium size and have a much higher execution time then Unit tests. They aren't executed as often but are still vital for checking the health status of your applications. Their fidelity is also a lot higher because they run on real devices and verify the actual interaction between various components of your application.

#### End-to-End tests:
End-to-End tests validate complex scenarios from end to end, and usually require external resources, like databases or web servers, to be present. Imagine you have an application with a sign-up flow comprising of several steps, and you want to test the entire flow, that’s where End-to-End tests come into play.

E2E tests will also run on real devices just like integration tests and therefore, will again be quite slow in their execution.

The only downside to these kinds of tests is that debugging them and finding out what went wrong if a particular test fails becomes very hard because of their vast scope.

### Test Tools Types
Test tools can be divided into the following functionalities. Some provide us with only one functionality, and some provide us with a combination.
```javascript

const tools = [
  Karma, Jasmine, Jest, TestCafe, Cypress, webdriverio,
  Mocha, Jasmine, Jest, Cucumber, TestCafe, Cypress,
  Sinon, Jasmine, enzyme, Jest, testdouble,
  Istanbul, Jest, Blanket,
  Nightwatch, Nightmare, Phantom, Puppeteer, TestCafe, Cypress
]
```


- To achieve the most flexible set functionality, it’s common to use a combination of several tools.
Test launchers are used to launch your tests in the browser or Node.js with user config. (`Karma, Jasmine, Jest, TestCafe, Cypress, webdriverio`)

- Testing structure providers help you arrange your tests in a readable and scalable way. (`Mocha, Jasmine, Jest, Cucumber, TestCafe, Cypress`)
- Assertion functions are used to check if a test returns what you expect it to return and if its’t it throws a clear exception. (`Chai, Jasmine, Jest, Unexpected, TestCafe, Cypress`)
Generate and display test progress and summary. (Mocha, Jasmine, Jest, Karma, TestCafe, Cypress)
- Mocks, spies, and stubs to simulate tests scenarios, isolate the tested part of the software from other parts, and attach to processes to see they work as expected. (`Sinon, Jasmine, enzyme, Jest, testdouble`)
- Generate and compare snapshots to make sure changes to data structures from previous test runs are intended by the user’s code changes. (`Jest, Ava`)
Generate code coverage reports of how much of your code is covered by tests. (`Istanbul, Jest, Blanket`)
- Browser Controllers simulate user actions for Functional Tests. (`Nightwatch, Nightmare, Phantom, Puppeteer, TestCafe, Cypress`)
- Visual Regression Tools are used to compare your site to its previous versions visually by using image comparison techniques.
(`Applitools, Percy, Wraith, WebdriverCSS`)

## Jasmine Framework for testing 

The framework deployed in Node.js unit testing was formerly called JsUnit in the early 2000s. Over time, this framework had a number of upgrades and now it has become Jasmine.

The Jasmine framework enables automated Node.js unit testing – an essential practice to develop modern web and mobile-based apps. That’s why it has been utilized by Node.js website development companies.

Jasmin testing framework is a Behaviour Driven Development (BDD) testing framework. So, there is no requirement of a Javascript framework.

Therefore, Jasmine is highly suitable for the Node.js unit testing framework, websites, or other places where Javascript based frameworks function effectively.

```sh
# Open the Node appc
mkdir jasmine
cd jasmine
npm init
# Install the Jasmine framework module with the following command: 
npm install --save jasmine-node
# Open Node app
# Run command: 
jasmine init.
```

jasmine configuration 

```json
{

“spec_dir”: “spec” // Shows Successful Execution

“spec_files: [

“**/*[sS/] pec.js” // Shows Successful Execution

],

“helpers”: [

“helpers/**/*.js”

],

“stopSpecOnExpectationFailure”: false,

“random”: false
}
```

now we can create source and test for it 
```javascript
var exports=module.exports={};

exports.AddNumber=function(a,b)

{

return a+b;

};
```

Now spec file or test file for our code 

```javascript
var app=require("../Add.js");
describe("Addition",function(){

it("The function should add 2 numbers",function() {

var value=app.AddNumber(5,6);

expect(value).toBe(11);

});

});

```

now we can run jasmine command to test case, this can be integrated as node js app where you can execute jasmine command using `npm run test`

### Now let's start our real test journey

#### Start with Test Launchers 

Launch a list of tests based on a configuration you provide (what browsers to run in, what babel plugins to use, how to format the output, etc).

```sh
# Install Karma:
npm install karma --save-dev

# Install plugins that your project needs:
npm install karma-jasmine jasmine-core karma-chrome-launcher karma-firefox-launcher --save-dev

# Run on 
npx karma start karma.conf.js --log-level debug --single-run
```

```javascript
module.exports = function(config) {
  config.set({
    basePath: '../..',
    frameworks: ['jasmine'],
    autoWatch: true,
    browsers: ['Firefox', 'Chrome'],
    files: [
      // simple pattern to load the needed testfiles
      // equal to {pattern: 'test/unit/*.spec.js', watched: true, served: true, included: true}
      'test/unit/*.spec.js'
    ],
    //...
  })
}
```
#### Testing Structure
Refers to the organization of your tests. Nowadays, tests are usually organized in a BDD structure that supports behavior-driven development (BDD). It often looks like this:
```javascript
describe('calculator', function() {
  // describes a module with nested "describe" functions
  describe('add', function() {
    // specify the expected behavior
    it('should add 2 numbers', function() {
       //Use assertion functions to test the expected behavior
       ...  
    })
  })
})
```
#### Assertion Functions
Are used to make sure that tested variables contain the expected value. They usually look like one of these:
```javascript
// Chai expect (popular)
expect(foo).to.be.a('string')
expect(foo).to.equal('bar')

// Jasmine expect (popular)
expect(foo).toBeString()
expect(foo).toEqual('bar')

// Chai assert
assert.typeOf(foo, 'string')
assert.equal(foo, 'bar')

// Unexpected expect
expect(foo, 'to be a', 'string')
expect(foo, 'to be', 'bar')
```

### Spies 

Attach themselves to functions to provide us extra information about them. For example, how many times were they called, in which cases, by whom, what was passed to them in each call?
Spies are used in integration tests to make sure that the side effects of a process are as expected. For example, how many times was a calculation function like execute in this case called?

```javascript
class Child {
  ...
  execute() { ... }
  ...
}
  
class Father {
  constructor() {
    this.child = new Child()
  }
  ...
  execute() {
    ...
    this.child.execute()
    ...
    this.child.execute()
    ...
  }
  ...
}

it('should call child execute twice when father executes', () => {
  const father = new Father()
  
  // create a sinon spy to spy on object.method
  const childSpy = sinon.spy(father.child, 'execute')

  // call the method with the argument "3"
  father.execute()

  // make sure child.execute was called twice
  assert(childSpy.calledTwice)
})
```

#### Mocks or fake server 


```javascript
it('returns an object containing all users', done => {
  
  // create and configure the fake server to replace the native network call
  const server = sinon.createFakeServer()
  server.respondWith('GET', '/users', [
    200,
    { 'Content-Type': 'application/json' },
    '[{ "id": 1, "name": "Gwen" },  { "id": 2, "name": "John" }]'
  ])

  // call a process that includes the network request that we mocked
  Users.all()
    .done(collection => {
      const expectedCollection = [
        { id: 1, name: 'Gwen' },
        { id: 2, name: 'John' }
      ]
      expect(collection.toJSON()).to.eql(expectedCollection)
      done()
    })
  
  // respond to the request
  server.respond()
  
  // remove the fake server
  server.restore()
})
```

```javascript
const nock = require('nock')

const scope = nock('https://api.github.com')
  .get('/repos/atom/atom/license')
  .reply(200, {
    license: {
      key: 'mit',
      name: 'MIT License',
      spdx_id: 'MIT',
      url: 'https://api.github.com/licenses/mit',
      node_id: 'MDc6TGljZW5zZTEz',
    },
  })
```

### Putting it All Together

To start testing you need to choose a testing structure that suits you, choose the style of assertion functions you like, and decide how do you want to run the tests.
We will discuss the tools you can choose from later in the article.

- Some frameworks like Jest, Jasmine, TestCafe, and Cypress provide all of these out of the box. Some of them provide only some of the functionality and a combination of libraries can be used. A famous combinations of tools would be: mocha + chai + sinon.
- We also suggest creating two different processes. One for running unit and integration tests and another one for Functional Tests. This is because functional tests usually take longer, especially when running the test suite on several different browsers.
- Unit and integration tests can run on the fly, as you code, by using a “watch mode”. E2E tests, usually need much more time and are usually launched before merges and releases.


### Now How can we learn all these 

- i am covering playlist to cover all these in one playlist 
- unit testing using mocha, chai, assertion and spies library
- functional testing using cypress end to end testing of functional feature on browser 
- E2E testing is end to end API testing for the application by making actual system calls

We will discuss testing in different type of frameworks

- Testing with angular using karma runner 
- Testing in angular using angular test library
- Testing in simple express application unit/integration using mocha and chaie
- Testing in React or Vue JS Application using Jest as runner and test libraries
- Application testing using Cypress for e2e functional feature test which will run application headless browser

Libraries we are going to Use 

- https://istanbul.js.org/
- https://karma-runner.github.io/2.0/index.html
- https://github.com/chaijs/chai
- http://sinonjs.org/
- https://facebook.github.io/jest/
- https://github.com/jasmine/jasmine
- https://github.com/mochajs/mocha
- https://www.cypress.io/
- https://github.com/GoogleChrome/puppeteer


## Stay tuned for my playlist on Testing javascript in 2021