---
layout: blog
category: blog
Title: Latest features of Javascript ES7/ES8/ES9
summary: Latest features of Javascript ES7/ES8/ES9
heroimage: "http://codecondo.com/wp-content/uploads/2015/06/20-Resources-on-ES6-for-JavaScript-Developers.jpg"
tags :
- javascript
- es6
- es8
---

# 1 New features of ES6 (2015)

* class
* Modularization
* Arrow function
* Function parameter defaults
* Template string
* Destructuring assignment
* Extension operator
* Object attribute shorthand
* Promise
* Let and Const

## 1.1 module

ES5 does not support native modularity, and modules are added as an important part of ES6\. The function of the module is mainly composed of export and import. Each module has its own scope. The mutual calling relationship between modules is to specify the exposed interfaces of modules through export, and to reference the interfaces provided by other modules through import. At the same time, it also creates a namespace for the module to prevent function naming conflicts.

### 1.1.1 export

```javascript
 //Derived variables
export var name = 'Rainbow'
var name = 'Rainbow';
var age = '24';
export {name, age};


//Derived constant
export const sqrt = Math.sqrt;

//derived function
export function myModule(someArg) {
 return someArg;
```
### 1.1.2 import
```javascript
import {myModule} from 'myModule';//Structure assignment is used
import {name,age} from 'test';

//An import statement can import default functions and other variables at the same time.
import defaultMethod, { otherMethod } from 'xxx.js';
```
## 1.2 Arrow function

This is one of the most exciting features of ES6\. =It's not just a shorthand for the keyword function, it brings other benefits. Arrow function shares the same this with the surrounding code, which can help you to solve the problem of this pointing. Experienced JavaScript developers are familiar with patterns such as var self = this; or var that = this that refer to peripheral this. But with =  this mode is not needed.

### 1.2.1 structure of arrow function

Arrow function's arrow =  before is an empty bracket, a single parameter name, or multiple parameter names enclosed in brackets, and after the arrow can be an expression (as the return value of the function), or the function body enclosed in curly brackets (you need to return the value by yourself, otherwise it is undefined).

The original said:

"Whether it's an arrow function or a bind function, it returns a new function reference every time it's executed, so if you need a function reference to do something else (such as uninstalling the listener), you have to save the reference yourself."
```javascript
 //Wrong practice
class PauseMenu extends React.Component{
   componentWillMount(){
 AppStateIOS.addEventListener('change', this.onAppPaused.bind(this));
   }
   componentWillUnmount(){
 AppStateIOS.removeEventListener('change', this.onAppPaused.bind(this));
   }
   onAppPaused(event){
   }
}
```

```javascript 
//Correct approach
class PauseMenu extends React.Component{
   constructor(props){
 super(props);
 this._onAppPaused = this.onAppPaused.bind(this);
   }
   componentWillMount(){
 AppStateIOS.addEventListener('change', this._onAppPaused);
   }
   componentWillUnmount(){
 AppStateIOS.removeEventListener('change', this._onAppPaused);
   }
   onAppPaused(event){
   }
}
```

```javascript
//The right way to simplify
class PauseMenu extends React.Component{
   componentWillMount(){
 AppStateIOS.addEventListener('change', this.onAppPaused);
   }
   componentWillUnmount(){
 AppStateIOS.removeEventListener('change', this.onAppPaused);
   }
   onAppPaused = (event) = {
   }
}
```

It should be noted that no matter bind or arrow function is executed, a new function reference is returned every time,
//So if you need a function reference to do something else (such as uninstalling the listener), you have to save the reference yourself.

## 1.3 default parameters
```javascript
const test = (a='a',b='b',c='c')={
   return a+b+c
}

console.log(test('A','B','C')) //ABC
console.log(test('A','B'))//ABc
console.log(test('A'))   //Abc
```
## 1.4 template string

```javascript
var name = 'Your name is ' + first + ' ' + last + '.'
var name = `Your name is ${first} ${last}.`
```

## 1.5. Structure assignment

### 1.5.1 structure assignment of array

```javascript
var foo = ["one", "two", "three", "four"];

var [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"
//If you want to ignore some values, you can get the values you want as follows
var [first, , , last] = foo;
console.log(first); // "one"
console.log(last); // "four"

//You can write like this
var a, b; //Declare variables first

[a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2
```

Use structure assignment to exchange the values of two variables.
```javascript
var a = 1;
var b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
```
### 1.5.2 structure assignment of objects

```javascript
const student = {
 name:'Ming',
 age:'18',
 city:'Shanghai'  
};

const {name,age,city} = student;
console.log(name); // "Ming"
console.log(age); // "18"
console.log(city); // "Shanghai"
```
## 1.6 spread operator

Expand an array or object.
```javascript
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
var arr3 = [...arr1, ...arr2];// Append all elements in arr2 after arr1 and return
//Equate to
var arr4 = arr1.concat(arr2);
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };
var clonedObj = { ...obj1 };
// Cloned object: {foo: 'bar', X: 42}
var mergedObj = { ...obj1, ...obj2 };
// Merged object: {foo: 'Baz', X: 42, Y: 13}
```
Application in react

```javascript
 const params = {
   name: 'Jine',
   age: 21
}
<CustomComponent {...params} />
var params = {
   name: '123',
   title: '456',
   type: 'aaa'
}
var { type, ...other } = params;
<CustomComponent type='normal' number={2} {...other} />
<CustomComponent type='normal' number={2} name='123' title='456' />
```

## 1.7 Promise

```javascript
 var test = (a,b)={
   return new Promise((reslove,reject)= {
    reslove(resoult)//Return correct results
    reject(err)    //Results on error
 })
   }
   test(a,b).then(res={
   }).catch(err={
})

try{
 var resoult = await test(a,b)
} catch(er){}
```

# 2 new features of ES7 (2016)

* The array includes() method is used to determine whether an array contains a specified value. If it does, it returns true, otherwise it returns false.
* a  b index operator, which is the same as Math.pow(a, b).

## 2.1 includes()


The includes() function is used to determine whether an array contains a specified value. If it does, it returns true. Otherwise, it returns false.
```javascript

let arr = ['react', 'angular', 'vue'];

if (arr.includes('react'))
{
   console.log('react existence');
}
```

# 3 new features of es8 (2017)

* async/await
* Object.values()
* Object.entries()
* String padding: padStart() and padEnd(), the padding string reaches the current length
* Comma is allowed at the end of function parameter list
* Object.getOwnPropertyDescriptors()
* ShareArrayBuffer and Atomics objects for reading and writing from shared memory locations

## 3.1 async/await
```javascript
 async function init() {
   console.log('start')
   await this.testSync()
   console.log('End')
 }
 this.init()
 async function testSync() {
   const response = await new Promise(resolve = {
setTimeout(() = {
   resolve("async await test...");
 }, 1000);
   });
   console.log(response);
}
```

## 3.2 Object.keys()
```javascript
 var obj = { foo: "bar", baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
```
## 3.3 Object.values()

```javascript
var obj = { foo: "bar", baz: 42 };
Object.values(obj)
// ["bar", 42]
```

## 3.4 Object.entries()

The Object.entries method returns an array of key value pairs of all enumerable properties of the parameter object itself (excluding inheritance).

```javascript
var obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
const obj1 = {a: 1, b: 2, c: 3}
for(let [key,value] of Object.entries(obj1)){
   console.log(`key: ${key} value:${value}`)
}
//key:a value:1
//key:b value:2
//key:c value:3
```
One use of the Object.entries method is to turn an object into a real Map structure.
```javascript

var obj = { foo: 'bar', baz: 42 };
var map = new Map(Object.entries(obj));
map // Map { foo: "bar", baz: 42 }
```

[Object object keys(), values() entries()](https://www.jianshu.com/p/02d940bee54c)

## 3.5 String padding
```javascript
String.padStart(targetLength,[padString])
String.padEnd(targetLength,padString])
```

* targetLength: the target length to which the current string needs to be populated. If the value is less than the length of the current string, the current string itself is returned.
* padString: (optional) fills the string. If the string is too long, so that the length of the filled string exceeds the target length, only the leftmost part will be retained, and the rest will be truncated. The default value of this parameter is' '.

```javascript
console.log('0.0'.padStart(4,'*'))
console.log('0.0'.padStart(20))
console.log('0.0'.padEnd(4,'*')) 
console.log('0.0'.padEnd(10,'*'))
```

## 3.6 Object.getOwnPropertyDescriptors()

The Object.getOwnPropertyDescriptor method returns an object (descriptor). ES6 introduces the Object.getOwnPropertyDescriptors method, which returns the description object of all its own properties (non inherited properties) of the specified object.

```javascript

 const obj = {
 foo: 123,
 get bar() { return 'abc' }
};
Object.getOwnPropertyDescriptors(obj)
```

In the above code, the Object.getOwnProperDescriptors method returns an object. The property names of all the original objects are the property names of the object, and the corresponding property values are the property description objects.  
The main purpose of this method is to solve the problem that Object.assign() can't copy get and set attributes correctly.

```javascript
 const source = {
 set foo(value) {
   console.log(value);
 }
};
const target1 = {};
Object.assign(target1, source);
Object.getOwnPropertyDescriptor(target1, 'foo')
```

In the above code, the value of the foo attribute of the source object is an assignment function. The Object.assign method copies this attribute to the target1 object. As a result, the value of this attribute becomes undefined. This is because the object. Assign method always copies the value of an attribute, not the assignment method or value method behind it.  
[ES6 object extension - Object.getOwnPropertyDescriptors()](https://blog.csdn.net/ww430430/article/details/78581731)

## 3.7 SharedArrayBuffer object

With SharedArrayBuffer, multiple web workers can read and write the same block of memory at the same time. You no longer need postMessage communication with delay. Multiple web workers have no delay in data access

The SharedArrayBuffer object is used to represent a general, fixed length raw binary data buffer, similar to the ArrayBuffer object, which can be used to create views on shared memory. Unlike ArrayBuffer, SharedArrayBuffer cannot be separated.

## 3.8 Atomics objects

The Atomics object provides a set of static methods for atomic manipulation of the SharedArrayBuffer object.

These atomic operations belong to the Atomics module. Unlike general global objects, Atomics is not a constructor, so it cannot be called with the new operator or directly as a function. All properties and methods of Atomics are static (like the Math object).

Multiple threads sharing memory can read and write data at the same location at the same time. Atomic operation ensures that the value of the data being read or written meets the expectation, that is, the next atomic operation will not start until the end of the previous atomic operation, and its operation process will not be interrupted.

Atomics.add()
//Adds an array element at the specified location to the given value and returns the value of the element before it is added.

Atomics.and()
//Compares the array element at the specified location with the given value, and returns the value of the element before the operation.


Atomics.compareExchange()
//If the element specified in the array is equal to the given value, it is updated to the new value and the original value of the element is returned.


Atomics.exchange()
//Updates the element specified in the array to the given value and returns the value before the element is updated.


Atomics.load()
//Returns the value of the specified element in the array.


Atomics.or()
//Compares the array element at the specified location with the given value, and returns the value of the element before the or operation.


Atomics.store()
//Sets the element specified in the array to the given value and returns the value.


Atomics.sub()
//Subtracts an array element at the specified location from the given value and returns the value of the element before subtraction.


Atomics.xor()
//The array element at the specified location is different from the given value or, and the value of the element before the exclusive or operation is returned.

//The wait() and wake() methods use the futexes model on Linux (fast user space mutex,
//Fast user space mutex), which allows processes to wait until a specific condition is true, is mainly used to implement blocking.

Atomics.wait()
//Checks whether the value at a specified location in the array is still the given value, and if it is, holds until it wakes up or times out.
//The return value is "ok", "not equal" or "time out". When called, an exception is thrown if the current thread does not allow blocking
//Most browsers do not allow wait() to be called in the main thread.


Atomics.wake()
//Wakes up the thread in the waiting queue waiting on the element at the specified position in the array. The return value is the number of threads successfully woken.


Atomics.isLockFree(size)
//It can be used to detect whether the current system supports hardware level atomic operation. For arrays of a specified size, if the current system supports hardware level atomic operations,
//Returns true; otherwise, it means that for the array, each atomic operation in the Atomics object can only be implemented with a lock. This function is for technical experts.

# 4 new features of es9 (2018)

* Asynchronous iterator
* Template string for non escape sequence
* Regular expression reverse (look behind) assertion (this article)
* Regular expression Unicode escape
* Regular expression s/dotAll mode
* Regular expression named capture group
* Object expansion operator
* Promise.prototype.finally

## 4.1 asynchronous iterator

ES2018 introduces asynchronous iterators, just like regular iterators, except that the next() method returns a Promise. Therefore, await can be used with the for...of loop to run asynchronous operations in a serial manner. For example:
```javascript

 async function process(array) {
 for await (let i of array) {
   doSomething(i);
 }
}
```
## 4.2 template string of non escape sequence

Tags allow you to parse Template Strings with functions. The first parameter of the tag function contains an array of string values. The rest of the parameters are expression dependent. Finally, your function can return the processed string (or it can return something completely different).

```javascript
function foo(str) {
   return str[0].toUpperCase();
}

foo`justjavac`; // Output JUSTJAVAC
foo`Xyz`; // Output XYZ
```

[New features of ES2018: template string of non escape sequence](https://segmentfault.com/a/1190000013519526)

## 4.3 regular expression backward assertion (this article)

Assertion is a test of characters before or after the current matching position. It does not actually consume any characters, so assertion is also called "non consuming matching" or "non obtaining matching".

There are four forms of regular expression assertions:

* (? = pattern) zero width positive lookahead assertion
* (?! pattern) zero width negative lookahead assertion
* (? < pattern) zero width positive look behind assertion
* (? <! Pattern) zero width negative look behind assertion

The pattern in this is a regular expression.

lookahead and lookbehind are translated into:

* Positive negative
* Forward backward
* Forward and reverse
* Forward looking and backward looking
* ......

This document uses forward and reverse.  
[Look behind assertion](https://esnext.justjavac.com/proposal/regexp-lookbehind.html)

## 4.4 regular expression Unicode escape

Generally speaking, the number character interpretation [0-9], the word character is [0-9a-zA-Z], and the blank character includes spaces, carriage returns and other characters, but this is the case in ASCII encoding, not in Unicode encoding.

                                    . Therefore, if you specify that regular expressions use Unicode mode in Python 2 (the simplest way to interpret is to specify the pattern modifier (? u) at the beginning of regular expressions), \ d \ w \ s can match all corner numbers, Chinese characters, and all corner spaces. In this case, it is called the Unicode matching rule in this book; correspondingly, the matching in the previous ASCII encoding is called the ASCII matching rule.  
[Regular expression -- Unicode matching rule](https://blog.csdn.net/antaohui5955/article/details/101500310)

## 4.5 regular expression s/dotAll mode

[Regular expression s/dotAll mode](https://esnext.justjavac.com/proposal/regexp-dotall-flag.html)

## 4.6 regular expression named capture group

```javascript
 const
 reDate = /(?<year[0-9]{4})-(?<month[0-9]{2})-(?<day[0-9]{2})/,
 match  = reDate.exec('2018-04-30'),
 year   = match.groups.year,  // 2018
 month  = match.groups.month, // 04
 day    = match.groups.day;   // 30

const
 reDate = /(?<year[0-9]{4})-(?<month[0-9]{2})-(?<day[0-9]{2})/,
 d= '2018-04-30',
 usDate = d.replace(reDate, '$<month-$<day-$<year');
```

## 4.7 object expansion operator

```javascript
let a = [1,2,3];
let b = [0, ...a, 4]; // [0,1,2,3,4]

let obj = { a: 1, b: 2 };
let obj2 = { ...obj, c: 3 }; // { a:1, b:2, c:3 }
let obj3 = { ...obj, a: 3 }; // { a:3, b:2 }

let object = {
 a: '01', b: '02'
};
let newObject = {
 c: '03',
 ...object
};
console.log(newObject); //{c: "03", a: "01", b: "02"}
```

## 4.8 Promise.finally()

A Promise call chain either successfully reaches the last. then(), or fails to trigger. catch(). In some cases, you want to run the same code no matter whether Promise runs successfully or fails, such as clearing, deleting conversations, closing database connections, etc.

```javascript
 function doSomething() {
 doSomething1()
 .then(doSomething2)
 .then(doSomething3)
 .catch(err = {
   console.log(err);
 })
 .finally(() = {
   // finish here!
 });
}
```    

# 5 new features of ES10 (2019)

* Added the flat() method and flatMap() method of Array
* Added trimStart() method and trimEnd() method of String
* Object.fromEntries()
* Symbol.prototype.description
* String.prototype.matchAll
* Function.prototype.toString() now returns exact characters, including spaces and comments
* JSON⊂ECMAScript
* Simplify try {} catch {} and modify the catch binding
* New basic data type BigInt
* globalThis
* import()
* Legacy RegEx
* Private instance methods and accessors

## 5.1 add the flat() method and flatMap() method of Array

flat() and flatMap() are essentially operations of reduce and concat.  
The flat() method recursively traverses the array at a specified depth, and merges all elements and elements in the traversed sub array into a new array to return.

* The basic function of flat() method is to reduce the dimension of array
* Secondly, we can use the characteristics of the flat() method to remove the empty items of the array

### 5.1.1 flat()

```javascript
 var arr1 = [1, 2, [3, 4]];
arr1.flat(); 
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//Using Infinity as the depth, expand the nested array of any depth
arr3.flat(Infinity); 
// [1, 2, 3, 4, 5, 6]
//Remove null items
var arr4 = [1, 2, , 4, 5];
arr4.flat();
// [1, 2, 4, 5]
```

### 5.1.2 flatMap()

```javascript
var arr1 = [1, 2, 3, 4];
arr1.map(x = [x * 2]); 
// [[2], [4], [6], [8]]
arr1.flatMap(x = [x * 2]);
// [2, 4, 6, 8]
// Only "flatten" the array returned by the function in flatMap
arr1.flatMap(x = [[x * 2]]);
// [[2], [4], [6], [8]]
```

## 5.2 added trimStart() method and trimEnd() method of String

String.trimStart() can be used to remove whitespace from the beginning of a string. String.trimEnd() can be used to remove whitespace from the end of a string.

```javascript
 let  greeting =  "    Hello World";
console.log(greeting.trimStart());// "Hello World"

let greeting = "Hello World    ";
console.log(greeting.trimEnd());// "Hello World"
```

## 5.3 Object.fromEntries()

The function of the Object.entries() method is to return an array of key value pairs of enumerable properties of a given object, which is arranged in the same order as when the for...in loop is used to traverse the object (the difference is that the for in loop also enumerates properties in the prototype chain).

Object.fromEntries() is the inversion of Object.entries().

The Object.fromEntries() function passes in a list of key value pairs and returns a new object with these key value pairs. This iteration parameter should be an object that can implement the @ iterator method and return an iterator object. It generates an array like object with two elements, the first being the value to be used as the attribute key, and the second being the value associated with the attribute key.

* Through Object.fromEntries, Map can be converted to Object:

```javascript
const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }
```

* Through Object.fromEntries, you can convert Array to Object:

```javascript
 const arr = [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ];
 const obj = Object.fromEntries(arr);
 console.log(obj); // { 0: "a", 1: "b", 2: "c" }
```

## 5.4 Symbol.prototype.description

Read only description property, which is a string that returns an optional description of a Symbol object.

```javascript
let mySymbol = `My Symbol`;
let symObj = Symbol(mySymbol);
console.log(symObj) // Symbol(mySymbol);
console.log(String(symObj) === `Symbol(${mySymbol})`); // true
console.log(symObj.description); // "My Symbol"
```

## 5.5 String.protype.matchAll()

The matchAll() method returns an iterator of all the results of matching a string with a regular expression, including the capture group.

```javascript
const string = 'Hexadecimal number:DEADBEEF CAFE'
const regex = '\b\p{ASCII_Hex_digit}+\b/gu'

for(const match of string.match(regex)) {
 console.log(Math)
}
/*
 output
 DEADBEEF
 CAFE
*/
// 2.string.matchAll gives more detailed information about each match
const string = 'Hexadecimal number:DEADBEEF CAFE'
const regex = '\b\p{ASCII_Hex_digit}+\b/gu'

for(const match of string.matchAll(regex)) {
 console.log(Math)
}
/*
output
["DEADBEEF", index: 8, input: "Hexadecimal number: DEADBEEF CAFE", groups: undefind]
["CAFE", index: 17, input: "Hexadecimal number: DEADBEEF CAFE", groups: undefind] 
*/
```

## 5.6 Function.prototype.toString() now returns exact characters, including spaces and comments

The toString() method returns a string representing the source code of the function. In ES6, when toString is called on a function, it returns the string representation of the function according to the ECMAScript engine. If possible, it will return the source code, otherwise - a standardized placeholder.

```javascript
this.fruits = []
function buyFruits(fruit) {
 this.fruits = [...this.fruits, fruit]
}
console.log(buyFruits.toString())

/*
function buyFruits(fruit) {
 this.fruits = [...this.fruits, fruit]
}
*/
```

## 5.7 JSON⊂ECMAScript

In versions prior to ES10, non escaped line separator U+2028 and paragraph separator U+2029 are not accepted.

U+2028 is the paragraph separator.  
U+2029 is the line separator.

let LS = ""
const PS = eval("'\u2029'")

## 5.8 simplify try {} catch {} and modify catch binding

The optional catch binding allows developers to use try/catch in catch blocks without using the error parameter.
```javascript
 // Use before ES2019
try {
 // some code
}catch (err) {
 // error handling code
}

// Now use try / catch like ES2019:
try  {
 // some code
}catch {
 // error handling code
}
```
## 5.9 new basic data type BigInt

BigInt is the seventh primitive type, which is an integer of arbitrary precision. Not just the maximum at 900719925474092.

[13 new features of ES10](https://segmentfault.com/a/1190000020460927)