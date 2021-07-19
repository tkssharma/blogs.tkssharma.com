---
date: 2020-01-11
title: 'React Design patterns (Props-Renderer, Compound Component & Context)-Part 1'
template: post
thumbnail: '../thumbnails/react.png'
slug: react-design-pattern
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

Using these Patterns I am able to design components that are completely reusable, and have the flexibility to use these components in a number of different contexts.

```javascript
import React, { Component } from 'react';
import Design from "./Design"

class App extends Component {
  render() {
    return (
        <Design loading={1}/>
    );
  }
}

export default App;
```

As you can see, the Design component’s flexibility ends at the loading prop; we are only able to change the stage to where it starts.
- What if I need to position the progress block on the right hand side?
- What if I need a similar Design with extra props?
- What if I need to change the content of the props?
- What if I wanted to change the order of the props?

the only way I could I achieve these changes is by completely re-writing the component. Re-writing it in the same fashion would yield a similar outcome
Here is how our design Component Looks like 
```javascript
class Design extends Component {
  state = {
    loading: this.props.loading
  }
  static defaultProps = {
    loading: false
  }
  handleClick = () => {
    this.setState({ loading: this.state.loding })
  }
  render() {
    const { loading } = this.state;
    return (
      <div style={styles.container}>
	        <Progress stage={stage}/>
	        <ShowProgress handleClick={this.handleClick} loading={loading}/>
      </div>
    );
  }
}

export default Design ;
```
Currently, we are explicitly placing the ‘Progress’ and ShowProgress components directly inside the Design component. To alleviate this static approach we can use the props object to dynamically inject the child components.

Using this alternative approach, we can instead use the props.children object inside the Design.js file and place the ‘Progress’ and ShowProgress components inside the Design component.

There is one major problem with this approach, however. The ‘Progress’ and ‘Steps’ components no longer have access to the ‘stage’ and ‘handleClick’ props. In order for each child component to receive the props they need, we need to manually loop through the each child and inject the props inside them. 

```javascript
const children = React.Children.map(this.props.children, child => {
			return React.cloneElement(child, {loading, handleClick: this.handleClick})
		})
```

Now our design Component will look differentbut will be doing same as it was doing
```javascript 
// Render method of Design.js
const { stage } = this.state;
const children = React.Children.map(this.props.children, child => {
	return React.cloneElement(child, {loading, handleClick: this.handleClick})
})
return (
	<div style={styles.container}>
		{children}
	</div>
);
```

Now we can add the ‘Progress’ and ShowProgress as children to the Design component and everything works the same as before. This time we can decide the position of each component, or if we want to be really crazy, we could have a progress block on both sides.

```javascript
class App extends Component {
  render() {
    return (
      <div>
        <Design loading={1}>
          <Progress />
          <ShowProgress />
        </Design>
      </div>
    );
  }
}
```

Renderer Props
--------------

The term “render prop” refers to a technique for sharing code between React components using a prop whose value is a function. A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

A render prop is a function prop that a component uses to know what to render.
More generally speaking, the idea is this: instead of “mixing in” or decorating a component to share behavior, just render a regular component with a function prop that it can use to share some state with you.
Lets understand it using example 

Render props means that you pass a render function defined by a separate component’s props to indicate what should be returned by the shared component. At its root level, it must take the form:

```javascript
import React from 'react';

const SharedComponent extends React.Component {
  render() {
    return (
      <div>
        {this.props.render()}
      </div>
    );
  }
}

export default SharedComponent;

```
Here is the other component which is passing render as props and telling the SharedComponent what to render.
```javascript
import React from 'react';
import SharedComponent from 'components/SharedComponent';

const SayHello = () => (
  <SharedComponent render={() => (
    <span>hello!</span>
  )} />
);

```

It’s also worth noting that the name of the prop does not need to be render. All that is important is that it returns a React element. For example, we could rename the prop above to be wrapThisThingInADiv, and it would still function the exact same.

```javascript
import React from 'react';

class SharedComponentWithGoofyName extends React.Component {
  render() {
    return (
      <div>
        {this.props.wrapThisThingInADiv()}
      </div>
    );
  }
}

const SayHelloWithGoofyName = () => (
  <SharedComponentWithGoofyName wrapThisThingInADiv={() => (
    <span>hello!</span>
  )} />
);
```

Another simple example 

```javascript
class Wrapper extends Component {
  state = {
    count: 0
  };

  // Increase count
  increment = () => {
    const { count } = this.state;
    return this.setState({ count: count + 1 });
  };

  // Decrease count
  decrement = () => {
    const { count } = this.state;
    return this.setState({ count: count - 1 });
  };

  render() {
    const { count } = this.state;

    return (
      <div>
        {this.props.renderMe({
          increment: this.increment,
          decrement: this.decrement,
          count: count
        })}
      </div>
    );
  }
}
```
In the Wrapper component, we specify the methods and state what gets exposed to the wrapped component. For this example, we need the increment and decrement methods. We have our default count set as 0. The logic is to either increment or decrement count depending on the method that is triggered, starting with a zero value.

If you take a look at the returnMe() method, you’ll see that we are making use of this.props.renderMe(). It is through this function that we pass methods and state from the Wrapper component so that the component that is being wrapped by it will make use of it.

```javascript
class App extends React.Component {
  render() {
    return (
      <Wrapper
        renderMe={({ increment, decrement, count }) => (
          <div>
            <div>
              <h3>Render Props Counter</h3>
            </div>
            <div>
              <p>{count}</p>
              <button onClick={() => increment()}>Increment</button>
              <button onClick={() => decrement()}>Decrement</button>
            </div>
          </div>
        )}
      />
    );
  }
}
```





