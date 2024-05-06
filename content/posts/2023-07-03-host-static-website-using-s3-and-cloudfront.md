---
date: 2023-07-03
title: 'How to Build and Deploy S3 bucket with Cloudfront'
template: post
featuredImage: '../thumbnails/aws.png'
thumbnail: '../thumbnails/nestjs.png'
slug: how-to-host-static-website-using-s3-cloudfront-aws
categories:
  - aws
  - aws-cdk
tags:
  - aws
  - aws-cdk
---


![Build and Deploy S3 bucket with Cloudfront](https://d1tcczg8b21j1t.cloudfront.net/strapi-assets/s3_diagram_cloudfront_acm_route53_c2a411d6a4.png "Build and Deploy S3 bucket with Cloudfront")

# Build and Deploy S3 bucket with Cloudfront

In this Blog we will cover all these Topics

- Writing the Infrastructure for TypeScript Lambdas in AWS CDK
- Writing the Code for creating S3 bucket 
- Deploying S3 stack with Cloudfront
- S3 Bucket should be accessible by cloudfront as S3 bucket has Private access

# Lets build S3 bucket

The AWS CDK (Cloud Development Kit) is a framework for defining cloud infrastructure as code using programming languages like TypeScript, Python, Java, and others. If you want to create an S3 bucket using AWS CDK, you can follow these steps in TypeScript as an example:


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

    const staticBucket = new cdk.aws_s3.Bucket(
      this,
      `store-bucket-${stage}`,
      {
        bucketName: `store-${stage}`,
        accessControl: cdk.aws_s3.BucketAccessControl.PRIVATE,
        blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
        publicReadAccess: false,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }
    );

  }
}
```

If you want to create an AWS CloudFront distribution with an associated S3 bucket and an Origin Access Identity (OAI) using AWS CDK (Cloud Development Kit), you can follow these steps in TypeScript as an example:

An AWS CloudFront Origin Access Identity (OAI) is a security feature that helps control access to your Amazon S3 bucket content when you use CloudFront as a content delivery network (CDN). In simpler terms, it's a way to restrict who can access the files in your S3 bucket through CloudFront.

Here's how it works:

1. **S3 Bucket**: When you configure CloudFront to serve content from an S3 bucket, the default behavior is that the S3 bucket and its objects are private by default, meaning they can't be accessed directly over the internet.

2. **CloudFront Distribution**: CloudFront acts as a caching layer in front of your S3 bucket, improving content delivery speed and reducing the load on your S3 bucket.

3. **Origin Access Identity (OAI)**: To allow CloudFront to access and serve content from your private S3 bucket, you can create an Origin Access Identity. This OAI represents CloudFront and allows it to make authenticated requests to your S3 bucket on your behalf.

4. **Restricting Access**: Once you've created the OAI, you can configure your S3 bucket's permissions so that it only allows requests from the CloudFront distribution with the associated OAI. This effectively restricts direct access to your S3 content and ensures that requests must go through CloudFront.

The benefits of using CloudFront with an OAI include:

- **Enhanced Security**: You can keep your S3 bucket private, reducing the risk of unauthorized access to your data.

- **Better Performance**: CloudFront caches content closer to your users, reducing latency and improving content delivery speed.

- **Cost Savings**: By reducing the load on your S3 bucket, you can save on data transfer and request costs.

In summary, an AWS CloudFront Origin Access Identity is a security mechanism that allows you to control and restrict access to your private S3 bucket content, ensuring that all requests go through CloudFront, which can improve security, performance, and cost-efficiency for your content delivery.



```javascript
    // Cloudfront OAI - S3 bucket policy
    const cloudfrontOAI = new cdk.aws_cloudfront.OriginAccessIdentity(
      this,
      `storeOAI${stage}`,
      {
        comment: `Cloudfront distribution`,
      }
    );
    staticBucket.grantRead(cloudfrontOAI);

```

Add bucket deployment 

```javascript

    // Cloudfront
    const distribution = new cdk.aws_cloudfront.Distribution(
      this,
      `store-cf-distribution-${stage}`,
      {
        priceClass: cdk.aws_cloudfront.PriceClass.PRICE_CLASS_100,
        defaultRootObject: 'index.html',
        defaultBehavior: {
          origin: new cdk.aws_cloudfront_origins.S3Origin(staticBucket, {
            originAccessIdentity: cloudfrontOAI,
          }),
        },
        comment: `Cloudfront distribution`,
      }
    );

    // S3 deployment
    new cdk.aws_s3_deployment.BucketDeployment(
      this,
      `store-bucket-deployment-${stage}`,
      {
        destinationBucket: staticBucket,
        sources: [cdk.aws_s3_deployment.Source.asset(contentPath)],
        cacheControl: [
          cdk.aws_s3_deployment.CacheControl.maxAge(cdk.Duration.days(365)),
        ],
        distribution,
      }
    );
```

we have S3 bucket created with BucketAccessControl Private that means we need cloudfront to expose S3 bucket static web hosting, and S3 bucket can be accessible by cloudfront only.




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
