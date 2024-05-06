---
date: 2023-06-01
title: 'Nest JS Writing Test cases for controller and services Part-7'
template: post
featuredImage: '../thumbnails/nestjs.png'
thumbnail: '../thumbnails/nestjs.png'
slug: how-to-write-unit-tests-for-nestjs-service
categories:
  - nodejs
  - aws
  - nestjs
  - microservices
tags:
  - nodejs
  - aws
  - nestjs
  - microservices
---

# Nest JS Writing Test cases for controller and services Part-7

![](../thumbnails/banner-nestjs.png)


| Blog   |      Name      |  Link |
|----------|:-------------:|------:|
| Part-1 | Nest JS Building REST APIs using Mongo DB Part-1  | https://tkssharma.com/building-rest-apis-with-nestjs-and-mongodb-part-1 |
| Part-2 | Nest JS APIs with mongoose Mongo DB Database Part-2  | https://tkssharma.com/building-rest-apis-with-nestjs-and-mongodb-part-2 |
| Part-3 | Nest JS Building Auth Service with JWT Tokens Part-3  | https://tkssharma.com/building-nestjs-auth-service-with-mongodb-part-3 |
| Part-4 | Nest JS with Mongo DB Managing Relationships Part-4 | https://tkssharma.com/building-nestjs-apis-with-mongodb-relationships |
| Part-5 | How to manage environment variables in Nest JS Part-5 | https://tkssharma.com/how-to-manage-environment-variables-in-nestjs |
| Part-6 | Nest JS User registration with Sendgrid email Integration Part-6 | https://tkssharma.com/how-to-create-user-signup-with-sendgrid-email |

Github Link
https://github.com/tkssharma/blogs/tree/master/nestjs-rest-apis-docs

In this post, I will demonstrate how to kickstart a simple RESTful APIs with NestJS from a newbie's viewpoint and will also do testing 

Github Link
https://github.com/tkssharma/blogs/tree/master/nestjs-rest-apis-docs

## What is NestJS?

As described in the [Nestjs](https://nestjs.com) website, Nestjs is _a progressive Node.js framework for building efficient, reliable and scalable server-side applications._

Nestjs combines the best programming practice and the cutting-edge techniques from the NodeJS communities.

- A lot of NestJS concepts are heavily inspired by the effort of the popular frameworks in the world, esp. [Angular](https://www.angular.io) .
- Nestjs hides the complexities of web programming in NodeJS, it provides a common abstraction of the web request handling, you are free to choose [Expressjs](https://expressjs.com/) or [Fastify](https://www.fastify.io) as the background engine.
- Nestjs provides a lot of third party project integrations, from database operations, such as Mongoose, TypeORM, etc. to Message Brokers, such as Redis, RabbitMQ, etc.

If you are new to Nestjs like me but has some experience of [Angular](https://www.angular.io) , [TypeDI](https://github.com/typestack/typedi#usage-with-typescript) or [Spring WebMVC](http://www.spring.io), bootstraping a Nestjs project is really a piece of cake.

Make sure you have installed the latest [Nodejs](https://nodejs.org/en/).

```bash
npm i -g @nestjs/cli
```

When it is finished, there is a `nest` command available in the `Path`. The usage of `nest` is similar with `ng` (Angular CLI), type `nest --help` in the terminal to list help for all commands.

```bash
❯ nest --help
Usage: nest <command> [options]

Options:
  -v, --version                                   Output the current version.
  -h, --help                                      Output usage information.

Commands:
  new|n [options] [name]                          Generate Nest application.
  build [options] [app]                           Build Nest application.
  start [options] [app]                           Run Nest application.
  info|i                                          Display Nest project details.
  update|u [options]                              Update Nest dependencies.
  add [options] <library>                         Adds support for an external library to your project.
  generate|g [options] <schematic> [name] [path]  Generate a Nest element.
    Available schematics:
      ┌───────────────┬─────────────┐
      │ name          │ alias       │
      │ application   │ application │
      │ class         │ cl          │
      │ configuration │ config      │
      │ controller    │ co          │
      │ decorator     │ d           │
      │ filter        │ f           │
      │ gateway       │ ga          │
      │ guard         │ gu          │
      │ interceptor   │ in          │
      │ interface     │ interface   │
      │ middleware    │ mi          │
      │ module        │ mo          │
      │ pipe          │ pi          │
      │ provider      │ pr          │
      │ resolver      │ r           │
      │ service       │ s           │
      │ library       │ lib         │
      │ sub-app       │ app         │
      └───────────────┴─────────────┘
```

Now generate a Nestjs project via:

```bash
nest new nestjs-sample
```

Open it in your favorite IDEs, such as [Intellij WebStorm](https://www.jetbrains.com/webstorm/) or [VSCode](https://code.visualstudio.com/).

## Exploring the project files

Expand the project root, you will see the following like tree nodes.

```bash
.
├── LICENSE
├── nest-cli.json
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json

```

The default structure of this project is very similar with the one generated by Angular CLI.

- _src/main.ts_ is the entry file of this application.
- \*src/app\*\* is the top level component in a nest application.
  - There is an a*pp.module.ts* is a Nestjs `Module` which is similar with Angular `NgModule`, and used to organize codes in the logic view.
  - The _app.service.ts_ is an `@Injectable` component, similar with the service in [Angular](https://spring.io) or Spring's Service, it is used for handling business logic. A service is annotated with `@Injectable`.
  - The _app.controller.ts_ is the controller of MVC, to handle incoming request, and responds the handled result back to client. The annotatoin `@Controller()` is similar with Spring MVC's `@Controller`.
  - The _app.controller.spec.ts_ is test file for _app.controller.ts_. Nestjs uses [Jest](https://jestjs.io/) as testing framework.
- _test_ folder is for storing e2e test files.


# Testing Nestjs applications

In the previous posts,  I have write a lot of testing codes to verify if  our application is working as expected.

Nestjs provides integration with with [Jest](https://github.com/facebook/jest) and [Supertest](https://github.com/visionmedia/supertest) out-of-the-box, and testing harness for unit testing and  end-to-end (e2e) test.

##  Nestjs test harness

Like the Angular 's `TestBed`, Nestjs provide a similar `Test` facilities to assemble the Nestjs components for your testing codes.

```typescript
beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ...
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

```

Similar to the attributes in the `@Module` decorator, `creatTestingModule` defines the components that will be used in the tests.

We have demonstrated the methods to test a service in Nestjs applications, eg. in the `post.service.spec.ts`.

To isolate the dependencies in a service,  there are several approaches.

* Create a fake service to replace the real service, assemble it in the `providers` .

  ```typescript
  providers: [
      {
          provide: UserService,
          useClass: FakeUserService
      }
  ],
  ```

* Use a mock instance instead.

  ```type
  providers: [
      provide: UserService,
      useValue: {
          send: jest.fn()
      }
  ],
  ```

* For simple service providers, you can escape from the Nestjs harness, and create a simple fake dependent service, and use `new` to instantize your service in the  `setup` hooks.

You can also import a module in `Test.createTestingModule`.

```typescript
Test.createTestingModule({
        imports: []
       })
```
To replace some service in the imported modules, you can `override` it.

```typescript
Test.createTestingModule({
        imports: []
       })
       .override(...)
```

## Jest Tips and Tricks

Nestjs testing is heavily dependent on Jest framework.  I have spent a lot of time to research testing all components in Nestjs applications.

### Mocking external classes or functions

For example the  `mongoose.connect` will require a real mongo server to connect, to mock the `createConnection` of `mongoose`.

Set up mocks before importing it.

```typescript
jest.mock('mongoose', () => ({
    createConnection: jest.fn().mockImplementation(
        (uri:any, options:any)=>({} as any)
    ),
    Connection: jest.fn()
}))

//...
import { Connection, createConnection } from 'mongoose';
//
```
When a database provider is instantized, assert the `createConnection` is called.

```typescript
it('connect is called', () => {
    //expect(conn).toBeDefined();
    //expect(createConnection).toHaveBeenCalledTimes(1); // it is 2 here. why?
    expect(createConnection).toHaveBeenCalledWith("mongodb://localhost/blog", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //see: https://mongoosejs.com/docs/deprecations.html#findandmodify
        useFindAndModify: false
    });
})
```

 ### Mock parent classes through prototype

Have a look at the local auth guard tests.

Mock the method `canActivate` in the parent  prototype.

```typescript
describe('LocalAuthGuard', () => {
  let guard: LocalAuthGuard;
  beforeEach(() => {
    guard = new LocalAuthGuard();
  });
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
  it('should return true for `canActivate`', async () => {
    AuthGuard('local').prototype.canActivate = jest.fn(() =>
      Promise.resolve(true),
    );
    AuthGuard('local').prototype.logIn = jest.fn(() => Promise.resolve());
    expect(await guard.canActivate({} as ExecutionContext)).toBe(true);
  });

});
```



### Extract the functionality into functions as possible

Let's have a look at the `user.model.ts`. Extract the pre `save` hook method and custom `comparePassword` method into standalone functions.

```typescript
async function preSaveHook(next) {

  // Only run this function if password was modified
  if (!this.isModified('password')) return next();

  // Hash the password
  const password = await hash(this.password, 12);
  this.set('password', password);

  next();
}

UserSchema.pre<User>('save', preSaveHook);

function comparePasswordMethod(password: string): Observable<boolean> {
  return from(compare(password, this.password));
}

UserSchema.methods.comparePassword = comparePasswordMethod;
```

It is easy to test them like simple functions.

```typescript
describe('preSaveHook', () => {
    test('should execute next middleware when password is not modified', async () => {
        const nextMock = jest.fn();
        const contextMock = {
            isModified: jest.fn()
        };
        contextMock.isModified.mockReturnValueOnce(false);
        await preSaveHook.call(contextMock, nextMock);
        expect(contextMock.isModified).toBeCalledWith('password');
        expect(nextMock).toBeCalledTimes(1);
    });

    test('should set password when password is modified', async () => {
        const nextMock = jest.fn();
        const contextMock = {
            isModified: jest.fn(),
            set: jest.fn(),
            password: '123456'
        };
        contextMock.isModified.mockReturnValueOnce(true);
        await preSaveHook.call(contextMock, nextMock);
        expect(contextMock.isModified).toBeCalledWith('password');
        expect(nextMock).toBeCalledTimes(1);
        expect(contextMock.set).toBeCalledTimes(1);
    });
});
```

## Simple Test example 

```js
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            constructor: jest.fn(),
            getHello: jest.fn()
          }
        }
      ],
    }).compile();

    service = app.get<AppService>(AppService);
    appController = app.get<AppController>(AppController);
  });
  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

    it('getHello',async () => {
       jest.spyOn(service, "getHello").mockReturnValue("Hello");
       expect(appController.getHello()).toEqual("Hello");
    })
});
```

Testing a service 

```js
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { LoggerService } from './logger/logger.service';

describe('AppService', () => {
  let logger: LoggerService;
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: 'LoggerServiceAppService',
          useValue: {
            constructor: jest.fn(),
            log: jest.fn()
          }
        }
      ],
    })
      .compile();

    service = app.get<AppService>(AppService);
    logger = app.get<LoggerService>('LoggerServiceAppService');
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getHello', async () => {
    jest.spyOn(logger, "log").mockImplementation((message: string) => {
      console.log(message);
    })
    const result = service.getHello();
    expect(result).toEqual('Hello World!');
    expect(logger.log).toBeCalledWith("Hello World");
  })
});
```

User Controller spec 

```js
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { lastValueFrom, of } from 'rxjs';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = app.get<UserController>(UserController);
    service = app.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getUser', async () => {
    jest
      .spyOn(service, 'findById')
      .mockImplementationOnce((id: string, withPosts: boolean) =>
        of({
          username: 'hantsy',
          password: 'mysecret',
          email: 'hantsy@example.com',
          firstName: 'hantsy',
          lastName: 'bai',
        } as any),
      );
    const user = await lastValueFrom(controller.getUser('id', false));
    expect(user.firstName).toBe('hantsy');
    expect(user.lastName).toBe('bai');
    expect(service.findById).toBeCalledWith('id', false);
  });
});
```
User service test spec

```js
import { Test, TestingModule } from '@nestjs/testing';
import { Model, FilterQuery } from 'mongoose';
import { lastValueFrom, of } from 'rxjs';

import { USER_MODEL } from '../database/database.constants';
import { User } from '../database/user.model';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { RoleType } from '../shared/enum/role-type.enum';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;
  let sendgrid: SendgridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_MODEL,
          useValue: {
            findOne: jest.fn(),
            exists: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: SendgridService,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    sendgrid = module.get<SendgridService>(SendgridService);
    model = module.get<Model<User>>(USER_MODEL);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('save ', async () => {
    const sampleData = {
      username: 'hantsy',
      email: 'hantsy@example.com',
      firstName: 'hantsy',
      lastName: 'bai',
      password: 'mysecret',
    };

    const msg = {
      from: 'service@example.com', // Use the email address or domain you verified above
      subject: 'Welcome to Nestjs Sample',
      templateId: 'welcome',
      personalizations: [
        {
          to: 'hantsy@example.com',
          dynamicTemplateData: { name: 'hantsy bai' },
        },
      ],
    };

    const saveSpy = jest.spyOn(model, 'create').mockImplementation(() =>
      Promise.resolve({
        _id: '123',
        ...sampleData,
      } as any),
    );

    const pipeMock = {
      pipe: jest.fn(),
    };

    const pipeSpy = jest.spyOn(pipeMock, 'pipe');

    const sendSpy = jest
      .spyOn(sendgrid, 'send')
      .mockImplementation((data: any) => {
        return of(pipeMock);
      });

    const result = await lastValueFrom(service.register(sampleData));
    expect(saveSpy).toBeCalledWith({ ...sampleData, roles: [RoleType.USER] });
    expect(result._id).toBeDefined();
    //expect(sendSpy).toBeCalledWith(msg);
    //expect(pipeSpy).toBeCalled();
  });

  it('findByUsername should return user', async () => {
    jest.spyOn(model, 'findOne').mockImplementation(
      (filter?: FilterQuery<User>) =>
        ({
          exec: jest.fn().mockResolvedValue({
            username: 'hantsy',
            email: 'hantsy@example.com',
          } as User),
        } as any),
    );

    const foundUser = await lastValueFrom(service.findByUsername('hantsy'));
    expect(foundUser).toEqual({
      username: 'hantsy',
      email: 'hantsy@example.com',
    });
    expect(model.findOne).lastCalledWith({ username: 'hantsy' });
    expect(model.findOne).toBeCalledTimes(1);
  });

  describe('findById', () => {
    it('return one result', async () => {
      jest.spyOn(model, 'findOne')
      .mockImplementation(
        (filter?: FilterQuery<User>) =>
          ({
            exec: jest.fn().mockResolvedValue({
              username: 'hantsy',
              email: 'hantsy@example.com',
            } as User),
          } as any),
      );

      const foundUser = await lastValueFrom(service.findById('hantsy'));
      expect(foundUser).toEqual({
        username: 'hantsy',
        email: 'hantsy@example.com',
      });
      expect(model.findOne).lastCalledWith({ _id: 'hantsy' });
      expect(model.findOne).toBeCalledTimes(1);
    });

    it('return a null result', async () => {
      jest
        .spyOn(model, 'findOne')
        .mockImplementation((filter?: FilterQuery<User>) => ({
          exec: jest.fn().mockResolvedValue(null) as any,
        } as any));

      try {
        const foundUser = await lastValueFrom(service.findById('hantsy'));
      } catch (e) {
        expect(e).toBeDefined();
      }
    });

    it('parameter withPosts=true', async () => {
      jest
        .spyOn(model, 'findOne')
        .mockImplementation((filter?: FilterQuery<User>) => ({
          populate: jest.fn().mockReturnThis(),
          exec: jest.fn().mockResolvedValue({
            username: 'hantsy',
            email: 'hantsy@example.com',
          } as User),
        } as any));

      const foundUser = await lastValueFrom(service.findById('hantsy', true));
      expect(foundUser).toEqual({
        username: 'hantsy',
        email: 'hantsy@example.com',
      });
      expect(model.findOne).lastCalledWith({ _id: 'hantsy' });
      expect(model.findOne).toBeCalledTimes(1);
    });
  });

  describe('existsByUsername', () => {
    it('should return true if exists ', async () => {
      const existsSpy = jest
        .spyOn(model, 'exists')
        .mockImplementation((filter: any) => {
          return {
            exec: jest.fn().mockResolvedValue({
              _id: 'test',
            } as any),
          } as any;
        });
      const result = await lastValueFrom(service.existsByUsername('hantsy'));

      expect(existsSpy).toBeCalledWith({ username: 'hantsy' });
      expect(existsSpy).toBeCalledTimes(1);
      expect(result).toBeTruthy();
    });

    it('should return false if not exists ', async () => {
      const existsSpy = jest
        .spyOn(model, 'exists')
        .mockImplementation((filter: any) => {
          return {
            exec: jest.fn().mockResolvedValue(null),
          } as any;
        });
      const result = await lastValueFrom(service.existsByUsername('hantsy'));

      expect(existsSpy).toBeCalledWith({ username: 'hantsy' });
      expect(existsSpy).toBeCalledTimes(1);
      expect(result).toBeFalsy();
    });
  });

  describe('existsByEmail', () => {
    it('should return true if exists ', async () => {
      const existsSpy = jest
        .spyOn(model, 'exists')
        .mockImplementation((filter: any) => {
          return {
            exec: jest.fn().mockResolvedValue({
              _id: 'test',
            } as any),
          } as any;
        });
      const result = await lastValueFrom(
        service.existsByEmail('hantsy@example.com'),
      );

      expect(existsSpy).toBeCalledWith({ email: 'hantsy@example.com' });
      expect(existsSpy).toBeCalledTimes(1);
      expect(result).toBeTruthy();
    });

    it('should return false if not exists ', async () => {
      const existsSpy = jest
        .spyOn(model, 'exists')
        .mockImplementation((filter: any) => {
          return {
            exec: jest.fn().mockResolvedValue(null),
          } as any;
        });
      const result = await lastValueFrom(
        service.existsByEmail('hantsy@example.com'),
      );

      expect(existsSpy).toBeCalledWith({ email: 'hantsy@example.com' });
      expect(existsSpy).toBeCalledTimes(1);
      expect(result).toBeFalsy();
    });
  });
});
```



## End-to-end testing

Nestjs integrates supertest to send a request to the server side.

Use `beforeAll` and `afterAll` to start and stop the application,  use `request` to send a http request to the server and assert the response result.

```typescript
import * as request from 'supertest';
//...

describe('API endpoints testing (e2e)', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.enableShutdownHooks();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    // an example of using supertest reqruest.
    it('/posts (GET)', async () => {
        const res = await request(app.getHttpServer()).get('/posts').send();
        expect(res.status).toBe(200);
        expect(res.body.length).toEqual(3);
    });
}
```

More details for the complete e2e tests
Github Link
https://github.com/tkssharma/blogs/tree/master/nestjs-rest-apis-docs

