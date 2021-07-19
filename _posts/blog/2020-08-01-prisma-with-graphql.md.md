---
date: 2020-08-01
title: 'Graphql API Development with Prisma'
template: post
thumbnail: '../thumbnails/prisma.png'
slug: Graphql-api-development-using-prisma
categories:
  - graphql
  - prisma
  - nodejs
tags:
  - nodejs
  - graphql
---


# The New Modern Backend: Node, GraphQL, Prisma & Docker

GraphQL is a query language for APIs that consists of a schema definition language and a query language, which allows API consumers to fetch only the data they need to support flexible querying. GraphQL enables developers to evolve the API while meeting the different needs of multiple clients, for example iOS, Android, and web variants of an app. Moreover, the GraphQL schema adds a degree of type safety to the API while also serving as a form of documentation for your API.

Prisma is an open-source database toolkit. It consists of three main tools:

- Prisma Client: Auto-generated and type-safe query builder for Node.js & TypeScript.
- Prisma Migrate: Declarative data modeling & migration system.
- Prisma Studio: GUI to view and edit data in your database.
- Prisma facilitates working with databases for application developers who want to focus on implementing value-adding features instead of spending time on complex database workflows (such as schema migrations or writing complicated SQL queries).

In this tutorial, you will use GraphQL and Prisma in combination as their responsibilities complement each other. GraphQL provides a flexible interface to your data for use in clients, such as frontends and mobile apps—GraphQL isn’t tied to any specific database. This is where Prisma comes in to handle the interaction with the database where your data will be stored.

You’ll build a GraphQL API for a blogging application in JavaScript using Node.js. You will first use Apollo Server to build the GraphQL API backed by in-memory data structures. You will then deploy the API to the DigitalOcean App Platform. Finally you will use Prisma to replace the in-memory storage and persist the data in a PostgreSQL database and deploy the application again.

At the end of the tutorial, you will have a Node.js GraphQL API deployed to DigitalOcean, which handles GraphQL requests sent over HTTP and performs CRUD operations against the PostgreSQL database.


### Step 1 — Creating the Node.js Project

You’re now ready to configure TypeScript in your project.

Execute the following command to install the necessary dependencies:
```sh
npm install apollo-server graphql --save
```
 
This installs two packages as dependencies in your project:

apollo-server: The HTTP library that you use to define how GraphQL requests are resolved and how to fetch data.
graphql: is the library you’ll use to build the GraphQL schema.
You’ve created your project and installed the dependencies. In the next step you will define the GraphQL schema.

Step 2 — Defining the GraphQL Schema and Resolvers
In this step, you will define the GraphQL schema and corresponding resolvers. The schema will define the operations that the API can handle. The resolvers will define the logic for handling those requests using in-memory data structures, which you will replace with database queries in the next step.


```javascript
prisma-graphql/src/schema.js
const { gql } = require('apollo-server')

const typeDefs = gql`
  type Post {
    content: String
    id: ID!
    published: Boolean!
    title: String!
  }

  type Query {
    feed: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createDraft(content: String, title: String!): Post!
    publish(id: ID!): Post
  }
`
```
 
Here you define the GraphQL schema using the gql tagged template. A schema is a collection of type definitions (hence typeDefs) that together define the shape of queries that can be executed against your API. This will convert the GraphQL schema string into the format that Apollo expects.

The schema introduces three types:

- Post: Defines the type for a post in your blogging app and contains four fields where each field is followed by its type, for example, String.
- Query: Defines the feed query which returns multiple posts as denoted by the square brackets and the post query which accepts a single argument and returns a single Post.
- Mutation: Defines the createDraft mutation for creating a draft Post and the publish mutation which accepts an id and returns a Post.
- Note that every GraphQL API has a query type and may or may not have a mutation type. These types are the same as a regular object type, but they are special because they define the entry point of every GraphQL query.

```javascript
prisma-graphql/src/schema.js
...
const posts = [
  {
    id: 1,
    title: 'Subscribe to GraphQL Weekly for community news ',
    content: 'https://graphqlweekly.com/',
    published: true,
  },
  {
    id: 2,
    title: 'Follow DigitalOcean on Twitter',
    content: 'https://twitter.com/digitalocean',
    published: true,
  },
  {
    id: 3,
    title: 'What is GraphQL?',
    content: 'GraphQL is a query language for APIs',
    published: false,
  },
]
```
 
You define the posts array with three pre-defined posts. Notice that the structure of each post object matches the Post type you defined in the schema. This array holds the posts that will be served by the API. In a subsequent step, you will replace the array once the database and Prisma Client are introduced.

Next, define the resolvers object below the posts array you just defined:

```javascript
prisma-graphql/src/schema.js
...
const resolvers = {
  Query: {
    feed: (parent, args) => {
      return posts.filter((post) => post.published)
    },
    post: (parent, args) => {
      return posts.find((post) => post.id === Number(args.id))
    },
  },
  Mutation: {
    createDraft: (parent, args) => {
      posts.push({
        id: posts.length + 1,
        title: args.title,
        content: args.content,
        published: false,
      })
      return posts[posts.length - 1]
    },
    publish: (parent, args) => {
      const postToPublish = posts.find((post) => post.id === Number(args.id))
      postToPublish.published = true
      return postToPublish
    },
  },
  Post: {
    content: (parent) => parent.content,
    id: (parent) => parent.id,
    published: (parent) => parent.published,
    title: (parent) => parent.title,
  },
}
module.exports = {
  resolvers,
  typeDefs,
}
```
 
You define the resolvers following the same structure as the GraphQL schema. Every field in the schema’s types has a corresponding resolver function whose responsibility is to return the data for that field in your schema. For example, the Query.feed() resolver will return the published posts by filtering the posts array.

Resolver functions receive four arguments:

- parent: The parent is the return value of the previous resolver in the resolver chain. For top-level resolvers, the parent is undefined, because no previous resolver is called. For example, when making a feed query, the query.feed() resolver will be called with parent’s value undefined and then the resolvers of Post will be called where parent is the object returned from the feed resolver.
- args: This argument carries the parameters for the query, for example, the post query, will receive the id of the post to be fetched.
context: An object that gets passed through the resolver chain that each resolver can write to and read from, which allows the resolvers to share information.
- info: An AST representation of the query or mutation. You can read more about the details in part III of this series: Demystifying the info Argument in GraphQL Resolvers.
Since the context and info are not necessary in these resolvers, only parent and args are defined.

Save and exit the file once you’re done.
### Now create Graphql Server 

```javascript
const { ApolloServer } = require('apollo-server')
const { resolvers, typeDefs } = require('./schema')

const port = process.env.PORT || 8080

new ApolloServer({ resolvers, typeDefs }).listen({ port }, () =>
  console.log(`Server ready at: http://localhost:${port}`),
)
```

Your GraphQL API is ready to run. Start the server with the following command:

```sh
node src/server.js
```
 
You will receive the following output: launch browser and see graphql playground
Server ready at: http://localhost:8080