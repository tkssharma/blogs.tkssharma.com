---
date: 2020-01-20
title: 'Building Micro services Containers Node JS'
template: post
thumbnail: '../thumbnails/node.png'
slug: building-node-js-microservices-architecture
categories:
  - Popular
tags:
  - NodeJS
  - Javascript
  - Docker
---

we’ll build a NodeJS microservice and deploy it using a Docker compose on the local system or you can your infra like Azure or AWS.

Here are the tools we’re going to use:

* NodeJS version 10.0

* Mysql

* Redis

* React App using create-react-app

* MongoDB 3.4.1

* Docker for Mac

Before you attempt this guide, you should have:

* Basic knowledge in NodeJS

* Basic knowledge in Docker (and Docker installed)

* Basic knowledge in MongoDB (and the database service running. If you don’t, I suggest you follow my previous article [How deploy a MongoDB replica set with Docker](https://medium.com/@cramirez92/how-to-deploy-a-mongodb-replica-set-using-docker-6d0b9ac00e49).)

## But first, what is a microservice?
> *A microservice is a single self-contained unit which, together with many others, makes up a large application. By splitting your app into small units every part of it is independently deployable and scalable, can be written by different teams and in different programming languages and can be tested individually. — [Max Stoiber](http://mxstbr.blog/2017/01/your-first-node-microservice/)*
> *A microservice architecture means that your app is made up of lots of smaller, independent applications capable of running in their own memory space and scaling independently from each other across potentially many separate machines. — [Eric Elliot](https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95#.gl46xectt)*

### The benefits of microservices

* The application starts faster, which makes developers more productive, and speeds up deployments.

* Each service can be deployed independently of other services — easier to deploy new versions of services frequently

* Easier to scale development and can also have performance advantages.

* Eliminates any long-term commitment to a technology stack. When developing a new service you can pick a new technology stack.

* Microservices are typically better organized, since each microservice has a very specific job, and is not concerned with the jobs of other components.

* Decoupled services are also easier to recompose and reconfigure to serve the purposes of different apps (for example, serving both the web clients and public API).

### The drawbacks of microservices

* Developers must deal with the additional complexity of creating a distributed system.

* Deployment complexity. In production, there is also the operational complexity of deploying and managing a system comprised of many different service types.

* As you’re building a new microservice architecture, you’re likely to discover lots of cross-cutting concerns that you did not anticipate at design time.

* We now need to worry about scaling or Containers and managing then to get them up and running all the time.

![](https://cdn-images-1.medium.com/max/2000/1*b6tHk5mGqznH_w0RM5MI0g.png)

![](https://cdn-images-1.medium.com/max/2000/1*7thu5cax8A1NnhB0dqQrIA.png)

Our services will be deployed on containers and nginx will be the central point for routing of services to the correct containers

```yml
ssl_certificate /etc/nginx/ssl/pac.crt;
ssl_certificate_key /etc/nginx/ssl/pac.key;

server {
    server_name  ms-commerce.com;
    listen              80;
    listen              443 ssl;
    location / {
        proxy_pass         http://ms_commerce_client:3003;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
    }
    location /api/ {
        proxy_pass         http://ms_commerce_auth:3001/api/;
        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
    }
     location /admin/ {
        proxy_pass         http://ms_commerce_admin:3002/api/;
        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
    }
     location /cart/ {
        proxy_pass         http://ms_commerce_cart:3004/api/;
        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
    }
}
```
[tkssharma/e-CommerseHub
*Microservices in Node js with React. Contribute to tkssharma/e-CommerseHub development by creating an account on…*github.com](https://github.com/tkssharma/e-CommerseHub)

We are going to create containers for different services like mysql, mongo and node js containers for deploying microservices for Shopping cart application

![](https://cdn-images-1.medium.com/max/2000/1*Pk9fCBxdSnnuc61luAT3mA.png)

These all are different services managing different parts of application like shopping cart Admin has Admin APIs for services, Cart-Auth APIs to manage authentication in the application. They all are talking to different services and different data source and on top of that we do have nginx routing to decide where to connect for a service like

ms-commerce.com will render react client app running on port 3003

ms-commerce.com/api/ will connect with Auth container

ms-commerce.com/cart/ will connect with Cart container

ms-commerce.com/admin. will connect with admin container

Docker-compose file will manage the deployment of all containers together

```yml
version: '3.5'
services:
  gateway:
    image: nginx:1.11
    ports:
      - 80:80
      - 443:443
    volumes:
      - ./proxy/default.conf:/etc/nginx/conf.d/default.conf:ro
      - ./proxy/ssl:/etc/nginx/ssl:ro
    depends_on:
      - ms_commerce_auth
      - ms_commerce_admin
      - ms_commerce_client
    networks:
      - ms_network
  ms_mysql:
    container_name: ms_mysql
    image: mysql:5.7
    volumes:
      - ~/datadir/mysql:/var/lib/mysql
    ports:
      - 3306:3306
      - 33060:33060
    environment:
      MYSQL_ROOT_PASSWORD: root
    networks:
      - ms_network
  ms_commerce_mongo:
    image: mongo
    container_name: ms_commerce_mongo
    restart: unless-stopped
    volumes:
      - ~/datadir/mongo:/data/db
    ports:
      - 27017:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: root
    networks:
      - ms_network
  ms_commerce_auth:
    container_name: ms_commerce_auth
    build: ./e-Commerce-Auth/
    image: e-commerce-auth
    volumes:
      - ./e-Commerce-Auth/:/usr/src/app
      - /usr/src/app/node_modules
    ports:
      - 3001:3001
      - 9201:9201
    depends_on:
      - ms_mysql
    networks:
      - ms_network
  ms_commerce_cart:
    container_name: ms_commerce_cart
    build: ./e-Commerce-Cart/
    image: e-commerce-cart
    volumes:
      - ./e-Commerce-Cart/:/usr/src/app
      - /usr/src/app/node_modules
    ports:
      - 3004:3004
      - 9204:9204
    depends_on:
      - ms_mysql
    networks:
      - ms_network      
  ms_commerce_admin:
    build: ./e-Commerce-Admin/
    image: e-commerce-admin
    container_name: ms_commerce_admin
    environment:
      - NODE_ENV=local
    volumes:
      - ./e-Commerce-Admin/:/usr/src/app
      - /usr/src/app/node_modules
    ports:
      - 3002:3002
      - 9202:9202
    depends_on:
      - ms_commerce_mongo
    networks:
      - ms_network
  ms_commerce_client:
    build: ./e-Commerce-Client/
    image: e-commerce-client
    container_name: ms_commerce_client
    environment:
      - NODE_ENV=local
    volumes:
      - ./e-Commerce-Client/:/usr/src/app
      - /usr/src/app/node_modules
    ports:
      - 3003:3003
    depends_on:
      - ms_commerce_admin
      - ms_commerce_auth
    networks:
      - ms_network      
networks:
  ms_network:
    driver: bridge
    name: ms_network
  
```  

Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a Compose file to configure your application’s services. Then, using a single command, you create and start all the services from your configuration. To learn more about all the features of Compose see [the list of features](https://github.com/docker/docker.github.io/blob/master/compose/overview.md#features).

Compose is great for development, testing, and staging environments, as well as CI workflows. You can learn more about each case in [Common Use Cases](https://github.com/docker/docker.github.io/blob/master/compose/overview.md#common-use-cases).

Using Compose is basically a three-step process.

1. Define your app’s environment with a Dockerfile so it can be reproduced anywhere.

1. Define the services that make up your app in docker-compose.yml so they can be run together in an isolated environment.

1. Lastly, run docker-compose up and Compose will start and run your entire app.

A docker-compose.yml looks like this:

    version: '2'

    services:
      web:
        build: .
        ports:
         - "5000:5000"
        volumes:
         - .:/code
      redis:
        image: redis

For more information about the Compose file, see the [Compose file reference](https://github.com/docker/docker.github.io/blob/master/compose/compose-file/compose-versioning.md).

Compose has commands for managing the whole lifecycle of your application:

* Start, stop and rebuild services

* View the status of running services

* Stream the log output of running services

* Run a one-off command on a service

![](https://cdn-images-1.medium.com/max/2784/1*MPxl3xWknSq9majUbJANRA.png)

![](https://cdn-images-1.medium.com/max/4492/1*lbZ2s-s_aHuZX-YCRRo2IA.png)

This is a very basic setup where nginx is talking to Node API containers and they further getting data from MySQL and mongo containers.

Dockerfile file is almost the same for all containers
```dockerfile
FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# npm install
RUN  npm install
# Run npm install --global grpc --unsafe-perm

EXPOSE 3004 9204
CMD [ "npm", "run", "watchserver" ]
CMD [ "npm", "run", "startdev" ]
```

We are writing code in typescript and using TSC compiler to generate build and deploying the building code using nodemon on containers.

## Conclusion :

Write application and deploy them using Docker containers on your local.

I hope you enjoyed this article. I’m still exploring the NodeJS and the microservices world, so I’m open to accepting feedback and contributions.

If you enjoyed this article, recommend it to a friend.

## Find out more

Learning how to use Bash commands with Docker CLI commands can help you work more effectively with Docker apps. Check out the Docker docs and my other posts to learn more.

* [Docker docs: CLI](https://docs.docker.com/engine/reference/commandline/cli/)

* [Docker docs: ps #filtering](https://docs.docker.com/engine/reference/commandline/ps/#filtering)

* [DigitalOcean — Using Grep & Regular Expressions to Search for Text Patterns in Linux](https://www.digitalocean.com/community/tutorials/using-grep-regular-expressions-to-search-for-text-patterns-in-linux)

* [Top 10 Docker commands you can’t live without](https://medium.com/the-code-review/top-10-docker-commands-you-cant-live-without-54fb6377f481)

* [The ups and downs of docker-compose — how to run multi-container applications](https://medium.freecodecamp.org/the-ups-and-downs-of-docker-compose-how-to-run-multi-container-applications-bf7a8e33017e)

* [Clean out your Docker images, containers and volumes with single commands](https://medium.com/the-code-review/clean-out-your-docker-images-containers-and-volumes-with-single-commands-b8e38253c271)
