---
date: 2024-04-03
title: 'Efective ways to design your APIs Node JS'
template: post
featuredImage: '../thumbnails/node.png'
thumbnail: '../thumbnails/node.png'
slug: effective-ways-to-design-apis-nodejs
categories:
  - nodejs
  - javascript
tags:
  - nodejs
  - javascript
---

“Application Programming Interface,” or API, refers to a communication channel between various software services. Applications that transmit requests and responses are called clients and servers, respectively.

There are different types of **API protocols:**

*   **REST** — relies on a client/server approach that separates the front and back ends of the API and provides considerable flexibility in development and implementation.
*   **RPC** — The remote procedural call (RPC) protocol sends multiple parameters and receives results.
*   **SOAP** — Supports a wide range of communication protocols found across the internet, such as HTTP, SMTP, and TCP.
*   **WebSocket** — Provides a way to exchange data between browser and server via a persistent connection.

![](https://miro.medium.com/v2/resize:fit:700/0*NTaniOrLwxC6Zfzn)

What is an API? (Credits: RapidAPI)

Most of our daily work as software engineers utilizes or creates REST APIs. The standard method of communication between the systems is through APIs. Therefore, it’s crucial to build REST APIs properly to avoid issues in the future. A well-defined API should be **easy to work with, concise, and hard to misuse**.

Here are some general recommendations:

1\. Use nouns instead of verbs
==============================

Verbs should not be used in endpoint paths. Instead, the pathname should contain the **nouns** that identify the object to which the endpoint we are accessing or altering belongs.

For example, instead of using `/getAllClients` to fetch all clients, use `/clients`.

2\. Use plural resource nouns
=============================

Use the **plural form** for resource nouns because this fits all types of endpoints.

For example, instead of using `/employee/:id/`, use `/employees/:id/`.

3\. Be consistent
=================

When we say to be consistent, this means to be **predictable**. When we have one endpoint defined, others should behave similarly. So, use the same case for resources, the same auth methods for all endpoints, the same headers, the same status codes, etc.

4\. Keep it simple
==================

We should make naming all endpoints **resource-oriented**, as they are. If we want to define an API for users, we would describe it as:

`/users`

`/users/124`

So, the first API gets all users, and the second one gets a specific user.

5\. User proper status codes
============================

This one is super important. There are many **HTTP status codes**, but we usually use just some. Don’t use too many, but use the same status codes for the same outcomes across the API, e.g.,

*   **200** for general success.
*   **201** for successful creation.
*   **202** for a successful request.
*   **204** for no content.
*   **307** for redirected content.
*   **400** for bad requests.
*   **401** for unauthorized requests.
*   **403** for missing permissions.
*   **404** for lacking resources.
*   **5xx** for internal errors.

![](https://miro.medium.com/v2/resize:fit:700/1*HzxN-wKDw1C3IVgXWsun_A.png)

HTTP Status Codes

6\. Don’t return plain text
===========================

REST APIs should accept JSON for request payload and respond with **JSON** because it is a standard for transferring data. Yet, it is not enough to return a body with JSON-formatted string; we need to specify a Content-Type header to be application/JSON. The only exception is if we’re trying to send and receive files between the client and server.

7\. Do proper error handling
============================

Here, we want to eliminate any confusion when an error occurs. We must handle errors properly and return a response code indicating what happened (from **400 to 5xx errors**). We need to return some details in the response body along with a status code.

8\. Have good security practices
================================

We want all communication between a client and a server to be protected, meaning we need to always use SSL/TLS, with no exceptions. Also, allow authentication via API keys, which should be passed using a custom HTTP header with an expiration date.

9\. Use pagination
==================

Use pagination if our API needs to return a lot of data, as this will make our API future-proof. Use `page` and `page_size` is recommended here.

For example, `/products?page=10&page_size=20`

10\. Versioning
===============

It is essential to version APIs **from the first version**, as our APIs could have different users. This will allow our users to avoid being affected by changes that we can make in the future. API versions can be passed through HTTP headers or query/path params.

For example, `/products/v1/4`

Also, don’t forget to **document your APIs** because API will be only as good as its documentation. The docs should show examples of complete request/response cycles. Here, we can use the [**OpenAPI**](https://swagger.io/specification/) definition as a source of truth.

To develop APIs, check [**Swagger**](https://swagger.io/) and [**OpenAPI**](https://swagger.io/specification/) specifications, [**Postman**](https://www.postman.com/), or [**Stoplight**](https://stoplight.io/).

Thanks for reading, and stay awesome!