---
date: 2020-01-10
title: 'React Hooks and Context APIs-Part-2'
template: post
thumbnail: '../thumbnails/react.png'
slug: react-hooks-and-context-apis-part-2
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

## Lets Talk about some Advance React Hooks

useReducer Hook for Managing State

I’ve never used a reducer before because I always thought that useState could be used to handle most cases and that it would be confusing to have two different ways to set state — but I learned that useReducer can be a great way to simplify your API and express intention while consolidating more complex state interactions in a reducer. Check out the two different implementations below for the getUsers() function and decide for yourself which is clearer.

useState implementation example

    function UsersList() {
      const [users, setUsers] = React.useState(null);
      const [loading, setLoading] = React.useState(false);
      const [error, setError] = React.useState(null);  function getUsers() {
        setLoading(true);
        setError(null);
        setUsers(null);    
        fetchUsers().then(
          users => {
            setLoading(false);
            setError(null);
            setUsers(users);
          },
          error => {
            setLoading(false);
            setError(error);
            setUsers(null);
          }
        );
      }
    }

useReducer implementation:

    function usersReducer(state, action) {
      switch (action.type) {
        case "LOADING": {
          return { loading: true, users: null, error: null };
        }
        case "LOADED": {
          return { loading: false, users: action.users, error: null };
        }
        case "ERROR": {
          return { loading: false, users: null, error: action.error };
        }
        default: {
          throw new Error(`Unhandled action type: ${action.type}`);
        }
      }
    }function UsersList() {
      const [state, dispatch] = React.useReducer(usersReducer, {
        users: null,
        loading: false,
        error: null
      });  function getUsers() {
        dispatch({ type: "LOADING" });
        fetchUsers().then(
          users => {
            dispatch({ type: "LOADED", users });
          },
          error => {
            dispatch({ type: "ERROR", error });
          }
        );
      }
    }

As you can imagine, when fetching resources, this type of state interaction happens quite often in our apps and we can extract this to a reusable useAsync custom hook. This was an extra credit question in the workshop which I won’t get into here for the sake of brevity.

Side Note: useReducer is more performant than useState in the example above since we’re replacing multiple useState calls (which can cause multiple re-renders) with one useReducer call. The difference in performance is not significant enough for this to be a concern, but it is worth noting that there is a slight performance benefit to taking the useReducer approach in similar scenarios.

For a more in-depth look into when to utilize useReducer vs useState, you can check out this helpful [article](https://www.robinwieruch.de/react-usereducer-vs-usestate/) shared by Kent.

## useMemo and useCallback

Both of these hooks are similar in that they are used to memoize. The main difference is that useMemo can be used to memoize any value including functions, while useCallback can only be used to memoize functions.

From the react [docs](https://reactjs.org/docs/hooks-reference.html#usecallback):
> useCallback(fn, deps) is equivalent to useMemo(() => fn, deps)

Example of useMemo:

    const memoizedValue = useMemo(() => someExpensiveComputation(input), [input]);

Example of useCallback:

    const memoizedFunction = useCallback(
      () => {
        fnToBeMemoized(input);
      },
      [input],
    );

In both examples, the second argument of [input] is called the dependencies array, which means that the memoized value will only recompute when the input value changes.

Unlike useEffect, React.useMemo does not trigger every time you change one of its dependencies.

    const memoizedFunction = useCallback(
    

A memoized function will first check to see if the dependencies have changed since the last render. If so, it executes the function and returns the result. If false, it simply returns the cached result from the last execution.

This is good for expensive operations like transforming API data or doing major calculations that you don’t want to be re-doing unnecessarily

[https://kentcdodds.com/blog/usememo-and-usecallback/](https://kentcdodds.com/blog/usememo-and-usecallback/)

Here is a helpful [post](https://kentcdodds.com/blog/usememo-and-usecallback) on when to use each of these hooks. In it, Kent says:
> So when should I useMemo and useCallback?
> 1. Referential equality
> 2. Computationally expensive calculations

If you're new to JavaScript/programming, it wont take long before you learn why this is the case:

![](https://cdn-images-1.medium.com/max/3388/1sRVZWBedhS80fH3qwbxiJg.png)
> I'm not going to go too deep into this, but suffice it to say when you define an object inside your React function component, it is not going to be referentially equal to the last time that same object was defined (even if it has all the same properties with all the same values).

There are two situations where referential equality matters in React, let's go through them one at a time.

<iframe src="https://medium.com/media/80546ac009bb4aae511903d89fcae65e" frameborder=0></iframe>

React.memo can also be used to mimic the same behavior as PureComponent by wrapping the component.

    const Button = React.memo(function Button({onClick}) {
      return <button onClick={onClick}>Button Text</button>
    })

However, since React is already very performant when it comes to re-rendering components, we should only use this as a last resort. (The same principle applies to PureComponent.) The bigger problem is when the render function is slow. It is better to fix slow render functions rather than to apply useMemo all over the place which can ultimately make performance worse than it was before.

## useRef

useRef is often used to keep a reference of a DOM element in order to focus on an input or to perform other similar DOM interactions.

Snippet of example usage from React [docs](https://reactjs.org/docs/hooks-reference.html#useref):

    function TextInputWithFocusButton() {
      const inputEl = useRef(null);
      const onButtonClick = () => {
        // `current` points to the mounted text input element
        inputEl.current.focus();
      };  return (
        <>
          <input ref={inputEl} type="text" />
          <button onClick={onButtonClick}>Focus the input</button>
        </>
      );
    }

useRef also has a more generic use case which is to hold a mutable value that doesn’t cause re-renders when the value changes. Example:

    const count = useRef(0);
    let currentCount = count.current;

You probably won’t use the following hooks too often, but it would be good to understand the rare use cases and log them in the back of your mind in case you ever need them.

## useImperativeHandle

This hook is only necessary when you need to forward a reference from a child to a parent. Some example use cases are when you need to control focusing an input from a parent component, or when you need to control scrolling a child container from the parent component. Even though you won’t need this hook most of the time, it’s nice that React offers an “escape hatch” for rare instances in which you need to pass a child reference to the parent.

If you’re like me and are not sure what imperative means in this context, here is a helpful [post](https://tylermcginnis.com/imperative-vs-declarative-programming/) that was shared during the workshop which explains the difference between imperative and declarative programming.

Example usage can be found in the docs [here](https://reactjs.org/docs/hooks-reference.html#useimperativehandle).

## useLayoutEffect

A notable change from class components to hooks is that componentDidMount and componenentDidUpdate fires before the UI is painted while useEffect fires after the UI is painted. Why is this the new default? You may have code in useEffect that can take a while, like an expensive call to the server, or a call to a third party service that shouldn’t block the UI from displaying content to the user.

If you want the previous behavior (of firing useEffect before the UI is painted) that's where useLayoutEffect comes in. The only time you need this is when you have code within useEffect that has an observable visual effect — for example, when you are scrolling to the bottom of a window or when you are resizing an element. If you find that the UI is jumping around based on code in useEffect, try replacing useEffect with useLayoutEffect.

React includes several ways of managing state in an application. The most straight forward way is to define a state inside a component. The state of a component is like the props which are passed to a component, a plain JavaScript object containing information that influences the way a component is rendered, lets talk about managing state using Hooks and Context APIsConclusion

To a good extent, Redux works for state management in React applications and has a few advantages, but its verbosity makes it really difficult to pick up, and the ton of extra code needed to get it working in our application introduces a lot of unnecessary complexity.

On the other hand, with the useContext API and React Hooks, there is no need to install external libraries or add a bunch of files and folders in order to get our app working. This makes it a much simpler, more straightforward way to handle global state management in React applications.

In this blog we have covered only basic Hooks, In next Blog we will cover Advance Hooks and their use in Daily React JS Code.
[React JS Library
A JavaScript library for building user interfacestks.gitbook.io](https://tks.gitbook.io/react-training/)

Best Example to understand all is from @frontedMasters

<iframe width="600" height="400" src="https://medium.com/media/5f872753d17c849e3da86253845a2482" frameborder=0></iframe>


## Conclusion

Hooks are playing important rold for functional components and now functional components are same as class based components. 