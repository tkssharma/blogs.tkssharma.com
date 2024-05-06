---
date: 2023-03-16
title: 'Building Lambda trigger with Dynamo, S3, SNS, SQS using AWS CDK Part-11'
template: post
featuredImage: '../thumbnails/cdk.png'
thumbnail: '../thumbnails/cdk.png'
slug: building-lambda-trigger-with-sns-sqs-s3-using-aws-cdk-part-11
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

# Building Lambda trigger with S3, SNS, SQS using AWS CDK Part-11

| Part    | Link                                                                           |
| ------- | ------------------------------------------------------------------------------ |
| Part-0  | https://tkssharma.com/aws-cdk-for-deploying-aws-resources-blogs-series         |
| Part-1  | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-1        |
| Part-2  | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-2        |
| Part-3  | https://tkssharma.com/deploy-api-gateway-using-aws-cdk-part-3                  |
| Part-4  | https://tkssharma.com/deploy-lambda-with-s3-dynamo-and-api-gateway-cdk-part-4  |
| Part-5  | https://tkssharma.com/deploy-proxy-api-gateway-and-rest-apis-cdk-part-5        |
| Part-6  | https://tkssharma.com/deploy-proxy-api-gateway-and-rest-apis-cdk-part-6        |
| Part-7  | https://tkssharma.com/deploy-api-gateway-with-lambda-and-authorizer-part-7     |
| Part-8  | https://tkssharma.com/deploying-ec2-instance-nested-stack-using-aws-cdk-part-8 |
| Part-9  | https://tkssharma.com/deploying-rds-database-stack-using-aws-cdk-part-9        |
| Part-10 | https://tkssharma.com/deploying-sns-sqs-using-aws-cdk-part-10                  |

![](https://i.ytimg.com/vi/h_gRGRbOjJ8/maxresdefault.jpg)

In this Blog we will cover all these Topics

We will see how we can trigger lambda from all different Lambda triggers
like execute lambda on

- S3 file add and trigger lambda
- Dynamo DB table update and trigger lambda
- SNS Topic message push and trigger lambda
- SQS Events and trigger lambda

![](https://d2908q01vomqb2.cloudfront.net/fc074d501302eb2b93e2554793fcaf50b3bf7291/2019/06/27/Screen-Shot-2019-06-27-at-2.23.51-PM-1024x510.png)

# Understanding the Different Ways to Invoke Lambda Functions

## Synchronous Invokes

Synchronous invocations are the most straight forward way to invoke your Lambda functions. In this model, your functions execute immediately when you perform the Lambda Invoke API call. This can be accomplished through a variety of options, including using the CLI or any of the supported SDKs.

Many AWS services can emit events that trigger Lambda functions. Here is a list of services that invoke Lambda functions synchronously:

- [Elastic Load Balancing (Application Load Balancer)](https://docs.aws.amazon.com/lambda/latest/dg/services-alb.html)
- [Amazon Cognito](https://docs.aws.amazon.com/lambda/latest/dg/services-cognito.html)
- [Amazon Lex](https://docs.aws.amazon.com/lambda/latest/dg/services-lex.html)
- [Amazon Alexa](https://docs.aws.amazon.com/lambda/latest/dg/services-alexa.html)
- [Amazon API Gateway](https://docs.aws.amazon.com/lambda/latest/dg/with-on-demand-https.html)
- [Amazon CloudFront (Lambda@Edge)](https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html)
- [Amazon Kinesis Data Firehose](https://docs.aws.amazon.com/lambda/latest/dg/services-kinesisfirehose.html)

## Asynchronous Invokes

Here is a list of services that invoke Lambda functions asynchronously:

- [Amazon Simple Storage Service](https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html)
- [Amazon Simple Notification Service](https://docs.aws.amazon.com/lambda/latest/dg/with-sns.html)
- [Amazon Simple Email Service](https://docs.aws.amazon.com/lambda/latest/dg/services-ses.html)
- [AWS CloudFormation](https://docs.aws.amazon.com/lambda/latest/dg/services-cloudformation.html)
- [Amazon CloudWatch Logs](https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchlogs.html)
- [Amazon CloudWatch Events](https://docs.aws.amazon.com/lambda/latest/dg/with-scheduled-events.html)
- [AWS CodeCommit](https://docs.aws.amazon.com/lambda/latest/dg/services-codecommit.html)
- [AWS Config](https://docs.aws.amazon.com/lambda/latest/dg/services-config.html)

Asynchronous invokes place your invoke request in Lambda service queue and we process the requests as they arrive. You should use [AWS X-Ray](https://docs.aws.amazon.com/lambda/latest/dg/lambda-x-ray.html) to review how long your request spent in the service queue by checking the “dwell time” segment.

### Lambda Trigger with Dynamo DB

We want to run some operation on dynamo DB put operation
then lets see how we do it using lambda trigger

```sh
npm i @aws-cdk/aws-lambda-event-sources
npm i @aws-cdk/aws-lambda

```

Our simple stack with Dynamo DB Table and lambda function

```javascript
import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import { DynamoEventSource } from '@aws-cdk/aws-lambda-event-sources';

export class HowToTriggerLambdaFromDdbStreamStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'Table', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
      tableName: 'Table',
    });

    const lambdaFunction = new lambda.Function(this, 'Function', {
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
      functionName: 'TableStreamHandler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    lambdaFunction.addEventSource(
      new DynamoEventSource(table, {
        startingPosition: lambda.StartingPosition.LATEST,
      })
    );
  }
}
```

Lambda will be triggered when we add record to the dynamo DB tABLE

### lambda Trigger with S3 file upload

we can trigger lambda on different S3 bucket operations

```javascript
import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdaEventSources from '@aws-cdk/aws-lambda-event-sources';

export class HowToTriggerLambdaFromS3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'OurBucket', {
      /**
       * The following properties ensure the bucket is properly
       * deleted when we run cdk destroy */
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const lambdaFunction = new lambda.Function(this, 'Function', {
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
      functionName: 'BucketPutHandler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    const s3PutEventSource = new lambdaEventSources.S3EventSource(bucket, {
      events: [s3.EventType.OBJECT_CREATED_PUT],
    });

    lambdaFunction.addEventSource(s3PutEventSource);
  }
}
```

Lambda will be triggered when we upload file to S3 bucket

### Lambda trigger with SNS

```javascript
import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdaEventSources from '@aws-cdk/aws-lambda-event-sources';

export class HowToTriggerLambdaFromSnsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const topic = new sns.Topic(this, 'OurSnsTopic', {
      displayName: 'Our SNS Topic',
    });

    const lambdaFunction = new lambda.Function(this, 'Function', {
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
      functionName: 'SnsMessageHandler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    const eventSource = new lambdaEventSources.SnsEventSource(topic);

    lambdaFunction.addEventSource(eventSource);
  }
}
```

### Lambda Trigger with SQS

```javascript
import * as cdk from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdaEventSources from '@aws-cdk/aws-lambda-event-sources';

export class HowToTriggerLambdaFromSqsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'OurSqsQueue', {
      queueName: 'OurSQSQueue',
    });

    const lambdaFunction = new lambda.Function(this, 'Function', {
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
      functionName: 'SqsMessageHandler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    const eventSource = new lambdaEventSources.SqsEventSource(queue);

    lambdaFunction.addEventSource(eventSource);
  }
}
```

## Deploy Lambda Trigger Stack to AWS using CDK

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

## Deploy Stack

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
