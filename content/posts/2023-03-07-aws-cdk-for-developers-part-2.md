---
date: 2023-03-07
title: 'Build and Deploy Applications using AWS CDK Part-2'
template: post
featuredImage: '../thumbnails/cdk.png'
thumbnail: '../thumbnails/cdk.png'
slug: build-and-deploy-application-using-aws-cdk-part-2
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

# Build and Deploy application using AWS CDK Part-2

| Part   | Link                                                                    |
| ------ | ----------------------------------------------------------------------- |
| Part-0 | https://tkssharma.com/aws-cdk-for-deploying-aws-resources-blogs-series  |
| Part-1 | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-1 |

![](https://i.ytimg.com/vi/h_gRGRbOjJ8/maxresdefault.jpg)

In this Blog we will cover all these Topics

- Writing the Infrastructure for TypeScript Lambdas in AWS CDK
- Writing the Code for TypeScript Lambdas
- Deploying TypeScript Lambdas with AWS CDK
- Optimizing TypeScript Lambdas with CDK

# Lets build and deploy a simple Lambda Function

Lets build a simple Lambda Function in put Stack

We write our CDK code using TypeScript, so it makes sense to also write our Lambda code in TypeScript.

Nodejs doesn't natively support TypeScript, so we have to first compile our TypeScript code to JavaScript before we can deploy our Lambda functions.

In order to write a Lambda function in TypeScript and provision it with CDK, we have to use the NodejsFunction construct, which uses esbuild to automatically transpile and bundle our code.
so this is not something which we were doing earlier

Lets prepare our Application and Stack

```javascript
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStarterStack } from '../lib/lambda-app-stack';

const app = new cdk.App();
new CdkStarterStack(app, 'apiLambdaStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  stage: process.env.STAGE!,

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
```

```javascript
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myFunction = new NodejsFunction(this, 'my-function', {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'main',
      entry: path.join(__dirname, `/../src/my-lambda/index.ts`),
    });
  }
}
```

- We have a CDK stack that provisions a single Lambda function

- The Lambda function uses the NodejsFunction construct which automatically transpiles and bundles our code, regardless if it's written in JavaScript or TypeScript

- The entry prop we passed to the function constructor is a path to the lambda function's code on the local file system. The entry prop supports files with .js, .jsx, .ts and .tsx extensions.

- The other props we passed to the NodejsFunction constructor are the same props the generic Function construct supports.

```javascript
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

export async function main(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  console.log('event 👉', event);

  return {
    body: JSON.stringify({ message: 'Successful lambda invocation' }),
    statusCode: 200,
  };
}
```

## Deploy Typescript Lambda to AWS

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

Now

```sh
npx aws-cdk deploy
```

## Optimize Typescript Lambda function

The NodejsFunction construct uses esbuild under the hood to automatically transpile and bundle our code.

We can use the construct to write JavaScript or TypeScript and everything just works automatically. There are no Webpack configuration files we have to manage.

```javascript
const myFunction = new NodejsFunction(this, 'my-function', {
  // ...rest
  bundling: {
    minify: true,
    externalModules: ['aws-sdk'],
  },
});
```

- minify is a boolean that allows us to specify whether we want to minify the code of our Lambda function. This enables us to decrease bundle size and improve performance for larger functions.

- externalModules is a string array that allows us to specify which modules should NOT be bundled with our Lambda code. This enables us to exclude modules that are already available in the Lambda runtime - for instance aws-sdk and layers.

## Cleanup

To delete the stack from your account, run the destroy command:

```sh
npx aws-cdk destroy
```
