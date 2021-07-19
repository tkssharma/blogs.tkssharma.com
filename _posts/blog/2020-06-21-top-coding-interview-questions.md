---
date: 2020-05-21
title: 'Top Coding Interview Questions String/Array'
template: post
featured:  '../thumbnails/js.png'
thumbnail: '../thumbnails/js.png'
slug: top-coding-interview-questions
categories:
  - Popular
tags:
  - k8s
  - coding
  - javascript
  - interview
---

# Top Coding Interview Questions


- How do you reverse a given string in place? (solution)
- How do you print duplicate characters from a string? (solution)
- How do you check if two strings are anagrams of each other? (solution)
- How do you find all the permutations of a string? (solution)
- How can a given string be reversed using recursion? (solution)
- How do you check if a string contains only digits? (solution)
- How do you find duplicate characters in a given string? (solution)
- How do you count a number of vowels and consonants in a given string? (solution)
- How do you count the occurrence of a given character in a string? (solution)
- How do you print the first non-repeated character from a string? (solution)
- How do you convert a given String into int like the atoi()? (solution)
- How do you reverse words in a given sentence without using any library method? (solution)
- How do you check if two strings are a rotation of each other? (solution)
- How do you check if a given string is a palindrome? (solution)
- How do you find the length of the longest substring without repeating characters? (solution)
- Given string str, - How do you find the longest palindromic substring in str? (solution)
- How to convert a byte array to String? (solution)
- How to remove the duplicate character from String? (solution)
- How to find the maximum occurring character in given String? (solution)
- How do you remove a given character from String? (solution)

Most Common Solutions 

```javascript
// lot of things can be solvd by just gettig map of a string characters
const map ={};
const string = "Hello World";
const array = string.split("");
array.forEach(i => map[i] ? map[i] = map[i] + 1 : map[i] = 1);
console.log(map)
```


```javascript
// lot of things can be solvd by just gettig map of a string characters
const string = "hello world";
const removeDups = [... new Set(string.split(""))].join("")
```

```javascript
// Remove char from String
const removeChar = (string, char) {
    return string.split("").filter(i => i !== char).join("");
}
```
- How to find the maximum occurring character in given String? (solution)

```javascript

const getMaxChar = (string) => {
    const map = {};
    string.split("").forEach(char => {
        map[char] = map[char] ? map[char] + 1 : 1;
    });
    max = 1;
    char = string[0]
    for(let k in map){
        if(map[k] > max) {
            max = map[k];
            char = k
        }
    }
    return char;
}
console.log(getMaxChar("hello world"));
```

- How do you remove a given character from String? (solution)
```javascript
const removeChar = (string, char) => {
    return string.split("").filter(i => i !== char).join("")
}
console.log(removeChar("hello world",'h'));

```

How do you find the length of the longest substring without repeating characters?

```javascript
var lengthOfLongestSubstring = function(s) {
    let count = 0;
    let i = 0;
    let j = 0;
    let n = s.length;
    let set = new Set();
    while (i < n && j < n) {
        let char = s.charAt(j);
        if(!set.has(char)) {
            set.add(char);
            j++;
            count = Math.max (count, j - i);
        } else {
            set.delete(s.charAt(i));
            i++;
        }
    }
    return count;
};

let result = lengthOfLongestSubstring('abcabcbb')
console.log(result);

```
- How do you check if a given string is a palindrome

```javascript

const mapOfString = str => {
 const map ={};
 str.split("").forEach(i => map[i] = map[i] ? map[i] + 1: 1);
 return map;
} 
const checkPalindrome = (string1, string2) => {
   const mapObject1 = mapOfString(string1);
   const mapObject2 = mapOfString(string2)
   if(mapObject1.length !== mapObject2.length){
       return false;
   }
   for(let i in mapObject1){
       if(mapObject1[i] !== mapObject2[i]){
           return false;
       }
   }
   return true;
}
console.log(checkPalindrome("ffsss","sfsf"));

```
- How do you reverse a given string in place? (solution)
```javascript
"helloWorld".split("").reverse().join("");
```
- How do you print duplicate characters from a string? (solution)

```javascript
const mapOfString = str => {
    const map ={};
    str.split("").forEach(i => map[i] = map[i] ? map[i] + 1: 1);
    return map;
   } 
   const duplicateString = str => {
    const arr =[];
    const obj = mapOfString(str)
    for(let j in obj){
        if(obj[j] > 1){
            arr.push(j)
        }
    }
    return arr.join("")
   }
   console.log(duplicateString("wefdwd"));
```
- How do you find all the permutations of a string? (solution)
```javascript
let findPermutations = (string) => {
    if (!string || typeof string !== "string"){
      return "Please enter a string"
    } else if (string.length < 2 ){
      return string
    }
  
    let permutationsArray = [] 
     
    for (let i = 0; i < string.length; i++){
      let char = string[i]
  
      let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length)
  
      for (let permutation of findPermutations(remainingChars)){
        permutationsArray.push(char + permutation) }
    }
    return permutationsArray
  }
```


 - How do you find the missing number in a given integer array of 1 to 100? (solution)
 - How do you find the duplicate number on a given integer array? (solution)
 - How do you find the largest and smallest number in an unsorted integer array? (solution)
 - How do you find all pairs of an integer array whose sum is equal to a given number? (solution)
 - How do you find duplicate numbers in an array if it contains multiple duplicates? (solution)
 - How to remove duplicates from a given array in Java? (solution)
 - How do you search a target value in a rotated array? (solution)
 - Given an unsorted array of integers, find the length of the longest consecutive elements sequence? (solution)
 - How is an integer array sorted in place using the quicksort algorithm? (solution)
 - How do you remove duplicates from an array in place? (solution)
 - How do you reverse an array in place in Java? (solution)
 - How are duplicates removed from an array without using any library? (solution)
 - How to convert a byte array to String? (solution)
 - What is the difference between an array and a linked list? (answer)
 - How do you perform a binary search in a given array? (solution)
 - How to find a median of two sorts arrays? (solution)
 - How to rotate an array left and right by a given number K? (solution)
 - How do you find duplicates from an unsorted array? (solution)
 - Given an array of integers sorted in ascending order, find the starting and ending position of a given value? (solution)
 - Given an integer array, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum? (solution)
