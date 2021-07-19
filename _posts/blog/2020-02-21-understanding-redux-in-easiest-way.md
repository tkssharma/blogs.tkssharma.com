---
date: 2020-02-21
title: 'Understanding Redux + React in Easiest Way'
template: post
thumbnail: '../thumbnails/react.png'
slug: understanding-react-redux-easiest-way
categories:
  - Popular
  - ReactJS
tags:
  - ReactJS
---

Redux is a predictable state container for JavaScript apps.
It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as [live code editing combined with a time traveling debugger](https://github.com/gaearon/redux-devtools).

You can use Redux together with [React](https://facebook.github.io/react/), or with any other view library.
It is tiny (2kB, including dependencies).
> ***Learn Redux from its creator:**
[**Part 1: Getting Started with Redux](https://egghead.io/series/getting-started-with-redux) (30 free videos)**
[**Part 2: Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux) (27 free videos)***

When we write complex react app it become complex to manage state object when react app grows to multiple components

    export default class Profile extends Component {
      constructor() {
        super()
        this.state = {user: {}, orgs: []}
      }

    render() {
        const {user, orgs} = this.state;
        return (
          <div>
         </div>
        );
      }
    }

![](https://cdn-images-1.medium.com/max/2000/1*K92akYkK-9FpfUxnMAYYfg.png)

## Why Redux?

React — A JS library that helps us to divide up our app into multiple components but doesn’t clearly specify how to keep track of the data(aka State) and how to deal with all the events(aka Actions) properly.

React doesn’t talk about how to manage state object and redux is the only way to fix it.

Redux — A complimentary library to React that provides a way to easily keep the data(State) and the events(Actions).Redux isolate state object from components.
> **Essentially Redux allows us to build React app as you are but delegate all the State and Actions to Redux, With redux we can isolate store having state so all components can talk to it get required state object from it.**

![](https://cdn-images-1.medium.com/max/3204/1*0RTMM_pQEpO7kJ-ex80MEA.png)

## Three Principles

Redux can be described in three fundamental principles:

## Single source of truth

**The [state](http://redux.js.org/docs/Glossary.html#state) of your whole application is stored in an object tree within a single [store](http://redux.js.org/docs/Glossary.html#store).**

This makes it easy to create universal apps, as the state from your server can be serialized and hydrated into the client with no extra coding effort. A single state tree also makes it easier to debug or inspect an application; it also enables you to persist your app’s state in development, for a faster development cycle. Some functionality which has been traditionally difficult to implement — Undo/Redo, for example — can suddenly become trivial to implement, if all of your state is stored in a single tree.

    console.log(store.getState())

    /* Prints
    {
      visibilityFilter: 'SHOW_ALL',
      todos: [
        {
          text: 'Consider using Redux',
          completed: true,
        },
        {
          text: 'Keep all state in a single tree',
          completed: false
        }
      ]
    }
    */

## State is read-only

**The only way to change the state is to emit an [action](http://redux.js.org/docs/Glossary.html#action), an object describing what happened.**

This ensures that neither the views nor the network callbacks will ever write directly to the state. Instead, they express an intent to transform the state. Because all changes are centralized and happen one by one in a strict order, there are no subtle race conditions to watch out for. As actions are just plain objects, they can be logged, serialized, stored, and later replayed for debugging or testing purposes.

    store.dispatch({
      type: 'COMPLETE_TODO',
      index: 1
    })

    store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: 'SHOW_COMPLETED'
    })

## Changes are made with pure functions

**To specify how the state tree is transformed by actions, you write pure[reducers](http://redux.js.org/docs/Glossary.html#reducer).**

Reducers are just pure functions that take the previous state and an action, and return the next state. Remember to return new state objects, instead of mutating the previous state. You can start with a single reducer, and as your app grows, split it off into smaller reducers that manage specific parts of the state tree. Because reducers are just functions, you can control the order in which they are called, pass additional data, or even make reusable reducers for common tasks such as pagination.

    function visibilityFilter(state = 'SHOW_ALL', action) {
      switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
          return action.filter
        default:
          return state
      }
    }

    function todos(state = [], action) {
      switch (action.type) {
        case 'ADD_TODO':
          return [
            ...state,
            {
              text: action.text,
              completed: false
            }
          ]
        case 'COMPLETE_TODO':
          return state.map((todo, index) => {
            if (index === action.index) {
              return Object.assign({}, todo, {
                completed: true
              })
            }
            return todo
          })
        default:
          return state
      }
    }

    import { combineReducers, createStore } from 'redux'
    const reducer = combineReducers({ visibilityFilter, todos })
    const store = createStore(reducer)

That’s it! Now you know what Redux is all about.Now add redux to react app.

![](https://cdn-images-1.medium.com/max/3000/1*z0jTFKoQ-iL3y2TN_ITBMw.png)

We will have react app which will talk to redux for triggering action and getting state object from it.
> **React app =====> Action ========> Redux Layer**
> **Redux Layer ====> State Object =====> React app**

![](https://cdn-images-1.medium.com/max/2508/1*tvClus7De8mMA9Mc19Pf5A.png)

When we do integration with react than we need React-redux as bridge library which can help us to allow communication between redux and react library.

React and Redux don’t have a direct relationship — **Redux controls an app’s state changes, while React renders the view of states.**

**So how do you use React & Redux together**? We do this by finding the top-level React components, and inside these components we will set Redux’s state as the component’s state. When these states changes, we will use our handy setStatecomponent to trigger a re-render. This way, React and Redux states will be bound together.

Once we have these “top-level” components, we can break them down into even smaller components by passing Redux states as React props to create the sub-components. However, these sub-components are not directly related to Redux, because their behavior is completely determined by props. Whether or not the prop came from Redux does not matter to these sub-components.

Actually, the “top-level components” I’ve mentioned are officially called ***Smart Components in Redux, and the “sub-components” are called Dumb***Components. The connect **function in React-Redux hooks together the Redux states and Smart Components.** This is how it look like View is all about our react component and we have this redux store on which we are triggering actions and getting state object from there

![](https://cdn-images-1.medium.com/max/2880/1*HfFSvf0YDQhA2xki2rhdqA.png)

### Now big question is how react and redux talk to each other ??

If we want to link our React application with the redux store, we first have to let our app know that this store exists. This is where we come to the first major part of the react-redux library, which is the **Provider**.
> ***Provider*** is a React component given to us by the** “react-redux” **library. It serves just one purpose : to “provide” the store to its child components.

![](https://cdn-images-1.medium.com/max/2000/1*iZtswStfJO0HyKi4q0IL3w.png)

    //This is the store we create with redux's createStore method
    const store = createStore(todoApp,{})

    // Provider is given the store as a prop
    render(
      <Provider store={store}>
        <App/>
      </Provider>, document.getElementById('app-node'))

Since the provider only makes the store accessible to it’s children, and we would ideally want our entire app to access the store, the most sensible thing to do would be to put our Appcomponent within Provider.

If we were to follow the previous diagram, the Provider node would be represented as a parent node on top of the App node. However, because of the utility that Provider gives us, I feel it’s more appropriate to represent it as something which “wraps” the entire application building blocks look like this.

## Complete picture

![](https://cdn-images-1.medium.com/max/4000/1*C61hDnp4qkjBozIslG735Q.jpeg)

## Connect

Now that we have “**provided**” the redux store to our application, we can now *connect* our components to it. We established previously that there is no way **to directly interact with the store**. We can either retrieve data by obtaining its current state, or change its state by dispatching an action (we only have access to the top and bottom component of the redux flow diagram shown previously).

This is precisely what connect does. Consider this piece of code, which uses connect to map the stores state and dispatch to the props of a component :

    import {connect} from 'react-redux'

    const TodoItem = ({todo, destroyTodo}) => {
      return (
        <div>
          {todo.text}
          <span onClick={destroyTodo}> x </span>
        </div>
      )
    }

    const mapStateToProps = state => {
      return {
        todo : state.todos[0]
      }
    }

    const mapDispatchToProps = dispatch => {
      return {
        destroyTodo : () => dispatch({
          type : 'DESTROY_TODO'
        })
      }
    }

    ***export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(TodoItem)***

**mapStateToProps** and **mapDispatchToProps** are both** pure functions** that are provided the stores** “state” and “dispatch” **respectively. Furthermore, both functions have to return an object, whose keys will then be passed on as the props of the component they are connected to.

![svg](https://cdn-images-1.medium.com/max/3372/1*IdDsAiJHYxWcz2DC0uKw4Q.png)*svg*

![](https://cdn-images-1.medium.com/max/3464/1*F7RBa0iRG0ohFvgm59Ks9w.png)

In this case, mapStateToProps returns an object with only one key : “todo”, and mapDispatchToProps returns an object with the destroyTodo key.

The connected component (which is exported) provides todo and destroyTodo as props to TodoItem.

It’s important to note that only components *within* the Provider can be connected (In the above diagram, the connect is done *through* the Provider).

Redux is a powerful tool and even more so when combined with React. It really helps to know why each part of the **react-redux** library is used, and hopefully after reading this post, the function of **Provider and connect is clear.**

![](https://cdn-images-1.medium.com/max/3004/1*D9z2Vodn7enjPyIHFsFVOQ.png)

I hope you have enjoyed React Redux Learning !!
