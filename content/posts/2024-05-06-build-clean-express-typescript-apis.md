---
date: 2024-05-18
title: 'Build Clean API Architecture using Express and Typescript'
template: post
thumbnail: '../thumbnails/nodejs.png'
slug: how-to-build-clean-express-typescript-app
categories:
  - Javascript
  - nodejs
tags:
  - Javascript
  - nodejs
  - security
---


Build Clean API Architecture using Express and Typescript
---------------------------------------------------------

The Clean Architecture consists of three main layers:

*   Domain: It contains business logic independent of external technologies.
*   Infrastructure: Handles technical details such as databases and external services.
*   Presentation: Interacts with the user and delegates requests to the domain layer.

We are going to create these three layers for each of our project functionalities, in this development we will create a complete CRUD for a TODO list. Here’s an initial outline of our directory structure.

```sh

node-template-server/  
│  
├── dist/  
├── node_modules/  
├── src/  
│   ├── core/  
│   │   ├── config/  
│   │   ├── constants/  
│   │   └── errors/  
│   ├── features/  
│   │   ├── shared/  
│   │   │   └── presentation/  
│   │   │       └── middlewares/  
│   │   │  
│   │   ├── todos/  
│   │   │   ├── domain/  
│   │   │   │   ├── datasources/  
│   │   │   │   ├── dtos/  
│   │   │   │   ├── entities/  
│   │   │   │   ├── repositories/  
│   │   │   │   └── usecases/  
│   │   │   │  
│   │   │   ├── infrastructure/  
│   │   │   │   ├── datasource.impl.ts  
│   │   │   │   └── repository.impl.ts  
│   │   │   │  
│   │   │   └── presentation/  
│   │   │       ├── controller.ts  
│   │   │       └── routes.ts  
│   │   └── ...  
│   ├── app.test.ts  
│   ├── app.ts  
│   ├── routes.ts  
│   └── server.ts  
├── .env  
├── .env.template  
├── ...  
├── package.json  
└── ...
```

Domain — Entities
---------------------

Entities are objects that represent fundamental concepts of the application domain. These objects encapsulate the essential state and behavior of key elements within the system. In this case, we will define this entity:

// srcfeaturestodosdomainentitiestodo.entity.ts  
  
```js
import { ValidationError } from '../../../../core/errors/validation.error';  
  
export class TodoEntity {  
 constructor(  public id: number,  
  public text: string,  
  public isCompleted: boolean ) {}  
  
 public static fromJson(obj: Record<string, unknown>): TodoEntity {  
  const { id, text, isCompleted = false } = obj;  
  if (!id) throw new ValidationError([{ constraint: 'id is required', fields: ['id'] }]);  
  if (!text) throw new ValidationError([{ constraint: 'text is required', fields: ['text'] }]);  
  return new TodoEntity(id as number, text as string, isCompleted as boolean);  
 }  
}
```

🚧 The implementation of the `ValidationError`class will be done later.

During this article I will show you the implementation of the `getAll()` method for our TODO list, however, in the final code you can find the implementation of all the methods (`create, update, delete and getById`).

Domain — Repositories
---------------------

Repositories are a data access abstraction that act as an interface between the domain layer and the infrastructure layer. Their primary purpose is to encapsulate the logic related to data storage and retrieval, providing an abstraction layer that allows the domain layer to work with entities without worrying about the specific details of how data is stored or retrieved.

// srcfeaturestodosdomainrepositoriesrespository.ts  
```js

import { type TodoEntity } from '../entities/todo.entity';  
  
export abstract class TodoRepository {  
 abstract getAll(): Promise<TodoEntity[]>;  
 // rest of operations  
 // ...  
}
```

Domain — Use cases
------------------

Use cases represent the specific actions or functionalities that can be performed by a user or a system within the application. These use cases encapsulate the business logic in a way that is independent of infrastructure and implementation details, making them portable and reusable in different contexts.

```js
// srcfeaturestodosdomainusecasesgetAll.usecase.ts  
  
import { type TodoEntity } from '../entities/todo.entity';  
import { type TodoRepository } from '../repositories/respository';  
  
export interface GetTodosUseCase {  
 execute: () => Promise<TodoEntity[]>;  
}  
  
export class GetTodos implements GetTodosUseCase {  
 constructor(private readonly repository: TodoRepository) {}  
  
 async execute(): Promise<TodoEntity[]> {  
  return await this.repository.getAll();  
 }  
}
```


Domain — Data sources
---------------------

Data sources are interfaces or abstractions that represent the data source from which the data needed for the application is obtained. These data sources can be databases, web services, file systems, or any other form of data storage. The use of data sources helps decouple business logic from the specific details of the data source. This means that the domain layer can work with data sources through generic interfaces without knowing the specific implementation details, making it easy to exchange or update the data source without affecting the application logic.

```js
// srcfeaturestodosdomaindatasourcesdatasource.ts  
  
import { type TodoEntity } from '../entities/todo.entity';  
  
export abstract class TodoDatasource {  
 abstract getAll(): Promise<TodoEntity[]>;  
 // rest of operations  
 // ...  
}
```


Domain — DTOs
-------------

DTOs (Data Transfer Objects) are objects that are used to transfer data between different layers of the application, especially between the presentation layer and the domain or infrastructure layer. DTOs encapsulate related data and transport it from one context to another without exposing the underlying business logic. The main function of DTOs is to represent information in a structured and coherent way, facilitating its transport through the application.

For the purposes of this article we will not create DTOs, however, in the final code you will be able to find DTOs to handle `pagination`, to `create`, `update` and even get a TODO.

Infrastructure — Repository Implementation
----------------------------------------------

The repository implementation at the infrastructure layer is responsible for providing a concrete implementation of the methods defined in the repository interface at the domain layer. This implementation is responsible for interacting with the actual data source, such as a database, an external service or any other data persistence mechanism.

```js
// srcfeaturestodosinfraestructurerepository.impl.ts  
  
import { type TodoDatasource } from '../domain/datasources/datasource';  
import { type TodoEntity } from '../domain/entities/todo.entity';  
import { type TodoRepository } from '../domain/repositories/respository';  
  
export class TodoRepositoryImpl implements TodoRepository {  
 constructor(private readonly datasource: TodoDatasource) {}  
  
 async getAll(): Promise<TodoEntity[]> {  
  return await this.datasource.getAll();  
 }  
  
 // rest of operations  
 // ...  
}

```

Infrastructure — Data source Implementation
-------------------------------------------

The data source implementation in the infrastructure layer is responsible for providing a concrete implementation of the methods defined in the data source interface in the domain layer. This component is responsible for interacting directly with the actual data source, such as a database, a web service or any other data storage medium.

```js
// srcfeaturestodosinfraestructurelocal.datasource.impl.ts  
  
import { type TodoDatasource } from '../domain/datasources/datasource';  
import { TodoEntity } from '../domain/entities/todo.entity';  
  
const TODOS_MOCK = [  
 {  
  id: 1,  
  text: 'First TODO...',  
  isCompleted: false  
 },  
 {  
  id: 2,  
  text: 'Second TODO...',  
  isCompleted: false  
 }  
];  
  
export class TodoDatasourceImpl implements TodoDatasource {  
 public async getAll(): Promise<TodoEntity[]> {  
  const todos = TODOS_MOCK.map((todo): TodoEntity => TodoEntity.fromJson(todo));  
  return todos;  
 }  
  
 // rest of operations  
 // ...  
}
```


In this case I am getting the list from memory, however, this is the right place to interact with an external database, for example, this would be the implementation of a data source that interacts with a database using [Prisma](https://www.prisma.io/):

```js
// srcfeaturestodosinfraestructurepostgres.datasource.impl.ts  
  
import { type TodoDatasource } from '../domain/datasources/datasource';  
import { TodoEntity } from '../domain/entities/todo.entity';  
  
export class TodoDatasourceImpl implements TodoDatasource {  
 public async getAll(): Promise<TodoEntity[]> {  
  const todosFromDB = await prisma.todo.findMany();  
  const todos = todosFromDB.map((todo): TodoEntity => TodoEntity.fromJson(todo));  
  return todos;  
 }  
  
 // rest of operations  
 // ...  
}
```

Presentation— Controller
------------------------

Controllers are presentation layer components that act as entry points for client requests in an application. These controllers are responsible for receiving HTTP requests, processing them and directing them to the corresponding business logic in the domain layer.

```js
// srcfeaturestodospresentationcontroller.ts  
  
import { type NextFunction, type Request, type Response } from 'express';  
import { type TodoRepository } from '../domain/repositories/respository';  
import { type TodoEntity } from '../domain/entities/todo.entity';  
import { GetTodos } from '../domain/usecases/getAll.usecase';  
  
export class TodoController {  
 //* Dependency injection  
 constructor(private readonly repository: TodoRepository) {}  
  
 public getAll = (  
  _req: Request<unknown, unknown, unknown, unknown>,  
  res: Response<TodoEntity[]>,  
  next: NextFunction  
 ): void => {  
  new GetTodos(this.repository)  
   .execute()  
   .then((result) => res.json(result))  
   .catch((error) => {  
    next(error);  
   });  
 };  
  
 // rest of operations  
 // ...  
}
```

Presentation — Routes
---------------------

Routes are presentation layer components that are responsible for defining routes and handling incoming HTTP requests to an application. These routes are used to map HTTP requests to the corresponding controllers and establish the API structure or routing of the application. It is also where our data source and our repository are initialized, the same that is necessary for our controller.


```js
// srcfeaturestodospresentationroutes.ts  
  
import { Router } from 'express';  
import { TodoDatasourceImpl } from '../infraestructure/local.datasource.impl';  
import { TodoRepositoryImpl } from '../infraestructure/repository.impl';  
import { TodoController } from './controller';  
  
export class TodoRoutes {  
 static get routes(): Router {  
  const router = Router();  
  
  //* This datasource can be change  
  const datasource = new TodoDatasourceImpl();  
  const repository = new TodoRepositoryImpl(datasource);  
  const controller = new TodoController(repository);  
  
  router.get('/', controller.getAll);  
  
  // rest of operations  
  // ...  
  
  return router;  
 }  
}
```

Routes
------

We are going to create a global routing file for our application, here we will route all the routes of all the functionalities of our application.

```js
// srcroutes.ts  
  
import { Router } from 'express';  
import { TodoRoutes } from './features/todos/presentation/routes';  
  
export class AppRoutes {  
 static get routes(): Router {  
  const router = Router();  
  
  router.use('/todos', TodoRoutes.routes);  
  
  // rest of routes  
  // ...  
  
  return router;  
 }  
}
```


Error handling
--------------

Finally, I want to show you how to handle errors on our server, let’s start by creating classes for our custom errors:

```js
// srccoreerrorscustom.error.ts  
  
import { HttpCode } from '../constants';  
  
interface AppErrorArgs {  
 name?: string;  
 statusCode: HttpCode;  
 message: string;  
 isOperational?: boolean;  
}  
  
export class AppError extends Error {  
 public readonly name: string;  
 public readonly statusCode: HttpCode;  
 public readonly isOperational: boolean = true;  
  
 private constructor(args: AppErrorArgs) {  
  const { message, name, statusCode, isOperational } = args;  
  super(message);  
  Object.setPrototypeOf(this, new.target.prototype);  
  this.name = name ?? 'Error';  
  this.statusCode = statusCode;  
  if (isOperational !== undefined) this.isOperational = isOperational;  
  Error.captureStackTrace(this);  
 }  
  
 static badRequest(message: string): AppError {  
  return new AppError({ message, statusCode: HttpCode.BAD_REQUEST });  
 }  
  
 static unauthorized(message: string): AppError {  
  return new AppError({ message, statusCode: HttpCode.UNAUTHORIZED });  
 }  
  
 static forbidden(message: string): AppError {  
  return new AppError({ message, statusCode: HttpCode.FORBIDDEN });  
 }  
  
 static notFound(message: string): AppError {  
  return new AppError({ message, statusCode: HttpCode.NOT_FOUND });  
 }  
  
 static internalServer(message: string): AppError {  
  return new AppError({ message, statusCode: HttpCode.INTERNAL_SERVER_ERROR });  
 }  
}
```


```js
// srccoreerrorsvalidation.error.ts  
  
import { type HttpCode } from '../constants';  
  
export interface ValidationType {  
 fields: string[];  
 constraint: string;  
}  
  
export class ValidationError extends Error {  
 public readonly statusCode: HttpCode;  
 public readonly validationErrors: ValidationType[];  
  
 constructor(validationErrors: ValidationType[]) {  
  super('Validation Error');  
  Object.setPrototypeOf(this, new.target.prototype);  
  this.statusCode = 400;  
  this.validationErrors = validationErrors;  
  Error.captureStackTrace(this);  
 }  
}
```


Now we are going to create a Middleware to control our errors. In Express and Node.js, middlewares are functions that access the request and response objects of a web application and are used to perform intermediate tasks during the processing of HTTP requests, such as data validation, error handling, user authentication and information registration. They provide flexibility to control how requests are processed and responses generated in an Express application.

```js
// srcfeaturessharedpresentationmiddlewareserror.middleware.ts  
  
import { type Response, type NextFunction, type Request } from 'express';  
  
import { ValidationError } from '../../../../core/errors/validation.error';  
import { HttpCode } from '../../../../core/constants';  
import { AppError } from '../../../../core/errors/custom.error';  
  
export class ErrorMiddleware {  
 //* Dependency injection  
 // constructor() {}  
  
 public static handleError = (error: unknown, _: Request, res: Response, next: NextFunction): void => {  
  if (error instanceof ValidationError) {  
   const { message, name, validationErrors, stack } = error;  
   const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;  
   res.statusCode = statusCode;  
   res.json({ name, message, validationErrors, stack });  
  } else if (error instanceof AppError) {  
   const { message, name, stack } = error;  
   const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;  
   res.statusCode = statusCode;  
   res.json({ name, message, stack });  
  } else {  
   const name = 'InternalServerError';  
   const message = 'An internal server error occurred';  
   const statusCode = HttpCode.INTERNAL_SERVER_ERROR;  
   res.statusCode = statusCode;  
   res.json({ name, message });  
  }  
 };  
}
```

Now let’s make a couple of final modifications to our`server.ts` to add our global router and our middleware to handle errors.

```js
// srcserver.ts  
  
import express, { type Router, type Request, type Response, type NextFunction } from 'express';  
import compression from 'compression';  
import rateLimit from 'express-rate-limit';  
  
import { HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './core/constants';  
import { ErrorMiddleware } from './features/shared/presentation/middlewares/error.middleware';  
import { AppError } from './core/errors/custom.error';  
  
interface ServerOptions {  
 port: number;  
 routes: Router;  
 apiPrefix: string;  
}  
  
export class Server {  
 private readonly app = express();  
 private readonly port: number;  
 private readonly routes: Router;  
 private readonly apiPrefix: string;  
  
 constructor(options: ServerOptions) {  
  const { port, routes, apiPrefix } = options;  
  this.port = port;  
  this.routes = routes;  
  this.apiPrefix = apiPrefix;  
 }  
  
 async start(): Promise<void> {  
  //* Middlewares  
  this.app.use(express.json()); // parse json in request body (allow raw)  
  this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded  
  this.app.use(compression());  
  //  limit repeated requests to public APIs  
  this.app.use(  
   rateLimit({  
    max: ONE_HUNDRED,  
    windowMs: SIXTY * SIXTY * ONE_THOUSAND,  
    message: 'Too many requests from this IP, please try again in one hour'  
   })  
  );  
  
  // CORS  
  this.app.use((req, res, next) => {  
   // Add your origins  
   const allowedOrigins = ['http://localhost:3000'];  
   const origin = req.headers.origin;  
   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion  
   if (allowedOrigins.includes(origin!)) {  
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion  
    res.setHeader('Access-Control-Allow-Origin', origin!);  
   }  
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');  
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  
   next();  
  });  
  
  //* Routes  
  this.app.use(this.apiPrefix, this.routes);  
  
  // Test rest api  
  this.app.get('/', (_req: Request, res: Response) => {  
   return res.status(HttpCode.OK).send({  
    message: `Welcome to Initial API! n Endpoints available at http://localhost:${this.port}/`  
   });  
  });  
  
  //* Handle not found routes in /api/v1/* (only if 'Public content folder' is not available)  
  this.routes.all('*', (req: Request, _: Response, next: NextFunction): void => {  
   next(AppError.notFound(`Cant find ${req.originalUrl} on this server!`));  
  });  
  
  // Handle errors middleware  
  this.routes.use(ErrorMiddleware.handleError);  
  
  this.app.listen(this.port, () => {  
   console.log(`Server running on port ${this.port}...`);  
  });  
 }  
}

```

And in the `app.ts` file:


```js
// srcapp.ts  
  
import { envs } from './core/config/env';  
import { AppRoutes } from './routes';  
import { Server } from './server';  
  
(() => {  
 main();  
})();  
  
function main(): void {  
 const server = new Server({  
  routes: AppRoutes.routes,  
  apiPrefix: envs.API_PREFIX,  
  port: envs.PORT  
 });  
 void server.start();  
}
```

Now, we can run our application

yarn dev

We can test our local server in `[http://localhost:3000/todos](http://localhost:3000/todos)`

![](https://miro.medium.com/v2/resize:fit:700/1*m_6vHXnGzvevtYfsEmY8gA.png)

Implementing a REST API using Node.js, Express and following good development practices and Clean Architecture provides a solid foundation for developing modern and scalable web applications. By taking a modular approach and focusing on separation of concerns, developers can achieve a clean, maintainable architecture that encourages flexibility and continuous system evolution.

The application of Clean Architecture allows you to maintain a clear separation between the different layers of the application, such as the domain layer, the infrastructure layer, and the presentation layer, making it easier to understand and maintain the code over time. Additionally, adopting good development practices such as using middlewares for intermediate tasks, validating input data, and proper error handling contributes to creating a robust and secure API.