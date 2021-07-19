---
date: 2020-02-27
title: 'How Vuex compares to redux for Managing State Object'
template: post
thumbnail: '../thumbnails/react.png'
slug: Vvuex-compare-with-redux-state-manager
categories:
  - Popular
  - ReactJS
tags:
  - ReactJS
---

Managing state is always a pain point without any library when application becoming complex with many components.

we have already been using a different library like Flux, Redux, reFlux, etc . Redux is the most popular library when it comes to managing state object for application and also tracking the state object with all different user action.

![](https://cdn-images-1.medium.com/max/5132/1*6IRRyhTFSGVWPWiSy4iQ6g.png)

## State management using Vue js

Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It also integrates with Vue’s official [devtools extension](https://github.com/vuejs/vue-devtools) to provide advanced features such as zero-config time-travel debugging and state snapshot export / import.

## What is a “State Management Pattern”?

Let’s start with a simple Vue counter app:

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

It is a self-contained app with the following parts:

* The state, which is the source of truth that drives our app;

* The view, which is just a declarative mapping of the state;

* The actions, which are the possible ways the state could change in reaction to user inputs from the view.

This is an extremely simple representation of the concept of “one-way data flow”:

![](https://cdn-images-1.medium.com/max/2560/0*7FET9nTUIjxFfDpa.png)

However, the simplicity quickly breaks down when we have multiple components that share common state, lets see how all action flows

![](https://cdn-images-1.medium.com/max/2568/1*5JkY80giMkaVNlVspvtvlw.png)

How does Vuex work?

There are 4 key concepts to understand:

* State tree: It is an object that contains all the *states at the application level* .

* Getters: It is used to access the data in the tree from our Vue component.

* Mutators: Events that serve to modify the states of the tree.

* Actions: Functions called from the components of Vue to trigger the mutations.

### How does Vuex work

* The data flow is unidirectional .

* Only mutations can modify the state tree.

* The data in the tree is reactive *— if modified in it, it will also be reflected in the components*

Now lets see how these all components talk to each other

![](https://cdn-images-1.medium.com/max/2000/0*rLBGQeWevFmkyd0p.png)

    import Vuex from 'vuex'

    const state = {
      counter: 0
    }
    const mutations = {
      INCREMENT (state) {
        state.counter++
      }
    }
    export default new Vuex.Store({
      state,
      mutations
    })
    store.dispatch('INCREMENT')

    console.log(store.state.count) // -> 1

Above code look like redux flow instead of reducers we have now mutations. Lets understand the flow with code in Vue js.

* Centralizing the state of your application and changes in a store

* All updates of a data will go through a commit

* Creating a mapping between a local variable and a store variable

    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    const store = new Vuex.Store({
      state: {
        agenda:[]
      },
      mutations: {
        addConference(state, conference) {
          state.agenda.push(conference);
        }
      }
    });
    new Vue({
      el: '#app',
      store,
    });

Lets use this in our component to fire call to vuex action and update state object, from here triggering click action and firing action to vuex using this.$store.commitand this will lead to mutation in state object.

    <template>
        <div>
            hello {{ conferences.length}}
            demo

    <button [@click](http://twitter.com/click)="add">button click</button>
        </div>
    </template>

    <script>
    module.exports {
       computed: {
          conferences() {
            return this.$store.state.agenda;
          }
       },
       methods: {
          add(){
              this.$store.commit('addConference', 'VueJS');
          }
       }
    }
    </script>

![](https://cdn-images-1.medium.com/max/2936/1*8WCoQXeRxmlbcJzTO4UNxw.png)

Happy Coding ! I found vuex more simplified than any other state managing libraries.
