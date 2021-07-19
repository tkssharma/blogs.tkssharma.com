---
date: 2020-02-9
title: 'Javascript Object clonning shallow and Deep'
template: post
thumbnail: '../thumbnails/js.png'
slug: javascript-object-clone-shallow-and-deep
categories:
  - Popular
tags:
  - Javascript
---

When working with functional programming a good rule of thumb is to always create new objects instead of changing old ones. In doing so we can be sure that our meddling with the object’s structure won’t affect some seemingly unrelated part of the application, which in turn makes the entire code more predictable.

How exactly can we be sure that the changes we make to an object do not affect the code elsewhere? Removing the unwanted references altogether seems like a good idea. To get rid of a reference we need to copy all of the object’s properties to a new object. There are many ways to do this and each of them yields a slightly different result. We are going to take a look at the most popular ones: shallow copy, deep copy, merging and assigning.

For every method we analyze, we will look at two different variations — each having a mildly different outcome. Also, on top of listing the pros and cons of every approach, we are going to compare these variations in terms of their performance. I am also going to provide links to the production-ready equivalents to use in an actual, real-life application.


![From EcmaScript](https://i2.wp.com/storage.googleapis.com/blog-images-backup/1*hcws3Wa6u9IqaEZ_4X04uw.jpeg?ssl=1)


# Objects in javascript : object.assign/deep Copy

Lets talk simple things abut object like adding properties, copy or deep copy object and Method defined for Object

The Object constructor creates an object wrapper for the given value. If the value is null or undefined, it will create and return an empty object, otherwise, it will return an object of a Type that corresponds to the given value. If the value is an object already, it will return the value.

When called in a non-constructor context, Object behaves identically to new Object().

Properties of the Object constructor
> Object.length
Has a value of 1.
Object.prototype
Allows the addition of properties to all objects of type Object.
Methods of the Object constructor

## Objects and properties

A JavaScript object has properties associated with it. A property of an object can be explained as a variable that is attached to the object. Object properties are basically the same as ordinary JavaScript variables, except for the attachment to objects.

    var objectName = {} // creating object

    objectName.propertyName

    var myCar = new Object(); // creating object
    myCar.make = 'Ford';        // adding properties to object
    myCar.model = 'Mustang';
    myCar.year = 1969;

Unassigned properties of an object are [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) (and not [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)).

    myCar.color; // undefined

Properties of JavaScript objects can also be accessed or set using a bracket notation (for more details see [property accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors)). Objects are sometimes called *associative arrays*, since each property is associated with a string value that can be used to access it. So, for example, you could access the properties of the myCar object as follows:

    myCar['make'] = 'Ford';
    myCar['model'] = 'Mustang';
    myCar['year'] = 1969;

An object property name can be any valid JavaScript string, or anything that can be converted to a string, including the empty string

    // four variables are created and assigned in a single go, 
    // separated by commas
    var myObj = new Object(),
        str = 'myString',
        rand = Math.random(),
        obj = new Object();

    myObj.type              = 'Dot syntax';
    myObj['date created']   = 'String with space';
    myObj[str]              = 'String value';
    myObj[rand]             = 'Random Number';
    myObj[obj]              = 'Object';
    myObj['']               = 'Even an empty string';

    console.log(myObj);

Please note that all keys in the square bracket notation are converted to String type, since objects in JavaScript can only have String type as key type. For example, in the above code, when the key obj is added to the myObj, JavaScript will call the obj.toString()method, and use this result string as the new key.

You can also access properties by using a string value that is stored in a variable:

    var propertyName = 'make';
    myCar[propertyName] = 'Ford';

    propertyName = 'model';
    myCar[propertyName] = 'Mustang';

You can use the bracket notation with [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) to iterate over all the enumerable properties of an object. To illustrate how this works, the following function displays the properties of the object when you pass the object and the object's name as arguments to the function:

    function showProps(obj, objName) {
      var result = '';
      for (var i in obj) {
        // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
        if (obj.hasOwnProperty(i)) {
          result += objName + '.' + i + ' = ' + obj[i] + '\n';
        }
      }
      return result;
    }

So, the function call showProps(myCar, "myCar") would return the following:

    myCar.make = Ford
    myCar.model = Mustang
    myCar.year = 1969

## Enumerate the properties of an object

Starting with [ECMAScript 5](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_5_support_in_Mozilla), there are three native ways to list/traverse object properties:

* [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) loops
This method traverses all enumerable properties of an object and its prototype chain

* [Object.keys(o)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
This method returns an array with all the own (not in the prototype chain) enumerable properties' names ("keys") of an object o.

* [Object.getOwnPropertyNames(o)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)
This method returns an array containing all own properties' names (enumerable or not) of an object o.

## Creating new objects

JavaScript has a number of predefined objects. In addition, you can create your own objects. You can create an object using an [object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer). Alternatively, you can first create a constructor function and then instantiate an object invoking that function in conjunction with the new operator.

## Using object initializers

In addition to creating objects using a constructor function, you can create objects using an [object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer). Using object initializers is sometimes referred to as creating objects with literal notation. “Object initializer” is consistent with the terminology used by C++.

The syntax for an object using an object initializer is:

    var obj = { property_1:   value_1,   // property_# may be an identifier...
                2:            value_2,   // or a number...
                // ...,
                'property n': value_n }; // or a string

## Using a constructor function

Alternatively, you can create an object with these two steps:

1. Define the object type by writing a constructor function. There is a strong convention, with good reason, to use a capital initial letter.

1. Create an instance of the object with new.

To define an object type, create a function for the object type that specifies its name, properties, and methods. For example, suppose you want to create an object type for cars. You want this type of object to be called car, and you want it to have properties for make, model, and year. To do this, you would write the following function:

    function Car(make, model, year) {
      this.make = make;
      this.model = model;
      this.year = year;
    }

Notice the use of this to assign values to the object's properties based on the values passed to the function.

Now you can create an object called mycar as follows:

    var mycar = new Car('Eagle', 'Talon TSi', 1993);

## Using the Object.create method

Objects can also be created using the [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) method. This method can be very useful, because it allows you to choose the prototype object for the object you want to create, without having to define a constructor function.

    // Animal properties and method encapsulation
    var Animal = {
      type: 'Invertebrates', // Default value of properties
      displayType: function() {  // Method which will display type of Animal
        console.log(this.type);
      }
    };

    // Create new animal type called animal1 
    var animal1 = Object.create(Animal);
    animal1.displayType(); // Output:Invertebrates

    // Create new animal type called Fishes
    var fish = Object.create(Animal);
    fish.type = 'Fishes';
    fish.displayType(); // Output:Fishes

## Few Important methods

Object.assign()
Copies the values of all enumerable own properties from one or more source objects to a target object.
Object.create()
Creates a new object with the specified prototype object and properties.
Object.defineProperty()
Adds the named property described by a given descriptor to an object.
Object.defineProperties()
Adds the named properties described by the given descriptors to an object.
Object.entries()
Returns an array of a given object’s own enumerable property [key, value] pairs.
Object.freeze()
Freezes an object: other code can’t delete or change any properties.

## The Naive Way of Copying Objects

    let obj = {
      a: 1,
      b: 2,
    };
    let copy = obj;

    obj.a = 5;
    console.log(copy.a);
    // Result 
    // a = 5;
    // copy reference of object both object pointing to same copy

The naive way of copying objects is looping through the original object and copying each property one after the other. Let’s take a look at this code:

    function copy(mainObj) {
      let objCopy = {}; // objCopy will store a copy of the mainObj
      let key;

    for (key in mainObj) {
        objCopy[key] = mainObj[key]; // copies each property to the objCopy object
      }
      return objCopy;
    }

    const mainObj = {
      a: 2,
      b: 5,
      c: {
        x: 7,
        y: 4,
      },
    }

    console.log(copy(mainObj));

## Inherent Issues

1. objCopy object has a new Object.prototype method different from the mainObj object prototype method, which is not what we want. We want an exact copy of the original object.

1. Property descriptors are not copied. A “writable” descriptor with value set to be false will be true in the objCopy object.

1. The code above only copies enumerable properties of mainObj.

1. If one of the properties in the original object is an object itself, then it will be shared between the copy and the original making their respective properties point to the same object.

## Shallow Copying Objects

An object is said to be shallow copied when the source top-level properties are copied without any reference and there exist a source property whose value is an object and is copied as a reference. If the source value is a reference to an object, it only copies that reference value to the target object.

A shallow copy will duplicate the top-level properties, but the nested object is shared between the original(source) and the copy(target).

## Using Object.assign() method

The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object.

    let obj = {
      a: 1,
      b: 2,
    };
    let objCopy = Object.assign({}, obj);
    console.log(objCopy);
    // Result - { a: 1, b: 2 }

Well, this does the job so far. We have made a copy of obj. Let's see if immutability exist:

    let obj = {
      a: 1,
      b: 2,
    };
    let objCopy = Object.assign({}, obj);

    console.log(objCopy); // result - { a: 1, b: 2 }
    objCopy.b = 80;
    console.log(objCopy); // result - { a: 1, b: 80 }
    console.log(obj); // result - { a: 1, b: 2 }

In the code above, we changed the value of the property 'b' in objCopy object to 80 and when we log the modified objCopy object in the console, the changes only apply to objCopy. The last line of code checks that the obj object is still intact and hasn't change. This implies that we have successfully created a copy of the source object without any references to it.

## Pitfall of Object.assign()

Not so fast! While we successfully created a copy and everything seem to be working fine, remember we discussed shallow copying? Let’s take a look at this example:

    let obj = {
      a: 1,
      b: {
        c: 2,
      },
    }
    let newObj = Object.assign({}, obj);
    console.log(newObj); // { a: 1, b: { c: 2} }

    obj.a = 10;
    console.log(obj); // { a: 10, b: { c: 2} }
    console.log(newObj); // { a: 1, b: { c: 2} }

    newObj.a = 20;
    console.log(obj); // { a: 10, b: { c: 2} }
    console.log(newObj); // { a: 20, b: { c: 2} }

    newObj.b.c = 30;
    console.log(obj); // { a: 10, b: { c: 30} }
    console.log(newObj); // { a: 20, b: { c: 30} }

    // Note: newObj.b.c = 30; Read why..

## Why is obj.b.c = 30? we have problem here

Note: Properties on the prototype chain and non-enumerable properties cannot be copied. See here:

    let someObj = {
      a: 2,
    }

    let obj = Object.create(someObj, { 
      b: {
        value: 2,  
      },
      c: {
        value: 3,
        enumerable: true,  
      },
    });

    let objCopy = Object.assign({}, obj);
    console.log(objCopy); // { c: 3 }

## Deep copy of object

A deep copy will duplicate every object it encounters. The copy and the original object will not share anything, so it will be a copy of the original. Here’s the fix to the problem we encountered using Object.assign(). Let's explore.

## Using JSON.parse(JSON.stringify(object));

This fixes the issue we had earlier. Now newObj.b has a copy and not a reference! This is a way to deep copy objects. Here's an example:

    let obj = { 
      a: 1,
      b: { 
        c: 2,
      },
    }

    let newObj = JSON.parse(JSON.stringify(obj));

    obj.b.c = 20;
    console.log(obj); // { a: 1, b: { c: 20 } }
    console.log(newObj); // { a: 1, b: { c: 2 } } (New Object Intact!)

Another Way to Deep clone

    function cloneObject(obj) {
        var clone = {};
        for(var i in obj) {
            if(obj[i] != null &&  typeof(obj[i])=="object")
                clone[i] = cloneObject(obj[i]);
            else
                clone[i] = obj[i];
        }
        return clone;
    }

Happy Coding !!
