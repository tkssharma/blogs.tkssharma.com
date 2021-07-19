---
date: 2020-02-18
title: 'Serverless framework with Node JS AWS'
template: post
thumbnail: '../thumbnails/node.png'
slug: serverless-framework-using-node-js
categories:
  - Popular
  - NodeJS
tags:
  - NodeJS
---

Serverless Framework is your single toolkit for deploying serverless architectures to any provider. You build the features, we configure the infrastructure. Done.

Serverless with AWS as a provider
[**Using the Serverless Framework with Node.js on AWS**
*The Serverless Framework is the world’s leading development framework for building serverless applications. This course…*app.pluralsight.com](https://app.pluralsight.com/library/courses/aws-nodejs-serverless-framework-using/table-of-contents)

![](https://cdn-images-1.medium.com/max/2000/1*yZHBB3qYzZ_tsUnZ15GOEg.png)

## AWS — Introduction

The Serverless Framework helps you develop and deploy your AWS Lambda functions, along with the AWS infrastructure resources they require. It’s a CLI that offers structure, automation and best practices out-of-the-box, allowing you to focus on building sophisticated, event-driven, serverless architectures, comprised of [Functions](https://serverless.com/framework/docs/providers/aws/guide/intro/#functions) and [Events](https://serverless.com/framework/docs/providers/aws/guide/intro/#events).

The Serverless Framework is different from other application frameworks because:

* It manages your code as well as your infrastructure

* It supports multiple languages (Node.js, Python, Java, and more)

## [#](https://serverless.com/framework/docs/providers/aws/guide/intro/#core-concepts)Core Concepts

Here are the Framework’s main concepts and how they pertain to AWS and Lambda…

## [#](https://serverless.com/framework/docs/providers/aws/guide/intro/#functions)Functions

A Function is an AWS Lambda function. It’s an independent unit of deployment, like a microservice. It’s merely code, deployed in the cloud, that is most often written to perform a single job such as:

* *Saving a user to the database*

* *Processing a file in a database*

* *Performing a scheduled task*

You can perform multiple jobs in your code, but we don’t recommend doing that without good reason. Separation of concerns is best and the Framework is designed to help you easily develop and deploy Functions, as well as manage lots of them.

## [#](https://serverless.com/framework/docs/providers/aws/guide/intro/#events)Events

Anything that triggers an AWS Lambda Function to execute is regarded by the Framework as an Event. Events are infrastructure events on AWS such as:

* *An AWS API Gateway HTTP endpoint request (e.g., for a REST API)*

* *An AWS S3 bucket upload (e.g., for an image)*

* *A CloudWatch timer (e.g., run every 5 minutes)*

* *An AWS SNS topic (e.g., a message)*

* *A CloudWatch Alert (e.g., something happened)*

* *And more…*

When you define an event for your AWS Lambda functions in the Serverless Framework, the Framework will automatically create any infrastructure necessary for that event (e.g., an API Gateway endpoint) and configure your AWS Lambda Functions to listen to it.

## [#](https://serverless.com/framework/docs/providers/aws/guide/intro/#resources)Resources

Resources are AWS infrastructure components which your Functions use such as:

* *An AWS DynamoDB Table (e.g., for saving Users/Posts/Comments data)*

* *An AWS S3 Bucket (e.g., for saving images or files)*

* *An AWS SNS Topic (e.g., for sending messages asynchronously)*

* *Anything that can be defined in CloudFormation is supported by the Serverless Framework*

The Serverless Framework not only deploys your Functions and the Events that trigger them, but it also deploys the AWS infrastructure components your Functions depend upon.

## [#](https://serverless.com/framework/docs/providers/aws/guide/intro/#services)Services

A Service is the Framework’s unit of organization. You can think of it as a project file, though you can have multiple services for a single application. It’s where you define your Functions, the Events that trigger them, and the Resources your Functions use, all in one file entitled serverless.yml (or serverless.json). It looks like this:

## Getting Started with Serverless

First things first, let’s get the Serverless framework installed on your machine.

    # Installing the serverless cli
    **npm install -g serverless
    **# Updating serverless from a previous version of serverless
    **npm install -g serverless
    **# Login to the serverless platform (optional)
    **serverless login**

### Pre-requisites

1. Node.js v6.5.0 or later.

1. Serverless CLI v1.9.0 or later. You can run npm install -g serverless to install it.

1. An AWS account. If you don’t already have one, you can sign up for a [free trial](https://aws.amazon.com/s/dm/optimization/server-side-test/free-tier/free_np/) that includes 1 million free Lambda requests per month.

1. Set-up your [Provider Credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials). [Watch the video on setting up credentials](https://www.youtube.com/watch?v=HSd9uYj2LJA)

## [#](https://serverless.com/framework/docs/providers/aws/guide/quick-start/#tutorials)Tutorials

Check out the following links for tutorial walkthroughs:

* [Build an Node.js REST API](https://serverless.com/blog/serverless-express-rest-api/)

* [Deploy a GraphQL endpoint](https://serverless.com/blog/make-serverless-graphql-api-using-lambda-dynamodb/)

Or follow the steps below for creating & deploying a simple service and learning some simple Serverless commands.

## [#](https://serverless.com/framework/docs/providers/aws/guide/quick-start/#create-a-new-service)Create a new service

Create a new service using the Node.js template, specifying a unique name and an optional path for your service.

    **# Create a new Serverless Service/Project
    $ serverless create --template aws-nodejs --path my-service
    **# Change into the newly created directory
    **$ cd my-service**

you will get .yml

    # serverless.yml

    service: users

    functions: # Your "Functions"
      usersCreate:
        events: # The "Events" that trigger this function
          - http: post users/create
      usersDelete:
        events:
          - http: delete users/delete

    resources: # The "Resources" your "Functions" use.  Raw AWS CloudFormation goes in here.

When you deploy with the Framework by running serverless deploy, everything in serverless.yml is deployed at once.

## [#](https://serverless.com/framework/docs/providers/aws/guide/intro/#plugins)Plugins

You can overwrite or extend the functionality of the Framework using Plugins. Every serverless.yml can contain a plugins: property, which features multiple plugins.

    # serverless.yml

    plugins:
      - serverless-offline
      - serverless-secrets

## [#](https://serverless.com/framework/docs/providers/aws/guide/quick-start/#deploy-test-and-diagnose-your-service)Deploy, test and diagnose your service

1. Deploy the Service

Use this when you have made changes to your Functions, Events or Resources in serverless.yml or you simply want to deploy all changes within your Service at the same time.

    serverless deploy -v

1. Deploy the Function

Use this to quickly upload and overwrite your function code, allowing you to develop faster.

    serverless deploy function -f hello

1. Invoke the Function

Invokes a Function and returns logs.

    serverless invoke -f hello -l

1. Fetch the Function Logs

Open up a separate tab in your console and stream all logs for a specific Function using this command.

    serverless logs -f hello -t
