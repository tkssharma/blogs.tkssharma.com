---
date: 2020-08-04
title: 'ORM Libraries for Node JS API development 2021'
template: post
thumbnail: '../thumbnails/node.png'
slug: nodejs-orm-libraries-for-api-development
categories:
  - orm
  - nodejs
  - typeORM
  - sequelize
  - knex
  - mysql
tags:
  - mysql
  - prisma
  - sequelize
  - postgres
---


## ORM Libraries for Node JS API development

![Prisma ORM for Node.js is ready for production](https://images.idgesg.net/images/article/2019/02/abstract_data_coding_matrix_structure_network_connections_by_peshkova_gettyimages-897683944_2400x1600-100788487-large.jpg)

- https://github.com/tkssharma/nodejs-db-orm-world
- https://www.youtube.com/watch?v=riTpEByIPAI&list=PLIGDNOJWiL18aYxcuxbDheTFs4v2rosBf
  
[![](http://img.youtube.com/vi/GzoRFdNiGo8/0.jpg)](http://www.youtube.com/watch?v=GzoRFdNiGo8 "")

### ORM - Object relational Mapping 

Object–relational mapping (ORM, O/RM, and O/R mapping tool) in computer science is a programming technique for converting data between incompatible type systems using object-oriented programming languages. This creates, in effect, a "virtual object database" that can be used from within the programming language. There are both free and commercial packages available that perform object–relational mapping, although some programmers opt to construct their own ORM tools.

In object-oriented programming, data-management tasks act on objects that are almost always non-scalar values. For example, consider an address book entry that represents a single person along with zero or more phone numbers and zero or more addresses. This could be modeled in an object-oriented implementation by a "Person object" with an attribute/field to hold each data item that the entry comprises: the person's name, a list of phone numbers, and a list of addresses. The list of phone numbers would itself contain "PhoneNumber objects" and so on. Each such address-book entry is treated as a single object by the programming language (it can be referenced by a single variable containing a pointer to the object, for instance). Various methods can be associated with the object, such as methods to return the preferred phone number, the home address, and so on.

## Choosing an ORM

Choosing an ORM or query builder for your Node.js app can be daunting. There are many different libraries that allow you to query and manipulate data from your JavaScript application, and each varies in its design and level of abstraction.

This article is meant as a jumping-off point for choosing a library and summarizing data that a developer would look up before picking a tool for their project. It attempts to remain objective and make as few value judgments as possible.

It does not attempt to choose "one best library" or rank packages in an opinionated fashion. Instead, it summarizes the most popular Node.js query builders, ORMs, and database toolkits and describes their project health. This is done using criteria like popularity, repo activity, developer support, and project maturity.


### SQL, Query Builders, and ORMs

Libraries to query and manipulate data can broadly be grouped into three categories, each operating at a different level of abstraction.

From lowest to highest these are:

Database drivers, clients and connectors, like node-postgres
Query builders, like Knex.js that operate at a level above database clients and allow you to write JavaScript code to manipulate and query data
Object-relational mapping tools (ORMs) like Sequelize and database toolkits like Prisma that allow the developer to work with models, abstract entities that correspond to database tables
Many tools blur the lines between these and allow the developer to drop down to lower levels when additional flexibility or control is necessary. To learn more, please consult Comparing SQL, query builders, and ORMs from Prisma’s Data Guide.

#### Benefits of ORMs
There are different reasons why developers choose to use ORMs:

- ORMs facilitate implementing the domain model. The domain model is an object model that incorporates the behavior and data of your business logic. In other words, it allows you to focus on real business concepts rather than the database structure or SQL semantics.
- ORMs help reduce the amount of code. They save you from writing repetitive SQL statements for common CRUD (Create Read Update Delete) operations and escaping user input to prevent vulnerabilities such as SQL injections.
- ORMs require you to write little to no SQL (depending on your complexity you may still need to write the odd raw query). This is beneficial for developers who are not familiar with SQL but still want to work with a database.
- Many ORMs abstract database-specific details. In theory, this means that an ORM can make changing from one database to another easier. It should be noted that in practice applications rarely change the database they use.
As with all abstractions that aim to improve productivity, there are also drawbacks to using ORMs.

### Lets talk about all these ORM's 

### Prisma and How Prisma is Different

To answer the question briefly: Yes, Prisma is a new kind of ORM that fundamentally differs from traditional ORMs and doesn't suffer from many of the problems commonly associated with these.

Traditional ORMs provide an object-oriented way for working with relational databases by mapping tables to model classes in your programming language. This approach leads to many problems that are caused by the object-relational impedance mismatch.

Prisma works fundamentally different compared to that. With Prisma, you define your models in the declarative Prisma schema which serves as the single source of truth for your database schema and the models in your programming language. In your application code, you can then use Prisma Client to read and write data in your database in a type-safe manner without the overhead of managing complex model instances. This makes the process of querying data a lot more natural as well as more predictable since Prisma Client always returns plain JavaScript objects.

In this article, you will learn in more detail about ORM patterns and workflows, how Prisma implements the Data Mapper pattern, and the benefits of Prisma's approach.


### Knex 

A SQL query builder that is flexible, portable, and fun to use!

A batteries-included, multi-dialect (MSSQL, MySQL, PostgreSQL, SQLite3, Oracle (including Oracle Wallet Authentication)) query builder for Node.js, featuring:

```javascript
import { Knex, knex } from 'knex'

interface User {
  id: number;
  age: number;
  name: string;
  active: boolean;
  departmentId: number;
}

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './data.db',
  },
};

const knexInstance = knex(config);

try {
  const users = await knex<User>('users').select('id', 'age');
} catch (err) {
  // error handling
}
```

### sequelize 
Sequelize is a promise-based ORM for Node.js and io.js. It supports the dialects PostgreSQL, MySQL, MariaDB, SQLite and MSSQL and features solid transaction support, relations, read replication and more.

Installation
```javascript
// Example usage
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password');

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

sequelize.sync().then(function() {
  return User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
}).then(function(jane) {
  console.log(jane.get({
    plain: true
  }));
});
```

Sequelize is available via NPM.

$ npm install --save sequelize

# And one of the following:

```sh
$ npm install --save pg pg-hstore
$ npm install --save mysql // For both mysql and mariadb dialects
$ npm install --save sqlite3
$ npm install --save tedious // MSSQL
```
##### Setting up a connection

Sequelize will setup a connection pool on initialization so you should ideally only ever create one instance per database.

```javascript
var sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: 'path/to/database.sqlite'
});

// Or you can simply use a connection uri
var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
```

### TypeORM 

TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8). Its goal is to always support the latest JavaScript features and provide additional features that help you to develop any kind of application that uses databases - from small applications with a few tables to large scale enterprise applications with multiple databases.

TypeORM supports both Active Record and Data Mapper patterns, unlike all other JavaScript ORMs currently in existence, which means you can write high quality, loosely coupled, scalable, maintainable applications the most productive way.

TypeORM is highly influenced by other ORMs, such as Hibernate, Doctrine and Entity Framework.

With TypeORM your models look like this:
```javascript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
```
And your domain logic looks like this:
```javascript
const repository = connection.getRepository(User);

const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
user.age = 25;
await repository.save(user);

const allUsers = await repository.find();
const firstUser = await repository.findOne(1); // find by id
const timber = await repository.findOne({ firstName: "Timber", lastName: "Saw" });

await repository.remove(timber);
```

#### Installation
Install the npm package:
```sh
npm install typeorm --save
# You need to install reflect-metadata shim:
npm install reflect-metadata --save
#and import it somewhere in the global place of your app (for example in app.ts):
import "reflect-metadata";
#You may need to install node typings:
npm install @types/node --save-dev
```

### Setting up Prisma 

#### What is Prisma?

Prisma is a **next-generation ORM** that consists of these tools:

- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Auto-generated and type-safe query builder for Node.js & TypeScript
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Declarative data modeling & migration system
- [**Prisma Studio**](https://github.com/prisma/studio): GUI to view and edit data in your database

Prisma Client can be used in _any_ Node.js or TypeScript backend application (including serverless applications and microservices). This can be a [REST API](https://www.prisma.io/docs/understand-prisma/prisma-in-your-stack/rest), a [GraphQL API](https://www.prisma.io/docs/understand-prisma/prisma-in-your-stack/graphql) a gRPC API or anything else that needs a database.

> **Are you looking for Prisma 1? The Prisma 1 repository has been renamed to [`prisma/prisma1`](https://github.com/prisma/prisma1)**.

#### Getting started

The fastest way to get started with Prisma is by following the [**Quickstart (5 min)**](https://www.prisma.io/docs/getting-started/quickstart-typescript).

The Quickstart is based on a preconfigured SQLite database. You can also get started with your own database (PostgreSQL and MySQL) by following one of these guides:

- [Add Prisma to an existing project](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project-typescript-postgres)
- [Setup a new project with Prisma from scratch](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-postgres)

#### How does Prisma work

This section provides a high-level overview of how Prisma works and its most important technical components. For a more thorough introduction, visit the [Prisma documentation](https://www.prisma.io/docs/).

#### The Prisma schema

Every project that uses a tool from the Prisma toolkit starts with a [Prisma schema file](https://www.prisma.io/docs/concepts/components/prisma-schema). The Prisma schema allows developers to define their _application models_ in an intuitive data modeling language. It also contains the connection to a database and defines a _generator_:

```prisma
// Data source
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Generator
generator client {
  provider = "prisma-client-js"
}

// Data model
model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields:  [authorId], references: [id])
  authorId  Int?
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
```

In this schema, you configure three things:

- **Data source**: Specifies your database connection (via an environment variable)
- **Generator**: Indicates that you want to generate Prisma Client
- **Data model**: Defines your application models

---

#### The Prisma data model

On this page, the focus is on the data model. You can learn more about [Data sources](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-sources) and [Generators](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/generators) on the respective docs pages.

##### Functions of Prisma models

The data model is a collection of [models](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#defining-models). A model has two major functions:

- Represent a table in the underlying database
- Provide the foundation for the queries in the Prisma Client API

#### Getting a data model

There are two major workflows for "getting" a data model into your Prisma schema:

- Generate the data model from [introspecting](https://www.prisma.io/docs/concepts/components/introspection) a database
- Manually writing the data model and mapping it to the database with [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)

Once the data model is defined, you can [generate Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client/generating-prisma-client) which will expose CRUD and more queries for the defined models. If you're using TypeScript, you'll get full type-safety for all queries (even when only retrieving the subsets of a model's fields).

---

#### Generating Prisma Client

The first step when using Prisma Client is installing its npm package:

```
npm install @prisma/client
```

Note that the installation of this package invokes the `prisma generate` command which reads your Prisma schema and _generates_ the Prisma Client code. The code will be located in `node_modules/.prisma/client`, which is exported by `node_modules/@prisma/client/index.d.ts`.

After you change your data model, you'll need to manually re-generate Prisma Client to ensure the code inside `node_modules/.prisma/client` get updated:

```
prisma generate
```

Refer to the documentation for more information about ["generating the Prisma client"](https://www.prisma.io/docs/concepts/components/prisma-client/generating-prisma-client).

#### Using Prisma Client to send queries to your database

Once Prisma Client was generated, you can import in your code and send queries to your database. This is what the setup code looks like.

##### Import and instantiate Prisma Client

You can import and instantiate Prisma Client as follows:

```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
```

or

```js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
```

Now you can start sending queries via the generated Prisma Client API, here are few sample queries. Note that all Prisma Client queries return _plain old JavaScript objects_.

Learn more about the available operations in the [Prisma Client docs](https://www.prisma.io/docs/concepts/components/prisma-client) or watch this [demo video](https://www.youtube.com/watch?v=LggrE5kJ75I&list=PLn2e1F9Rfr6k9PnR_figWOcSHgc_erDr5&index=4) (2 min).

##### Retrieve all `User` records from the database

```ts
// Run inside `async` function
const allUsers = await prisma.user.findMany()
```

##### Include the `posts` relation on each returned `User` object

```ts
// Run inside `async` function
const allUsers = await prisma.user.findMany({
  include: { posts: true },
})
```

##### Filter all `Post` records that contain `"prisma"`

```ts
// Run inside `async` function
const filteredPosts = await prisma.post.findMany({
  where: {
    OR: [
      { title: { contains: 'prisma' } },
      { content: { contains: 'prisma' } },
    ],
  },
})
```

##### Create a new `User` and a new `Post` record in the same query

```ts
// Run inside `async` function
const user = await prisma.user.create({
  data: {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: { title: 'Join us for Prisma Day 2021' },
    },
  },
})
```

##### Update an existing `Post` record

```ts
// Run inside `async` function
const post = await prisma.post.update({
  where: { id: 42 },
  data: { published: true },
})
```

https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-postgres

### Notes 
- full playlist is coming on these ORM with Node JS 
- https://www.youtube.com/watch?v=riTpEByIPAI&list=PLIGDNOJWiL18aYxcuxbDheTFs4v2rosBf

### Conclusion
Finally its developers choice if they want to use ORM or ORM only for Migration and seeders
I still have different opinion on using ORM, I would like to go simple with query builder like knex js and write your custom complex raw queries.
ORM's are just layer on top of your database client interface they may become complex for complex data structure and there is always limitation when we use ORMs
