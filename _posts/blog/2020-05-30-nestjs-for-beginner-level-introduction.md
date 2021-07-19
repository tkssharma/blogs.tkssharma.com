---
date: 2020-04-30
title: 'Learning NestJS as a beginner Developer'
template: post
featured:  '../thumbnails/nestjs.png'
thumbnail: '../thumbnails/nestjs.png'
slug: Learning-nestjs-as-beginner-developer
categories:
  - Popular
tags:
  - typescript
  - javascript
  - NestJS
---



# Step up your game, start using Nest!

Nest — one of the best things that happened to server-side JavaScript development
JavaScript rules the world! With the rise of Node.Js JavaScript can be used outside the browser and has become the language of everything.

This evolution raised different Node.js frameworks to develop server-side JavaScript applications. Express, Hapi or Meteor JS are just some amongst them.

Lately, a new kid arrived on the block. NestJS!

## NestJS 🦁

NestJS is a fully-featured open-source NodeJS framework that enables us to create compelling and demanding backend systems. It is currently the fastest raising NodeJS framework written in Typescript.

Nest enables us to write highly testable, scalable, loosely coupled, and easily maintainable applications. To do so, it uses express under the hood. It acts as another layer on top and makes a lot of things easier for us.
### Nest brings scalable Node.js servers to a whole new level

Let’s have a more detailed look at some of the reasons that make Nest so great and why you should consider to write your next backend project in NestJS.

## Perfect for Angular developers! 💯 🤩

Nest is an excellent framework for all kind of developers. But if you are an Angular developer, chances are very high that you’re going to like Nest.

Angular deeply inspires NestJS, and it’s concepts. Therefore for Angular developers, it is almost a no-brainer getting familiar with the core concepts of Nest.
### Angular developers quickly find themselves home in Nest. Similar concepts, structure and naming conventions.

Coding in Nest nearly feels like coding Angular in the backend. Besides the concepts, it also works excellent with Angular Universal.

In any case, it makes sense to consider NestJS as a framework for your backend applications if you are an Angular developer its almost a must because the learning curve is so shallow.

## Nest apps are written in Typescript

NestJS applications are written in Typescript.

Typescript is a typed superset of Javascript that supports us during runtime and compile time.

It empowers us with the flexibility of Javascript and the robustness of a typed language. This robustness is especially useful for larger applications. You could also think of Typescript as Javascript that scales.

The optional typing system empowers tooling, better IntelliSense, refactoring, and better overall development experience. Typescript also gives us access to the latest features that haven’t made it yet to Javascript.

Creating scalable applications is one of the main focuses of NestJS. Therefore it is evident for Nest to benefit from TypeScript.

## Architecture — Inspired by Angular 🏠

Software projects are usually not written by one person but by a team. A group of developers with different ideas and different opinions who all work on the same codebase.

For each team, it’s essential to have a common understanding of how code should be written and organized. Those guidelines ensure that we don’t just code in our preferred style but in a consistent manner that everybody on the team can understand.

![](https://cdn-images-1.medium.com/max/2000/1*JB2MqH7cFbMnQ2ITxqXaIg.png)

Most server-side JavaScript frameworks do not deal with architecture. They offer you a lot of flexibility on how to do and organize things. Therefore, in my experience at least, it requires a lot of arrangement to have clear ways and guidelines on how to write things.

That’s where NestJS widely differs from the other NodeJS frameworks. While other frameworks don’t offer too many architectonical concepts out of the box, NestJS provides us with an opinionated project setup. It was one of the main reasons it was built. **To solve architecture!**

Since Nest is inspired by Angular, it also uses the main building blocks that we encounter in Angular. Let’s have a look at the most important ones.

### Modules 📦

Modules are the basic building blocks of every Nest application. Each Nest application contains at least one module, the Appmodule.

Technically an application could be written with only one module. This is not recommended as it doesn’t make sense once your application starts to grow. The main reasons for a module is to group related features as components, services, and controllers together.

So almost every feature should be grouped inside its module. Let’s say we would have a UsersModule that contains a REST endpoint and some business logic. A sample module could look like the following.

![](https://cdn-images-1.medium.com/max/2720/1*X0lLA0Y884pGcgq9A93IqA.png)

Our module declares everything that is needed for the User feature. In this case, UserController and a UserService.

### Services

Nest uses Services to encapsulate business logic. The reasons for services is just decoupling and to keep your controllers slim.

Technically services are just regular classes with an Injectable annotation (more on that later).

![](https://cdn-images-1.medium.com/max/2720/1*_JaVZxJB0QqFIGI820s5Aw.png)

This sample Service returns a user. In real life, such a service could contain some logic to decide what kind of user it needs to load from a database.

### Controllers 🎮 ❤️

Nests controllers are just awesome!

REST is one of the main design principles for modern APIs. It offers us a standard way to create an interface to the outside world which can be used by our client applications to communicate with our server.

Nest uses controllers in combination with annotations. The @Controller annotation indicates that this class acts as a controller. Furthermore, you can pass it a path that represents the primary path for this controller.

Each method can then be decorated with an HTTP verb and a path. The path is then specific to the function. The most common decorators are @Get, @Post, @Put, and @Delete.

This approach reminds me of the way the [Spring framework](https://spring.io/), which is very popular to Java developers, is using to handle REST endpoints.

![](https://cdn-images-1.medium.com/max/2720/1*pyeKeKLYbImUO-C73XmATg.png)

But not only the controller syntax is terrific. Nest provides us with Open API support in the form of Swagger. Swagger can easily be integrated into our backend and makes the API transparent to front end developers.

We only need to install the swagger package (@nestjs/swagger) and add a few lines to our main.ts.

![](https://cdn-images-1.medium.com/max/2244/1*Bv9RKFjAGJGxAcHglcx16g.png)

In our main.ts we specified that the API doc is available under /api. So if we open up a browser and navigate to http://localhost:3000/api we get the following API doc.

![](https://cdn-images-1.medium.com/max/6676/1*cssh7eJB3S7p96kHNEu0eQ.png)

The Swagger page allows us to gain details about the REST endpoint and to fire a sample request.

### File names and folder structure

Those core abstractions are also reflected in the file names and folder structure. Grouping modules in their own folder and using the appropriate file endings( .controller, .module, .service) gives us a readable and easy understandable structure.

![](https://cdn-images-1.medium.com/max/4040/1*b2DnPX5osVsq5vuxl-KmMA.png)

## Nest CLI 🏗️

Similar to Angular, NestJS offers a command line interface (CLI). The CLI can either be used to set up a project or for automatic project file generation.

To get started we install the CLI globally.

    npm install -g @nestjs/cli

Once installed, the CLI can be used to generate a new project.

    nest new awesome-nest

Nest offers us a bunch of different architecture components that can be generated by the CLI.

![](https://cdn-images-1.medium.com/max/2000/1*w1NACwNhHdX6312oiVzdpg.jpeg)

Using the CLI increases our productivity. Files and their according .spec file get generated automatically. Furthermore, the CLI also adds a service or component to the providers or controllers entry of the corresponding module.

## Dependency Injection 💉

Dependency Injection is a significant design pattern. It decouples the usage of an object from its creation and makes a class independent of its dependencies.

Nest comes with its own dependency injection. Again it resembles Angulars dependency injection. Let’s have a look at how it is used.

First, every class that can be injected needs to declare the @Injectable annotation.

![](https://cdn-images-1.medium.com/max/2720/1*XVozHJ9oRC3GOGaKq3iaAw.png)

This class can then be provided inside the module.

![](https://cdn-images-1.medium.com/max/2720/1*X0lLA0Y884pGcgq9A93IqA.png)

Finally, we can then use the constructor injection to get hold of the service instance inside our Controller.

![](https://cdn-images-1.medium.com/max/2720/1*pyeKeKLYbImUO-C73XmATg.png)
> # [Click here](https://twitter.com/home?status=https%3A//medium.com/%40kevinkreuzer/step-up-your-game-start-using-nest-36674f732565) to tweet about this article 🐥

## Testing

Good tests are crucial to the long term success of every application. They point out the defects and errors we made during development. They indicate that new features work and ensure that they still work after a refactoring. They are just essential for every software.

There are different types of tests. Unit tests, integration tests and end to end tests. Nest provides us with a setup for all kind of tests.

### Unit testing

Unit Testing is the art of testing functions. Unit tests are used to ensure that the smallest entities in your application do what they are supposed to do.

Nest uses Jest as a testing framework. The cool thing about Jest is that it provides a test runner, assert functions and testing utilities for mocking and spying.

By using the CLI Nest already generates the required test setup. When generating a service or a controller it also creates us a test skeleton which we can then extend with our test implementation.

![](https://cdn-images-1.medium.com/max/2720/1*b9Ev_ZXz5EkafR3-8lByDg.png)

### Testing utilities ⛏️

To boost and facilitate the testing process nest provides a testing package.

This testing package allows us to create a TestingModule. This testing module is used during tests instead of the real module. By using the testing module, we can easily mock services.

We can provide mocks instead of a real implementation. In the following example, we are just providing a UserServiceMock instead of the real UserService.

The mock then returns a mocked user which we then can assert with the returned user.

![](https://cdn-images-1.medium.com/max/2376/1*OactsIKVC-F_AXvj3eQ4SQ.png)

### End to end testing

Unlike Unit tests, end to end tests do not only test one function. They examine the whole functionality of one API endpoint.

Again, Nest has us covered. It provides a nice solution for end to end testing. Thereby it uses the same configuration as for unit testing in addition to a library called Supertest. Supertest is used to simulate HTTP requests.

![](https://cdn-images-1.medium.com/max/2720/1*X6GtyNK8LLkUs8ffhsLdfA.png)

## Fully-fledged framework 💪

The concepts and benefits I described above are only an excerpt of Nest’s feature catalog. Nest supports a variety of technologies and techniques to fulfill all sort of requirements.

Nest is built in a modular fashion. Nest has a lot of additional packages which can be included as soon as we need them. Based on your need you can use a provided Nest module to equip your application with new functionality.

All of those additional functionalities are very well described in the [official Nest documentation](https://docs.nestjs.com/). To get an overview I tried to summarize them in the following picture.

![](https://cdn-images-1.medium.com/max/4884/1*8pSNPzLWrbRodAW3JvC5OA.png)

## Conclusion 👨‍🏫

Nest is an excellent framework, and I love working with it. In my opinion, it is even one of the best things that happened to server-side JavaScript development

Examples to explore More 
https://github.com/NarHakobyan/awesome-nest-boilerplate