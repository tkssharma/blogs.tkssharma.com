---
date: 2020-02-02
title: 'React UseMemo and useCallback Hooks'
template: post
thumbnail: '../thumbnails/react.png'
slug: react-usememo-callback-hooks
categories:
  - Popular
  - ReactJS
tags:
  - react
  - hooks
  - redux
  - react context
---

You may have seen, released along with [React Hooks](https://alligator.io/react/react-hooks/), a strange hook called `useMemo`. What could this strange, 👽alien👽 hook mean and what is it used for? Most importantly, how can it help you and why do you need to know about it?

First, a little brush up on JavaScript equality.

Referential Equality
====================

You may remember how Javascript compares objects 🥴. There are some tricky results when we run equality comparisons:

```
{} === {} // falseconst z = {}  
z === z // true
```

React uses `Object.is` to compare components, but that gives very similar results to using `===`. So, when React checks for any changes in a component, it may find a “change” that we wouldn’t really consider a change.

```
() => {} === () => {} // false  
[] === [] // false
```

This comparison check will cause some React re-rendering we didn’t intend or expect. If that re-rendering is some expensive operation, that can hurt performance. If one part re-renders, it re-render the entire component tree. Thus, React released the memo idea to fix this.

Memoization
===========

You may have heard this fancy word, memoization. Memoization is basically an optimization technique which passes a complex function to be memoized or remembered. In memoization, the result is remembered, when the same exact parameters are passed-in subsequently. Kind of like memorization. If we have a function compute 1 + 1, it will return 2. But if it uses memoization, the next time we run 1’s through the function it won’t add them up, it will just remember the answer is 2 without executing the adding function.

In React, memoization optimizes our components, avoiding complex re-rendering when it isn’t intended. [Here](https://alligator.io/react/learning-react-memo/) is a great article on using React.memo to optimize your application. React.memo acts like a pure component, wrapping your component and the linked article does a great job explaining it. However, useMemo is a bit different in usage.

From the official [React documentation](https://reactjs.org/docs/hooks-reference.html#usememo), useMemo’s signature looks like this:

```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

useMemo
========
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
Returns a memoized value.

Pass a “create” function and an array of dependencies. useMemo will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.

Remember that the function passed to useMemo runs during rendering. Don’t do anything there that you wouldn’t normally do while rendering. For example, side effects belong in useEffect, not useMemo.

As you can see, `useMemo` takes in a function and a list of dependencies (the array `[a, b]`). If you are familiar with [useEffect](https://alligator.io/react/replacing-component-lifecycles-with-useeffect/), then you have probably seen the dependencies idea. They act similar to arguments in a function. The dependencies list are the elements useMemo watches: if there are no changes the function result will stay the same, otherwise it will re-run the function. If they don’t change, it doesn’t matter if our entire component re-renders, the function won’t re-run but instead return the stored result. This can be optimal if the wrapped function is large and expensive. That is the primary use for useMemo.

useMemo Example
===============

```
const List = useMemo(  
  () =>   
  listOfItems.map(item => ({  
    ...item,  
    itemProp1: expensiveFunction(props.first),  
    itemProp2: anotherPriceyFunction(props.second)   
  })),  
  [listOfItems]  
)
```

In the above example, the useMemo function would run on the first render. It would block the thread until the expensive functions complete, as `useMemo` runs in the render. Initially, this won’t look as clean as useEffect, since useEffect can render a loading spinner until the expensive functions finish and the effects fire off. However, the expensive functions would never fire off again if `listOfItems` never changed and we would still get the return value from them. It would make these expensive functions seem instantaneous. This is ideal of you have an expensive, synchronous function or two.

Prevent Re-Rendering
====================

If you’re familiar with React’s class-component lifecycle hook, shouldComponentUpdate, `useMemo` has a similar usage in preventing unnecessary re-renders. Let’s say we have this instance:

```
function BabyGator({fish, insects}) { // because what else do baby gators eat?  
  const dinner = {fish, insects};  
  useEffect(() => {  
    eatFunction(dinner);  
  }, [fish, insects])  
}function MamaGator() {  
  return <BabyGator fish='small edible fish' insects={15}>  
}
```

This works perfectly well. Our `useEffect` hook watches the fish and insects props being passed-in (he is hungry). However, this only works with primitive values. That’s the key.

Remember back to talking about Referential Equality? `[] === [] // false`. That’s exactly what memoizing hooks like `useMemo` and `useCallback` are made for. If our insects prop is an array, we can put it in the `useMemo` hook and it will reference it, after a render, as equal. If a function or another non-primitive value is in the `useEffect` dependency, it will recreate a new array, because of [closure](https://alligator.io/js/closures/), and find it unequal.

Obviously here, we don’t need `useMemo`, if all we are doing is memoizing an array. But if there was an expensive function to calculate that array, `useMemo` would be useful!

useCallback
============
```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

Returns a memoized callback.

Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).
```
useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).
```

When Not to useMemo
===================

The `useCallback` hook is similar to `useMemo`, but it returns a memoized function, while `useMemo` has a function that returns a value. If our dependencies array is empty, there is no possibility of memoization and it will compute a new value on every render. You might as well implement the `useRef` hook at that point. The advantage `useMemo` offers over `useRef` is a re-memoizing if the dependencies change.

When looking to implement `useMemo` always ask, “is this really an expensive function?” Expensive means it is sucking up a lot of resources (like memory). If you are defining a ton of variables in a function at render, it might make sense to memoize with `useMemo`.

You won’t want to have `useMemo` fire off any side effects or any asynchronous calls. Both of those would make more sense to be contained within `useEffect`.

When looking to implement `useMemo`, write the code first then revisit it to see if you can optimize it. Don’t start with `useMemo`. Too many people implement it quickly and it can make performance worse in a small application.