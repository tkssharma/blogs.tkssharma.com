---
date: 2024-05-03
title: 'Understand Node JS Stream for API development'
template: post
featuredImage: '../thumbnails/nodejs.png'
thumbnail: '../thumbnails/nodejs.png'
slug: understand-nodejs-stream-for-api-development-end-to-end
categories:
  - nodejs
  - nestjs
  - javascript
tags:
  - nodejs
  - nestjs
  - javascript
---

# Streams in Node.js
----------------------

Streams enable efficient file I/O operations, especially when dealing with large files. Loading entire file contents into memory can be impractical or impossible. Instead, streams allow processing files chunk by chunk, reducing memory overhead.

For example, use the `fs` module's `createReadStream()` method to read a large file as a stream:

```js

const fs = require('fs');  
  
const readStream = fs.createReadStream('large_file.txt');  
  
readStream.on('data', (chunk) => {  
  console.log(`Received chunk: ${chunk}`);  
  // Process the chunk  
});  
  
readStream.on('end', () => {  
  console.log('File read complete');  
});

Similarly, use `createWriteStream()` to write to a file as a stream:

const fs = require('fs');  
  
const readStream = fs.createReadStream('large_file.txt');  
  
readStream.on('data', (chunk) => {  
  console.log(`Received chunk: ${chunk}`);  
  // Process the chunk  
});  
  
readStream.on('end', () => {  
  console.log('File read complete');  
});
```

By using streams for file I/O, we can efficiently process large files without loading entire contents into memory.

Use case 2 — HTTP Responses
===========================

Streams enable efficient handling of large amounts of data in HTTP responses by allowing direct streaming without buffering everything in memory. This approach prevents memory overload and enables real-time data processing.

For example, check out the following HTTP server that streams data directly to the response:

```js

const http = require('http');  
  
http.createServer((req, res) => {  
  const stream = fs.createReadStream('large_file.txt');  
  stream.pipe(res);  
}).listen(3000);
```

In this example, we have created an HTTP server that streams the contents of a large file directly to the response using the `pipe()` method. This approach enables efficient handling of large files without loading them entirely into memory.

By using streams for HTTP responses, we can efficiently handle large amounts of data and prevent memory overload, enabling real-time data processing and improved performance.

Use case 3 — Data Processing
============================

Streams enable building data processing pipelines where data flows through multiple stages, each processing a part of the data as it becomes available. This approach allows for efficient, real-time data processing and transformation.

Take a look at the following examples that uses the `stream` module to create a pipeline that processes data in multiple stages:

```js
const stream = require('stream');  
  
const stage1 = new stream.Transform({  
  transform(chunk, encoding, callback) {  
    // Process chunk  
    callback(null, chunk);  
  }  
});  
  
const stage2 = new stream.Transform({  
  transform(chunk, encoding, callback) {  
    // Process chunk  
    callback(null, chunk);  
  }  
});  
  
const stage3 = new stream.Transform({  
  transform(chunk, encoding, callback) {  
    // Process chunk  
    callback(null, chunk);  
  }  
});  
  
readStream.pipe(stage1).pipe(stage2).pipe(stage3).pipe(writeStream);
```

In this example, a pipeline was created with three stages, each processing a part of the data as it becomes available. The `pipe()` method connects each stage, enabling data to flow through the pipeline.

By using streams for data processing pipelines, we can build efficient, real-time data processing workflows that scale and handle large amounts of data with ease.

Use case 4 — Real-time Data
===========================

Streams enable handling real-time data sources like sensor data, logs, or network packets by processing them as they arrive, without waiting for the entire dataset. This approach allows for immediate insights, timely reactions, and efficient processing.

For example, use the `stream` module to process real-time sensor data:

const sensorStream = new stream.PassThrough();  
```js

sensorStream.on('data', (chunk) => {  
  // Process chunk immediately  
  console.log(`Received sensor data: ${chunk}`);  
});  
  
// Simulate sensor data arrival  
setInterval(() => {  
  sensorStream.write('Sensor data packet');  
}, 1000);
```

In this example, we have created a stream to process sensor data as it arrives. The code listens for the `data` event and process each chunk immediately. The `setInterval()` function simulates sensor data arrival every second.

Use case 5 — Compression/Decompression
======================================

Streams enable on-the-fly compression and decompression of data, reducing memory footprint and improving performance when dealing with large datasets. This approach allows for efficient data processing and transfer.

The following example uses the `zlib` module to compress and decompress data using streams:

```js
const zlib = require('zlib');  
const compressStream = zlib.createGzip();  
const decompressStream = zlib.createGunzip();  
  
readStream.pipe(compressStream).pipe(writeStream);  
readStream.pipe(decompressStream).pipe(writeStream);
```

In this example, compression and decompression streams were created using `zlib`. The code pipes the read stream to the compression stream, which compresses the data on-the-fly, and pipes the compressed data to the write stream. Similarly, we pipe the read stream to the decompression stream, which decompresses the data on-the-fly, and pipe the decompressed data to the write stream.

By using streams for compression and decompression, we can efficiently process and transfer large datasets, reducing memory usage and improving performance.

Use case 6 — Database Operations
================================

Streams enable efficient data transfer between databases and Node.js applications, especially when dealing with large result sets or bulk data inserts/updates. This approach reduces memory overhead and improves performance.

For example, the following snippet uses the `mysql` module to stream data from a database query:

```js
const mysql = require('mysql');  
  
const db = mysql.createConnection({  
  host: '(link unavailable)',  
  user: 'username',  
  password: 'password',  
  database: 'database'  
});  
  
db.query('SELECT * FROM large_table')  
  .stream()  
  .pipe(writeStream);
```

In the above example, we have created a MySQL connection and query a large table. This follows by a call to `stream()` on the query result, which returns a readable stream. The result is piped to a write stream, which writes the data to a file or another destination.

By using streams for database operations, we can efficiently transfer large datasets, reducing memory usage and improving performance. This approach is particularly useful for bulk data inserts, updates, and data migrations.

Use case 7 — Concurrency Control
================================

Streams enable concurrency control by managing the flow of data, ensuring optimal resource utilization and preventing memory exhaustion. This approach allows for efficient handling of multiple concurrent operations, such as handling multiple requests or processing large datasets in parallel.

Check the following example that uses the `stream` module to control the concurrency of data processing:
```js
const stream = require('stream');  
const concurrentLimit = 5;  
  
const concurrencyControlStream = new stream.PassThrough({  
  concurrent: concurrentLimit,  
});  
  
readStream.pipe(concurrencyControlStream).pipe(writeStream);
```

In this example, a pass-through stream was created with a concurrency limit of 5. This means that only 5 chunks of data will be processed concurrently. If more data is available, it will be buffered until one of the concurrent processing slots becomes available.

Use case 8 — Stream-Based APIs
==============================

Streams enable the implementation of APIs that consume or produce streams, allowing for seamless integration with other libraries or systems that also support streaming data. This approach enables efficient and real-time data processing, transformation, and transfer between systems.

An echo example is as follows:

```js
const http = require('http');  
  
http.createServer((req, res) => {  
  req.pipe(res);  
}).listen(3000);
```

In this example, we have created an HTTP server that consumes the request stream and pipes it directly to the response stream. This enables real-time data transfer and processing.

By using streams in APIs, we can:

*   Enable real-time data processing and transfer
*   Integrate with other streaming libraries and systems
*   Improve performance and efficiency
*   Handle large datasets and high-volume data streams

Use case 9 — Logging
====================

Streams enable logging data to be streamed to various destinations, such as files, databases, or third-party services, in real-time. This allows for immediate monitoring and analysis of application behavior, enabling swift detection and response to errors, performance issues, and security threats.

The following snippet uses the `morgan` middleware to stream logs to a file:

```js
const express = require('express');  
const morgan = require('morgan');  
const app = express();  
  
app.use(morgan('combined', {  
  stream: fs.createWriteStream('access.log', { flags: 'a' })  
}));

```

In this example, we have used the `morgan` middleware to stream logs to a file named `access.log` in the combined format.

By using streams for logging, we can:

*   Enable real-time monitoring and analysis
*   Stream logs to multiple destinations
*   Improve application performance and security
*   Enhance debugging and troubleshooting capabilities

Use case 10 — Network Communication
===================================

Streams enable efficient data transfer over network sockets, facilitating communication between distributed systems or microservices. This approach allows for real-time data exchange, making it ideal for scenarios like file transfer, real-time messaging, and live updates.

For example, use the `net` module to create a TCP server that streams data to connected clients:

```js
const net = require('net');  
  
const server = net.createServer((socket) => {  
  // Stream data to the client  
  readStream.pipe(socket);  
});  
  
server.listen(3000);

```

The above example creates a TCP server that pipes data from a read stream to connected clients, enabling real-time data transfer.

By using streams for network communication, we can:

*   Enable real-time data exchange
*   Facilitate efficient communication between distributed systems or microservices
*   Improve performance and scalability

Thanks for reading this article!