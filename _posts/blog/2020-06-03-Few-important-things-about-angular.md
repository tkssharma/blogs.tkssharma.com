---
date: 2020-05-03
title: 'How to become master of Angular Architecture'
template: post
featured:  '../thumbnails/angular.png'
thumbnail: '../thumbnails/angular.png'
slug: How-to-become-master-of-Angular-Architecture
categories:
  - Popular
tags:
  - typescript
  - javascript
  - angular
---

# 6 Concepts to Master to be an Angular Architect

Six concepts every Angular developer should explore in-depth in order to master Angular and design well-architected applications.


Angular is one of the biggest frameworks around: it provides a lot of features out-of-the-box, which means there are quite a few concepts to be able to master if from top to bottom.

There are six specific concepts I think every Angular developer should explore in-depth in order to master Angular and be able to be proficient with writing well-architected applications.

## 1) Module/Library Architecture

Angular’s Module architecture is a bit unique, and probably one of the hardest parts to fully grasp for beginners.

The most confusing concept about it is that we’re already using a module architecture on top of it: of course, I’m talking about ES imports.

Because Angular Modules add an additional layer of logical grouping, it’s important to keep them as much related as possible.

But knowing how to separate and split your app’s functionality in well-defined modules is a fundamental part of architecting Angular apps.

### Different Types of Angular Modules

There are different types of Angular Modules you should be aware of:

* Declarations/Widget Module (example: a module that is a collection of UI Components, Directives and Pipes)

* Services Module (example: HttpClientModule)

* Routing Module

* Domain/Feature Module

* Core/Shared Module

I wrote in details about each type in the article below:
[Understanding Angular Modules

*A quick but comprehensive guide for understanding the different types of Angular Modules*itnext.io](https://itnext.io/understanding-angular-modules-5f1215130bc8)

### Library or Module?

I would argue that we can bring this distinction at the library-level: a library with only services, a library that represents a route, and so on.

But whether you’re writing a module or a library depends a lot on your project type, and whether you are using a monorepo or a multi-repo project

### Questions to ask yourself before writing a module

Before writing a module, there are a few questions to ask yourself:

* What sort of module am I writing? If you can’t answer this question, you should familiarize yourself with the different types of modules I listed above.
It’s highly likely you’ll need one or two types of modules, so the answer may very well be two modules: Routing and Service

* Should this module be its own library or should it be simply a module? This is a little bit harder to answer: if you’re using a monorepo, my opinion is that building libraries would be a better option in the long run

## 2) Separation of Concerns between Components, Services, and Directives

Separating concerns is simple in theory, and yet harder than it seems. We’ve been taught since the Angular.js days to keep components “lean” and services “fat”, and fundamentally there hasn’t been a substantial difference in the newest versions.

It is still important to understand what exactly belongs into *Components* and what belongs into *Services*, and why *Directives* may just be an incredibly underrated feature.

### State

Placing state is a matter of understanding whether the data is accessed and shared outside of a component or whether it is local and encapsulated.

* If the state is shared between components, or it needs to be accessed from services, then place your state in a service. It doesn't really matter what State Management tool you use in this case as long as it is in a service

* If the state is local (ex. a form) and only used within a component, then simply store it in a component

### DOM Manipulation

Most DOM Manipulation should probably happen within Directives. Let’s assume you’re adding a *Drag and Drop* functionality to one of your components.

Sure, you can create a component and bind events from there, but at that point, you’re mixing two things:

* how the component looks

* how a certain component’s feature behaves

Directives are the ultimate reusability feature in Angular and I see them underused in almost every project I have worked on. Directives can be used to take off lots of responsibility from Components.

Exercise: find the largest component in your current project in terms of LOC. Does it use *Renderer* or *ElementRef*? That logic could probably be off-loaded to a directive.

## 3) Change Detection and Rendering

Angular is a fairly magic framework when it comes to re-rendering the UI.

It’s a different matter, though, optimizing it to only re-render when it should: it takes a bit of in-depth knowledge and intuition.

As an Angular Architect, you should probably know: *OnPush* Change detection is the way to go to optimize performance. But things will not always work as you expect, especially when you’re not using Observables and the async pipe within your templates.

### Mastering Change Detection

In order to master change detection, it’s important to start with the following:

* Treat all your data as immutable; using Rx-Powered State Management libraries helps a lot with this

* Use only (or mostly) *Observables* to display data in your templates. If you’re using local state, use a *BehaviorSubject*

Mastering change detection is a mandatory step towards building extremely performant apps:

* not only you need to make sure to update when needed, but you also need to make sure to update only when needed

### Breaking through Angular’s speed limits

Reducing re-renders is one of the secrets to keeping an application fast and efficient. Sometimes, though, you may want to exceed limits for performance-critical apps: games, high-frequency updates, large and complex lists, etc.

Do you need to break through Angular’s speed limits? Well, you can do that too: remove Zone and surgically update your UI thanks to Ivy’s latest features.

I describe how in the article below:
[Quantum Angular: Maximizing Performance by Removing Zone
*Experiment: removing Zone from Angular with minimal effort, to boost runtime performance.*blog.bitsrc.i](https://blog.bitsrc.io/quantum-angular-maximizing-performance-by-removing-zone-e0eefe85b8d8)

## 4) Routing

Routing not only allows us to organize our SPA into multiple virtual pages but also to load the application’s bundles on-demand thanks to Angular’s Routing lazy-loading features.

If you’re working on a large application and your bundles exceed 1MB, you may know why this is so important. Seriously, no one wants to download that amount of data to interact with your application.

Routing should not only be used to split top-level routing, but also to drive smaller and deeper parts of your UI.

This allows you to split your bundles’ content into primary routes, but also smaller parts of the application that don’t need to be downloaded on your user’s devices until they’re requested.

### Example: A tabbed component

For example, let’s assume you’re building a tabbed user interface, and that each tab is independent of each other: this is an ideal situation to split each tab into its own route and use lazy-loading to only load the selected tab’s content.

Another example? Popups and Modals! There is absolutely no need to load them along with your initial bundle. If the user hasn’t requested them, then only load them when they’re needed.

In case you need inspiration, [Angular Material’s Tabs Component supports this pattern](https://material.angular.io/components/tabs/overview#tabs-and-navigation).

## 5) Forms

Most CRUD applications are basically made up of lots of forms. It’s highly likely that you may be spending a lot of time writing forms, and that’s why it’s so important to learn Angular Forms well.

Most of your forms should probably be using the *ReactiveFormsModule* module, and do please ditch two-way data binding with *ngModel *unless you have one simple control.

The Angular Forms API is fairly easy to understand, and mastering it is mostly a matter of really studying the documentation and knowing its pitfalls.

The main pitfall to be aware of when working with the Forms is that it is basically untyped. It’s probably the most annoying part of an otherwise really great feature — so you’ll have to be very diligent to make sure your forms are adhering to your data structure's types.

## 6) RxJS

Last but not least, the infamous *RxJS*.

I am convinced that one of Angular’s most powerful features is its deep integration with Rx and Functional Reactive Programming.

To really master Angular and unlock a great architecture, you need to first learn Rx and at least its most important operators. It’s hard to be a fully proficient Angular Developer without having spent quite a few hours understanding Rx.

There are mostly two reasons why learning Rx will benefit while writing Angular apps: Performance and Asynchronous Processing.

Asynchronous Processing is particularly hard in modern, highly interactive apps: forget *Promise*, *setTimeout* and *setInterval *and start doing things the Rx-way.

Another big reason to master Rx is optimizing performance: sure, using the Async pipe is a start, but sometimes it’s not enough. You can control re-renders by only allowing through the pipeline the events that need to be re-rendered.

Rx offers a variety of operators that help with caching and batching, and as a result to optimize the performance of your application:

Read my article below for a list of operators and techniques using Rx:
[RxJS Patterns: Efficiency and Performance
*A rundown of RxJS operators and techniques you can leverage to avoid needless computation and make your code snappier…*blog.bitsrc.io](https://blog.bitsrc.io/rxjs-patterns-efficiency-and-performance-10bbf272c3fc)

## Final Words

This was a short list of all the topics you need to study in-depth in order to become a highly proficient Angular developer, or to graduate to be an Architect.

There’s a lot more to this, but at the end of the day, let’s not forget that to really master anything web-related, you need to first master the basics: Javascript, CSS, Design Patterns, Clean Code, Web Tooling, etc.

If you need any clarifications, or if you think something is unclear or wrong, do please leave a comment!