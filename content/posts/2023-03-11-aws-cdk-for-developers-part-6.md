---
date: 2023-03-11
title: 'Deploy Dynamo DB Table using AWS CDK Part-6'
template: post
featuredImage: '../thumbnails/cdk.png'
thumbnail: '../thumbnails/cdk.png'
slug: deploy-proxy-api-gateway-and-rest-apis-cdk-part-6
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

# Deploy Dynamo DB Table using AWS CDK Part-6

| Part   | Link                                                                          |
| ------ | ----------------------------------------------------------------------------- |
| Part-0 | https://tkssharma.com/aws-cdk-for-deploying-aws-resources-blogs-series        |
| Part-1 | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-1       |
| Part-2 | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-2       |
| Part-3 | https://tkssharma.com/deploy-api-gateway-using-aws-cdk-part-3                 |
| Part-4 | https://tkssharma.com/deploy-lambda-with-s3-dynamo-and-api-gateway-cdk-part-4 |
| Part-5 | https://tkssharma.com/deploy-proxy-api-gateway-and-rest-apis-cdk-part-5       |

![](https://i.ytimg.com/vi/h_gRGRbOjJ8/maxresdefault.jpg)

In this Blog we will cover all these Topics

- Creating a Dynamodb Table in AWS CDK
- Granting Dynamodb table Permissions in AWS CDK
- Configuring Auto Scaling for a Dynamodb Table in AWS CDK
- Deleting Dynamodb Tables on CDK Destroy

Amazon DynamoDB is a fully managed, serverless, key-value NoSQL database designed to run high-performance applications at any scale. DynamoDB offers built-in security, continuous backups, automated multi-Region replication, in-memory caching, and data import and export tools.
DynamoDB works well with serverless stack like lambda, gateway and dynamoDB

This is how our whole stack Looks like, lets take a look and understand each and every blocks for these constructs in out Stack

## dynamodb simple stack

```javascript
import * as appautoscaling from 'aws-cdk-lib/aws-applicationautoscaling';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 👇 create Dynamodb table
    const table = new dynamodb.Table(this, id, {
      readCapacity: 1,
      writeCapacity: 1,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'createdAt', type: dynamodb.AttributeType.NUMBER },
      pointInTimeRecovery: true,
      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      /**
       *  The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
       * the new table, and it will remain in your account until manually deleted. By setting the policy to
       * DESTROY, cdk destroy will delete the table (even if it has data in it)
       */
      removalPolicy: stage === 'production' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY,
      pointInTimeRecovery: stage === 'production',
    });

    console.log('table name 👉', table.tableName);
    console.log('table arn 👉', table.tableArn);

    // 👇 add local secondary index
    table.addLocalSecondaryIndex({
      indexName: 'statusIndex',
      sortKey: { name: 'status', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    // 👇 grant permissions on table
    table.grantReadData(new iam.AccountRootPrincipal());

    // 👇 configure auto scaling on table
    const writeAutoScaling = table.autoScaleWriteCapacity({
      minCapacity: 1,
      maxCapacity: 2,
    });

    // 👇 scale up when write capacity hits 75%
    writeAutoScaling.scaleOnUtilization({
      targetUtilizationPercent: 75,
    });

    // 👇 scale up at 9 o'clock in the morning
    writeAutoScaling.scaleOnSchedule('scale-up', {
      schedule: appautoscaling.Schedule.cron({ hour: '9', minute: '0' }),
      minCapacity: 2,
    });

    // 👇 scale down in the afternoon
    writeAutoScaling.scaleOnSchedule('scale-down', {
      schedule: appautoscaling.Schedule.cron({ hour: '14', minute: '0' }),
      maxCapacity: 2,
    });
  }
}
```

Let's go over what we did in the code sample.

We created a Dynamodb table. The configuration props we passed to the Table class are:
billingMode - we set it as PROVISIONED. The alternative is PAY_PER_REQUEST, where the table will automatically scale with the traffic.

- readCapacity and writeCapacity - the provisioned throughput for the table

- removalPolicy - specify what should happen to the table if we delete the CDK stack or the table resource itself.

The default removalPolicy for stateful resources (databases, S3 buckets, Cognito User Pools, etc) is RETAIN, which means that the resource will remain in an orphaned state in the account, even after the CDK stack is deleted.

- partitionKey and sortKey - the primary key for our Dynamodb table

- pointInTimeRecovery - when set to true - enables continuous backups for our Dynamodb table

## scaling dynamodb

- We used the autoScaleWriteCapacity method to enable auto-scaling for the write capacity of our Dynamodb table
- We used the scaleOnUtilization method to scale our Dynamodb table up, in the event that the table's utilization reaches 75%.
- We used the scaleOnSchedule method to scale our table up and down depending on the
  time of the day.

```javascript
// 👇 configure auto scaling on table
const writeAutoScaling = table.autoScaleWriteCapacity({
  minCapacity: 1,
  maxCapacity: 2,
});

// 👇 scale up when write capacity hits 75%
writeAutoScaling.scaleOnUtilization({
  targetUtilizationPercent: 75,
});

// 👇 scale up at 9 o'clock in the morning
writeAutoScaling.scaleOnSchedule('scale-up', {
  schedule: appautoscaling.Schedule.cron({ hour: '9', minute: '0' }),
  minCapacity: 2,
});

// 👇 scale down in the afternoon
writeAutoScaling.scaleOnSchedule('scale-down', {
  schedule: appautoscaling.Schedule.cron({ hour: '14', minute: '0' }),
  maxCapacity: 2,
});
```

## Deploy Dynamo DB Table

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
