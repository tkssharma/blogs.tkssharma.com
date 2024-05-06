---
date: 2023-03-08
title: 'Build and Deploy Applications using AWS API Gateway AWS-CDK Part-3'
template: post
featuredImage: '../thumbnails/cdk.png'
thumbnail: '../thumbnails/cdk.png'
slug: deploy-api-gateway-using-aws-cdk-part-3
categories:
  - aws-cdk
  - aws
  - nodejs
  - microservices
tags:
  - aws-cdk
  - aws
  - nodejs
  - microservices
---

# Deploy API Gateway using AWS CDK Part-3

| Part   | Link                                                                    |
| ------ | ----------------------------------------------------------------------- |
| Part-0 | https://tkssharma.com/aws-cdk-for-deploying-aws-resources-blogs-series  |
| Part-1 | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-1 |
| Part-2 | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-2 |

![](https://i.ytimg.com/vi/h_gRGRbOjJ8/maxresdefault.jpg)

In this Blog we will cover all these Topics

- Build a simple Lambda function
- Attach rest api gateway to the lambda
- Deploying TypeScript Lambdas with AWS CDK

# Build a simple Lambda function

Lets build a simple Lambda Function using simple javascript

```javascript
const apiGetUsersLambdaFn = new cdk.aws_lambda.Function(this, `hello-world-${stage}`, {
  functionName: `hello-world-${stage}`,
  runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
  memorySize: 1024,
  logRetention: cdk.aws_logs.RetentionDays.FIVE_DAYS,
  environment: {
    stage,
  },
  handler: 'index.handler',
  code: cdk.aws_lambda.Code.fromAsset(path.join(__dirname, '..', 'src')),
});
```

This is how we generally create lambda function in javascript as it does not require compilation
Simple Lambda Function with just hello world message
Lets see what all we are passing to Lambda Construct

We create a Lambda function called lambdaNode Running on Node.js 14 with 1GB of memory allocated. The timeout is set to 300 seconds which is equal to 5 minutes. The property code indicates the folder's path to find the code to run when the Lambda is triggered. It is located in the src folder at the project root but, it doesn't exist yet,, so let's create it with mkdir src.
The handler property indicates the entry file then the function to run inside this file. So the index.handler can be broken down to:

- index: the file called index.js inside the src directory.
- handler: the function inside the index.js to executes.
- logRetention it will enable cloudwatch logs and passed arguments will set the number of days till these logs will be available
- environment we can pass key value pair which we need as env variable for this node js Lambda
- runtime runtime decided what platform we need for this lambda function like node js, python, java
- code we can point to a simple one javascript file or a zip file having handler code in some root level index.js file

Inside the src folder, create a file called index.js and add the content below:

```javascript
exports.handler = async function(event) {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/json' },
    body: JSON.stringify({ message: 'Hello from my Lambda node!' }),
  };
};
```

# Attach Proxy REST API Gateway to the lambda

There are many ways in which we can create API gateway

- a simple api gateway which is working just a Proxy so all request from gateway will be handled by a one single lambda

```javascript
// API GW
const apiGw = new cdk.aws_apigateway.LambdaRestApi(this, `hello-world-gw`, {
  handler: apiGetUsersLambdaFn,
  deploy: true,
  proxy: true,
  binaryMediaTypes: ['*/*'],
  deployOptions: {
    stageName: stage,
  },
});
```

we can also print all these resource output

```javascript
new cdk.CfnOutput(this, `apiGetUsersLambdaFn`, {
  exportName: `apiGetUsersLambdaFn--arn`,
  value: apiGetUsersLambdaFn.functionArn,
});
new cdk.CfnOutput(this, `hello-world-gateway`, {
  exportName: `hello-world-gateway-arn`,
  value: apiGw.restApiName,
});
```

## Deploy Typescript Lambda to AWS with API Gateway

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
