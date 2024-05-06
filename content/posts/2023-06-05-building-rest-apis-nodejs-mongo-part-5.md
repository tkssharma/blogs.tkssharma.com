---
date: 2023-06-05
title: 'How to manage environment variables in Nest JS Part-5'
template: post
featuredImage: '../thumbnails/nestjs.png'
thumbnail: '../thumbnails/nestjs.png'
slug: how-to-manage-environment-variables-in-nestjs
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

## How to manage environment variables in Nest JS Part-5

![](../thumbnails/banner-nestjs.png)

| Blog   |      Name      |  Link |
|----------|:-------------:|------:|
| Part-1 | Nest JS Building REST APIs using Mongo DB Part-1  | https://tkssharma.com/building-rest-apis-with-nestjs-and-mongodb-part-1 |
| Part-2 | Nest JS APIs with mongoose Mongo DB Database Part-2  | https://tkssharma.com/building-rest-apis-with-nestjs-and-mongodb-part-2 |
| Part-3 | Nest JS Building Auth Service with JWT Tokens Part-3  | https://tkssharma.com/building-nestjs-auth-service-with-mongodb-part-3 |
| Part-4 | Nest JS with Mongo DB Managing Relationships Part-4 | https://tkssharma.com/building-nestjs-apis-with-mongodb-relationships |

Github Link
https://github.com/tkssharma/blogs/tree/master/nestjs-rest-apis-docs

In this post, I will demonstrate how to kickstart a simple RESTful APIs with NestJS from a newbie's viewpoint and will also understand managing environment variables 

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


# Externalizing the configuration

Till now, all configurations in our application is working for the local development environment, but they are written in hard codes. 

In the development and deployment stages of a real world application,  we have to consider a  flexible way to alter the configurations in the production environment without any code changes while the application is deployed continuously through a predefined delivery pipeline. 

Nestjs provides excellent configuration support, thus your application can read the configuration values from environment variables,  a *.env* file, etc. More info about the configuration, check  the [Configuration ](https://docs.nestjs.com/techniques/configuration) chapter from the Nestjs official docs.

In this post, we will move our hard-coded configuration we've used in the previous posts to a central place and organize them with the NestJS configuration facilities.

## Introduce to ConfigModule

First of all, install `@nestjs/config` package.

```bash
npm install @nestjs/config
```

Simply, import  `ConfigModule` in the top-level `AppModule`.

```typescript

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}
```

It will register a `ConfigService`  for you to read configuration properties by calling its `get` method.

```typescript
configService.get<string>('MONGO_URI')
```

Internally, Nestjs will scan `.env` file in the root folder. 

The following is a sample of the content of the `.env` file.

```env
MONGO_URI=mongodb://localhost/blog
```

If you want to read configuration from an environment-aware file, eg. `.dev.env` for development phase, then configure the location in `ConfigModule`.

```typescript
ConfigModule.forRoot({
  envFilePath: '.dev.env',
});
```

For the container deployment or cloud deployment, setup configuration in a config server or as environment variables or  K8s *ConfigMap* is more popular. 

## Externalizing application configurations

Personally, I prefer use a default hard-coded configuration in the development phase, and use environmental variables to override it in the production.

Nestjs also support load custom configuration where it can read configurations from the environment variables freely.

In the `AppModule`, disable  `.env` file support for `ConfigModule`.

```typescript
@Module({
   imports:[
    	ConfigModule.forRoot({ ignoreEnvFile: true }),
	] 
})
export class AppModule{}
```

Then create a *config* folder to organize all configurations in this application.

In the config folder, add a new configuration for *Mongo* database.

```typescript
//config/mongodb.config.ts

import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
  uri: process.env.MONGODB_URI || 'mongodb://localhost/blog',
}));
```

Here we use `registerAs`  to group the configurations related to the context *mongodb*.

In the `DatabaseModule`, load the *mongodb* configuration.

```typescript
import { databaseConnectionProviders } from './database-connection.providers';

@Module({
  imports: [ConfigModule.forFeature(mongodbConfig)],
  providers: [...databaseConnectionProviders,],
  exports: [...databaseConnectionProviders, ],
})
export class DatabaseModule { }
```

> You can also use Nestjs ConfigModule to load the configuration globally, but here we do not want to expose the mongodb config to other modules.

And change the database connection providers like this.

```typescript
import { ConfigType } from '@nestjs/config';
import { Connection, createConnection } from 'mongoose';
import mongodbConfig from '../config/mongodb.config';
import { DATABASE_CONNECTION } from './database.constants';

export const databaseConnectionProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (dbConfig: ConfigType<typeof mongodbConfig>): Connection =>
      createConnection(dbConfig.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //see: https://mongoosejs.com/docs/deprecations.html#findandmodify
        useFindAndModify: false
      }),
    inject: [mongodbConfig.KEY],
  }
];
```

In the above codes, provide a  token  `mongodbConfig.KEY`, you can inject a config instance as type `ConfigType<typeof mongodbConfig>`  in the factory method, then you can read the configuration in a **type safe** way via `dbConfig.uri`.

Similarly, create a configuration for the JWT authentication, move the existing JWT options into this configuration file.

```typescript
//config/jwt.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secretKey: process.env.JWT_SECRET_KEY || 'rzxlszyykpbgqcflzxsqcysyhljt',
  expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
}));

```

In the `AuthModule`, apply the configuration like this.

```typescript
import { ConfigModule, ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    ...
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      useFactory: (config: ConfigType<typeof jwtConfig>) => {
        return {
          secret: config.secretKey,
          signOptions: { expiresIn: config.expiresIn },
        } as JwtModuleOptions;
      },
      inject: [jwtConfig.KEY],
    }),
  ],
....
})
export class AuthModule {}
```

And open *jwt.stretagy.ts* file, change the value of **secretOrKey** to read from `jwtConfig`.

```typescript
import jwtConfig from '../../config/jwt.config';
import { ConfigType } from '@nestjs/config';
//...

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(jwtConfig.KEY) config: ConfigType<typeof jwtConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secretKey,
    });
  }
  //...
}
```

In a production environment, it is easy to change these settings by simply declaring an environment variables like this.

```base
export MONGODB_URI=mongodb://localhost:27019/blog
```

Or set it in the docker-compose file like this.

```typescript
version: '3.8' # specify docker-compose version
services:
  //...  
  api:
    environment:
      - "MONGODB_URI=mongodb://mongodb:27017/blog"
	//...
```

We will start a new topic of deployment in the further posts.



## Testing configurations

An example of `jwt-config.spec.ts`.

```typescript
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import jwtConfig from './jwt.config';

describe('jwtConfig', () => {
  let config: ConfigType<typeof jwtConfig>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(jwtConfig)],
    }).compile();

    config = module.get<ConfigType<typeof jwtConfig>>(jwtConfig.KEY);
  });

  it('should be defined', () => {
    expect(jwtConfig).toBeDefined();
  });

  it('should contains expiresIn and secret key', async () => {
    expect(config.expiresIn).toBe('3600s');
    expect(config.secretKey).toBe('rzxlszyykpbgqcflzxsqcysyhljt');
  });
});
```
Github Link
https://github.com/tkssharma/blogs/tree/master/nestjs-rest-apis-docs



