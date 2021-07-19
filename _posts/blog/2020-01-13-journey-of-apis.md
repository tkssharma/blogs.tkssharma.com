---
date: 2020-01-13
title: 'Journey of APIs from REST => Graphql'
template: post
thumbnail: '../thumbnails/drupal.png'
slug: Journey-of-apis-rest-to-gql
categories:
  - Drupal
tags:
  - APIs
  - Decoupled Drupal
  - Graphql
---

Hi Folks,
In this short Talk, I will be talking about why you should choose GraphQL over REST 

* REST API development
* GraphQL API Development 

All different kinds of applications being built using the progressive web, decoupled Drupal or Using JAM Stack (Gatsby), One thing which is common is now we are adopting Graphql everywhere for its advantages over REST APIs.

Main Focus will be on Advantages of Graphql Over REST in some use-cases

Few Advantages are - 

* Good for Decoupled applications with one common Graphql as API gateway 
* Good for client-side caching or managing state like for React Application at client side
* Helping us to Build APIs with schema & Type definition

Simple Architecture of application may Have - 

Frontend
* React
* Apollo
* Redux

Backend
* Drupal CMS APIs

The frontend talks to the backend using GraphQL, simple use-case can be this 
<img class="cp t u fy ak" src="../thumbnails/arch.png" width="600" height="200" role="presentation"/>

Graphql Cool Playground (4 min Demo)
> [**Graphql Explorer or Playground**]()

<img class="cp t u fy ak" src="https://miro.medium.com/max/3600/1*A1eQh4GlSP0Rjnt_u2VifQ.png" width="800" height="400" role="presentation"/>

