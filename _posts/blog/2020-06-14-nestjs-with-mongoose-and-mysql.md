---
date: 2020-05-14
title: 'Nest js with Mongoos and mysql with TypeORM'
template: post
featured:  '../thumbnails/nestjs.png'
thumbnail: '../thumbnails/nestjs.png'
slug: nestjs-with-typeORM-mongoose-and-mysql-for-api-development
categories:
  - Popular
tags:
  - typescript
  - nodejs
  - nestjs
  - typeorm
---


Nest.js is a progressive Node.js Web Framework that provides you with a robust backend for your frontend applications. It is highly comparable to Angular in terms of concepts like Module, Provider, etc. and is a clear choice by Angular developers.

If you are interested, read more about Nest.js at:

*   [Nest.js official documentation](https://docs.nestjs.com)
*   [Node.js](https://nodejs.org/en/) v10.16.2 or > 10.x
*   [Docker v19.03](https://docs.docker.com/docker-for-mac/)
*   Code editor (Visual Studio Code, Sublime, etc.)

For this article, I've chosen to use the mysql database engine or "mysql". I will run an instance of mysql using a [mysql Docker](https://hub.docker.com/_/mysql) container, which I believe, is the cleanest, and easiest way to add a PostgreSQL database instance to your application.

Start by creating a new `docker-compose.yml` at the root of the Angular app and paste the following content inside it:  

```yaml

#  Run `docker-compose build` to build the images
#  Run `docker-compose up` to run the containers

version: '3.5'
services:
  db:
    image: mysql:5.7
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: test
      MYSQL_USER: root
      MYSQL_PASSWORD: root
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - core_service_network
  mongo:
    image: mongo
    container_name: global-mongo-service
    restart: unless-stopped
    volumes:
      - mongo_data:/data/configdb
      - mongo_data:/data/db
    ports:
      - 27017:27017
    networks:
      - core_service_network  
  apis:
    command: npm run debug
    build: ./api-app
    ports:
      - 3000:3000
      - 5858:5858
    volumes:
      - ./api-app/docker/node/node-docker-entrypoint.sh:/usr/local/bin/docker-entrypoint.sh
      - ./api-app:/app
    env_file:
      ./api-app/.env
    depends_on:
      - mongo  
    networks:
      - core_service_network
networks:
  core_service_network:
    driver: bridge
    name: core_service_network
volumes:
  mysql_data:
    name: mysql_data
  mongo_data:
    name: global_mongo
  apis_modules:
    name: apis_modules

```

My docker file for apis in nestjs

```dockerfile
FROM node:carbon
WORKDIR /app
```

We can configure entrypoint for image bootstrap while initilize
- api-app/docker/node/node-docker-entrypoint.sh


```sh
#!/bin/sh
set -e

npm install
if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ]; then
  set -- node "$@"
fi

exec "$@"
```
This docker-compose file instructs Docker to create a new mysql & node js Docker container with the following settings:

*   The container name is api-app
*   The Docker image mysql
*   Create a new volume by mapping the physical folder named mysql_data to an internal folder inside the image. I will place an initialization script inside this folder so that Docker can run the first time it creates the mysql container.
*   Finally, you expose the mysql instance to the host machine by mapping its internal port to a port used on the host machine 3306 is our port and also we are exposing node js container port which is 3000

As we are passing environments variables for mysql containers, it will create test database with defined user root so we don't need to manually create database and users 

Add the following script under the `script` node inside the `package.json` file:

Finally, run the following command to start the container:

- docker-compose up &
- docker logs apis --tail 50 -f 

This command will create the node js and mysql container in a detached mode.
Now that the mysql database is up and running, let's move on and continue adding more features.

### [](#add-Mongoose-module)Add Mongoose module

Nest supports two methods for integrating with the MongoDB database. You can either use the built-in TypeORM module described here, which has a connector for MongoDB, or use Mongoose, the most popular MongoDB object modeling tool. In this chapter we'll describe the latter, using the dedicated @nestjs/mongoose package.

Start by installing the required dependencies:

```bash
$ npm install --save @nestjs/mongoose mongoose
$ npm install --save-dev @types/mongoose
```
Once the installation process is complete, we can import the MongooseModule into the root AppModule.

To start using TypeORM in the Nest.js application, we need to install a few NPM packages. Run the command:

```javascript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
})
export class AppModule {}
```
## Let's take step back and see all steps one by one 

*   The `MongooseModule` ``@nestjs/mongoose`` package represents the Nest.js wrapper for Mongoose.

Our simple basic tsconfig will look like this
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "strict": true,
    "skipLibCheck": true
  },
  "exclude": ["node_modules", "dist"],
  "include": ["src/**/*.ts"]
}
```    


## [](#build-the-blog-api)Build the Training

Now that the full-stack application is up and running with an active connection to the database, it’s time to start building the Training API.

This next section is a step by step on how to write apis with Monggo DB 

*   Add a new module in Nest.js
*   Add model objects
*   Add a Nest.js service
*   Add a Nest.js controller to test the application.

Let’s get started.
Lets try to see how we were developing apis in node js earlier with Mongoose 

- creating schem Model
- crearting mongo connection with mongo url
- start running query in controller/service to fetch data from Mongo DB using Mongoose library 
- creating express controllers and services and getting data for different api Routes

### [](#add-blog-module)Lets Build simple App

Nest.js framework offers the Nest.js CLI. This component is similar to Angular CLI, or other CLI. The goal of the CLI, is to increase productivity by enhancing the software development process, and make it easier on the developer to add new Nest.js artifacts to the application.

Install the Nest.js CLI globally on your machine by running:

`npm install -g @nestjs/cli`

`nest g module training --no-spec`

The command creates a new Training module under the path `/server/src/blog`. In addition, it also imports this module into the main `app.module.ts` file.  
Add model objects  

We will create the Training entity objects

```javascript
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export const YouTubeSchema = new mongoose.Schema({
        kind: String,
        id: String,
        etag: String,
        contentDetails: mongoose.Schema.Types.Mixed,
        snippet: mongoose.Schema.Types.Mixed,
        status: mongoose.Schema.Types.Mixed,
        created_at: { type: Date, default: Date.now },

    },
);
export interface YouTube extends Document {
    readonly kind: string;
    readonly id: string;
    readonly etag: string;
    readonly contentDetails: object;
    readonly snippet: object;
    readonly description: string;
    readonly status: object;
    readonly created_at: Date;
}
```

## Connecting to Mongo Database 

- we have to follow simple steps to create database Module 
- create controller 
- create services 
- creating root Module to run application 

### Connect to database using Mongoose Module 

We just need connection url and use this module we can connect 
```javascript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
})
export class AppModule {}
```

If we are getting configuration from some other Config Module then we can create dynamic Module for Mongoose and get DB connection 
 - dynamic way of creating Module by injecting services 
 - Config Mofule is providing congiguration
  

```javascript
@Module({})

export class DatabaseModule {

  public static getNoSqlConnectionOptions(config: ConfigService): MongooseModuleOptions {
    const dbdata = config.get().mongo;

    if (!dbdata) {
      throw new CommonConfigError('Database config is missing');
    }
    return dbdata;
  }
  public static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => DatabaseModule.getNoSqlConnectionOptions(configService),
        inject: [ConfigService],
      }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
```
And finally we can use this DatabaseModule in our root Module to provide mongo DB connection, now we can register our schema for mongo db collections using ``MongooseModule.forFeature``
```javascript
  MongooseModule.forFeature(
    [
      { name: 'youtubes', schema: YouTubeSchema }
      { name: 'Training', schema: TrainingSchema }
      { name: 'Videos', schema: VideoSchema }
    ]
  ),

```
Once we are done with Module we can easily get and update data in collections using services and Controllers

- create YouTubeController
- create YouTubeService

### Main Module 
```javascript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../../database/database.module';
import {VideoController} from '../controllers/videoController';
import {YouTubeController} from '../controllers/youtubeController';
import { YouTubeSchema} from './entity/mongoose.entity';
import { YouTubeService } from './services/crud.service';
@Module({
  imports: [
    DatabaseModule.forRoot(),
    MongooseModule.forFeature([{ name: 'youtubes', schema: YouTubeSchema }]),
  ],
  providers: [YouTubeService],
  exports : [YouTubeService],
  controllers: [YouTubeController, VideoController],
})
export class EntityModule {}

```
Now we can acess Mongoose Model in our services to fetch data by Injecting Model in services 
### Model injection
```javascript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { YouTube } from '../entity/mongoose.entity';

@Injectable()
export class  YouTubeService {
  constructor(@InjectModel('youtubes') private youtubeModel: Model<YouTube>) {}

  public async findAll(): Promise<YouTube []> {
  return await this.youtubeModel.find({}).exec();
  }

  public async getVideoById(id: string): Promise<YouTube [] | null> {
    return await this.youtubeModel.find({id}).exec();
  }

  public async findVideoByName(name: string): Promise<YouTube []> {
    return  await this.youtubeModel.find({ title : { $regex: name, $options: 'i' }}).exec();
  }
}
```
We can create Controller to make api calls and get data 
```javascript
@Controller('youtube')
export class YouTubeController {
  constructor(public readonly service: YouTubeService) { }
  @Get()
  public async getHello(@Res() res: Response) {
    const data =  await this.service.findAll();
    res.status(HttpStatus.OK).json({
      data,
      code: 200,
      message: 'successfully fetched data',
      success: true,
    });
  }

  @Get(':name')
  public async getYoutubeByName(@Param() params: YouTubeParams, @Res() res: Response) {
   const data =  await this.service.findVideoByName(params.name);
   res.status(HttpStatus.OK).json({
    data,
    code: 200,
    message: 'successfully fetched data',
    success: true,
  });
  }
}
```
You can look more about Mongo DB here 
https://docs.nestjs.com/techniques/mongodb 

In this simple application if we want to add redis service just to cahce some data then we can use redis-nestjs Module which is good enough for our needs or we can create nestjs microservices for redis client.

# NestJS with Mysql and TypeORM

This is same kind of setup as Mongo DB only change we will see is Mongo DB will be replaced with MySQL with TypeORM

```bash
npm install mysql2 --save
```

We have to bootstrap mysql configuration for TypeORM, it can be done by writing a database module which will just have config module injecting database details in it. It will be a dynamic initilization of a module

```javascript
import { DynamicModule, Module, NotImplementedException } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigDBData } from '../config/config.interface';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { CommonConfigError } from './common.error';
import { DbConfig } from './db.interface';

@Module({})
export class DatabaseModule {
  public static getConnectionOptions(config: ConfigService, dbconfig: DbConfig): TypeOrmModuleOptions {
    const dbdata = config.get().db;
    console.log(config);
    let connectionOptions: TypeOrmModuleOptions;

    if (!dbdata) {
      throw new CommonConfigError('Database config is missing');
    }
    switch (dbdata.type) {
        case  'mysql':
          connectionOptions = this.getConnectionOptionsMysql(dbdata);
          break;
        // any other BD check  
          break;
          default:
            throw new NotImplementedException(`Database type '${dbdata.type}' not supported`);
      }
    return {
        ...connectionOptions,
        entities: dbconfig.entities,
        // synchronize: true,
        logging: true,
      };
  }
  private static getConnectionOptionsMysql(dbdata: ConfigDBData): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: dbdata.host,
      port: dbdata.port,
      username: dbdata.user,
      password: dbdata.pass,
      database: dbdata.name,
      charset: dbdata.charset,
      extra: {
        collate: dbdata.collate,
        dialect: dbdata.dialect,
      },
    };
  }
  public static forRoot(dbconfig: DbConfig): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => DatabaseModule.getConnectionOptions(configService, dbconfig),
          inject: [ConfigService],
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
```
Entities are similar as we were writing with TypeORM, we need to initlize typeORM module by passing all these database entities

```javascript
import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Contact} from '../interface/contact';

@Entity()
export default class ContactEntity implements Contact {

    @PrimaryGeneratedColumn()
    public id: number;

    @PrimaryColumn()
    @Column({
        nullable: false,
        length: 500,
        unique: true,
    })
    public name: string;

    @PrimaryColumn()
    @Column({
        unique: true,
        nullable: false,
    })
    public email: string;

    @Column({
        unique: true,
        nullable: false,
    })
    public phone: string;

    @CreateDateColumn()
    public createdAt;

    @UpdateDateColumn()
    public updatedAt;
}
```

While initlizing TypeORM Module we are passing set of entities in DB connection only ``entities`` will be bootstrapped with database connection

```javascript
 imports: [
    TypeOrmModule.forRootAsync({
      entities: dbconfig.entities,
      // synchronize: true,
      logging: true,
      type: 'mysql',
      host: dbdata.host,
      port: dbdata.port,
      username: dbdata.user,
      password: dbdata.pass,
      database: dbdata.name,
      charset: dbdata.charset,
      extra: {
        collate: dbdata.collate,
        dialect: dbdata.dialect,
      },
  })
```

Now we can create contact APIs using controllers and services 

```javascript
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactDto} from '../module/dto/'
import { ContactService } from '../module/services/contact.service';
@Controller('/')
export class ContactController {
  constructor(private readonly contactservise: ContactService){

  }
  @Get('/health')
  getHealthCheck() {
    return {
      status: 'ok'
    };
  }
  @Post('/contact')
  async createContacts(@Body() conatctDto: ContactDto) {
    return this.contactservise.create(conatctDto);
  }

  @Get('/contact')
  async getListOfcontacts() {
    return this.contactservise.findAll();
  }
}
```

Services will access ContactRepository to access DB Table

```javascript
import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ContactEntity from '../entity/contact.entity';
import { Repository } from 'typeorm';
import * as path from 'path';
import { ContactDto } from '../dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
  ) {}

  findAll(): Promise<ContactEntity []> {
    return this.contactRepository.find();
  }

  async create(data: ContactDto): Promise<ContactEntity> {
    try {
    const exisitngContact = await this.findOneByEmail(data.email);
    console.log(exisitngContact);
    if (exisitngContact) {
      throw new BadRequestException('Contact already Exist');
    }
    const contact = new ContactEntity();
    contact.email = data.email;
    contact.phone = data.phone;
    contact.name = data.name;
    return  await this.contactRepository.save(contact);
    } catch (err) {
     throw new BadRequestException(err);
    }
  }

  async findOne(id: string): Promise<ContactEntity> {
    return this.contactRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<ContactEntity> {
    return await this.contactRepository.findOne({ email });
  }

  async remove(id: string): Promise<void> {
    await this.contactRepository.delete(id);
  }
}
```
These are basic Contact APIs which are is getting data from Mysql tavle using Contect Repo, Basic HTTP GET APIs to fetch and create new Contacts

## Conclusion 👨‍🏫

Nest is an excellent framework, and I love working with it. In my opinion, it is even one of the best things that happened to server-side JavaScript development

Examples to explore More 
https://github.com/tkssharma/blog