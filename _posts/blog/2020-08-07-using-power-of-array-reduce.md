---
date: 2020-08-07
title: 'array reduce a powerful method in Array'
template: post
thumbnail: '../thumbnails/js.png'
slug: array-reduce-a-powerful-function
categories:
  - javascript
  - array
  - es6
tags:
  - javascript
  - array
---


### Most powerful method in javascript is Array.prototype.reduce

```javascript
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array) {
  return accumulator + currentValue
})
```

### Lets Explore more about array.reduce

The reducer function takes four arguments:

- Accumulator
- Current Value
- Current Index
- Source Array
  
Your reducer function's returned value is assigned to the accumulator, whose value is remembered across each iteration throughout the array, and ultimately becomes the final, single resulting value.

Array Reduce is a method that exists on the Array.prototype that was introduced in ECMAScript 5 (ES5) and is supported in all modern browsers.

Array.reduce method is always misunderstood by developers and some of them are limited to just getting sum of the array but its is more then that, its most powerful method in Array.prototype which can be used to do all different things.

Example : -

1. Getting sum of an array 
2. concat an array 
3. merge array 
4. flatten nested arrays 
5. grouping values 
6. chaining promises (Important one)
7. iterate async promises 
8. many more ....

You can also check link from MDN on Array.reduce 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

```
Think of Array Reduce as: “I want to reduce my array to just a single value”
```
Now example for this is getting sum of array elements, its taking n numbers from array and returning one value,
Similarly merging, concat array will return single value that can be array, object or simple primitive value like boolean, number, string

### Understand Reduce function 

```
// Arrow function
reduce((accumulator, currentValue) => { ... } )
reduce((accumulator, currentValue, index) => { ... } )
reduce((accumulator, currentValue, index, array) => { ... } )
reduce((accumulator, currentValue, index, array) => { ... }, initialValue)
```

We just need to understand all these parameters

- accumulator
- currentValue
- index
- array
- initialValue 

```javascript
const reduced = [1, 2, 3, 4, 5].reduce((acc, currentValue, index, array) => {
  console.log(acc, currentValue);
  return acc + currentValue;
}, 0);
```
if we see what we are getting in console.log

```javascript
0   1   // acc = 0, currentValue = 1 result (1 + 0)  1 first array item
1   2   // 1  = acc currentValue = 2 result (1 + 2)    2 = second array item
3   3   // 3  = acc result (3 + 3)    3 = third array item
... so on 
```

```javascript
[1, 2, 3, 4, 5].reduce((acc, currentValue, index, array) => {
  // TODO
}, 0);
```
Lets talk about definition of each arguments

#### accumulator
```javascript
(acc, currentValue, index, array) => {
  // accumulates value and return 
}
```
The accumulator accumulates callbackFn's return values. It is the accumulated value previously returned in the last invocation of the callback—or initialValue, if it was supplied (see below).
####  currentValue
The current element being processed in the array.
####  index Optional
The index of the current element being processed in the array. Starts from index 0 if an initialValue is provided. Otherwise, it starts from index 1.
####  array Optional
The array reduce() was called upon.

So overall its same as any other method like Array.map or filter having same type of callback but the purpose is different 

```
Array.prototype.map(callBackFunction)
Array.prototype.reduce(callBackFunction)
```
#### callbackFn function example 

```javascript
const callbackFn = (accumulator, currentValue, index) => {
  // return something here
}
const result = array.reduce(callbackFn, initialValue)
```
#### Example summing numbers

```javascript
const numbers = [1, 2, 3, 4, 5]
Here’s the code to sum the numbers.

const total = numbers.reduce((acc, currentValue) => acc + currentValue, 0)
console.log(total) // 15
```

In the above example initial value is 0 and acc will be initialized with 0 and number will be array index[0]
value 

```javascript
0   1   // acc = 0 same as initial value, currentValue = 1 result (1 + 0)  1 first array item
// after first iteration acc become 1 and passed to next iteration
1   2   // 1  = acc currentValue = 2 result (1 + 2)    2 = second array item
3   3   // 3  = acc result (3 + 3)    3 = third array item
... so on 
```

### More Complex Example and use-cases

```javascript
const fruits = ['apple', 'apple', 'banana', 'banana', 'orange', 'pear', 'apple']

// What you want
// {
//   apple: 3,
//   banana: 2,
//   orange: 1,
//   pear: 1
// }
```

Here we want to return object as a single value with count of each and every fruits 
- accumulator will become empty object and initial value 
- fruit or current value will be come first value of array 
- we have written logic just to check if fruit is in object then ++ count or assign value 1
```javascript
const tally = fruits.reduce((accumulator, fruit) => {
  if (accumulator[fruit]) {
    accumulator[fruit] = accumulator[fruit] + 1
  } else {
    accumulator[fruit] = 1
  }

  return accumulator
}, {})
```
#### Example-3

Getting Max data from string array 

```javascript
const dates = [
  '2019/06/01',
  '2018/06/01',
  '2019/09/01', // This is the most recent date, but how to find it?
  '2018/09/01'
].map(v => new Date(v));

// This works because you can compare JavaScript dates using `>` and `<`.
// So `a > b` if and only if `a` is after `b`.
const maxDate = dates.reduce((max, d) => d > max ? d : max, dates[0]);

```

#### Example-4

```javascript
const persons = [
  { name: 'Jean-Luc Picard', age: 59 },
  { name: 'Will Riker', age: 29 },
  { name: 'Deanna Troi', age: 29 }
];
```
How do you return a map that contains how many characters have a given age? For example, the correct output on the above array would be { 29: 2, 59: 1 }.

Here's how you can do that with reduce().

```javascript
// Start with an empty object, increment `map[age]` for each element
// of the array.
const reducer = (map, val) => {
  if (map[val] == null) {
    map[val] = 1;
  } else {
    ++map[val];
  }
  return map;
};
persona.map(char => char.age).reduce(reducer, {});
```

#### Example-5 [reduce as filter]

```javascript
const euro = [29.76, 41.85, 46.5];

const above30 = euro.reduce((total, amount) => {
  if (amount > 30) {
    total.push(amount);
  }
  return total;
}, []);

above30 // [ 41.85, 46.5 ]
```

#### Example-6 Reduce as Flat method

```javascript
const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

const flat = data.reduce((total, amount) => {
  return total.concat(amount);
}, []);

flat // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

### Silly Mistakes to avoid

If you don’t pass in an initial value, reduce will assume the first item in your array is your initial value. This worked fine in the first few examples because we were adding up a list of numbers.


