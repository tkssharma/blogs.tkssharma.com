---
date: 2020-05-28
title: 'Introduction to Vue JS - Vuex for Managing State 💻 🔭'
template: post
featured:  '../thumbnails/vue.png'
thumbnail: '../thumbnails/vue.png'
slug: vuejs-state-management-using-vuex
categories:
  - Popular
tags:
  - vuejs
  - vuex
  - developers
  - vue
---

### [](#vuex)Vuex 💻 🔭

If you missed the last few sections on components and Vue-cli, you might want to go review those before reading on. Now that we know the very basics about how components and passing state and props around, let’s talk about Vuex. It’s a useful tool for state management.

Previously, we’ve passed state from a top level component down, and siblings did not share data. If they needed to talk to each other, we’d have to push the state up in the application. This works! But once your application reaches a certain complexity, this no longer makes sense to do. If you’ve worked with Redux before, all of these concepts and the implementation will be familiar to you. Vuex is basically Vue’s version of Redux. In fact, Redux will work with Vue as well, but with Vuex, you have the benefit of using a tool designed to work specifically with your framework.

First, we’ll install Vuex:

`npm install vuex`

_or_

`yarn add vuex`

I set it up this way: within my `/src` directory, I create another directory named store (this is a preference, you could also just create a `store.js` file in that same directory), and a file named `store.js`. The initial set up in `store.js` would look something like this (vstore sublime snippet):
```javascript
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export const store = new Vuex.Store({
      state: {
        key: value
      }
    });
```
`key: value` is a placeholder for any kind of state data. In other examples we’ve used `counter: 0`.

In our `main.js` file, we’d perform the following updates (updated lines highlighted):
```javascript
    import Vue from 'vue';
    import App from './App.vue';

    import { store } from './store/store';

    new Vue({
      el: '#app',
      store: store,
      template: '<App/>',
      components: { App }
    }); 
```
After we get it set up, we can place our `data()` in the file as the state as we’ve previously done with components, and then we’ll either use this state or update it with the following three means:

*   Getters will make values able to show statically in our templates. In other words, getters can read the value, but not mutate the state.
*   Mutations will allow us to update the state, but they will always be synchronous. Mutations are the only way to change data in the state in the store.
*   Actions will allow us to update the state, asynchronously, but will use an existing mutation. This can be very helpful if you need to perform a few different mutations at once in a particular order.

Sometimes it’s difficult to understand why you might work with asynchronous state changes if you haven’t before, so let’s first go over how that would happen in the abstract and then dive into something real in the next section. Let’s say you’re Tumblr. You have a ton of heavy gifs on a page that doesn’t end for a long time. You only want to load a certain amount at a time, say 20, until the user gets 200px away from the bottom of the original page.

You could have a mutation that displays the next 20\. But you don’t have the next 20 yet, nor do you know when you hit the bottom of the page. So, in the app itself, you create an event that listens to the scroll position and you trigger an action.

The action then retrieves the URLs from the database for the next 20 images, and wraps the mutation, which adds the 20 images to the state and displays them.

Actions, in essence, create a framework for requesting data. They give you a consistent way to apply the data in an asynchronous manner.

### [](#most-basic-abstract-example)Most Basic Abstract Example

In the example below, we’re showing the most basic implementation of each, so you get a sense of the setup and how it would work. Payload is an optional parameter. You can define the amount you are updating the component by. Don’t worry, we’ll use an actual demo in a moment, it’s just important to get the base concepts first.

In `store.js`:
```javascript
    export const store = new Vuex.Store({
      state: {
        counter: 0
      },
      //showing things, not mutating state
      getters: {
        tripleCounter: state => {
          return state.counter * 3;
        }
      },
      //mutating the state
      //mutations are always synchronous
      mutations: {
        //showing passed with payload, represented as num
        increment: (state, num) => {
          state.counter += num;
        }
      }, 
      //commits the mutation, it's asynchronous
      actions: {
        // showing passed with payload, represented as asynchNum (an object)
        asyncDecrement: ({ commit }, asyncNum) => {
          setTimeout(() => {
            //the asyncNum objects could also just be static amounts
            commit('decrement', asyncNum.by);
          }, asyncNum.duration);
        }
      }
    });
```
A really nice feature here is we can return the entire state object in the mutations, but we don’t _have to_, we can just use what we need. Time travel debugging (walking through the mutations to find errors) will still work either way.

On the component itself, we would use `computed` for getters (this makes sense because the value is already computed for us), and `methods` with `dispatch` to access the mutations and actions:

In `app.vue`:
```javascript
    computed: {
      value() {
        return this.$store.getters.value;
      }
    },
    methods: {
      increment() {
        this.$store.dispatch('increment', 2)
      }
    }
```
Or, you can use a spread operator. I find this useful when you have to work with a lot of mutations/actions:
```javascript
    export default {
      // ...
      methods: {
        ...mapActions([
          'increment', // map this.increment() to this.$store.commit('increment')
          'decrement',
          'asyncIncrement'
        ])
      }
    }
```
### [](#simple-real-example)Simple Real Example

Let’s look at the Weather Notifier App again, with a very small and simple amount of state in the Vuex store. [Here’s the repo](https://github.com/sdras/vue-weather-notifier).

In `store.js`:
```javascript
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export const store = new Vuex.Store({
      state: {
        showWeather: false,
        template: 0
      },
        mutations: {
          toggle: state => state.showWeather = !state.showWeather,
          updateTemplate: (state) => {
            state.showWeather = !state.showWeather;
            state.template = (state.template + 1) % 4;
          }
      }
    });
```
Here, we’re setting the state of `showWeather`, this is set to false at first because we don’t want any of the animations firing right away, not until the user hits the phone button. In mutations, we’ve set up a toggle for the state of `showWeather`.

We’re also setting the `template` to 0 in the state. We’ll use this number to cycle through each of the weather components one by one. So in mutations, we’ve created a method called `updateTemplate`. This both toggles the state of `showWeather`, and updates the `template` to the next number, but it will wrap around to zero when it hits the number 4.

In App.vue:
```javascript
    <template>
      <div id="app">
        ...
        <g id="phonebutton" @click="updateTemplate" v-if="!showWeather">
           ...
        </g>

        <transition 
            @leave="leaveDroparea"
            :css="false">
          <g v-if="showWeather">
            <app-droparea v-if="template === 1"></app-droparea>
            <app-windarea v-else-if="template === 2"></app-windarea>
            <app-rainbowarea v-else-if="template === 3"></app-rainbowarea>
            <app-tornadoarea v-else></app-tornadoarea>
          </g>
        </transition>
        ...

      </div>
    </template>

    <script>
      import Dialog from './components/Dialog.vue';
      ...
      export default {
        computed: {
          showWeather() {
            return this.$store.state.showWeather;
          },
          template() {
            return this.$store.state.template;
          }
        },
        methods: {
          updateTemplate() {
            this.$store.commit('updateTemplate');
          }
        },
        ...
        components: {
          appDialog: Dialog,
          ...
        }
    }
    </script>
```
In `dialog.vue`:

```javascript
    <script>
    export default {
      computed: {
        template() {
          return this.$store.state.template;
        }
      },
      methods: {
        toggle() {
          this.$store.commit('toggle');
        }
      },
      mounted () {
      	//enter weather
      	const tl = new TimelineMax();
        ...
      }
    }
    </script>
```
In the code above, App uses `showWeather` to advance the template, while Dialog merely toggles the component visibility. You can also see that in App.vue, we are showing and hiding different child components based on the value of template in the App `<template>` with that snazzy conditional rendering we learned in the first article. In App, we’re both listening to the changes of state in store with the `computed` values, and using `toggle()` and `updateTemplate()` in the methods to commit to the store’s mutations.

This is a basic example, but you can see how with a complex app with tons of state, it would be helpful to manage the state all in one place, rather than moving it up and down our components. Particularly when siblings need to talk to siblings.
