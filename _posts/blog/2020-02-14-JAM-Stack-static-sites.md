---
date: 2020-02-14
title: 'JAMStack Workflow | Javascript - API - Markdown'
template: post
thumbnail: '../thumbnails/js.png'
slug: jamstack-workflow-javascript-api-workflow
categories:
  - Popular
  - Javascript
tags:
  - Javascript
---
JAMstack is revolutionising the way we think about workflow by providing a simpler developer experience, better performance, lower cost and greater scalability.

This simple guide will help you understand why it exists and how to get started.

JAM stands for JavaScript, API & Markup.
### “A modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup”*

* JavaScript

* APIs

* Markup


### JavaScript

Dynamic functionalities are handled by JavaScript. There is no restriction on which framework or library you must use.

### APIs

Server side operations are abstracted into reusable APIs and accessed over HTTPS with JavaScript. These can be third party services or your custom function.

### Markup

Websites are served as static HTML files. These can be generated from source files, such as Markdown, using a Static Site Generator.

![](https://cdn-images-1.medium.com/max/3236/1*VqW98XgMD6M-rESa6IEUPA.png)

static websites have not only be been growing in popularity, but also in functionality. Gone are the days when static websites are just some HTML and some bunch of CSS with no interactivity whatsoever. Today, we have static websites that does things like process payments, handle realtime activities etc. To keep calling websites like these “static websites” will be undermining the functionality of such websites. Hence, the term JAMstack.

## Table of Contents

* What is the JAMstack

* Why the JAMstack

* How to build with the JAMstack

* Conclusion

JAMstack stands for JavaScript, APIs, and Markup. According to the official [website](https://jamstack.org/), JAMstack means:

Modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup.*

The term was coined by Mathias Biilmann, co-founder of [Netlify](https://www.netlify.com/).

With the JAMstack, we no longer talk about specific technologies; operating systems, web servers, backend programming languages, or databases. It’s a new way of building websites and apps that delivers better performance, higher security, lower cost of scaling, and a better developer experience.

## Why the JAMstack

Having seen what the JAMstack is, you might ask why go the JAMstack route? Below are some reasons you should consider the JAMstack:

* Faster performance: This is the most obvious benefit of a JAMstack website as it is just pre-built HTML and assets, all which can be served over a CDN.

* Higher security: JAMstack websites are incredibly secure, since you don’t have to worry of servers been hacked or database vulnerabilities.

* Less cost: Cost of running a JAMstack website is cheaper, since it uses less resources as things like servers and databases are not necessarily needed.

* Better developer experience: With the JAMstack, there is no tight coupling between backend and frontend, as we can select from an expanding options of CMS and content infrastructures, which removes the need to maintain a separate stack for content and our website. We can even make use of third-party services like [Algolia](https://www.algolia.com/) and [Netlify Forms](https://www.netlify.com/docs/form-handling/).

In addition to the above, there are numerous services to integrate dynamic functionality into JAMstack websites emerging up every day. Such services includes:

* Manage signups, logins, password recovery, and more with [Netlify Identity](https://www.netlify.com/docs/identity/).

* Full text search with [Algolia](https://www.algolia.com/) and [Lunr.js](https://lunrjs.com/).

* Form handling with [Formspree](https://formspree.io/) or [Netlify Forms](https://www.netlify.com/docs/form-handling/).


We have already seen what the JAMstack stands for. So to build a project using the JAMstack, the project must meet the following criteria:

* JavaScript: Any dynamic programming during the request/response cycle is handled by JavaScript, running entirely on the client. This could be any frontend framework like [Vue.js](https://vuejs.org/), [React](https://reactjs.org/), [Angular](https://angular.io/), etc. or even vanilla JavaScript.

* APIs: All server-side processes or database actions are abstracted into reusable APIs, accessed over HTTP with JavaScript. These can be custom-built or leverage third-party services.

* Markup: Templated markup should be pre-built at deploy time, usually using a site generator like [GatsbyJS](https://gatsbyjs.org/), [Nuxt.js](https://nuxtjs.org/), [Hugo](https://gohugo.io/) etc. for content sites, or a build tool like [Webpack](https://webpack.js.org/), [ParcelJS](https://parceljs.org/) etc. for web apps.

With those in mind, your project is not built with the JAMstack if:

* Built with a server-side CMS like WordPress, Drupal etc.

* A monolithic server-run web app that relies on a backend language like PHP, Node, or any other backend language.

* A single page app (SPA) that uses isomorphic rendering to build views on the server at runtime.

When building a project with the JAMstack, you should consider the following best practices:

* The entire site should be served on CDN.

* Employ atomic deploys.

* Instant caching invalidation.

* Everything should live on Git.

* Markup builds should be automated.
