---
date: 2020-06-23
title: 'Service Mesh for Microservices Architecture'
template: post
thumbnail: '../thumbnails/node.png'
slug: service-mesh-for-microservices-architecture
categories:
  - NodeJS
  - Popular
tags:
  - NodeJS
  - Interview
---

# what is Service Mesh

There was a lot of hype around the Microservices Architecture. Most people think that microservices is the answer to all the problems they had with previous architecture such as SOA/ESB. However, when we observe the real world microservices implementations, we can see that most of the functionalities that a centralized bus (ESB) supports are now implemented at microservices level. So, we are more or less solving the same set of fundamental problems, but we are solving them at different dimensions with Microservices.

Lets think about most common challenges which we face when we design microservices based architecture, As microservices are designed to communicate to one another we spend most of the time in troubleshooting communication among these services.

Lets take a look what Microservices Complex Architecture look like - 

![](https://miro.medium.com/max/1400/0*wjfiBCLEVHkvM0cu.png)

- Therefore a given microservice which communicates with other services(figure 2), comprises of:
Business Logic that implements the business functionalities, computations and service composition/integration logic.

- Network Functions that take care of the inter-service communication mechanisms (basic service invocation through a given protocol, apply resiliency and stability patterns, service discovery etc.) These network functions are built on top of the underlying OS level network stack.

Now think about the effort involved in implementing such microservice. Implementing the functionalities related service-to-service communication from scratch is a nightmare. Rather focusing on the business logic, you will have to spend a lot of time on building service-to-service communication functionalities. And this is even worse if you use multiple technologies to build microservices (such as multiple programming languages as shown in figure 1), because you need to duplicate the same efforts across different languages (e.g. Circuit breaker has to be implemented on Java, Node, Python etc.).


> The most complex challenge in realizing microservice architecture is not building the services themselves, but the communication between services.

## Service-Mesh means networking of services (Istio, linkerd, Mesh)

Service-Mesh means networking of services, Istio is a project which developed different components collaboratively work as a service mesh product to manage and control the networking between microservices. In other words, separating the business logic in your microservice and it’s communication and networking layer.

![](https://res.infoq.com/articles/service-mesh-ultimate-guide/en/resources/1Service-Mesh-pillar-page-1581411807997.jpg)


We can achieve this by injecting another container in the same application pod running in Kubernetes platform called sidecar (envoy), so now we have two different containers in one pod, one is for running your business application, and other is managing its interaction with other services in the mesh, we can also allocate different resources to these containers as per the application requirement.

### So What is a ‘Service Mesh and what all it provides 

- A given Microservice won’t directly communicate with the other microservices.

Rather all service-to-service communications will take places on-top of a software component called service mesh (or side-car proxy).

- Service Mesh provides built-in support for some network functions such as resiliency, service discovery etc.

- Therefore, service developers can focus more on the business logic while most of the work related to network communication is offloaded to the service mesh.

For instance, you don’t need to worry about circuit breaking when your microservice call another service anymore. That already comes as part of service mesh.

- Service-mesh is language agnostic: Since the microservice to service mesh proxy communication is always on top to standard protocols such as HTTP1.x/2.x, gRPC etc., you can write your microservice from any technology and they will still work with the service mesh.



### Functionalities of a Service Mesh

As we have seen earlier, the service mesh offers a set of application network functions while some (primitive) network functions are still implemented the microservices level itself. There is no hard and fast rule on what functionalities should be offered from a service mesh. These are the most common features offered from a service mesh.


- Resiliency for inter-service communications: Circuit-breaking, retries and timeouts, fault injection, fault handling, load balancing and failover.

- Service Discovery: Discovery of service endpoints through a dedicated service registry.

- Routing: Primitive routing capabilities, but no routing logics related to the business functionality of the service.

- Observability: Metrics, monitoring, distributed logging, distributed tracing.

- Security: Transport level security (TLS) and key management.

- Access Control: Simple blacklist and whitelist based access control.

- Deployment: Native support for containers. Docker and Kubernetes.

- Interservice communication protocols: HTTP1.x, HTTP2, gRPC
Service Mesh Implementations

- Linkerd and Istio are two popular open source service mesh implementations. They both follow a similar architecture, but different implementation mechanisms. You can find a very good comparison between these two service mesh implementations at [1].


![](https://www.altoros.com/blog/wp-content/uploads/2018/10/Kubernetes-Istio-Service-Mesh-Aspen-Microservices-v2.gif)

Reference :
https://www.altoros.com/blog/using-istio-to-unify-microservices-with-a-service-mesh-on-kubernetes/
https://medium.com/devops-dudes/what-is-service-mesh-and-what-it-brings-to-microservices-bba34d9f6284

Conclusion:
This is just introduction about service Mesh as i started looking into this, I will try to publish Part-2 with some demo implementation with Node JS services
In summary, service mesh addresses some of the key challenges when it comes to the realization of microservice architecture. It gives you more freedom to select a diverse set of microservices implementation technologies as well as to focus more on business logic rather investing more time on network functions between services.
