---
date: 2020-03-12
title: 'Using ngRx/Store with WebSockets | Angular Application-Part-2'
template: post
thumbnail: '../thumbnails/angular.png'
slug: using-ngrx-store-with-web-sockets-angular-application-Part-2
categories:
  - Popular
  - Angular
tags:
  - Angular
---

The objective of this article is to provide a clean and clear introduction to [ngrx](https://github.com/ngrx/platform). In order to accomplish this, I am going to explain the things you need to know and understand about ngrx and then we are going to see it in action with some simple and understandable code examples.

Finally, I am going to provide the link to the GitHub repo containing the examples so you can play around with the code.

This is the list of topics that we are going to discuss in this article:

* What is ngrx

* Benefits of using ngrx

* Cons of using ngrx

* When to use ngrx

* Actions, Reducers, Selectors, Store, and Effects

* NGRX example

## What is NGRX

NGRX is a group of libraries “inspired” by the Redux pattern which in turn is “inspired” by the Flux pattern. Being a little more concise, this means that redux pattern is a simplified version of the Flux pattern and NGRX is an angular/rxjs version of the redux pattern.
> What do I mean with “angular/rxjs” version of redux… The “angular” part is because ngrx is a library to use within an angular application. The “rxjs” part is because the implementation of ngrx works around a [rxjs](https://rxjs-dev.firebaseapp.com/guide/overview) flow. This means that it works using observables and the different observable operators provided by “rxjs”.

The main purpose of this pattern is to provide a predictable state container, based on three main principles.

Let’s go through the three principles of the Redux pattern and point out the most important benefits they provide.

### Single source of truth

In the case of a redux/ngrx architecture, this means that the state of your whole application is stored in an object tree within a single store.
> Within a single store? We are going to talk later about stores, but in a general definition, they have the responsibility of holding the state and applying changes to it when they are told to do so (when an action is dispatched, we are also going to talk about them later).

The benefits of having a single source of truth are [plenty](https://redux.js.org/introduction/threeprinciples), but for me, the most interesting one (because is the one that is going to impact on any angular app) is the following:

* When you are building an Angular app usually you have the state split and handled in multiple services. As your app growth keeping track of your state changes starts to get messy and hard to debug and maintain. Having a single source of truth resolves this problem since the state is handled only in one object and in one place, so debugging or adding changes becomes way easier.

### State is read-only

You are never going to change the state directly instead you are going to dispatch actions. These actions describe what’s happening (can be things like getting, adding, removing, updating the state).

Dispatch an action?… We are going to talk about actions later but for a general point of view, they are identifiers of an operation on your application and they can be triggered (or dispatched) to tell the application to execute the operation that the action represents.

By avoiding to update the state from different places and having a centralized place to make changes, that responds to specific actions, you get a lot of benefits. Just to mention the most important ones:

* You know that any change to the state is going to happen only in one place. This has a great impact on debugging and testing.

* You know that if a certain action is dispatched the operation in the state is always the same. Again this impacts directly in debugging and testing.

### Changes are made with pure functions

The operation triggered by dispatching an action is going to be a pure function called, within the redux architecture, reducers.

These reducers (remember that they are just pure functions) receive an action and the state, depending on the action dispatched (usually with a switch statement) they execute an operation and return a new state object.

 State in a redux app is immutable! So when a reducer changes something in the state, it returns a new state object.

The benefits of using pure functions are well known, like the fact that they are immediately testable if you pass the same arguments you are going to get the same result.

This approach also allows us to navigate between different instances of our state using Redux/ngrx dev tools and see what changed between instances and who change it, among other things. So using pure functions and returning new instances of the state has also a great impact on debugging.

But the main benefit, in my opinion, is that by binding all our components *inputs* to state properties we can change the change detection strategy to on push, and this is going to be a boost on performance for the application.

## Great… so what are the benefits of using NGRX

We have already mentioned most of them out while talking about the redux pattern principles. But let’s point out the most important benefits of using the redux pattern in an application (in my opinion):

* Since we have a single source of truth and you can’t directly change the state, applications are going to behave more consistently.

* Using the redux pattern gives us a lot of cool features to make debugging easier.

* Applications become easier to test since we are introducing pure functions to handle changes in the state and also because both, ngrx and rxjs, have a lot’s great features for testing.

* As soon as you feel comfortable with using ngrx, understanding the flow of data in your applications becomes incredibly easy and predictable.

## … and the cons are

* NGRX has, of course, a learning curve. It is not a big one, but not that small either, and I think it requires some experience or deep understanding of some program patters. Any mid-seniority dev should be ok but for a junior might be a little confusing at first.

* For me, it feels a little verbose. So every time you add some property to the state, you need to add the actions, the dispatchers, you may need to update or add the selectors, the effects if any, update the store. And also you start piping (concatenating) rxjs operators and observables all over the place.

* NGRX is not part of the angular core libraries and is not supported by Google, at least not directly because there are ngrx contributors that are part of the Angular team. Just something to consider since you are adding a library that is going to be a big dependency for your app.

## When to use NGRX

So, in a general opinion ngrx should be used in medium/big projects were managing the state starts to become hard to maintain and overwhelming. Some other people, more fanatic of the pattern is going to say something like “if you have a state you have NGRX”.

I do agree that it should be considered to be used in medium or big projects when you have a considerable state and a bunch of components using this state but you have to consider that Angular by itself provides plenty of solutions for managing the state and if you have a strong front-end angular team, then maybe you don’t need to bother about ngrx.

That being said I consider that a strong Angular team may also decide to include ngrx to the solution because they know all the power of the redux pattern and also the power added by rxjs operators, and they feel comfortable working with both…

 If you were expecting a simple answer to decide when to use ngrx, you are not going to obtain it, and don’t trust anyone giving you this answer from outside your organization or team. The decision depends on studying the pros and cons, understanding your team and considering their opinion.

## NGRX Actions, Reducers, Selectors, Store, and Effects

These are the core building units of the ngrx flow. Each of them takes care of a part of the process of starting an operation to changing our state and retrieving data.

![](https://cdn-images-1.medium.com/max/2000/1*wO1_IJX7dZgwjlouDyL3Ng.png)

In the image, we can see the ngrx flow. Let’s explain it…

1. In the most common scenario, everything starts in the component view. Some interactions made by a user may cause the component to dispatch an action.
> Actions…
> In the store object, you have a function to dispatch (trigger) actions. Actions are classes that implemenets the NGRX Action interface. These Action classes have two properties (let's take as an example an action class called GetUserName):
> type: it’s a read only string describing what the action stand for. For example: ‘[User] Get User Name’
> payload: the type of this property depends on what type of data this action needs to send to the reducer. In the case of the previous example, is going to be a string containing the user name. Not all actions needs a payload.

2.1. If this action doesn't trigger an effect then a reducer is going to analyze the action (usually using a switch statement) and return a new state that’s is going to be the result of merging the old state with the value that changed by calling the action.
> Reducers…
> Reducers are pure functions accepting two arguments, the previous state and an Action. When an Action is dispatched ngrx goes through all the reducers passing as arguments the previous state and the Action, in the order that the reducers where created, until it finds a case for that action.

2.2. If an effect gets triggered by dispatching an action is because some side effects are going to happen before calling the reducer. This can probably be something like calling an HTTP service to get data.
> Effects…
> Effects, on the ngrx libraries ecosystem, allow us to deal with side-effects caused from dispatching an action outside angular components or the ngrx store.
> The Effects listen if any action is dispatched, then, similar to what reducers do, it checks if the action is one of the actions type it has a case for.
Then is going to perform a side-effect, usually getting or sending data to an API.
Finally is going to emit another action, usually, an action referring to the result-state of the side effect (success, error, etc), then a reducer is going to enter in the scene as we already mention in the ngrx flow.

2.2.1. After the effect is done (side effects are finished) a new “state-result” action gets fired by the effect (it can be that the side effects succeeded or failed), and we are back to point 2.1.

3. Now the Store has a new state. The state can be a big object tree, so ngrx introduces selectors to be able to use only the slices of the object that we need in a specific component.
> Selectors…
> As we mentioned before the state tree can become quite a big object, it doesn’t make sense to have all that object on places where we only need part of it.
> NGRX store provides us the function “select” to obtain slices of our store. But what if we need to apply some logic to that slice before using the data in the components.
> There is where selectors take action. They allow us to decouple any state slice data transformation from the components. The store “select” function accepts an an argument a pure function, this pure function is our selector.
> Store…
> A store is an object (an instance of the ngrx Store class) that brings the things we mentioned before (Actions, Reducers, Selectors) together. For example, when an action is dispatched (using the store object dispatch function), the store is the one finding and executing the appropriate reducer.
> It is also the one holding the application state.

## NGRX example

Great… so we are done with the what, the why, the when and introducing the flow and actors of ngrx, now is time to see it in action. This could easily be another article, but in my head, it makes no sense to explain all of the things we have explained without a code example where we can see everything in action and that you can download in order to play around with it.

Our example is going to have a list of users, the user detail page and some initial configuration information that you need to get when the app starts. We are going to be able to implement some important ngrx flows.

These are the things that we are going to do:

* Installation of the library

* Folder structure for the store

* Create State and initial values

* Create Actions

* Create Reducers

* Create Effects

* Create Selectors

* Setting everything up

* Using the store in some components

So let’s do it…

### Installation of the library

We are going to use angular cli to create the project, and then we are going to add the ngrx libraries.

Let’s create a project:

    ng new angular-ngrx --style=scss

Let’s add the ngrx libraries that we are going to use:

    npm install @ngrx/core @ngrx/store @ngrx/effects @ngrx/store-devtools @ngrx/router-store --save

We are installing almost all the libraries of the ngrx ecosystem. Most of them are quite clear about their purpose like core, store, effects, but there are a couple that you may wonder what they are for.

* store-devtools. Some powerful tooling for debugging.

* router-store. Keeps the state of the angular router in the store.

Basic setup is done, Now we can add folder straucture based on modules and can setup store, reducer, actions for our application.


