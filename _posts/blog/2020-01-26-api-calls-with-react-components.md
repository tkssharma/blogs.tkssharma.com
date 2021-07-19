---
date: 2020-01-26
title: 'Making API calls using React Components'
template: post
thumbnail: '../thumbnails/react.png'
slug: making-api-calls-using-hooks-and-lifecycle-methods-reactjs
categories:
  - Popular
tags:
  - Javascript
---

With the new updates coming up in the React library, it's indeed impossible to use all the new React features in your application. It’s been 6 months since the official release of React Hooks which was released with React 16.8.0 (February 6, 2019)

This article will help you take the baby steps in using React Hooks, it will explain all the basic approach which you can take to make the most out of this beautiful feature.


Let’s start with Quick Introduction to React Hooks

Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work in classes — they let you use React without classes.

### useState 😄

useState is a *Hook,* We call it inside a function component when we want to add some local state to it. The good thing about this is that the state will be preserved during re-rendering.

useState returns a pair: the ***current state value*** and a ***function*** that lets you update your component. Calling a function will work similarly to this.setState where it will update the values of the state, except it will not merge old and new state.

### useEffect 😄

The Effect Hook, useEffect adds the ability to perform side effects from a function component.

The purpose of useEffect is similar to the purpose of Lifecycle methods in the class component like componentDidMount , componentDidUpdate and componentWillUnMount

You can also decide when to re-render. Consider below the example where we have passed a count array after the useEffect.

    useEffect(() => {
      document.title = `You clicked ${count} times`;
    }, [count]); // Only re-run the effect if count changes

Let’s consider if the count value is 60 and if the component re-renders with the count value being unchanged i.e. 60, React will compare the previous render value and decide whether to call effect or not. If values are different then only the effect is called. Now that’s a way to increase performance and avoid unnecessary calls. 💯 🚀

If there are multiple items in the array, React will re-run the effect even if just one of them is different.

### Converting Class Component into a Functional Component with Hooks ⚖️

Let’s look at the example of how we can get the same behavior as a class component in a function component using Hooks.

***Example:*** Consider an example where you need to make API calls and fetch the data and populate in our component and clicking on the *load* more button would fetch more data from the server.

Until the Release of React 16.8.0(Hooks), it wasn't possible to achieve these using functional components as lifecycle methods aren’t accessible in the functional component and it wasn’t possible to manage the state inside a functional component.

For making API calls we will use Github APIs [https://developer.github.com/v3/search/#search-commits](https://developer.github.com/v3/search/#search-commits)

Here is what a typical React code looks like for both ordinary class component and functional component using Hooks.

![API call code [ Icon Credit — R[oundicons](https://www.flaticon.com/authors/roundicons) ]](https://cdn-images-1.medium.com/max/3576/1*e58rQldTQyOijWVWQtp8wQ.png)*API call code [ Icon Credit — R[oundicons](https://www.flaticon.com/authors/roundicons) ]*

Whenever API calls are involved we need multiple state values —

* Holding that data that is to be rendered

* Page count to make API call

* Loading state (show loading screen/component until the data is received from server)

* Error state (show error message when something goes wrong while fetching data)

Thus above image with Class component and the functional component does the same thing of loading the commits from the Github. Thus this simple example will help you understand how easy it is to start using hook into your application. With hooks, you can use write code neatly and sort.

![API Calls with React Hooks](https://cdn-images-1.medium.com/max/2000/1*1fkxwuCQl8hzxukGHPB8tA.gif)*API Calls with React Hooks*

**Code Snippet
 —** Class Component API calling Code

```javascript
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class GithubCommit extends React.Component {
  constructor() {
    super();
    this.state = {
      commitHistory: [],
      page: 1,
      isLoading: true
    };
    this.loadMoreCommit = this.loadMoreCommit.bind(this);
  }

  componentDidMount() {
    this.loadCommitHistory();
  }

  loadMoreCommit() {
    const { page } = this.state;
    this.setState(
      {
        page: page + 1
      },
      () => this.loadCommitHistory()
    );
  }

  loadCommitHistory() {
    const { page } = this.state;
    // Fetching data from FaceBook Jest Repo
    fetch(
      `https://api.github.com/search/commits?q=repo:facebook/react+css&page=${page}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/vnd.github.cloak-preview"
        })
      }
    )
      .then(res => res.json())
      .then(response =>
        this.setState({ commitHistory: response.items, isLoading: false })
      )
      .catch(error => console.log(error));
  }

  render() {
    const { commitHistory, isLoading } = this.state;
    return (
      <div>
        <h1> API calls with React Class Component </h1>
        {isLoading && <p>Wait I'm Loading comments for you</p>}

        {commitHistory.length !== 0 && (
          <button onClick={() => this.loadMoreCommit()}>
            Load More Commits
          </button>
        )}

        {commitHistory.map((c, index) => (
          <div key={index}>
            {c.commit && (
              <>
                <div>
                  <h2 style={{ textDecoration: "Underline" }}>
                    {c.commit.committer.name}
                  </h2>
                  <p>{c.commit.message}</p>
                </div>
                <hr />
              </>
            )}
          </div>
        ))}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<GithubCommit />, rootElement);
```
— Hooks API calling Code

```javascript
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function GithubCommit() {
  const [page, setPage] = useState(1);
  const [commitHistory, setCommitHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMoreCommit = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetch(
      `https://api.github.com/search/commits?q=repo:facebook/react+css&page=${page}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/vnd.github.cloak-preview"
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        setCommitHistory(response.items);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, [page]);

  return (
    <div>
      <h1> API calls with React Hooks </h1>
      {isLoading && <p>Wait I'm Loading comments for you</p>}

      {commitHistory.length !== 0 && (
        <button onClick={loadMoreCommit}>Load More Commits</button>
      )}

      {commitHistory.map((c, index) => (
        <div key={index}>
          {c.commit && (
            <>
              <div>
                <h2 style={{ textDecoration: "Underline" }}>
                  {c.commit.committer.name}
                </h2>
                <p>{c.commit.message}</p>
              </div>
              <hr />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<GithubCommit />, rootElement);
```

Here are the rules you should keep in mind while working with React Hooks

1. Don’t try to convert the old code written in class components into Hooks. However, it is recommended you can try using Hooks in the new implementation

1. [useState](https://reactjs.org/docs/hooks-overview.html#state-hook) and [useEffect ](https://reactjs.org/docs/hooks-overview.html#effect-hook)are the two new concepts which you should know to master Hooks

1. Only call Hooks **at the top level**. Don’t call Hooks inside loops, conditions, or nested functions.

1. Only call Hooks **from React function components**. Don’t call Hooks from regular JavaScript functions.

Thus this is how React Hooks can be useful in making API calls, sometimes we have to convert a functional component into a class component only because of not being able to manage the state inside the functional component.

**Reference**
- [https://reactjs.org/](https://reactjs.org/)

Happy Learning 💻 😄
