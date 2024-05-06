---
date: 2023-03-09
title: 'Deploy Lambda with API Gateway S3 and Dynamo DB AWS-CDK Part-4'
template: post
featuredImage: '../thumbnails/cdk.png'
thumbnail: '../thumbnails/cdk.png'
slug: deploy-lambda-with-s3-dynamo-and-api-gateway-cdk-part-4
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

# Deploy Lambda with API Gateway S3 and Dynamo DB

| Part   | Link                                                                    |
| ------ | ----------------------------------------------------------------------- |
| Part-0 | https://tkssharma.com/aws-cdk-for-deploying-aws-resources-blogs-series  |
| Part-1 | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-1 |
| Part-2 | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-2 |
| Part-3 | https://tkssharma.com/deploy-api-gateway-using-aws-cdk-part-3           |

![](https://i.ytimg.com/vi/h_gRGRbOjJ8/maxresdefault.jpg)

In this Blog we will cover all these Topics

- Build a simple Lambda function
- Attach REST API gateway to the lambda
- Add S3 bucket in our stack
- Add Dynamo DB table in out stack
- All lambda to access S3 and Dynamo DB
- Attaching Lambda to REST API gateway Resource
- Deploying and Cleaning up Resources

This is how our whole stack Looks like, lets take a look and understand each and every blocks for these constructs in out Stack

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
      value: apiGw.restApiName,
    });
  }
}
```

# Build a simple Lambda function

Lets build a simple Lambda Function using simple javascript

```javascript
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
- initialPolicy we can define policy for this lambda to define its permissions that this lambda can access

How we define policy for lambda

- Create a Lambda function.
- Create an IAM Policy statement.
- Attach an inline policy to the function's role, passing it the policy statement we created.
- attach policy to access S3, SNS, SQS or Dynamo Table

```javascript
[
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
];
```

This will add policy document for all resources, example of default policy document shown here

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"],
      "Resource": "*"
    }
  ]
}
```

## Add S3 bucket and Dynamo DB Table in our stack

```javascript
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
```

## Add permission to Read Write Table

```javascript
userDynamoTable.grantReadWriteData(apiGetUsersLambdaFn);
userUploadsS3Bucket.grantReadWrite(apiGetUsersLambdaFn);
```

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
  `proxy: true,` added here so this will just forward all HTTP requests to this lambda

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
  value: apiGw.restApiName,
});
```

## Deploy Typescript Lambda to AWS with API Gateway, S3, Dynamo Table

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
