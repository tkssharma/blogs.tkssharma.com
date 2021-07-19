---
date: 2020-04-22
title: 'React Hook to Build Forms with Validation'
template: post
featured:  '../thumbnails/react.png'
thumbnail: '../thumbnails/react.png'
slug: react-hooks-to-build-react-forms-with-validation
categories:
  - Popular
tags:
  - typescript
  - reactjs
  - javascript
---

React Hooks 
-----------

Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don't work inside classes — they let you use React without classes. (We don't recommend rewriting your existing components overnight but you can start using Hooks in the new ones if you'd like.)


If you are reading this post, then you now know how to use the useState, useEffect, and the useContext hooks in your React App.
But real-world apps are not going to be so simple. Eventually, you will need to figure out how to use these hooks together.

When you use two or more basic hooks together, you are creating something called as a custom hook!

We have different Hooks like useState,useEffect, useReducer and many more.

useState
---------
```javascript
const [state, setState] = useState(initialState);
```
Returns a stateful value, and a function to update it.

During the initial render, the returned state (state) is the same as the value passed as the first argument (initialState).

The setState function is used to update the state. It accepts a new state value and enqueues a re-render of the component.
```javascript
setState(newState);
```
During subsequent re-renders, the first value returned by useState will always be the most recent state after applying updates.

Note

React guarantees that setState function identity is stable and won’t change on re-renders. This is why it’s safe to omit from the useEffect or useCallback dependency list.

Functional updates
If the new state is computed using the previous state, you can pass a function to setState. The function will receive the previous value, and return an updated value. Here’s an example of a counter component that uses both forms of setState:
```javascript
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
```
The ”+” and ”-” buttons use the functional form, because the updated value is based on the previous value. But the “Reset” button uses the normal form, because it always sets the count back to the initial value.

If your update function returns the exact same value as the current state, the subsequent rerender will be skipped completely.

Let's use this Hook to Build our React Forms
--------------------------------------------
 A simple form in html look like this 

```javascript
import React from 'react';
const Signup = () => {
  return (
    <form>
      <div>
        <label>First Name</label>
        <input type="text" name="firstName" required />
        <label>Last Name</label>
        <input type="text" name="lastName" required />
      </div>
      <div>
        <label>Email Address</label>
        <input type="email" name="email" required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password1"/>
      </div>
      <div>
        <label>Re-enter Password</label>
        <input type="password" name="password2"/>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  )
}
export default Signup;
``` 
In a simple way you can add onChange event and on submit event and add dynemic nature to this form to capture values from it on submit click 

Any and every form on the Internet has these two event handlers:

- onSubmit — The handler that controls form’s submission
- onChange — The handler that changes the input element’s values
  
Let’s create a new custom hook of our own that we can use to handle the submission and input change events. Start by creating a new file named CustomHooks.js. I will be writing all the custom hooks for this post inside this file. Start by creating a new functional component named useSignUpForm inside this file.

Custom Hooks are not a new concepts its just a function returning some values, we can create Hooks for axios call or handling errors and many more 

Let’s take a look at what we want our custom hook to do for us. First, it should use the built-in useState hook to keep track of all input values inside our form. So make sure that you import this hook from react.
```javascript
import React, {useState} from 'react';
```
The functional component will then take callback as an input parameter. Callback is a function that gets called whenever the user submits the form.
```javascript
const useSignUpForm = (callback) => {
  return null;
}
```
We will then use the useState hook to initialize a state variable and its setter function.
```javascript
const useSignUpForm = (callback) => {
  const [inputs, setInputs] = useState({});
  return null;
}
```
Next, create a function that manages the submit event. This function should simply prevent the default behavior of the browser (which is usually to refresh the page) and call the callback function.
```javascript
const useSignUpForm = (callback) => {
  const [inputs, setInputs] = useState({});
  
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  }
  return null;
}
```
Similarly, we need a function have manages the event where the user gives some input. This event will be triggered every time the user enters some input. We will also use the setInputs function from the hook to update the inputs state variable with the user’s input.
```javascript
const handleInputChange = (event) => {
  event.persist();
  setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
}
```
And finally, we need to return the handleSubmit, handleInputChange, and the inputs from the custom hook. The functional component will look like this:
```javascript
const useSignUpForm = (callback) => {
  const [inputs, setInputs] = useState({});
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
  }
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }
  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
}
```

Now we can import this hook and use it in our forms 
```javascript
const {inputs, handleInputChange, handleSubmit} = useSignUpForm();
<form onSubmit={handleSubmit}>
  <div>
    <label>First Name</label>
    <input type="text" name="firstName" onChange={handleInputChange} value={inputs.firstName} required />
    <label>Last Name</label>
    <input type="text" name="lastName" onChange={handleInputChange} value={inputs.lastName} required />
  </div>
  <div>
    <label>Email Address</label>
    <input type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
  </div>
  <div>
    <label>Password</label>
    <input type="password" name="password1" onChange={handleInputChange} value={inputs.password1}/>
  </div>
  <div>
    <label>Re-enter Password</label>
    <input type="password" name="password2" onChange={handleInputChange} value={inputs.password2}/>
  </div>
  <button type="submit">Sign Up</button>
</form>
```

We cana lso explore https://react-hook-form.com/ 
this is lightweight forms better then redux-forms and other librray as it is not doing unecessary rendering 
```javascript
import React from "react";
import { useForm } from "react-hook-form";

const Example = () => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => console.log(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="email"
        ref={register({
          required: "Required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "invalid email address"
          }
        })}
      />
      {errors.email && errors.email.message}

      <input
        name="username"
        ref={register({
          validate: value => value !== "admin" || "Nice try!"
        })}
      />
      {errors.username && errors.username.message}

      <button type="submit">Submit</button>
    </form>
  );
};
```
Same with Redux-form where we are writing more code and lot of rendering happening on handleInput change 
```javascript
import React from "react";
import { Provider } from "react-redux";
import { Field, reduxForm } from "redux-form";
import store from "./store";

const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = "Required";
  } else if (values.username === "admin") {
    errors.username = "Nice try!";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <>
    <input {...input} placeholder={label} type={type} />
    {touched && error && <span>{error}</span>}
  </>
);

const Form = props => {
  const { handleSubmit } = props;
  const onSubmit = values => console.log(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field name="email" type="email" component={renderField} label="Email" />
      <Field name="username" component={renderField} label="Username" />
    
      <button type="submit">Submit</button>
    </form>
  );
};

const FormRedux = reduxForm({ form: "syncValidation", validate })(Form);

const Example = () => (
  <Provider store={store}>
    <FormRedux />
  </Provider>
);
```

Quick compare 
![forms](../thumbnails/forms.png)