---
date: 2020-01-27
title: 'Create React Hooks and write Custom Hooks | functional Components'
template: post
thumbnail: '../thumbnails/react.png'
slug: create-custom-hooks-react-js
categories:
  - Popular
tags:
  - Javascript
---
Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.
```javascript
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

This new function useState is the first “Hook” we’ll learn about, but this example is just a teaser. Don’t worry if it doesn’t make sense yet!

You can start learning Hooks on the next page. On this page, we’ll continue by explaining why we’re adding Hooks to React and how they can help you write great applications.

Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work in classes — they let you use React without classes.

In addition to making code reuse and code organization more difficult, we’ve found that classes can be a large barrier to learning React. You have to understand how this works in JavaScript, which is very different from how it works in most languages. You have to remember to bind the event handlers. Without unstable syntax proposals, the code is very verbose. People can understand props, state, and top-down data flow perfectly well but still struggle with classes. The distinction between function and class components in React and when to use each one leads to disagreements even between experienced React developers.


To solve these problems, Hooks let you use more of React’s features without classes. Conceptually, React components have always been closer to functions. Hooks embrace functions, but without sacrificing the practical spirit of React. Hooks provide access to imperative escape hatches and don’t require you to learn complex functional or reactive programming techniques.

Building your own Hooks lets you extract component logic into reusable functions.

# Lets write some custom Hooks

> ### build responsive Layout

Wouldn’t it be great if instead of having to reach for CSS and media queries we could create these responsive layouts right in our React code? Let’s take a quick look at a naive implementation of something like this, to see exactly what I mean:
```javascript

const MyComponent = () => {
  // The current width of the viewport
  const width = window.innerWidth;
  // The width below which the mobile view should be rendered
  const breakpoint = 620;
  
  /* If the viewport is more narrow than the breakpoint render the
     mobile component, else render the desktop component */
  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
}

```

Initial implementation using Hooks
Lets try to use Hooks to solve this problem using Hook, we can initilize width with some value and using resize event we can set width dynamically using useEffect Hook, 
useEffect hook trigger when width gets changed as we are passing width in dependancy of this Hook

```javascript
const MyComponent = () => {
  // Declare a new state variable with the "useState" Hook
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 620;

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
}
```
There is still a small problem with our code, though. We are adding an event listener, but never cleaning up after ourselves by removing it when it is no longer needed. Currently when this component is unmounted the “resize” event listener will linger in memory, continuing to be called when the window is resized and will potentially cause issues. In old school React you would remove the event listener in a componentWillUnmount lifecycle event, but with the useEffect Hook all we need to do is return a cleanup function from our useEffect.

```javascript
const MyComponent = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 620;

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
}
```

Custom React Hooks are a great tool that we can use to extract component logic into easily reusable functions. we can write custom function that will take care of Logic and we can isolate 
function as a saperate Hook

```javascript
const useViewport = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // Return the width so we can use it in our components
  return { width };
```

> ### useGeo Hooks

Some good examples like making api calls and return data using cutom hooks and another hook is returning Geo location Cords.
![](https://miro.medium.com/max/3060/1*AaT0tZbMaGWo3iBq2EdNmw.png)
We are using useGeo Hook in React application, its functional component and there we are getting data from Geo Hook like lat and lon and 
```javascript
const {geo, isLoading, error} = useGeo();
```
![](https://miro.medium.com/max/2634/1*_AjxJlmUMH2imNi_Pgvq4Q.png)

> ### axios Call Hook
Lets write another Hook to make api calls and get data or error, Like simple REST API which is returning list of friends from api call or error.

```javascript
function UseApiHook(){
  const [data, setData]= useState([]);
  const [error, setError]= useState(null);
  useEffect(() => {
    axios.get('http://localhost/api/v1/getUsers')
         .then(i => setData(i.data))
         .catch((err) => setError(err));
    return () => null
  })
  return [data, error]
}
```
```javascript
import React from 'react'
import useAPIHook from './useAPIHook'

function Dashboard(props){
    const [friends, error] = useAPIHook()

    return <div>
        { friends.length > 0 ? friends.map(friend => <div key={friend.id}>{friend.name}</div> 
            : error.message
        </div>
}

export default Dashboard
```

> ### Local Storage Hook

```javascript
 function getKeyFromLS(key) {
  const val = localStorage.getItem(key);
  try {
    const info = JSON.parse(val);
    return info || null;
  } catch (e) {
    // console.log('Clear localstorage here');
  }
  return null;
}
function useLocalStorage(){
  const [user, setUser]= useState(getKeyFromLS(LS_USER_INFO_KEY));
  const updateUser = info => {
    localStorage.setItem(LS_USER_INFO_KEY, JSON.stringify(info));
    setUser(info);
  };
  const extend = (attr) => {
    const data =  JSON.parse(localStorage.getItem(LS_USER_INFO_KEY));
    const extendData = {...data,...attr };
    localStorage.setItem(LS_USER_INFO_KEY, extendData)
    setUser(extendData)
  }
  return [user,updateUser, extendUser]
}
```
> ### Create a Custom React Hook to Handle Form Fields

```javaScript
import { useState } from "react";

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function(event) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value
      });
    }
  ];
}
```
Above mentioned hook can be used 
```javascript
  const [fields, handleFieldChange] = useFormFields(obj)
```

```javascript
export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });
  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
}
```

Happy Learning, Keep writing new set of Hooks 💻 😄
