---
date: 2020-02-16
title: 'Node JS API Backend ORM Type ORM & Sequelize '
template: post
thumbnail: '../thumbnails/node.png'
slug: nodejs-orm-sequelize-typeorm
categories:
  - Popular
  - NodeJS
tags:
  - NodeJS
  - TypeORM
---

### Sequelize vs TypeORM: What are the differences?


Developers describe Sequelize as "Easy-to-use multi sql dialect ORM for Node.js & io.js". Sequelize is a promise-based ORM for Node.js and io.js. It supports the dialects PostgreSQL, MySQL, MariaDB, SQLite and MSSQL and features solid transaction support, relations, read replication and more. On the other hand, TypeORM is detailed as "An ORM that can run in NodeJS and others". It supports both Active Record and Data Mapper patterns, unlike all other JavaScript ORMs currently in existence, which means you can write high quality, loosely coupled, scalable, maintainable applications the most productive way.

Sequelize belongs to "Object Relational Mapper (ORM)" category of the tech stack, while TypeORM can be primarily classified under "Microframeworks (Backend)".

Sequelize and TypeORM are both open source tools. Sequelize with 19.2K GitHub stars and 3.01K forks on GitHub appears to be more popular than TypeORM with 13.9K GitHub stars and 1.75K GitHub forks.

According to the StackShare community, Sequelize has a broader approval, being mentioned in 38 company stacks & 33 developers stacks; compared to TypeORM, which is listed in 6 company stacks and 7 developer stacks.


TypeORM
-------
It supports both Active Record and Data Mapper patterns, unlike all other JavaScript ORMs currently in existence, which means you can write high quality, loosely coupled, scalable, maintainable applications the most productive way.

Sequelize
---------
Sequelize is a promise-based ORM for Node.js and io.js. It supports the dialects PostgreSQL, MySQL, MariaDB, SQLite and MSSQL and features solid transaction support, relations, read replication and more.


# Introduction to TypeORM

TypeORM is an ORM that I use in Nest.js apps with SQL databases. In this article, I want to show you how to start using TypeORM in a plain Node.js app. We’ll take the starter project from TypeORM documentation and extend it to a blog. If you carry through to the end, you’ll find out about:

1. Launching a starter project

1. Creating an entity — model for database table

1. Custom columns’ types

1. Operations: create, read, update, delete

1. One-to-many and many-to-many relation

1. Validation

1. Custom repositories

1. VSC snippets

## Launching a starter project

Firstly we have to install typeORM globally and create a sample project with these two commands:

    npm install typeorm -g
    typeorm init --name MyProject --database mysql   //I use Mysql

Now we move on to MyProject folder and install dependencies usingnpm install.

This is how the folder structure looks:

    -- node_modules
    -- src 
       -- entity
          -- User.ts
       -- migrations
       -- index.ts
    -- ormconfig.json

The next step is connecting our app to a database in ormconfig.json file. We only need to fill up gaps such as username, password and database.

    ...
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "blogapi",   //name of my database
    ...

## Creating an entity

Now let’s look at the entity folder. In this folder there are files which describe how to create database tables. So if we want to add a new table to the database we define it in a new entity file in this folder. For example, we have the User.ts containing the model which creates the User table. Next step is adding @Entity decorator before class. Then we also need to add @Column decorators before each model property. Columns’ types in the database are inferred from the property types we will use. To illustrate, a number will be converted into a MySQL integer and string into MySQL varchar. @PrimaryGeneretedColumn decorator applies the key auto-generation. The key is id in this case.

    import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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

### Creating the User table in the database

index.js includes logic that will be executed after npm start. The code is depicted below.

    import { createConnection } from "typeorm";

    createConnection().then(async connection => {

    ...

    }).catch(error => console.log(error));

createConnection() method automatically finds ormconfig.json file and connect our app to the database. After a successful connection in then block, we have access to the connection object which has methods allowing for connecting to tables and making operations on them. 
By the way, every new entity creates a table in a database.

We only have the User entity so npm start creates a User table.

## Custom columns’ types

If we want to specify column type in the database we can do this in a @Column decorator.

    @Column("varchar", { length: 200 })

This creates a varchar column with a length of 200.

More column types can be found in typeORM documentation.

## Operations: create, read, update, delete

Now we can write some CRUD operations. We will use therepository approach. Each entity has its own repository which handles all operations on this entity. We can create our custom operation and we’ll do this later. Let’s see this in examples.

### Create

    let user = new User();
    user.firstName = "Kuba";
    user.lastName = "Wolanin";
    user.age = "24";

    let userRepository = connection.getRepository(User);

    await userRepository.save(user);

    console.log("User has been saved");

### Read

    let userRepository = connection.getRepository(User);
    let users = await userRepository.find();
    console.log("All users: ", users);

    let user = await userRepository.findOne(5);

    console.log("User with id 5: ", user);

### Update

    let userToUpdate = await userRepository.findOne(1);
    userToUpdate.name = "Jakub";

    await userRepository.save(userToUpdate);

### Delete

    let userToRemove = await userRepository.findOne(1);

    await userRepository.remove(userToRemove);

## One-to-many relation

To learn about relations we’ll create Post and Photo entities as below.

Post.ts :

    import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

    @Entity()
    export class Post {
       @PrimaryGeneratedColumn()
       id: number;

       @Column()
       name: string;

       @Column()   
       text: string;
    }

Photo.ts :

    import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

    @Entity()
    export class Photo {
       @PrimaryGeneratedColumn()
       id: number;

       @Column()
       name: string;

       @Column()   
       link: string;
    }

Now let’s create one-to-many relation because one User can have many posts. We move on to User.ts file where we add @OneToMany decorator. The first argument is the entity that we want to use and it is required by TypeORM to pass Post type as a type => Post. The second argument tells that we’ll create author property in Post entity that will determine the post owner and author will respond to User. The posts property of User is an array of Post that’s why we use Post[] type.

    import { Post } from "./Post";

       ...

       @OneToMany(type => Post, post => post.author) 
       posts: Post[];
    }

In Post, we have to add an inverse side of the relation so this is @ManyToOne.

    import { User } from "./User";

       ...

       @ManyToOne(type => User, user => user.posts)
       user: User;

After running npm start we can check out the ER diagram that we have this relation created in our database.

## Many-to-many relation

Let’s assume that posts can have many photos, but the same photo can belongs to many Posts. This means that we have to add @ManyToMany decorator that will connect Posts with Photos.

    import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";

    @Entity()
    export class Posts {

       ...

       @ManyToMany(type => Photo, photo => photo.post)
       @JoinTable()
       photos: Photo[];
    }

Now let’s add the inverse side of our relation to the Photo class. 
@JoinTable is required to specify that this is the owner side of the relation.

    export class Photo {
       
       ...

       @Column()
       link: string;
       @ManyToMany(type => Photo, photo => photo.posts)
       posts: Post[];
    }

After npm start we can see that in the database a new table was created and this is a junction table which contains ids of photos and posts.

### INSERT TO TABLES

    import "reflect-metadata";
    import { createConnection } from "typeorm";
    import { User } from "./entity/User”;
    import { Post } from "./entity/Post";
    import { Photo } from "./entity/Photo";

    createConnection().then(async connection => {
       let postRepository = connection.getRepository(Post);
       let photoRepository = connection.getRepository(Photo);
       
       let firstPhoto = new Photo();
       firstPhoto.link = 'http:/firstPhoto';
       await photoRepository.save(firstPhoto);
       let secondPhoto = new Photo();
       secondPhoto.link = 'http:/secondPhoto';
       await photoRepository.save(secondPhoto);
       
       let post = new Post();
       post.name = 'Title';
       post.photos = [firstPhoto, secondPhoto];
       postRepository.save(post);

    }).catch(error => console.log(error));

### FIND

When we want to find records from the database with their information about posts we just need to add {relations:['posts']}.

    let photoRepository = connection.getRepository(Photo);
    let photo = await photoRepository.findOne(5, {relations:['posts']});
    console.log(photo);

## Validation

It is important to validate data that comes from outside of an app to ensure that only proper data formats will fill the database. Typeorm recommended using class-validator which provide decorators which we between @Column decorator and entity property.

    npm install class-validator --save

Below example validate age property to have integer value in a range of 18–100.

    import {validate, Contains, IsInt, Length, IsEmail, IsDate, Min, Max} from "class-validator";

    ...

    @Column()
    @IsInt()
    @Min(18)
    @Max(100)
    age: number;

    ...

Now before saving data, we can use the validate method that returns errors in the case when our data are not valid. We can prevent saving and return these errors in response.

    import { validate } from "class-validator";

    let userRepository = connection.getRepository(User);
    let user = new User();
    user.age = 12;
    const errors = await validate(user);

    if (errors.length > 0) {
       throw new Error(`Validation failed!`);
    } else {
       let savedUser = await userRepository.save(user);
       console.log(savedUser);
    }

## Custom repositories

We used find() and findOne() methods like in code below.

    let users = await userRepository.find();
    console.log("All users: ", users);

    let user = await userRepository.findOne(5);

In this section, we going to create our custom method findByName() which can find a user by first and second name. Firstly let’s create a new folder repository and UserRepository.ts file in it. An important part of this is that we extend UserRepository with Repository class which has find(), findOne() and other methods.

    import {EntityRepository, Repository} from "typeorm"; 
    import {User} from "../entity/User";

    @EntityRepository(User) 
    export class UserRepository extends Repository<User> {
       findByName(firstName: string, lastName: string) {
          return this.findOne({ firstName, lastName });     
       }
    }

And now we can import UserRepository class and use our customfindByName() method or other build-in methods like find().

    import {getCustomRepository} from "typeorm"; 
    import {UserRepository} from "./repository/UserRepository"; 

    const userRepository = getCustomRepository(UserRepository); 

    await userRepository.save(user); 
    const timber = await userRepository.findByName('Jakub', 'Wolanin');

## VSC snippet

If we install the Vscode NestJs Snippets extension we can use:

* n-typeorm-entity which is entity boilerplate.

* n-typeorm-repository which is repository boilerplate.

I hope my article will be handy for you and it will help you to start with your first project. If you have any questions, feel free to leave a comment.
