---
date: 2020-06-07
title: 'Building Vuex Store using Different Modules'
template: post
featured:  '../thumbnails/vue.png'
thumbnail: '../thumbnails/vue.png'
slug: vuex-state-management-using-modules
categories:
  - Popular
tags:
  - vuejs
  - state-management
  - vuex
  - vuex-modules
---
# Vuex is a state management pattern + library

Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It also integrates with Vue's official devtools extension to provide advanced features such as zero-config time-travel debugging and state snapshot export / import.

Vue.js is an easy to use web app framework that we can use to develop interactive front end apps.
With Vuex, we can store our Vue app’s state in a central location.
In this article, we’ll look at how to add modules to separate a Vuex store into smaller parts.

## Dividing a Store into Modules

![vuexmodule](https://i.stack.imgur.com/6MA1X.jpg)

Vuex uses a single state tree. This means the `states are located in one big object`. This will be bloated is our app grows big.
To make a Vuex store easier to scale, it `can be separated into modules`. Each module can have its `own state, mutations, getters, and actions`.

The state parameter in `mutations and getters are the module’s local state`.
By default, all actions, mutations, and getters inside modules are registered under a global namespace. This allows multiple modules to react to the same mutation or action type.

We can divide our store into module as in the following example:
```javascript

const moduleA = {
  state: {
    count: 0
  },
  mutations: {
    increase(state, payload) {
      state.count += payload.amount;
    }
  },
  actions: {
    increase({ commit }, payload) {
      commit("increase", payload);
    }
  }
};
const moduleB = {
  state: {
    count: 1
  },
  mutations: {
    increase(state, payload) {
      state.count += payload.amount;
    }
  },
  actions: {
    increase({ commit }, payload) {
      commit("increase", payload);
    }
  }
};
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
});
console.log(store.state.a.count);
console.log(store.state.b.count);
```

Then in the console.log output, we should see 0 and 1 since moduleA ‘s initial count state is 0 and moduleB ‘s initial count state is 1.


`To make each module self-contained`, we have to `namespace it by setting the namespaced option to true` .
We can namespace a module and then call dispatch on actions after namespacing the modules as follows:

```javascript
const moduleA = {
  namespaced: true,
  state: {
    count: 0
  },
  mutations: {
    increase(state, payload) {
      state.count += payload.amount;
    }
  },
  actions: {
    increase({ commit }, payload) {
      commit("increase", payload);
    }
  }
};
const moduleB = {
  namespaced: true,
  state: {
    count: 1
  },
  mutations: {
    increase(state, payload) {
      state.count += payload.amount;
    }
  },
  actions: {
    increase({ commit }, payload) {
      commit("increase", payload);
    }
  }
};
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
});
new Vue({
  el: "#app",
  store,
  computed: {
    ...Vuex.mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    increaseA(payload) {
      this.$store.dispatch("a/increase", payload);
    },
    increaseB(payload) {
      this.$store.dispatch("b/increase", payload);
    }
  }
});
```

```javascript
  <body>
    <div id="app">
      <button @click="increaseA({amount: 10})">Increase</button>
      <button @click="increaseB({amount: 10})">Increase</button>
      <p>A Count: {{a.count}}</p>
      <p>B Count: {{b.count}}</p>
    </div>
    <script src="index.js"></script>
  </body>
```

In the code above, we have namespaced: true set in each module, and then we added 2 methods to our Vue instance to dispatch the namespaced actions:
```javascript
increaseA(payload) {
  this.$store.dispatch("a/increase", payload);
}
```
and:
```javascript
increaseB(payload) {
  this.$store.dispatch("b/increase", payload);
}
```
Since we have namespaced set to true , we have to dispatch the actions by passing in “a/increase” and “b/increase” to dispatch .

## Dynamic Module Registration
We can also register a module dynamically by using the store.registerModule method as follows:
index.js :
```javascript
const moduleA = {
  state: {
    count: 0
  },
  mutations: {
    increase(state, payload) {
      state.count += payload.amount;
    }
  },
  actions: {
    increase({ commit }, payload) {
      commit("increase", payload);
    }
  }
};
const store = new Vuex.Store({});
store.registerModule("a", moduleA);
new Vue({
  el: "#app",
  store,
  computed: {
    ...Vuex.mapState({
      a: state => state.a
    })
  },
  methods: {
    ...Vuex.mapActions(["increase"])
  }
});
```
index.html :
```html
<!DOCTYPE html>
<html>
  <head>
    <title>App</title>
    <meta charset="UTF-8" />
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vuex"></script>
  </head>
  <body>
    <div id="app">
      <button @click="increase({amount: 10})">Increase</button>
      <p>A Count: {{a.count}}</p>
    </div>
    <script src="index.js"></script>
  </body>
</html>
```

### Conclusion
If our Vuex store is big, we can divide it into modules.
We can register modules when we create the store or `dynamically with registerModule` .
Then we can map `actions/mutations` by their name as usual, and we can map the state by accessing `state.a.count` , where a is the module name, and count is the state name. Replace it with our own module and state names if the code is different.

