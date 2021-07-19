---
date: 2020-04-09
title: 'Auth0 Implementation with Angular and Node JS'
template: post
featured:  '../thumbnails/auth0-header.png'
thumbnail: '../thumbnails/auth0.png'
slug: Auth0-Implementation-with-Angular-and-NodeJS
categories:
  - Popular
  - OAuth2.0
tags:
  - Auth0
---

Auth0 is a flexible, drop-in solution to add authentication and authorization services to your applications. Your team and organization can avoid the cost, time, and risk that comes with building your own solution to authenticate and authorize users.

You can connect any application (written in any language or on any stack) to Auth0 and define the identity providers you want to use (how you want your users to log in).

Based on your app's technology, choose one of our SDKs (or call our API), and hook it up to your app. Now each time a user tries to authenticate, Auth0 will verify their identity and send the required information back to your app.

Why use Auth0?
-------------
Take a look at just a few of Auth0's use cases:

You built an awesome app and you want to add user authentication and authorization. Your users should be able to log in either with username/password or with their social accounts (such as Facebook or Twitter). You want to retrieve the user's profile after the login so you can customize the UI and apply your authorization policies.

- You built an API and you want to secure it with OAuth 2.0.
- You have more than one app, and you want to implement Single Sign-on (SSO).
- You built a JavaScript front-end app and a mobile app, and you want them both to securely access your API.
- You have a web app which needs to authenticate users using Security Assertion Markup Language (SAML).
- You believe passwords are broken and you want your users to log in with one-time codes delivered by email or SMS.
- If one of your user's email addresses is compromised in some site's public data breach, you want to be notified, and you want to notify the users and/or block them from logging in to your app until they reset their password.
You want to act proactively to block suspicious IP addresses if they make consecutive failed login attempts, in order to avoid DDoS attacks.
You are part of a large organization who wants to federate their existing enterprise directory service to allow employees to log in to the various internal and third-party applications using their existing enterprise credentials.
- You don't want (or you don't know how) to implement your own user management solution. Password resets, creating, provisioning, blocking, and deleting users, and the UI to manage all these. You just want to focus on your app.
- You want to enforce multi-factor authentication (MFA) when your users want to access sensitive data.
- You are looking for an identity solution that will help you stay on top of the constantly growing compliance requirements of SOC2, GDPR, PCI DSS, HIPAA, and others.
- You want to use analytics to track users on your site or application. You plan on using this data to create funnels, measure user retention, and improve your sign-up flow.
Which industry standards does Auth0 use?
Once upon a time, when computers were standalone systems, all the authentication and user data lived in a single machine. Times have changed, and now you can use the same login information across multiple apps and sites. This has been achieved through widespread adoption of identity industry standards across the web.

These are a set of open specifications and protocols that specify how to design an authentication and authorization system. They specify how you should manage identity, move personal data securely, and decide who can access applications and data.

The identity industry standards that we use here in Auth0 are:

- Open Authorization (OAuth) 1: the original standard for access delegation. Used as a way for a user to grant websites access to their information on other websites or apps, but without giving them the credentials.
- Open Authorization (OAuth) 2: an authorization standard that allows a user to grant limited access to their resources on one site, to another site, without having to expose their credentials. You use this standard every time you log in to a site using your Google account and you are asked if you agree with sharing your email address and your contacts list with that site.
- OpenID Connect (OIDC): an identity layer that sits on top of OAuth 2 and allows for easy verification of the user's identity, as well the ability to get basic profile information from the identity provider.
JSON Web Tokens (JWT): an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
- Security Assertion Markup Language (SAML): an open-standard, XML-based data format that allows businesses to communicate user authentication and authorization information to partner companies and enterprise applications their employees may use.
- WS-Federation (WS-Fed): a standard developed by Microsoft, and used extensively in their applications. It defines the way security tokens can be transported between different entities to exchange identity and authorization information.

## lets use Angular and Node js to do hands-on with Auth0

We'll use the Angular CLI to create and build out our Angular application. Make sure you have the CLI installed globally:

```bash
$ npm install -g @angular/cli
```
The other thing you'll likely want is an Angular Language Service extension for your editor or IDE of choice. The Angular Language Service provides Angular intellisense and autocompletion. To learn more about the Language Service, check out this summary of Day 3 of ng-conf 2017. Check your editor's extension database for "Angular Language Service" and install if found (instructions for VS Code, WebStorm, and Sublime Text are available here).

Create an Angular Project
Once the CLI and Language Service are installed, open a terminal or command prompt at the location you'd like your project folder created and run the following command:

```bash
 ng new mean-rsvp --routing --style scss
```

This creates and installs a new Angular project with a routing module and SCSS support.

Once the Angular CLI has finished creating the app and installing its dependencies, we're ready to get going on the basic customization necessary for our RSVP app.


Open the app.module.ts file and add the Title service to imports and to the providers array like so:
```javascript
// src/app/app.module.ts
import { BrowserModule, Title } from '@angular/platform-browser';
@NgModule({
  ...
  providers: [
    Title
  ],
  ...
})
```
Add Bootstrap
Now open the src/index.html file and add a link to the Bootstrap CSS on CDN like so:
```html
<!-- src/index.html -->
<head>
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
    crossorigin="anonymous">
</head>
```
Global SCSS
We'll now add some SCSS to manage global styling for our application. This will support basic layout and media queries.

First, open your src/assets folder and create a new scss folder. Now find the src/styles.scss file and move it into src/assets/scss.

Next, open the angular.json file. Find the styles property and change it to the following:
```json
      "styles": [
        "assets/scss/styles.scss"
      ],
```
Now our project will look for this file in the assets folder rather than in the root.


Auth0 Account and Setup
----------------------

Our Angular application and Node API will use the IDaaS (Identity-as-a-Service) platform Auth0 for authentication and route authorization.

Auth0 hosted login screen
Sign Up for a Free Auth0 Account
-------------------------------

You'll need an Auth0 account to manage authentication. You can sign up for a free account here. Next, set up an Auth0 application and API so Auth0 can interface with an Angular app and Node API.

Auth0 provides the simplest and easiest to use user interface tools to help administrators manage user identities including password resets, creating and provisioning, blocking and deleting users. A generous free tier is offered so you can get started with modern authentication.

Set Up an Application

- Go to your Auth0 Dashboard and click the "create a new application" button.
- Give your new app a name (for example: Wonder App) and select "Single Page Web Applications".
- In the Settings for your new Auth0 application, add http://localhost:8083/callback and http://localhost:4200/callback to the Allowed Callback URLs.
- In Allowed Web Origins, add http://localhost:8083 and http://localhost:4200.
- In Allowed Logout URLs, add http://localhost:4200.
- Make sure the Use Auth0 instead of the IdP to do Single Sign On toggle is enabled.

Scroll down to the bottom of the Settings section and click "Show Advanced Settings". Choose the OAuth tab and make sure the JsonWebToken Signature Algorithm is set to "RS256".
- If you'd like, you can set up some social connections. You can then enable them for your app in the Connections settings tab for your RSVP Mean App application. The example shown in the screenshot above utilizes username/password database, Facebook, Google, and Twitter.
- We added two ports to the callback URLs and allowed web origins because - we'll be running and testing the app from both during development. Port 4200 is the port the Angular CLI serves the Angular app from. Port 8083 is the port our Node API and server uses: this will be necessary in order to test -the production build. When we launch to a production URL, we can either create a new production Auth0 Application or add our production URL to the app as well.

Note: If you set up social connections, enter App/Client IDs as per the instructions for each connection instead of leaving those fields blank and using Auth0 dev keys. This will be important for token renewal and deployment later.

- Set Up an API
- Go to APIs in your dashboard and click the "Create API" button.
- Enter a name for the API (for example: RSVP MEAN API).
- Set the Identifier to your API endpoint URL. This identifier is the audience parameter on authorization calls. In our app, this is http://localhost:8083/api/.
The Signing Algorithm should be "RS256".


Node JS server setup using NestJS
---------------------------------

Node JS APIs
- https://github.com/tkssharma/ngrx-socketio-nestjs-apis-poc.git
Angular App for Auth0
- https://github.com/tkssharma/ngrx-socketio-web-poc 

Configuration we need in Node JS server 

```javascript
Configuration
Open the server/config.js file and add the following to it:

// server/config.js
module.exports = {
  AUTH0_DOMAIN: '[YOUR_AUTH0_DOMAIN]', // e.g., kmaida.auth0.com
  AUTH0_API_AUDIENCE: '[YOUR_AUTH0_API_NAME]', // e.g., 'http://localhost:8083/api/'
};
```
Replace the Auth0 domain, API audience
Using express-jwt and jwks-rsa with our Auth0 API, we can implement protection for selected API routes when necessary. We'll do this by adding a jwtCheck middleware function to routes we want to secure. We'll discuss this more later.

```javascript
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
module.exports = function(app, config) {
  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });
}
```
Lets plugin Angular Application with Auth0 and receive token from Auth0 
- Setting up auth0 profile is easy 
- Login to auth0 and create a simple angular application Auth profile 

Set Up an Application
--------------------

- Go to your Auth0 Dashboard and click the "create a new application" button.
- Give your new app a name (for example: Wonder App) and select "Single Page Web Applications".
- In the Settings for your new Auth0 application, add http://localhost:8083/callback and http://localhost:4200/callback to the Allowed Callback URLs.
- In Allowed Web Origins, add http://localhost:8083 and http://localhost:4200.
- In Allowed Logout URLs, add http://localhost:4200.
- Make sure the Use Auth0 instead of the IdP to do Single Sign On toggle is enabled.

Now you can add all client side configuration 
```javascript
interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
};
export const AUTH_CONFIG: AuthConfig = {
  NAMESPACE: 'http://myapp.com/roles'
  CLIENT_ID: '-------------------------',
  CLIENT_DOMAIN : 'tkssharma.auth0.com',
  REDIRECT : 'http://localhost:4200/callback',
  SCOPE: 'openid profile email',
  RESPONSETYPE: 'code token id_token',
  AUDIENCE : 'https://tkssharma.auth0.com/api/v2/'
};
```

Update your package json dependancies 

```json
   "@angular/animations": "6.1.3",
    "@angular/common": "6.1.3",
    "@angular/compiler": "6.1.3",
    "@angular/core": "6.1.3",
    "@angular/forms": "6.1.3",
    "@angular/platform-browser": "6.1.3",
    "@angular/platform-browser-dynamic": "6.1.3",
    "@angular/router": "6.1.3",
    "auth0-js": "^9.7.3", (needed for auth0)
```
Now we will create service which will help us to trigger calls to Auth0 apis
Authservice 
- setLoggedIn
- login 
- handleAuth
- _getProfile
- logout 

All basic methods are available to login till logout and getting user profile post Login
```javascript
@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  private _auth0 = new auth0.WebAuth({
      clientID: AUTH_CONFIG.CLIENT_ID,
    audience: AUTH_CONFIG.AUDIENCE, //the end bit was changed
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    issuer: AUTH_CONFIG.CLIENT_ID,
    responseType: AUTH_CONFIG.RESPONSETYPE,
    redirectUri: AUTH_CONFIG.REDIRECT,
    scope: AUTH_CONFIG.SCOPE,
  });
  accessToken: string;
  userProfile: any;
  expiresAt: number;
  isAdmin: boolean;
  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  loggingIn: boolean;
  // Subscribe to token expiration stream
  refreshSub: Subscription;
  routeSub: Subscription;

  constructor(private router: Router) {
    // If app auth token is not expired, request new token
    if (JSON.parse(localStorage.getItem('expires_at')) > Date.now()) {
      this.renewToken();
    }
  }

  setLoggedIn(value: boolean) {
    // Update login status behavior subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login() {
    // Auth0 authorize request
    this._auth0.authorize();
  }

  handleAuth() {
    // When Auth0 hash parsed, get profile
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this._getProfile(authResult);
      } else if (err) {
        this._clearRedirect();
        this.router.navigate(['/']);
        console.error(`Error authenticating: ${err.error}`);
      }
    });
  }
```
Once we are logedin we can get user Profile


```javascript
  private _getProfile(authResult) {
    this.loggingIn = true;
    // Use access token to retrieve user's profile and set session
    this._auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
        this._redirect();
      } else if (err) {
        console.warn(`Error retrieving profile: ${err.error}`);
      }
    });
  }
```  
In angular application we cna simple create a component which will trigger Login action and have callback route to handle data coming from auth0 response 
- callback component will callback route added and here application will redirect once login is successful 

```javascript
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    AuthGuard,
    AdminGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
Now we can simply create angular Header component and do auth.login and auth.logout 
```html
   <div class="header-page-authStatus">
      <span *ngIf="auth.loggingIn">Logging in...</span>
      <ng-template [ngIf]="!auth.loggingIn">
        <a *ngIf="!auth.loggedIn" (click)="auth.login()">Log In</a>
        <span *ngIf="auth.loggedIn && auth.userProfile">
          <a routerLink="/my-rsvps">{{ auth.userProfile.name }}</a>
          <span class="divider">|</span>
          <a (click)="auth.logout()">Log Out</a>
        </span>
      </ng-template>
    </div>
```
![ Our Application Post Login screen](../thumbnails/ngapp-auth0-poc.png)

Lets come to execution Part and this is my client configuration look like 

```javascript
export const AUTH_CONFIG = {
    CLIENT_ID: '-------------------------',
    CLIENT_DOMAIN : 'tkssharma.auth0.com',
    REDIRECT : 'http://localhost:4200/callback',
    SCOPE: 'openid profile email',
    RESPONSETYPE: 'code token id_token',
    AUDIENCE : 'https://tkssharma.auth0.com/api/v2/'
}
```
Once we are logged In using Auth0 we will be redirected to callback component which will show data receievd from auth service and also stored in Local storage 
Now we can test protected server side api by passing token from auth service, We have APIservice which is ending token in headers 

```javascript 

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  private get _authHeader(): string {
    return `Bearer ${this.auth.accessToken}`;
  }
  testAPIs$(): Observable<any> {
    return this.http
      .get(`${ENV.BASE_API}testAuth0`,{
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }
```
Once we send this testAPIs request to server side then using Node JS middleware we should be able to validate token at server side using Middleware 

```javascript
import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

export class AuthenticationMiddleware implements NestMiddleware {
  use(req, res, next) {
    jwt({
    secret: expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://tkssharma.auth0.com/.well-known/jwks.json'
  }),

  // Validate the audience and the issuer.
  audience: 'https://tkssharma.auth0.com/api/v2/',
  algorithms: ['RS256']
    })(req, res, err => {
      if (err) {
        const status = err.status || 500;
        console.log(err);
        const message =
          err.message || 'Sorry, we were unable to process your request.';
        return res.status(status).send({
          message,
        });
      }
      next();
    });
  }
}
```
In main module we have to add apis need this middleware 
```javascript 
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { path: '/api/testAuth0', method: RequestMethod.GET },
      );
  }
}
```
Now we can trigger this Get api /api/testAuth0 API call from button on UI screen it will send token in header and will hit this endpoint which is protected and will validate token against Auth0 server.

Working Example - 

Node JS APIs
- https://github.com/tkssharma/ngrx-socketio-nestjs-apis-poc.git
Angular App for Auth0
- https://github.com/tkssharma/ngrx-socketio-web-poc 





