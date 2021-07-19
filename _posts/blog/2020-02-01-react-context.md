---
date: 2020-02-01
title: 'Global Cached State in React using Hooks, Context, and Local Storage'
template: post
thumbnail: '../thumbnails/react.png'
slug: global-cache-using-hooks
categories:
  - ReactJS
tags:
  - react
  - hooks
  - context
  - useMemo
  - useCallback
---

![LifeCycle React](../thumbnails/context.png)


Intro
=====

Hooks have been around for a while now, and I’m sure everyone has started taking advantage of them. I, myself, have definitely been doing so (maybe too much because I refuse to write any class components anymore).

As my application grew, I ran into the need for a global context. Luckily, at the time of development, React context had just come out (but hooks was yet to appear) and I was eager to test things out. I set up my context providers and consumers and a wrapper function to provide context to my various components but it still seemed bulky. My context state was growing into a monolith and accessing the values wasn’t too intuitive. On top of everything, I realized I now needed a way to store things locally so that when my user refreshed the page, everything didn’t reset. So I went into research mode and here’s the solution I came up with.

Basic App Set Up
================

In this example, we’re going to have a simple website where you have some info on the user that you want to persist. In the real world, you might want to store this info in a database and pull it through an API — in which case you could just simply store the sessionId or token. For this example, we’ll have a home page which displays the user’s currently set info and an edit view (separate component) which, well… does just that.

If copy/pasting is too much, here’s a [sandbox](https://codesandbox.io/s/interesting-voice-dkbcm) of the current state.

`index.js`
----------

```
// index.js**import** React, { useState } **from** "react";  
**import** ReactDOM **from** "react-dom";  
**import** Home **from** "./Home";  
**import** EditDetails **from** "./EditDetails";  
  
**const** styles = {  
    header: {  
        height: 48,  
        backgroundColor: "#ccc"  
    },  
    headerTitle: {  
        display: "inline"  
    },  
    editButton: {  
        float: "right",  
        height: 48,  
        width: 64  
    }  
};  
  
**function** App() {  
    **const** \[isEditing, setIsEditing\] = useState(**false**);  
  
    **const** EditButton = () => (  
        <button  
            style={styles.editButton}  
            onClick={() => setIsEditing(prevValue => !prevValue)}  
        >  
            {!isEditing ? "Edit Info" : "Save"}  
        </button>  
    );  
  
    **return** (  
        <div className="App">  
            <div style={styles.header}>  
                <h2 style={styles.headerTitle}>My Website</h2>  
                <EditButton />  
            </div>  
            {!isEditing ? <Home /> : <EditDetails />}  
        </div>  
    );  
}  
  
**const** rootElement = document.getElementById("root");  
ReactDOM.render(<App />, rootElement);
```

`Home.js`
---------

```
// Home.js**import** React **from** "react";  
  
**const** styles = {  
    infoPanel: { borderStyle: "solid", padding: 8 }  
};  
  
**const** Home = () => {  
    **return** (  
        <React.Fragment>  
            <h1>Home Page</h1>  
            <Info info={{}} />  
        </React.Fragment>  
    );  
};  
  
**const** Info = ({ info }) => (  
    <div style={styles.infoPanel}>  
        <p>Name: {info.name}</p>  
        <p>Age: {info.age}</p>  
        <p>Email: {info.email}</p>  
    </div>  
);  
  
**export default** Home;
```

`EditDetails.js`
----------------

```
// EditDetails.js**import** React **from** "react";  
  
**const** styles = {  
    infoPanel: { borderStyle: "solid", padding: 8 }  
};  
  
**const** EditDetails = () => {  
    **return** (  
        <React.Fragment>  
            <h1>Edit Details</h1>  
            <div style={styles.infoPanel}>  
                <p>  
                    Name <input />  
                </p>  
                <p>  
                    Age <input />  
                </p>  
                <p>  
                    Email <input />  
                </p>  
            </div>  
        </React.Fragment>  
    );  
};  
  
**export default** EditDetails;
```

Feel free to ignore the CSS styling, I might have gone a little overboard on making things look presentable. Otherwise, hopefully, nothing much to explain here.

Context Using Hooks
===================

You’ve probably used hooks like `useState` and `useReducer` but, if you’re like me, I hadn’t touched `useContext` yet. We’re going to set up a simple context class to store user info (we’ll get to local storage later on).

Start off with a new file appropriately named `InfoContext.js`

```
// InfoContext.js**import** React, { useReducer } **from** "react";  
  
**let** reducer = (info, newInfo) => {  
    **return** { ...info, ...newInfo };  
};  
  
**const** initialState = {  
    name: "John Smith",  
    age: 52,  
    email: "john.smith@gmail.com"  
};  
  
**const** InfoContext = React.createContext();  
  
**function** InfoProvider(props) {  
    **const** \[info, setInfo\] = useReducer(reducer, initialState);  
  
    **return** (  
        <InfoContext.Provider value={{ info, setInfo }}>  
            {props.children}  
        </InfoContext.Provider>  
    );  
}  
  
**export** { InfoContext, InfoProvider };
```

Here, we’re using the original React Context with the addition of a reducer for modifying/managing the state of the context.

```
// InfoContext.js...**let** reducer = (info, newInfo) => {  
    **return** { ...info, ...newInfo };  
};
```

Our reducer function simply takes in the current state value from reducer and the new state provided by the user and combines them (similar to how `setState` works)

```
// InfoContext.js...**const** InfoContext = React.createContext();
```

This is the standard and original React context set up (we don’t pass in an initial value into `createContext` because we set it later in `InfoProvider`

Inside of `InfoProvider` we set up the reducer with an initial state (could be a blank object if desired) and then return the `Provider` contained inside the context created by React. We pass our reducer into the prop `value` and then return the children.

Now, the last thing left to do for the initial setup of context is to wrap the whole app in `InfoProvider`. Your new `index.js` should look like this

```
// index.js...**return** (  
    <div className="App">  
        <InfoProvider> //new provider   
            <div style={styles.header}>  
                <h2 style={styles.headerTitle}>My Website</h2>  
                <EditButton />  
            </div>  
            {!isEditing ? <Home /> : <EditDetails />}  
        </InfoProvider>  
    </div>  
);
```

Now, onto the actual components that will be consuming the context via hooks. Inside `Home.js`, add this line before the return

```
// Home.js...**const** {info, setInfo} = useContext(InfoContext)
```

For context (hah), the old way of obtaining these values would be wrapping your component in the `InfoContext` component and then obtaining the values through returning a function while destructuring and… yeah, it’s a lot. Now, all we have to do is this one line and it’s quite beautiful. Go ahead and update your `Info` component props to actually pass in the `info` from context

```
// Home.js...<Info info={info} />
```

At this point, your app should look something like this. I will be accepting nominations for CSS design awards later this year.

<img class="de t u iw ak" src="https://miro.medium.com/max/3156/1\*y0A7DcPpT59YiT-uR83dBw.png" width="1578" height="560" role="presentation"/>

But, we’re not done yet. Go ahead and do the same thing inside of `EditDetails`. Something like this should get us some input fields with the same values. Note how these components aren’t linked at all and yet they’re sharing the same state.

```
// EditDetails.js...<div style={styles.infoPanel}>  
    <p>  
        Name <input value={info.name} />  
    </p>  
    <p>  
        Age <input value={info.age} />  
    </p>  
    <p>  
        Email <input value={info.email} />  
    </p>  
</div>
```

Okay, great, we have the info in two places, but now we need to update it. We’ll create a simple setter function to handle the change of the inputs that can go under the`useContext` line.

```
// EditDetails.js...**const** handleChange = key => event => {  
    setInfo({ \[key\]: event.target.value });  
};
```

Now, we have to add this to each `onChange` prop of the inputs like so

```
// EditDetails.js...<p>  
    Name <input value={info.name} onChange={handleChange("name")}/>  
</p>...
```

Take notice that since the `handleChange` function has nested functions, we can pass it to `onChange` without the need for an arrow function.

At this point, you should be able to hit edit, modify the info, and then hit save and the home page should be updated. But, if you refresh, things will reset back to default. [Code Sandbox](https://codesandbox.io/s/hardcore-chatterjee-9os0o)

Adding in Local Storage
=======================

The goal of this project was to make sure that the info entered by the user was globally accessible (check) but also saved locally to persist across a refresh. Let’s go back to `InfoContext.js` to make the necessary modifications.

If you haven’t worked with it before, \`window\` provides us with this neat little set of functions inside of `localStorage` (you don’t even have to import it!). `localStorage` has methods such as [get, set, and delete](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

The first thing we need to do is make sure that we can pull in the value from local storage if it exists. Add in this function after the `initialState` setup

```
// InfoContext.js...const localState = JSON.parse(localStorage.getItem("info"));
```

Here, we’re going to pull in whatever value might be stored locally as `info` and parse it into a JSON object (local storage can only store strings, so we have to parse it back and forth). Next, we can modify the reducer setup as such

```
// InfoContext.js...const \[info, setInfo\] = useReducer(reducer, localState || initialState);
```

Here, we’re going to set the initial state of the reducer to the `localState` if it exists, and, otherwise, the `initialState` that we defined earlier. The last step now is to ensure that we save the `localState` as we change our in-memory state. This can be done by using React Hook’s `useEffect`. Insert this right after the reducer setup.

```
// InfoContext.js...useEffect(() => {  
    localStorage.setItem("info", JSON.stringify(info));  
}, \[info\]);
```

As mentioned earlier, we’re taking the `info` object and converting it to a string for storage.

And now we’re done! Reload the app and edit your details, hit save (or don’t, it doesn’t actually “save” but just switches views) and then refresh the page. Your info should be there still!

For completeness, you might want to be able to reset the values and this can be done through `localStorage.removeItem("info")`. We can add this to our reducer function like so

```
// InfoContext.js...**let** reducer = (info, newInfo) => {  
    **if** (newInfo === **null**) {  
        localStorage.removeItem("info");  
        **return** initialState;  
    }  
    **return** { ...info, ...newInfo };  
};
```

The method I have chosen for resetting the values is by passing in a `null` value. If we detect that `newInfo` is `null`, we will clear out the values and reset `info` the value of `initialState` (you could reset to a blank object as well if you desired). This functionality is useless without a button (or some other tirgger), though, so in `Home.js` let’s implement the functionality. Throw in this button anywhere you see fit.

```
// Home.js<button onClick={() => setInfo(**null**)} style={styles.resetButton}>  
    Reset Cache  
</button>
```

and if you’re interested, here’s the style I went with:  
`resetButton: { width: 64, height: 32, marginTop: 8, float: “right” }`

That’s it! Now, the reset button should reset to defaults and anything updated in the info state will be saved locally and persist across refreshing. In addition to `localStoarge` there is also `sessionStorage` which is only persistent across the single session.

Here’s the final product in [Code Sandbox](https://codesandbox.io/s/smoosh-cherry-thdsm)

Notes
=====

This is my first guide on here so please let me know where things went wrong and things went right. I would love to continue to write more tutorials and give back to the community the same as I have received.