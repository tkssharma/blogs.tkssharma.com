---
date: 2020-02-17
title: 'Authentication using passport js Social auth with Node js'
template: post
thumbnail: '../thumbnails/node.png'
slug: authentication-using-passport-social-auth-with-nodejs
categories:
  - Popular
  - NodeJS
tags:
  - NodeJS
---

For the uninitiated, social login is a type of [Single Sign-on](http://en.wikipedia.org/wiki/Single_sign-on) using existing information from social networking sites like Facebook, Twitter, etc., where users are normally expected to have accounts already created.

Social login mostly relies on an authentication scheme such as [OAuth 2.0](http://oauth.net/2/). To learn more about the different login flows OAuth supports, read this [article](https://code.tutsplus.com/articles/oauth-20-the-good-the-bad-the-ugly--net-33216). We choose Passport to handle social login for us, as it provides different modules for a variety of OAuth providers, be it Facebook, Twitter, Google, GitHub, etc. In this article we will be using the [passport-facebook](https://github.com/jaredhanson/passport-facebook) and [passport-twitter](https://github.com/jaredhanson/passport-twitter) modules to provide login functionality via existing Facebook or Twitter accounts.

Let’s begin by adding support for Facebook.

## Facebook Login

Before I do any code, I need to create a Facebook app linked to my project. This will give me the credentials I need and let my application authenticate with them.

Assuming you have a Facebook account, head over to [https://developers.facebook.com/](https://developers.facebook.com/). In the upper right hand corner will be a “My Apps” button — click it to add a new app.

![](https://cdn-images-1.medium.com/max/2000/0*7yaaNDqGnFetYML_.png)

You’ll be prompted for a name and a category. If testing, enter whatever you want. If building something for production, actually enter something that makes sense.

After entering a Captcha, on the next page, click Add Product. Right on top is the product you want — Facebook Login.

![](https://cdn-images-1.medium.com/max/2000/0*BPFQPnESzg8GNLQM.png)

For platform, select WWW:

![](https://cdn-images-1.medium.com/max/2000/0*vau-5PfQt2462u1R.png)

You’ll then be prompted to enter information about your site. You do *not* have to have a site in production yet. You can absolutely use localhost for your values. For the first prompt, I used [http://localhost:3000](http://localhost:3000/) as thats what my Express app used. I skipped the rest of the panels, and when done, I clicked the new “Settings” link under the Facebook Login group in the left hand menu.

![](https://cdn-images-1.medium.com/max/2000/0*Vwry51IISYEw2ANc.png)

On the settings page, there’s one important setting here, “Valid OAuth redirect URIs”. You need to tell Facebook where a user is allowed to be redirected back to after authorization. Again, you can use localhost for this. I used [http://localhost:3000/auth/facebook/callback](http://localhost:3000/auth/facebook/callback). Why? That’s what I saw in the Passport examples. It’s arbitrary. Just remember you’ll need to add a production URL later.

![](https://cdn-images-1.medium.com/max/2000/0*pyRcszeKhDSn6dsL.png)

Make sure you click Save! Then go to the main Settings link in the left hand nav (towards the top) and you’ll see an App ID and App Secret field. Copy these locally. For me, I’m using a JSON file. Here is the file (with Twitter stuff already in, just ignore for now ;)

    {
        "cookieSecret":"dfkjdlsfjljklsdfj",
        "facebook":{
            "app_id":"theidofallids",
            "app_secret":"astringishere",
            "callback":"http://localhost:3000/auth/facebook/callback"
        },
        "twitter":{
            "consumer_key":"akeyishere",
            "consumer_secret":"mysecretisbetterthanyoursecret",
            "callback":"http://localhost:3000/auth/twitter/callback"
        },
        "mongo":{
            "development":{
                "connectionString":"mongodb://localhost/foo"
            },
            "production":{}
        }
    }

Whew. Ok, so at this point, you’ve done what’s required on the Facebook side. Now let’s turn back to the code. You need to install Passport (npm install --save passport) and then the Facebook strategy (npm install --save passport-facebook).

Alright — now let’s walk through the code. As an FYI, I’ll share the entire app.js when the blog post is done so don’t worry if you get a bit lost. First, require in the packages:

## Facebook Login Strategy

Back in our Node application, we now define a Passport Strategy for authenticating with Facebook using the FacebookStrategy module, utilizing the above settings to fetch the user’s Facebook profile and display the details in the view.

## Twitter Login Strategy

Back in our Node application, we now define a Passport Strategy for authenticating with Facebook using the TwitterStrategy module, utilizing the above settings to fetch the user’s Facebook profile and display the details in the view.

    'use strict';

    import passport from 'passport';
    import {
        Strategy as TwitterStrategy
    } from 'passport-twitter';
    import auth from 'app/config/auth';
    import Service from 'app/helper/Service';

    passport.use(new TwitterStrategy({
            consumerKey: auth.twitter.client_id,
            consumerSecret: auth.twitter.client_secret,
            callbackURL: auth.twitter.callback_url,
            passReqToCallback: true,
        },
        (req, accessToken, refreshToken, profile, done) => {

    let data = profile._json;
            Service.user.registerSocial({
                    provider: 'twitter',
                    name: data.name,
                    email: `${[@twitter](mailto:data.screen_name}<a href=).com">data.screen_name}[@twitter](http://twitter.com/twitter).com`,
                    profile_picture: data.profile_image_url,
                    meta: {
                        provider: 'twitter',
                        id: data.id,
                        token: accessToken,
                        screen_name: data.screen_name,
                    }
                },
                done
            );

    }
    ));

    let TwitterRoutes = {

    authenticate: () => {
            return passport.authenticate('twitter');
        },

    callback: () => {
            return passport.authenticate('twitter', {
                failureRedirect: '/auth/failed'
            });
        }

    }

    export default TwitterRoutes;

## Google Login Strategy

we now define a Passport Strategy for authenticating with Facebook using the GoogleStrategy module, utilizing the above settings to fetch the user’s Facebook profile and display the details in the view.

    passport.use(new FacebookStrategy(
      {
        clientID: auth.facebook.client_id,
        clientSecret: auth.facebook.client_secret,
        callbackURL: auth.facebook.callback_url,
        profileFields: ['id', 'displayName', 'photos', 'email'],
        passReqToCallback : true,
      },
      ( req, accessToken, refreshToken, profile, done ) => {

    let data = profile._json;
        *Service.user.registerSocial*(
          {
            provider: 'facebook',
            name: data.name,
            email: data.email,
            profile_picture: data.picture.data.url,
            meta: {
              provider: 'facebook',
              id: profile.id,
              token: accessToken,
            }
          },
          done
        );
      }
    ));

    let FacebookRoutes = {

    authenticate: () => {
        return passport.authenticate('facebook', { scope: ['email', 'public_profile', 'user_location'] });
      },

    callback: () => {
        return passport.authenticate('facebook', {
          failureRedirect: '/auth/failed'
        });
      }

    }

These are all routes we have to manage social auth

    router.get(‘/login/facebook’, FacebookRoutes.authenticate() );
    router.get( ‘/callback/facebook’, FacebookRoutes.callback(), redirectSocialUser );
    /
    * [@api](http://twitter.com/api) {POST} /auth/login/google Social Login
    * [@apiName](http://twitter.com/apiName) google
    * [@apiGroup](http://twitter.com/apiGroup) Auth
    * [@apiSuccess](http://twitter.com/apiSuccess) {String} code HTTP status code from API.
    * [@apiSuccess](http://twitter.com/apiSuccess) {String} message Message from API.
    */
    router.get(‘/login/google’, GoogleRoutes.authenticate() );
    router.get( ‘/callback/google’, GoogleRoutes.callback(), redirectSocialUser );
    /
    * [@api](http://twitter.com/api) {POST} /auth/login/twitter Social Login
    * [@apiName](http://twitter.com/apiName) twitter
    * [@apiGroup](http://twitter.com/apiGroup) Auth
    * [@apiSuccess](http://twitter.com/apiSuccess) {String} code HTTP status code from API.
    * [@apiSuccess](http://twitter.com/apiSuccess) {String} message Message from API.
    */
    router.get(‘/login/twitter’, TwitterRoutes.authenticate() );
    router.get( ‘/callback/twitter’, TwitterRoutes.callback(), redirectSocialUser );
    /
    * [@api](http://twitter.com/api) {POST} /auth/login/instagram Social Login
    * [@apiName](http://twitter.com/apiName) instagram
    * [@apiGroup](http://twitter.com/apiGroup) Auth
    * [@apiSuccess](http://twitter.com/apiSuccess) {String} code HTTP status code from API.
    * [@apiSuccess](http://twitter.com/apiSuccess) {String} message Message from API.
    */
    router.get(‘/login/instagram’, InstagramRoutes.authenticate() );
    router.get( ‘/callback/instagram’, InstagramRoutes.callback(), redirectSocialUser );

Main point is how we manage data coming from social auth api, here i am running *registerSocial method to save registered user data and next step is sending auth token to client side.*

    function registerSocial(user, callback) {

    User.findOne({ 'email': user.email }, (error, existing_user) => {
                if (existing_user) {
                    callback(null, UserTransformer.transform(existing_user));
                } else {
                    let newUser = new User({
                        provider: user.provider,
                        name: user.name,
                        email: user.email,
                        profile_picture: user.profile_picture,
                        email_verified: true,
                        status: 1,
                        social: user.meta,
                    });
                    newUser.save((error, new_user) => {
                        // if (error) {}
                        callback(null, UserTransformer.transform(new_user));
                        Email.welcome(new_user);
                        return UserTransformer.transform(new_user);
                    });
                }
            });
        }

Once all done we are calling redirect social user redirectSocialUser with auth token generation

    static sign( data ) {
            return jwt.sign( data, server_config.WEB_TOKEN_SECRET );
        }
        static generateToken( user ) {
            let token = UserHelper.sign({
                id: user.id,
                status: user.status,
                name: user.name,
                hasPassword: user.password,
                userType: user.type,
                avatar: user.profile_picture ? Helper.avatarURL(user.profile_picture) : null
            });
            return token;
        }

![](https://cdn-images-1.medium.com/max/3008/1*MielXd1N1-1CpW67_vIaqw.png)

JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.

JWT.IO allows you to decode, verify and generate JWT. Here above is flow how token being passed and further server validate token for other requests.

![](https://cdn-images-1.medium.com/max/4156/1*cv-aUAPndoWAqVor3QMf6g.png)

Client side we can store that somewhere in localstorage and keep sending this token with our request after use has been logged in.

Now final steps to manage authentications

1. Store token locally

1. send token in each request with HTTP auth header

1. Validate token at server Side and validate user role and other information.

1. you can set expiry for token also.

### Happy coding

Adding JWT + Social Authentication make application more smarter for user to quickly enters into it.
