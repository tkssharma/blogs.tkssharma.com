---
date: 2020-05-27
title: 'Easy Steps to start with Docker 💻 🔭'
template: post
featured:  '../thumbnails/docker.png'
thumbnail: '../thumbnails/docker.png'
slug: step-by-step-using-docker
categories:
  - Popular
tags:
  - docker
  - containers
  - developers
  - development setup
---

Using Docker in your development workflow has a positive impact on your productivity. It eliminates the typical "It worked on my machine" type of bugs and the setup on a different machine only requires a running Docker daemon and nothing else.  
Before we get started implementing we will go over Docker real quick.

### [](#what-is-docker)What is Docker?

Docker is a platform that can run _containers_, packages of software. To run these containers Docker uses OS-level virtualization. You can think of a container as a lightweight version of a virtual machine.

All containers you run on your Docker platform are isolated from one another. For example, the host, on which Docker runs, and one container running on the host, do not share the same filesystem except to explicitly tell them to.

To start a container you need a Docker _image_. This image is the blueprint for your container. You can take already predefined images from [Docker-Hub](https://hub.docker.com/) or configure your own ones by writing a so-called Dockerfile.

This is just a quick overview of Docker if you want to dig deeper I encourage you to start [here](https://www.docker.com/resources/what-container).

### [](#why-would-you-dockerize-your-development-workflow)Why would you dockerize your development workflow?

In the introduction, I already touched on one benefit of using Docker in your development environment. This being the fact that it gets rid of the typical "It works on my machine" issue. Some other benefits are:

*   Standardize development workflow between team members even more
*   Reduction of production-only bugs if you use Docker for deployment too (Configurations between production and development can be quite similar)
*   Getting rid of the forementioned "Works on my machine" type of bugs

### [](#getting-started)Getting started

We start out by creating a new folder in which we place our project, and we create our Dockerfile like this:  
```bash
    $ mkdir node-docker && cd node-docker
    $ touch Dockerfile
```   

#### [](#dockerfile)Dockerfile

The container that we will use for our express application will be configured in the Dockerfile. For that, we need to give it some life: 

```dockerfile
    FROM node:latest
    WORKDIR /usr/src/app
    COPY package*.json ./
    ENV PORT 5000
    RUN npm cache clear --force && npm install
```    

FROM tells Docker to get an image called _node_ (version: latest) from the docker hub.

WORKDIR sets the directory in which all the upcoming commands will be executed.

COPY does exactly what it says, it gets the _package.json_ and _package-lock.json_ and copies it to the _WORKDIR_.

ENV sets an environment variable inside the container with the name _PORT_ and the value 5000

RUN executes the commands we pass in. In this case, clearing the npm cache and then installing all the dependencies from _package.json_.

#### [](#simple-express-app)Simple Express App

Now that we have our Dockerfile ready to go we need a simple express application that we can run inside a container. For that, we create two new files like this:  

    $ touch server.js package.json
    

_package.json_ will get two dependencies, first express, and second nodemon:  

```json
    {
      "name": "node-docker",
      "version": "1.0.0",
      "description": "",
      "main": "server.js",
      "scripts": {
        "start": "nodemon server.js"
      },
      "author": "Jakob Klamser",
      "license": "MIT",
      "dependencies": {
        "express": "^4.17.1"
      },
      "devDependencies": {
        "nodemon": "^2.0.4"
      }
    }
```  
The express application will just return simple HTML when hitting the main page. Therefore _server.js_ should look like this:  

```javascript
    const express = require('express');
    
    const app = express();
    
    const PORT = process.env.PORT || 5000;
    
    app.get('/', (req, res) => {
      res.send(`
        <h1>Express + Docker</h1>
        <span>This projects runs inside a Docker container</span>
      `);
    });
    
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}!`);
    });
```  

#### [](#dockerignore).dockerignore

Before we start setting up a MongoDB container together with our express container, we want to exclude some files from the running container. The syntax of a _.dockerignore_ files is exactly the same as for a _.gitignore_ file:  

    # Git
    .git
    .gitignore
    
    # Docker
    Dockerfile
    docker-compose.yml
    
    # NPM dependencies
    node_modules
    

#### [](#dockercomposeyml)docker-compose.yml

Last but not least we want to define a _docker-compose.yml_. This file will contain all the information needed to run the express application and the MongoDB at the same time in two different containers. Let's go ahead and create the file.  

    $ touch docker-compose.yml
    

Now we configure it like this:  
```yaml
    version: '3'
    services:
      api:
        build: .
        ports:
          - "5000:5000"
        depends_on:
          - mongo
        volumes:
          - "./:/usr/src/app"
          - "reserved:/usr/src/app/node_modules"
      mongo:
        image: "mongo" 
        ports:
          - "27017:27017"
    volumes:
      reserved:
```   

version: First we define the version of the docker-compose we want to use. There are quite a lot of differences between version 3 and 2, so be careful when picking a version!

services: This is the section in which we define our express API (api) and the MongoDB (mongo)

build & image: _build_ tells Docker to build an image out of a Dockerfile. In our case we want it to use the Dockerfile in the current directory. That's why we put . as a parameter because this defines the current directory. _image_ tells Docker to pull an already existing image from docker hub.

ports & volumes: As the name of _ports_ suggests we define the ports here. The colon is a mapping operator. We map the port 5000 of the container to the port 5000 of our host system, in this case, our local machine so that we can access the application outside of the container. The same goes for the port mapping of the MongoDB. _volumes_ do something similar but this time with volumes. We map our local directory in which we write our code into the WORKDIR of the container. This way the container immediately reacts if we change anything in the source code.

reserved: This is a special volume that the local _node\_modules_ folder if existing, won't override the _node\_modules_ folder inside the container.

If you run the following command Docker will create an image from our Dockerfile and then run both containers (api and mongo):  

    $ docker-compose up
    

If you want to stop the containers just use this command:  

    $ docker-compose down
    

### [](#conclusion)Conclusion

This is a simple Docker development environment setup that can easily be extended. If you want to change the database or add an Nginx to render your frontend