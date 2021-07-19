---
date: 2020-06-04
title: 'Lazy loading and code splitting in Vue.js'
template: post
featured:  '../thumbnails/vue.png'
thumbnail: '../thumbnails/vue.png'
slug: lazyloading-and-code-spitting-vuejs
categories:
  - Popular
tags:
  - vuejs
  - mysql
  - vuex
  - lazy-loading
---

# Lazy loading and code splitting in Vue.js

While mobile-first approach becomes a standard and uncertain network conditions are something we should always take into consideration it’s harder and harder to keep your application loading fast. In this series, I’ll dig deep into Vue performance optimization techniques that we are using in [Vue Storefront](https://www.vuestorefront.io/?utm_source=vueschool.io&utm_medium=external-blog&utm_campaign=vuestorefront) and that you can use in your Vue.js applications to make them loading instantly and perform smooth. My goal is to make this series a full and complete guide on Vue apps performance.

## How Webpack bundling works?

Most of the tips in this series will focus on making our JS bundle smaller. To understand while it’s crucial first we need to understand how Webpack is bundling all of our files.

While bundling our assets Webpack is creating something called  
dependency graph (click [here](https://cloud.githubusercontent.com/assets/1365881/5745055/40da9236-9c26-11e4-9e2b-6611cd743423.png) to see how it looks like). It’s a graph that links all of our files based on imports. Assuming we have a file called `main.js` specified as an entry point in our webpack config it will be a root of our dependency graph. Now every js module that we will import in this file will become its node in the graph and every module imported in these nodes will become their nodes.

Webpack is using this dependency graph to detect which files it should include in the output bundle. Output bundle is just a single (or multiple as we will see in the later parts) javascript file containing all modules from the dependency graph.

The bundle is essentially our entire application’s JavaScript.

We can illustrate this process with below image:

![](https://paper-attachments.dropbox.com/s_2E24013928DC2D1846E0F307F3A147533515D197E2854B22120C80C9A603E380_1556811094745_01.png)

Now that we know how bundling works, it becomes obvious that the bigger our project gets, the bigger the initial JavaScript bundle becomes.

The bigger bundle, the longer it takes to download and parse for our users. The longer a user has to wait, the more likely he is to leave our site. In fact, [according to Google](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/), 53% of mobile users leave a page that takes longer than three seconds to load.

As a summary, **bigger bundle = fewer users**, which can be directly translated to a loss of potential revenue. Bing is a good example - **2 seconds of delay resulted in a 4.3% loss in revenue per visitor** **for them.**

## Lazy loading

So how we can cut off bundle size when we still need to add new features and improve our application? The answer is easy — **lazy loading and code splitting.**

As the name suggests **lazy loading is a process of loading parts (chunks) of your application lazily**. In other words — loading them only when we really need them. Code splitting is just a process of splitting the app into this lazily loaded chunks.

![](https://paper-attachments.dropbox.com/s_2E24013928DC2D1846E0F307F3A147533515D197E2854B22120C80C9A603E380_1556811200558_02.png)

In most cases, you don’t need all the code from your Javascript bundle immediately when a user visits your website.

For example, we don’t need to spend valuable resources on loading the “My Page” area for guests that visits our website for the first time. Or there might be modals, tooltips and other parts and components that are not needed on every page.

It is wasteful at best, to download, parse and execute the entire bundle everything on every page load when only a few parts are needed.

Lazy loading allows us to split the bundle and serve only the needed parts so users are not wasting time to download and parse code that’ll not be used.

To see how much of the JavaScript code is actually used in our website we can go to the devtools -> cmd+shift+p -> type coverage -> hit ‘record’. Now we should be able to see how much of the downloaded code was actually used.

![](https://paper-attachments.dropbox.com/s_2E24013928DC2D1846E0F307F3A147533515D197E2854B22120C80C9A603E380_1556811287345_03.png)

**Everything marked as red is something that is not needed on current route and can be lazily loaded.** If you are using source maps you can click on any file in this list and see which of it’s parts were not invoked. As we can see even [vuejs.org](https://vuejs.org/) has a huge room for improvement ;).

By lazy loading proper components and libraries we managed to cut off the bundle size of Vue Storefront by 60%! That’s probably the easiest way to gain some performance boost.

Ok, we know what lazy loading is and that it’s pretty useful. It’s time to see how we can use lazy loading in our own Vue.js applications.

## Dynamic imports

<div>[![Learn Vue.js With Vue School](https://i.imgur.com/zSexphR.jpg)](https://vueschool.io/?ref=blog)</div>

We can easily load some parts of our application lazily with [webpack dynamic imports](https://webpack.js.org/guides/code-splitting/). Let’s see how they work and how they differ from regular imports.

If we import a JavaScript module in a standard way like this:
```javascript
    // cat.js
    const Cat = {
      meow: function () {
        console.log("Meowwwww!")
      }
    }
    export default Cat

    // main.js
    import Cat from './cat.js'
    Cat.meow()
```
It will be added as a node of a `main.js` in the dependency graph and bundled with it.

But what if we need our `Cat` module only under certain circumstances like a response to a user interaction? Bundling this module with our initial bundle is a bad idea since it is not needed at all times. We need a way to tell our application when it should download this chunk of code.

This is where dynamic imports can help us! Now take a look at this example:
```javascript
    // main.js
    const getCat = () => import('./cat.js')
    // later in the code as a response to some user interaction like click or route change
    getCat()
      .then({ meow } => meow())
```
Let’s take a quick look at what happened here:

Instead of directly importing `Cat` module we created a function that returns the `import()` function. **Now webpack will bundle the content of the dynamically imported module into a separate file**. The function representing dynamically imported module returns a Promise that will give us access to the exported members of the module while resolved.

We can then download this optional chunk later, when needed. For instance as a response to a certain user interaction(like route change or click).

By making a dynamic import we are basically isolating the given node (in that case `Cat`) that will be added to the dependency graph and downloading this part when we decide it’s needed (**which implies that we are also cutting off modules that are imported inside `Cat.js`**).

Let’s see another example that will better illustrate this mechanism.

Let’s assume we have a very small web shop with 4 files:

*   `main.js` as our main bundle
*   `product.js` for scripts in product page
*   `productGallery.js` for product gallery in product page
*   `category.js` for scripts in category page

Without digging too much into details let’s see how those files are distributed across the application:
```javascript
    // category.js
    const category = {
      init () { ... }
    }
    export default category

    // product.js
    import gallery from ('./productGallery.js')

    const product = {
      init () { ... }
    }
    export default product

    // main.js
    const getProduct = () => import('./product.js')
    const getCategory = () => import('./category.js')

    if (route === "/product") {
      getProduct()
        .then({init} => init()) // run scripts for product page
    }
    if (route === "/category") {
      getCategory()
        .then({init} => init()) // run scripts for category page
    }
```
In above code, depending on the current route we are dynamically importing either `product` or `category` modules and then running `init` function that is exported by both of them.

Knowing how dynamic imports are working we know that `product` and `category` will end up in a separate bundles but what will happen with `productGallery` module that wasn’t dynamically imported? As we know by making module dynamically imported **we are cutting part of the dependency graph.** Everything that was imported inside this part will be bundled together so `productGallery` will end up in the same bundle as `product` module.

In other words we are just creating some kind of a new entry point for the dependency graph.

![Each color is representing separate JS bundle](https://paper-attachments.dropbox.com/s_2E24013928DC2D1846E0F307F3A147533515D197E2854B22120C80C9A603E380_1558377879646_image.png)

## Lazy loading Vue components

Now that we know what lazy loading is and why we need it. It’s time to see how we can make use of it in our Vue applications.

The good news is that it’s extremely easy and we can lazily load the entire Single File Component, with it’s CSS and HTML with the same syntax as previously!

    const lazyComponent = () => import('Component.vue')

…that’s all you need! Now the component will be downloaded only when it’s requested. Here are the most common ways to invoke dynamic loading of Vue component:

*   function with import is invoked

    const lazyComponent = () => import('Component.vue')
    lazyComponent()

*   component is requested to render
```javascript
    <template>
      <div> 
        <lazy-component />
      </div>
    </template>

    <script>
    const lazyComponent = () => import('Component.vue')
    export default {
      components: { lazyComponent }
    }

    // Another syntax
    export default {
      components: {
        lazyComponent: () => import('Component.vue')
      }
    }
    </script>
```
Please note that the invocation of lazyComponent function will happen only when component is requested to render in a template. For example this code:
```javascript
    <lazy-component v-if="false" /> 
```
The component will not be loaded until it is required in the DOM, which is as soon as the v-if value changes to true.

## Summary and what’s next

Lazy loading is one of the best ways to make your web app more performant and reduce the bundle size. We learned how to use lazy loading with Vue components.

In the next part of this series I’ll show you the most useful (and also the fastest) way to gain some significant performance boost on any Vue.js application.

You will learn how to split your Vue code with async routes along with recommended best practices for this process.
