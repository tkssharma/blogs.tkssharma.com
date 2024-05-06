---
date: 2023-03-17
title: 'Build Cloudwatch alarm for Lambda using AWS CDK Part-12'
template: post
featuredImage: '../thumbnails/cdk.png'
thumbnail: '../thumbnails/cdk.png'
slug: building-cloudwatch-alarm-for-lambda-part-12
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

# Build Cloudwatch alarm for Lambda using AWS CDK Part-12

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

![](https://i.ytimg.com/vi/h_gRGRbOjJ8/maxresdefault.jpg)

In this Blog we will build cloudwatch alarm for lambda errors

## AWS Cloudwatch

Amazon CloudWatch monitors your Amazon Web Services (AWS) resources and the applications you run on AWS in real time. You can use CloudWatch to collect and track metrics, which are variables you can measure for your resources and applications.

The CloudWatch home page automatically displays metrics about every AWS service you use. You can additionally create custom dashboards to display metrics about your custom applications, and display custom collections of metrics that you choose.

You can create alarms that watch metrics and send notifications or automatically make changes to the resources you are monitoring when a threshold is breached. For example, you can monitor the CPU usage and disk reads and writes of your Amazon EC2 instances and then use that data to determine whether you should launch additional instances to handle increased load. You can also use this data to stop under-used instances to save money.

All AWS Services Emit events that can be used to setup a alarm and notify
end users on certain events like CDN errors, Lambda errors, EC2 Instance errors

- ConcurrentExecutions, Duration, Errors for a Lambda function
- CPUUtilization, DiskReadOps, DiskWriteOps for EC2 instances
- ConsumedReadCapacityUnits, ConsumedWriteCapacityUnits, ThrottledRequests for Dynamodb

As AWS services are emitting these events we can track them by creating alarm for such events and can add lambda invocation to send message to Teams channel or Slack

We will build this use case for lambda errors

- we will build simple lambda function which throws errors
- we will attach cloudwatch alarm to certain events
- To create alarms we need cloudwatch matrix

Lets explore all these things together

### what is cloudwatch matrix (example)

We will build alarms not for just one error but when we see particular pattern or matrix of errors then only we want to have alarm for it

For instance, we can create an alarm that notifies us:

- if the sum of Errors of a lambda function is greater than or equal to 5 for a period of 3 minutes

- if the average Duration time of a lambda function's invocation exceeds 2 seconds over a period of 3 minutes

The purpose of an alarm in CloudWatch is to notify us when the metrics we've set reach specific values, over a specified period of time.

Every AWS service has documentation on the list of the metrics that are available by default:

- Lambda function metrics https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics.html
- EC2 instance metrics https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html
- DynamoDB metrics

## Lets create alarm for lambda errors

we need to build all these resources

- simple lambda function which throws errors
- metric that tracks the number of function invocation errors
- metric that tracks how many times our lambda function was invoked
- an alarm that triggers if the SUM of errors for lambda function invocations is greater than or equal to 1 over a period of 1 minute
  an alarm that triggers if the SUM of Lambda invocations is greater than or equal to 1 over a period of 1 minute

start by adding lambda function and matrix

```javascript
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';

export class MyCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    // 👇 lambda function definition
    const myFunction = new lambda.Function(this, 'my-function', {
      runtime: lambda.Runtime.NODEJS_16_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../src/my-lambda')),
    });

    // 👇 define a metric for lambda errors
    const functionErrors = myFunction.metricErrors({
      period: cdk.Duration.minutes(1),
    });
    // 👇 define a metric for lambda invocations
    const functionInvocation = myFunction.metricInvocations({
      period: cdk.Duration.minutes(1),
    });
  }
}
```

Our lambda function just throws error

```javascript
async function main(event) {
  throw new Error('An unexpected error occurred');
}
module.exports = { main };
```

- Created a Lambda function
- Created 2 different metrics, by using the metricErrors and metricInvocations methods exposed by the Lambda Function construct

```javascript
// 👇 define a metric for lambda errors
const functionErrors = myFunction.metricErrors({
  period: cdk.Duration.minutes(1),
});
// 👇 define a metric for lambda invocations
const functionInvocation = myFunction.metricInvocations({
  period: cdk.Duration.minutes(1),
});
```

Lets add threshold for these alarms

```javascript
// 👇 define a metric for lambda errors
const functionErrors = myFunction.metricErrors({
  period: cdk.Duration.minutes(1),
});
// 👇 define a metric for lambda invocations
const functionInvocation = myFunction.metricInvocations({
  period: cdk.Duration.minutes(1),
});

// 👇 create an Alarm using the Alarm construct
new cloudwatch.Alarm(this, 'lambda-errors-alarm', {
  metric: functionErrors,
  threshold: 1,
  comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
  evaluationPeriods: 1,
  alarmDescription: 'Alarm if the SUM of Errors is greater than or equal to the threshold (1) for 1 evaluation period',
});

// 👇 create an Alarm directly on the Metric
functionInvocation.createAlarm(this, 'lambda-invocation-alarm', {
  threshold: 1,
  evaluationPeriods: 1,
  alarmDescription:
    'Alarm if the SUM of Lambda invocations is greater than or equal to the  threshold (1) for 1 evaluation period',
});
```

We are creating alarms using two different ways

```javascript
// 👇 create an Alarm using the Alarm construct
new cloudwatch.Alarm(this, 'lambda-errors-alarm', {
  metric: functionErrors,
  threshold: 1,
  comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
  evaluationPeriods: 1,
  alarmDescription: 'Alarm if the SUM of Errors is greater than or equal to the threshold (1) for 1 evaluation period',
});
```

or just by using lambda function construct

```javascript
functionInvocation.createAlarm(this, 'lambda-invocation-alarm', {
  threshold: 1,
  evaluationPeriods: 1,
  alarmDescription:
    'Alarm if the SUM of Lambda invocations is greater than or equal to the  threshold (1) for 1 evaluation period',
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
