---
date: 2023-03-21
title: 'different approaches for rendering web pages CSR and SSR'
template: post
featuredImage: '../thumbnails/nextjs.png'
thumbnail: '../thumbnails/nextjs.png'
slug: csr-and-ssr-approaches-for-rendering-page-data
categories:
  - nodejs
  - aws
  - react
  - microservices
tags:
  - nodejs
  - aws
  - react
  - microservices
---

![](https://miro.medium.com/v2/resize:fit:720/format:webp/0*TOGgNgGSIgZ2CxhL.jpg)

CSR and SSR are two different approaches for rendering web pages:
==================================================================

- Client-Side Rendering (CSR): In CSR, the web page is initially delivered as a bare-bones HTML document that includes JavaScript files. The browser then executes the JavaScript, which fetches data from an API and dynamically generates and renders the content on the client-side. This approach provides a smooth and interactive user experience as the page can update without requiring a full reload. Popular frameworks like React, Angular, and Vue.js are commonly used for CSR.

- Server-Side Rendering (SSR): In SSR, the server generates the complete HTML content of a web page, including the dynamic data, and sends it to the browser. The browser receives a fully rendered HTML page, which is ready for display. SSR is useful for improving initial page load times, enabling search engine optimization (SEO), and providing better support for non-JavaScript environments. Frameworks like Next.js (for React) and Nuxt.js (for Vue.js) simplify the implementation of SSR.

### Here are some key differences between CSR and SSR:

- Initial Load: CSR requires downloading the minimal HTML document and JavaScript files, and then rendering the page on the client-side. SSR sends a pre-rendered HTML document from the server, which can be displayed immediately.

- Performance: CSR may have slower initial page load times, especially if the JavaScript bundle is large. SSR delivers a pre-rendered page, which can improve perceived performance and SEO.

- SEO: CSR may face challenges with search engine indexing, as search engines might not execute JavaScript. SSR provides fully rendered HTML content to search engines, improving discoverability.

- Interactivity: CSR enables dynamic updates without page reloads, offering a more interactive experience. SSR requires page reloads for content updates.

- Fullstack Considerations: CSR typically relies on a separate API backend for data retrieval. SSR can directly fetch data from APIs on the server-side, simplifying development and reducing network requests.

Choosing between CSR and SSR depends on factors like project requirements, performance considerations, SEO needs, and development complexity. Some projects may even use a hybrid approach, combining both CSR and SSR for optimal performance and user experience.


## CSR (Client-Side Rendering)

CSR (Client-Side Rendering) with React involves rendering and updating components on the client-side using JavaScript in the browser. Here's how you can implement CSR with React:

Set up a React project by creating a new project directory and initializing it with Create React App (CRA) or another suitable method:

```sh
npx create-react-app my-app
cd my-app
```
Define your React components by creating JavaScript files in the src directory. For example, create a HelloWorld.js component:


```js
import React from 'react';

const HelloWorld = () => {
  return <h1>Hello, World!</h1>;
};

export default HelloWorld;
```

Create the main entry point for your React app in src/index.js. Import the necessary dependencies and render your root component to the DOM:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './HelloWorld';

ReactDOM.render(<HelloWorld />, document.getElementById('root'));
```
Start the development server by running:

```sh
npm start
```

This will launch your React app in the browser, and you should see the "Hello, World!" message.

To handle dynamic updates and data fetching, you can use React's built-in state management (useState, useEffect) or external libraries like Redux or Apollo for more complex scenarios.

With CSR in React, the initial HTML page contains the basic structure and a script tag that loads the bundled JavaScript files. The browser downloads the JavaScript files, executes them, and renders the React components on the client-side. Subsequent interactions and updates occur within the browser without full page reloads.

Note that CSR might not be suitable for all scenarios, especially when SEO or initial load performance is critical. In those cases, you may consider Server-Side Rendering (SSR) with React using frameworks like Next.js or Gatsby.

## Server-Side Rendering (SSR)

Server-Side Rendering (SSR) with React using Next.js, a popular framework specifically designed for SSR:

Install Next.js globally (if not already installed):

```sh
npm install -g next
```

Create a new Next.js project:

```sh
npx create-next-app my-app
cd my-app
```

Define your React components by creating JavaScript files in the pages directory. For example, create a HelloWorld.js component inside pages:

```js

import React from 'react';

const HelloWorld = () => {
  return <h1>Hello, World!</h1>;
};

export default HelloWorld;
```

Start the development server:

```sh
npm run dev
```

This will launch your Next.js app in development mode.

Visit http://localhost:3000 in your browser, and you should see the "Hello, World!" message rendered on the server-side.

Next.js automatically performs SSR by generating the HTML content on the server-side and sending it to the browser. This improves initial page load times, allows search engines to index your content, and enables better performance in non-JavaScript environments.

In addition to the pages directory, Next.js provides several other features and directories to handle routing, data fetching, and other SSR-related tasks. You can learn more about Next.js by referring to its official documentation and exploring its advanced features like data fetching with getServerSideProps or getStaticProps.

Remember that SSR in Next.js provides a powerful toolset for building dynamic and performant web applications, but it may introduce additional complexity compared to Client-Side Rendering (CSR) with React. Choose the rendering approach based on your project's requirements and trade-offs between performance, SEO, and development complexity.