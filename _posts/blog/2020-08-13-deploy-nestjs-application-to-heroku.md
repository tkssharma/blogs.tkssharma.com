---
date: 2020-08-13
title: 'Deploy NestJS/Postgres application to Heroku'
template: post
thumbnail: '../thumbnails/nestjs.png'
slug: deploy-nestjs-application-heroku
categories:
  - nestjs
  - heroku
  - deploy
  - postgres
tags:
  - javascript
  - nestjs
  - knex
---
# Deploy NestJS Postgres Application To Heroku 😻

I have covered a lot of topics for Nestjs In this Post we are gong to talk about Nest js deployment

Deployment can be of different type like nestjs with mysql/postgres/mongo DB

- Common things is we need database resource on Heroku

There are many ways to push to Heroku, either we have CI/CD setup to push to Heroku of we just push the code to Heroku 
github Repo 

```bash
developer -> push to master -> gitlab.ci/travis-ci/github actions -> deploy to Heroku -> restart application 
```
This is how any application gets deployed we merge to branch or we did commit and push it, it will trigger pipeline or
we just push to heroku it will trigger Heroku build based on application type and then deploy application based on instruction in package.json 

Example like HTTP REST APIs 
we need HTTP PORT and Database connection url to connect to 

The basic approach to hosting a Node application on Heroku is:

- Have your package.json file define any required dependencies (e.g. the dependencies that will already be there)
- Specify what node version you want to use in package.json
- Specify a start script in package.json that tells Heroku how to start your application after installing everything
- Push your code up to Heroku using git push heroku master

Things are not simple when we have typescript project as we have to build project first and then run code from /dist folder for nestjs application 
## step-1 [PORT Dynamic]

```javascript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
```
Always add PORT dynamic as heroku will assign its own port for HTTP server

## update package.json file 
Modify the start:prod command in package.json:
```bash
"start:prod": "node dist/src/main.js",
"prestart:prod": "npm run build",
```
Before we can run the start:prod command we will need to run the prestart:prod command which actually performs the build and creates our dist folder with the built files. To do this, we can add a postinstall script which will automatically run after Heroku has finished installed the dependencies for the project.
```bash
"postinstall": "npm run prestart:prod",
```
Now it will do npm install => script prestart:prod => start Prod script

## Finally Proc File 
If you want to add custom comand which you want to run to bootstrap application that you can add in `proc file`

Finally, we just need to create a Procfile. This allows us to specifically supply the command we want to run to start the application rather than the default start script (which we want to keep for our local development environment).

Create a file called Procfile at the root of your project and add the following:
```bash
web: npm run start:prod
```

## create application and push code 
Now lets build heroku application and push code 
```bash
git add .
git commit -m "doing it live"
git push heroku master
```
## How to run Migrations

with deployment also we can do database migration against dev and Prod database 
Lets say i am using typeORM ORM for dealing with migration then i can add command to run migration with application bootstrap 
Like 
```bash
web: npm run migration:run && npm run start:prod
```
Here  `npm run migration:run` should look into migration folder and run changes in database tables to add/update database 
Please check TypeORM to know more about Migration
Using this simple command we can update database by executing migrations 
Heroku Provided Integration with all different database like postgres, mysql.
we can add database for deployment environment from heroku console, example
https://www.heroku.com/postgres




