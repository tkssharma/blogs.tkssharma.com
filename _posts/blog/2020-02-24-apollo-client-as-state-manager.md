---
date: 2020-02-24
title: 'Graphql Apollo client as State Manager for React Client'
template: post
thumbnail: '../thumbnails/graphql.png'
slug: graphql-apollo-managing-state-client-side
categories:
  - Popular
  - Javascript
  - Graphql
tags:
  - Graphql
---

The component-based approach of React and other frontend frameworks like Vue and Angular has changed the way our web looks like today. One massive part of their success story is the way components communicate and share state with each other. This empowers the developer to create maintainable software by separating different parts of logic and state into dedicated components that pushes our future web.

Here we will talk about How apollo client can be useful for managing state of react application
We have different options to manage state of react Application

- Redux
- Mbox
- Context APIs
- Hooks in functional Components
- Using Local state in component
- Flux
- Latest one is Apollo client as state Manager

![](https://soshace-12d3e.kxcdn.com/wp-content/uploads/2019/11/Apollo-Client-and-Local-State-Management-Inside.jpg)

Graphql is evolving in different directions and being used in different solutions

* Graphql Caching at client and server-side
* Graphql as API Gateway or Middleware
* Graphql serving as state manager at client side
* Graphql Schema designing and evolve schema over time
* Graphql for building powerful server side Node JS Application

Apollo Server is a library that helps you build an API using GraphQL. It can connect to any data source, including REST APIs and databases, and integrates with Apollo developer tooling.

REST APIs are not a good fit for modern apps because they require large amounts of hard-to-manage data fetching code. With Apollo, components simply declare their data requirements using GraphQL and Apollo gets the right data to the right place – with strong end-to-end typing that prevents bugs and boosts productivity.
We have laready covered other parts about graphql in other blogs here we will talk about managing state using graphql client

## Apollo client as state Manager for React Application

One common misconception about GraphQL is that it’s coupled to a specific server implementation. In fact, it’s much more flexible than that. It doesn’t matter if you’re requesting from a gRPC server, REST endpoint, or your client-side cache — GraphQL is a universal language for data that’s completely agnostic of its source.

This is why GraphQL queries and mutations are a perfect fit for describing what’s happening with our application’s state. Instead of dispatching actions, we use GraphQL mutations to express state changes. We can access our state by declaratively expressing our component’s data requirements with a GraphQL query.

One of the biggest advantages of GraphQL is that we can aggregate data from multiple sources, both local and remote, in one query by specifying GraphQL directives on our fields. 🎉 Let’s find out how!

![](https://miro.medium.com/max/3480/1*ZHTs1iOH247NQLEOxXzHFw.png)


Configuring the client
First, there are a number of packages we’ll need to pull in:
```shell
yarn add @apollo/react-hooks apollo-cache-inmemory apollo-client graphql graphql-tag react react-dom
```

Below you’ll find index.js on the client in its entirety. We’ll walk through the client-side schema specific pieces next:

```javascript
import React from "react";
import ReactDOM from "react-dom";

import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";

import App from "./App";
import userSettings from "./userSettings";

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
  }
  type Query {
    GetUser: User!
  }
  type Mutation {
    updateUser(data: User!): User!
  }
`;

const resolvers = {
  Query: {
    GetUser: () => userSettings.user
  },
  Mutation: {
    updateUser: (_, { user }) => {
      userSettings.user.email = user.email;
      return userSettings.user;
    }
  }
};

const client = new ApolloClient({
  cache: new InMemoryCache({
    freezeResults: true
  }),
  typeDefs,
  resolvers,
  assumeImmutableResults: true
});

const TogglesApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<TogglesApp />, document.getElementById("root"));
```

irst, we define typeDefs and resolvers.
The User type will have required id, name, and email fields. This will allow us to fetch and mutate the app bar’s color through GraphQL queries and mutations!
```javascript
type User {
  id: Int!
  name: String!
  email: String!
}
```

Next up, we define the Query type so that we can fetch the User:
```javascript
type Query {
  getUser: User!
}
```
Finally, you guessed it, we need to define the Mutation type so that we can update
```javascript
type Mutation {
  updateUser(data: User!): User!
}
```
Finally, we set up our client. Often, you will find yourself instantiating ApolloClient with alink property. However, since we have added a cache and resolvers, we do not need to add a link. We do, however, add a couple of properties that may look unfamiliar. As of apollo-client 2.6, you can set an assumeImmutableResults property to true to let apollo-client know that you are confident you are not modifying cache result objects.

 This can, potentially, unlock substantial performance improvements. To enforce immutability, you can also add the freezeResults property to inMemoryCache and set it to true. Mutating frozen objects will now throw a helpful exception in strict mode in non-production environments. To learn more, read the “What’s new in Apollo Client 2.6” post from Ben Newman.
 ```javascript
const client = new ApolloClient({
  cache: new InMemoryCache({
    freezeResults: true
  }),
  typeDefs,
  resolvers,
  assumeImmutableResults: true
});
 ```
That’s it! Now, simply pass this client to ApolloProvider and we’ll be ready to write our query and mutation! 🚀

```javascript
const TogglesApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
```

Querying client-side data

We’re now going to query our client cache using GraphQL. Note that in this proof-of-concept, we simply define the initial state of our userSettings in a JSON blob:

Note the need to define the type with the __typename property.
We then define our query in its own .js file. You could choose to define this in the same file the query is called from or even in a .graphql file though.
```javascript
import gql from "graphql-tag"; 🤷‍♂️

const USER_QUERY = gql`
  query getUser {
    getUser @client {
      id @client
      name @client
      email @client
    }
  }
`;

export default USER_QUERY; 🤷‍♂️
```

The most important thing to notice about this query is the use of the @client directive. We need to add this to both the appBarColorSetting query as well as each of the id, name and setting fields as they are all client-specific. Let’s take a look at how we call this query next:

Now there are many options to make graphql query using Hooks or using apollo client
```javascript
function App() {
  const { loading, data } = useQuery(USER_QUERY);
  if (loading) return <h2>Loading...</h2>;
  return (
    <div>
      <AppBar position="static" color={data.getUser.email}>
      </AppBar>
    </div>
  );
}

export default App;
```

You can explore More on managing state using apollo client from official documentation


