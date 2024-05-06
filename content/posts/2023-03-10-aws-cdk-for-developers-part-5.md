---
date: 2023-03-10
title: 'Deploy Lambda with API Gateway with different options AWS-CDK Part-5'
template: post
featuredImage: '../thumbnails/cdk.png'
thumbnail: '../thumbnails/cdk.png'
slug: deploy-proxy-api-gateway-and-rest-apis-cdk-part-5
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

# Deploy Lambda with API Gateway with different options AWS-CDK Part-5

| Part   | Link                                                                          |
| ------ | ----------------------------------------------------------------------------- |
| Part-0 | https://tkssharma.com/aws-cdk-for-deploying-aws-resources-blogs-series        |
| Part-1 | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-1       |
| Part-2 | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-2       |
| Part-3 | https://tkssharma.com/deploy-api-gateway-using-aws-cdk-part-3                 |
| Part-4 | https://tkssharma.com/deploy-lambda-with-s3-dynamo-and-api-gateway-cdk-part-4 |

![](https://i.ytimg.com/vi/h_gRGRbOjJ8/maxresdefault.jpg)

In this Blog we will cover all these Topics

- Build a simple Lambda function
- Attach REST API gateway to the lambda using v1
- Attach REST API gateway to the lambda using v2
- Attach Proxy API gateway to the lambda

We are going to build api gateway but using different approach and options
one is just api proxy gateway pointing to lambda function
Another is REST Gateway with REST APIs exposed and calling different lambda functions from Gateway

This is how our whole stack Looks like, lets take a look and understand each and every blocks for these constructs in out Stack

## API Gateway just as Proxy

```javascript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

import * as path from 'path';

export interface LambdaProps extends cdk.StackProps {
  stage: string;
}

export class LambdaAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: LambdaProps) {
    super(scope, id, props);

    const { stage } = props;

    const apiGetUsersLambdaFn = new cdk.aws_lambda.Function(this, `api-get-user-${stage}`, {
      functionName: `api-get-user-lambda-${stage}`,
      runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
      memorySize: 1024,
      logRetention: cdk.aws_logs.RetentionDays.FIVE_DAYS,
      environment: {
        stage,
      },
      handler: 'index.handler',
      code: cdk.aws_lambda.Code.fromAsset(path.join(__dirname, '..', 'src')),
      initialPolicy: [
        new cdk.aws_iam.PolicyStatement({
          effect: cdk.aws_iam.Effect.ALLOW,
          actions: ['s3:*'],
          resources: ['*'],
        }),
        new cdk.aws_iam.PolicyStatement({
          effect: cdk.aws_iam.Effect.ALLOW,
          actions: ['sns:*'],
          resources: ['*'],
        }),
        new cdk.aws_iam.PolicyStatement({
          effect: cdk.aws_iam.Effect.ALLOW,
          actions: ['dynamodb:*'],
          resources: ['*'],
        }),
      ],
    });

    userDynamoTable.grantReadWriteData(apiGetUsersLambdaFn);
    userUploadsS3Bucket.grantReadWrite(apiGetUsersLambdaFn);

    // API GW
    const apiGw = new cdk.aws_apigateway.LambdaRestApi(this, `users-api-gw`, {
      handler: apiGetUsersLambdaFn,
      deploy: true,
      proxy: true,
      binaryMediaTypes: ['*/*'],
      deployOptions: {
        stageName: stage,
      },
    });

    new cdk.CfnOutput(this, `apiGetUsersLambdaFn`, {
      exportName: `apiGetUsersLambdaFn--arn`,
      value: apiGetUsersLambdaFn.functionArn,
    });

    new cdk.CfnOutput(this, `user-api-gateway`, {
      exportName: `user-api--gateway-arn`,
      value: apiGw.restApiName,
    });
  }
}
```

In this example we are just creating Proxy gateway

```javascript
const apiGw = new cdk.aws_apigateway.LambdaRestApi(this, `users-api-gw`, {
  handler: apiGetUsersLambdaFn,
  deploy: true,
  proxy: true,
  binaryMediaTypes: ['*/*'],
  deployOptions: {
    stageName: stage,
  },
});
```

Here `proxy` is true and handler is `apiGetUsersLambdaFn` single lambda function

## Building Gateway as REST API Gateway

```javascript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

import * as path from 'path';

export interface LambdaProps extends cdk.StackProps {
  stage: string;
}

export class LambdaAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: LambdaProps) {
    super(scope, id, props);

    const { stage } = props;

    const userUploadsS3Bucket = new cdk.aws_s3.Bucket(this, `user-api-upload-${stage}`, {
      bucketName: `user-api-upload-${stage}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const userDynamoTable = new dynamodb.Table(this, `users-table-${stage}`, {
      tableName: `api-users-table-${stage}`,
      partitionKey: { name: 'user_id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'created_at', type: dynamodb.AttributeType.NUMBER },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const apiGetUsersLambdaFn = new cdk.aws_lambda.Function(this, `api-get-user-${stage}`, {
      functionName: `api-get-user-lambda-${stage}`,
      runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
      memorySize: 1024,
      logRetention: cdk.aws_logs.RetentionDays.FIVE_DAYS,
      environment: {
        stage,
      },
      handler: 'index.handler',
      code: cdk.aws_lambda.Code.fromAsset(path.join(__dirname, '..', 'src')),
      initialPolicy: [
        new cdk.aws_iam.PolicyStatement({
          effect: cdk.aws_iam.Effect.ALLOW,
          actions: ['s3:*'],
          resources: [userUploadsS3Bucket.bucketArn],
        }),
        new cdk.aws_iam.PolicyStatement({
          effect: cdk.aws_iam.Effect.ALLOW,
          actions: ['sns:*'],
          resources: ['*'],
        }),
        new cdk.aws_iam.PolicyStatement({
          effect: cdk.aws_iam.Effect.ALLOW,
          actions: ['dynamodb:*'],
          resources: [userDynamoTable.tableArn],
        }),
      ],
    });
    const apiPutUsersLambdaFn = new cdk.aws_lambda.Function(this, `api-put-user-${stage}`, {
      functionName: `api-put-user-lambda-${stage}`,
      runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
      memorySize: 1024,
      logRetention: cdk.aws_logs.RetentionDays.FIVE_DAYS,
      environment: {
        stage,
      },
      handler: 'index.handler',
      code: cdk.aws_lambda.Code.fromAsset(path.join(__dirname, '..', 'src')),
      initialPolicy: [
        new cdk.aws_iam.PolicyStatement({
          effect: cdk.aws_iam.Effect.ALLOW,
          actions: ['s3:*'],
          resources: [userUploadsS3Bucket.bucketArn],
        }),
        new cdk.aws_iam.PolicyStatement({
          effect: cdk.aws_iam.Effect.ALLOW,
          actions: ['sns:*'],
          resources: ['*'],
        }),
        new cdk.aws_iam.PolicyStatement({
          effect: cdk.aws_iam.Effect.ALLOW,
          actions: ['dynamodb:*'],
          resources: [userDynamoTable.tableArn],
        }),
      ],
    });
    const apiPostUsersLambdaFn = new cdk.aws_lambda.Function(this, `api-post-user-${stage}`, {
      functionName: `api-post-user-lambda-${stage}`,
      runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
      memorySize: 1024,
      logRetention: cdk.aws_logs.RetentionDays.FIVE_DAYS,
      environment: {
        stage,
      },
      handler: 'index.handler',
      code: cdk.aws_lambda.Code.fromAsset(path.join(__dirname, '..', 'src')),
      initialPolicy: [
        new cdk.aws_iam.PolicyStatement({
          effect: cdk.aws_iam.Effect.ALLOW,
          actions: ['s3:*'],
          resources: [userUploadsS3Bucket.bucketArn],
        }),
        new cdk.aws_iam.PolicyStatement({
          effect: cdk.aws_iam.Effect.ALLOW,
          actions: ['sns:*'],
          resources: ['*'],
        }),
        new cdk.aws_iam.PolicyStatement({
          effect: cdk.aws_iam.Effect.ALLOW,
          actions: ['dynamodb:*'],
          resources: [userDynamoTable.tableArn],
        }),
      ],
    });

    userDynamoTable.grantReadWriteData(apiGetUsersLambdaFn);
    userUploadsS3Bucket.grantReadWrite(apiGetUsersLambdaFn);
    userDynamoTable.grantReadWriteData(apiPostUsersLambdaFn);
    userUploadsS3Bucket.grantReadWrite(apiPostUsersLambdaFn);

    userDynamoTable.grantReadWriteData(apiPutUsersLambdaFn);
    userUploadsS3Bucket.grantReadWrite(apiPutUsersLambdaFn);

    // Integrate the Lambda functions with the API Gateway resource
    const getAllUserIntegration = new cdk.aws_apigateway.LambdaIntegration(apiGetUsersLambdaFn);
    const postUserIntegration = new cdk.aws_apigateway.LambdaIntegration(apiPostUsersLambdaFn);

    const putUserIntegration = new cdk.aws_apigateway.LambdaIntegration(apiPutUsersLambdaFn);

    // Create an API Gateway resource for each of the CRUD operations
    const api = new cdk.aws_apigateway.RestApi(this, `users-apis-${stage}`, {
      restApiName: `user Service ${stage}`,
    });

    const user = api.root.addResource('users');
    user.addMethod('GET', getAllUserIntegration);
    user.addMethod('POST', postUserIntegration);
    user.addMethod('PUT', putUserIntegration);

    new cdk.CfnOutput(this, `apiGetUsersLambdaFn`, {
      exportName: `apiGetUsersLambdaFn--arn`,
      value: apiGetUsersLambdaFn.functionArn,
    });
    new cdk.CfnOutput(this, `apiPutUsersLambdaFn`, {
      exportName: `apiPutUsersLambdaFn--arn`,
      value: apiPutUsersLambdaFn.functionArn,
    });
    new cdk.CfnOutput(this, `apiPostUsersLambdaFn`, {
      exportName: `apiPostUsersLambdaFn--arn`,
      value: apiPostUsersLambdaFn.functionArn,
    });
    new cdk.CfnOutput(this, `userDynamoTable`, {
      exportName: `userDynamoTable--arn`,
      value: userDynamoTable.tableArn,
    });
    new cdk.CfnOutput(this, `userUploadsS3Bucket`, {
      exportName: `userUploadsS3Bucket--arn`,
      value: userUploadsS3Bucket.bucketArn,
    });
    new cdk.CfnOutput(this, `user-api-gateway`, {
      exportName: `user-api--gateway-arn`,
      value: api.restApiName,
    });
  }
}
```

In this example we are creating REST API gateway and adding REST API resources to it

```javascript
// Create an API Gateway resource for each of the CRUD operations
const api = new cdk.aws_apigateway.RestApi(this, `users-apis-${stage}`, {
  restApiName: `user Service ${stage}`,
});

// Integrate the Lambda functions with the API Gateway resource
const getAllUserIntegration = new cdk.aws_apigateway.LambdaIntegration(apiGetUsersLambdaFn);
const postUserIntegration = new cdk.aws_apigateway.LambdaIntegration(apiPostUsersLambdaFn);

const putUserIntegration = new cdk.aws_apigateway.LambdaIntegration(apiPutUsersLambdaFn);

const user = api.root.addResource('users');
user.addMethod('GET', getAllUserIntegration);
user.addMethod('POST', postUserIntegration);
user.addMethod('PUT', putUserIntegration);
```

When we deploy this stack we will have users resource created on API Gateway with all different methods mapped to different HTTP methods

- api-gateway-url/\${stage}/users -- getAllUserIntegration HTTP GET
- api-gateway-url/\${stage}/users -- postUserIntegration HTTP POST
- api-gateway-url/\${stage}/users -- putUserIntegration HTTP PUT

we can also control CORS configuration for API Gateway

```javascript
const api = new apigateway.RestApi(this, 'api', {
  description: 'example api gateway',
  deployOptions: {
    stageName: 'dev',
  },
  // 👇 enable CORS
  defaultCorsPreflightOptions: {
    allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key'],
    allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowCredentials: true,
    allowOrigins: ['http://localhost:3000'],
  },
});

// 👇 create an Output for the API URL
new cdk.CfnOutput(this, 'apiUrl', { value: api.url });
```

## Building Gateway as REST API Gateway V2

Now we can check V2 for same approach
Now these REST APIs are more simplified using stack with V2 APIs

```javascript
import { CorsHttpMethod, HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as lambda from 'aws-cdk-lib/aws-lambda';
```

This approach is little more simplified and we have to write less code for adding REST APIs resources to the gateway

```javascript
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
} from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const httpApi = new HttpApi(this, 'cors-demo-api', {
      description: 'API for CORS demo',
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.PATCH,
          CorsHttpMethod.DELETE,
        ],
        allowCredentials: true,
        allowOrigins: ['http://localhost:3000'],
        // 👇 optionally cache responses to preflight requests
        // maxAge: cdk.Duration.minutes(5),
      },
    });


    // 👇 create get-todos Lambda
    const getTodosLambda = new lambda.Function(this, 'get-todos', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../src')),
    });

    // 👇 add route for GET /todos
    httpApi.addRoutes({
      path: '/todos',
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration(
        'get-todos-integration',
        getTodosLambda
      ),
    });

    // 👇 create delete-todos Lambda
    const deleteTodoLambda = new lambda.Function(this, 'delete-todo', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../src')),
    });

    // 👇 add route for DELETE /todos/{todoId}
    httpApi.addRoutes({
      path: '/todos/{todoId}',
      methods: [HttpMethod.DELETE],
      integration: new HttpLambdaIntegration(
        'delete-todo-integration',
        deleteTodoLambda
      ),
    });

    // 👇 add an Output with the API Url
    new cdk.CfnOutput(this, 'apiUrl', {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      value: httpApi.url!,
    });
  }
}
```

This is the major change and we are able to add resources and routes using simple methods

```javascript
httpApi.addRoutes({
  path: '/todos',
  methods: [HttpMethod.GET],
  integration: new HttpLambdaIntegration('get-todos-integration', getTodosLambda),
});
```

## Deploy API Gateway with different approaches

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
