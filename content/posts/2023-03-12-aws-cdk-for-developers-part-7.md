---
date: 2023-03-12
title: 'Deploy API Gateway Lambda with AWS Authorizer Part-7'
template: post
featuredImage: '../thumbnails/cdk.png'
thumbnail: '../thumbnails/cdk.png'
slug: deploy-api-gateway-with-lambda-and-authorizer-part-7
categories:
  - aws-cdk
  - aws
  - nodejs
  - dynamodb
  - microservices
tags:
  - aws-cdk
  - aws
  - nodejs
  - microservices
---

# Deploy API Gateway Lambda with AWS Authorizer Part-7

| Part   | Link                                                                          |
| ------ | ----------------------------------------------------------------------------- |
| Part-0 | https://tkssharma.com/aws-cdk-for-deploying-aws-resources-blogs-series        |
| Part-1 | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-1       |
| Part-2 | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-2       |
| Part-3 | https://tkssharma.com/deploy-api-gateway-using-aws-cdk-part-3                 |
| Part-4 | https://tkssharma.com/deploy-lambda-with-s3-dynamo-and-api-gateway-cdk-part-4 |
| Part-5 | https://tkssharma.com/deploy-proxy-api-gateway-and-rest-apis-cdk-part-5       |
| Part-6 | https://tkssharma.com/deploy-proxy-api-gateway-and-rest-apis-cdk-part-6       |

![](https://i.ytimg.com/vi/h_gRGRbOjJ8/maxresdefault.jpg)

In this Blog we will cover all these Topics

- Build API Gateway with lambda
- Add authorizer to the lambda function
- Use AWS Cognito user pools for authnetication
- Add protect api routes and access using authorizer

![](https://miro.medium.com/v2/resize:fit:1400/0*vXjRjS4vzOV9TFBh.)

# Secure AWS API Gateway Using A Lambda Authorizer

_Amazon API Gateway enables you to create and deploy your own REST and WebSocket APIs at any scale. You can create robust, secure, and scalable APIs that access AWS or other web services, as well as data that’s stored in the AWS Cloud. You can create APIs to use in your own client applications, or you can make your APIs available to third-party app developers._

This post will provide a walkthrough on how to secure an AWS API Gateway using Lambda Authorizers.

# Prerequisites

You need to have an AWS account and some basic knowledge working with AWS services. Following AWS services will be utilised throughout this guide.

- Lamda Service
- API Gateway Service

# You will learn

- To create Lambda functions.
- To create an API Gateway.
- To connect a Lambda function to an API Gateway.
- To Add Authorizers to AWS API Gateway.

In AWS API Gateway, you can secure your endpoints using either IAM roles or an API key. That’s all good. But, imagine this scenario.

You have an external Authentication system (Hosted god knows where) that handles user authentication and issue tokens for authenticated users and this same system needs to be used for AWS API Gateway endpoint security as well. Meaning the token issued from the external Authentication System needs to be passed for each and every request to the API Gateway as well.

Great! But where do we write our code to verify the JWT token?

This is where Lambda Authorizers come in. You can create a Lambda function that will be invoked every time a request is made to an API Gateway endpoint and you can write your own custom code to verify that token sent to the request is valid by sending the token to the external Authentication system and check for validity. Please refer to the diagram below to get a better understanding.

![](https://miro.medium.com/max/1400/1*ShUYr9LW25fwegKWph-Txg.png)

Figure 01

The sequence of the above illustration is explained below.

\[1\]. An API Gateway endpoint is invoked with a JWT token.  
\[2\]. Before sending the request to the endpoint, API Gateway invokes the Lambda Authorizer for JWT token verification.  
\[3\]. Lambda Authorizer checks the validity of the JWT token using custom code with an external authentication system.  
\[4\]. If the JWT token is valid, the request is passed to the requested endpoint or explicitly denied if the JWT token is invalid.

## Lets build all this using AWS CDK

In this simple demo we need few AWS Resources

- Cognito user pool with userPoolClient
- Lambda API Gateway with one HTTP Resource and authorizer

### create cognito authorizer for lambda function

```javascript
// 👇 create the lambda that sits behind the authorizer
const lambdaFunction = new NodejsFunction(this, 'my-function', {
  runtime: lambda.Runtime.NODEJS_16_X,
  handler: 'main',
  entry: path.join(__dirname, `/../src/protected-function/index.ts`),
});

// 👇 create the API
const httpApi = new apiGateway.HttpApi(this, 'api', {
  apiName: `my-api`,
});

// 👇 create the Authorizer
const authorizer = new apiGatewayAuthorizers.HttpUserPoolAuthorizer('user-pool-authorizer', userPool, {
  userPoolClients: [userPoolClient],
  identitySource: ['$request.header.Authorization'],
});

// 👇 set the Authorizer on the Route
httpApi.addRoutes({
  integration: new apiGatewayIntegrations.HttpLambdaIntegration('protected-fn-integration', lambdaFunction),
  path: '/protected',
  authorizer,
});
```

### create Cognito user pool client

```javascript
const userPool = new cognito.UserPool(this, 'userpool', {
  userPoolName: `my-user-pool`,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  selfSignUpEnabled: true,
  signInAliases: { email: true },
  autoVerify: { email: true },
  passwordPolicy: {
    minLength: 6,
    requireLowercase: false,
    requireDigits: false,
    requireUppercase: false,
    requireSymbols: false,
  },
  accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
});

// 👇 create the user pool client
const userPoolClient = new cognito.UserPoolClient(this, 'userpool-client', {
  userPool,
  authFlows: {
    adminUserPassword: true,
    userPassword: true,
    custom: true,
    userSrp: true,
  },
  supportedIdentityProviders: [cognito.UserPoolClientIdentityProvider.COGNITO],
});
```

Now we can test our lambda

Let's test if our lambda function is protected by the authorizer.

In order to test the flow we have to:

- Create a Cognito User
- Confirm the user, so they can sign in
- Log the user in to get an identity JWT token
- Use the token to invoke our API endpoint which will call the function (if the token is valid).

```javascript

import * as apiGateway from '@aws-cdk/aws-apigatewayv2-alpha';
import * as apiGatewayAuthorizers from '@aws-cdk/aws-apigatewayv2-authorizers-alpha';
import * as apiGatewayIntegrations from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 👇 create the user pool
    const userPool = new cognito.UserPool(this, 'userpool', {
      userPoolName: `my-user-pool`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      selfSignUpEnabled: true,
      signInAliases: {email: true},
      autoVerify: {email: true},
      passwordPolicy: {
        minLength: 6,
        requireLowercase: false,
        requireDigits: false,
        requireUppercase: false,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
    });

    // 👇 create the user pool client
    const userPoolClient = new cognito.UserPoolClient(this, 'userpool-client', {
      userPool,
      authFlows: {
        adminUserPassword: true,
        userPassword: true,
        custom: true,
        userSrp: true,
      },
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.COGNITO,
      ],
    });

    // 👇 create the lambda that sits behind the authorizer
    const lambdaFunction = new NodejsFunction(this, 'my-function', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'main',
      entry: path.join(__dirname, `/../src/protected-function/index.ts`),
    });

    // 👇 create the API
    const httpApi = new apiGateway.HttpApi(this, 'api', {
      apiName: `my-api`,
    });

    // 👇 create the Authorizer
    const authorizer = new apiGatewayAuthorizers.HttpUserPoolAuthorizer(
      'user-pool-authorizer',
      userPool,
      {
        userPoolClients: [userPoolClient],
        identitySource: ['$request.header.Authorization'],
      },
    );

    // 👇 set the Authorizer on the Route
    httpApi.addRoutes({
      integration: new apiGatewayIntegrations.HttpLambdaIntegration(
        'protected-fn-integration',
        lambdaFunction,
      ),
      path: '/protected',
      authorizer,
    });

    new cdk.CfnOutput(this, 'region', {value: cdk.Stack.of(this).region});
    new cdk.CfnOutput(this, 'userPoolId', {value: userPool.userPoolId});
    new cdk.CfnOutput(this, 'userPoolClientId', {
      value: userPoolClient.userPoolClientId,
    });
    new cdk.CfnOutput(this, 'apiUrl', {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      value: httpApi.url!,
    });
  }
}
```

Let's go over what we did in the code sample:

- We created a basic lambda function and an API
- We created an authorizer, where we provided the following parameters:
- userPool - the user pool this authorizer will be associated with
- userPoolClients - an array containing the user pool client(s) that will be used to authorize requests with the user pool
- identitySource - the identity source, which requests authorization. In our case the JWT token will be passed in the Authorization HTTP header to authorize a user

We added a route to the API and set the authorizer property to the authorizer we created

```javascript
// 👇 set the Authorizer on the Route
httpApi.addRoutes({
  integration: new apiGatewayIntegrations.HttpLambdaIntegration('protected-fn-integration', lambdaFunction),
  path: '/protected',
  authorizer,
});
```

## Deploy API Gateway with Authorizer

```sh
cdk synth
cdk bootstrap
cdk deploy
cdk destroy

```

When we synthesize our CloudFormation stack, it gets generated in the cdk.out directory. This is also where the asset files for our Lambda functions are stored.
Let's run the synth command to generate the lambda assets:

```sh
npx aws-cdk synth
```

If we now take a look at the assets folder in the cdk.out directory, we can see that our Lambda function's code has been compiled down to JavaScript.

## Deploy the Lambda function

The next step is to bootstrap an environment. This action is required only if it is the first time you want to deploy with the CDK; you can skip this if you have already done it before.

This command will create a stack that includes resources used for the toolkit's operation, like an S3 bucket to store templates and assets during the deployment process.

````sh
cdk bootstrap

⏳  Bootstrapping environment aws://123456789012/eu-west-1...
Once done, we can deploy our app:
``

```sh
npx aws-cdk deploy
````

## Cleanup

To delete the stack from your account, run the destroy command:

```sh
npx aws-cdk destroy
```
