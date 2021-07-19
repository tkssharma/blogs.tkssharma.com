---
date: 2020-05-26
title: 'Nest JS with Redis as Microservices or for Caching'
template: post
featured:  '../thumbnails/nestjs.png'
thumbnail: '../thumbnails/nestjs.png'
slug: nestjs-with-redis-service-for-microservices
categories:
  - Popular
tags:
  - nestjs
  - redis
  - developers
  - microservice
---

# Nest JS with Redis for Microservices.💻 🔭 🎯🎺

Nest.js is a progressive Node.js Web Framework that provides you with a robust backend for your frontend applications. It is highly comparable to Angular in terms of concepts like Module, Provider, etc. and is a clear choice by Angular developers.

If you are interested, read more about Nest.js at:

*   [Nest.js official documentation](https://docs.nestjs.com)
*   [Node.js](https://nodejs.org/en/) v10.16.2 or > 10.x
*   [Docker v19.03](https://docs.docker.com/docker-for-mac/)
*   Code editor (Visual Studio Code, Sublime, etc.)


# How to add Redis into your Nest.js project

# Caching Nestjs way 

Caching is a great and simple technique that helps improve your app's performance. It acts as a temporary data store providing high performance data access.

Caching is a technique that you'll hear about a lot in the world of highly scalable and performance systems nowadays.

And when I mention caching, I hope that the first word that pops out of your head is Redis.
Beside caching, Redis is used for some other use cases:

 - Pub/Sub
 - Queues
 - Real-time analysis

### Installation#
First install the required package:

```bash
$ npm install --save cache-manager
```
In-memory cache or Redis cache

Nest provides a unified API for various cache storage providers. The built-in one is an in-memory data store. However, you can easily switch to a more comprehensive solution, like Redis. In order to enable caching, first import the CacheModule and call its register() method.

```javascript
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [CacheModule.register()],
  controllers: [AppController],
})
export class ApplicationModule {}

```
Or you can use Nest JS as Cache Provider with cacheModule 

```javascript
import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from './redisCache.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: configService.get('CACHE_TTL'),
      }),
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService] // This is IMPORTANT,  you need to export RedisCacheService here so that other modules can use it
})
export class RedisCacheModule {}
```

This can be written in better way be doing dynamic registration if you are getting config at runtime using custom config module 
```javascript
import { Injectable } from '@nestjs/common';

import { DEFAULT_CONFIG } from './config.default';
import { ConfigData, RedisConfig } from './config.interface';

/**
 * Provides a means to access the application configuration.
 */
@Injectable()
export class ConfigService {
  private config: ConfigData;

  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }
  public loadFromEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.ENV || DEFAULT_CONFIG.env,
      port: env.PORT ? parseInt(env.PORT, 10) : DEFAULT_CONFIG.port,
      logLevel: env.LOG_LEVEL || DEFAULT_CONFIG.logLevel,
      redis: env.REDIS_HOST ? this.getRedisConfig(env) : DEFAULT_CONFIG.redis,
    };
  }
  private getRedisConfig(env: NodeJS.ProcessEnv): RedisConfig {
    return {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      ttl: parseInt(env.REDIS_TTL, 10)
    };
  }
  public get(): Readonly<ConfigData> {
    return this.config;
  }
}
```

Here is our Redis module and service, we are using CacheModule.registerAsync with redis as store provider and later we can create service to access redis key/value pair 

```javascript
import { Module, DynamicModule, CacheModuleAsyncOptions, CacheModuleOptions } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConfigCacheError } from './cache.error';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/common';
import { RedisCacheService } from './redisCache.service';

@Module({})
export class RedisCacheModule {

  public static geRedisConnectionOptions(config: ConfigService): CacheModuleOptions {
    const redis = config.get().redis;

    if (!redis) {
      throw new ConfigCacheError('redis config is missing');
    }
    return {
      store: redisStore,
      host: redis.host,
      port: redis.port,
      ttl: redis.ttl,
    };
  }
  public static forRoot(): DynamicModule {
    return {
      module: CacheModule,
      imports: [
      CacheModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => RedisCacheModule.geRedisConnectionOptions(configService),
        inject: [ConfigService],
      }),
      ],
      controllers: [],
      providers: [RedisCacheService],
      exports: [RedisCacheService],
    };
  }
}
```


```javascript
import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async get(key) {
    await this.cache.get(key);
  }

  async set(key, value) {
    await this.cache.set(key, value);
  }
  async del(key, value) {
    await this.cache.del(key);
  }
}
```
# Nestjs Redis as a simple Microservices 

- Sending messages with Redis in NestJS

First, we need to add the redis package to our project with:
```bash
yarn add redis
```
Now that we have Redis installed we just need to change 2 files! Yes in our case only 2! amazing right? So let's do it!
```javascript
First apps/blog/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('Blog');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
    },
  });
  await app.listen(() => logger.log('Microservice is listening'));
}
bootstrap();
```

We just changed the transport option from TCP to REDIS and of course, now we need to change the server.

Second apps/lampeweb/src/app.service.ts
```javascript
import { Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      }
    });
  }

  public getHello(): Promise<string> {
    return this.client.send<string, string>('getHello', 'Michael').toPromise();
  }
}
```

Here again, we are just chaining the ClientProxyFactory.create function to the same values as before. In a bigger project, this should not be hardcoded but rather passed in via env.
We now just need to run our services again and we should see the same message as last time!

Okay so these are many use-case of using redis with Nestjs 
 - as a Microservices
 - as a cache Store with Cache Module

You can check my sample code here.
https://github.com/tkssharma/blogs

Happy coding!