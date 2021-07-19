---
date: 2020-04-13
title: 'Nestjs handbook for developer Beginners'
template: post
featured:  '../thumbnails/nestjs.png'
thumbnail: '../thumbnails/nestjs.png'
slug: nestjs-handbook-for-developers
categories:
  - Popular
tags:
  - Graphql
  - nestjs
  - nodejs
  - express
---
# Nestjs crash course

If you have ever worked with Node js or Express you have properly realized how tedious and haunting it can be to maintain and scale your applications.

This is where Nest js comes into place. It uses modern development tools like Typescript and provides an out-of-the-box application architecture which allows developers and teams to create highly testable, scalable, loosely coupled, and easily maintainable applications.

Under the hood, Nest makes use of powerful and robust HTTP Frameworks like Express and Fastify. It provides an abstraction layer over these APIs but can also expose their APIs directly to us developers.

In this post, we will take a look at the most important concepts of Nest js and even build a little CRUD application at the end.

So, without wasting any further time, let’s get started.

### Why care about Nestjs

Now the question remains why you should use Nestjs in the first place. Here are some reasons why Node js developers should consider switching to Nestjs.

#### Type checking:

Nestjs is based upon Typescript which enables us developers to add types to our variables and provides compile errors and warnings based on them. Typescript also provides a lot of other great benefits to us javascript developers which you can find out more about in this [crash course](https://gabrieltanner.org/blog/typescript-crash-course).

#### Dependency injection:

Dependency injection is a design pattern which is used to increase the efficiency and modularity of our applications. It’s often used to keep code clean and easy to read and use. Nestjs provides it out of the box and even makes it easy to use it for creating coupled components.

#### Application architecture:

Nestjs projects have a predefined structure providing best practices for testability, scalability and maintainability. Nonetheless, it is still really flexible and can be changed if needed.

#### Testable:

Nestjs provides a full Jest testing configuration out of the box but still allows us developers to use other testing tools as we see fit.

Now that we have an overview of why Nestjs is useful and where it can improve our development experience let’s take a look at the most important concepts and building blocks of this framework.

### Modules

Modules are the basic building block of each Nestjs application and are used to group related features like controllers and services together. They are Typescript files decorated with the @Module() decorator.

<figure class="kg-card kg-image-card kg-card-hascaption">![Nestjs Module structure](https://cms.gabrieltanner.org/content/images/2019/09/Nestjs-modules.jpg)

<figcaption>Nestjs Module structure</figcaption>

</figure>

Each application needs to have at least one module, the so called root module. The root module is the starting point of the application and is auto-generated when starting a project. In theory, we could write our whole application inside this module but it is advisable to break a large application down into multiple modules to help maintenance and readability.

It is recommended and normal practice to group each feature into their own module for example an UserModule and an ItemModule.

A simple module example:

    @Module({
      controllers: [ItemController],
      providers: [ItemService],
    })
    export class ItemModule {}

### Controllers

In Nestjs controllers are responsible for handling incoming requests and returning responses to the client. They are defined using the @Controller() declarator which takes the path for the primary route as its argument.

<figure class="kg-card kg-image-card kg-card-hascaption">![Controller structure](https://cms.gabrieltanner.org/content/images/2019/09/Nestjs-controllers.jpg)

<figcaption>Controller structure</figcaption>

</figure>

Each function inside the controller can be annotated with the following declarators:

*   @Get() — Defines a get request
*   @Post() — Defines a post request
*   @Delete() — Delete request
*   @Put() — Put request

Here is an example of a simple controller with one get route:

    @Controller('item')
    export class ItemController {
      @Get()
      findAll(): string {
        return 'Returns all items';
      }
    }

Note: After creating the controller it needs to be added to a module so Nestjs can recognize it (This happens automatically when you generate it using the Nest CLI).

### Providers

Providers in Nestjs also referred to as services are used to encapsulate and abstract the logic of other classes like controllers. They can be injected into other classes using dependency injection.

<figure class="kg-card kg-image-card kg-card-hascaption">![Provider relationships](https://cms.gabrieltanner.org/content/images/2019/09/Nestjs-providers.jpg)

<figcaption>Provider relationships</figcaption>

</figure>

A provider is a normal Typescript class with an @Injectable() declarator on the top.

For example, we can easily create a service which fetches all our items and use it in our _ItemController_.

    @Injectable()
    export class ItemService {
      private readonly items: Item[] = [{ title: 'Great item', price: 10 }];

      create(item: Item) {
        this.items.push(item);
      }

      findAll(): Item[] {
        return this.items;
      }
    }

Now that we have defined our service let’s use it in our controller:

    @Controller('item')
    export class ItemController {
      constructor(private readonly itemService: ItemService) {}

      @Get()
      async findAll(): Promise<Item[]> {
        return this.itemService.findAll();
      }
    }

### Lifecycle

Every Nest application element has its own lifecycle which is composed of a variety of lifecycle hooks that can be used to provide visibility of these key states and the ability to act when they occur.

#### Lifecycle events:

Here are the four lifecycle sequences:

*   OnModuleInit — Called once the host module has been initialized
*   OnApplicationBootstrap —  Called once the application has fully started and is bootstrapped
*   OnModuleDestroy — Cleanup just before Nest destroys the host module
*   OnApplicationShutdown — When the application gets shut down

#### Usage:

Each of these four lifecycle hooks is represented by an interface. That means that we just need to implement the interface in our component (class) and override the function.

Here is an simple example of the OnModuleInit interface:

    import { Injectable, OnModuleInit } from '@nestjs/common';

    @Injectable()
    export class ItemService implements OnModuleInit {
      onModuleInit() {
        console.log(`The module has been initialized.`);
      }
    }

### Pipes

Pipes in Nestjs are used to operate on the arguments of the controller route handler. This gives them two typical use cases:

*   transformation —  transform input data to the desired output
*   validation —  evaluate if the input data is valid

#### Usage:

Pipes can be created by implementing the PipeTransform interface on our class and overriding the transform function. Let’s look at a simple example of a custom ValidationPipe:

    import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

    @Injectable()
    export class CustomValidationPipe implements PipeTransform {
      transform(value: any, metadata: ArgumentMetadata) {
       const { metatype } = metadata;
       if (!metatype) {
         return value;
       }
       const convertedValue = plainToClass(metatype, value);
       return convertedValue;
      }
    }

In this example we check if the metatag we provided isn’t empty and if so we converted the received data to the metatype we defined.

### Testing

Nestjs provides us with a full setup of the Jest testing framework which makes it easy to get started with unit, integration and end-to-end tests.

Before you start testing I would recommend being familiar with the testing pyramid and other best practices like the KISS (Keep it simple stupid) technique.

#### Unit tests:

Now let’s look at a simple unit test for the _ItemService_ we defined above.

    import { Test } from '@nestjs/testing';
    import { ItemService } from './item.service';

    describe('ItemService', () => {
      let service: ItemService;

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [ItemService],
        }).compile();

        service = module.get<ItemService>(ItemService);
      });

      it('should be defined', () => {
        expect(service).toBeDefined();
      });
    });

In this example we use the Test class provided by Nestjs to create and get our Service through the compile() and get() functions. After that we just write a simple test that checks if the service is defined.

Note: In order to mock a real instance, you need to override an existing provider with a custom provider.

#### End-to-end testing:

End-to-end test helps us test the whole functionality of our API and how our small units work together. End-to-end testing makes use of the same setup we use for unit testing, but additionally takes advantages of the [supertest](https://github.com/visionmedia/supertest) library which allows us to simulate HTTP requests.

    describe('Item Controller (e2e)', () => {
      let app;

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [ItemModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();
      });

      it('/ (GET)', () => {
        return request(app.getHttpServer())
          .get('/item')
          .expect(200)
          .expect([{ title: 'Great item', price: 10 }]);
      });
    });

Here we send a HTTP request to the endpoint we created earlier and check if it returns the right response code and data.

### Getting started

Nestjs provides its own nice CLI (command line interface) which can be used to create projects, modules, services and more. We can install it using the node package manager(npm) and the following command.

    npm i -g @nestjs/cli

After that, we should be able to create a new project using the new command.

    nest new project-name

Now that we have the CLI installed let’s start building a simple CRUD application using Nestjs and MongoDB.

### CRUD example

As stated earlier in this post, we will create a simple CRUD application using Nestjs and MongoDB as our database. This will help you to really get a good grasp of the core concepts of Nest.

#### Creating the project:

First, let’s create the project using the command we talked about above.

    nest new mongo-crud

After that let’s move into the generated directory and start our development server.

    // Move into the directory
    cd mongo-crud
    // Start the development server
    npm run start:dev

Npm run start:dev uses Nodemon to run the application which means that it automatically updates the page when you save the project.

Now that we have entered these commands we should see a “Hello World!” message on our http://localhost:3000.

#### Generating the files:

Next up we need to create all the files needed for this project. Let’s start by generating the standard Nestjs files using the CLI.

    nest generate module items
    nest generate controller items
    nest generate service items

After that, we just need to add some files for our database schema and access object. Here’s an image of my folder structure and files.

<figure class="kg-card kg-image-card">![folderstructure](https://cms.gabrieltanner.org/content/images/2019/09/Nestjs-CRUD-folderstructure.png)</figure>

As you can see you just need to create the three missing folders and their files in our items directory.

#### Setting up MongoDB:

Next, we will continue by setting up our MongoDB database in our Nest project. For that, you first need to have MongoDB installed on your computer. If you haven’t downloaded it yet you can do so by using [this link](https://www.mongodb.com/download-center/community).

After finishing the installation local installation we only need to install the needed dependencies in our project and than import them in our Modules.

    npm install --save @nestjs/mongoose mongoose

Now let’s import Mongo in our application Module:

    import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { MongooseModule } from '@nestjs/mongoose';
    import { ItemsModule } from './items/items.module';

    @Module({
    imports: [MongooseModule.forRoot('mongodb://localhost/nest'), ItemsModule],
    controllers: [AppController],
    providers: [AppService],
    })
    export class AppModule {}

As you can see we import the MongooseModule using the forRoot() method which accepts the same parameters as mongoose.connect().

We also need to setup Mongo in our ItemsModule and can do so like this:

    import { Module } from '@nestjs/common';
    import { MongooseModule } from '@nestjs/mongoose';
    import { ItemsController } from './items.controller';
    import { ItemsService } from './items.service';
    import { ItemSchema } from './schemas/item.schema';

    @Module({
    imports: [MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }])],
    controllers: [ItemsController],
    providers: [ItemsService],
    })
    export class ItemsModule {}

Here we import the MongooseModule aswell but use the forFeature() method instead which defines what Model will be registered in the current scope. Thanks to that we will later be able to get access to our Model in our Service file using dependency injection.

#### Building the Schema:

Next up we will create the schema for our database. The schema defines how the data will be represented in the database. Let’s define it in our item.schema.ts file.

    import * as mongoose from 'mongoose';

    export const ItemSchema = new mongoose.Schema({
     name: String,
     qty: Number,
     description: String,
    });

As you can see we first need to import the _mongoose_ dependency and then create a new schema using _mongoose.Schema()_.

#### Interfaces:

Next, we will create a Typescript interface which will be used for type-checking in our Service and Controller. To set up just paste the following code into your item.interface.ts file you created earlier.

    export interface Item {
     id?: string;
     name: string;
     description?: string;
     qty: number;
    }

#### Creating the DTO:

The DTO (Data transfer object) is an object that defines how the data will be sent over the network. Its a basic class with the same variables as our Schema (in our case).

    export class CreateItemDto {
     readonly name: string;
     readonly description: string;
     readonly qty: number;
    }

We are now done with the basic configuration of our database and can move on to writing the actuall CRUD functionality.

#### Setting up the Service:

The service file will hold all the logic regarding the database interaction for our CRUD (Create, Read, Update, Delete) functionality.

    import { Injectable } from '@nestjs/common';
    import { Item } from './interfaces/item.interface';
    import { Model } from 'mongoose';
    import { InjectModel } from '@nestjs/mongoose';
    import { CreateItemDto } from './dto/create-item.dto';

    @Injectable()
    export class ItemsService {
     constructor(@InjectModel('Item') private readonly itemModel:  Model<Item>) {}

     async findAll(): Promise<Item[]> {
      return await this.itemModel.find();
     }

     async findOne(id: string): Promise<Item> {
      return await this.itemModel.findOne({ _id: id });
     }

     async create(item: CreateItemDto): Promise<Item> {
      const newItem = new this.itemModel(item);
      return await newItem.save();
     }

     async delete(id: string): Promise<Item> {
      return await this.itemModel.findByIdAndRemove(id);
     }

     async update(id: string, item: Item): Promise<Item> {
      return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
     }
    }

Here we first import all the needed dependencies e.g. our item.interface, dto and so on.

Next, we need to inject our item model into our service so we can carry out our database related activities. For that, we use the @InjectModel() declarator in our constructor.

After that we finally create the functions which handle our CRUD functionality:

*   findAll() — Finds all items in the database using the _find()_ method
*   findOne() — Finds the item which has the same id than the function parameter
*   create() — Creates a new item using our _itemModel_ and the MongoDB _save()_ function
*   delete() — Deletes the item with the same id as the function parameter
*   update() — Updates the customer with the same id property with the new data provided in the PUT request

#### Controller:

The controller is responsible for handling incoming request and providing the right responses to the client.

    import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    } from '@nestjs/common';
    import { CreateItemDto } from './dto/create-item.dto';
    import { ItemsService } from './items.service';
    import { Item } from './interfaces/item.interface';

    @Controller('items')
    export class ItemsController {
     constructor(private readonly itemsService: ItemsService) {}

     @Get()
     findAll(): Promise<Item[]> {
      return this.itemsService.findAll();
     }

     @Get(':id')
     findOne(@Param('id') id): Promise<Item> {
      return this.itemsService.findOne(id);
     }

     @Post()
     create(@Body() createItemDto: CreateItemDto): Promise<Item> {
      return this.itemsService.create(createItemDto);
     }

     @Delete(':id')
     delete(@Param('id') id): Promise<Item> {
      return this.itemsService.delete(id);
     }

     @Put(':id')
     update(@Body() updateItemDto: CreateItemDto, @Param('id') id): Promise<Item> {
      return this.itemsService.update(id, updateItemDto);
     }
    }

Here we use the @Controller() declarator which is required to define any basic controller and takes the route path prefix as an optional parameter (in our example we use /item).

After that, we inject our ItemService in our constructor using dependency injection.

Now we just define our HTTP Endpoints using the HTTP request method declarators and call the method we defined in our service.

#### Testing the application:

Now that we are finished with our application its time to test the functionality. For that, we need to start our server and then test it by sending HTTP requests to the endpoints (We can do so using programs like [Postman](https://www.getpostman.com/) or [Insomnia](https://insomnia.rest/))

    npm run start

After starting the server you just need to test the application by sending HTTP requests to the endpoints we created above.

If you have any problems or questions feel free to leave them in the comments below. The whole code can also be found on my [Github](https://github.com/TannerGabriel/Blog/tree/master/Nest-CRUD).

### Conclusion

You made it all the way until the end! Hope that this article helped you understand the basics of Nest.js and why it is so useful to us backend developers.

If you have found this useful, please consider recommending and sharing it with other fellow developers. If you have any questions or feedback, let me know in the comments down below.
