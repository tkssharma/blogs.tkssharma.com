---
date: 2020-05-17
title: 'Building React Forms using Formik'
template: post
featured:  '../thumbnails/react.png'
thumbnail: '../thumbnails/react.png'
slug: building-react-forms-using-formik
categories:
  - Popular
tags:
  - reactjs
  - forms
  - react
  - redux
  - context
---

# Writing React Forms using Formik Library

![](https://img.youtube.com/vi/3xMiK5mVBpM/0.jpg)

[tkssharma/react-forms-formik
React Formik Course. Contribute to tkssharma/react-forms-formik development by creating an account on GitHub.github.com](https://github.com/tkssharma/react-forms-formik)

## Overview (From Formik Documentation)

Formik is a library that helps us to write forms in React.

forms are really verbose in [React](https://github.com/facebook/react). To make matters worse, most form helpers do way too much magic and often have a significant performance cost associated with them. Formik is a small library that helps you with the 3 most annoying parts:

- Getting values in and out of form state
- Validation and error messages
- Handling form submission

By colocating all of the above in one place, Formik will keep things organized — making testing, refactoring, and reasoning about your forms a breeze.

## Motivation

([@jaredpalmer](https://twitter.com/jaredpalmer)) wrote Formik while building a large internal administrative dashboard with [@eonwhite](https://twitter.com/eonwhite). With around ~30 unique forms, it quickly became obvious that we could benefit by standardizing not just our input components but also the way in which data flowed through our forms.

## Why not Redux-Form?

By now, you might be thinking, “Why didn’t you just use [Redux-Form](https://github.com/erikras/redux-form)?” Good question.

1. According to our prophet Dan Abramov, [form state is inherently ephemeral and local, so tracking it in Redux (or any kind of Flux library) is unnecessary](https://github.com/reactjs/redux/issues/1287#issuecomment-175351978)

1. Redux-Form calls your entire top-level Redux reducer multiple times ON EVERY SINGLE KEYSTROKE. This is fine for small apps, but as your Redux app grows, input latency will continue to increase if you use Redux-Form.

1. Redux-Form is 22.5 kB minified gzipped (Formik is 12.7 kB)

The goal of Formik is to create a scalable, performant, form helper with a minimal API that does the really really annoying stuff, and leaves the rest up to you.

## Installation

## NPM

    npm install formik --save

or

    yarn add formik

Formik is compatible with React v15+ and works with ReactDOM and React Native.

You can also try before you buy with this [demo of Formik on CodeSandbox.io](https://codesandbox.io/s/zKrK5YLDZ)

## CDN

If you’re not using a module bundler or package manager we also have a global (“UMD”) build hosted on the [unpkg.com](https://unpkg.com/) CDN. Simply add the following <script> tag to the bottom of your HTML file:

<script src="https://unpkg.com/formik/dist/formik.umd.production.min.js"></script>

Once you’ve added this you will have access to the window.Formik.<Insert_Component_Name_Here> variables.

This installation/usage requires the [React CDN script bundles](https://reactjs.org/docs/cdn-links.html) to be on the page as well.

## In-browser Playgrounds

You can play with Formik in your web browser with these live online playgrounds.

 [CodeSandbox (ReactDOM)](https://codesandbox.io/s/zKrK5YLDZ)

 [Snack (React Native)](https://snack.expo.io/?dependencies=yup%2Cformik%2Creact-native-paper%2Cexpo-constants&sourceUrl=https%3A%2F%2Fgist.githubusercontent.com%2Fbrentvatne%2F700e1dbf9c3e88a11aef8e557627ce3f%2Fraw%2Feeee57721c9890c1212ac34a4c37707f6354f469%2FApp.js)

Explore More about Formik (I [@tkssharma] have Covered everything about formik in these training sessions.

![](https://img.youtube.com/vi/3xMiK5mVBpM/0.jpg)(http://www.youtube.com/watch?v=3xMiK5mVBpM)


— References

[Getting Started

- Let's face it, forms are really verbose in React. To make matters worse, most form helpers do wayyyy too much magic and…formik.org](https://formik.org/docs/overview)

- [Using Formik to Handle Forms in React | CSS-Tricks
There is no doubt that web forms play an integral role in our web site or applications. By default, they provide a…css-tricks.com](https://css-tricks.com/using-formik-to-handle-forms-in-react/)
