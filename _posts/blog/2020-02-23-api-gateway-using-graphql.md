---
date: 2020-02-23
title: 'API Gateway using Graphql'
template: post
thumbnail: '../thumbnails/graphql.png'
slug: build-api-gateway-using-graphql
categories:
  - Popular
  - Javascript
  - Graphql
tags:
  - Graphql
---

An API Gateway is a microservice pattern where a separate service is built to sit in front of your other back-end services. This service acts as a back-end for front-ends, where it can proxy and unify access to a variety of back-end services. This pattern can allow for varying use-cases, but typically this is done to unify client network access, centralize authentication, and combine data from multiple services’ data stores.

![](../thumbnails/gateway.png)

Graphql can help us in building this solution where we can create  API Gateway which can futher talk to other required services, It can work as reverse proxy pattern where client doesn't know which server going to serve a request.

GraphQL an obvious candidate for an API Gateway. In short, it’s a ready-made ecosystem and a perfect fit for this functionality. If you were to build an API Gateway over REST from scratch, you would have to establish new shapes and conventions for a new interface. GraphQL provides the tools to quickly build these with typing, mocking, documentation, and playground functionality for free

## what we want to build

![](../thumbnails/gate01.png)

Lets explore more on Graphql

GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

A GraphQL service is created by defining types and fields on those types, then providing functions for each field on each type. For example, a GraphQL service that tells us who the logged in user is (me) as well as that user's name might look something like this:
```javascript

type Query {
  me: User
}

type User {
  id: ID
  name: String
}
// Along with functions for each field on each type:
function Query_me(request) {
  return request.auth.user;
}

function User_name(user) {
  return user.getName();
}
```
### Defines a data shape

The first thing you’ll notice is that GraphQL queries mirror their response. This makes it easy to predict the shape of the data returned from a query, as well as to write a query if you know the data your app needs. More important, this makes GraphQL really easy to learn and use. GraphQL is unapologetically driven by the data requirements of products and of the designers and developers who build them.

### Hierarchical:
Another important aspect of GraphQL is its hierarchical nature. GraphQL naturally follows relationships between objects, where a RESTful service may require multiple round-trips (resource-intensive on mobile networks) or a complex join statement in SQL. This data hierarchy pairs well with graph-structured data stores and ultimately with the hierarchical user interfaces it’s used within.


### Strongly typed
 Each level of a GraphQL query corresponds to a particular type, and each type describes a set of available fields. Similar to SQL, this allows GraphQL to provide descriptive error messages before executing a query.

### Protocol, not storage:
Each GraphQL field on the server is backed by any arbitrary function. GraphQL had to leverage all this existing work to be useful, and so does not dictate or provide any backing storage. Instead, GraphQL takes advantage of your existing code.
Introspective: A GraphQL server can be queried for the types it supports. This creates a powerful platform for tools and client software to build atop this information like code generation in statically typed languages, Relay, or IDEs like GraphiQL (pictured below). GraphiQL helps developers learn and explore an API quickly without grepping the codebase or wrangling with cURL.

### what should we do in API Gateway

- The GraphQL gateway should be just another service.
- The GraphQL gateway should not know anything about business logic / resolvers that belong to the backend services.
Feature wise, I’d like to see GraphQL gateway handle these things, for example:
- Schema validation / registry
- Rate limiting / Query Costing
- Circuit Breaking / Retries / Partial responses / Everything Resiliency
- Metric collection
- Simple data manipulations (to fit service calls into the final GraphQL schema for example)
- Schema evolution tooling (Field usage, deprecations, sunsetting fields, etc)
- Query execution (parallel requests, query plans, etc)

simple Graphql Middleware/API Gateway can be build using Apollo Graphql and other options are also available from other infra components.
Simple Gateway can be as simple as making other services from Middleware based on schema defination, In this Example we will try to make HTTP call to other REST data source from API Gateway or middleware

Creating an apollo graphql server:
```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    token: req.headers.authorization,
  }),
  dataSources: () => ({
    authAPI: new AuthRestAPIs(),
    hackioAPI: new HackIORestAPIs(),
    genextAPI: new GenNextAPIs(),
  }),
});
server.applyMiddleware({ app });

if (!module.parent) {
  // global.connection = connection;
  app.listen({ port: process.env.PORT || 3000 }, () =>
    // eslint-disable-next-line no-console
    logger.info(`🚀 🚀 🚀 🚀  Server ready at http://localhost:3000${server.graphqlPath} 🚀 🚀 🚀 `),
  );
}
```
we can define typedef and resolvers for bootstraping our Apollo API Gateway, API gateway or Middleware should have schema defined with all required objects as example below ApolloServer takes different arguments like type-defination, resolvers and Context where we can pass different data source to make REST API Calls

```javascript
const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    users: [User]
    user: User
    validate: Validate
    logout: Response
  }
  type Response {
    success: Boolean!
    message: String!
    description: String
    error: String
    code: String
  }
  type Validate {
    success: Boolean!
    message: String!
    description: String
  }

  extend type Mutation {
    forgotPassword(email: String!): Response!
    removeUser(id: Int!): Boolean
    register(
      first_name: String
      last_name: String
      username: String!
      email: String!
    ): Response!
    login(email: String!, password: String!): Token!
  }

  type User {
    id: ID
    first_name: String
    last_name: String
    username: String!
    email: String!
  }
  type Token {
    token: String!
    success: Boolean!
    message: String
    description: String
    error: String
    code: String
    profile: User
  }
`;
```
Lets define resolvers to define different Query and mutations which apollo client can call to get data from API Gateway
```javascript
const resolvers = {
  Query: {
    users: (parent, args, { dataSources }) => {
      return null;
    },
    user: (parent, args, { dataSources }) => {
      return dataSources.authAPI.getUser();
    },
  },
  Mutation: {
    login: (parent, { email, password }, { dataSources }) => {
      const authPayload = {
        email,
        password,
      };
      return dataSources.authAPI.login(authPayload);
    },
  },
};
```
This is making HTTP call to external service and returning data back to API Gateway
```javascript
dataSources.authAPI.getUser();
```
We are using Apollo REST Data Source to make REST API calls
This package exports a (RESTDataSource) class which is used for fetching data from a REST API and exposing it via GraphQL within Apollo Server.

```javascript
npm install --save apollo-datasource-rest
```

To define a data source, extend the RESTDataSource class and implement the data fetching methods that your resolvers require. Data sources can then be provided via the dataSources property to the ApolloServer constructor, as demonstrated in the Accessing data sources from resolvers section below.

Your implementation of these methods can call on convenience methods built into the RESTDataSource class to perform HTTP requests, while making it easy to build up query parameters, parse JSON results, and handle errors.

```javascript
const { RESTDataSource } = require('apollo-datasource-rest');

class MoviesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://movies-api.example.com/';
  }

  async getMovie(id) {
    return this.get(`movies/${id}`);
  }

  async getMostViewedMovies(limit = 10) {
    const data = await this.get('movies', {
      per_page: limit,
      order_by: 'most_viewed',
    });
    return data.results;
  }
}
```
HTTP Methods
The get method on the RESTDataSource makes an HTTP GET request. Similarly, there are methods built-in to allow for POST, PUT, PATCH, and DELETE requests.
```javascript
class MoviesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://movies-api.example.com/';
  }

  // an example making an HTTP POST request
  async postMovie(movie) {
    return this.post(
      `movies`, // path
      movie, // request body
    );
  }

  // an example making an HTTP PUT request
  async newMovie(movie) {
    return this.put(
      `movies`, // path
      movie, // request body
    );
  }

  // an example making an HTTP PATCH request
  async updateMovie(movie) {
    return this.patch(
      `movies`, // path
      { id: movie.id, movie }, // request body
    );
  }

  // an example making an HTTP DELETE request
  async deleteMovie(movie) {
    return this.delete(
      `movies/${movie.id}`, // path
    );
  }
}
```

All of the HTTP helper functions (get, put, post, patch, and delete) accept a third options parameter, which can be used to set things like headers and referrers. For more info on the options available, see MDN's fetch docs.

Intercepting fetches
Data sources allow you to intercept fetches to set headers, query parameters, or make other changes to the outgoing request. This is most often used for authorization or other common concerns that apply to all requests. Data sources also get access to the GraphQL context, which is a great place to store a user token or other information you need to have available.

You can easily set a header on every request:
```javascript
class PersonalizationAPI extends RESTDataSource {
  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }
}
```

Or add a query parameter:
```javascript
class PersonalizationAPI extends RESTDataSource {
  willSendRequest(request) {
    request.params.set('api_key', this.context.token);
  }
}
```

If you're using TypeScript, make sure to import the RequestOptions type:

```javascript
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

class PersonalizationAPI extends RESTDataSource {
  baseURL = 'https://personalization-api.example.com/';

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.token);
  }
}
```

Resolving URLs dynamically
In some cases, you'll want to set the URL based on the environment or other contextual values. You can use a getter for this:

```javascript
get baseURL() {
  if (this.context.env === 'development') {
    return 'https://movies-api-dev.example.com/';
  } else {
    return 'https://movies-api.example.com/';
  }
}
```

If you need more customization, including the ability to resolve a URL asynchronously, you can also override resolveURL:
Accessing data sources from resolvers
To give resolvers access to data sources, you pass them as options to the ApolloServer constructor:

```javascript

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      moviesAPI: new MoviesAPI(),
      personalizationAPI: new PersonalizationAPI(),
    };
  },
  context: () => {
    return {
      token: 'foo',
    };
  },
});
```
Apollo Server will put the data sources on the context for every request, so you can access them from your resolvers. It will also give your data sources access to the context. (The reason for not having users put data sources on the context directly is because that would lead to a circular dependency.)

From our resolvers, we can access the data source and return the result:
```javascript
 Query: {
    movie: async (_source, { id }, { dataSources }) => {
      return dataSources.moviesAPI.getMovie(id);
    },
    mostViewedMovies: async (_source, _args, { dataSources }) => {
      return dataSources.moviesAPI.getMostViewedMovies();
    },
    favorites: async (_source, _args, { dataSources }) => {
      return dataSources.personalizationAPI.getFavorites();
    },
  },
```
