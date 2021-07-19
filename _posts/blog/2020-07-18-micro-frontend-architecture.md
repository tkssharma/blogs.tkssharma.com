---
date: 2020-06-17
title: 'Debugging with Docker Containers'
template: post
featured:  '../thumbnails/docker.png'
thumbnail: '../thumbnails/docker.png'
slug: debugging-with-docker-containers
categories:
  - Popular
tags:
  - docker
  - containers
  - debugging
  - docker-compose
---

# Debugging with Docker Containers
  
More information about debugging Node.js applications within Docker containers can be found at [Debug Node.js within a container](/docs/containers/debug-node.md).

Lets do hands-on on debugging with example using nestcli

## creating app using nestcli

The Nest CLI is a command-line interface tool that helps you to initialize, develop, and maintain your Nest applications. It assists in multiple ways, including scaffolding the project, serving it in development mode, and building and bundling the application for production distribution. It embodies best-practice architectural patterns to encourage well-structured apps.

## Installation

Note: In this guide we describe using npm to install packages, including the Nest CLI. Other package managers may be used at your discretion. With npm, you have several options available for managing how your OS command line resolves the location of the nest CLI binary file. Here, we describe installing the nest binary globally using the -g option. This provides a measure of convenience, and is the approach we assume throughout the documentation. Note that installing anynpm package globally leaves the responsibility of ensuring they're running the correct version up to the user. It also means that if you have different projects, each will run the same version of the CLI. A reasonable alternative is to use the npx program (or similar features with other package managers) to ensure that you run a managed version of the Nest CLI. We recommend you consult the npx documentation and/or your DevOps support staff for more information.

Install the CLI globally using the npm install -g command (see the Note above for details about global installs).

```bash
$ npm install -g @nestjs/cli
```

Basic workflow
Once installed, you can invoke CLI commands directly from your OS command line through the nest executable. See the available nest commands by entering the following:

```bash
$ nest new my-nest-project
$ cd my-nest-project
$ npm run start:dev
```

In your browser, open http://localhost:3000 to see the new application running. The app will automatically recompile and reload when you change any of the source files.

Now we have node js application running on 3000 Port locally 
you can pick existing nestjs application also 
https://github.com/lujakob/nestjs-realworld-example-app

now lets setup debugging with nodemon and docker

Update Package JSON with debug script  `start:debug` script
```json 
{
  "name": "app",
  "version": "1.0.0",
  "description": "app",
  "scripts": {
    "start": "ts-node ./src/main.ts",
    "start:debug": "nodemon",
    "start:prod": "node ./dist/src/main.js",
  }
}
```

As we are running using nodemon we need nodemon.json file to run application in debug Mode 
`--inspect=0.0.0.0:5858` will help us to attach debugger on process 

```json
{
  "watch": ["src"],
  "ext": "ts",
  "ignore": ["src/**/*.spec.ts","test/**/*.ts"],
  "exec": "node --inspect=0.0.0.0:5858 -r ts-node/register ./src/main.ts"
}
```
This works fine on Local but what about when we run application on docker container and we need debugging enabled 
Please follow these steps to perfor debuggong on container

Create your dockerfile 

```dockerfile
FROM node:12-buster-slim
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install && \
    rm -rf /tmp/* /var/tmp/*
COPY . /app
RUN npm run build
EXPOSE 3000
CMD npm run start:prod
```
Another file is docker-compose file to run this container using `docker-compose up` command,
Here command in compose file is `command: npm run start:debug` which will help us triggering container debug 

```yml
version: "3"
services:
  node:
    build: .
    command: npm run start:debug
    volumes:
      - .:/app
    env_file:
      ./.env
```

Added file `docker-compose.override.yml` which is exposting `container` and `debug port` mapping 5858 and 3000 PORTs

```yml
version: "3"
services:
  node:
    command: npm run start:debug
    ports:
      - 3015:3000
      - 5858:5858
```

Now we can run docker-compose up to run application and container is exposting 3015 and 5858 port, we can use 5858 for container debugging 

Debugging can be configured on VSCode only using .vscode folder and launch.json file
your launch.json in .vscode folder

- add same port exposed by container `5858`
- keep address "address": "0.0.0.0",
- request should be attach as we are attachinh debugger
- "localRoot": "${workspaceFolder}" as you have open project in vscode and not whole workspace

```json
{
  "configurations": [
    {
      "name": "Docker: Attach to Node",
      "type": "node",
      "request": "attach",
      "port": 5858,
      "address": "0.0.0.0",
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "/",
      "protocol": "inspector"
    }
  ]
}
```

## Running all things together

- run application using `docker-compose up` once we see applicarion running perform below setp -
- go to debug tool in vscode and click on `docker-attach` it can be done from vscode UI debug console 

Once we see applicaion running we should be able to attach debugger from vscode and then we can debug our controller or services 
```
node_1  | [Tue Dec 08 05:48:39 2020] [info] PmApprovalActionsController {/test}:
node_1  | [Tue Dec 08 05:48:39 2020] [info] Mapped {/test/test-sheet, POST} route
node_1  | [Tue Dec 08 05:48:40 2020] [info] Nest application successfully started
node_1  | Debugger attached.
```

Now you can add debug Point and Hit APIs from Postman and debug your controllers and services







