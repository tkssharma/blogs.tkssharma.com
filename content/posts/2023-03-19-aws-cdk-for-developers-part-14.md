---
date: 2023-03-19
title: 'Build alarms for cloudfront errors AWS CDK Part-14'
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

# Build alarms for cloudfront errors AWS CDK Part-14

| Part    | Link                                                                                 |
| ------- | ------------------------------------------------------------------------------------ |
| Part-0  | https://tkssharma.com/aws-cdk-for-deploying-aws-resources-blogs-series               |
| Part-1  | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-1              |
| Part-2  | https://tkssharma.com/build-and-deploy-application-using-aws-cdk-part-2              |
| Part-3  | https://tkssharma.com/deploy-api-gateway-using-aws-cdk-part-3                        |
| Part-4  | https://tkssharma.com/deploy-lambda-with-s3-dynamo-and-api-gateway-cdk-part-4        |
| Part-5  | https://tkssharma.com/deploy-proxy-api-gateway-and-rest-apis-cdk-part-5              |
| Part-6  | https://tkssharma.com/deploy-proxy-api-gateway-and-rest-apis-cdk-part-6              |
| Part-7  | https://tkssharma.com/deploy-api-gateway-with-lambda-and-authorizer-part-7           |
| Part-8  | https://tkssharma.com/deploying-ec2-instance-nested-stack-using-aws-cdk-part-8       |
| Part-9  | https://tkssharma.com/deploying-rds-database-stack-using-aws-cdk-part-9              |
| Part-10 | https://tkssharma.com/deploying-sns-sqs-using-aws-cdk-part-10                        |
| Part-11 | https://tkssharma.com/building-lambda-trigger-with-sns-sqs-s3-using-aws-cdk-part-11  |
| Part-12 | https://tkssharma.com/building-cloudwatch-alarm-for-lambda-part-12                   |
| Part-13 | https://tkssharma.com/building-cloudwatch-notification-for-lambda-log-errors-part-13 |  |

![](https://i.ytimg.com/vi/h_gRGRbOjJ8/maxresdefault.jpg)

In this Blog we will talk about adding alarms for CDN Failure on Cloudfront

## AWS Cloudfront

Amazon CloudFront is a content delivery web service(CDN). It integrates with other AWS Cloud services to give developers and businesses an easy way to distribute content to users across the world with low latency, high data transfer speeds, and no minimum usage commitments.

Amazon CloudFront Basics:
There are three core concepts that you need to understand to start using CloudFront: distributions, origins, and cache control.

1.Distributions: To use Amazon CloudFront, you start by creating a distribution, which is identified by a DNS domain name. To serve files from Amazon CloudFront, you simply use the distribution domain name in place of your website’s domain name; the rest of the file paths stay unchanged.

2. Origins: When you create a distribution, you must specify the DNS domain name of the origin — the Amazon S3 bucket or HTTP server — from which you want Amazon CloudFront to get the definitive version of your objects (web files).

3. Cache-Control: Once requested and served from an edge location, objects stay in the cache until they expire or are evicted to make room for more frequently requested content.

What all resources we are going to create here to build this use case of adding alarms for cloudfront failures [5xxErrorRate]

1. create cloudfront 5xxErrorRate matrix
2. attach 5xxErrorRate matrix with alarms
3. send alarm events to sns topic
4. sns topic can have Lambda subscriber to send message to Teams or Slack

We already have Cloudfront distributions
lets create 5xxErrorRate matrix for CDN

```javascript
const matrix5xxErrors = new aws_cloudwatch.Metric({
  namespace: `AWS/CloudFront`,
  metricName: '5xxErrorRate',
  unit: cdk.aws_cloudwatch.Unit.PERCENT,
  region: env?.region, // tried 'Global' as well
  statistic: 'Average',
  period: Duration.minutes(1),
  dimensionsMap: { DistributionId: `${distroIds[1].id}`, Region: 'Global' },
});
```

Create alarm for created Matrix

```javascript
const ErrorsMatrixAlarm = new aws_cloudwatch.Alarm(this, `dev${stage}CloudFrontErrors`, {
  metric: matrix5xxErrors,
  threshold: 75,
  evaluationPeriods: 3,
  datapointsToAlarm: 2,
});
```

add sns topic as alarm action, so when cloudfront raise such alarm it will push alarm event to sns topic

```javascript
    const snsTopic =
      cdk.aws_sns.Topic.fromTopicArn(
        this,
        `notification-topic-${stage}`,
        infraAlarmNotificationARN!
      );
    purCfMetricAlarm.addAlarmAction(
      new aws_cloudwatch_actions.SnsAction(
        snsTopic
      )
    );
```

Now we can write Lambda function which will act as listener to this sns Topic, In Lambda code we can send event to Teams or Slack Channel

Lets create Slack Processing Lambda

```javascript
   const snsTopic =
      cdk.aws_sns.Topic.fromTopicArn(
        this,
        `notification-topic-${stage}`,
        infraAlarmNotificationARN!
      );

const lambdaFunction = new lambda.Function(this, 'Function', {
  code: lambda.Code.fromAsset('src'),
  handler: 'index.handler',
  functionName: 'SnsMessageHandler',
  runtime: lambda.Runtime.NODEJS_12_X,
});

const eventSource = new lambdaEventSources.SnsEventSource(snsTopic);
lambdaFunction.addEventSource(eventSource);
```

Now our Lambda code can be custom logic to send notification to slack or Teams based on webhook url

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

## Deploy Stack to AWS using CDK

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
