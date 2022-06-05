---
date: 2022-06-01
title: 'unbox react 18 features, what is new'
topic: 'unbox react 18 features, what is new'
description: 'Let's explore react 18 features'
template: post
thumbnail: '../thumbnails/react.png'
slug: react-18-features-list
categories:
  - Guides
tag:
  - Javascript
  - react
  - react 18
tags:
  - Javascript
  - reactjs
  - react 18
---

React JS 18: An overview of its new features and updates
========================================================

React is an open-source JavaScript UI library designed by [Facebook](http://www.facebook.com), it has gained a lot of popularity in the front-end developer community.

React 18 is shifting from alpha to beta and has some exciting features and updates for the React.js development community. All updates are primarily aimed to maintain third-party libraries by introducing out-of-the-box features and improvements.

_React 18 new features and improvements are possible thanks to the new opt-in “concurrent rendering” mechanism in React 18 that enables React to create multiple versions of the UI at the same time. Though this change is mostly behind the scenes, it will unlock new possibilities to improve the app performance. — React document_

So let’s dive into the React 18 new features and updates.

**1\. Introduction of new Root API**
====================================

The “root” is a pointer to the top-level data structure used by React to track a tree render. In the legacy root API **_(ReactDOM.render)_**, the root was opaque to the users as we attached it to the DOM element and is accessed using the DOM node without exposing it to the users. However, we don’t need to store the root to the DOM node.  
The legacy Root API has some issues with the running updates, for example, we need to continue passing the container into the render, even though it never changes. The addition of a new root API fixes this issue so, we no longer need to pass the container into the render.  
Also, the changes in root API allow us to remove the **_hydrate_** method and replace it with an option on the root, similarly, it changes the way render callback works. For more details refer [discussion on GitHub](https://github.com/reactwg/react-18/discussions/5).

**2\. Improvement in Automatic Batching**
=========================================

Batching is nothing but grouping React multiple state updates together into a single render state to achieve better computational performance.  
In the earlier version of React, the batching was only done for React event handlers. However, in the case of any other events such as asynchronous state updates, updates inside promises, set timeouts, and native event handlers updates are not batched in React by default.  
The issue is resolved by adding automatic batching in React 18 using Root API, now all updates will be automatically batched irrespective of their origin.  
Further, you can opt out of batching using **_ReactDOM. flushSync()_**, in the cases, you need to read something immediately from the DOM once the state is changed.  
Refer [to React 18 Github discussion](https://github.com/reactwg/react-18/discussions/21) for detailed information.

**3\. New Start Transition API to keep your app responsive**
============================================================

One of the most significant updates of React 18 is the introduction of **_startTransition_** API that keeps your app responsive even during the large screen updates.  
Sometimes during heavy update operations, your app became unresponsive, the **_startTransition_** API can be very useful to handle such situations.  
The API allows users to control the concurrency aspect to improve user interaction. It is done by wrapping heavy updates as “**_startTransition_**” and will be interrupted only if more urgent updates are initiated. Thus it actually classifies urgent updates and slow updates.  
If the transition is interrupted by the user actions, React will throw out the stale rendering work that hasn’t yet finished and will render only the latest update.  
Refer to [React 18 GitHub discussion](https://github.com/reactwg/react-18/discussions/41) for more information.

**4\. New Suspense SSR, architectural improvements**
====================================================

React 18 has added an architectural improvement to the react server-side rendering. Server-side rendering generates HTML from the react components on the server and sends it back to the client, so the client can now see the page content before the JavaScript bundle load and run.  
Well, there is a drawback of SSR,

1.  It does not allow components to wait for data. That means before rendering HTML to the client, you must have your data ready for components on the server.
2.  You need to load the JavaScript for all components on the client before hydrating any of them to make them interactive.
3.  Also, you need to wait for all the components to be hydrated before interacting with them.  
    The problem can be overcome using two new features of **_suspense_**, i.e Streaming HTML and Selective hydration.

*   **Streaming HTML on the server  
    **With the streaming HTML, React will send the static pieces of UI components using **_suspense,_** which will decide which part of the component will take longer to load and what can be directly rendered, so the user does not need to wait to see the initial UI render.
*   **Selective Hydration on the client  
    **With selective hydration, components that are wrapped under **_suspense_** will not block hydration. Once the JS and content are loaded for each component it will start hydrating without blocking another component.

For more information refer to [React 18 GitHub discussion](https://github.com/reactwg/react-18/discussions/37).

**Conclusion:**
===============

React js 18 includes out-of-the-box improvements and new features that look impactful. It has cleared the way for new possibilities in React js app development.




These are the concepts you should know in React.js (after you learn the basics)
===============================================================================

![](https://miro.medium.com/max/1400/1*Wjs9dJlrtDyYtTYb073_Vg.jpeg)

Photo by [Daniel Jensen](https://unsplash.com/photos/Hfg3xK7KDDk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/)

You’ve followed your first React.js tutorial and you’re feeling great. Now what? In the following article, I’m going to discuss 5 concepts that will bring your React skills and knowledge to the next level.

If you’re completely new to React, take some time to complete [this tutorial](https://reactjs.org/tutorial/tutorial.html) and come back after!

1\. [The Component Lifecycle](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
============================================================================================================

By far the most important concept on this list is understanding the component lifecycle. The component lifecycle is exactly what it sounds like: it details the life of a component. Like us, components are born, do some things during their time here on earth, and then they die ☹️

But unlike us, the life stages of a component are a little different. Here’s what it looks like:

![](https://miro.medium.com/max/1400/1*U13Mlxz_ktcajaeJCyYkwg.png)

Image from [here!](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

Let’s break this image down. Each colored horizontal rectangle represents a lifecycle method (except for “React updates DOM and refs”). The columns represent different _stages_ in the components life.

A component can only be in one stage at a time. It starts with mounting and moves onto updating. It stays updating perpetually until it gets removed from the virtual DOM. Then it goes into the unmounting phase and gets removed from the DOM.

The lifecycle methods allow us to run code at specific points in the component’s life or in response to changes in the component’s life.

Let’s go through each stage of the component and the associated methods.

**Mounting**
------------

Since class-based components are classes, hence the name, the first method that runs is the `constructor` method. Typically, the `constructor` is where you would initialize component state.

Next, the component runs the `getDerivedStateFromProps`. I’m going to skip this method since it has limited use.

Now we come to the `render` method which returns your JSX. Now React “mounts” onto the DOM.

Lastly, the `componentDidMount` method runs. Here is where you would do any asynchronous calls to databases or directly manipulate the DOM if you need. Just like that, our component is born.

Updating
--------

This phase is triggered every time state or props change. Like in mounting, `getDerivedStateFromProps` is called (but no `constructor` this time!).

Next `shouldComponentUpdate` runs. Here you can compare old props/state with the new set of props/state. You can determine if your component should re-render or not by returning true or false. This can make your web app more efficient by cutting down on extra re-renders. If `shouldComponentUpdate` returns false, this update cycle ends.

If not, React re-renders and `getSnapshotBeforeUpdate` runs afterwards. This method has limited use as well. React then runs `componentDidUpdate`. Like `componentDidMount` you can use it to make any async calls or manipulate the DOM.

Unmounting
----------

Our component lived a good life, but all good things must come to an end. The unmounting phase is that last stage of the component lifecycle. When you remove a component from the DOM, React runs `componentWillUnmount` right before it gets removed. You should use this method to clean up any open connections such as WebSockets or intervals.

Other Lifecycle Methods
-----------------------

Before we move onto the next topic, let’s briefly talk about `forceUpdate` and `getDerivedStateFromError`.

`forceUpdate` is a method that directly causes a re-render. While there may be a few use cases for it, it should typically be avoided.

`getDerivedStateFromError` on the other hand is a lifecycle method that isn’t directly part of the component lifecycle. In the event of an error in a component, `getDerivedStateFromError` runs and you can update state to reflect that an error occurred. Use this method copiously.

The following [**CodePen snippet**](https://codepen.io/chrischuck/pen/EdrBxW) shows the steps in the mounting phase:

![](https://miro.medium.com/max/1400/1*f6eAmkAEw-wFCNkkICOVXA.png)

Mounting lifecycle methods in order

Understanding React’s component lifecycle and methods will allow you to maintain proper data flow and handle events in your application.

2\. [Higher-Order Components](https://reactjs.org/docs/higher-order-components.html)
====================================================================================

You may have used higher-order components, or HOCs, already. React-Redux’s `connect` function, for example, is a function that returns a HOC. But what exactly is a HOC?

From the React docs:

> A higher-order component is a function that takes a component and returns a new component.

Going back to React-Redux’s connect function, we can look at the following code snippet:

const hoc = connect(state => state)  
const WrappedComponent = hoc(SomeComponent)

When we call `connect`, we get a HOC back that we can use to wrap a component. From here we just pass our component to the HOC and start using the component our HOC returns.

What HOCs allow us to do is abstract shared logic between components into a single overarching component.

A good use case for an HOC is authorization. You could write your authentication code in every single component that needs it. It would quickly and unnecessarily bloat your code.

Let’s look at how you might do auth for components without HOCs:

Lot’s of repeated code and messy logic!

Using HOCs, you might do something like so:

Easy HOCs

Here’s a working [**CodePen snippet**](https://codepen.io/chrischuck/pen/yRwMeo) for the above code.

Looking at the above code, you can see we are able to keep our regular components very simple and “dumb” while still providing authentication for them. The `AuthWrapper` component lifts all authentication logic into a unifying component. All it does is take a prop called `isLoggedIn` and returns the `WrappedComponent` or a paragraph tag based on whether or not that prop is true or false.

As you can see, HOCs are extremely useful because they let us reuse code and remove bloat. We’ll get more practice with these soon!

3\. [React State and setState()](https://reactjs.org/docs/state-and-lifecycle.html)
===================================================================================

Most of you have probably used React state, we even used it in our HOC example. But it’s important to understand that when there’s a state change, React will trigger a re-render on that component (unless you specify in `shouldComponentUpdate` to say otherwise).

Now let’s talk about how we change state. The only way you should change state is via the `setState` method. This method takes an object and merges it into the current state. On top of this, there are a few things you should also know about it.

First, `setState` is asynchronous. This means state won’t update exactly after you call `setState` and this can lead to some aggravating behavior which we will hopefully now be able to avoid!

![](https://miro.medium.com/max/1400/1*qle8858T8Amobp6-WCrLZA.png)

setState asynchronous behavior

Looking at the above image, you can see that we call `setState` and then `console.log` state right after. Our new counter variable _should_ be 1, but it’s in fact 0. So what if we want to access the new state after `setState` actually updates state?

This brings us to the next piece of knowledge that we should know about `setState` and that is it can take a callback function. Let’s fix our code!

![](https://miro.medium.com/max/1400/1*typSaWY-BfT4fMUaAP_jJg.png)

It works!

Great, it works, now we’re done right? Not exactly. We’re actually not using `setState` correctly in this case. Instead of passing an object to `setState`, we’re going to give it a function. This pattern is typically used when you’re using the current state to set the new state, like in our example above. If you’re not doing that, feel free to keep passing an object to `setState`. Let’s update our code again!

![](https://miro.medium.com/max/1400/1*jWrcTSN4rr3f1rEYNiFcxQ.png)

Now we’re talking.

Here’s the [**CodePen**](https://codepen.io/chrischuck/pen/wYYxrd) for the above `setState` code.

What’s the point of passing a function instead of an object? Because `setState` is asynchronous, relying on it to create our new value will have some pitfalls. For example, by the time `setState` runs, another `setState` could have mutated state. Passing `setState` a function gives us two benefits. The first is it allows us to take a static copy of our state that will never change on its own. The second is that it will queue the `setState` calls so they run in order.

Just take a look at the following example where we try to increment the counter by 2 using two consecutive `setState` calls:

![](https://miro.medium.com/max/1400/1*iuNhuy16nNN8BeSWvdRqkg.png)

Typical async behavior from earlier

The above is what we saw earlier while we have the fix below.

![](https://miro.medium.com/max/1400/1*UaRuXtcBpVGrHHNknBAKTw.png)

The fix to get our expected behavior

[**CodePen**](https://codepen.io/chrischuck/pen/GYemvM) for above code.

In the first picture, both `setState` functions directly use `this.state.counter` and as we learned earlier, `this.state.counter` will still be zero after the first `setState` is called. Thus, we get 1 instead of 2 because _both_ `setState` functions are setting `counter` to 1.

In the second picture, we pass `setState` a function which will guarantee both `setState` functions run in order. On top of this, it takes a snapshot of state, rather than using the current, un-updated state. Now we get our expected result of 2.

And that’s all you need to know about React state!

4\. [React Context](https://reactjs.org/docs/context.html)
==========================================================

This brings us now to React context which is just global state for components.

The React context API allows you to create global context objects that can be given to any component you make. This allows you to share data without having to pass props down all the way through the DOM tree.

So how do we use context?

First create a context object:

`const ContextObject = React.createContext({ foo: "bar" })`

The React docs describe setting context in a component like so:

`MyClass.contextType = MyContext;`

However, in CodePen (React 16.4.2), this did not work. Instead, we’re going to use an HOC to consume context in a similar manner to what Dan Abramov [recommends](https://github.com/facebook/react/issues/12397#issuecomment-375501574).

What we are doing is wrapping our component with the `Context.Consumer` component and passing in context as a prop.

Now we can write something like the following:

And we’ll have access to `foo` from our context object in props.

How do we change context you might ask. Unfortunately, it’s a little more complicated but we can use an HOC again and it might look like this:

Let’s step through this. First, we take the initial context state, the object we passed to `React.createContext()` and set it as our wrapper component’s state. next we define any methods we’re going to use to change our state. Lastly, we wrap our component in the `Context.Provider` component. We pass in our state and function to the value prop. Now any children will get these in context when wrapped with the `Context.Consumer` component.

Putting everything together (HOCs omitted for brevity):

Now our child component has access to global context. It has the ability to change the `foo` attribute in state to `baz`.

Here’s a link to the full [**CodePen**](https://codepen.io/chrischuck/pen/jeJLZG?editors=0011) for the context code.

5\. [Stay up to date with React!](https://reactjs.org/blog/2018/10/23/react-v-16-6.html)
========================================================================================

This last concept is probably the easiest to understand. It’s simply keeping up with the latest releases of React. React has made some serious changes lately and it’s only going to continue to grow and develop.

For example, in React 16.3, certain [lifecycle methods](https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes) were deprecated, in React 16.6 we now get [async components](https://reactjs.org/docs/code-splitting.html#reactlazy), and in 16.7 we get [hooks](https://reactjs.org/docs/hooks-intro.html) which aim to replace class components entirely.

Conclusion
==========

Thanks for reading! I hope you enjoyed and learned a lot about React. While I hope you did learn a lot just from reading, I encourage you to try out all of these features/quirks for yourself. Reading is one thing, but the only way to master it is to do it yourself!

Lastly, just keep coding. Learning a new technology may seem daunting but the next thing you know, you’ll be a React expert.

If you have any comments, questions, or think I missed something, feel free to leave them below.