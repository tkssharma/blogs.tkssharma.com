---
date: 2020-02-12
title: 'Node JS Application Performance matrix || Tools'
template: post
thumbnail: '../thumbnails/node.png'
slug: node-js-application-monitoring-matrix
categories:
  - Popular
  - NodeJS
tags:
  - NodeJS
---

[Node Application Metrics Dashboard](https://developer.ibm.com/node/monitoring-post-mortem/application-metrics-node-js/) (app metrics-dash) provides a very easy-to-use web based dashboard to show the performance metrics of your running Node.js application.

If you want to add the dashboard to all HTTP servers created by your application then simply add: This is what you need to run this tool on

### [http://localhost:PORT/appmetrics-dash](http://localhost:3000/appmetrics-dash)
> #### // Before all other ‘require’ statements:
> #### require(‘appmetrics-dash’).attach();

to the very top of your main JavaScript source file or there are other ways also like you can use preloading:

    $ node --require appmetrics-dash/attach app.js

or in Node.js from versions 8.0.0 and 6.12.0 onwards, use the NODE_OPTIONS environment variable:

    $ export NODE_OPTIONS="--require appmetrics-dash/attach"

If you want to add the dashboard to one specific HTTP server then use:

```javascript
 var dash = require('appmetrics-dash');
    // Other 'require' statements here
    // Create HTTP server 'myHttpServer' here
dash.monitor({server: myHttpServer});
```

If you are not creating an HTTP server then use:
```javascript
require('appmetrics-dash').monitor();
```

or run your program with

    $ node --require appmetrics-dash/monitor app.js

or via the NODE_OPTIONS environment variable:

    $ export NODE_OPTIONS="--require appmetrics-dash/monitor"

This creates a new server for the dashboard on port 3001 by default. The path defaults to /appmetrics-dash. E.g. [http://localhost:3001/appmetrics-dash](http://localhost:3001/appmetrics-dash)

The data available on the dashboard is as follows:

* CPU Profiling (via a separate tab)

* HTTP Incoming Requests

* HTTP Throughput

* Average Reponse Times (top 5)

* CPU

* Memory

* Heap

* Event Loop Times

* Environment

* Other Requests

* HTTP Outbound Requests

As well as displaying data, it also provides the ability to generate both [Node Report](https://www.npmjs.com/package/node-report/) and Heap Snapshots directly from the dashboard. The Node Report will display in a new tab in the browser whilst the Heap Snapshot will be written to disk for loading into the Chrome DevTools for analysis. These can both be triggered from the options menu in the top left of the screen

The dashboard uses [Node Application Metrics](https://developer.ibm.com/open/node-application-metrics/) to monitor the application.

## Installation

    npm install appmetrics-dash

## Performance overhead

Our testing has shown that the performance overhead in terms of processing is minimal, adding less than 0.5 % to the CPU usage of your application. The additional memory required is around 30 MB to gather information about your system and application which is then visualized in the dashboard.

We gathered this information by monitoring the sample application [Acme Air](https://github.com/acmeair/acmeair-nodejs/). We used MongoDB as our datastore and used JMeter to drive load though the program. We have performed this testing with Node.js version 6.10.3

## API Documentation

## attach(options)

* options {Object} Options are the same as for dash.monitor().

Auto-attach to all http servers created after this call, calling dash.monitor(options) for every server.

Simple example using attach

    var dash = require('appmetrics-dash');
    dash.attach();

    var http = require('http');

    const port = 3000;

    const requestHandler = (request, response) => {  
      response.end('Hello')
    }

    const server = http.createServer(requestHandler);

    server.listen(port, (err) => {  
      if (err) {
        return console.log('An error occurred', err)
      }
      console.log(`Server is listening on ${port}`)
    });

## monitor(options)

* options.url {String} Path to serve dashboard from. Optional, defaults to '/appmetrics-dash'.

* options.console {Object} Some messages are printed to the console using console.log() and console.error(). Optional, defaults to the global console object.

* options.server {Object} An instance of a node http server to serve the dashboard from. Optional, default is to create a server (see port and host).

* options.port {String|Number} Port to listen on if creating a server. Optional, unused if server option is used.

* options.host {String} Host to listen on if creating a server. Optional, unused if server option is used.

* options.appmetrics {Object} An instance of require('appmetrics') can be injected if the application wants to use appmetrics, since it is a singleton module and only one can be present in an application. Optional, defaults to the appmetrics dependency of this module.

* options.node-report {Object} An instance of require('node-report') can be injected if the application wants to use node-report, since it is a singleton module and only one can be present in an application. Optional, defaults to the node-report dependency of this module.

* options.title {String} Title for the dashboard.

* options.docs {String} URL link to accompanying documentation.

* options.middleware {Object} Pass in middleware function to be used by server.

![](https://cdn-images-1.medium.com/max/3070/1*B4iO28RURImii0pa0huyUA.jpeg)

![](https://cdn-images-1.medium.com/max/2560/1*gopQjJUnHbMkv_6DOSRoyw.jpeg)

![](https://cdn-images-1.medium.com/max/2408/1*wubiLdGRfXsvXjsfEf71mg.png)

Conclusion :

User this tool to check performance of APIs locally before sending application to production. It is best tool available in Industry later you can use rewrelic and keymatrics.
