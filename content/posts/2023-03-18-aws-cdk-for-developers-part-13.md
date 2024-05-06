---
date: 2023-03-18
title: 'Build Cloudwatch alarms for lambda log errors AWS CDK Part-13'
template: post
featuredImage: '../thumbnails/cdk.png'
thumbnail: '../thumbnails/cdk.png'
slug: building-cloudwatch-notification-for-lambda-log-errors-part-13
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

# Build Cloudwatch notification for lambda log errors AWS CDK Part-13

| Part    | Link                                                                                |
| ------- | ----------------------------------------------------------------------------------- |
| Part-0  | https://tkssharma.com/aws-cdk-for-deploying-aws-resources-blogs-series              |
| Part-1  | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-1             |
| Part-2  | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-2             |
| Part-3  | https://tkssharma.com/deploy-api-gateway-using-aws-cdk-part-3                       |
| Part-4  | https://tkssharma.com/deploy-lambda-with-s3-dynamo-and-api-gateway-cdk-part-4       |
| Part-5  | https://tkssharma.com/deploy-proxy-api-gateway-and-rest-apis-cdk-part-5             |
| Part-6  | https://tkssharma.com/deploy-proxy-api-gateway-and-rest-apis-cdk-part-6             |
| Part-7  | https://tkssharma.com/deploy-api-gateway-with-lambda-and-authorizer-part-7          |
| Part-8  | https://tkssharma.com/deploying-ec2-instance-nested-stack-using-aws-cdk-part-8      |
| Part-9  | https://tkssharma.com/deploying-rds-database-stack-using-aws-cdk-part-9             |
| Part-10 | https://tkssharma.com/deploying-sns-sqs-using-aws-cdk-part-10                       |
| Part-11 | https://tkssharma.com/building-lambda-trigger-with-sns-sqs-s3-using-aws-cdk-part-11 |
| Part-12 | https://tkssharma.com/building-cloudwatch-alarm-for-lambda-part-12                  |

![](https://i.ytimg.com/vi/h_gRGRbOjJ8/maxresdefault.jpg)

In this Blog we will track error logs from cloudwatch

## AWS Cloudwatch

Amazon CloudWatch monitors your Amazon Web Services (AWS) resources and the applications you run on AWS in real time. You can use CloudWatch to collect and track metrics, which are variables you can measure for your resources and applications.

The CloudWatch home page automatically displays metrics about every AWS service you use. You can additionally create custom dashboards to display metrics about your custom applications, and display custom collections of metrics that you choose.

You can create alarms that watch metrics and send notifications or automatically make changes to the resources you are monitoring when a threshold is breached. For example, you can monitor the CPU usage and disk reads and writes of your Amazon EC2 instances and then use that data to determine whether you should launch additional instances to handle increased load. You can also use this data to stop under-used instances to save money.

In this article, I want to show you how we can use the AWS CloudWatch subscription filter for filtering logs and forward them to a lambda function.

We need to set up a CloudWatch log group for receiving log events from applications. After that, you need to configure your application to send logs to this log group.

```javascript
const logGroup = new LogGroup(this, 'SubscriptionFilterLogGroup', {
  logGroupName: 'demo-app-logs',
  retention: RetentionDays.ONE_MONTH,
});
```

Create a Lambda Function for Processing Logs
In this step, we create a Lambda function for processing application logs that come from the CloudWatch subscription filter.

```javascript
const logProcessingFunction = new Function(this, 'LogProcessingLambda', {
  code: Code.fromAsset(path.join(__dirname, '../lambda')),
  handler: 'log.handler',
  runtime: Runtime.NODEJS_14_X,
  memorySize: 128,
});
```

Your Lambda handler can send message to Teams or Slack
That we can configure by adding slack or Teams web hook URL

```javascript
const zlib = require('zlib');
const https = require('https');
const url = require('url');

//https://api.slack.com/messaging/webhooks
const slack_url = 'https://hooks.slack.com/services/...';
const slack_req_opts = url.parse(slack_url);
slack_req_opts.method = 'POST';
slack_req_opts.headers = { 'Content-Type': 'application/json' };

exports.handler = function(event, context) {
  console.log('Event: ' + JSON.stringify(event, null, 2));
  const payload = new Buffer.from(event.awslogs.data, 'base64');
  zlib.gunzip(payload, function(e, decodedEvent) {
    if (e) {
      context.fail(e);
    } else {
      console.log('Decoded event: ' + decodedEvent);
      decodedEvent = JSON.parse(decodedEvent.toString('ascii'));

      const req = https.request(slack_req_opts, function(res) {
        if (res.statusCode === 200) {
          context.succeed('posted to slack');
        } else {
          context.fail('status code: ' + res.statusCode);
        }
      });

      req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        context.fail(e.message);
      });

      req.write(JSON.stringify({ text: JSON.stringify(decodedEvent, null, '  ') }));
      req.end();
    }
  });
};
```

Now our whole stack looks like this

```javascript
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { FilterPattern, LogGroup, RetentionDays, SubscriptionFilter } from 'aws-cdk-lib/aws-logs';
import { LambdaDestination } from 'aws-cdk-lib/aws-logs-destinations';
import * as path from 'path';

export class CdkCloudwatchLambdaSubscriptionFilterStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //Creating an AWS CloudWatch log group for receiving logs
    const logGroup = new LogGroup(this, 'SubscriptionFilterLogGroup', {
      logGroupName: 'demo-app-logs',
      retention: RetentionDays.ONE_MONTH,
    });

    //Create lambda function for cloudwatch data
    const logProcessingFunction = new Function(this, 'LogProcessingLambda', {
      code: Code.fromAsset(path.join(__dirname, '../lambda')),
      handler: 'log.handler',
      runtime: Runtime.NODEJS_14_X,
      memorySize: 128,
    });

    //Create subscription filter to forward logs to lambda
    const subscriptionFilter = new SubscriptionFilter(this, 'LogSubscriptionFilter', {
      logGroup,
      destination: new LambdaDestination(logProcessingFunction),
      filterPattern: FilterPattern.anyTerm('ERROR', 'Error', 'error', '404', '502'),
    });
  }
}
```

Important Part here is this SubscriptionFilter on logGroup which will trigger logProcessingFunction lambda function for these errors in log ['ERROR', 'Error', 'error', '404', '502']

```javascript
const subscriptionFilter = new SubscriptionFilter(this, 'LogSubscriptionFilter', {
  logGroup,
  destination: new LambdaDestination(logProcessingFunction),
  filterPattern: FilterPattern.anyTerm('ERROR', 'Error', 'error', '404', '502'),
});
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
