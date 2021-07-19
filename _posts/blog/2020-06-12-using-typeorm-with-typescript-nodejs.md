---
date: 2020-05-12
title: 'Using TypeORM with Typescript and Node JS🏇🌟'
template: post
featured:  '../thumbnails/node.png'
thumbnail: '../thumbnails/node.png'
slug: TypeORM-with-typescript-and-nodejs
categories:
  - Popular
tags:
  - javascript
  - typescript
  - nodejs
  - mysql
---


# Complete guide to using TypeORM and TypeScript for data persistence in Node.js module

TypeORM is an advanced object-relations-management module that runs in Node.js. As the name implies, TypeORM is meant to be used with TypeScript. In this article we’ll learn about using TypeORM to set up Entity objects to store data in a database, how to use a CustomRepository instance to manipulate a database table, and to use Relations between Entity instances to simulate database joins.

![](https://cdn-images-1.medium.com/max/2374/0*I77m_A0idECSxpbC.png)

To start one must have read the previous two articles in this series:

1. [Choosing TypeScript vs JavaScript: Technology, Popularity](https://itnext.io/choosing-typescript-vs-javascript-technology-popularity-ea978afd6b5f)

1. [How to set up Typescript compiler and editing environment with Node.js](https://medium.com/@7genblogger/how-to-set-up-typescript-compiler-and-editing-environment-with-node-js-68952aebbe1d) ([also on TechSparx](https://techsparx.com/nodejs/typescript/setup.html))

1. [How to create Node.js modules using Typescript](https://techsparx.com/nodejs/typescript/modules-01.html)

*This article was extracted from my book [Quick Start to using Typescript and TypeORM in Node.js applications](https://www.amazon.com/gp/product/B07S87X4ZK/ref=dbs_a_def_rwt_bibl_vppi_i1)*

In this article we’ll create a simple TypeScript module for Node.js to handle storing data in a database for an application. The concept we’re following is a University Registrar office needs a database and corresponding applications to store data about students and offered courses.

Because we’re using TypeScript it is natural to use TypeORM to simplify managing the database. We’ll be creating two entities — *Student* and *OfferedClass* — with a corresponding *CustomRepository* instance for each. The CustomRepository class will provide high level functions for the database.

## Initializing the module package.json and test directory

As we do with all Node.js projects, we first use npm init or yarn init to initialize the directory, and do other initialization.

What we’re initializing is a module to handle the database for this conceptualized University Registrar application. We’ll create the code for that later, at this stage we’re just laying the foundation.

Create a directory ts-example and inside it a directory registrar.

    $ mkdir ts-example
    $ cd ts-example
    $ mkdir registrar
    $ cd registrar
    $ npm init
    .. answer questions

That initializes the package.json.

    $ npm install @types/node --save-dev
    $ npm install typescript ts-node --save-dev
    $ npm install typeorm mysql2 mysql reflect-metadata --save

Most of these packages were discussed in the earlier articles. The typeorm package of course provides the TypeORM library. For this example we'll use SQLite3 to store the database, hence the mysql2 mysql package. Finally the reflect-metadata package is required by TypeORM.

Create a file named tsconfig.json containing:

    {
        "compilerOptions": {
            "lib": [ "es5", "es6", "es7",
                     "es2015", "es2016",
                     "es2017", "es2018",
                     "esnext" ],
            "target": "es2017",
            "module": "commonjs",
            "moduleResolution": "Node",
            "outDir": "./dist",
            "rootDir": "./lib",
            "declaration": true,
            "declarationMap": true,
            "inlineSourceMap": true,
            "inlineSources": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true
        }
    }

This is just a little different than in “[How to create Node.js modules using Typescript](https://techsparx.com/nodejs/typescript/modules-01.html)”. The parameters mean:

* The target line says to output ES2017 code, which we need because that version supports for async/await functions.

* The module line describes the output module format which will be used, commonjs matching the decision to use the CommonJS module format.

* The moduleResolution parameter says to look up modules in node_modules directories just like NodeJS does.

* The outDir parameter says to compile files into the named directory, and the rootDir parameter says to compile the files in the named directory.

* The declaration and declarationMap parameters says to generate declaration files.

* The inlineSourceMap and inlineSources say to generate source-map data inside JavaScript source files.

* The emitDecoratorMetadata and experimentalDecorators are used by TypeORM when generating code.

What that means is our source code will be in lib and TypeScript will compile it into dist.

We have a little change to make in package.json:

    {
      ...
      "main": "dist/index.js",
      "types": "./dist/index.d.ts",
      "type": "commonjs",
      "scripts": {
        "build": "tsc",
        "watch": "tsc --watch",
        "test": "cd test && npm run test"
      },
      ...
    }

The build script simply runs tsc to compile the sources. The test script changes to the test directory to run the test suite.

The main for this package is the generated index module, specifically dist/index.js. With the tsconfig.json shown earlier, TypeScript source is in the lib directory, and therefore the main interface to the module would be in lib/index.ts. The TypeScript compiler compiles lib/index.ts to dist/index.js. The type attribute is new to NodeJS 12.x and lets us declare the kind of modules used in this package. If dist/index.js were instead in the ES6 Module format, the attribute value would be module instead.

The types field declares to the world that this module contains type definitions. It is good form to automatically generate type definitions, which the tsconfig.json file shown earlier does, and then make sure the world knows that type definitions are included.

## Set up test directory

It is useful to create a unit test suite alongside application code. There are many approaches to unit testing, so take this as one person’s opinion.

In the ts-example/registrar directory, create a directory named test and initialize a new package.json.

    $ mkdir test
    $ cd test
    $ npm init
    .. answer questions
    $ npm install chai mocha --save-dev

We’ll use Chai and Mocha to write the tests. Because we’ve configured TypeScript to generate a CommonJS module we’ll just use Mocha in the default way. Mocha currently supports testing CommonJS modules, and using Mocha to test ES6 modules requires jumping through a couple hoops.

Now edit the package.json in the test directory and make it look like so:

    {
        "name": "registrar-test",
        "version": "1.0.0",
        "description": "Test suite for student registrar library",
        "main": "index.js",
        "scripts": {
            "pretest": "cd .. && npm run build",
        },
        "license": "ISC",
        "devDependencies": {
            "chai": "^4.2.0",
            "mocha": "^6.1.4"
        },
        "dependencies": {}
    }

For the Mocha and Chai version numbers, use whatever is the latest. The important thing here is the two scripts. To run the tests we use the mocha command, but before running the tests we want to make sure the source code is rebuilt. Hence the pretest script goes to the parent directory and runs the build script.

Since we haven’t written test code, or application code, we cannot yet run anything. Patience, we’ll be running tests before the end of the article.
