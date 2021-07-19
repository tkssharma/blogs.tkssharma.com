---
date: 2020-08-06
title: 'dotenv Module for managing runtime environments '
template: post
thumbnail: '../thumbnails/dotenv.png'
slug: dotenv-for-managing-nodejs-runtime
categories:
  - nodejs
  - dotenv
  - javascript
  - dotenv-cli
tags:
  - nodejs
  - dotenv
---


Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

Dotenv Module will help us to populate runtime configuration during runtime, like populating mysql connection details while starting up mysql connection with nodejs, or providing mongodb connection url while starting application 
Its minimal configuration we just need to have .env file in root of the application and `require('dotenv').config()` it will populate all .env variables in process.env object

So all required configuration gets populated to process.env and application runs as expected.

### What is Environment Variables
Environment variables are supported out of the box with Node and are accessible via the env object (which is a property of the process global object.)
To see this in action, you can create your own environment variable right in the Node REPL by appending a variable to the process.env object directly.

For example, you can create a simple env variable like process.env.LUGGAGE_COMBO=“12345”.
Here we have added LUGGAGE_COMBO to env object in process now this variable can be accessed by node js process

```
# with npm
npm install dotenv

# or with Yarn
yarn add dotenv
```

Usage
As early as possible in your application, require and configure dotenv.

```javascript
require('dotenv').config()
```

Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE. For example:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
```
process.env now has the keys and values you defined in your .env file.
```javascript
const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})
```

## do not commit .env

always keep .env.example or env.dist, env.test files to just explain what all variables application will need, never commit original .env file put this in .gitignore 

## dotenv-cli

This is another helpful module which can help us to pass different configuration for dev and test 
Example lets say we have .env and .env.test files and for running tests we want to pass test configurations in code so using NPM scripts we can pass test configurations and tests will run on test database configuration 

```
 "test:unit": "dotenv -e .env.testing -- npm run test:unit",
  "test:e2e": "dotenv -e .env.testing -- npm run test:e2e",
```

## Installing

NPM
```bash
$ npm install -g dotenv-cli
```

Yarn
```bash
$ yarn global add dotenv-cli
```

## Usage

```bash
$ dotenv <command with arguments>
```

This will load the variables from the .env file in the current working directory and then run the command (using the new set of environment variables).

### Custom .env files
Another .env file could be specified using the -e flag:
```bash
$ dotenv -e .env2 <command with arguments>
```

Multiple .env files can be specified, and will be processed in order:
```bash
$ dotenv -e .env3 -e .env4 <command with arguments>
```