---
date: 2020-06-26
title: 'Vue JS Setting up with Firebase'
template: post
thumbnail: '../thumbnails/vue.png'
slug: vuejs-with-firebase-authentication
categories:
  - vuejs
  - Popular
tags:
  - vuejs
  - Interview
---

##  Vue JS Setting up with Firebase

Firebase offers services like, Authentication, Realtime Database, Storage etc. Here we’ll be looking at implementing the Authentication.

### 1.1 Create new Firebase Project

To create a firebase project, login to the [firebase console](https://console.firebase.google.com/) or create a new account if there is not one. If this is your first time logging into firebase, click the **Create new project** button or select **create new project** from the dropdown option to right side of the firebase logo.

There will be a modal window shown requiring the **Project name** and the **Country**, just fill it up and our project will be created.

**Create new project in firebase**

Once created, the page will be redirected to the Overview page. In there, we need to click the **Add Firebase to your web app** option, which provides us with the code required to load Firebase into our webpage and initialise Firebase with our app’s config options.

![](https://cdn-images-1.medium.com/max/2000/0*AkAWDJqftYMsOzi3.png)

**Config and initialise firebase in HTML**

This code must be pasted at the bottom of our HTML page before other scripts.

### 1.2 Configuring Firebase Authentication

From the *firebase dashboard* select the **Authentication** option under the **Develop** section. Initially the **users** tab is shown in Authentication. The **users** tab shows the list of users signed up to this app.

Select the **Sign-In Method** tab next to the **users** tab. Next, under the **Sign-in Providers** section, **Enable** the **Email/Password** provider, because we are going to create and sign-in users with Firebase as the service provider.

**Info: **You can use the [**FirebaseUI](https://github.com/firebase/FirebaseUI)** library which provides common UI elements. It provides Social Authentication like **Facebook, Google, Twitter** etc for Web and Mobile platforms as well.

![](https://cdn-images-1.medium.com/max/2000/0*UhC_oeL1tBkMQ3La.png)

**Firebase Enable Email/Password Authentication**

As shown in the image, firebase provides other service providers as well. There is also an option to allow Anonymous users.

Now that all the setup has been made, we can start coding our app.

## 2. Setting up Vue.js and Firebase

Following is the basic structure of the HTML code which includes [Twitter Bootstrap](http://getbootstrap.com/), [Vue.js](https://vuejs.org/) and the Firebase configuration code at the bottom of the page.

```
    <body>
           <div id="app" class="container">
       
           </div>
       
           <script src="[https://www.gstatic.com/firebasejs/3.6.10/firebase.js](https://www.gstatic.com/firebasejs/3.6.10/firebase.js)"></script>
           <script>
             // Initialize Firebase
             var config = {
               apiKey: "AIzaSyCYShcZZnxJONDfT4gQ96pmUAQ_ui1PO9o",
               authDomain: "[fir-auth-vue.firebaseapp.com](http://fir-auth-vue.firebaseapp.com/)",
               databaseURL: "[https://fir-auth-vue.firebaseio.com](https://fir-auth-vue.firebaseio.com/)",
               storageBucket: "[fir-auth-vue.appspot.com](http://fir-auth-vue.appspot.com/)",
               messagingSenderId: "336846372464"
             };
             firebase.initializeApp(config);
           </script>
           <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
           <script src="[https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js](https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js)"></script>
           <script src="[https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js](https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js)" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
           <script type="text/javascript" src="scripts/app.js"></script>
         </body>
```

## 3. Implementing Login/SignUp

### 3.1 The Vue Instance

The Vue instance data property is going to have a auth object which contains all of our Authentication related properties.
```javascript
    var app = new Vue({
         el: '#app',
       
         data: {
           auth: {
             user: null,
             email: '',
             password: '',
             message: '',
             userName: '',
             hasErrors: false
           }
         }
       }
```
The properties in the auth are used as follows,

* user – Holds the currently authenticated user details object which we can get from firebase.

* email – The user input email. Bound to the *email* input field using v-model directive.

* password – The user password. Bound to the *password* input field using the v-model directive.

* userName – The currently logged in username.

* hasErrors – A Boolean value representing if there are any errors.

* message – Message containing *error* or *success* messages and highlighted using the hasErrors property.

3.1.1 isAuthenticated Computed property

isAuthenticated is used to determine the *Authentication State* of the user. It returns a Boolean result specifying the existence of the auth.user property.
```javascript
    
         computed: {
       
           /**
            * Determines if the user is authenticated
            *
            * @return boolean
            */
           isAuthenticated: function () {
             // This function changes the auth.user state when 
             // the auth status of user changes.
             firebase.auth().onAuthStateChanged(function (user) {
               if (user) {
                 this.auth.user = user;
               } else {
                 this.auth.user = null;
               }
             }.bind(this));
       
             return (this.auth.user !== null);
           }
       
         }
       
```
It is updated using the firebase.auth().onAuthStateChanged(callback) method. This method is invoked whenever there is a change in the Authentication state of the user, passing in a user object or null to the callback function provided.

### 3.2 Login/SignUp View

Now that we have the source of truth defined i.e the auth and isAuthenticated, we can define our view.

We need to show the *login/signup* section when the user is not authenticated and should disappear when the user is logged in. Following is the HTML view code that binds email and password to the auth.email and auth.password data property. The *login* and *signup* buttons are attached to a **click** event which invokes the login and signup methods in the Vue instance.

The auth.message is used as a bootstrap *alert* component and used to toggle the type of alert using the auth.hasErrors property discussed before.
```html
    <div v-if="!isAuthenticated" id="loginContainer">
         <div class="row">
           <div class="col-md-12">
       
             <h3 style="text-align: center;">Login and SignUp using firebase + Vue</h3>
       
             <form>
               <div class="form-group">
                 <label for="exampleInputEmail1">Email address</label>
                 <input v-model:email="auth.email" type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
               </div>
               <div class="form-group">
                 <label for="exampleInputPassword1">Password</label>
                 <input v-model:password="auth.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
               </div>
       
               <div v-if="auth.message !== ''" class="alert" role="alert"
                 :class="{'alert-danger': auth.hasErrors, 'alert-success': !auth.hasErrors}">
                 <button @click="dismissAlert" type="button" class="close"><span aria-hidden="true">×</span></button>
                 <p><strong>{{auth.message}}</strong></p>
               </div>
       
               <button type="button" @click="login" class="btn btn-primary">Login</button>
               
               <button type="button" @click="signUp" class="btn btn-success">Signup</button>
       
             </form>
           </div>
         </div>
       </div>
```

### 3.3 Login and SignUp Vue Methods

### 3.3.1 Firebase Methods

Before we go about implementing our Vue login and signup methods, we need to know about the Firebase Interface that makes this possible.

createUserWithEmailAndPassword

The firebase createUserWithEmailAndPassword method allows us to *create a new user in firebase* for our app. It returns a **Promise** which can be handled to update the UI based on the response.

Syntax
```javascript
    firebase.auth().createUserWithEmailAndPassword(email, password)
         .then(function () {
           // Handle sucessful creation of user
           // You can get current user using firebase.auth().currentUser
         }).catch(function(error) {
           // Handle failure of creation of user 
         });
```

As shown above the method takes in two inputs, the user *email* and the *password* from the form.

signInWithEmailAndPassword

The signInWithEmailAndPassword method, like the create method, takes in two arguments and returns a Promise.

Syntax
```javascript
    firebase.auth().signInWithEmailAndPassword(email, password)
         .then(function (user) {
           // Handle successful login
         }).catch(function(error) {
           // Failed to login, some error occurred.
         });
```

### 3.3.2 login/signup methods

Using the firebase methods discussed above, we can implement our login and signup methods with ease.

```javascript
         methods: {
       
           /**
            * Authenticate the user
            *
            * @param object event
            */
           login: function (event) {
             var vm = this;
             vm.auth.message = '';
             vm.auth.hasErrors = false;
       
             if (vm.auth.email === '' || vm.auth.password === '') {
               alert('Please provide the email and password');
               return;
             }
             // Sign-in the user with the email and password
             firebase.auth().signInWithEmailAndPassword(vm.auth.email, vm.auth.password)
               .then(function (data) {
                 vm.auth.user = firebase.auth().currentUser;
               }).catch(function(error) {
                 vm.auth.message = error.message;
                 vm.auth.hasErrors = true;
               });
           },
       
           /**
            * Create a new user account
            * 
            * @param object event
            */
           signUp: function (event) {
             var vm = this;
             vm.auth.message = '';
             vm.auth.hasErrors = false;
       
             if (vm.auth.email === '' || vm.auth.password === '') {
               alert('Please provide the email and password');
               return;
             }
       
             // Create a new user in firebase
             firebase.auth().createUserWithEmailAndPassword(vm.auth.email, vm.auth.password)
               .then(function (data) {
                 vm.auth.message = 'Successfully created user';
                 vm.auth.user = firebase.auth().currentUser;
                 vm.auth.email = '';
                 vm.auth.password = '';
               }).catch(function(error) {
                 vm.auth.message = error.message;
                 vm.auth.hasErrors = true;
               });
           }
         }
```
## 4. Implementing Update Profile and SignOut

### 4.1 Authenticated View

This is the View that the user see’s when he is logged into the app. We can determine that using the isAuthenticated property and show this section using the v-if Vue directive.
```html
    <div v-if="isAuthenticated" id="content">
       
         <div class="row">
           <div class="col-md-12">
             <div class="panel panel-default">
               <div class="panel-heading">
                 <h3 class="panel-title">Welcome {{displayName()}}</h3>
               </div>
       
               <div class="panel-body">
                 <p>You have been currently logged-in using firebase.</p>
                 <br/>
                 <h4>{{displayName()}} Profile Details</h4>
                 <hr/>
                 <form class="form-horizontal">
                   <div class="form-group">
                     <label for="inputUserName" class="col-sm-2 control-label">Username</label>
                     <div class="col-sm-10">
                       <input v-model="auth.userName" type="text" class="form-control" id="inputUserName" placeholder="Username">
                     </div>
                   </div>
                   <div class="form-group">
                     <div class="col-sm-offset-2 col-sm-10">
                       <button @click="updateProfile" type="button" class="btn btn-default">Update Profile</button>
                     </div>
                   </div>
                 </form>
                 <div v-if="auth.message !== ''" class="alert" role="alert"
                   :class="{'alert-danger': auth.hasErrors, 'alert-success': !auth.hasErrors}">
                   <button @click="dismissAlert" type="button" class="close"><span aria-hidden="true">×</span></button>
                   <p><strong>{{auth.message}}</strong></p>
                 </div>
               </div>
       
               <div class="panel-footer">
                 <button @click="signOut" class="btn btn-danger" type="button">Signout</button>
               </div>
             </div>
           </div>
         </div>
       
       </div>
```

As shown above, in the authenticated view we show the user’s **displayName** using the displayName() method. The *alert* is used as discussed above. Our main concern here is the updateProfile and signOut methods that are attached to the buttons in the view.

### 4.2 updateProfile and signOut methods

### 4.2.1 Firebase Methods

updateProfile

This method is used to update the user profile details. You pass is the *user details object* and it will update the user details in firebase for the app.

Syntax
```javascript
    firebase.auth().currentUser.updateProfile({
           displayName: 'userName'
         }).then(function() {
           // profile update successful
         }, function(error) {
           // profile update failed
         });
```
signOut

We can use the signOut method to sign out the user from the app. We don’t need to pass anything to this method, firebase handle it for us since is is part of the auth interface.

Syntax
```javascript
    firebase.auth().signOut()
         .then(function() {
           // Handle Logout successful
         }.bind(this), function (error) {
           // Handle Logout failure
         });
```

### 4.2.2 updateProfile and signOut methods

Using the methods provided in firebase, we implement the updateProfile and signOut methods in the Vue instance to handle when the *Signout* and *Update Profile* buttons are clicked. Both the firebase and Vue instance methods have the same name here.
```javascript
           /**
            * Signout the currently logged-in user
            */
           signOut: function () {
             // Signout the user using firebase
             firebase.auth().signOut()
               .then(function(error) {
                 this.auth.user = firebase.auth().currentUser;
                 this.auth.message = 'User signed out Successfully';
               }.bind(this), function (error) {
                 alert('Failed to signout user, try again later');
               });
           },
       
           /**
            * Update the user profile details.
            */
           updateProfile: function () {
             if (this.auth.userName === '') {
               alert('Please provide a username to update.');
               return;
             }
       
             var user = firebase.auth().currentUser,
               vm = this;
       
             user.updateProfile({
               displayName: vm.auth.userName
             }).then(function() {
               vm.auth.message = 'Successfully udpated user profile.';
             }, function(error) {
               vm.auth.message = 'Failed to update user profile.';
               vm.auth.hasErrors = true;
             });
           },
```

## Final HTML
```html
    <!DOCTYPE html>
       <html lang="en">
         <head>
           <meta charset="utf-8">
           <meta http-equiv="X-UA-Compatible" content="IE=edge">
           <meta name="viewport" content="width=device-width, initial-scale=1">
           <title>Firebase Authentication using Vue.js - Codedodle</title>
       
           <!-- Bootstrap -->
           <!-- Latest compiled and minified CSS -->
           <link rel="stylesheet" href="[https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css](https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css)" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
       
           <!-- Optional theme -->
           <link rel="stylesheet" href="[https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css](https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css)" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
       
           <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
           <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
           <!--[if lt IE 9]>
             <script src="[https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js](https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js)"></script>
             <script src="[https://oss.maxcdn.com/respond/1.4.2/respond.min.js](https://oss.maxcdn.com/respond/1.4.2/respond.min.js)"></script>
           <![endif]-->
           <script src="libs/vue.js"></script>
         </head>
         <body>
           <div id="app" class="container">
       
             <div v-if="!isAuthenticated" id="loginContainer">
               <div class="row">
                 <div class="col-md-12">
       
                   <h3 style="text-align: center;">Login and SignUp using firebase + Vue</h3>
       
                   <form>
                     <div class="form-group">
                       <label for="exampleInputEmail1">Email address</label>
                       <input v-model:email="auth.email" type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
                     </div>
                     <div class="form-group">
                       <label for="exampleInputPassword1">Password</label>
                       <input v-model:password="auth.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                     </div>
       
                     <div v-if="auth.message !== ''" class="alert" role="alert"
                       :class="{'alert-danger': auth.hasErrors, 'alert-success': !auth.hasErrors}">
                       <button @click="dismissAlert" type="button" class="close"><span aria-hidden="true">×</span></button>
                       <p><strong>{{auth.message}}</strong></p>
                     </div>
       
                     <button type="button" @click="login" class="btn btn-primary">Login</button>
                     
                     <button type="button" @click="signUp" class="btn btn-success">Signup</button>
       
                   </form>
                 </div>
               </div>
             </div>
       
             <div v-if="isAuthenticated" id="content">
       
               <div class="row">
                 <div class="col-md-12">
                   <div class="panel panel-default">
                     <div class="panel-heading">
                       <h3 class="panel-title">Welcome {{displayName()}}</h3>
                     </div>
       
                     <div class="panel-body">
                       <p>You have been currently logged-in using firebase.</p>
                       <br/>
                       <h4>{{displayName()}} Profile Details</h4>
                       <hr/>
                       <form class="form-horizontal">
                         <div class="form-group">
                           <label for="inputUserName" class="col-sm-2 control-label">Username</label>
                           <div class="col-sm-10">
                             <input v-model="auth.userName" type="text" class="form-control" id="inputUserName" placeholder="Username">
                           </div>
                         </div>
                         <div class="form-group">
                           <div class="col-sm-offset-2 col-sm-10">
                             <button @click="updateProfile" type="button" class="btn btn-default">Update Profile</button>
                           </div>
                         </div>
                       </form>
                       <div v-if="auth.message !== ''" class="alert" role="alert"
                         :class="{'alert-danger': auth.hasErrors, 'alert-success': !auth.hasErrors}">
                         <button @click="dismissAlert" type="button" class="close"><span aria-hidden="true">×</span></button>
                         <p><strong>{{auth.message}}</strong></p>
                       </div>
                     </div>
       
                     <div class="panel-footer">
                       <button @click="signOut" class="btn btn-danger" type="button">Signout</button>
                     </div>
                   </div>
                 </div>
               </div>
       
             </div>
           </div>
       
           <script src="[https://www.gstatic.com/firebasejs/3.6.10/firebase.js](https://www.gstatic.com/firebasejs/3.6.10/firebase.js)"></script>
           <script>
             // Initialize Firebase
             var config = {
               apiKey: "AIzaSyCYShcZZnxJONDfT4gQ96pmUAQ_ui1PO9o",
               authDomain: "[fir-auth-vue.firebaseapp.com](http://fir-auth-vue.firebaseapp.com/)",
               databaseURL: "[https://fir-auth-vue.firebaseio.com](https://fir-auth-vue.firebaseio.com/)",
               storageBucket: "[fir-auth-vue.appspot.com](http://fir-auth-vue.appspot.com/)",
               messagingSenderId: "336846372464"
             };
             firebase.initializeApp(config);
           </script>
           <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
           <script src="[https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js](https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js)"></script>
           <script src="[https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js](https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js)" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
           <script type="text/javascript" src="scripts/app.js"></script>
         </body>
       </html>
```

## Final Vue JavaScript
```javascript

    var app = new Vue({
         el: '#app',
       
         data: {
           auth: {
             user: null,
             email: '',
             password: '',
             message: '',
             userName: '',
             hasErrors: false
           }
         },
       
         methods: {
       
           /**
            * Authenticate the user
            *
            * @param object event
            */
           login: function (event) {
             var vm = this;
             vm.auth.message = '';
             vm.auth.hasErrors = false;
       
             if (vm.auth.email === '' || vm.auth.password === '') {
               alert('Please provide the email and password');
               return;
             }
             // Sign-in the user with the email and password
             firebase.auth().signInWithEmailAndPassword(vm.auth.email, vm.auth.password)
               .then(function (data) {
                 vm.auth.user = firebase.auth().currentUser;
               }).catch(function(error) {
                 vm.auth.message = error.message;
                 vm.auth.hasErrors = true;
               });
           },
       
           /**
            * Create a new user account
            * 
            * @param object event
            */
           signUp: function (event) {
             var vm = this;
             vm.auth.message = '';
             vm.auth.hasErrors = false;
       
             if (vm.auth.email === '' || vm.auth.password === '') {
               alert('Please provide the email and password');
               return;
             }
       
             // Create a new user in firebase
             firebase.auth().createUserWithEmailAndPassword(vm.auth.email, vm.auth.password)
               .then(function (data) {
                 vm.auth.message = 'Successfully created user';
                 vm.auth.user = firebase.auth().currentUser;
                 vm.auth.email = '';
                 vm.auth.password = '';
               }).catch(function(error) {
                 vm.auth.message = error.message;
                 vm.auth.hasErrors = true;
               });
           },
       
           /**
            * Signout the currently logged-in user
            */
           signOut: function () {
             // Signout the user using firebase
             firebase.auth().signOut()
               .then(function(error) {
                 this.auth.user = firebase.auth().currentUser;
                 this.auth.message = 'User signed out Successfully';
               }.bind(this), function (error) {
                 alert('Failed to signout user, try again later');
               });
           },
       
           /**
            * Update the user profile details.
            */
           updateProfile: function () {
             if (this.auth.userName === '') {
               alert('Please provide a username to update.');
               return;
             }
       
             var user = firebase.auth().currentUser,
               vm = this;
       
             user.updateProfile({
               displayName: vm.auth.userName
             }).then(function() {
               vm.auth.message = 'Successfully udpated user profile.';
             }, function(error) {
               vm.auth.message = 'Failed to update user profile.';
               vm.auth.hasErrors = true;
             });
           },
       
           /**
            * Dismiss the alert message
            */
           dismissAlert: function () {
             this.auth.message = '';
             this.auth.hasErrors = false;
           },
       
           /**
            * Display name computed property
            */
           displayName: function () {
             return this.auth.user.displayName ? 
               this.auth.user.displayName : this.auth.user.email;
           }
       
         },
       
         computed: {
       
           /**
            * Determines if the user is authenticated
            *
            * @return boolean
            */
           isAuthenticated: function () {
             // This function changes the auth.user state when 
             // the auth status of user changes.
             firebase.auth().onAuthStateChanged(function (user) {
               if (user) {
                 this.auth.user = user;
               } else {
                 this.auth.user = null;
               }
             }.bind(this));
       
             return (this.auth.user !== null);
           }
       
         }
       
       });
```

### Related Posts
