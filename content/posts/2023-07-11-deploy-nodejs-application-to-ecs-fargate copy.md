---
date: 2023-07-11
title: 'How to deploy Node JS application to ECS Fargate Cluster'
template: post
featuredImage: '../thumbnails/node.png'
thumbnail: '../thumbnails/node.png'
slug: how-to-deploy-nodejs-application-to-ecs-clister-aws
categories:
  - nodejs
  - aws
  - aws-cdk
  - javascript
tags:
  - nodejs
  - aws
  - aws-cdk
  - javascript
---



Create Fastify Application with Docker [Part-1]
--------------------------------------------------

**Fastify** is a popular, efficient and low overhead Node.js web framework for building scalable and fast HTTP servers. **Docker** is a powerful containerization tool that allows you to create and manage lightweight and portable containers that run your applications.

In this blog post, we will describe how to run a simple “hello world” HTTP server using the Fastify library inside a Docker container in Node.js.

Prerequisites
-------------

*   [Node.js and npm installed](https://nodejs.org/en/) on your system.
*   [Docker installed](https://docs.docker.com/get-docker/) on your system.

Create a new Node.js project
============================

First, create a new directory for your project and initialise a new Node.js project using npm. Run the following commands in your terminal:

```sh
mkdir fastify-docker  
cd fastify-docker  
npm init -y
```


**Install Fastify**

Next, install Fastify and save it as a dependency in your project using npm. Run the following command in your terminal:

```sh
npm install fastify --save

```

Create the “hello world” server
===============================

Now, create a new file called `index.js` in the root of your project directory. This file will contain the code for the "hello world" HTTP server.

```js
const fastify = require('fastify')();  
  
const { ADDRESS = 'localhost', PORT = '3000' } = process.env;  
  
fastify.get('/', async (request, reply) => {  
  return { message: 'Hello world!' }  
})  
  
fastify.listen({ host: ADDRESS, port: parseInt(PORT, 10) }, (err, address) => {  
  if (err) {  
    console.error(err)  
    process.exit(1)  
  }  
  console.log(`Server listening at ${address}`)  
})


```

By default, Fastify (and many other web servers) bind to the loopback IP address (127.0.0.1) when running on the host machine, which means that it can only receive connections from the same machine. However, when running inside a Docker container, the container’s loopback IP address is not accessible from the host machine or other machines on the network.

To allow incoming connections to reach Fastify inside the container, we need to bind to an IP address that is accessible from outside the container. Binding to 0.0.0.0 is a way to bind to all available network interfaces on the container, which means that Fastify will be able to receive connections from any IP address that can reach the container.

This code creates a new Fastify instance, defines a single `GET` route for the root path, and starts the server listening on port `3000`. When a client makes a request to the root path, the server will respond with a JSON object containing the message "Hello world!".

Create a Dockerfile
-------------------

Next, create a new file called `Dockerfile` in the root of your project directory. This file will contain the instructions for building your Docker image.

```sh
FROM node:14  
  
WORKDIR /app  
  
COPY package.json .  
  
RUN npm install  
  
COPY . .  
  
EXPOSE 3000  
  
ENV ADDRESS=0.0.0.0 PORT=3000  
  
CMD ["npm", "start"]
```


This `Dockerfile` starts with the official Node.js 14 image, sets the working directory to `/app`, copies the `package.json` file to the working directory, installs the dependencies using npm, copies the rest of the files to the working directory, exposes port 3000, and sets the default command to run the `npm start` script.

Build the Docker image
----------------------

Now that you have created the `Dockerfile`, you can use it to build a Docker image. Run the following command in your terminal:

docker build -t fastify-docker .

This command tells Docker to build an image using the instructions in the `Dockerfile` and tag it with the name `fastify-docker`.

Run the Docker container
------------------------

Finally, you can run the Docker container using the image you just built. Run the following command in your terminal:

docker run -p 3000:3000 fastify-docker

This command tells Docker to run a container using the `fastify-docker` image and map port 3000 inside the container to port 3000 on your local machine.

Test the server
---------------

You can now test your “hello world” server by opening a web browser and navigating to [http://localhost:3000](http://localhost:3000/). You should see a JSON response containing the message “Hello world!”.


Fastify + Distroless + Multi-Stage Builds [PART-2]
------------------------------------------

Docker multi-stage builds allow you to use multiple `FROM` statements in a single Dockerfile to create multiple stages for building your container image. Each stage can have its own dependencies, environment variables, and build instructions. **Using a multi-stage build can help you reduce the size of your container images by eliminating unused dependencies and files.**

Prerequisites
-------------

*   Docker installed on your system.
*   Basic knowledge of Docker and building Docker images.
Create a new Dockerfile
-----------------------

First, create a new file called `Dockerfile.multistage` in the root of your project directory. This file will contain the instructions for building your Docker image using a multi-stage distroless base image.

```sh
# Stage 1: Build the application  
FROM node:16-alpine as **builder**  
  
WORKDIR /app  
  
COPY package*.json ./  
  
RUN npm install --production  
  
# Stage 2: Create the production image  
FROM gcr.io/distroless/nodejs:16  
  
ENV ADDRESS=0.0.0.0 PORT=3000  
  
WORKDIR /app  
  
COPY package*.json ./  
  
COPY **--from=builder** /app/node_modules .  
  
COPY . .  
  
CMD ["node", "index.js"]

This `Dockerfile` contains two stages:

```

*   **Stage 1:** Build the application
*   **Stage 2:** Create the production image

In stage 1, we use the official Node.js 16-alpine image as our base image, set the working directory to `/app`, copy the `package*.json` files to the working directory, install dependencies using npm, copy the rest of the files to the working directory, and run the `npm run build` command. This stage is responsible for building our application.

In stage 2, we use the distroless Node.js 16 image as our base image, set the working directory to `/app`, copy the `node_modules` from the previous stage to the working directory and set the default command to run the `node index.js` command. This stage is responsible for creating the production image.

Note that we’re using the `--from=builder` flag in the `COPY` command to copy the `dist` directory from the previous stage to the current stage.

Build the Docker image
----------------------

Now that you have created the `Dockerfile.multistage`, you can use it to build a Docker image. Run the following command in your terminal:

```sh
docker build -f Dockerfile.multistage -t fastify-multistage .
```

This command tells Docker to build an image using the instructions in the `Dockerfile.multistage` and tag it with the name `fastify-multistage`.

Run the Docker container
------------------------

Finally, you can run the Docker container using the multi-stage distroless-based image you just built. Run the following command in your terminal:

```sh
docker run -p 3000:3000 fastify-multistage
```

This command tells Docker to run a container using the `fastify-multistage` image and map port `3000` inside the container to port `3000` on your local machine.

Congratulations! Similarly to our other blog posts, you can now open [http://localhost:3000](http://localhost:3000) in your browser to see a response from the server.

Deploy Fastify Application to AWS ECS Fargate using AWS CDK[PART-3]
------------------------------------------------------------------

Prerequisites
=============

*   [Node.js and npm installed](https://nodejs.org/en/) on your system.
*   [Docker installed](https://docs.docker.com/get-docker/) on your system.

What is AWS ECS Fargate?
========================

Amazon Elastic Container Service (ECS) is a fully managed container orchestration service provided by AWS. ECS allows you to easily run and scale containerised applications on AWS, and it integrates seamlessly with other AWS services. Fargate is a deployment option for ECS that allows you to run containers without having to manage the underlying infrastructure.

Why use AWS CDK?
================

AWS Cloud Development Kit (CDK) is an open-source software development framework to define cloud infrastructure in code and provision it through AWS CloudFormation. With the CDK, you can define infrastructure as code using familiar programming languages like TypeScript, Python, or Java. The CDK offers several benefits, including:

*   Easy to use: Developers can use familiar programming languages and modern development tools to define and deploy infrastructure, making it easier to manage infrastructure as code.
*   Reusable: The CDK provides a library of pre-built AWS constructs, making it easy to reuse and share infrastructure code.
*   Scalable: The CDK can be used to manage large-scale infrastructure deployments using the same familiar programming constructs used for smaller deployments.
*   Secure: The CDK enforces best practices for security and compliance.

Getting Started
===============

I won’t assume you’ve followed along with my previous blog posts, so let’s get our project up & running quickly:

Create a new Node.js project
----------------------------

First, create a new directory for your project and initialise a new Node.js project using npm. Run the following commands in your terminal:

```sh
npm install -g aws-cdk  
mkdir fastify-docker  
cd fastify-docker  
cdk init app --language=typescript
```


**Install Fastify**
-------------------

Next, install Fastify and save it as a dependency in your project using npm. Run the following command in your terminal:

```sh
npm install fastify @types/node --save
```

Create the “hello world” server
-------------------------------

Now, create a new file called `src/index.ts` in the root of your project directory. This file will contain the code for the "hello world" HTTP server.

```js
import fastify from 'fastify'  
  
const server = fastify()  
  
const { ADDRESS = 'localhost', PORT = '3000' } = process.env;  
  
server.get('/', async (request, reply) => {  
  return { message: 'Hello world!' }  
})  
  
server.listen({ host: ADDRESS, port: parseInt(PORT, 10) }, (err, address) => {  
  if (err) {  
    console.error(err)  
    process.exit(1)  
  }  
  console.log(`Server listening at ${address}`)  
})
```


Add a build script
------------------

Let’s update `package.json` to add a simple build script for our API:

```json
{  
  "scripts": {  
    "build": "tsc -p tsconfig.json --outDir ./dist"  
  }  
}
```


The `--outDir` flag controls the directory where compiled code will be placed.

Create a new Dockerfile
-----------------------

First, create a new file called `Dockerfile` in the root of your project directory. This file will contain the instructions for building your Docker image.

We’re going to re-use the multi-stage `Dockerfile` created in previous Part

```sh
# Stage 1: Install production dependencies  
FROM node:16-alpine as builder  
  
WORKDIR /app  
  
COPY package*.json ./  
  
RUN npm install --production  
  
# Stage 2: Compile our application  
FROM node:16-alpine as compiler  
  
WORKDIR /app  
  
COPY package*.json ./  
  
RUN npm install && npm run build  
  
# Stage 3: Create the production image  
FROM gcr.io/distroless/nodejs:16  
  
ENV ADDRESS=0.0.0.0 PORT=3000  
  
WORKDIR /app  
  
COPY package*.json ./  
  
COPY --from=builder /app/node_modules .  
COPY --from=compiler /app/dist .  
  
CMD ["node", "dist/index.js"]
```

This `Dockerfile` contains three stages:

*   **Stage 1:** Install only production dependencies
*   **Stage 2:** Compile our application from TypeScript
*   **Stage 3:** Create the production image

In stage 1, we use the official Node.js 16-alpine image as our base image, set the working directory to `/app`, copy the `package*.json` files to the working directory, install dependencies using npm, copy the rest of the files to the working directory, and run the `npm run build` command. This stage is responsible for building our application.

In stage 2, we are again using the official Node.js 16-alpine image as our base image, but this time we are installing all the necessary development & production dependencies in-order to run `npm run build` . This stage is responsible for compiling our TypeScript code.

In stage 3, we use the distroless Node.js 16 image as our base image, set the working directory to `/app`, copy the `node_modules` and `dist` folders from the previous stage to the working directory and set the default command to run the `node dist/index.js` command. This stage is responsible for creating the production image.

Deploying a simple HTTP API to AWS ECS Fargate
==============================================

We’ll be using the `ApplicationLoadBalancedFargateService` construct that makes it easy to deploy our service. It takes care of creating and configuring several AWS resources, including:

*   **Amazon ECS cluster:** A logical grouping of resources that are used to run containerized applications on Fargate.
*   **Amazon ECS task definition:** A blueprint that describes how a container should be run, including information about the container image, CPU and memory requirements, and networking configuration.
*   **Amazon ECS service:** A long-running task that runs on Fargate and is managed by ECS.
*   **Amazon Elastic Load Balancer (ELB):** A load balancer that distributes traffic to the service.
*   **Amazon CloudWatch Logs group:** A log group where logs generated by the service are stored.

Deploy to ECS Fargate using AWS CDK
===================================

We have now built our initial solution in TypeScript and have implemented a multi-stage `Dockerfile`. Finally, need to update & deploy our stack to AWS using the CDK CLI. Before we do that, we need to make sure that we have configured our AWS credentials and set the default region in the AWS CLI.

The `lib/cdk-stack.ts` file is where we will define the infrastructure resource for deploying the Fargate ECS CDK construct.

Let’s define the `ApplicationLoadBalancedFargateService` construct. We will need to import the `aws-ecs` and `aws-ecs-patterns` module:

```js
import * as cdk from 'aws-cdk-lib';  
import * as ecs from 'aws-cdk-lib/aws-ecs';  
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';  
import { Construct } from 'constructs';  
  
export class MyStack extends cdk.Stack {  
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {  
    super(scope, id, props);  
  
    const loadBalancedFargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {  
      memoryLimitMiB: 512,  
      cpu: 256,  
      taskImageOptions: {  
        image: ecs.ContainerImage.fromAsset('.'),  
      },  
    });  
      
    loadBalancedFargateService.targetGroup.configureHealthCheck({  
      path: '/',  
    });  
  }  
}
```


In the updated `MyStack` class, we have configured the `ApplicationLoadBalancedFargateService` construct. We define where AWS CDK should look in-order to find the `Dockerfile` we defined earlier in this post. AWS CDK takes care of building Docker Container and pushing it to a secure AWS ECR for us, during a deployment.

Finally, we configure a health check for the AWS Application Load Balancer, so that it knows the service is healthy and ready to receive traffic.

Deploying AWS CDK
=================

To deploy AWS CDK, we first need to bootstrap our AWS environment. Bootstraping involves creating various resources to facilitate deployments and a new AWS CloudFormation stack that AWS CDK will use to store and manage its deployment artifacts.

Bootstrap AWS CDK
=================

Once we have installed the AWS CLI, we can bootstrap AWS CDK by running the following command:

cdk bootstrap

> **_Note:_** _Running bootstrap more than once on a specific AWS Account & region has no effect._

Deploy Infrastructure Resources
===============================

After defining our infrastructure resources, we can deploy them using the AWS CDK CLI. To deploy our resources, run the following command:

cdk deploy

This command will build, package, and deploy our infrastructure resources to AWS.

Once the deployment is complete, **you should see an output message that contains the URL of your HTTP API**. You can use this URL to test your API by making a GET request to it.

Housekeeping
------------

Once you’ve deployed everything, use the following command to destroy any deployed resources to avoid any unwanted cost:

cdk destroy

Conclusion
==========

In this technical blog post, we walked through the steps of deploying a simple HTTP API to AWS ECS Fargate using the AWS CDK`ApplicationLoadBalancedFargateService` construct. We covered the basics of building a Fastify Docker container using TypeScript, AWS ECS Fargate and then deploying using CDK.

The `ApplicationLoadBalancedFargateService` construct makes it easy to deploy containerised applications to AWS ECS Fargate. With the CDK, we can define and deploy infrastructure as code using familiar programming languages, making it easier to manage infrastructure at scale.