---
date: 2020-01-11
title: 'React Design patterns (Props-Renderer, Compound Component & Context)-Part 2'
template: post
thumbnail: '../thumbnails/react.png'
slug: react-design-pattern-part-2
categories:
  - javascript
  - ReactJS
tags:
  - ReactJS
  - Design Pattern
  - Javascript
---

## Lets Talk about some Advance React Hooks
![React Patterns ](../thumbnails/patterns.png)
- Compound Pattern
- Renderer Props
- ReactJS Context Pattern using Provider 

### Lets talk about Each Pattern one by one

![React Patterns ](../thumbnails/patterns-react.png)

Functional Component React JS
------------------------------
------------------------------

React functional component with Hooks are the best thing happened in React, Now i do write React Componnets using Functional Components only where state can be managed by Hooks and Context APIs


The definition of the component happens with just a JavaScript Function which has to return JSX -- ReactJS's syntax for defining a mix of HTML and JavaScript whereas the JavaScript is used with curly braces within the HTML. In our case, we render a variable called greeting, which is defined in the component's function body, and is returned as HTML headline in JSX.

Note: If you are familiar with React Class Components, you may have noticed that a Functional Component is a React Component without render function. Everything defined in the function's body is the render function which returns JSX in the end.

```javascript
// two different Components using arrow functions, Event handling and props passing
import React, { useState } from 'react';
const App = () => {
  // use of Hooks here 
  const [greeting, setGreeting] = useState(
    'Hello Function Component!'
  );
  const handleChange = event => setGreeting(event.target.value);
  return (
    <Headline headline={greeting} onChangeHeadline={handleChange} />
  );
};

const Headline = ({ headline, onChangeHeadline }) => (
  <div>
    <h1>{headline}</h1>
    <input type="text" value={headline} onChange={onChangeHeadline} />
  </div>
);
export default App;
```

Lets talk about another example of functional component with spreading props

```javascript 
const App = () => {
  const [greeting, setGreeting] = useState(
    'Hello'
  );
  const handleChange = e => setGreeting(e.target.value);
  return (
    <div>
      <Input value={greeting} onChangeInput={handleChange}>
        Hey man 
      </Input>
    </div>
  );
};
const Input = ({ value, onChangeInput, children }) => (
  <label>
    {children}
    <input type="text" value={value} onChange={onChangeInput} />
  </label>
);
export default App;

```

Here `{ value, onChangeInput, children }` is the example of spreading props using the fearure of javascript destructuring and accessing them in child component.
React functional Component now has become more powerful as they have now Hooks which manages lifecycle of functional Components.

Since React Hooks have been introduced in React, Function Components are not anymore behind Class Components feature-wise. You can have state, side-effects and lifecycle methods in React Function Components now. That's why I strongly believe React will move more towards Functional Components, because they are more lightweight than Class Components and offer a sophisticated API for reusable yet encapsulated logic with React Hooks.

JSX Spread attributes
--------------------
--------------------

If you know all the properties that you want to place on a component a head of time, it is easy to use JSX:

```javascript
  var component = <Component foo={x} bar={y} />;
```

Mutating Props is Bad, mkay
---------------------------

If you don't know which properties you want to set, you might be tempted to add them onto the object later:

```javascript
  var component = <Component />;
  component.props.foo = x; // bad
  component.props.bar = y;
```

This is an anti-pattern because it means that we can't help you check the right propTypes until way later. This means that your propTypes errors end up with a cryptic stack trace.

The props should be considered immutable at this point. Mutating the props object somewhere else could cause unexpected consequences so ideally it would be a frozen object at this point.

Constructing Your Props Before the Component
--------------------------------------------

The lesson learned is that you should be constructing all your props first and then passing them into the component.

In the early days of JSX you didn't have a way to pass a props object to your component, so you had to resort to a plain function call:

```javascript
  var props = {};
  props.foo = x;
  props.bar = y;
  var component = Component(props); // Where did my JSX go?
```

Spread Attributes
-----------------

Now you can use a new feature of JSX called spread attributes:

```javascript
  var props = {};
  props.foo = x;
  props.bar = y;
  var component = <Component {...props} />;
```

The properties of the object that you pass in are copied onto the component's props.

You can use this multiple times or combine it with other attributes. The specification order is important. Later attributes override previous ones.

```javascript
  var props = { foo: 'default' };
  var component = <Component {...props} foo={'override'} />;
  console.log(component.props.foo); // 'override'
```

What's with the weird `...` notation?
-------------------------------------

The `...` operator (or spread operator) is already supported for [arrays in ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator). We're also pushing to get the spread operator for object properties in ES7. You can read the full proposal here:

[Object Rest and Spread Properties](https://github.com/sebmarkbage/ecmascript-rest-spread)

In fact, thanks to our JS transform pipeline, you can already use this in our code base as an experimental syntax:

```javascript
  var oldObj = { foo: 'hello', bar: 'world' };
  var newObj = { ...oldObj, foo: 'hi' };
  console.log(newObj.foo); // 'hi';
  console.log(newObj.bar); // 'world';
```

Merging two objects can be expressed as:

```javascript
  var ab = { ...a, ...b }; // merge(a, b)
```

Rationale: Spread Syntax in JSX
-------------------------------

_Why not `<div props={props} />`?_

This reads more like the traditional attribute-value model of XML. However, it's semantics are a bit unclear. We don't actually want to allow you to set the props object itself. It's going to be a copy. It's also not setting the property named `props`.

_Why not `<div {props} />`?_

Again, this is not passing the props object through. We can't allow that. So therefore it's unclear where the copying happens in this case. It's also not consistent with the other spread syntax if you want to do the same thing in objects.

_Why not `<div ...props />`? Why do we need curlies?_

This becomes ambiguous for certain expressions such as `<div ...x / 5 />` where you need lots of look-ahead to solve the ambiguity. We might be able to allow a small subset of expressions to avoid the curlies in all attribute expressions, but then it would be confusing when you need it and when you don't.

_Why not `<div ...{props} />`?_

This would be a reasonable but there is another use case for spread in JSX that might come up in the future... The children position.

`<div> prefix {...children} suffix </div>`

This would either be inconsistent in attribute position. We can't safely use the syntax `<div>Hello...{children}</div>` because `...` is so frequently used in written language, preceding an expression.

_Why not allow more features that JS allow in the object position?_

You could imagine the {} escaping to JS and allowing anything that you can put in an object literal. Such as `<div {get x() { }} />` or `<div {x} />`. The main reason we don't is because we want to separate the syntax that JSX allows and the semantics that it transforms to. For example, `...` could be valid even if attributes are passed as arrays instead of objects.

Besides, we don't really support getters widely and it wouldn't necessarily make sense to allow a getter to be defined inline. `<div {x} />` would be confusingly similar to `<div x />`. The first one transforms to `{ x: x }` while the second one transforms to `{ x: true }`. There's not much use for this feature beyond spreads.


## JSX spread attributes

Spread Attributes is a feature of [JSX](https://reactjs.org/docs/introducing-jsx.html).  
It's a syntax for providing an object's properties as JSX attributes.

Following the example from [Destructuring props](#destructuring-props),  
We can **spread** `restProps` over our `<div>`.

```jsx
function Greeting({ name, ...restProps }) {
  return <div {...restProps}>Hi {name}!</div>;
}
```

This makes `Greeting` super flexible.  
We can pass DOM attributes to `Greeting` and trust that they'll be passed through to `div`.

```jsx
<Greeting name="Fancy pants" className="fancy-greeting" id="user-greeting" />
```

Avoid forwarding non-DOM `props` to components.  
Destructuring assignment is popular because it gives you a way to separate component-specific props from DOM/platform-specific attributes.

```jsx
function Greeting({ name, ...platformProps }) {
  return <div {...platformProps}>Hi {name}!</div>;
}
```


Merge destructured props with other values
------------------------------------------
------------------------------------------

Components are abstractions.  
Good abstractions allow for extension.

Consider this component that uses a `class` attribute for style a `button`.

```jsx
function MyButton(props) {
  return <button className="btn" {...props} />;
}
```

This works great until we try to extend it with another class.

```jsx
<MyButton className="delete-btn">Delete...</MyButton>
```

In this case, `delete-btn` replaces `btn`.

Order matters for [JSX spread attributes](#jsx-spread-attributes).  
The `props.className` being spread is overriding the `className` in our component.

We can change the order but now the `className` will **never** be anything but `btn`.

```jsx
function MyButton(props) {
  return <button {...props} className="btn" />;
}
```

We need to use destructuring assignment to get the incoming `className` and merge with the base `className`.  
We can do this simply by adding all values to an array and joining them with a space.

```jsx
function MyButton({ className, ...props }) {
  let classNames = ["btn", className].join(" ");
  return <button className={classNames} {...props} />;
}
```

```jsx
function MyButton({ className = "", ...props }) {
  let classNames = ["btn", className].join(" ");

  return <button className={classNames} {...props} />;
}
```

Conditional rendering
---------------------
---------------------

You can't use if/else statements inside a component declarations.  
So [conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) and [short-circuit evaluation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Short-circuit_evaluation) are your friends.

### `if`

```jsx
{
  condition && <span>Rendered when `truthy`</span>;
}
```

### `unless`

```jsx
{
  condition || <span>Rendered when `falsy`</span>;
}
```

### `if-else`

```jsx
{
  condition ? (
    <span>Rendered when `truthy`</span>
  ) : (
    <span>Rendered when `falsy`</span>
  );
}
```

Children types
----------------
----------------

React can render `children` from most types.  
In most cases it's either an `array` or a `string`.

### `String`

```jsx
<div>Hello World!</div>
```

### `Array`

```jsx
<div>{["Hello ", <span>World</span>, "!"]}</div>
```

## Array as children

Providing an array as `children` is a very common.  
It's how lists are drawn in React.

We use `map()` to create an array of React Elements for every value in the array.

```jsx
<ul>
  {["first", "second"].map(item => (
    <li>{item}</li>
  ))}
</ul>
```

That's equivalent to providing a literal `array`.

```jsx
<ul>{[<li>first</li>, <li>second</li>]}</ul>
```

This pattern can be combined with destructuring, JSX Spread Attributes, and other components, for some serious terseness.

```jsx
<ul>
  {arrayOfMessageObjects.map(({ id, ...message }) => (
    <Message key={id} {...message} />
  ))}
</ul>

Style component
---------------
---------------

This is a [Proxy component](#proxy-component) applied to the practices of style.

Say we have a button. It uses classes to be styled as a "primary" button.

```jsx
<button type="button" className="btn btn-primary">
```

We can generate this output using a couple single-purpose components.

```jsx
import classnames from "classnames";

const PrimaryBtn = props => <Btn {...props} primary />;

const Btn = ({ className, primary, ...props }) => (
  <button
    type="button"
    className={classnames("btn", primary && "btn-primary", className)}
    {...props}
  />
);