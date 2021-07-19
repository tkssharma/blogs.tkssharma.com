---
date: 2020-08-12
title: 'NestJS with Knex JS For Database Query'
template: post
thumbnail: '../thumbnails/nestjs.png'
slug: nestjs-with-knex-with-mysql
categories:
  - nestjs
  - testing
  - knex
  - mysql
  - knex query
  - CRUD 
tags:
  - javascript
  - nestjs
  - knex
---
# Using Nest JS with Knex as Query Builder for Database 😻

I have covered a lot of topics for Nestjs In this Post we are gong to talk about Nest js with Knex 

These are different popular ORM library to use with Nest JS 😻

- nestjs with mysql sequelize
- nestjs with postgres sequelize 
- nestjs with mysql typeorm
- nestjs with postgres typeorm
- nestjs with Knex mysql
- nestjs with knex postgres 


Knexjs is a "batteries included" SQL query generator for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle and Amazon Redshift designed to be flexible, portable and fun to use. Features both traditional node-style callbacks and a promised interface for cleaner asynchronous flow control, a flow interface, comprehensive queries and schema builders.

So let's get started by creating the NestJS app 😻.
we can start with nest cli application 
```bash
$ npm i -g @nestjs/cli
```
Then create a NestJS project
```bash
$ nest new app
$ cd app
// start the application
$ npm run start:dev
```
Open the browser on localhost:3000 to verify that hello world is displayed.

then we create a docker-compose.yml file to create the service
MySQL
```yml
version: "3"

services:
   mysql:
     image: mysql:5
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: root
       MYSQL_DATABASE: nest
     ports:
       - "3306:3306"
```       
for those who do not know what docker is I leave the link here for more information Docker


Install KnexModule, Knex and MySQL dependencies
```bash
$ npm install --save nest-knexjs knex mysql
```

In the example I use MySQL but you can also use PostgreSQL or MariaDB to you the choice according to your needs.
Set KnexModule in AppModule
```javascript
import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';

@Module ({
   imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        version: '5.7',
        useNullAsDefault: true,
        connection: {
          host: '127.0.0.1',
          user: 'root',
          password: 'root',
          database: 'nest',
        },
      },
    }),
   ],
})
export class AppModule {}
```

Well, now let's create our first migrations, open Terminal and run the following command:
```bash
  $ npx knex init
```  
A knexfile.js file will be created at the root of the project.

Now let's edit the knexfile.js file with the credentials we entered when registering the module, like so:
```javascript
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'nest',
    },
  },
}
```
from the terminal we run the following command to create our migrations
```bash
$ npx knex migrate:make users
```
once we have created our migration we modify it in this way:
```javascript
exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id');
      table.string('firstName', 255).notNullable();
      table.string('lastName', 255).notNullable();
      table.string('email', 255).unique().notNullable();
    })
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
```
Well, now let's run the following command to upload the migrations to the database:
```bash
$ npx knex migrate:latest
```
Now let's create a REST API and call it users. We open the terminal and run the commands to create the module, the service and the controller for the users:

```bash
$ nest g mo users  # module
$ nest g s users   # service
$ nest g co users  # controller
```
UsersModule:

```javascript
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
```
Before we start building our API, create the Data Transfer Objects (Dto) class to create the users
```javascript
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @Notempty()
    @IsString()
    firstName: string;

    @Notempty()
    @IsString()
    lastName: string;

    @Notempty()
    @IsString()
    @IsEmail()
    email: string;
}
```
Remember to install this package before creating the dto class for the upgrade.
```bash
$ npm i @nestjs/mapped-types
```
Well, now to update the users data we extend the CreateUserDto class:
```javascript
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto){}
We then implement ours UserService:

import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async findAll() {
    const users = await this.knex.table('users');
    return { users };
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const users = await this.knex.table('users').insert({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
      });

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    const users = await this.knex.table('users').where('id', id);
    return { users };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const users = await this.knex.table('users').where('id', id).update({
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
      });

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    const users = await this.knex.table('users').where('id', id).del();
    return { users };
  }
}
```
UsersController:
```javascript
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
```
well now we should have our API tested if everything works perfectly this commands from curl or whatever you prefer to use.
```bash
$ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/users  
$ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/users/:id 
$ curl -H 'content-type: application/json' -v -X POST -d '{"firstName": "firstName #1", "lastName": "lastName #1", "email": "example@nest.it"}' http://127.0.0.1:3000/api/users 
$ curl -H 'content-type: application/json' -v -X PUT -d '{"firstName": "firstName update #1", "lastName": "lastName update #1", "email": "example@nest.it"}' http://127.0.0.1:3000/api/users/:id 
$ curl -H 'content-type: application/json' -v -X DELETE http://127.0.0.1:3000/api/users/:id 
// Last but not least, the use of seeders to create test data, etc.
```
To create a seeder, run the following command from the terminal:
```bash
$ npx knex seed:make users
```
now let's modify it like this:
```javascript
exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          firstName: 'firstName #1',
          lastName: 'lastName #1',
          email: 'example1@nest.it',
        },
        {
          id: 2,
          firstName: 'firstName #2',
          lastName: 'lastName #2',
          email: 'example2@nest.it',
        },
        {
          id: 3,
          firstName: 'firstName #3',
          lastName: 'lastName #3',
          email: 'example3@nest.it',
        },
      ]);
    });
};
```
and run the following command from the terminal:
```bash
$ npx knex seed:run
```

If you see database table then you will see data in table, There are many ways to build application and Knex with Nestjs 
is one of the way, Knex is light weight and easy to build queries not like typeORM with complex relationships and queries 
My personal feeling is Knex is still a good option when we decide what lib to use for ORM/query builders.
