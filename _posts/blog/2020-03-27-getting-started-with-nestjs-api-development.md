---
date: 2020-03-27
title: 'getting started with Nest (NestJS) framework'
template: post
thumbnail: '../thumbnails/nest.png'
slug: getting-started-with-nest-js-framework-for-nodejs-apis
categories:
  - Popular
  - Typescript
  - Javascript
tags:
  - Typescript
  - Javascript
---


![NestJS logo](https://cdn-images-1.medium.com/max/2000/1*oTbTuBA4_RtKoXCsZ-ybKQ.png)*NestJS logo*



you are going to learn how to build a simple backend API with Nest.js
nest js which is becoming popular choice for API development in Node js built on express framework and supports typescript or without typescript.

is NestJS similar to Angular Development ?
------------------------------------------

Nest.js is a framework for building Node.js server-side web applications. What makes it special is that it addresses a problem that no other framework does: the architecture of a Node.js project. If you have ever tried to build a project using Node.js, you may have realized that you can do a lot with one module (for example, an Express middleware can do everything from authentication to validation) which can lead to unorganized and hard-to-support projects. As you will see through this article, Nest.js helps developers keeping their code organized by providing different classes that specialize in different problems.

### its just @nestjs is inspired by @angular

Besides that, what makes combining ``Nest.js and Angular`` a good idea is that Nest.js is heavily inspired by Angular. For example, you will find that both frameworks use guards to allow or prevent access to some parts of your apps and that both frameworks provide the ``CanActivate interface`` to implement these guards. Nevertheless, it is important to notice that, although sharing some similar concepts, both frameworks are independent of each other. That is, in this article, you will ``build a front-end-agnostic API``. So, after building the API, you will be able to use it with other frameworks and libraries like React, Vue.js, and so on.

Lets build a simple API in Node JS using @nestjs
------------------------------------------------

- install node js 
## Install `nvm` for managing Node.js versions

[nvm](https://github.com/nvm-sh/nvm) allows installing several versions of Node.js to the same system. Sometimes applications require a certain versions of Node.js to work. Having the flexibility of using specific versions can help.

1. Open new _Terminal_ window.
2. Run [nvm](https://github.com/nvm-sh/nvm) installer
   - … with _either_ `curl` *or* `wget`, depending on what your computer has available.
     - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash`
     - `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash`
   - The script clones the nvm repository to `~/.nvm` and adds the source line to your profile (`~/.bash_profile`, `~/.zshrc,` `~/.profile,` or `~/.bashrc`). (You can add the source loading line manually, if the automated install tool does not add it for you.)

     ```sh
     export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
     [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
     ```

   - Another option: when you have consistent directory location between systems, following example Bash/Zsh configuration allows to load `nvm` when the directory exists.
   This allows more consistent sharing of your shell configuration between systems, improving reliability of rest of your configuration even when nvm does not exist on a specific system.

     ```sh
     if [ -d "$HOME/.nvm" ]; then
       # export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
       export NVM_DIR="$HOME/.nvm"

       # This loads nvm
       [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

       # This loads nvm bash_completion
       [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
     fi
     ```

3. If everything went well, you should now either open a new Terminal window/tab, or reload the shell configuration by running:
   - `source ~/.bashrc`
4. Verify installation
   - To check if nvm command got installed, run:
     - `command -v nvm`
5. List installed Node.js versions with:
   - `nvm ls`
6. Install latest LTS Version of [Node.js](https://nodejs.org/en/).
   - `nvm install v12.0.0`
   - `nvm use v12.0.0`
   - `node -v `
   - version 12.0.0

here are a few ways to start a Nest.js project; you may check all of them in the Nest.js documentation. Here, you are going to use nest-cli to do so. To install this tool, run the following command:
```
npm i -g @nestjs/cli # it will install the nest command
```
Then, you can create a new project by running a single command. This command will trigger some questions about the project, such as version and project name, but you can stick with default options:
```
nest new nest-restaurant-api # nest-api
```
This command will ask you the following question: "Which package manager would you ❤️ to use?". You can choose the option you prefere, but keep in mind that if you choose Yarn, you will have to adjust the commands on this article accordingly.

If everything went well, you will get by the end of this process a directory called nest-restaurant-api with the following structure:   

nest-api
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .gitignore
├── .prettierrc
├── nest-cli.json
├── nodemon.json
├── nodemon-debug.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.build.json
├── tsconfig.json
└── tslint.json

Now, you can navigate to this directory and type the following command to start the API:

# move into the project
cd nest-api

# start the development server
npm run start:dev
Then, if you head to http://localhost:3000 in your browser, you will see a "Hello World!" page like the following one:

you can go ahead and delete the test directory and the src/app.controller.spec.ts file (which is test relate). After that, the remaining files inside the src directory will be:

- app.controller.ts and app.service.ts: those files are responsible for generating the message Hello world when the endpoint / is accessed through the browser. Because this endpoint is not important to this application, you may delete these files as well. Soon you are going to learn in more details what controllers and services are.
- app.module.ts: this is a class of the type module that is responsible for declaring imports, exports, controllers, and providers to a Nest.js application. Every application has at least one module but you may create more than one module for more complex applications (more details on Nest.js documentation). The application of this tutorial will have only one module.
- main.ts: this is the file responsible for starting the server.


Creating Nest.js Endpoints
--------------------------
The most important endpoint of this app will be /tasks because, from there, users will be able to retrieve the tasks available and admins will be able to manage these tasks. So, this is the first endpoint that you are going to implement.

To do so, you will have to create a directory called tasks inside src. You will store all files related to the /tasks endpoint in this new directory.

Creating a Nest.js Controller
----------------------------

In Nest.js, like in many other frameworks out there, ``controllers are responsible`` for mapping endpoints to functionalities. To create a controller in Nest.js, you can use the ``@Controller decorator``, as follows: ```@Controller(${ENDPOINT})``. Then, to map different HTTP methods like GET and POST, you would use decorators like: @Get, @Post, @Delete, etc.

So, as in your case you will need to create a controller that returns tasks available on a restaurant and that admins can use to manage these tasks, you can create a file called tasks.controller.ts inside the tasks directory and add the following code into it:
```javascript
import { Get, Post, Controller } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  async findAll(): Promise<string[]> {
    return ['Pizza', 'Coke'];
  }

  @Post()
  async create() {
    return 'Not yet implemented';
  }
}
```
Then, to make your controller available in your module (and in your app), you will have to replace the code on app.module.ts with the following:
```javascript
import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [],
})
export class AppModule {}
```
Now, you can head to http://localhost:3000/tasks (you might need to restart your app: npm run start:dev) and you will get the following response: ['Pizza', 'Coke']
Adding a Nest.js Service
------------------------
For now, the array returned by the /tasks endpoint is just a static array that is recreated for every request and that cannot be changed. As the handling of structures that persist data should not be addressed by controllers, you will create a service to do that.

``Services``, in Nest.js, are classes marked with the @Injectable decorator. As the name states, adding this decorator to classes makes them injectable in other components, like controllers.

So, to create this service, you can create a new file called tasks.service.ts in the ./src/tasks directory, and add the following code:
```javascript
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private readonly tasks: string[] = ['cooking', 'running'];

  findAll(): string[] {
    return this.tasks;
  }

  create(task: string) {
    this.tasks.push(task);
  }
}
```
Then, you will need to change TasksController (which you declared on the tasks.controller.ts file) to use this service:

```javascript
import { Get, Post, Body, Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  async findAll(): Promise<string[]> {
    return this.taskService.findAll();
  }

  @Post()
  async create(@Body() task: string) {
    this.taskService.create(task);
  }
}
```
In the new version of your controller, you are defining a parameter decorated with @Body() in the create method. This parameter is used to automatically map data sent through req.body['task'] to the parameter itself (task in this case).

Also, your controller now gets an instance of the TasksService class injected through the constructor. The private readonly that accompanies the TasksService declaration makes this instance unchangeable and only visible inside this class.

Now, to make TasksService available in your app, you will need to update app.module.ts as follows:

```javascript
import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule {}
```
With these changes in place, you can issue HTTP POST requests to the menu:
```
curl -X POST -H 'content-type: application/json' -d '{
  "task": "cooking"
}' localhost:3000/tasks
```
After that, you will be able to see this new task in your menu by issuing the following GET request (or by heading to http://localhost:3000/tasks in your browser):
```
curl localhost:3000/tasks
```
Creating a Nest.js Route for the todo task List
Now that you have the first version of your /tasks endpoint, you can start creating the todo task feature. As you will see, the process will be similar to the process of creating the /tasks endpoint. Therefore, to keep the article easier to grasp, this feature will only acknowledge with an OK status when triggered.

So, first, create a directory called task alongside the tasks directory. Then, create a new file called task.controller.ts inside it and add the following code:
```javascript
import { Post, Controller } from '@nestjs/common';

@Controller('task')
export class TaskController {
  @Post()
  async addTask() {
    return 'This is a fake service :D';
  }
}
```
Then, add this controller to your module (app.module.ts):

```javascript
import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';
import { TaskController } from './task/task.controller';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [],
  controllers: [TasksController, TaskController],
  providers: [TasksService],
})
export class AppModule {}
```

To test this endpoint, make sure your app is running, and issue the following command:

Adding a Typescript Interface for Tasks
---------------------------------------

Back to the task service, imagine that you want to keep more than just the name of the tasks (for instance, its prices too). Do you agree that an array of strings may not be the ideal structure to handle this data?

To solve this problem, you could create an array of objects, but it would be hard to keep all tasks coherent (i.e., with similar structures). As such, the best approach is to create a TypeScript interface to define the structure of your tasks. To do this, create a new file called task.interface.ts inside the src/tasks directory and add the following code to it:
```javascript
export class Task {
  readonly task: string;
  readonly description: number;
}
```
Then, change the tasks.service.ts file to use this interface:

```javascript
import { Injectable } from '@nestjs/common';
import { Task } from './task.interface';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];

  findAll(): Task[] {
    return this.tasks;
  }

  create(task: Task) {
    this.tasks.push(task);
  }
}
```
And the tasks.controller.ts file as well:

```javascript
import { Get, Post, Body, Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.interface';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  async create(@Body() task: Task) {
    this.tasksService.create(task);
  }
}
```
Adding Validation on Nest.js with DTOs and Pipes
------------------------------------------------

Even though you created an interface to define the structure of tasks, the application won't return an error status if you post any data other than the one defined in the interface. For example, the following request should return a 400 (bad request) status, but instead, it returns a 200 (all good) status:

curl -H 'Content-Type: application/json' -d '{
  "task": 3,
  "description": "any"
}' http://localhost:3000/tasks

To solve this problem, you are going to create a DTO (Data Transfer Object) together with a Pipe. A DTO, as the name states, is an object that defines how data must be transferred among processes. To create a DTO to your tasks, add a new file called create-task.dto.ts in the src/tasks directory and add the following code to it:
```javascript
import { IsString, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsString() readonly task: string;

  @IsString() readonly description: string;
}
```
Pipes are Nest.js components that are used for validation. For your API, you are going to create a pipe that verifies if the data sent to a method matches its DTO. As pipes can be used by several controllers, you will create a directory called common inside src and a file called validation.pipe.ts inside it that looks like this:
```javascript
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
```
Note: You will have to install ``class-validator`` and ``class-transformer`` modules. To do so, just type npm install class-validator class-transformer on the terminal inside your project's directory and restart the server.

Now, you will have to adapt the tasks.controller.ts file to use this new pipe and the DTO. After doing that, this is how the code of the controller should like:

```javascript
import { Get, Post, Body, Controller, UsePipes } from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.interface';
import { ValidationPipe } from '../common/validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createTaskDto: CreateTaskDto) {
    this.tasksService.create(createTaskDto);
  }
}
```
Now, running your code again, the /task endpoint will only accept data as defined in the DTO, such as in the following example:
```bash
curl -H 'Content-Type: application/json' -d '{
  "task": "Salad",
  "prblablaice": 3
}' http://localhost:3000/tasks
```

Inserting invalid data (data that does not pass the checks on the ValidationPipe) will result in the following response:
```
{"statusCode":400,"error":"Bad Request","message":"Validation failed"}
```
More about nestJS
------------------
Nest is a platform-agnostic framework. This means you can develop reusable logical parts that can be used across different types of applications. For example, most components can be re-used without change across different underlying HTTP server frameworks (e.g., Express and Fastify), and even across different types of applications (e.g., HTTP server frameworks, Microservices with different transport layers, and Web Sockets).

Build once, use everywhere#
The Overview section of the documentation primarily shows coding techniques using HTTP server frameworks (e.g., apps providing a REST API or providing an MVC-style server-side rendered app). However, all those building blocks can be used on top of different transport layers (microservices or websockets).

- Furthermore, Nest comes with a dedicated GraphQL module. You can use GraphQL as your API layer interchangeably with providing a REST API.

- In addition, the application context feature helps to create any kind of Node.js application - including things like CRON jobs and CLI apps - on top of Nest.

- Nest aspires to be a full-fledged platform for Node.js apps that brings a higher-level of modularity and reusability to your applications. Build once, use everywhere!

for more look here 
https://docs.nestjs.com/

