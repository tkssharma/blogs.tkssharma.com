---
date: 2020-01-12
title: 'React LifeCycle Methods'
template: post
thumbnail: '../thumbnails/react.png'
slug: react-lifecycle-methods
categories:
  - ReactJS
  - Popular
tags:
  - ReactJS
  - Javascript
---

## React Lifecycle Methods 

![LifeCycle React](../thumbnails/lifecycle.png)

Diagram published by React Commnunity, its a new set of lifecycle methods which are added in React >= 16.3.x 

React lifecycle diagram — [http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

<img class="cp t u fy ak" src="https://miro.medium.com/max/4560/1*EnuAy1kb9nOcFuIzM49Srw.png" width="800" height="500" role="presentation"/>

There are two main ways to define React components:
Lifecycle Methods depends on what kind of componnent you are writing (fn or classes based)

*   Function components
*   Class components

Initially, function components were less powerful than class components. They lacked the ability to use “state” (mutable properties that can be controlled from within a class component), and they couldn’t take full advantage of React’s lifecycle methods. Because of this, I’ve primarily used class components in my React apps (despite minor performance benefits of functional components). I also just preferred the more explicit syntax of class components.

Today, I’m trying to break my class component habit by teaching myself React Hooks. Hooks were introduced to React in October 2018 as a way of incorporating state and lifecycle concepts into functional components. They’ve been blogged about ad infinitum, but they’re still relatively new in actual use. They still aren’t being taught in my JavaScript/React-focused bootcamp even though they are pretty clearly the future of React as envisioned by its developers. I’m hoping that learning to use them now will give me a leg up as I begin my development career.

To begin, I want to focus on the two methods I use the most in React class components (other than render, which is just the body of the main function) — and how their functionality would be written with React Hooks.

Constructor( ) -> useState( )
=============================

I’m actually not even sure if the constructor counts as a component lifecycle method, but it functions much like one. In fact, this is just part of vanilla JavaScript that is used to define the properties of an object of a given class when it is instantiated. In React, the constructor is mostly useful for two purposes:

*   Setting initial values for state
*   Binding the keyword “this” to refer to the current object in non-lifecycle methods

The constructor is the ideal place for these two functions because it runs before the component is even rendered.

```
import React, {Component} from 'react'class Message extends Component {  
  constructor(props) {  
    super(props)  
    this.state = {  
      message: ''  
    }  
  this.setMessage = this.setMessage.bind(this)  
  } setMessage() {  
    this.setState({message: 'Hello World!'})  
  } render() {  
    return (  
      <main>  
        <button onClick={this.setMessage}>Click</button>  
        <p>{this.state.message}<p>  
      </main>  
    )  
  }  
}
```

In the above example, the Message component has three methods (functions) that run in the following order:

*   constructor() — sets the initial “message” state and binds the reference to “this” in the context of the setMessage method
*   render() — determines what content is displayed or “returned” by this component; initially only renders a button (with an event listener) and an empty paragraph (based on the empty string set for this.state.message in the constructor)

If a user clicks the button:

*   setMessage() — updates the message state from an empty string to ‘Hello World!’, causing the component to re-render and triggering cliche alarms everywhere
*   render() — runs again, now displaying “Hello World!” in place of the previous empty string

This is a very simple example, but I think it covers both of the main use cases for the constructor method in React. I still love separating all of this out to keep it more modular, but I understand that doesn’t appeal to everyone. Now to build the same component with React Hooks:

```
import React, {useState} from 'react'function Message() {  
  const [message, setMessage] = useState('')  
  return (  
    <main>  
      <button onClick={() => setMessage('Hello World!')}>  
        Click  
      </button>  
      <p>{message}</p>  
    </main>  
  )  
}
```

As you can see, this is much less code, and the constructor is totally unnecessary. With “useState()”, it’s possible to simultaneously set an initial value for “message” and create the “setMessage” function for updating the state in the future. Because setMessage is a function rather than a method and it’s called inline with an arrow function, there’s no need to define “this” or bind it to anything.

componentDidMount( ) -> useEffect( )
====================================

One of my most-used lifecycle methods is componentDidMount. This method is triggered automatically after a component is successfully mounted and rendered for the first time. I’ve used it for a few purposes, but most often I’ve used it to fetch data for my application.

```
import React, {Component} from 'react'class List extends Component {  
  constructor(props) {  
    super(props)  
    this.state = {  
      data: null  
    }  
  }  
  
  render() {  
    let listItems     
    if (this.state.data) {  
      listItems = this.state.data.map((item, i) => {  
        <p key={i}>{item.name}</p>  
      }  
    } else {  
      listItems = <p>Loading...</p>  
    }  
    return {listItems}  
  } componentDidMount() {  
    fetch('http://imaginaryurl.com/api/listItems').then((res) => {  
      res.json()).then((json) => {  
        this.setState({data: json})  
      }  
    }  
  }  
}
```

The code above follows this pattern:

*   constructor/render — mounts and renders the component in an incomplete state (often with some sort of loading indicator)
*   componentDidMount — fetches data from an imaginary API and uses that data to update the component’s state, triggering the component to re-render
*   render — the component renders again, this time using the data fetched in componentDidMount to fully serve its intended purpose

In preparing this blog, it appears there may be a better way to do this with [React.lazy and Suspense](https://reactjs.org/docs/code-splitting.html), but I’m still going to use this as an example for the useEffect Hook (with another cameo from our good friend useState):

```
import React, {useState, useEffect} from 'react'  
import axios from 'axios'function List() {  
  const [data, loadData] = useState(null)  
  useEffect(async () => {  
    let listItems = await axios(  
      'http://imaginaryurl.com/api/listItems'  
    )  
    loadData(listItems.data)  
  }, [])  
  let listItems     
  if (data) {  
    listItems = data.map((item, i) => {  
      <p key={i}>{item.name}</p>  
    }  
  } else {  
   listItems = <p>Loading...</p>  
  }  
  return {listItems}  
}
```

The release of 16.3 introduced some new life-cycle functions, which replaced existing ones to provide better support for the new asynchronous nature of React. We’ll be starting with one of these methods, getDerivedStateFromProps.

getDerivedStateFromProps
============================

As like as`componentWillReceiveProps`, `getDerivedStateFromProps` is invoked whenever a component receives new props. The new function’s main responsibility is ensuring that the state and props are in sync, when it is required. Replacing _componentWillReceiveProps_ is it’s  main job.

Here’s a sample of what the old method would look like:

<img class="dq t u hb ak" src="https://miro.medium.com/max/2184/1*QwVGn8ngZkJjht2RcxfUdA.png" width="1092" height="702" role="presentation"/>

_getDerivedStateFromProps_ function is invoked when the component is mounted as well as receives new props whether they are changed or not. It is also called if the parent component is re-render, so if you want to only update change of value, it is vital to have the previous and new value comparison. If a component has a state that is initialized from the props receiving from the parents. This function is the right place to sync up your props and state.

<img class="dq t u hb ak" src="https://miro.medium.com/max/2152/1*ULTJxP4vq0CCN7_4Vs47SA.png" width="1076" height="846" role="presentation"/>

`getDerivedStateFromProps` may be called multiple times for a single update, so it’s important to avoid any side-effects. Instead, we can use, which executes only once after the component updates.

**componentDidMount**
=========================

**componentDidMount** is executed after the first render only on the client side. This is where AJAX requests and DOM or state updates should occur. This method is also used for integration with other JavaScript frameworks and any functions with delayed execution such as **setTimeout** or **setInterval**. We are using it to update the state so we can trigger the other lifecycle methods.

As, this method would be invoked after a component is mounted, this is the right place to load any data from endpoint or set up any subscription.

Calling here `setState` will trigger re-render, so need to use this method with caution.

This is an example of fetching data from Reddit.

<img class="dq t u hb ak" src="https://miro.medium.com/max/2928/1*NsqqxQ0li0M00a7KqS0uWw.png" width="1464" height="1278" role="presentation"/>

getSnapshotBeforeUpdate(prevProps, prevState)
=================================================

_getSnapshotBeforeUpdate()_ is another new lifecycle method introduced in React recently. This will be a safer alternative to the previous lifecycle method _componentWillUpdate()._

It is used mostly if you need to read the current DOM state, for example, you have an application in which new messages are added to the top of the screen — if a user scrolled down, and a new message is added the screen could move and make the UI harder to use. By adding `getSnapshotBeforeUpdate` you can calculate the current scroll position and maintain it through the DOM update.

Another use case might be, resizing the window during an async rendering is a good use-case of when the _getSnapshotBeforeUpdate()_ can be utilized.

Even though the function is not static, it is recommended to return the value, not update the component. The returned value will be passed to as the 3rd parameter.

Deprecated functions
====================

You will start seeing the deprecation warnings in the next major version, and the function will be removed (the renamed versions will be kept!) in version 17.0. For now you can use these functions like this.

*   `componentWillReceiveProps` — `UNSAFE_componentWillReceiveProps`
*   `componentWillUpdate` — `UNSAFE_componentWillUpdate`

You will start seeing the deprecation warnings in the next major version, and the function will be removed (the renamed versions will be kept!) in version 17.0

I hope you found this tutorial fun and valuable. That’s it and if you found this article helpful, you can also follow me on [Medium](https://medium.com/@shuvohabib) and [Twitter](https://twitter.com/shuvohabib), and if you have any doubt, feel free to comment! I’d be happy to help :)