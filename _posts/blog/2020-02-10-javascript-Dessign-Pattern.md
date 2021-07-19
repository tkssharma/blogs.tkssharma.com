---
date: 2020-02-10
title: 'Javascript Design Patterns'
template: post
thumbnail: '../thumbnails/js.png'
slug: javascript-design-patterns
categories:
  - Popular
tags:
  - Javascript
---


"One of the most important aspects of writing maintainable code is being able to notice the recurring themes in that code and optimize them. This is an area where knowledge of design patterns can prove invaluable.

Even though we can be solving problems when writing our JavaScript, it can also lead to problems if we use the wrong design patterns or fail to implement the correct pattern correctly.

Developers tend to use the latest frameworks and libraries to build web apps and combine two or more of these libraries in a single project, often forgetting the core ideas behind the creation of these libraries.

Design patterns are like blueprints on how to solve a problem in software engineering. They are structured with best practices that help in giving stability and in many cases, security for our web apps. Because JavaScript is not a traditional [Object Oriented programming language](https://en.wikipedia.org/wiki/Object-oriented_programming), detecting design patterns may be hard, but not impossible.

In this article, we will discuss the various design patterns out there as well as how best we can implement them. For the sake of brevity, we shall only be talking about the five most used patterns. You can learn more about other design patterns [here](http://www.dofactory.com/javascript/design-patterns).

## Types of Design Patterns

In software engineering, a lot of design patterns exist. These patterns are grouped under three umbrellas which we shall briefly explain below:

1. **Creational patterns**: These kind of patterns focus on ways to create objects. When creating objects in large applications, the tendency to make things complex is always there. Creational design patterns solve this problem by controlling the object creation.

1. **Structural patterns**: Structural patterns provide ways to manage relationships between objects and also create class structure. One way this is achieved is by using inheritance and composition to create a large object from small objects.

1. **Behavioral patterns**: Behavioral patterns are patterns that focus on interaction between objects. Where creational patterns describe a moment of time and structural patterns describe a more or less static structure, behavioral patterns describe a process or a flow.

## Creational Patterns

## Module

Used very often in software development, the module pattern can be seen as an [Immediately-Invoked-Function-Expression](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) (IIFE).

    (function() {

    // code goes here!

    })();

All of the module code exists within a [closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures). Variables are imported by passing in values through the function execution and exported (exposed) by returning an object. Modules are useful in systems that exceed single function (use) JavaScript as they help in keeping your global namespace clean as well as keeping your functions importable and exportable.

An example of a module being implemented is shown below:

    const options = {
      username: 'abcd',
      server:   '127.0.0.1'
    };

    const ConfigObject = (function(params) {

    // return the publicly available things
      // able to use login function at the top of this module since it is hoisted
      return {
        login: login
      };

    const username = params.username || '',
        server       = params.server || '',
        password     = params.password || '';

    function checkPassword() {
        if (this.password === '') {
          console.log('no password!');
          return false;
        }

    return true;
      }

    function checkUsername() {
        if (this.username === '') {
          console.log('no username!');
          return false;
        }

    return true;
      }

    function login() {
        if (checkPassword() && checkUsername()) {
          // perform login
        }
      }

    })(options);

Notice as the values of username and server as well as password are constantly imported and exported? Using modules ensures for clean architecture that will make your code more readable and bring up less errors as well as bugs.

## Builder

You might have come across the builder pattern without even knowing it. The builder pattern lets us construct objects without having to create the object, all we need do is specify the type and the content of the object. It aims at separating an object’s construction from its representation. Let’s take a moment to study this brief example of the builder pattern in jQuery:

    const myDiv = $('<div id="myDiv">This is a div.</div>');
    // myDiv now represents a jQuery object referencing a DOM node.

    const myText = $('<p/>');
    // myText now represents a jQuery object referencing an HTMLParagraphElement.

    const myInput = $('<input />');
    // myInput now represents a jQuery object referencing a HTMLInputElement

In our first example, we passed in a <div/> element with some content. In the second, we passed in an empty <p> tag and in the last one, we passed in an <input /> element. The result of all three were the same: we were returned a jQuery object referencing a DOM node.

It is worth noting that the $ variable adopts the Builder Pattern in jQuery. In each example, the jQuery DOM object has access to all the methods provided by the jQuery library (like .hide()and .show()), but at no point was document.createElement called because the JS library handled all of that under the hood.

Creating each DOM element and inserting content into it would have been tedious and time consuming. For example, to create the myDiv in plain JavaScript:

    const myDiv     = document.createElement('div');
    myDiv.id        = 'myDiv';
    myDiv.innerText = 'This is a div.';

By making use of the builder pattern, we’re able to focus on the type and the content of the object, rather than explicit creation of it.

## Structural Patterns

## Facade

The aim of the facade pattern is to simply conceal a larger piece of logic into one simple function call. Internal subroutines and layers are well hidden and invoked through a facade which makes this pattern secure as it never exposes anything to the developers working with it. You might have probably used a facade without knowing. Check out the example below:

    $(document).ready(function() {

    // all your code goes here...

    });

Whenever we use jQuery’s ready() method, we are actually implementing a facade. Let’s check out what actually goes on each time ready() is called. Here is the code in the jQuery library for how .ready() is implemented:

    ready: (function() {

    ...

    // Mozilla, Opera, and Webkit
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", idempotent_fn, false);
        ...
      }

    // IE event model
      else if (document.attachEvent) {

    // ensure firing before onload; maybe late but safe also for iframes
        document.attachEvent("onreadystatechange", idempotent_fn);

    // A fallback to window.onload, that will always work
        window.attachEvent("onload", idempotent_fn);

    ...    
      }

    })

To ensure that ready() is fired at the appropriate time, jQuery regulates all browser inconsistencies and presents developers with a simple interface. Mozilla, Opera, and Webkit will use the DOMContentLoaded event while IE has a different implementation. The end-user doesn't have to know the differences in browsers. They can just call .ready()!

## Composites

Composites are objects composed of multiple parts that create a single entity. This single entity serves as the access point for all the parts, which, while simplifying things greatly, can also be deceiving because there’s no implicit way to tell just how many parts the composite contains.

Check out this jQuery example of a composite pattern:

    $('.myList').addClass('selected');
    $('#myItem').addClass('selected');

    // dont do this on large tables, it's just an example.
    $('#dataTable tbody tr').on('click', function(event) {
      alert($(this).text());
    });

    $('#myButton').on('click', function(event) {
      alert("Clicked.");
    });

As we can see, jQuery uses the composite pattern to provide us with a simple application user interface. When using the composite pattern in JavaScript, it’s important to watch out for whether we are dealing with a single element or multiple elements because since the composite pattern uses the same interface for both, we can mistake one for the other and end up with unexpected bugs.

## Behavioral patterns

## Observer

The observer design pattern implements a single object which maintains a reference to a collection of objects and broadcasts notifications when a change of state occurs. When we don’t want to observe an object, we remove it from the collection of objects being observed.

Aside from being good at decoupling objects which promote smaller, reusable components, the observer pattern helps us pinpoint dependencies and requires a deeper level of thinking about the relationship between the various components of an application.

In the following illustration, we shall implement the observer pattern and we shall make use of three methods:

* publish(data): Called by the subject when it has a notification to make

* subscribe(observer): Called by the subject to add an observer to its list of observers

* unsubscribe(observer): Called by the subject to remove an observer from its list of observers

Most modern JavaScript libraries support these three methods as part of their custom events infrastructure. There’s usually the following methods:

* on()

* attach()

* trigger()

* fire()

* off()

* detach()

    var a         = $({});
    $.subscribe   = a.on.bind(a);
    $.unsubscribe = a.off.bind(a);
    $.publish     = a.trigger.bind(a);

    // Usage
    document.on('recordsReceived', function(records) {
      // perform some actions, then fire an event

    $.publish('recordsShow', records);
    });

    // We can subscribe to this event and then fire our own event.
    $.subscribe('recordsShow', function() {
      // display the records somehow
      ..

    // publish an action after they are shown.
      $.publish('recordsDisplayed);
    });

    $.subscribe('recordsDisplayed, function() {
        ...
    });

As can be seen above, the observer pattern is very simple to implement and very powerful. Due to the fact that it is naturally event based, JavaScript is well suited to use this pattern. Users should be cautious as this pattern can create problems if many subjects and observers are involved.

## Constructor Pattern
This is a class-based creational design pattern. Constructors are special functions that can be used to instantiate new objects with methods and properties defined by that function.
It is not one of the classic design patterns. In fact, it is more of a basic language construct than a pattern in most object-oriented languages. But in JavaScript, objects can be created on the fly without any constructor functions or “class” definition. Therefore, I think it is important to lay down the foundation for other patterns to come with this simple one.
Constructor pattern is one of the most commonly used patterns in JavaScript for creating new objects of a given kind.


In this example, we define a Hero class with attributes like name and specialAbility and methods like getDetails. Then, we instantiate an object IronMan by invoking the constructor method with the new keyword passing in the values for the respective attributes as arguments.

Code
----
```javascript
function Hero(name, specialAbility) {
  // setting property values
  this.name = name;
  this.specialAbility = specialAbility;

  // declaring a method on the object
  this.getDetails = function() {
    return this.name + ' can ' + this.specialAbility;
  };
}

// ES6 Class syntax
class Hero {
  constructor(name, specialAbility) {
    // setting property values
    this._name = name;
    this._specialAbility = specialAbility;

    // declaring a method on the object
    this.getDetails = function() {
      return `${this._name} can ${this._specialAbility}`;
    };
  }
}

// creating new instances of Hero
const IronMan = new Hero('Iron Man', 'fly');

console.log(IronMan.getDetails()); // Iron Man can fly
```


## Factory Pattern

Factory pattern is another class-based creational pattern. In this, we provide a generic interface that delegates the responsibility of object instantiation to its subclasses.
This pattern is frequently used when we need to manage or manipulate collections of objects that are different yet have many similar characteristics.

In this example, we create a factory class named BallFactory that has a method that takes in parameters, and, depending on the parameters, it delegates the object instantiation responsibility to the respective class. If the type parameter is "football" or "soccer" object instantiation is handled by Football class, but if it is "basketball" object instantiation is handled by Basketball class.

```javascript
class BallFactory {
  constructor() {
    
  }
  createBall(type) {
      let ball;
      if (type === 'football' || type === 'soccer') ball = new Football();
      else if (type === 'basketball') ball = new Basketball();
      ball.roll = function() {
        return `The ${this._type} is rolling.`;
      };

      return ball;
  };
}

class Football {
  constructor() {
    this._type = 'football';
    this.kick = function() {
      return 'You kicked the football.';
    };
  }
}

class Basketball {
  constructor() {
    this._type = 'basketball';
    this.bounce = function() {
      return 'You bounced the basketball.';
    };
  }
}

// creating objects
const factory = new BallFactory();

const myFootball = factory.createBall('football');
const myBasketball = factory.createBall('basketball');

console.log(myFootball.roll()); // The football is rolling.
console.log(myBasketball.roll()); // The basketball is rolling.
console.log(myFootball.kick()); // You kicked the football.
console.log(myBasketball.bounce()); // You bounced the basketball.
```

## Singelton Pattern 

Singleton is a special creational design pattern in which only one instance of a class can exist. It works like this — if no instance of the singleton class exists then a new instance is created and returned, but if an instance already exists, then the reference to the existing instance is returned.

A perfect real-life example would be that of mongoose (the famous Node.js ODM library for MongoDB). It utilizes the singleton pattern.

In this example, we have a Database class that is a singleton. First, we create an object mongo by using the new operator to invoke the Database class constructor. This time an object is instantiated because none already exists. The second time, when we create the mysql object, no new object is instantiated but instead, the reference to the object that was instantiated earlier, i.e. the mongo object, is returned.

```javascript
var Singleton = (function () {
    var instance;
 
    function createInstance() {
        var object = new Object("I am the instance");
        return object;
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
function run() {
    var instance1 = Singleton.getInstance();
    var instance2 = Singleton.getInstance();
    alert("Same instance? " + (instance1 === instance2));  
}
```