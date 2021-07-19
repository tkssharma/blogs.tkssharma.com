---
date: 2020-02-28
title: 'Swagger Documentation for Node JS Application'
template: post
thumbnail: '../thumbnails/node.png'
slug: swagger-for-nodejs-application
categories:
  - Popular
  - NodeJS
tags:
  - NodeJS
---


# Swagger with Existing Node app for API definition


[tkssharma/Training-App-Node-Api
*Training-App-Node-Api — Node js API for my own application*github.com](https://github.com/tkssharma/Training-App-Node-Api)

## Swagger

Swagger is a [specification](http://swagger.io/specification/) for describing, producing, consuming, testing, and visualizing a RESTful API. It provides a number of [tools](http://swagger.io/tools/) for automatically generating documentation based on a given endpoint.

Now when you make changes to your code, your documentation is updated and synchronized with the API so that consumers can quickly learn which resources are available, how to access them, and what to expect (status code, content-type, etc.) when interacting with the various endpoints.

## Getting Started

## Starting a New Project

If you’re starting a new project, you can easily generate the [Swagger Specification](http://swagger.io/specification/) and project boilerplate using the [Swagger Editor](http://swagger.io/swagger-editor/). Test it out [here](http://editor.swagger.io/#/).

If you don’t like the generated project structure, you can just export the JSON (or YAML) spec file and then use a custom generator, like [Swaggerize Express](https://github.com/krakenjs/swaggerize-express), to generate the boilerplate. Then when you need to make changes to the API, you can just update the spec file. Simple.

## Generating the Swagger Spec

To generate the [Swagger specification](http://swagger.io/specification/), we will be using [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc).

Install swagger-jsdoc:

$ npm install swagger-jsdoc@1.3.0 --save

Add the requirement to *app.js*:

var swaggerJSDoc = require('swagger-jsdoc');

Then add the following code to *app.js* just below var app = express();

    // swagger definition
    var swaggerDefinition = {
      info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
      },
      host: 'localhost:3000',
      basePath: '/',
    };

    // options for the swagger docs
    var options = {
      // import swaggerDefinitions
      swaggerDefinition: swaggerDefinition,
      // path to the API docs
      apis: ['.//routes/*.js','routes.js'],// pass all in array

    };

    // initialize swagger-jsdoc
    var swaggerSpec = swaggerJSDoc(options);

Take note of the comments above. This code essentially initializes swagger-jsdoc and adds the appropriate metadata to the Swagger specification.

Add the route to serve up the Swagger spec:

    *// serve swagger* app.get('/swagger.json', function(req, res) {   res.setHeader('Content-Type', 'application/json');   res.send(swaggerSpec); });

Fire up the server and navigate to [http://localhost:3000/swagger.json](http://localhost:3000/swagger.json) to see the basic spec:

    {
      info: {
        title: "Node Swagger API",
        version: "1.0.0",
        description: "Demonstrating how to describe a RESTful API with Swagger"
      },
      host: "localhost:3000",
      basePath: "/",
      swagger: "2.0",
      paths: { },
      definitions: { },
      responses: { },
      parameters: { },
      securityDefinitions: { }
    }

Now we need to update the routes…

## Updating the Route Handlers

swagger-jsdoc uses [JSDoc](http://usejsdoc.org/)-style comments to generate the Swagger spec. So, add such comments, in YAML, to the route handlers that describe their functionality.

## HTTP GET

    /
     * [@swagger](http://twitter.com/swagger)
     * /api/users:
     *   get:
     *     tags:
     *       - users
     *     description: Returns all users
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of users
     *         schema:
     *           $ref: '#/definitions/users'
     */

Add the comments in */routes/index.js* just above the handler, like so:

This should be fairly self-explanatory. We have an /api/users endpoint that returns a 200 response to a GET request. The $ref is used to re-use definitions to keep the code DRY.

Add the following code above the previous code to get $ref

    /
     * [@swagger](http://twitter.com/swagger)
     * definition:
     *   users:
     *     properties:
     *       name:
     *         type: string
     *       email:
     *         type: string
     *       age:
     *         type: integer
     *       sex:
     *         type: string
     */

Now we can use that definition for each of the HTTP methods.

For more information and examples, please see the [Swagger Specification](http://swagger.io/specification/).

## HTTP POST

    /
     * [@swagger](http://twitter.com/swagger)
     * /api/users:
     *   post:
     *     tags:
     *       - users
     *     description: Creates a new user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: tarun
     *         description: user object
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/user'
     *     responses:
     *       200:
     *         description: Successfully created
     */

## HTTP PUT

    /
     * [@swagger](http://twitter.com/swagger)
     * /api/users/{id}:
     *   put:
     *     tags: users
     *     description: Updates a single user
     *     produces: application/json
     *     parameters:
     *       name: tarun
     *       in: body
     *       description: Fields for the user resource
     *       schema:
     *         type: array
     *         $ref: '#/definitions/user'
     *     responses:
     *       200:
     *         description: Successfully updated
     */

## HTTP DELETE

    /
     * [@swagger](http://twitter.com/swagger)
     * /api/users/{id}:
     *   delete:
     *     tags:
     *       - users
     *     description: Deletes a single user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: user's id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: Successfully deleted
     */

Check out the updated spec at [http://localhost:3000/swagger.json](http://localhost:3000/swagger.json).

## Adding Swagger UI

### Finally, download the [Swagger UI repo](https://github.com/swagger-api/swagger-ui), add the “dist” folder from the downloaded repo to the “public” folder in the project directory, and then rename the directory to “api-docs”.

Now within *index.html* inside the “api-docs” directory just update this line-

url = "http://petstore.swagger.io/v2/swagger.json";

To

url = "http://localhost:3000/swagger.json";

Finally, navigate to [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/) in your browser to test out the API endpoints:

final my server look like this and app is running on port 3000

    import swagger from 'app/swagger';

    let app = express();
    app.use(express.static(path.join(__dirname, 'public')));
    //---------------------------------------------//
    // invoke routes, MIddleware, Mongo connect here
    new MongoConnect();
    new AppMiddleware(app);
    new AppRoutes(app, express);
    new swagger(app);

    //---------------------------------------------//
    let server = app.listen(
        app.get('port'),
        () => {
            const port = process.env.port || server.address().port;
            winston.log('info', `GenNext API running at [http://localhost:${port}`](http://localhost:${port}`))
            console.log('runing...')
        }
    );
    export default app;

Let me know if any issues while doing app setup.

Keep learning ….
