---
date: 2020-08-02
title: 'Graphql API Development with graphql-yoga'
template: post
thumbnail: '../thumbnails/yoga.png'
slug: graphql-api-development-using-graphql-yoga
categories:
  - graphql
  - prisma
  - yoga-graphql
  - nodejs
tags:
  - nodejs
  - graphql
---


# Building APIs using Graphql-Yoga
🧘 Fully-featured GraphQL Server with focus on easy setup, performance & great developer experience

![GraphQL: An Efficient alternative to REST](https://www.multidots.com/wp-content/uploads/2018/02/banner-8.jpg?quality=90)
## graphql-yoga

Fully-featured GraphQL Server with focus on easy setup, performance & great developer experience
Easiest way to run a GraphQL server: Sensible defaults & includes everything you need with minimal setup.
Includes Subscriptions: Built-in support for GraphQL subscriptions using WebSockets.
Compatible: Works with all GraphQL clients (Apollo, Relay...) and fits seamless in your GraphQL workflow.
graphql-yoga is based on the following libraries & tools:

- express/apollo-server: Performant, extensible web server framework
- graphql-subscriptions/subscriptions-transport-ws: GraphQL subscriptions server
- graphql.js/graphql-tools: GraphQL engine & schema helpers
- graphql-playground: Interactive GraphQL IDE


```javascript
import { GraphQLServer } from 'graphql-yoga'
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
```

#### Let’s Build a GraphQL Node Server That Hits the Pokemon API

```sh
yarn add graphql-yoga nodemon node-fetch
graphql-yoga: our GraphQL server klibrary
```

nodemon: helps us auto restart the server after changes, because ya know.. we lazy.
node-fetch: our AJAX method of choice, but feel free to use your preffered (such as axios).
next add the below to your package.json file.

```sh
"scripts": {
  "start": "nodemon index.js"
},
```

create index.js using `touch index.js`
and paste the following. Don’t worry explanations are below..

```javascript
const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");

const typeDefs = `
  type Query {
    getPokemon(id: Int!): Pokemon
  }

  type Pokemon {
    id: Int
    name: String
    height: Int
    abilities: [AbilityObj]
    stats: [StatObj]
  }

  type AbilityObj {
    slot: Int
    is_hidden: Boolean
    ability: Ability
  }

  type Ability {
    name: String
    url: String
  }

  type StatObj {
    effort: Int
    base_stat: Int
    stat: Stat
  }

  type Stat {
    name: String
    url: String
  }
`;

const resolvers = {
  Query: {
    getPokemon: async (_, { id }) => {
      const response = await fetch(`http://pokeapi.co/api/v2/pokemon/${id}`);
      return response.json();
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
```

In the TypeDefs we create a couple different Types based off of what the Pokemon API returns and what information we want. The Pokemon API returns an INCREDIBLE amount of information, so for brevity's sake we only use a few characteristics.
Type Pokemon
Among MANY other things the API returns an id, name, height, abilities (which is an array) and stats (also an array).

```javascript
type Pokemon {
  id: Int
  name: String
  height: Int
  abilities: [AbilityObj]
  stats: [StatObj]
}
```
Type Ability & Stat
Included in the abilities array are several objects (abilities) each with a name and url. Same goes for stats.

```javascript
type Ability {
  name: String
  url: String
}
type Stat {
  name: String
  url: String
}
```

Type AbilityObj & StatObj
These two may confuse you and I’m looking into if there is a better way to do this, but for the time being this works. Unfortunately, when your using a 3rd party API you need to deal with how they return the information since we can’t control it.

```javascript
type AbilityObj {
  slot: Int
  is_hidden: Boolean
  ability: Ability
}
type StatObj {
  effort: Int
  base_stat: Int
  stat: Stat
}
```

You’ll notice these two types contain a few attributes most importantly ability and stat which point to the types Ability and Stat. The Pokemon API returns the abilities and stats arrays structured in an interesting way. Notice below it’s not an array of objects that are abilities, It’s an array of objects with some ability attributes, then nested inside that another object with the ability name. Due to this I had to create somewhat wonky looking Ability and Stat ‘containers’ (if you will) which is why you see the additional types of AbilityObj & StatObj which contain a couple attributes and also point to ability and stat which are of type Ability & Stat.

```javascript
abilities: [
  {
    slot: 0,
    is_hidden: true,
    ability: {
      name: 'whatever',
      url: 'sample@whatever'
    },
  },
]
```
Type Query
Lastly, we create our Query type and tell it to expect a getPokemon query that will contain an id and should return a Pokemon type.

```javascript
type Query {
  getPokemon(id: Int!): Pokemon
}
```

Resolvers
Next we have our resolvers, or in this case resolver. We match the naming with our getPokemon query and it simply takes the id, fetches the data, and returns it.

```javascript
const resolvers = {
  Query: {
    getPokemon: async (_, { id }) => {
      const response = await 
      fetch(`http://pokeapi.co/api/v2/pokemon/${id}`);
      return response.json();
    }
  }
};
```

then we create our server via graphql-yoga’s GraphQLServer, pass it our types and resolver(s), and fire it up!

```javascript
const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
```

The GraphQL Playground
One of my favorite parts of GraphQL is the playground. This is a place where you can test your queries and mutations to your hearts content and a perfect place for us to test our query. Head on over to http://localhost:4000 and you should see this..

Sorry, if you were hoping for a swing set and monkey bars.
Paste the query below on the left and hit the play buttton.

```javascript
{
  getPokemon(id: 1) {
    id
    name
    height
    abilities {
      slot
      is_hidden
      ability {
        name
        url
      }
    }
    stats {
      effort
      base_stat
      stat {
        name 
        url
      }
    }
  }
}
```

No it’s not magic, it’s GraphQL
Feel free to play around with the query by removing fields



