---
date: 2020-06-29
title: 'Nest JS with Graphql Building APIs'
template: post
thumbnail: '../thumbnails/nestjs.png'
slug: nestjs-with-graphql-api-development
categories:
  - nestjs
  - nodejs
  - Popular
tags:
  - nodejs
  - development
---

## Nest JS with Graphql Building APIs

### Harnessing the power of TypeScript & GraphQL
GraphQL is a powerful query language for APIs and a runtime for fulfilling those queries with your existing data. It's an elegant approach that solves many problems typically found with REST APIs. For background, we suggest reading this comparison between GraphQL and REST. GraphQL combined with TypeScript helps you develop better type safety with your GraphQL queries, giving you end-to-end typing.

In this chapter, we assume a basic understanding of GraphQL, and focus on how to work with the built-in @nestjs/graphql module. The GraphQLModule is a wrapper around the Apollo server. We use this proven GraphQL package to provide a way to use GraphQL with Nest.


### Installation
Start by installing the required packages:

```sh
$ npm i @nestjs/graphql graphql-tools graphql apollo-server-express
```

Nest offers two ways of building GraphQL applications, the code first and the schema first methods. You should choose the one that works best for you. Most of the chapters in this GraphQL section are divided into two main parts: one you should follow if you adopt code first, and the other to be used if you adopt schema first.

In the code first approach, you use decorators and TypeScript classes to generate the corresponding GraphQL schema. This approach is useful if you prefer to work exclusively with TypeScript and avoid context switching between language syntaxes.

In the schema first approach, the source of truth is GraphQL SDL (Schema Definition Language) files. SDL is a language-agnostic way to share schema files between different platforms. Nest automatically generates your TypeScript definitions (using either classes or interfaces) based on the GraphQL schemas to reduce the need to write redundant boilerplate code.

Getting started with GraphQL & TypeScript#
Once the packages are installed, we can import the GraphQLModule and configure it with the forRoot() static method.

```javascript

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({}),
  ],
})
export class AppModule {}
```

The forRoot() method takes an options object as an argument. These options are passed through to the underlying Apollo instance (read more about available settings here). For example, if you want to disable the playground and turn off debug mode, pass the following options:

```javascript
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      playground: false,
    }),
  ],
})
export class AppModule {}
```
As mentioned, these options will be forwarded to the ApolloServer constructor.

## Lets Build Application from scratch 

we will get GraphQLModule from '@nestjs/graphql' and will initilize graphql in graphql service  
```
import { Module, CacheModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphqlModule } from './config/graphql/graphql.module'
import { GraphqlService } from './config/graphql/graphql.service'
@Module({
	imports: [
		GraphQLModule.forRootAsync({
			useClass: GraphqlService
		}),
		GraphqlModule,
		DishModule,
		SiteModule
	]
})
export class AppModule {}
```

this is our graphql service with all required configuration which we can play with 

```javascript
import { Injectable } from '@nestjs/common'
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql'
import { UserService } from '../../modules/user/user.service'
import { GraphQLError } from 'graphql'
import { join } from 'path'


@Injectable()
export class GraphqlService implements GqlOptionsFactory {
	constructor(private readonly userService: UserService) {}

	async createGqlOptions(): Promise<GqlModuleOptions> {
		const directiveResolvers = {
			isAuthenticated: (next, source, args, ctx) => {
				const { currentUser } = ctx

				if (!currentUser) {
					throw new Error('You are not authenticated!')
				}

				return next()
			},
			hasRole: (next, source, args, ctx) => {
				const { role } = args
				const { currentUser } = ctx

				if (!currentUser) {
					throw new Error('You are not authenticated!')
				}

				if (role !== currentUser.role) {
					throw new Error(
						`Must have role: ${role}, you have role: ${currentUser.role}`
					)
				}
				return next()
			}
		}

		return {
			typePaths: ['./**/*.graphql'],
			definitions: {
				path: join(process.cwd(), 'src/graphql.ts'),
				outputAs: 'class'
			},
			directiveResolvers,
			context: async ({ req, res, connection }) => {
				if (connection) {
					return {
						req: connection.context,
					}
				}

				let currentUser = ''
				const { token } = req.headers
				if (token) {
					currentUser = await this.userService.findOneByToken(token)
				}
				return {
					req,
					res,
					pubSub,
					currentUser
				}
			},
			formatError: err => {
				// console.log(err)
				return err
			},
			formatResponse: err => {
				// console.log(err)
				return err
			},
			debug: false,
			subscriptions: {
				onConnect: (connectionParams, webSocket, context) => {
					console.log('🔗 Connected to websocket')
				}
			},
			persistedQueries: {
				cache: new MemcachedCache(
					['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
					{ retries: 10, retry: 10000 } // Options
				)
			},
			installSubscriptionHandlers: true,
			introspection: true,
			playground: {
				settings: {
					'editor.cursorShape': 'line', // possible values: 'line', 'block', 'underline'
					'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
					'editor.fontSize': 14,
					'editor.reuseHeaders': true, // new tab reuses headers from last tab
					'editor.theme': 'dark', // possible values: 'dark', 'light'
					'general.betaUpdates': false,
					'queryPlan.hideQueryPlanResponse': false,
					'request.credentials': 'include', // possible values: 'omit', 'include', 'same-origin'
					'tracing.hideTracingResponse': true
				}
			}
		}
	}
}

```

This service talks about lot of different things 

-  Checking role for each and every query [auth and authz for apis]
-  managing cache for queries 
-  passing data connection and logged In user data in all query and mutations 
-  all playground options 

Important part of this Service is what it returns 
```javascript
return {
			typePaths: ['./**/*.graphql'],
			definitions: {
				path: join(process.cwd(), 'src/graphql.ts'),
				outputAs: 'class'
			},
			directiveResolvers,
			context:  {}
}
```      

To persist queries we are using MemcachedCache or Elastic search can be used 
```javascript
			persistedQueries: {
				cache: new MemcachedCache(
					['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
					{ retries: 10, retry: 10000 } // Options
				)
			},
```    

## CRUD with object User

Now we can define our modules having resolvers and services like user module for User CRUD

```javascript
import { Module, Global } from '@nestjs/common'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UserResolver, UserService],
	exports: [UserService]
})
export class UserModule {}
```


This is how our resolves look like and every module now can have their own .graphql type definitions file file

```javascript
type User {
	_id: String!
	username: String!
	password: String!
	email: String!
	role: RoleEnum!
	status: Boolean!
	createdAt: String!
	updatedAt: String!
}

type Query {
	hello: String!
	me: User @isAuthenticated
	users(offset: Int!, limit: Int!): [User!] @isAuthenticated
	user(_id: String!): User @isAuthenticated
}

type Mutation {
	register(input: CreateUserInput!): User
	updateUser(_id: String!, input: UpdateUserInput!): Boolean
	deleteUser(_id: String!): Boolean @hasRole(role: "admin")
	deleteUsers: Boolean! @hasRole(role: "admin")
	login(input: LoginUserInput!): LoginResponse
	setRole(_id: String!, role: RoleEnum!): Boolean @isAuthenticated
}

type Subscription {
	userCreated: User
}
```
### Resolver for User APIs with Query and Mutations

```javascript
import { UpdateUserInput } from '../../graphql'

@Resolver('User')
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => String)
	async hello() {
		return await 'world'
	}

	@Query(() => User)
	async me(@Context('currentUser') currentUser: User) {
		return await currentUser
	}

	@Query(() => [User])
	async users(@Args('offset') offset: number, @Args('limit') limit: number) {
		return this.userService.findAll(offset, limit)
	}
  ```
  Our Simple services will fetch data from ORM layer 

```javascript
import { Injectable } from '@nestjs/common';
import { UserInput } from './user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from 'typeorm';
import * as uuid from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(input: UserInput): Promise<User> {
    const user = new User();
    user._id = uuid.v4();
    user.username = input.username;
    user.password = input.password;
    return this.userRepository.save(user);
  }
}
```

### GitHub Link for Repo
- https://github.com/tkssharma/blogs/tree/master/nestjs-graphql-typeorm