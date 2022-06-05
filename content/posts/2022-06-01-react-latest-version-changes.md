---
date: 2022-06-01
title: 'unbox react 18 features, what is new'
topic: 'unbox react 18 features, what is new'
description: 'Lets explore react 18 features'
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
