---
date: 2020-06-12
title: 'Private NPM Module with Docker Containers'
template: post
featured:  '../thumbnails/js.png'
thumbnail: '../thumbnails/js.png'
slug: private-npm-modules-with-containers-docker
categories:
  - Popular
tags:
  - docker
  - containers
  - npm repository
  - private npm
---
[NPM had announced support for private modules](https://www.npmjs.com/private-modules) and now its possible to have private or public NPM package which you can publish to Github, Gitlab or NPM repository.

what is NPM Package —
[**npm**
*Edit description*www.npmjs.com](https://www.npmjs.com/)

![](https://miro.medium.com/max/1000/1*UeEYblRp1c4ozhcLqzHM0w.png)

If we talk about NPM which is node package manager but now its like javascript package manager where you can publish a package private or public and your other apps can use that package.

Package is nothing but some software utility or some sdk interface, such package we can get and those feature will get added in our JavaScript application like webpack, grunt, gulp

to add these package or library if we can install simply
> npm install — save pkg-name

Can we build such javascript package and publish it, Yes we can publish such packages and others can consume these packages.

Now how to work with Private package which are limited to your organization or can be access with valid access or auth tokens.

Out point of discussion here is how to work with private packaged using Docker or Locally

If we are running application locally and we need to install some private or Organization package then we need to configure our .npmrc file

vi ~/.npmrc

    always-auth=true
    //gitlab.com/api/v4/packages/npm/:_authToken=AUTH_TOKEN
    //gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/:_authToken=AUTH_TOKEN
    @my_org:registry=[https://gitlab.com/api/v4/packages/npm/](https://gitlab.com/api/v4/packages/npm/)

Here an example for .npmrc for gitlab private repository, here we have to specify AUTH_TOKEN which we can get from account -> settings-> access-token

This .npmrc will help us to pull private packages which are published in private scope as we have valid credentials to fetch private package

    npm install —- save @my_org/packagename

We can run npm install and it will install all public and private package as we have .npmrc which will validate package pull from private repository

Now what if we have to do same for Docker setup, In this case we have to make few arrangements Dockerfile for your Node projects

To access the private modules in NPM, we need to pass the GIT_TOKEN environment variable to the Docker image.

    ENV GIT_TOKEN=token

The naive approach would be to add it using the ENV, However, **it does not work**. The variables set with ENV are for runtime only. so we can have setup like below mentioned Dockerfile

```dockerfile
FROM node:carbon
WORKDIR /usr/src/app
ARG GIT_TOKEN
COPY package.json package-lock.json .npmrc ./
RUN npm install
RUN rm -f .npmrc
# Add your source files
COPY . .
EXPOSE 3000
RUN npm run build
cmd npm run start:dev
```

You can test docker build for this container by passing GIT_TOKEN argument during build, To build the image using this image and the token, you can run Docker:

    docker build --build-arg GIT_TOKEN=${GIT_TOKEN} .

Now we can update docker-compose.yml and populate GIT_TOKEN for our build environment
```yml
version: '3.5'
services:
  gateway:
    image: nginx:1.11
    ports:
      - 88:80
      - 443:443
    depends_on:
      - svc_car
      - svc_company
      - svc_user
    networks:
      - svc_network
  svc_mongo:
    image: mongo
    container_name: svc_mongo
    restart: unless-stopped
    ports:
      - 27017:27017
    networks:
      - svc_network
  svc_gatekeeper:
    container_name: svc_gatekeeper
    build: ./gatekeeper/
    image: svc_gatekeeper
    ports:
      - 4001:3000
    depends_on:
      - svc_mongo
      - svc_redis
    networks:
      - svc_network
```

docker-compose.override.yml
```yml
version: '3.5'
services:
  svc_mongo:
    volumes:
      - mongo_data:/data/configdb
      - mongo_data:/data/mysql
  gateway:
    volumes:
      - ./proxy/default.conf:/etc/nginx/conf.d/default.conf:ro
      - ./proxy/ssl:/etc/nginx/ssl:ro
  svc_redis:
    volumes:
      - redis_data:/var/lib/redis
  svc_gatekeeper:
    build:
      args:
         GIT_TOKEN: TOKEN 
    volumes:
      - ./gatekeeper/:/usr/src/app
      - gatekeeper_modules:/usr/src/app/node_modules
      - ~/.npmrc/:/root/.npmrc
```      

.npmrc in your code base can look like this which will map to container .npmrc using volume mapping

    always-auth=true
    //gitlab.com/api/v4/packages/npm/:_authToken=AUTH_TOKEN
    //gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/:_authToken=AUTH_TOKEN
    @my_org:registry=[https://gitlab.com/api/v4/packages/npm/](https://gitlab.com/api/v4/packages/npm/)

this example was for pulling modules from gitlab but its kind of same for others like Github and NPM module    
