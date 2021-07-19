---
date: 2019-12-23
title: 'React JS | Custom hooks/Lazy Loading /HOCs'
template: post
thumbnail: '../thumbnails/react.png'
slug: React-JS-Custom-hooks-Lazy-Loading-HOCs
categories:
  - ReactJS
  - Popular
tags:
  - ReactJS
  - ReactJS Hooks
---

<img class="cp t u fy ak" src="https://miro.medium.com/max/4980/1*FpQmx8PP09a-j1qKc89hYA.png" width="2490" height="1204" role="presentation"/>

Code-splitting React components
===============================

Several techniques have been in use for code-splitting React components. A common approach is applying dynamic `import()` to lazy-load Route components for an application — this is usually referred to as **_route-based_** _code-splitting_.

However, there is a very popular package for code-splitting React components called [**react-loadable**](https://github.com/jamiebuilds/react-loadable). It provides a higher-order component (HOC) for loading React components with promises, leveraging on the dynamic `import()` syntax.

Consider the following React component called `MyComponent`:

<img class="cp t u fy ak" src="https://miro.medium.com/max/2628/0*aFDEkNIBFNgJ5Ild" width="1314" height="608" role="presentation"/>

Here, the `OtherComponent` is not required until `MyComponent` is getting rendered. However, because we are importing `OtherComponent` statically, it gets bundled together with `MyComponent`.

We can use `**react-loadable**` to defer loading `OtherComponent` until when we are rendering `MyComponent`, thereby splitting the code into separate bundles. Here is the `OtherComponent` lazy-loaded using `**react-loadable**`.

<img class="cp t u fy ak" src="https://miro.medium.com/max/2628/0*jgRbSvim9IAryQWw" width="1314" height="869" role="presentation"/>

Here, you see that the component is imported using the dynamic `import()`syntax and assigned to the `loader` property in the options object.

**React-loadable** also uses a `loading` property to specify a fallback component that will be rendered while waiting for the actual component to load.

_You can learn more about what you can accomplish with_ `**react-loadable**` _in this_ [_documentation_](https://github.com/jamiebuilds/react-loadable/blob/master/README.md).

Using Suspense and React.lazy()
===============================



In **React 16.6**, support for component-based code-splitting and lazy-loading has been added via `**React.lazy()**` and `**React.Suspense**`.

> `_React.lazy()_` _and_ `_Suspense_` _are not yet available for server-side rendering. For server-side code-splitting,_ `_React Loadable_` _should still be used._

React.lazy()
============

`React.lazy()` makes it easy to create components that are loaded using dynamic `import()` but are rendered like regular components. This will automatically cause the bundle containing the component to be loaded when the component is rendered.

`React.lazy()` takes a function as its argument that must return a _promise_ by calling `import()` to load the component. **The returned Promise resolves to a module with a default export containing the React component.**

<img class="cp t u fy ak" src="https://miro.medium.com/max/2628/0*95j_3ZZYnYEvwmFK" width="1314" height="973" role="presentation"/>

Enter a caption for this image (optional)

Suspense
---------

> _A component created using_ `_React.lazy()_` _only gets loaded when it needs to be rendered._

Hence, there is need to display some form of placeholder content while the lazy component is being loaded — possibly a loading indicator. This is exactly what `**React.Suspense**` was created for.

`React.Suspense` is a component that is meant for wrapping lazy components. You can wrap multiple lazy components at different hierarchy levels with a single `Suspense` component.

The `Suspense` component takes a `fallback` prop that accepts the React elements you want rendered as placeholder content while all the lazy components get loaded.

<img class="cp t u fy ak" src="https://miro.medium.com/max/2628/0*XK7naxYRky3Ilp3w" width="1314" height="660" role="presentation"/>

Enter a caption for this image (optional)

> _An error boundary can be placed anywhere above lazy components to show nice user experience if a lazy component fails to load._

I have created a very simple demo on **CodeSandbox** to demonstrate using `React.lazy()` and `Suspense` for lazy-loading components. example on same is available here

React Hooks — Custom ones
=========================

We all know different Hooks and we are creating them but can we create our custom hook to fulfill some requirements

There might be instances where you have been using the same repetitive and redundant stateful logic inside multiple components. We were able to handle this situation by relying on Render props and Higher Order Components. But with hooks, we can do it in a much simpler and cleaner way, Thanks to the **Custom hooks.**

Okay, But what are they?
========================

These are normal javascript functions which can use other hooks inside of it and contain a common stateful logic that can be reused within multiple components. These functions are prefixed with the word `use`.

Let’s say you have 2 functions (components) which implement some common logic. You can create a third function with this common logic and implement it in the other two functions. After all, hooks are just functions.

Simple Hooks we are already aware —
-----------------------------------

Here’s a practical example:

```
import { useState } from 'react'
const Counter = () => {
const [count, setCount] = useState(0)
return (
    <div>
    <p>You clicked {count} times</p>
    <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
)}
```

You can add as many `useState()` calls you want, to create as many state variables as you want. Just make sure you call it in the top level of a component (not in an `if` or in any other block).

useDocumentTitle hook
=====================

Say we have to build a component which on every click increases the `count` and updates the title of the page with the`count` value using hooks. Not a big deal, right.

<img class="cp t u fy ak" src="https://miro.medium.com/max/3008/0*I62HzPzzGCjN0diZ.png" width="1504" height="1230" role="presentation"/>

It works well. I always prefer creating the component first and then extracting out the stateful logic from that function(component) and then putting it into another function(custom hook) and then just doing some refactoring so the component works well with our hook.

Let’s take the `useEffect` section out of the component and put it inside our new function `useDocumentTitle`.

<img class="cp t u fy ak" src="https://miro.medium.com/max/3008/1*ZMRB-WzFwo3Ue6J2-fVBkA.png" width="1504" height="1470" role="presentation"/>

custom Hook

Now Similarly we can extract out login in a separate hook and call that Hooks logic to build application component feature, Let’s build Flicker Image Loader as a custom Hook which can give use Loading, data or error State

<img class="cp t u fy ak" src="https://miro.medium.com/max/3196/1*QQHcGihGOzwvt9NWvXklYw.png" width="1598" height="864" role="presentation"/>

custom local storage Hook

Let’s Build another Hook to get Axios data from some image service

<img class="cp t u fy ak" src="https://miro.medium.com/max/3080/1*RNd_G0_J4gnvvMrlRzQUOA.png" width="1540" height="904" role="presentation"/>

<img class="cp t u fy ak" src="https://miro.medium.com/max/2992/1*nPnErFOQNk9H7pwujQMGmA.png" width="1496" height="632" role="presentation"/>

React HOCs
==========

What are they?
--------------

A pattern for when we find ourselves repeating logic across components. They are not part of the `React` API.

What do they do?
----------------

They are functions that take components and return new components!

When to use?
------------

When you’re repeating patterns/logic across components.

A simple example is I want to create route Guard in React like if a user is not logged In then only he should be allowed to go to Login, same logic needed for Register, forgot password and other main public routes

<img class="cp t u fy ak" src="https://miro.medium.com/max/3660/1*AKSEDf7dLtyaP211gUXy1w.png" width="1830" height="802" role="presentation"/>

Here to copy same Logic on all public routes I have added a Higher Order Component named as **PublicRoute,** below is the Code for out HOC which is returning route component

<img class="cp t u fy ak" src="https://miro.medium.com/max/3640/1*t_qTbmq0hpfYTUV_0fj3Dw.png" width="1820" height="758" role="presentation"/>

HOCs can be used to wrap something or execute logic before rendering main component like if you are logged in then go to /home page instead of login page.

You can understand this in plain English too
--------------------------------------------

If you ever thought “Is there a way by which I can simplify this such that I don’t need to rewrite the fetching logic again and again in all three views?”. Well, Higher-Order Component (HOC) provides a solution to such a kind of problems.

HOC is a powerful tool based on which many libraries are getting developed. The objective of this article is to explain how HOCs can help in simplifying and abstracting repeated logic in a React Applications.

Javascript, in general, can be treated as functional programming or object orient programming. HOCs are functional implementation of javascript. It has its similarities with the concept of Higher-Order functions.

Functions that operate on other functions, either by taking them as arguments or by returning them, are called higher-order functions.

```
function greaterThan(a) { // Higher order function
  return function(b) {
    return b > a;
  }
}
```

greaterThan(10)(11) will be true.

```
var greaterThan10 = greaterThan(10);
```

And anywhere we can use greaterThan10(11) [ Which will be true ]. This helps in abstraction the inner details thereby giving us the ability to think about higher level.

Higher-Order components are based on this. Given a function (Functional component) which takes a component and gives back another component.

> _Function(component) => (component)_

1. How it benefits in abstracting repeated logic?

A function (Functional component in React) which takes a component and gives back another component. We do this because we can do something inside the function which can add more power to the resulting component.

We can treat this as an inheritance to React. How? We can treat the input functional component as a Parent and the resultant as the inherited components. So the exact benefits are:

1.  Add / Update New props.
2.  Filter out props.
3.  Reuse Logic by maintaining an internal State.
4.  Change the Rendering of component based on any logic.

Simple example using functional Component —

```
import React from 'react';

**export const WrapperComponent(WrappedComponent) => {** // Wrapped Component is the parent component
 **return class HigherOrderComponent extends React.Component {**  **  // Returns a new component
    // Bring any reusable logic here.
    // For example Add a new prop to the existing props
    // or filter props based on the need**
    render() {
      return (
 **< WrappedComponent {...props} />
    // Renders a new prop based on any operation**      );
    }
  }
}

const FirstHOC = WrapperComponent(FirstComponent);
const SecondHOC = WrappedComponent(SecondComponent);
```

10 different way to Write todo App | React Hooks
------------------------------------------------

#### Using useReducer and useRef Hook (simplest one)
#### [medium.com] (https://medium.com/@tkssharma/10-different-way-to-write-todo-app-react-hooks-19dbdfe4a701)[

What is new about Hooks in React
--------------------------------
####  Introducing Hooks
####  [medium.com] (https://medium.com/tkssharma/what-is-new-about-hooks-in-react-e3e28f263c3c)[

Lazy-loading components in React 16.6 — LogRocket Blog
------------------------------------------------------

####  Code splitting and lazy loading has never been more simple.
####  [blog.logrocket.com] (https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52/)