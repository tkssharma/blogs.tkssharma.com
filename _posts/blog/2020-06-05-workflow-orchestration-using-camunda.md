---
date: 2020-05-04
title: 'Event-driven architecture using camunda as Microservice workflow orchestration🎯'
template: post
featured:  '../thumbnails/camunda.png'
thumbnail: '../thumbnails/camunda.png'
slug: Event-driven-architecture-using-camunda-Microservice-workflow-orchestration
categories:
  - Popular
tags:
  - microservices
  - workflow
  - orchestration
---

# Event-driven architecture using camunda as Microservice workflow orchestration

I am writing this blog to address the most common problem in traditional development approach where we need to deal with different micro services and we have to orchestrate them in a way so that they can work with each other managing the state of application.

Let’s first try to understand the terminology we are going to use to understand this software architecture paradigm.

— adding some examples

— what is Event (can be FNF)

Event Driven Architecture : Event-driven architecture (EDA) is a software architecture paradigm promoting the production, detection, consumption of, and reaction to events (From Wikipedia) Based on this simple use case is when the user is doing some user action on UI and expecting some change in the state of UI asynchronously in the background, like user click on some button for verify pdf and asynchronously over the period of time status of that pdf is getting green as Verified. This whole flow can be using different micro services for PDF validation and doing different tasks against provided PDF.

![](https://cdn-images-1.medium.com/max/2000/1*C1HGY_kyRDGT71e84x13xw.png)

If we have many micro services doing one single business process flow, they should be decoupled enough so that we know status of process overtime, should be able to manage different errors from different service. Its all about Micro service orchestration so that seamlessly we can run whole task through different services. **Event Driven Design can help us in decoupling services and running** services in a particular fashion without knowing about each other.

**An event-driven architecture uses events to trigger and communicate between decoupled services** and is common in modern applications built with micro services. An event is a change in state, or an update, like an item being placed in a shopping cart on a website. Event carries some state and based on completion of a event we can decide what will be next set of events. Like order placed by used now Payment Event will be triggered.

Micro services still a very popular way of dividing up functionality for our complex systems into smaller ones. They give us the flexibility that allows us to hone and scale on specific capabilities, while also being agile in delivery.

But we have all these services acting independently and when we couple them with one another then we loose the concept of Real Micro services

In some cases if try to stitch these service together We might encounter more failures and we have to bear more cost. Stitching services may depends on the orchestration we are using to solve our problem but if we do that end up having —

* single failure with coupled design leads to further failures.

* higher thresholds to test, System state is known on service errors.

* Higher difficulty to understand systems and other costs.

In such cases we do have option of orchestrate micro services so they can work and talk to each other in expected way without stitching with one another

So our Final Goal is to orchestrate these Different micro services so they can talk to each other asynchronously, To help our micro services work in harmony, we can use different Orchestration Engine. These Orchestration tool routes requests, directs data, and mediates communications between various micro services so they can all cooperate seamlessly. These Tools should be scalable and fault-tolerant. **In further sections we will take a look on event driven Architecture with these service Orchestration **Engine so that all different service can be bound to a business process flow and can execute in a fashion based on different in/out events.

### Why Orchestration Engine needed for these Tasks

In the above example we were talking about simple pdf validation flow, What is pdf parser or pdf validation services are long running, These are some scenarios where we can look for some Orchestration Tools, Orchestration will help us getting all these things done.

* To help our micro services work in harmony

* Route requests, directs data, and mediates communications

* It should catches errors and log events

* Should be fault tolerant and scalable

* Should be able to take care long running tasks

There are many open source tools Available from Netflix and Uber which are working as Orchestration Engine and making our process flow seamlessly using different micro services.

### Cadence at Uber
> Cadence from Uber [is a Orchestration Engine (Go-based](https://golang.org/)) which is providing its own persistence, queue, and timers. Services can “talk” to each other *through* this multi-tenant middleware, which organizes external workflows so they function properly. Cadence makes sure each micro service gets all the data it needs (nothing more, nothing less), keeps a record of each action, and catches errors before workflows go awry.

### Conductor at Netflix

Conductor to help orchestrate micro services based process flows at Netflix with the different features, it is using JSON based DSL to define the execution flow, its a simple documents which says dispatch Event X based on “X1” condition or do something else if condition does not meet.

* A distributed server ecosystem, which stores workflow state information efficiently.

* Allow creation of process / business flows in which each individual task can be implemented by the same / different micro services.

* A JSON DSL based blueprint defines the execution flow.

* Provide visibility and traceability into these process flows.

* Simple interface to connect workers, which execute the tasks in workflows.
[**meirwah/awesome-workflow-engines**
*A curated list of awesome open source workflow engines Cromwell - Workflow engine written in Scala and designed for…*github.com](https://github.com/meirwah/awesome-workflow-engines)

we just needs to be sure that we are not doing data composition but Orchestration command control, **orchestration really means: coordinating commands across multiple micro services.**

When I hear the word “orchestration”: its looks like getting a bunch of services will work together in order to get some real work done and There are many Engines Available for doing same task.

We need to take care of few things with Any Engine we want to use

* Error messaging to track System state

* Avoid Transformation as we are doing command Orchestration

* Keep services small, no conflict with schemas

* Be resilient

* observe your Orchestration (Event Logging and Monitoring)

Let’s now try to understand how can we manage these Orchestration in an **orchestration workflow**, which is based on Business Process Manager Business Process Definition, defines a logical flow of activities or tasks from a Start event to an End event to accomplish a specific service. You can use the different types of **orchestration workflows. **Lets now talk about Micro services Orchestration and workflow in context of Camunda.

### Camunda
> Our open source workflow and decision automation tools enable thousands of developers to automate business processes and gain the agility, visibility and scale that is needed to achieve digital transformation (Just not a definition, Now lets understand this)

We will be writing some Application to make some business process simple and these End-to-end business processes are nothing but a set of Micro services, Now for communication One old way which micro services either call each other directly in Request/Response Pattern or communicate only indirectly via events published on a central message or event bus like (SQS/Kafka), Publish subscribe pattern is well suited where we don’t need to be aware about other services running as they are Reactive services acting based on some event.

With the increase of number of Micro services involved in different business process then real problems come out. This pub/sub or any simple Model can collapse with different timeouts and service failures with sending negative message to end user.

We can use Camunda as workflow Engine which comes with different capability and in this BPM workflow process can represent different micro services worker process.

## Camunda as BPM Tool
> In this section We are talking about how Camunda helps us to Design and Automate Business workflows, **We will talk about Micro services Orchestration separately using Camunda.**

Camunda is being used as BPM (Workflow and Decision Automation Platform) where we can create our Task in Camunda interface called Camunda Modeler and the whole flow from process start to end.

A simple example can be seen below where we are creating camunda process for payment validation or it can be a pdf validation. This whole process runs of Camunda engine and we have to draw this process using Camunda Modeler

which is using all these different entities like conditional, start, user manual activity. All these can be drawn using this tool. ***It is helping you to draw you business flow here which may be getting data from multiple entities/services.***

![simple workflow diagram](https://cdn-images-1.medium.com/max/2400/1*yrGLlhxW2tIgrLd8lKS3nw.jpeg)*simple workflow diagram*

Camunda workflow can do a lot of things when it comes to automation of any business process, you can read more about this here
[**Camunda BPM documentation | docs.camunda.org**
*Welcome to the Camunda BPM Manual! Camunda BPM is a light-weight, open-source platform for Business Process Management…*docs.camunda.org](https://docs.camunda.org/manual/7.12/)

## what is camunda workflow automation means?

It is a common term in technology “automation”, which allows us to separate out Process, roles and some rules from UI Interface or some API Services, You can say a Process engine running to deal with asynchronous tasks as simple APIs can’t manage long-running tasks.

Simple project would not need such architecture where we have business process and execution flows but we need this where

* We have workflow of managing things like documents, requests or applications between multiple users, APIs, frontends and systems.

* Lots of different processes, multiple roles, and integrations between systems

* Long-lived processes, i.e., process spans days, months, even years.

* Processes defined by business for different roles where individual doing different tasks.

you might benefit from using BPM methodology.

### What is business process Management

* Methodology to manage (identity, monitor, improve) processes “independently” from apps, code, and infrastructure

* Define how you make decisions during the process — decision rules

* Understand roles (groups of users)

* Create business process rules and automate them

### Why should I use BPM Tool

BPM is tightly coupled with two major things workflow and rules, BPM allows us to draw our business flow like we are doing here on Camunda Modeler using pre-defined building blocks which you see in this diagrams (Different Block elements) see more in Camunda Documentation [https://camunda.com/products/modeler/](https://camunda.com/products/modeler/)

BPMN allows us to run processing on Workflow we have created, we would need to do retry or parallel processing of different task or Error Handling from Different process.

Camunda Runs its Engine which is built in Java technology and can be deployed on K8S, EC2 instance or Local docker container. Camunda Provides REST Interface to interact with external worker interface like deploying a workflow to camunda engine we can trigger REST APIs to deploy workflow.
[**camunda/camunda-bpm-platform**
*camunda BPM platform is a flexible framework for workflow and process automation. It’s core is a native BPMN 2.0…*github.com](https://github.com/camunda/camunda-bpm-platform)

Camunda has different tools in its toolset

* Camunda Modeler

* Camunda Cockpit

* Camunda BPM Engine

* User Admin with Swagger REST APIs

### **Let’s come back to our Design flow with Event-Driven Architecture**

we will plugin Camunda with rest of the design and use Camunda as Micro service Orchestration.

Lets define a simple Business Case : PDF Validation, This business flow can be defined in our BPM Tool using Modeler

* PDF Location validation service

* PDF security check service

* PDF parsing service

* PDF Data validation

* PDF Extract Record and Persist service

If we do this in Non-BPM flow using publish-subscribe Model or using any traditional micro service development.

![](https://cdn-images-1.medium.com/max/2000/1*YJnK7JqDZDkIvkjhsGXYZQ.png)

This will lead us to different problem with scale its just a simple example where we are doing sequential execution but same example if we applies to a order processing system where we would face issues while identifying the current state of system as its divided,

* Any business change will lead the change in all services.

* We don’t know the actual state of system as state is being stored in different services.

* Most important as whole flow state is divided into different services **there is no way to rollback whole process chain as it de-centralized Model of execution without BPM**

![](https://cdn-images-1.medium.com/max/3704/1*7LOAb4lboZgpEACYlie1cg.png)

Now let’s change our approach and use BPM with Event Driven Architecture. With adding Camunda BPM now we know the state of whole process and can be tracked as its centralized.

* It is now easy to manage and and easy to rollback as we know the state of whole workflow, camunda has out of the box rollback support managing ACID principle of design.

We can design centralized event driven workflow with Message broker where we don’t need to manage record of services involved in the whole workflow. Every Business process will have Message Broker adapter to send message to SQS or Kafka and asynchronously post execution of task out workflow will know the state of that request.

![*Event-Driven Orchestration using BPMN*](https://cdn-images-1.medium.com/max/2000/1*XoAsjQJp4vUOOXy-ezn8RA.png)**Event-Driven Orchestration using BPMN**

This design can be further simplified with ZeeBee, A Workflow Engine for Micro services Orchestration which Define, orchestrate, and monitor business processes across micro services.

In this Architecture we are Interacting with Camunda using REST interface to start business process defined in Workflow which can be created using Camunda Modeler (Here these tasks are service task which will talk to external asynchronous interface) In this flow we have to write custom Java service adapter which can talk to rabbit MQ or any Event Bus.

Using this event driven centralized design interface we can resolve the issues mentioned in our traditional approach without using BPM.

We can explore on Zeebe which solves the end-to-end workflow problem in more practical terms. Zeebe enables users to —

* Explicitly define and model workflows that span multiple micro services

* Gain detailed visibility into how a workflow is performing and understand where there are problems

* Orchestrate micro services that fulfill a defined workflow to ensure that all workflow instances are completed according to plan–even when there are issues along the way
[**What is Zeebe?**
*This write-up will help you understand exactly what Zeebe is and how it might be relevant to you. We'll start with a…*zeebe.io](https://zeebe.io/what-is-zeebe/)

Conclusion :

In this Blog we talked about Micro service Orchestration using different open source library and the need of Orchestration and doing it in right way, Later we added Camunda as BPMN tools to create business workflow which indirectly were service talks, talking to different micro services. So here we understood How Camunda as BPM tool can helps us to centralize system state and can talk to external services interface. Camunda runs only process defined using Camunda Modeler rest is our Micro services and its Orchestration in right way using different patterns like Event driven Orchestration.

In this event driven Orchestration Services are decoupled and bound to central BPM workflow to give us the outcome from business workflow. Finally Zeebee can be helpful tool with camunda or service orchestration.
