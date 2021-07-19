---
date: 2020-03-08
title: 'Large scale angular app with @ngrx'
template: post
thumbnail: '../thumbnails/angular.png'
slug: angular-with-ng-rx-store
categories:
  - Popular
  - Angular
tags:
  - Angular
---

# Understanding a large scale angular app with @ngrx

A year ago I started working as a web developer at Trade Me. I found myself in a team working on a large scale, single page application that is built using Angular.

When building a large application that has lots of information coming from and going to the database as well as data that is shared across multiple components, things can easily get messy and complex. Our app has a lot going on in it and one of the challenges is figuring out how to manage data and maintain the UI state of the app.

To achieve this, our app uses @ngrx/store — a state management library for Angular applications inspired by Redux. By using this library we are able to keep the current state of the app in one place — the store. This enables us to use the store as *a single source of truth* meaning we can reliably access the state of the app from this one place rather than components of the app holding their own state and having to communicate and pass data between them. This reduces the communication between components which is particularly helpful to scale our app without adding more complexity.

Having the store on the client also allows us to use it as a local cache of data. Our app can render items instantly if they already exist in the stored state without having to resend an API request.

Using the Redux pattern also prevents the mutation of state in multiple locations in our app. Data is changed in one central location and flows one way from this location to the UI components. All the components in our application follow this pattern which helps us keep our app more predictable and easier to understand.

And as an added bonus, the Redux pattern helps us keep our components fairly simple which makes testing them straight forward.

## Using @ngrx/store in our app

If you look online, there are some good resources for learning about how to use @ngrx/store in an Angular application and lots of diagrams that are helpful to understanding the concept of state management. These often mention the store, actions and reducers. All which are key concepts to understand. However when first trying to work out what is going on in the code base of our app, it seems to have a bit more going on. Things like effects, selectors and things our team calls facades.

With lots of different files and lots of different names it has taken a while to understand how these all work together. The following is a guide to how these things fit into the structure of our app.

The basic structure of Redux looks like this:

![*The core principles of Redux. These include the component, the action, the reducer and the stored state.*](https://cdn-images-1.medium.com/max/2428/1*4zX66ZQ8e3VaS5gQFelTCQ.png)The core principles of Redux. These include the component, the action, the reducer and the stored state.

The component is what the user can interact with. For example, a search input box the user can fill out and submit via a clickable button. When the button is clicked we dispatch an action to the store.

The action describes the change in state that is to be made.

This action is sent to the reducer which is a pure function — it takes the data from the action and the current state and generates the new state from it. Each reducer is specific to only a small part of the state.

For example, the state might look like:

    search: {
        search: oldSearchResults
    },
    listings: { 
        listing: […]
    },
    otherThings: {
        things: otherData
    }

A new search action is dispatched and the reducer takes the previous search state and updates it to the new state with the latest search info. In this example this is done by the search reducer which is specifically in charge of updating the search part of the stored state with the new data.

The stored state would now look like:

    search: {
        search: newSearchResults
    },
    listings: { 
        listing: […]
    },
    otherThings: {
        things: otherData
    }

Once the store is updated with the new state from the reducer, we can then update the components with this new state.

But how does the component know when the state has changed and always stay updated with the most current state?

In our app we make use of selectors called with the store’s select method.

The store’s select method* *knows how to fetch the current state and it sets up a subscription to the state changes using observables which allows the component to stay up to date with the latest changes in the store. A selector describes what specifically needs to be fetched from the store. A selector can be set up to describe single slices of the state or can group together different slices of the state to get the information that an individual component needs.

![*A selector describes what specifically needs to be fetched from the store and the select method knows how to fetch it.*](https://cdn-images-1.medium.com/max/3056/1*7O3FNgBVTRRDeZjDtQ-Otw.png)A selector describes what specifically needs to be fetched from the store and the select method knows how to fetch it.

When an action is dispatched it goes into an action queue. Often there is more than one action in the queue and the actions flow through in sequence.

The above diagram gives a basic overview of the way the store works in our app internally. However, when our app needs to interact with the real world i.e. network, time, browser storage, API requests… basically everything that is asynchronous and outside our app, we use effects. An effect is triggered by an action, does some processing on the side and then emits one or more actions to be added to the action queue which are then again processed by the reducers.

![*An effect can catch an action, do some processing and then emit another one or more actions.*](https://cdn-images-1.medium.com/max/2436/1*HLZRojLLZPGw7TP304-JJQ.png)An effect can catch an action, do some processing and then emit another one or more actions.

For example, the GetSearchResultsAction is caught inside the getSearchResults effect. This effect checks to see if the search results are already in the store. If not, a new GetSearchResultsFromApiAction is dispatched. This action is caught in another effect that makes a request through the API Service to the API. When data is retrieved from the API the response is sent back to the store via a different action, i.e. GetSearchResultsFromApiSuccessAction. The reducer takes the data from the action along with the old state to then update the stored state with the new data.

![*A facade is used to abstract away the store pattern from the components.*](https://cdn-images-1.medium.com/max/2466/1*rkfbyP4jD0zz6PS_yo45Uw.png)A facade is used to abstract away the store pattern from the components.

Another concept that we use in our app is a thing called a facade. The facade is our way to abstract away the store pattern from the components. The components don’t need to know anything about Redux with its actions and selectors. They can just call methods on the facade to either trigger a change or register for updates.

For example, the search facade has a method to get all search results. This method internally calls the store select method with the correct selector and subscribes to changes from the store. The component gets an observable of search results from the facade but does not need to know where exactly the data comes from and how the Redux mechanisms work. This way we can centralize logic in the facades and leave our components rather dumb and simple which makes it very straightforward to test them.*

Using the @ngrx/store to maintain and manage the state of our application means that we do not duplicate information we already have and we reduce the amount of unnecessary calls to the API. Having all the state in one place also means that we can share data between components and don’t have to worry about the complexity of cross-component communication.

Ngrx/effects is a great tool! But consider these questions before using it:
* Is this really a side effect?
* Is ngrx/effects really the best way to handle this?
