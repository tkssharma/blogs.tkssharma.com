---
date: 2020-06-06
title: 'Vuex Vuejs State Management Library'
template: post
featured:  '../thumbnails/vue.png'
thumbnail: '../thumbnails/vue.png'
slug: vuex-state-management-library
categories:
  - Popular
tags:
  - vuejs
  - state-management
  - vuex
  - lazy-loading
---

# Vuex is a state management pattern + library

Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It also integrates with Vue's official devtools extension to provide advanced features such as zero-config time-travel debugging and state snapshot export / import.

##  What is a "State Management Pattern"?
Let's start with a simple Vue counter app:
```javascript
new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})
```
It is a self-contained app with the following parts:

 - The state, the source of truth that drives our app;
 - The view, a declarative mapping of the state;
 - The actions, the possible ways the state could change in reaction to user inputs from the view.
 - This is a simple representation of the concept of "one-way data flow":


However, the simplicity quickly breaks down when we have multiple components that share a common state:

Multiple views may depend on the same piece of state.
Actions from different views may need to mutate the same piece of state.
For problem one, passing props can be tedious for deeply nested components, and simply doesn't work for sibling components. For problem two, we often find ourselves resorting to solutions such as reaching for direct parent/child instance references or trying to mutate and synchronize multiple copies of the state via events. Both of these patterns are brittle and quickly lead to unmaintainable code.

So why don't we extract the shared state out of the components, and manage it in a global singleton? With this, our component tree becomes a big "view", and any component can access the state or trigger actions, no matter where they are in the tree!

By defining and separating the concepts involved in state management and enforcing rules that maintain independence between views and states, we give our code more structure and maintainability.

This is the basic idea behind Vuex, inspired by Flux, Redux and The Elm Architecture. Unlike the other patterns, Vuex is also a library implementation tailored specifically for Vue.js to take advantage of its granular reactivity system for efficient updates.

If you want to learn Vuex in an interactive way you can check out this Vuex course on Scrimba, which gives you a mix of screencast and code playground that you can pause and play around with anytime.

## vuex

## When Should I Use It?
Vuex helps us deal with shared state management with the cost of more concepts and boilerplate. It's a trade-off between short term and long term productivity.

If you've never built a large-scale SPA and jump right into Vuex, it may feel verbose and daunting. That's perfectly normal - if your app is simple, you will most likely be fine without Vuex. A simple store pattern may be all you need. But if you are building a medium-to-large-scale SPA, chances are you have run into situations that make you think about how to better handle state outside of your Vue components, and Vuex will be the natural next step for you. There's a good quote from Dan Abramov, the author of Redux:

### Local State
Local state is something that we naturally use in every Vue component and keep in it’s data property. The value of the local state is declared and scoped to a certain component. One of the most common use cases for the local state is storing information about the user interface. Such as if a dropdown is open or closed, or if the form request is currently loading.

This information is only relevant to the actual component, thus we call it a local state.

```javascript
<template>
  <div>
    <p>
        Once upone a time... 
        <button @click="showMore = true">Read more</button>
    </p>
    <p v-show="showMore">...in Vueland!</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showMore: false
    }
  }
}
</script>
```
You could store other types of data as part of the local state as well. For example response from the external API.

```javascript
<template>
  <div>
    <h1> Hello {{ user.name }}! Here's a story for you!</h1>
    <p>
        Once upone a time... 
        <button @click="showMore true">Read more</button>
    </p>
    <p v-show="showMore">...in {{ user.location }}!</p>
  </div>
</template>

<script>
import { getUser } from './api'

export default {
  data () {
    return {
      user: {}
      showMore: false
    }
  },
  async created () {
    this.user = await getUser()
  }
}
</script>
```
## Issues of local state management
The first one is repetition.

Let’s say that you also have a header component where you want to display the same user data as previously shown in Home.vue. Even though you already have this data in your application. you need to call getUser again because you don’t have access to anything that is outside AppHeader.vue - after all, it’s a local state.

By doing this you’re not only repeating your code but also performing unnecessary network call!

```javascript
<template>
  <header>
    <img src="./logo.svg" />
    <div v-if="user">
      Welcome back, {{ user.name }}! 
      <button @click="logOut">Log Out</button>
    </div>
    <div v-else>
      <LogInForm />
    </div>
  </header>
</template>

<script>
import { getUser, logOut } from './api'

export default {
  data () {
    return {
      user: {}
    }
  },
  async created () {
    this.user = await getUser()
  },
  methods: {
   async logOut () {
     await logOut()
     this.user = null
   }
  }
}
</script>
```

If every component has its version of application state they can easily end up holding different versions of the same data entity. If we manage to remove this repetition and keep only a single source of truth about our application state it will always be the same everywhere! All state management libraries are just about keeping this single source of truth!

But how to do this? Fortunately, there is a very simple solution to this problem that doesn’t require any third-party libraries to work!

If two components in Vue have parent-child relationship we can just pass down some data from parent to its children. The data passed via props is reactive and read-only which means we can modify it only in a parent component. This is the desired behavior because the parent component can then serve as a single source of truth for this data!

## parent-child relationship for data passing and Events

```javascript
<template>
  <div>
    <AppHeader :user="user" @logout="logOut" @login="logIn" />
    <HomePage :user="user" />
  </div>
</template>

<script>
import { getUser } from './api'

export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
   logOut () {
     this.user = null
   },
   logIn () {
     this.user = await getUser()
   }
  } 
}
</script>
```
Now you’re probably thinking “Okay but this is not how real applications look like. Real apps almost always have routing” and you’re absolutely right! Thankfully this approach will work also if you’re using vue-router!

Under the hood <router-view> component is just a dynamic Vue component which means that it’s a placeholder for another component. In that case for a route component. Every prop that we will pass into <router-view> will be passed to a route component of current page so if you’re using vue-router your App.vue template could look more or less like this:
```javascript
<template>
  <div>
    <AppHeader :user="user" @logout="logOut" @login="logIn" />
    <router-view :user="user" />
  </div>
</template>
```

`Passing down a single value through 20 components` just to fulfill the architectural requirements is not a clean code anymore. Every good practice is good until it isn’t and we should constantly challenge them to make sure that they are still making our lives easier. If following some good practice becomes more and more complicated over time and there is a better solution that is not following our architectural assumptions, it’s a good sign that we should reevaluate them.

## Centralized Store
Knowing this disastrous nature of web applications Facebook came out with a solution - Flux architecture. The main assumption of Flux architecture states that application state is centralized in a store and the store can’t be directly mutated (changed). If we want to update our state we can do this only in a certain, previously defined way through a dispatcher. Vuex is a state management library for Vue.js, that is based on the Flux pattern.

A Vuex store is not tied to any component and because of that, we can interact with it directly in each one of them instead of passing down values from the root component.

With a Vuex store like this:
```javascript
const store = {
  state: { count: 0 },
  mutations: {
   increment: function (state) {
     state.count++
   }
 }
}
```
We can update our state from every component in our app just by calling:
```javascript
this.$store.commit('increment')
```
That is a major simplification over passing down props 20 levels down!

![vuex](https://vuex.vuejs.org/vuex.png "vuex")

## Yarn
yarn add vuex

## If using Vue 3.0 + Vuex 4.0:
yarn add vuex@next --save
When used with a module system, you must explicitly install Vuex as a plugin:

## With Vue 3

```javascript
import { createApp } from 'vue'
import { createStore } from 'vuex'

const app = createApp({ ... })
const store = createStore({ ... })

app.use(store)
```

A Simple example can be like this 

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```