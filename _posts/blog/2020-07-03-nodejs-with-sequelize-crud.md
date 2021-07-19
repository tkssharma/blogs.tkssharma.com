---
date: 2020-06-03
title: 'Node JS CRUD Using Sequelize ORM Mysql 💻 🎯'
template: post
featured:  '../thumbnails/node.png'
thumbnail: '../thumbnails/node.png'
slug: nodejs-crud-using-sequelize-and-mysql
categories:
  - Popular
tags:
  - nodejs
  - mysql
  - nodejs
  - crud apis
---

# Create CRUD Application in Node js with sequelize

https://www.youtube.com/watch?v=MnljgIYwiaI&list=PLIGDNOJWiL1-OJp8ZWBO2838ENa0tsy6H&ab_channel=FaztCodeFaztCode

We create a simple APIs in Node js ( Node js Framework, express Framework and using sequelize). In this story, we will create a CRUD (Create, Read, Update, Delete) APIs. If you are new in the Node js and want to learn how to create the basic server and create a basic APIs in Node js, so please read my medium story.

## Let’s start building the project:-

Creating a Folder we run the* below command *in the command prompt where you want to create the project folder.

    mkdir curd
    cd curd

## Create a project in Node:-

If you are new to Node js and doesn’t know how to create a project in Node.js, For creating a project we run the* below command *in the command prompt where you want to create the project.

    npm init

## Installing the modules.

    $ npm i express sequelize mysql validator body-parser dotenv

1. Express: Express is modular web framework for node js. Used as a web application framework.

1. Sequelize : The sequelize is an Object relational mapping used to map an object syntax onto our database schemas.

1. Mysql: Mysql is a relational database with the scalability and flexibility that you want with the querying and indexing that you need

1. Validator: This library validates and sanitizes strings only.

1. Body-parser: Extract the entire body portion of an incoming request stream and exposes it on req.body.

1. Dotenv: Dotenv is a zero-dependancy module that loads environment variables from a .env file into process.env .

## Here’s how our package.json will look like:
```json
    {
    "name": "curd1",
    "version": "1.0.0",
    "description": "Curd operation with node js using sequelize",
    "main": "server.js",
    "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "start": "nodemon"
    },
    "author": "Arvind Kumar",
    "license": "ISC",
    "dependencies": {
        "body-parser": "^1.19.0",
        "config": "^3.3.1",
        "dotenv": "^8.2.0",
        "express": "^4.17.1",
        "express-validator": "^6.6.1",
        "jsonwebtoken": "^8.5.1",
        "mysql": "^2.18.1",
        "nodemon": "^2.0.4",
        "sequelize": "^6.3.4",
        "sql": "^0.78.0"
        }
    }
```
## Configure the DataBase:-

We have to create a database in mysql.

Creating a database in your local server. we run the* below command *in the command prompt. you want to create the database.
```sql
    CREATE DATABASE dbname;
```
Creating a database table we run the* below command *in the command prompt. you want to create the database table.
```sql
    USE dbname;

    CREATE TABLE `users` (
      `id` INT(10) NOT NULL AUTO_INCREMENT,
      `name` VARCHAR(50) DEFAULT NULL,
      `address` VARCHAR(100) DEFAULT NULL,
      'mobile_number' int(10)DEFAULT NULL,
      PRIMARY KEY (`id`)
    )
```
We are creating a .env file where we can store all our database information.
```bash
    HOST=localhost
    DB_USER=(database user name)
    DB_PASSWORD=(database password)
    DB=(database name)
```
We have to create a file .app/models/db.js under the root project.

import the mysql & sequelize module in the file.
```javascript
    const mysql = require("mysql");
    const Sequelize = require('sequelize');
    require('dotenv').config()
    //Sequelize connection

    var connection = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
       host: process.env.HOST,
       port: 3306,
       dialect: 'mysql'
    });
    module.exports = connection;
```
Now we create index.js file to connect with the database.
```javascript
    const sequelize = require("../models/db.js");
    const Sequelize = require('sequelize');
    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    db.userModel = require("../models/user.model.js")(sequelize, Sequelize);
    module.exports = db;
```
## Creating the model:-

We create a new file inside ./models/user.model.js & import the required modules:
```javascript
    module.exports = (sql, Sequelize) => {
    }
```
Now we will create the user’s schema (Schema defines the structure of the data)
```javascript
    const User= sql.define('tests', {
       name: {
         type: Sequelize.STRING
       },
       address: {
         type: Sequelize.STRING
       },
       mobile_number: {
         type: Sequelize.STRING
       }
    },
    {
       timestamps: false
    });
    return User
```
## Route the request:-

The router is used to define the interaction with APIs and used to send and receive the requests from the server.

We create the file ./routers/user.routes.js

Now, we have to route the request post user data.
```javascript
    app.post("/user",users.createUser);
```
we create the function for user data save in database.

```javascript
    static createUser = async (req, res) => {
    try {
        const userDetails = await UserModel.create({
            name: req.body.name,
            address: req.body.address,
            mobile_number: req.body.mobile_number,
        });
        res.status(200).send({
            status: 200,
            message: 'Data Save Successfully',
            data: userDetails
        });
    }
    catch (error) {
        return res.status(400).send({
            message: 'Unable to insert data',
            errors: error,
            status: 400
        });
    }
}
```
Now we have to route the request fetch user data.
```javascript
    app.get("/user/:id",users.getUser);
```
We create the function for user data find in database.
```javascript
   static getUser = async (req, res) => {
    try {
        const userDetails = await UserModel.findOne({ where: { id: req.params.id } });
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: userDetails
        });
    }
    catch (error) {
        return res.status(400).send({
            message: 'Unable to fetch data',
            errors: error,
            status: 400
        });
    }
}
```
we have to route the request Update user data.
```javascript
    app.put("/user/:id",users.updateUser);
```
We create the function for user data Update in database.
```javascript
   static getUser = async (req, res) => {
    try {
        const updateUser =await UserModel.update({
          name: req.body.name,
          dateofbirth: req.body.dateofbirth,
          address: req.body.address,
          mobile_number: req.body.mobile_number,
     },
     {where: {id: req.params.id} });
     return res.status(201).send({
        user: userDetails,
        status: 200
    });
    }
    catch (error) {
        return res.status(400).send({
            message: 'Unable to update data',
            errors: error,
            status: 400
        });
    }
}
```
We have to route the request Delete user data.
```javascript
    app.delete("/delete/:id",users.deleteUser);
```
We create the function for user data Delete in database.
```javascript
static getUser = async (req, res) => {
    try {
        const userDetails =  await UserModel.destroy({
            where: { id: id }
         });
    }
    catch (error) {
        return res.status(400).send({
            message: 'Unable to update data',
            errors: error,
            status: 400
        });
    }
}
```

## Create server.js file.

This is the updated server.js file. In this file, we added the routes of REST APIs, active body-parser and sequelize.
```javascript
const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
const app = express();
app.use(bodyParser.json());
require("./app/routes/user.routes.js")(app);
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})
```

Now, we create a final user.controller.js there contain all function.

## All Route the request :-
```javascript
    const userController = require("../controllers/user.controller.js");
    module.exports = app => {
       app.post("/user",userController.createUser);
       app.get("/user/:id",userController.getUser);
       app.put("/update/:id",userController.updateUser);
       app.delete("/user/:id",userController.deleteUser);
    };
```
## Conclusion:-

This is the best explanatory medium story of how to create *REST APIs* in Node*.js* with the help of Sequelize.

For the ref. of the above code [here](https://github.com/tkssharma/Sequelize-Tutorials-Node-JS-ORM).
