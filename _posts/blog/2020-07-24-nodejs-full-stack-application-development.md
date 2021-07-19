---
date: 2020-06-24
title: 'Full Stack Development Using React Node JS'
template: post
thumbnail: '../thumbnails/node.png'
slug: full-stack-application-nodejs-react
categories:
  - NodeJS
  - Popular
tags:
  - NodeJS
  - Interview
---
# Building a Full Stack Application with React and Node

Building a full stack application can be a daunting task for an inexperienced developer. This blog will cover instructions on how to build a simple app using the following:

1. Node: Development environment.

1. Express: Server framework.

1. Postgres: Database.

1. React: Frontend library/Single page rendering.

1. Webpack: Bundler.

We will be using the above technologies to build out a quotes application for showing off our favorite quotes. You’ll need a basic understanding of Javascript and SQL before learning Node and React. Make sure that Node is installed on your machine along with your preferred package manager. For this example I’m using npm. You’ll also need Postgres installed for the database. If you’re having difficulty following along check the github repository [here](https://github.com/H0sway/quotes-app).

## Getting Started

Once you’re ready, open up your terminal and create the folder for the app by entering mkdir quotes-app. Move into the app with cd quotes-app. Now that we’ve created the folder we’ll be running some commands to set up before we can start writing code. First, create a git repository by entering git init in the terminal. Even if you don’t plan on pushing this app to a remote repository it’s good keep youself familiar with best git practices like [feature branching](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). Create a .gitignore file and add in nodemodules/. Now run npm init so we can set up our dependencies later. We’ll install them as we need them so that I can explain what each one does. This will create a package.json file that will store all the dependencies we’ll be installing along with scripts for running the app and other information.

## Creating the Server

There are two main reasons to use Node to build a server over frameworks like Rails or Django: speed and freedom to customize. Javascript runs faster compared to languages like Ruby or Python that were built on Objective C because it loads asynchronously instead of synchronously. What this means is that a Ruby file will run a function and wait until it returns before loading the next function while a Javascript file will run functions one after the other. Rails is often preferred because it gives you things that Node doesn’t, like scaffolding to build out apps more quickly. The drawback is that it’s a lot harder to customize a Rails server. With Node you add what you want to add and configure it how you want to.

Create a new file by typing touch server.js. We’ll be building out our server here. Before doing anything complicated we’ll set up a simple “Hello World” message just to make sure everything is running properly. Install the express dependency with npm i -S express. Write the following code into the server.js file.

```javascript
    // server.js
    const express = require('express');
    const app = express();
    
    const PORT = process.env.PORT || 3000;
    
    app.get('/', (req, res) => {
      res.send('Hello, world!');
    });
    
    app.listen(PORT, () => {
      console.log(`App is up and running. Listening on port ${PORT}`);
    });
```

Express is the framework for the server. We’ve set the port to 3000 for this app. Test to make sure everything’s running properly by typing node server.js into the command line and opening your browser to [http://localhost:3000/](http://localhost:3000/). If all is working you should see “Hello world!” in the browser and “App is up and running. Listening on port 3000” in the terminal. Congratulations, you just built an express server! Close out of it using ctrl+c.

## Setting up the Database

Here we’ll be setting up the Postgres database. For this app we’ll only need one table for the quotes. In your terminal create the database by running createdb quotes-app. Once the database is completed we need to add a table for the quotes and populate it with information. Create a new directory inside of the qoutes app folder and call it db. Add two directories inside of db called migrations and seeds. Now we need to add a migration file. If you end up needing multiple migration files it’s good practice to include a time stamp in the name. You can get this by running Date.now() in the Chrome console. Use this when creating your migration file. For example, I got 1542299195696 so I’m creating my migration file by running touch db/migrations/migration-1542299195696.sql. Add this to the migrations file.

```javascript
    -- db/migrations/migration-1542299195696.sql

    DROP TABLE IF EXISTS quotes;

    CREATE TABLE IF NOT EXISTS quotes (
      id BIGSERIAL PRIMARY KEY,
      quote TEXT,
      author VARCHAR(50)
    );
```

The id column is the unique identifier for each quote, every new entry will recieve an id number that incriments by 1 starting at 1. The quote column will store the quote text, and author will credit whoever said the quote. VARCHAR limits the characters used for that field (default is 255) so it’s useful when you don’t want something to get too long.

Now we need to run the migration file to set up the table within the database. There are a few ways to do this, but I prefer to run the following through the command line

```bash
    psql -d quotes-app -f db/migrations/migration-1542299195696.sql
```

With the table set up we need to populate it with some data. We’ll do this with a seed file. Touch qoutes.sql in db/seeds. Fill it with whatever quotes you like, but here’s what I added.

```javascript
    -- db/seeds/movies.sql

    INSERT INTO quotes (quote, author) VALUES
      (
        'Do I not destroy my enemies when I make them my friends?',
        'Abraham Lincoln'
      ),
      (
        'It is hard to fail, but it is worse never to have tried to succeed.',
        'Theodore Roosevelt'
      ),
      (
        'Never let the fear of striking out keep you from playing the game.',
        'Babe Ruth'
      ),
      (
        'Life is this crazy thing, and sometimes you go out like a buster.',
        'Joseph Marquez'
      ),
      (
        'In conclusion, I understand nothing about the anomaly, even after cashing the huge check I got for writing a book about it. ',
        'Stephen Hawking'
      ),
      (
        'Sometimes, I say the wrong thing. You may call it a bad EXPRESSion.',
        'Jason Andrada'
      ),
      (
        'We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.',
        'Marie Curie'
      ),
      (
        'Youre a genius, but youre also an idiot. But thats okay because Im also a genius and an idiot!',
        'Jason Zimmerman'
      ),
      (
        'I have always been more interested in the future than in the past.',
        'Grace Hopper'
      ),
      (
        'I have an IQ of 200. That means I know what I am thinking before I can even think it.',
        'Eugene Park'
      ),
      (
        'Up until they lose the game, they are winning.',
        'William Li'
      ),
      (
        'Dont worry. Youre just as sane as I am.',
        'Luna Lovegood'
      );
```

We don’t need to provide the id value, Postgres will automatically add that with each new row. Run this through Postgres now.

    psql -d quotes-app -f db/seeds/quotes.sql

With our database set up we need to connect the server to the database. Node won’t know automatically to look for quotes-app in Postgres so we need to tell it to look manually. Create a new file in db called config.js.
```javascript
    // db/config.js

    const options = {
      query: (e) => {
        console.log(e.query)
      }
    }

    const pgp = require('pg-promise')(options);

    const setDataBase = () => {
      if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV){
        return pgp({
          database: 'quotes-app',
          port: 5432,
          host: 'localhost'
        })
      }
      else if (process.env.NODE_ENV === 'production'){
        return pgp(process.env.DATABASE_URL)
      }
    }

    const db = setDataBase();
    module.exports = db;
```

This file says to look for the quotes-app database in port 5432, the default port for Postgres. Now all we need to do is install the pg-promise dependency by running npm install -S pg-promise. This will handle our calls to the database.

## MVC Structure

The MVC structure is used when building out servers. It stands for Models-Views-Controllers. The models provide functions for handling data, the controllers use those functions to handle that data and send it to the views to be rendered. Our views will be handled with React so for now we’ll be focusing on creating the models, routes, and controllers for this app.

### Models

Here’s where we’ll write the functions for interacting with the database. Create a new directory in your folder called models and add a file called quote.js. Now we need to decide how we want to interact with our database. Right now we want our app to be able to do two different things: grab every quote in the database and grab one specific quote.
```javascript
    // models/quotes.js

    // Import the database
    const db = require('../db/config');

    // Instantiate a new object.
    // This will interface with the quotes-app database.
    // Specifically, the quotes table.
    const Quote = {};

    // Define methods for the Quote object

    // Returns all quotes from the table
    Quote.findAll = () => {
      return db.query(
        `SELECT * FROM quotes`
      );
    };

    // Return one quote with the specific id
    Quote.findById = (id) => {
      return db.oneOrNone(
        `
          SELECT * FROM quotes
          WHERE id = $1
        `,
        [id]
      );
    };

    // Export the Quote object
    module.exports = Quote;
```

### Controllers

With the model methods all written it’s time to move on to the controllers. When the controller is called it’ll use the appropriate model method to interact with the database and send the response to the views through the routes. Once again, create a new folder for the controllers and create a file named quote-controller.js. We’ll need two methods again, one for handling a request for all quotes and one for a request for one specific quote.

```javascript
    // controllers/quote-controller.js

    // Import the Quote model.
    const Quote =  require('../models/quote');

    // Instantiate the controller object
    const quoteController = {};

    // Controller method for handling a request for all quotes
    quoteController.findAll = (req, res) => {
      // Uses the findAll method from Quote
      Quote.findAll()
      .then(quotes => {
        // Sends the quotes as a JSON object
        res.json({
          message: 'Success',
          data: quotes
        });
      })
      .catch(err => {
        // If something goes wrong it logs the error in the console and sends it as a JSON object
        console.log(err);
        res.status(500).json({err});
      });
    };

    // Controller method for handling a request for a single quote
    quoteController.findById = (req, res) => {
      // Quotes method for finding by id, passes the id as an argument
      Quote.findById(req.params.id)
      .then(quote => {
        // Sends the quote as a JSON object
        res.json({
          message: "Success",
          data: quote
        });
      })
      .catch(err => {
        // If something goes wrong it logs the error in the console and sends it as a JSON object
        console.log(err);
        res.status(500).json({err});
      });
    };

    // Export the controller
    module.exports = quoteController;
```

### Routes

The routes send the data to a URL where it can be seen and used as we want. Make another folder labelled routes and inside it put a file called quote-routes.js. Whenever a route is visited it’ll make a request to the server for data. All we want right now is to access information so we’ll be making two GET requests.
```javascript

    // routes/quote-routes.js

    // Import express
    const express = require('express');
    // Define the router using the express router
    const quoteRouter = express.Router();

    // Import the quotesController
    const quoteController = require('../controllers/quote-controller');

    // For each route access the correct controller method

    // Request all quotes, send it to the / route
    quoteRouter.get('/', quoteController.findAll);

    // Request single quote, send it to the /:id route
    quoteRouter.get('/:id', quoteController.findById);

    // Export the router
    module.exports = quoteRouter;
```

### Tying it all together

We’re now in the home stretch… for building the server. Now let’s set up our server.js file to handle everything we’ve just written when we run the server. First, we’re going to write a couple of scripts to run with npm for the server. Go into your package.json file and add the following scripts.

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node server.js",
        "dev": "nodemon server.js"
      },

This way we can run the app by typing npm start into the terminal. However, this won’t see any changes we’ve made to the server files unless we manually restart the server. We don’t have time for that, so we’re going to use an npm package called nodemon to watch the files for us and restart the server whenever we make changes. You can do this two ways. I prefer to have it installed globally on my machine (npm install -g nodemon), or if you’d prefer you can install it as a dev-dependency(npm install -D nodemon). Declare something a dev-dependency when you only intend to use it in development. You won’t be using nodemon when you deploy an application.

Back to the server.js file. We need to configure it so that it can handle the routes. Add the following line above the “Hello world” statement in your file.
```javascript
    // server.js

    // API Routes
    app.use('/api/quotes', require('../routes/quote-routes'));

    app.get('/', (req, res) => {
      res.send('Hello, world!');
    });
```

Now run npm run dev in your terminal. If everything’s working you should be able to see every quote you’ve added as a JSON object when you visit [http://localhost:3000/api/quotes](http://localhost:3000/api/quotes).

### Wrapping Up

So far we’ve created a quotes database, added a table, and seeded it with data. Then we built an express server and connected it to the database. We wrote models to tell the server how to interact with the database, controller methods to use those methods and send the data as a JSON object to the routes, which lets us access the data through the browser.

We’ve now finished building the Express server… kind of. We still need to configure it to work with React.

## Adding React

React is a Javascript library used for rendering single page applications. SPAs run faster than handling the views normally (embedded javascript for Node/Express) because instead of reloading the whole page they reload specific parts of the page called components based on how the user interacts with the page. Most websites, like Medium, are SPAs.

If you’re using Node to build out your server then React is a great choice to pair alongside it. Similarly to Node, React allows for greater customization compared to the next most popular single page framework, Angular. It doesn’t come with routing, forms, or scaffolding. You have to add whatever extra things you want in yourself, which can take more time but gives you greater control over your app. React is also written in Javascript while Angular is written in Typescript, which can take some time to learn.

### Reconfiguring the Server

Before we start building out our React frontend we have to reconfigure our server to handle the views through React. First, add an index.html file.
```html
    <!-- index.html -->

    <!DOCTYPE html5>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" type="text/css" href="./style.css">
        <title>Favorite Quotes</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/javascript" src="./bundle.js"></script>
      </body>
    </html>
```

Nothing too special here. Note the div with the id root and the bundle.js script. That’ll be for connecting our React files to the html file once they’ve been compiled. Same thing for the style.css file. We’ll get to these later.

Go back to the server.js file. We need to set it up to be able to render the React views once we’ve built them. For that we’ll need to install a dependency called path. It will help us find specific files in the quotes-app folder. Install it with npm install -S path. Now we need to add it to server.js and add in a few things. Edit your file to look like this.
```javascript
    // server.js

    const express = require('express');
    const app = express();

    // Set the port
    const PORT = process.env.PORT || 3000;

    // Import Path
    const path = require('path');

    // Static files
    app.use(express.static('build'));

    // API Routes
    app.use('/api/quotes', require('./routes/quote-routes'));

    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname + '/index.html'))
    });

    app.listen(PORT, () => {
      console.log(`App is up and running. Listening on port ${PORT}`);
    });
```

Now we’re importing in path and using it to tell the server to find the index.html file we’ll be using for the views. We’re also telling the server that static files will be in a folder called build, which is where we’ll store the aformentioned style.css and bundle.js files. Once again, we’ll go over that soon. The server will now handle any routes that aren’t handled by our quote-routes.js file and have our index.html file handle them. This will come into use when we set up our React routes.

### Configuring Webpack

Webpack is a bundler. It takes in files and puts them together in one file. We’ll be using it for compiling our React files together, including the components writted in Javascript and any CSS files we want to use for styling. They will become the bundle.js and style.css files called in index.html.

We need two new files, webpack.config.js and .babelrc. This is what we’ll be using to configure webpack. React components are written in ES6 Javascript, and some web browser (Internet Explorer) can’t handle ES6. Babel takes in ES6 and spits back ES5 code so that all web browsers can view the site.

To configure Babel we’ll first need to install some more dependencies. Please note that all your React dependencies should be saved as dev-dependencies since they’ll only be used for building out the frontend and not after your site has been deployed. For babel, you’ll need the following.

    npm install -D @babel/core babel-loader @babel/preset-env @babel/preset-react

Configure Babel in the .babelrc file.

    {
      “presets”: [“@babel/preset-env”, “@babel/preset-react”]
    }

Now we need to configure webpack. Install a few more dependencies.

    npm install -D extract-text-webpack-plugin@next html-webpack-plugin style-loader css-loader webpack webpack-cli

Each one of these dependencies will help webpack with taking in a file and sending out something else. html-webpack-plugin will handle the index.html file we recently created, extract-text-webpack-plugin, style-loader, and css-loader all handle CSS files, and the previously installed babel-loader handles our Javascript files. Now we just need to tell webpack where to find our react files, how to use the loaders, and where to send the outputted files.

Open up the webpack.config.js file and add the following code.

    // webpack.config.js

    // Import dependencies
    const path = require('path');
    // Handles css files
    const ExtractTextPlugin  = require('extract-text-webpack-plugin');
    // Spits out an index.html file in the build
    const HtmlWebPackPlugin = require('html-webpack-plugin');

    // Configure webpack
    const config = {
      // Entry point will be in the src folder, file will be named index.js
      entry: './src/index.js',
      // Send the files to the build folder, create one if it isn't present
        output: {
            path: path.resolve(__dirname,'build'),
            filename: 'bundle.js',
        },
      module: {
        rules: [
          {
            // For .js or .jsx files use babel-loader. Exclude node modules
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            // for .css files use css-loader. If that doesn't work use style-loader
            test: /\.css$/,
            use: ExtractTextPlugin.extract(
              {
                fallback: 'style-loader',
                use: 'css-loader'
              })
          }
        ]
      },
      plugins: [
        // Take the index.html file as a template and create a new one in the build folder
        new HtmlWebPackPlugin({
          template: "./index.html",
          filename: "./index.html"
        }),
        // Name the css file sent to the build folder style.css
        new ExtractTextPlugin({filename: 'style.css'})
      ]
    };

    // export the config onbject
    module.exports = config;

This is a complicated file if you’ve never seen anything like it before. Read the comments I’ve made for specific details about what each part of the file does. It’ll take everything we give it and output files into a build folder, creating one if one doesn’t exist. Go ahead and add build/ to your .gitignore file.

### React Components

### just bootstrap using create-react-app

Time to start building React components. Create a new directory called src and add two files inside, index.js and App.js. We set index.js to be the entry point for webpack in the webpack.config.js file already, now we need to create it. Finally, it’s time to start working with React. Go ahead and add the react and react-dom dependencies to our project.

    npm install -D react react-dom

Add the following to index.js.

    // src/index.js

    // Import react and react-dom
    import React from 'react';
    import ReactDOM from 'react-dom';

    // Import the App.js component, give react something to render
    import App from './App';

    // Import the css file
    import './index.css';

    // Attach the App component to the div with the id "root" in our index.html file
    ReactDOM.render(<App />, document.getElementById('root'));

This is telling webpack “Take the App file and attach it to the element #root. It’ll render everything we write in App.js inside of the root div. For fun, let’s create a basic reset css file called index.css. Put that file in the src directory. I’m going to use something simple, but feel free to use whatever you want.

    *{
     margin: 0;
     padding: 0;
    }

    ul, li {
     list-style: none;
    }

Now let’s spin up a “Hello World” message in App.css.

    // src/App.js

    // Import react and the component class
    import React, {Component} from 'react';

    class App extends Component {
      render() {
        return (
          <div className="App">
            Hello World!
          </div>
        )
      }
    };

    // Export the App component
    export default App;

A few things to note. I said previously that React was written in Javascript, but it’s actually written using something called JSX. It’s an extension for JS that let’s you write HTML codeinside of a JS file. For each react component write a render method inside of the class and return the html elements you want to use. React components can only return one element, so make sure everything you write is wrapped up inside of a div or similar. Since class means something in JS we used className in react when assigning an HTML element a class.

Now we’re almost finished with setting up the basics of React. The last step is to write another script inside of package.json to run webpack. Edit the scripts object to look like this.

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node server.js",
        "dev": "nodemon server.js",
        "build": "webpack --mode development"
      },

The — mode development flag tells webpack this app is in development (default is production). Like running node server.js webpack won’t see file changes automatically. You can change this by adding a — watch flag to the script as well.

With the scripts all set up enter npm run build in the terminal and wait for webpack to work it’s magic. If you’ve followed everything so far you should have a fully functional React app! You’ll need to have your Node server running if you want to see your “Hello World” message on display. It’ll be in the top left corner.

## React Routes, State, Lifecycle Methods, and API Calls

We’ve set up our database, seeded it with information, configured our server to handle that information, and built out a frontend to handle our views. All we need to do now is to show the quotes on our frontend. For this we’ll need to be able to make calls and have two different routes, one for the entire list of quotes and one for each individual quote. We’ll install two new dependencies, react-router-dom for routing and axios for making HTTP requests. React does come with fetch for HTTP requests, but I prefer to use axios. Note that axios shouldn’t be a dev-dependency if you’re planning on using it to make calls to 3rd party APIs in your server.

    npm install -S axios
    npm install -D react-router-dom

We’ll add routes to our App.js file. Router doesn’t like to be wrapped around by other HTML elements, so make sure you put it outside of the App div. Import BrowserRouter and add it into the file. Delete our “Hello World” message while you’re at it.

    // src/App.js

    // Import react and the component class
    import React, { Component } from 'react';
    // Import BrowserRouter
    import { BrowserRouter as Router, Route } from 'react-router-dom';

    class App extends Component {
      render() {
        return (
          <Router>
            <div className="App">

            </div>
          </Router>
        )
      }
    };

    // Export the App component
    export default App;

The router has been added, now all we need are to add in some components to show the quotes! For each route we’ll need a separate component, but for now let’s focus on what we want to render for the "/" route. Make a new directory in src called components and create a new file called Home.js. Fill it out with a basic structure, much like what we did with App.js before adding in the Router.

    // src/components/Home.js

    // Import react
    import React, { Component } from 'react';

    class Home extends Component {
      render() {
        return (
          <div className="Home">

    </div>
        )
      }
    };

    export default Home;

With Home all set up, it’s time to talk about two new concepts. Component lifecycle methods and state. You can read more about each in the [React documentation](https://reactjs.org/). Lifecycle methods are called at different points during the “life” of a component. The one we will be using here is named componentDidMount and is called after a component is succesfully loaded. In here we’ll be making a GET request to our server and saving the data we get to Home’s state. A component’s state is an object where we can store data, and every time state is changed the component renders again.

Here’s what our component will look like after we’ve defined the state and added in the componentDidMount method. Add the following code inside of the Home class, above the render method.

    // src/components/Home.js

    constructor() {
        super();
        // Define state
        this.state = {
          quotes: [],
          dataLoaded: false
        }
      }

    // Is called when the component succesfully loads
      componentDidMount() {
        // GET request to our server
        axios({
          method: 'GET',
          url: '/api/quotes'
        })
        // Saves the data to state. Only way to change the state is with setState
        .then(data => {
          this.setState({
            quotes: data.data.data,
            dataLoaded: true
          });
        })
        // logs an error
        .catch(err => {
          console.log(err);
        });
      }

We define the state in the class’s constructor. Quotes is an empty array since we’ll be receiving our data as an array, and we’ll use dataLoaded to tell the component to do something different when the data has loaded with an if statement. We’ll have the app render a “Loading…” message before the quotes have arrived, then tell it to render the list of quotes afterwards. Create a new method that takes this.state.quotes and loops through it, rendering each specific quote and the author. Put it between render and componentDidMount.

    renderQuotes() {
        if (this.state.dataLoaded) {
          return this.state.quotes.map(quote => {
            return (
              <div key={quote.id}>
                <p>{quote.quote}</p>
                <p className="author">{quote.author}</p>
              </div>
            )
          })
        }
        else {
          <p>Loading...</p>
        }
      }

Use curly brackets to write javascript inside of your html… inside of your javascript. Now we’ll add the renderQuotes method into the render method.

    render() {
        return (
          <div className="Home">
            <h1>These are my favorite quotes</h1>
            {this.renderQuotes()}
          </div>
        )
      }

Reload the page. You should see the quotes with each author loaded up now. It’s not pretty because there’s no CSS, but we can add some once we’ve finished the rest of our app.

Now we need to tell React to render this component when we load up the "/" route. Head back to App.js, import the Home component, and add it as a route inside of the App div.

    // src/App.js

    // import each component
    import Home from './components/Home';

    class App extends Component {
      render() {
        return (
          <Router>
            <div className="App">

              <Route exact path="/" component={Home} />

            </div>
          </Router>
        )
      }
    };

Create a new file called Quote.js inside of the components directory. We’ll be using this to load up a single quote. We’ll be writing it with similar logic to the previous component, except no need to map out the array because we’ll be getting only one quote.

    // src/components/Quote.js

    import React, { Component } from 'react';
    import { Link } from 'react-router-dom';
    import axios from 'axios';

    class Quote extends Component {
      constructor() {
        super();
        this.state = {
          quote: null,
          dataLoaded: false
        }
      }

    componentDidMount() {
        // Use string interpolation to get the id from the URL
        axios({
          method: 'GET',
          url: `/api/quotes/${this.props.match.params.id}`
        })
        .then(data => {
          this.setState({
            quote: data.data.data,
            dataLoaded: true
          })
        })
        .catch(err => {
          console.log(err);
        })
      }

    renderQuote() {
        const quote = this.state.quote;
        if (this.state.dataLoaded) {
          return (
            <div>
              <p className="quote">"{quote.quote}"</p>
              <p className="author">-{quote.author}</p>
            </div>
          )
        }
        else {
          return (
            <p>Loading...</p>
          )
        }
      }

    render() {
        return (
          <div className="Quote">
            <h3>I like this quote in particular</h3>
            {this.renderQuote()}
            <Link to="/">Back to Quotes</Link>
          </div>
        )
      }
    };

    export default Quote;

We’ll be getting the ID to search from the URL. But before we can do that we need to add the route to App.js. Add it underneath the route for the Home component.

    <Route exact path="/:id" component={Quote} />

What /:id is telling react is that for any route matching that path whatever comes after the / is the id. We can use that to make our GET request to the right Express route. Now head over to [http://localhost:3000/6](http://localhost:3000/6), or use any number. As long as there’s a quote with that id you should be able to see it.

Now let’s add a link to that route in the Home component. Open it up and add a new import line between importing React and axios.

    // src/components/Home.js

    import { Link } from 'react-router-dom';

We can’t use <a> tags to link to other routes in our app since we’re not really going to a new page, so we use Link from react router instead. Let’s add it to our renderQuotes method so that when someone clicks on the quote it takes them to that specific quote.

    renderQuotes() {
        if (this.state.dataLoaded) {
          return this.state.quotes.map(quote => {
            return (
              <div key={quote.id}>
                <Link to={`/${quote.id}`}>"{quote.quote}"</Link>
                <p className="author">-{quote.author}</p>
              </div>
            )
          })
        }
        else {
          <p>Loading...</p>
        }
      }

Now we should add a back button to the Quote component. Import Link in the same way, then edit the render function.

    // src/components/Quote.js

    render() {
        return (
          <div className="Quote">
            <h3>I like this quote in particular</h3>
            {this.renderQuote()}
            <Link to="/">Back to Quotes</Link>
          </div>
        )
      }

### Wrapping Up

Before starting with React we configured our express server to use the React files as the views. We set up Webpack and Babel to handle our React files and set out to working on our React app. We installed routing, created a view for listing every quote in our database, and created a view for handling one single quote at a time. We tied both views to a specific url and linked them together so that users can easily move from one to the other. We finished by giving our React components some styling.

