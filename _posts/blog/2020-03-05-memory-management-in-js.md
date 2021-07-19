---
date: 2020-03-05
title: 'Deep dive Express Router Node JS'
template: post
thumbnail: '../thumbnails/node.png'
slug: express-router-node-js
categories:
  - Popular
  - Javascript
  - express
  - NodeJS
tags:
  - Javascript
---


What is Routing ?
-----------------

Routing is basically matches the functions you wrote with the requests that server gets. For get requests rendering the correct page and For post requests handling the post with correct function.

How to route ?
--------------

I am not going to show you the easiest way instead I will show you one of the bests practises.
Lets start with our server/app.js file
```javascript
const routes = require('./api/routes');
app.use("/", routes);
```

Add this lines to your server/app.js file. Here we say that our routes folder will be in /api/routes/ and we say express to use it.
The hierarchy of the routes folder.

```javascript
api/routes
├── index.js
├── root.js
├── account.js
```

Every routes folder should have an index.js file. The index.js file does the subrouting process like urls start with “/account” are routed in the account.js etc.
Content of index.js
```javascript
const express = require("express");
const rootRoutes = require('./root');
const accountRoutes = require('./account.js');
const router = express.Router();
router.use("/", rootRoutes);
router.use("/account", accountRoutes);
module.exports = router;
```
Here we say to express that the routes start with “/account ” will be taken care of at account.js file and the other routes will be taken care of at root.js file.
Content of root.js

```javascript
const express = require("express");
const mainController = require("../controllers/main");
const router = express.Router();
router
  .route("/")
  .get(mainController.landingPage);
router
  .route("/dashboard")
  .get(mainController.dashboardPage);
module.exports = router;
```
Here we define one of our controllers as mainController to access its functions. Then we route the get requests for landing page and dashboard page to handling functions in our controller which renders the responding page.
Content of account.js

```javascript
const express = require("express");
const accountController = require("../controllers/account");
const router = express.Router();
router
  .route("/login")
  .get(accountController.loginPage)
  .post(accountController.userLogin);
router
  .route("/signup")
  .get(accountController.signupPage)
  .post(accountController.createUser);
router
  .route("/logout")
  .get(accountController.logout);
module.exports = router;
```
Here we did thing similar to we did in root.js except handling the post requests.
Routing pathway

We have build an simple routing example. If some one send a get request to /account/login this request first gets handled by server/app.js file then it passes this request to api/routes/index.js file and index.js file handles the subrouting process and passes this request to api/routes/account.js file and finally here this request gets passed to the responding function in controller.

Let's deep dive into object’s methods, including all , param , and methods for listening to specific kinds of requests.

## Methods

### router.all(path, [callback, …] callback)

The router.all method takes a callback for handling all kinds of requests.

We can pass in a constant path, or a string with the path pattern or a regex.

For example, we can pass in middleware that’s run for all routes attached to the router as follows:
```javascript

    const express = require('express');
    const bodyParser = require('body-parser');

    const app = express();
    const fooRouter = express.Router();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const mw1 = (req, res, next) => {
      console.log('middleware 1 called');
      next();
    }

    const mw2 = (req, res, next) => {
      console.log('middleware 2 called');
      next();
    }

    fooRouter.all('*', mw1, mw2);

    fooRouter.get('/', (req, res) => {
      res.send('foo');
    })

    app.use('/foo', fooRouter);

    app.listen(3000, () => console.log('server started'));
```
Then we get:


    middleware 1 called
    middleware 2 called

if we make a request to /foo since anything that starts with /foo routes through the fooRouter , and we have the fooRouter.all method call with the middlewares passed in.

Equivalently, we can write:
```javascript
    const express = require('express');
    const bodyParser = require('body-parser');

    const app = express();
    const fooRouter = express.Router();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const mw1 = (req, res, next) => {
      console.log('middleware 1 called');
      next();
    }

    const mw2 = (req, res, next) => {
      console.log('middleware 2 called');
      next();
    }

    fooRouter.all('*', mw1);
    fooRouter.all('*', mw2);

    fooRouter.get('/', (req, res) => {
      res.send('foo');
    })

    app.use('/foo', fooRouter);

    app.listen(3000, () => console.log('server started'));
```
They’re the same as long as the order of fooRouter.all is called in the same as the order the callbacks are passed in.

### router.METHOD(path, [callback, …] callback)

router.METHOD is for handling requests with the given method. For example, router.get for handling GET requests, router.post for handling POST requests, etc.

router.get also automatically calls for the HTTP HEAD in addition to the GET method if router.head wasn’t called.

We can provide multiple callbacks and they’re all treated equally. These callbacks may invoke the next('route') call to bypass the remaining route callbacks.

For example, we can use it as follows:
```javascript
    const express = require('express');
    const bodyParser = require('body-parser');

    const app = express();
    const fooRouter = express.Router();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    fooRouter.get('/', (req, res) => {
      res.send('foo');
    })

    app.use('/foo', fooRouter);

    app.listen(3000, () => console.log('server started'));
```
Then when we make a request to /foo , we get back foo .

We can also pass in a regex for the route path . For example, we can write:
```javascript
    const express = require('express');
    const bodyParser = require('body-parser');

    const app = express();
    const fooRouter = express.Router();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    fooRouter.get('/ab+c/', (req, res) => {
      res.send('foo');
    })

    app.use('/foo', fooRouter);

    app.listen(3000, () => console.log('server started'));
```
to listen to requests for paths /foo/abc , /foo/abbc , /foo/abbbc , etc., since we specified in the regex that we look for any number of the character b in the path.

### router.param(name, callback)

router.param lets us trigger a callback function call when a specific parameter is passed in when the request is made from the client.

name is the parameter placeholder name that we look for.

The parameters of the callback function are:

* req, the request object.

* res, the response object.

* next, indicating the next middleware function.

* The value of the name parameter.

* The name of the parameter.

For example, we can use it as follows:
```javascript
    const express = require('express');
    const bodyParser = require('body-parser');

    const app = express();
    const fooRouter = express.Router();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    fooRouter.param('name', (req, res, next, name) => {
      req.name = name;
      next();
    })

    fooRouter.get('/:name', (req, res) => {
      res.send(req.name);
    })

    app.use('/foo', fooRouter);

    app.listen(3000, () => console.log('server started'));
```
Then we make a request to /foo/abc then we get abc since the fooRouter.param found the name parameter was passed in with the URL.

The name parameter has the value 'abc' because it grabbed the part after /foo/ and then we assigned name to req.name and called next .

After that, the route handler we passed into foorRouter.get is called, then we passed req.name into res.send and sent it as the response.

## Conclusion

The Express router lets us create sub-apps of an Express app so we don’t have to add all the route handlers and middlewares to the main app.

With the all method, we can listen to all kinds requests. We can also listen to specific kinds of requests like GET or POST requests with the respective methods. They all take a string or regex path and a route handler callback.

Finally, we have the param method to get route parameters and do what we want with it.
