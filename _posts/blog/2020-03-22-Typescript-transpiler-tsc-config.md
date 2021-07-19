---
date: 2020-03-22
title: 'Understanding Typescript Compiler'
template: post
thumbnail: '../thumbnails/ts.png'
slug: Understanding-typescript-compiler
categories:
  - Popular
  - Typescript
  - Javascript
tags:
  - Typescript
  - Javascript
---


# A crash course in TypeScript

![A crash course in TypeScript](https://cms.gabrieltanner.org/content/images/2019/09/typewriter.jpg)

Typescript is a typed superset of javascript which aims to ease the development of large javascript applications. Typescript adds common concepts such as classes, generics, interfaces and static types and allows developers to use tools like static checking and code refactoring.

### Why care about Typescript:

Now the question remains why you should use Typescript in the first place. Here are some reasons why javascript developers should consider learning Typescript.

#### Static typing:

Javascript is dynamically typed which means that it doesn’t know the type of your variable until it instantiates it at run-time which can cause problems and errors in your projects. Typescript adds static type support to Javascript which takes care of bugs that are caused by false assumption of a variable type if you use it right. You still have full control over how strict you type your code or if you even use types at all.

#### Better IDE support:

One of the biggest advantages of Typescript over Javascript is the great IDE support which includes Intellisense, real-time information from the Typescript compiler, debugging and much more. There are also some great extensions to further boost your Typescript development experience.

#### Access to new ECMAScript features:

Typescript gives you access to the newest ECMAScript feature and transcripts them to the ECMAScript targets of your choice. That means that you can develop your applications using the newest tools without needing to worry about browser support.

### When should you use it:

By now we should know why Typescript is useful and where it can improve our development experience. But it is not the solution to everything and certainly doesn’t prevent you from writing terrible code by itself. So let’s take a look at where you should definitely use Typescript.

#### When you have a large codebase:

Typescript is a great addition to large codebase because it helps you prevent a lot of common errors. This especially applies if there are more developers working on a single project.

#### When you and your team already know statically typed languages:

Another obvious situation to use Typescript is when you and your team already know statically typed languages like Java and C# and don’t wanna change to writing Javascript.

### Setup:

To setup typescript, we just need to install it with the npm package manager and create a new typescript file.

    npm install -g typescript

After installing it we can continue looking at the syntax and features typescript provides us with.

TypeScript is available as a package on the npm registry available as "typescript".

You will need a copy of Node.js as an environment to run the package. Then you use a dependency manager like npm, yarn or pnpm to download TypeScript into your project.
```javascript
npm install typescript --save-dev
```
npm yarn pnpm
All of these dependency managers support lockfiles, ensuring that everyone on your team is using the same version of the language. You can then run the TypeScript compiler using one of the following commands:

```javascript
npx tsc

npm yarn pnpm
```
```javascript
interface LabeledValue {
  label: string;
}
function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}
let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```
### running simple .ts file 
```javascript
tsc index.ts
tsc index.ts --target ES2017
tsc index.ts --target ES2017 --module CommonJS
```
You can play around typescript configurations 
#### https://www.typescriptlang.org/play?target=7&module=1



This file will be compiled and we will get ES3 as output, we can pass all other compiler configuration while executing tsc command like 

--target ES2016,ES2017
--module CommonJS 

Other option we can set all these in one tsconfig.json and you can just run ``tsc command``
```json
{
"compilerOptions": {
  "module": "commonjs",
  "target":"ES2017",
  "noImplicitAny": true,
  "outputDir": "dist",
  "removeComments": true,
  "preserveConstEnums": true,
  "sourceMap": true
},
  "files": [
    "index.ts"
  ]
}
```

TS Config all set of options
-----------------------------

Target: ES2017
Module: CommonJS
Strict Checks: true

-  noImplicitAny
  Avoid introducing anys inside your codebase when a type could be specified

-  strictNullChecks
Ensure that nullability is respected in the type checker

- strictFunctionTypes
Ensure that function parameters are consistent

- strictPropertyInitialization
Ensure that all class properties match their types after the constructor has finished

- strictBindCallApply
Ensure that 'call', 'bind' and 'apply' have the right arguments

- noImplicitThis
Raise errors when 'this' would be any

- alwaysStrict
Ensure 'use strict' is always emitted
Linter Checks

- noImplicitReturns
Ensure that all codepaths return in a function

- noUnusedLocals
Error when a local variable isn't read

- noUnusedParameters
Error when a parameter isn't used
Advanced

- useDefineForClassFields
Use define characteristics for handling class fields

- allowUnreachableCode
Error when code will never be called

- allowUnusedLabels
Error when accidentally creating a label

- noEmitHelpers
Assume helpers are available in the global runtime

- noLib
Ignore options from lib

- noStrictGenericChecks
Disable strict checking of generic signatures in functions.

- preserveConstEnums
Do not erase `const enum` declarations in generated code

- checkJs
Run the type checker on .js files in your project

- allowJs
Let TS include .JS files in imports

- declaration
Emit d.ts files for referenced files in the project
Module Resolution

- esModuleInterop
Emit additional JS to ease support for importing commonjs modules
Experimental

- experimentalDecorators
Enable experimental support for TC39 stage 2 decorators

- emitDecoratorMetadata
Adds additional type metadata to decorators in emitted code
tsc index.ts will compiler typescript and we will get ES2017 output with commonJS module system

if you are setting ``declarations: true`` then it will create .d.ts file for the compiled file
```javascript
interface LabeledValue {
    label: string;
}
declare function printLabel(labeledObj: LabeledValue): void;
declare let myObj: {
    size: number;
    label: string;
};
```

### Lets explore now Types in Typescript 

Now let’s take a look at which types are available to us in Typescript.

#### Number:

All numbers in Typescript are floating point values. All of them get the number type including binary and hex values.

    let num: number = 0.222;
    let hex: number = 0xbeef;
    let bin: number = 0b0010;

#### String:

As in other languages, Typescript uses the String Datatype to save textual data.

    let str: string = 'Hello World!';

You can also use a multiline string and embed expressions by surrounding your String with backticks ``

    let multiStr: string = `A simple
    multiline string!`
    let expression = 'A new expression'
    let expressionStr: string = `Expression str: ${ expression }`

#### Boolean:

Typescript also supports the most basic datatype of all, the boolean, which can only be true or false.

    let boolFalse: boolean = false;
    let boolTrue: boolean = true;

### Assigning Types:

Now that we have the basic datatypes down we can look at how you assign types in Typescript. Basically, you just need to write the type of your Variable after the name and a colon.

#### Single Type:

Here is an example where we assign the String data type to our variable:

    let str: string = 'Hello World'

This is the same with all data types.

#### Multiple Types:

You can also assign multiple datatypes to your variables using the | operator.

    let multitypeVar: string | number = 'String'
    multitypeVar = 20

Here we assign two types to our variable using the | operator. Now we can store String and Number in it.

### Checking Types:

Now let’s look at how we can check if our variable has the right type. We have multiple options to do so but here I only show two of the most used.

#### Typeof:

The _typeof_ command only knows about basic datatypes. That means it can only check if the variable is one of the datatypes we defined above.

    let str: string = 'Hello World!'
    if(typeof str === number){
     console.log('Str is a number')
    } else {
     console.log('Str is not a number')
    }

In this example, we create a String variable and use the _typeof_ command to check if str is of type Number (which is always false). Then we print if it is a number or not.

#### Instanceof:

The instanceof operator is almost the same as the typeof except that it can also check for custom types that aren’t already defined by javascript.

    class Human{
     name: string;
     constructor(data: string) {
      this.name = data;
     }
    }
    let human = new Human('Gabriel')
    if(human instanceof Human){
     console.log(`${human.name} is a human`)
    }

Here we create a custom type which we will discuss later on in this post and then create an instance of it. After that, we check if it really is a variable of type Human and print in the console if it is.

### Type Assertions:

Sometimes we will also need to cast our variables to a specific datatype. This often happens when you have assigned a general type like any and you want to use functions of the concrete type.

There are multiple options to go about this problem, but here I just share two of them.

#### As Keyword:

We can easily cast our variable using the as keyword after the name of the variable and follow it up with the datatype.

    let str: any = 'I am a String'
    let strLength = (str as string).length

Here we cast our str variable to String so we can use the length parameter. (Might even work without the cast if your TSLINT settings allow it)

#### <> Operator:

We can also use the <> operator which has exactly the same effect as the keyword with just a syntax difference.

    let str: any = 'I am a String'
    let strLength = (<string>str).length

This code block has exactly the same functionality as the code block above. It only differs syntax-wise.

### Arrays:

Arrays in Typescript are Collections of the same objects and can be created in two different ways.

#### Creating Arrays

**Using []:**

We can define an array of an object by writing the type followed by [] to denote that it is an array.

    let strings: string[] = ['Hello', 'World', '!']

In this example, we create a String array which holds three different String values.

**Using the generic array type:**

We can also define an array using the generic type by writing Array<Type>.

    let numbers: Array<number> = [1, 2, 3, 4, 5]

Here we create a number array which holds 5 different number values.

#### Multitype Arrays:

Furthermore, we can also assign multiple types to a single array using the | operator.

    let stringsAndNumbers: (string | number)[] = ['Age', 20]

In this example, we created an array which can hold string and number values.

#### Multidimensional Array:

Typescript also lets us define multidimensional array which means that we can save an array in another array. We can create a multidimensional array by using multiple [] operators after another.

    let numbersArray: number[][] = [[1,2,3,4,5], [6,7,8,9,10]]

Here we create an array which holds another number’s array.

### Tupels:

Tupels are basically like an array with one key difference. We can define what type of data can be stored in each position. That means that we can enforce types for indexes by enumerating them inside of squared brackets.

    let exampleTuple: [number, string] = [20, 'https://google.com'];

In this example, we create a simple Tuple with a number on index 0 and a string on index 1\. This means that it would throw an error if we try to place another datatype on this index.

Here is an example of an invalid tuple:

    const exampleTuple: [string, number] = [20, 'https://google.com'];

### Enums:

Enums in Typescript like in most other object-oriented programming languages allow us to define a set of named constants. Typescript also provides both numeric and string-based enums. Enums in Typescript are defined using the enum keyword.

#### Numeric:

First, we will look at numeric enums where we match a key value to an index.

    enum State{
     Playing = 0,
     Paused = 1,
     Stopped = 2
    }

Above, we define a numeric enum where Playing is initialized with 0, Paused with 1 and so on.

    enum State{
     Playing,
     Paused,
     Stopped
    }

We could also leave the initializers empty and Typescript would automatically index it starting at zero.

#### String:

Defining a String enum in Typescript is pretty easy — we just need to initialize our values with Strings.

    enum State{
     Playing = 'PLAYING',
     Paused = 'PAUSED',
     Stopped = 'STOPPED'
    }

Here we define a String enum by initializing our States with Strings.

### Objects:

An object in Typescript is an instance which contains a set of key-value pairs. These values can be variables, arrays or even functions. It’s also regarded as the Datatype that represents non-primitive types.

We can create objects by using curly braces.

    const human = {
     firstName: 'Frank',
     age: 32,
     height: 185
    };

Here we create a human object which has three different key-value pairs.

We can also add functions to our object:

    const human = {
     firstName: 'Frank',
     age: 32,
     height: 185,
     greet: function(){
      console.log("Greetings stranger!")
     }
    };

### Custom Types:

Typescript also lets us define custom types called alias that we easily reuse later. To create a custom type we just need to use the type keyword and define our type.

    type Human = {firstName: string, age: number, height: number}

In this example, we define a custom type with the name of Human and three properties. Now let’s look at how we can create an object of this type.

    const human: Human = {firstName: ‘Franz’, age: 32, height: 185}

Here we create an instance of our custom type and set the required properties.

### Function Parameters and return Types:

Typescript enables us to set the types for our function parameters and our return type. Now let’s look at the syntax for defining a function using Typescript.

    function printState(state: State): void {
     console.log(`The song state is ${state}`)
    }

    function add(num1: number, num2: number): number {
     return num1 + num2
    }

Here we have two example functions which both have parameters with defined types. We also see that we define the return type after the closing parentheses.

Now we can call our function like in normal javascript but the compiler will check if we provide the function with the right parameters.

    add(2, 5)
    add(1) // Error to few parameters
    add(5, '2') // Error the second argument must be type number

#### Optinal properties:

Typescript also lets us define optional properties for our function. We can do so using the Elvis ? operator. Here is a simple example:

    function printName(firstName: string, lastName?: string) {
    if (lastName) 
     console.log(`Firstname: ${firstName}, Lastname: ${lastName}`);
    else console.log(`Firstname: ${firstName}`);
    }

In this example the lastName is an optional parameter which means that we will not get an error from the compiler when we don’t provide it calling the function.

    printName('Gabriel', 'Tanner')
    printName('Gabriel')

This means that both of these cases would be regarded as correct.

#### Default values:

The second method we can use to make a property optional is by assigning it a default value. We can do so by assigning the value directly in the head of the function.

    function printName(firstName: string, lastName: string = 'Tanner') {
     console.log(`Firstname: ${firstName}, Lastname: ${lastName}`);
    }

In this example, we assigned a default value to the lastName which means that we don’t need to provide it every time we call the function.

### Interfaces:

Interfaces in Typescript are used to define contracts with our code as well as code outside our project. Interfaces only contain the declarations of our methods and properties, but do not implement them. Implementing the methods and properties is the responsibility of the class that implements the interface.

Let’s look at an example to make these statements a bit clearer:

    interface Person{
     name: string
    }
    const person: Person = {name: 'Gabriel'}
    const person2: Person = {names: 'Gabriel'} // is not assignable to type Person

Here we create an interface with one property which needs to be implemented when we implement the interface. That’s why the second person variable will throw an error.

#### Optional Properties:

In Typescript, not all properties of an interface need to be required. Properties can also be set as optional by using the ? operator after the property name.

    interface Person{
     name: string
     age?: number
    }

    const person: Person = {name: 'Frank', age: 28}
    const person2: Person = {name: 'Gabriel'}

Here we create an interface with one normal and one optional property which is defined by using the ? operator. That’s why we both person initializations are valid.

#### Read-only Properties:

Some properties of our interface should also only be modified when the object is first created. We can specify this functionality by putting the _readonly_ keyword before our property name.

    interface Person{
     name: string
     readonly id: number
     age?: number
    }

    const person: Person = {name: 'Gabriel', id: 3127831827}
    person.id = 200 // Cannot assign to id because it is readonly

In this example, the id property is read-only and can’t be changed after the creation of an object.

### Barrels:

Barrels allow us to rollup several export modules in a single more convenient module.

We just need to create a new file which will export multiple modules of our project.

    export * from './person';
    export * from './animal';
    export * from './human';

After doing so we can import all those modules using a single convenient import statement.

    import { Person, Animal, Human } from 'index';

### Generics:

Generics allow us to create components that are compatible with a wide variety of types rather than a single one. This helps us make our component “open” and reusable.

Now you might be wondering why we don’t just use the any type to accept more than one single type for our component. Let’s look at an example to understand the situation better.

We want a simple dummy function which returns the parameter that was passed to it.

    function dummyFun(arg: any): any {
     return arg;
    }

While any is generic in the way that it accepts all types for the argument it has one big difference. We are losing the information about what type was passed and returned of the function.

So let’s take a look at how we can accept all types while still knowing the type it returns.

    function dummyFun<T>(arg: T): T {
     return arg
    }

Here we used the generic parameter T so we can capture the variable type and use it later. We also use it as our return parameter which allows us to see the corresponding type when we inspect the code.

For a more detailed explanation of generics, you can look at [Charly Poly’s](https://medium.com/u/15f3248b44fe) article about [Generics and overloads](https://medium.com/@wittydeveloper/typescript-generics-and-overloads-999679d121cf).

### Access Modifiers:

Access Modifiers control the accessibility of the member of our classes. Typescript support three access modifiers — public, private and protected.

#### **Public:**

Public members are available from anywhere without any restriction. This is also the standard modifier which means that you don’t need to prefix variables with the public keyword.

#### **Private:**

Private members can only be accessed in the class they are defined.

#### Protected:

Protected members can be accessed only within the class they are defined and every sub/child class.

### TSLINT:

TSLINT is the standard linter for Typescript and can help us write clean, maintainable and readable code. It can be customized with our own lint rules, configurations, and formatters.

#### Setup:

First, we need to install typescript and tslint, we can do so locally or globally:

    npm install tslint typescript --save-dev
    npm install tslint typescript -g

After that, we can use the TSLINT CLI to initialize TSLINT in our project.

    tslint --init

Now that we have our _tslint.json_ file we are ready to start configuring our rules.

#### Configuration:

TSLINT allows use to configure our own rules and customize how our code should look like. By default the tslint.json file look like this and just uses the default rules.

    {
    "defaultSeverity": "error",
    "extends": [
     "tslint:recommended"
    ],
    "jsRules": {},
    "rules": {},
    "rulesDirectory": []
    }

We can add other rules by putting them in the rules object.

    "rules": {
     "no-unnecessary-type-assertion": true,
     "array-type": [true, "array"],
     "no-double-space": true,
     "no-var-keyword": true,
     "semicolon": [true, "always", "ignore-bound-class-methods"]
    },

For an overview of all the available rules you can take a look at the [official documentation](https://palantir.github.io/tslint/rules/).

### Conclusion

You made it all the way until the end! Hope that this article helped you understand the basics of Typescript and how you can use it in your projects.

If you have found this useful, please consider recommending and sharing it with other fellow developers.

If you have any questions or feedback, let me know in the comments down below.
