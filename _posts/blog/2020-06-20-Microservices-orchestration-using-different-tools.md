---
date: 2020-05-20
title: 'Microservices Orchestration using Different Tools'
template: post
featured:  '../thumbnails/microservices.png'
thumbnail: '../thumbnails/microservices.png'
slug: microservices-orchestration-using-different-tools
categories:
  - Popular
tags:
  - microservices
  - design-patterns
  - orchestrations
  - api gateway pattern
  - cqrs patterns
  - event sourcing pattern
  - event driven design patterns
---


# What is Microservices Orchestration?

Think of your Microservices like musical instruments: each one excels at a certain purpose, but it takes arrangement, timing and detailed coordination for them to create beautiful music together. If your application is based on microservices or simply split across multiple containers, it’s time to learn why companies building or maintaining scalable applications swear by orchestration tools.


## Going from “Bare Metal” to Containers 
Containers represent the natural evolution of virtualization technology. Advances in virtualization proved that “bare-metal” (physical) servers could be efficiently split into multiple, smaller servers known as virtual machines (VMs). Each VM could run a different operating system (OS) — Linux, Windows, FreeBSD, etc. — without having to modify the existing software. 

Virtual machines have to run an operating system on top of a hypervisor (also known as a bare metal virtual machine monitor). Starting a virtual machine requires an entire operating system boot process — plus it takes over the entire OS. 

Container technology, conversely, bundles its OS and all the elements needed to run the underlying microservices, such as code, runtime, system tools, system libraries, and settings. In a container scenario, all the moving parts and dependencies across various infrastructure are abstracted away, and thus become less complex for the developer.

Because containers run programs on top of an operating system, the program being executed only consumes the memory and CPU overhead of that one bundle, with a sufficient amount of isolation from the other containers on the same machine. Containers provided developers with many of the benefits of VMs, but with faster deployment times. The greater speed and isolation made them faster to create, boot up and test, making them ideal for the loosely coupled services of microservices architectures.

Add hearing to the above principles, brings several challenges and issues while bring your solution or system to live. Those problems are common for many solutions. Those can overcome with using correct and matching design patterns. There are design patterns for microservices and those can divide into five Patterns.

## Which Brings Us to Orchestration

While microservices containers offer your applications potential increases in both functionality and productivity, they also have more moving parts to configure, coordinate, and, well, orchestrate. That’s where orchestration can help, automating many of the more time-consuming aspects of container management. 

As container adoption has exploded, so has the adoption of container orchestration. Orchestration tools talk to the host OS to manage how multiple containers are created, upgraded and made available. The rich functionality, simple tools, and powerful APIs make orchestration a favorite toolset for Continuous Integration (CI) and Continuous Delivery (CD) workflows.

## The Benefits of Microservices Orchestration

No matter how you deploy your containers — whether on bare metal or within virtual machines — running multiple containers across multiple servers requires a level of DevOps resources that your organization might not be prepared to supply. 

"Orchestration helps fill the gap, offering a variety of services that allow developers to better track, schedule and operationalize various containers at scale"

Adding orchestration to your architecture:

- Helps navigate the many moving parts 
- Shows you when to start the right containers
- Enables containers to talk to each other
- Ensures high availability across your infrastructure
- If a container strategy is your company’s chosen path, orchestration tools can make life a lot easier.

## Microservices Orchestration Tools

- Kubernetes
Created by Google, Kubernetes tends to be the default solution for automating application deployment, scaling, and management. It’s open-source and provides key features out of the box, including means to scale workloads up and down, service discovery, and sufficient networking capabilities to connect microservices. 

- Azure Kubernetes Service (AKS)
As per the name, AKS is a managed Kubernetes container orchestration service in Azure that simplifies Kubernetes cluster management, deployment, and operations. 

- Mesos
Apache Mesos allows developers to run both containerized and non-containerized workloads in a distributed manner. It’s perhaps best known for its ability to support diverse types of workloads, including big data and cloud native apps. Unlike Kubernetes, a pod abstraction isn’t available — yet.

- ECS
Amazon Elastic Container Service is largely a container orchestration service that enables you to run and scale containerized applications on Amazon Web Services (AWS). It frees developers running apps on AWS from having to install and operate a separate container orchestration software suite. 

- Conductor
Conductor is a service created by Netflix to orchestrate their microservices based process flows in the cloud. They’ve since released it as an open source solution. 
