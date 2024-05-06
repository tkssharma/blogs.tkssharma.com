---
date: 2023-03-15
title: 'Deploying SNS & SQS with Lambda Part-10'
template: post
featuredImage: '../thumbnails/cdk.png'
thumbnail: '../thumbnails/cdk.png'
slug: deploying-sns-sqs-using-aws-cdk-part-10
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

# Deploying SNS SQS with Lambda Stack AWS CDK Part-10

| Part   | Link                                                                           |
| ------ | ------------------------------------------------------------------------------ |
| Part-0 | https://tkssharma.com/aws-cdk-for-deploying-aws-resources-blogs-series         |
| Part-1 | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-1        |
| Part-2 | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-2        |
| Part-3 | https://tkssharma.com/deploy-api-gateway-using-aws-cdk-part-3                  |
| Part-4 | https://tkssharma.com/deploy-lambda-with-s3-dynamo-and-api-gateway-cdk-part-4  |
| Part-5 | https://tkssharma.com/deploy-proxy-api-gateway-and-rest-apis-cdk-part-5        |
| Part-6 | https://tkssharma.com/deploy-proxy-api-gateway-and-rest-apis-cdk-part-6        |
| Part-7 | https://tkssharma.com/deploy-api-gateway-with-lambda-and-authorizer-part-7     |
| Part-8 | https://tkssharma.com/deploying-ec2-instance-nested-stack-using-aws-cdk-part-8 |
| Part-9 | https://tkssharma.com/deploying-rds-database-stack-using-aws-cdk-part-9        |

![](https://i.ytimg.com/vi/h_gRGRbOjJ8/maxresdefault.jpg)

In this Blog we will cover all these Topics

- Create a simple lambda stack
- create a SNS topic and add lambda subscription
- create a SQS queue and add sns Topic subscription

In this Blog we will build SNS Topic and add Lambda subscription to it so when we push message to SNS Topic Lambda will be triggered

Lets first create VPC using CDK

```javascript
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 👇 create sns topic
    const topic = new sns.Topic(this, 'sns-topic', {
      displayName: 'My SNS topic',
    });

    // 👇 create lambda function
    const myLambda = new NodejsFunction(this, 'my-lambda', {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'main',
      entry: path.join(__dirname, `./index.ts`),
    });

    // 👇 subscribe Lambda to SNS topic
    topic.addSubscription(new subs.LambdaSubscription(myLambda));

    new cdk.CfnOutput(this, 'snsTopicArn', {
      value: topic.topicArn,
      description: 'The arn of the SNS topic',
    });
  }
}
```

In this example lets see step by step what we are doing

- creating SNS Topic
- creating a lambda and adding subscription to SNS Topic

```javascript
const topic = new sns.Topic(this, 'sns-topic', {
  displayName: 'My SNS topic',
});

// 👇 create lambda function
const myLambda = new NodejsFunction(this, 'my-lambda', {
  memorySize: 1024,
  timeout: cdk.Duration.seconds(5),
  runtime: lambda.Runtime.NODEJS_16_X,
  handler: 'main',
  entry: path.join(__dirname, `/../src/my-lambda/index.ts`),
});

// 👇 subscribe Lambda to SNS topic
topic.addSubscription(new subs.LambdaSubscription(myLambda));
```

Our Typescript lambda function is simple code

```javascript
import { APIGatewayProxyResultV2, SNSEvent } from 'aws-lambda';

export async function main(event: SNSEvent): Promise<APIGatewayProxyResultV2> {
  const records = event.Records.map((record) => {
    const { Message, Subject, Type } = record.Sns;

    return { subject: Subject, message: Message, type: Type };
  });

  console.log('records: 👉', JSON.stringify(records, null, 2));

  return {
    body: JSON.stringify({ records }),
    statusCode: 2000,
  };
}
```

## SNS Topic with SQS subscription in AWS CDK

Let's subscribe an SQS queue to our SNS topic as well. In order to create the queue we will instantiate the Queue class.

```javascript
import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ... rest

    // 👇 create queue
    const queue = new sqs.Queue(this, 'sqs-queue');

    // 👇 subscribe queue to topic
    topic.addSubscription(new subs.SqsSubscription(queue));
  }
}
```

Now when we publish message to SNS Topic it will be pushed to SQS and Lambda trigger

- Lambda subscription so lambda code will be executed on topic message push
- SQS will also receive message from SNS Topic

You can further add lambda handler for SQS queue as event source

```javascript
import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myOtherLambda = new NodejsFunction(this, 'my-other-lambda', {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'main',
      entry: path.join(__dirname, `/../src/my-other-lambda/index.ts`),
    });

    // 👇 subscribe Lambda to SNS topic
    // ... rest

    // 👇 create queue
    const queue = new sqs.Queue(this, 'sqs-queue');

    // 👇 subscribe queue to topic
    topic.addSubscription(new subs.SqsSubscription(queue));
    const eventSource = new lambdaEventSources.SqsEventSource(queue);
    lambdaFunction.addEventSource(eventSource);
  }
}
```

Its like fun now we have added event source so on SQS event this lambda will be triggered

## Deploy SNS and SQS with Lambda

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
