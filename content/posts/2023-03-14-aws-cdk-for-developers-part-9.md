---
date: 2023-03-14
title: 'Deploying RDS Database Stack using AWS CDK Part-9'
template: post
featuredImage: '../thumbnails/cdk.png'
thumbnail: '../thumbnails/cdk.png'
slug: deploying-rds-database-stack-using-aws-cdk-part-9
categories:
  - aws-cdk
  - aws
  - nodejs
  - dynamodb
  - microservices
  - database
tags:
  - aws-cdk
  - aws
  - nodejs
  - microservices
  - rds
  - database
---

# Deploying RDS Database Stack using AWS CDK Part-9

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

![](https://i.ytimg.com/vi/h_gRGRbOjJ8/maxresdefault.jpg)

In this Blog we will cover all these Topics for deploying RDS Instance

- Create a VPC using CDK
- Create EC2 Instance and add security group
- Pass the VPC to another Stack
- Create RDS Instance and pass subnet from VPC Stack
- Allow access from EC2 Instance to the RDS
- Deploy Stack using CDK

Lets first create VPC using CDK

```javascript
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as cdk from 'aws-cdk-lib';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'my-cdk-vpc', {
      cidr: '10.0.0.0/16',
      natGateways: 0,
      maxAzs: 3,
      subnetConfiguration: [
        {
          name: 'public-subnet-1',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: 'isolated-subnet-1',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 28,
        },
      ],
    });

    // 👇 create RDS Instance
    const dbInstance = new rds.DatabaseInstance(this, 'db-instance', {
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_14,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE3,
        ec2.InstanceSize.MICRO,
      ),
      credentials: rds.Credentials.fromGeneratedSecret('postgres'),
      multiAz: false,
      allocatedStorage: 100,
      maxAllocatedStorage: 105,
      allowMajorVersionUpgrade: false,
      autoMinorVersionUpgrade: true,
      backupRetention: cdk.Duration.days(0),
      deleteAutomatedBackups: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: false,
      databaseName: 'todosdb',
      publiclyAccessible: false,
    });

    new cdk.CfnOutput(this, 'dbEndpoint', {
      value: dbInstance.instanceEndpoint.hostname,
    });

    new cdk.CfnOutput(this, 'secretName', {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      value: dbInstance.secret?.secretName!,
    });
  }
}
```

We created a VPC with PUBLIC and ISOLATED subnet groups.

```javascript
const dbInstance = new rds.DatabaseInstance(this, 'db-instance', {
  vpc,
  vpcSubnets: {
    subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
  },
});
```

An instance launched in a PUBLIC subnet has access to the internet and can be accessed from the internet via an internet gateway. Our EC2 instance will be launched in a PUBLIC subnet.

Whereas an instance launched in an ISOLATED subnet has no access to the internet and can't be accessed from the internet. Isolated subnets are used mostly for intra-VPC communication.

Our RDS instance will be launched in an ISOLATED subnet because we will be connecting to it from our EC2 instance, which is in the same VPC.

Here while creating RDS Instance what are we doing

```javascript
const dbInstance = new rds.DatabaseInstance(this, 'db-instance', {
  vpc,
  vpcSubnets: {
    subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
  },
  engine: rds.DatabaseInstanceEngine.postgres({
    version: rds.PostgresEngineVersion.VER_14,
  }),
  instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
  credentials: rds.Credentials.fromGeneratedSecret('postgres'),
  multiAz: false,
  allocatedStorage: 100,
  maxAllocatedStorage: 105,
  allowMajorVersionUpgrade: false,
  autoMinorVersionUpgrade: true,
  backupRetention: cdk.Duration.days(0),
  deleteAutomatedBackups: true,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  deletionProtection: false,
  databaseName: 'todosdb',
  publiclyAccessible: false,
});
```

Here is the summery of all options we are passing in new rds.DatabaseInstance

| name                | Description                                                                                                                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| vpc                 | The VPC in which the DB subnet group will be created                                                                                                                                                                 |
| vpcSubnets          | The type of subnets the DB subnet group should consist of. In our case - ISOLATED subnets.                                                                                                                           |
| engine              | The engine for the database. In our case - Postgres, version 13                                                                                                                                                      |
| instanceType        | The class and size for the instance, in our case t3.micro                                                                                                                                                            |
| credentials         | The credentials for the admin user of the database. We've used the fromGeneratedSecret method and passed it a username of postgres, the password will be auto-generated and stored in secrets manager.               |
| multiAz             | Whether the rds instance is a multi-AZ deployment, in our case we've set it to false, which is also the default value. For production workloads, you would most likely use a standby instance for high availability. |
| allocatedStorage    | The allocated storage size of the database, in gigabytes. We set the value to 100 gigabytes, which is also the default                                                                                               |
| maxAllocatedStorage | The upper limit for storage auto scaling. In our case, we've set it to 105 gigabytes. By default, there is no storage auto-scaling                                                                                   |
| backupRetention     | For how many days automatic database snapshots should be kept. We've turned automated snapshots off, by setting the value to 0 days. The default value is 1 day.                                                     |
| deleteAutmtdBackups | Specify whether automated backups should be deleted or retained when the rds instance is deleted. By default, automated backups are retained on instance deletion.                                                   |
| removalPolicy       | The policy that should be applied if the resource is deleted from the stack or replaced during an update. By default the instance is deleted, but a snapshot of the data is retained.                                |
| deletionProtection  | Specify whether the DB instance should have termination protection enabled. By default it's set to true if removalPolicy is RETAIN, otherwise - false                                                                |
| databaseName        | Specify the name of the database                                                                                                                                                                                     |
| publiclyAccessible  | Specify whether the rds instance should be publicly accessible. Set to true by default for instances launched in PUBLIC subnet groups, false otherwise.                                                              |

# Now lets attach an EC2 Instance to access RDS

```javascript
// 👇 create a security group for the EC2 instance
const ec2InstanceSG = new ec2.SecurityGroup(this, 'ec2-instance-sg', {
  vpc,
});

ec2InstanceSG.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'allow SSH connections from anywhere');

// 👇 create the EC2 instance
const ec2Instance = new ec2.Instance(this, 'ec2-instance', {
  vpc,
  vpcSubnets: {
    subnetType: ec2.SubnetType.PUBLIC,
  },
  securityGroup: ec2InstanceSG,
  instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
  machineImage: new ec2.AmazonLinuxImage({
    generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
  }),
  keyName: 'ec2-key-pair',
});
```

and we will allow access from this instance to RDS

```javascript
dbInstance.connections.allowFrom(ec2Instance, ec2.Port.tcp(5432));
```

## Deploy RDS Stack to AWS

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
