---
date: 2020-01-09
title: 'React Hooks and Context APIs-Part-1'
template: post
thumbnail: '../thumbnails/react.png'
slug: react-hooks-and-context-apis-part-1
categories:
  - javascript
  - ReactJS
  - Popular
tags:
  - ReactJS
  - Hooks
  - Javascript
---
![LifeCycle React](../thumbnails/hooks.png)


React includes several ways of managing state in an application. The most straight forward way is to define a state inside a component. The state of a component is like the props which are passed to a component, a plain JavaScript object containing information that influences the way a component is rendered, lets talk about managing state using Hooks and Context APIs

## Why we need a state management tool

In typical React, the way to handle data between disconnected components is through prop drilling. Since there is no global state that components can access if, for instance, you want to pass data from a top-level component to a fifth-level component, you’ll have to pass the data as a prop on each level of the tree until you get to your desired component.

This results in writing a ton of extra code, and giving components properties that they will never use also affects their architectural design. In order to solve this problem, we needed a way to provide a global state that all components, no matter how deeply nested they are, could access.

By solving this, Redux, an open-source JavaScript library for managing application state, became the go-to solution for React developers.


## How Redux works

The [Redux documentation](https://redux.js.org/introduction/getting-started) describes it as a predictable state container for JavaScript applications that helps us to write applications that behave consistently, run in different environments, and are easy to test.

One disadvantage of prop drilling is the need for writing a considerable amount of extra code in order to access data from a top-level component. With Redux, this disadvantage becomes more severe since all the extra code it requires for setting up a global state introduces even more complexity. Redux requires three main building parts to function: actions, reducers, and store.

## Actions

These are objects that are used to send data to the Redux store. They typically have two properties: a type property for describing what the action does and a payload property that contains the information that should be changed in the app state.

    // action.js
    const reduxAction = payload => {
      return {
      }
    }


## Reducers

These are pure functions that implement the action behavior. They take the current application state, perform an action, and then return a new state:

    const reducer = (state, action) => {
      const { type, payload } = action;
      switch(type){
        case "action type":
          return {
            ["action description"]: payload
          };
        default:
          return state;
      }
    };

    export default reducer;

## Store

The store is where the application’s state is housed. There is only one store in any Redux application:

    import { createStore } from 'redux'

    const store = createStore(componentName);

Since our application can only have one Redux store, in order to create a single root reducer for all our components, we’ll need the [combineReducers](https://redux.js.org/api/combinereducers) method from Redux.

With the long process and considerable amount of code required to set up Redux, imagine what our codebase will look like when we have multiple components to work with. Even though Redux solves our state management problem, it is really time-consuming to use, has a difficult learning curve, and introduces a whole new layer of complexity to our application.

Fortunately, the React Context API solves this problem. When combined with React Hooks, we have a state management solution that is less time-consuming to set up, has an easier learning curve, and requires minimal code.

## The React Context API

The new Context API came with React 16.3. Here’s how Context is explained in the [React documentation](https://reactjs.org/docs/context.html):
> Context provides a way to pass data through the component tree without having to pass props down manually at every level.

The React Context API is React’s way of managing state in multiple components that are not directly connected.

To create a context, we’ll use the createContext method from React, which accepts a parameter for its default value:

    import React from 'react';

    const newContext = React.createContext({ color: 'black' });

The createContext method returns an object with a Provider and a Consumer component:

    const { Provider, Consumer } = newContext;

The Provider component is what makes the state available to all child components, no matter how deeply nested they are within the component hierarchy. The Provider component receives a value prop. This is where we’ll pass our current value:

    <Provider value={color: 'blue'}>
      {children}
    </Provider>

The Consumer, as its name implies, consumes the data from the Provider without any need for prop drilling:

    <Consumer>
      {value => <span>{value}</span>}}
    </Consumer>

Without Hooks, the Context API might not seem like much when compared to Redux, but combined with the useReducer Hook, we have a solution that finally solves the state management problem.

## What are Hooks in React?

Hooks are a type of function that enable the execution of custom code in a base code. In React, Hooks are special functions that allow us to “hook into” its core features.

React Hooks provide an alternative to writing class-based components by allowing us to easily handle state management from functional components.

If you’re new to Hooks, you might want to check out [the overview](https://reactjs.org/docs/hooks-overview.html) first. You may also find useful information in the [frequently asked questions](https://reactjs.org/docs/hooks-faq.html) section.

Basic Hooks

* useState

* useEffect

* useContext

Additional Hooks

* useReducer

* useCallback

* useMemo

* useRef

* useImperativeHandle

* useLayoutEffect

* useDebugValue

## useState

    const [state, setState] = useState(initialState);

Returns a stateful value, and a function to update it.

During the initial render, the returned state (state) is the same as the value passed as the first argument (initialState).

The setState function is used to update the state. It accepts a new state value and enqueues a re-render of the component.

    setState(newState);

During subsequent re-renders, the first value returned by useState will always be the most recent state after applying updates.
> *Note*
> *React guarantees that setState function identity is stable and won’t change on re-renders. This is why it’s safe to omit from the useEffect or useCallback dependency list.*

### Functional updates

If the new state is computed using the previous state, you can pass a function to setState. The function will receive the previous value, and return an updated value. Here’s an example of a counter component that uses both forms of setState:

    function Counter({initialCount}) {
      const [count, setCount] = useState(initialCount);
      return (
        <>
          Count: {count}
          <button onClick={() => setCount(initialCount)}>Reset</button>
          <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
          <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
        </>
      );
    }

The ”+” and ”-” buttons use the functional form, because the updated value is based on the previous value. But the “Reset” button uses the normal form, because it always sets the count back to the initial value.

If your update function returns the exact same value, the subsequent rerender will be skipped completely.
> *Note*
> *Unlike the setState method found in class components, useState does not automatically merge update objects. You can replicate this behavior by combining the function updater form with object spread syntax:*
> *setState(prevState => { // Object.assign would also work return {...prevState, ...updatedValues}; });*
> *Another option is useReducer, which is more suited for managing state objects that contain multiple sub-values.*

### Lazy initial state

The initialState argument is the state used during the initial render. In subsequent renders, it is disregarded. If the initial state is the result of an expensive computation, you may provide a function instead, which will be executed only on the initial render:

    const [state, setState] = useState(() => {
      const initialState = someExpensiveComputation(props);
      return initialState;
    });

### Bailing out of a state update

If you update a State Hook to the same value as the current state, React will bail out without rendering the children or firing effects. (React uses the [Object.is comparison algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description).)

Note that React may still need to render that specific component again before bailing out. That shouldn’t be a concern because React won’t unnecessarily go “deeper” into the tree. If you’re doing expensive calculations while rendering, you can optimize them with useMemo.

## useEffect Example

    useEffect(didUpdate);

Accepts a function that contains imperative, possibly effectful code.

Mutations, subscriptions, timers, logging, and other side effects are not allowed inside the main body of a function component (referred to as React’s *render phase*). Doing so will lead to confusing bugs and inconsistencies in the UI.

Instead, use useEffect. The function passed to useEffect will run after the render is committed to the screen. Think of effects as an escape hatch from React’s purely functional world into the imperative world.

By default, effects run after every completed render, but you can choose to fire them [only when certain values have changed](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect).

useEffect hook can be imported just like useState.

    import React, { useState, useEffect } from 'react';

To make useEffect do something, we pass it an anonymous function as an argument. Whenever React re-renders this component, it will run the function we pass to useEffect.

    useEffect(() => {
      /* any update can happen here */
    });

This is what the whole code might look like.

    import React, { useState, useEffect } from 'react';

    function App() {
      const [count, setCount] = useState(0);

    function change() {
        setCount(prevCount => prevCount + 1);
      }

    useEffect(() => {
        /* any update can happen here */
      });

    return (
        <div>
          <h1>{count}</h1>
          <button onClick={change}>Change!</button>
        </div>
      );
    }

    export default App;

As an example, we will use a nice npm package that generates a random color. Feel free to write your own if you wish of course, but for this tutorial, we will just install it, npm i randomcolor, and import.

    import randomcolor from 'randomcolor';

Let’s now use our knowledge about useState hook to store some random color in the state.

    const [color, setColor] = useState(''); // initial value can be an empty string

We then can then assign the color of the counter we already have.

    <h1 style={{ color: color }}>{count}</h1>

Now, just for the sake of it, let’s change the color of the counter on every click of the Change! button. useEffect will run every time the component re-renders, and the component will re-render every time the state is changed.

So if we write the following code, it would get us stuck in an infinite loop! This is a very common gotcha with useEffect

    useEffect(() => {
      setColor(randomcolor());
    });

setColor updates state, which re-renders the component, which calls useEffect, which runs setColor to update the state, which re-renders the component... Yikes!

We probably *only* want to run this useEffect when the count variable changes.

To tell useEffect which variable(s) to keep track of, we give an array of such variables as a second argument.

    useEffect(() => {
      setColor(randomcolor());
    }, [count]);

## The useContext Hook

If you noticed, when explaining the React Context API, we needed to wrap our content in a Consumer component and then pass a function as a child just so we could access (or consume) our state. This introduces unnecessary component nesting and increases the complexity of our code.

The useContext Hook makes things a lot nicer and more straightforward. In order to access our state with it, all we need to do is call it with our created context as its argument:

    const newContext = React.createContext({ color: 'black' });

    const value = useContext(newContext);

    console.log(value); // this will return { color: 'black' }

Now, instead of wrapping our content in a Consumer component, we can simply access our state through the value variable.

## The useReducer Hook

The useReducer Hook came with React 16.7.0. Just like the reduce() method in JavaScript, the useReducer Hook receives two values as its argument — in this case, the current state and an action — and then returns a new state:

    const [state, dispatch] = useReducer((state, action) => {
      const { type } = action;
      switch(action) {
        case 'action description':
          const newState = // do something with the action
          return newState;
        default:
          throw new Error()
      }
    }, []);

In the above block, we’ve defined our state and a corresponding method, dispatch, handling it. When we call the dispatch method, the useReducer() Hook will perform an action based on the type that our method receives in its action argument:

    ...
    return (
      <button onClick={() =>
        dispatch({ type: 'action type'})}>
      </button>
    )

## The useReducer Hook plus the Context API

## Setting up our store

Now that we know how the Context API and the useReducer Hook work individually, let’s see what happens when we combine them in order to get the ideal global state management solution for our application. We’ll create our global state in a store.js file:

    // store.js
    import React, {createContext, useReducer} from 'react';

    const initialState = {};
    const store = createContext(initialState);
    const { Provider } = store;

    const StateProvider = ( { children } ) => {
      const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
          case 'action description':
            const newState = // do something with the action
            return newState;
          default:
            throw new Error();
        };
      }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
    };

    export { store, StateProvider }

In our store.js file, we used the createContext() method from React that we explained earlier to create a new context. Remember that the createContext() method returns an object with a Provider and Consumer component. This time, we’ll be using only the Provider component and then the useContext Hook when we need to access our state.

Notice how we used the useReducer Hook in our StateProvider. When we need to manipulate our state, we’ll call the dispatch method and pass in an object with the desired type as its argument.

In our StateProvider, we returned our Provider component with a value prop of state and dispatch from the useReducer Hook.

## Accessing our state globally

In order to access our state globally, we’ll need to wrap our root <App/> component in our StoreProvider before rendering it in our ReactDOM.render() function:

    // root index.js file
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    import { StateProvider } from './store.js';

    const app = (
      <StateProvider>
        <App />
      </StateProvider>
    );

    ReactDOM.render(app, document.getElementById('root'));

Now, our store context can be accessed from any component in the component tree. To do this, we’ll import the useContext Hook from react and the store from our ./store.js file:

    // exampleComponent.js
    import React, { useContext } from 'react';
    import { store } from './store.js';

    const ExampleComponent = () => {
      const globalState = useContext(store);
      console.log(globalState); // this will return { color: red }
    };

## Adding and removing data from our state

We’ve seen how we can access our global state. In order to add and remove data from our state, we’ll need the dispatch method from our store context. We only need to call the dispatch method and pass in an object with type (the action description as defined in our StateProvider component) as its parameter:

    // exampleComponent.js
    import React, { useContext } from 'react';
    import { store } from './store.js';

    const ExampleComponent = () => {
      const globalState = useContext(store);
      const { dispatch } = globalState;

    dispatch({ type: 'action description' })
    };

## Conclusion

To a good extent, Redux works for state management in React applications and has a few advantages, but its verbosity makes it really difficult to pick up, and the ton of extra code needed to get it working in our application introduces a lot of unnecessary complexity.

On the other hand, with the useContext API and React Hooks, there is no need to install external libraries or add a bunch of files and folders in order to get our app working. This makes it a much simpler, more straightforward way to handle global state management in React applications.

In this blog we have covered only basic Hooks, In next Blog we will cover Advance Hooks and their use in Daily React JS Code.