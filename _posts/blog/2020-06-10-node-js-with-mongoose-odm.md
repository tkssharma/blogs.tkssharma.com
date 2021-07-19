---
date: 2020-05-10
title: 'Node JS with Mongoose ODM 🌟'
template: post
featured:  '../thumbnails/node.png'
thumbnail: '../thumbnails/node.png'
slug: Node-JS-with-Mongoose
categories:
  - Popular
tags:
  - javascript
  - js
  - typescript
---


# Node JS with Mongoose ODM

- Repo for My Blog Articles on Different Topics 🔭 🎯🎺 Node JS, Angular, React, NestJS and All About Javascrip]
- (https://github.com/tkssharma/blogs/tree/master/express-mongoose-strarter)

![nestjs](https://img.youtube.com/vi/_iR4Pt4fLwE/0.jpg)(http://www.youtube.com/watch?v=_iR4Pt4fLwE "module")

![nestjs](https://img.youtube.com/vi/yHPpC-xe3So/0.jpg)(http://www.youtube.com/watch?v=yHPpC-xe3So "module")

## What ORM/ODM should I use? (from MDN)
[Express Tutorial Part 3: Using a Database (with Mongoose)

*In this article, we've learned a bit about databases and ORMs on Node/Express, and a lot about how Mongoose schema and…*developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)

There are many ODM/ORM solutions available on the NPM package manager site (check out the [odm](https://www.npmjs.com/browse/keyword/odm) and [orm](https://www.npmjs.com/browse/keyword/orm) tags for a subset!).

A few solutions that were popular at the time of writing are:

* [Mongoose](https://www.npmjs.com/package/mongoose): Mongoose is a [MongoDB](https://www.mongodb.org/) object modeling tool designed to work in an asynchronous environment.

* [Waterline](https://www.npmjs.com/package/waterline): An ORM extracted from the Express-based [Sails](http://sailsjs.com/) web framework. It provides a uniform API for accessing numerous different databases, including Redis, MySQL, LDAP, MongoDB, and Postgres.

* [Bookshelf](https://www.npmjs.com/package/bookshelf): Features both promise-based and traditional callback interfaces, providing transaction support, eager/nested-eager relation loading, polymorphic associations, and support for one-to-one, one-to-many, and many-to-many relations. Works with PostgreSQL, MySQL, and SQLite3.

* [Objection](https://www.npmjs.com/package/objection): Makes it as easy as possible to use the full power of SQL and the underlying database engine (supports SQLite3, Postgres, and MySQL).

* [Sequelize](https://www.npmjs.com/package/sequelize) is a promise-based ORM for Node.js and io.js. It supports the dialects PostgreSQL, MySQL, MariaDB, SQLite, and MSSQL and features solid transaction support, relations, read replication and more.

* [Node ORM2](https://node-orm.readthedocs.io/en/latest/) is an Object Relationship Manager for NodeJS. It supports MySQL, SQLite, and Progress, helping to work with the database using an object-oriented approach.

* [GraphQL](https://graphql.org/): Primarily a query language for restful APIs, GraphQL is very popular, and has features available for reading data from databases.

First of all, there is a huge difference between relationships in MongoDB and those in SQL based datastores (you need to be clear about this from the get-go).

Relationships in MongoDB are just representations of related data. There is no mechanism which maintains the integrity of these relationships.

What mongoose does with refs is just use the field having the ref option to query the _id field of documents in the referenced collection. This is used for operations like [populate](http://mongoosejs.com/docs/populate.html) (which internally calls findById queries on the target collection and replaces the referenced field with the documents).

This being cleared, you can store one or many IDs for the referenced collection in the field, thus creating one-to-one or one-to-many “relationships”.

These videos in this Blog talks about how can we manage relationship using mongoose in Mongo DB database to store and fetch data in defined structure.

* one to one

* one to many

* many to many relationships

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/_iR4Pt4fLwE" frameborder="0" allowfullscreen></iframe></center>
