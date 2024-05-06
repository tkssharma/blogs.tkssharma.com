---
date: 2023-12-13
title: 'How to Deploy React App to S3 Bucket'
template: post
featuredImage: '../thumbnails/aws.png'
thumbnail: '../thumbnails/aws.png'
slug: howt-to-deploy-react-app-to-s3-bucket-aws
categories:
  - react
  - aws
tags:
  - react
  - aws
---

One simple approach I often rely on to deploy my static frontend application is a storage service and with AWS, AWS S3.

In this article, I provide a step by step guide on how to automate the deployment of your static files to AWS S3 leveraging Gitlab's CI/CD pipelines, and with git tags as deploy triggers.

We start by creating an S3 bucket, after which we prepare Gitlab with AWS credentials, write the pipeline and finally, test the setup end to end by pushing a git tag which will trigger the pipeline and deploy our static files to our AWS S3 bucket.

The approach chosen in this article is a generic approach to share a concept which can be applied irrespective of your project or language domain.

### [](#requirements)Requirements

*   [Gitlab](https://gitlab.com) account
*   [AWS](https://aws.amazon.com/console/) account

### [](#setup-aws-s3-bucket-and-access)Setup AWS S3 bucket and access

**Step 1**:  
Go to [AWS S3](https://s3.console.aws.amazon.com/s3/home) to create a bucket for storing the static files by clicking on the `create bucket` button.  
[![S3 buckets available](https://res.cloudinary.com/practicaldev/image/fetch/s--Q9_Qh_N3--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sy8sxjax97tvfzlricmf.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--Q9_Qh_N3--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sy8sxjax97tvfzlricmf.png)

**Step 2**:  
In the form provided, enter your bucket name.  
For this guide, we will use the bucket name `gitlab-ci-tutorial`.

Now, select a region of your choice (us-east-1), leave everything else as is and click on `create bucket`.

[![Create bucket form](https://res.cloudinary.com/practicaldev/image/fetch/s--RFIqQ578--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2i9yxg59vksgqs0x6yiu.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--RFIqQ578--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2i9yxg59vksgqs0x6yiu.png)

Notice that the created bucket is empty.

[![empty created bucket gitlab-ci-tutorial](https://res.cloudinary.com/practicaldev/image/fetch/s--ccpHioq9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ejgo1u8vluf6dro4c6gq.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--ccpHioq9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ejgo1u8vluf6dro4c6gq.png)

**Step 3**:  
Go to [AWS IAM](https://console.aws.amazon.com/iam/home?region=us-east-1) to create a user with programatic access to S3.

Click on `Add users`.

**Step 4**:  
Following the steps in the form provided, we create a user that will be used from Gitlab to access/deploy files to our S3 bucket.

*   Provide a name for the user, `gitlab_s3_tutotrial` and check the `Access key - Programmatic access` checkbox.

[![Select name and check programatic access](https://res.cloudinary.com/practicaldev/image/fetch/s--s6YoibBM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/12hyet9txjgi0l1bd0kv.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--s6YoibBM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/12hyet9txjgi0l1bd0kv.png)

*   For permissions, we will attach an existing policy for full S3 access `AmazonS3FullAccess` in this guide. It is recommended to create a more fine grained access based on your project requirements.

[![Attach policy](https://res.cloudinary.com/practicaldev/image/fetch/s--Rx_2f_xZ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8muoppx2dy76c2fi50sw.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--Rx_2f_xZ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8muoppx2dy76c2fi50sw.png)

**Step 5**:  
Review and create user.  
[![Review and create user](https://res.cloudinary.com/practicaldev/image/fetch/s--bPR8HxG0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uhpn9m5s88edbiglvld4.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--bPR8HxG0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uhpn9m5s88edbiglvld4.png)

[![Created user credentials](https://res.cloudinary.com/practicaldev/image/fetch/s--3pcqEoR3--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3bx6pkw49ft9tdw8qh38.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--3pcqEoR3--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3bx6pkw49ft9tdw8qh38.png)

### [](#prepare-gitlab)Prepare Gitlab

**Step 1**:  
Create your project on Gitlab. I created a project [gitlab-ci-tutorial1](https://gitlab.com/successgilli/gitlab-ci-tutorial1)

**Step 2**:  
Within the created project, navigate to `settings > CI/CD` and expand the `variables` section.

Add the following environment variables which will be used for deployment to AWS S3 as created in step 5 `Setup AWS S3 bucket and access > step 5` above

*   AWS\_ACCESS\_KEY\_ID: `<Your Access key ID>`
*   AWS\_SECRET\_ACCESS\_KEY: `<Your secret access key>`
*   AWS\_DEFAULT\_REGION: `us-east-1` (as chosen in steps above)
*   S3\_BUCKET: `gitlab-ci-tutorial` (Name of your bucket)

[![Add env variables to Gitlab](https://res.cloudinary.com/practicaldev/image/fetch/s--fzWABFtC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i8plg92lbqroqap7pwnl.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--fzWABFtC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i8plg92lbqroqap7pwnl.png)

### [](#write-the-pipeline)Write the pipeline

Now, we are ready to create the pipeline and this is done using a `.gitlab-ci.yml` file at the root of the project.

Whenever a push is made to Gitlab, this file will be detected and the pipeline will run. Though, in this case we want the pipeline to only deploy when we push a new tag.

Create a `.gitlab-ci.yml` file and add the contents below to the file.  

    stages:
      - build
      - deploy
    
    build:
      stage: build
      script:
      # We simulate a build phase by manually creating files in a build folder
      # An example would be using `yarn build` to build a react project that would create static files in a build or public folder
        - mkdir -p build && touch build/build.html build/build.txt
      artifacts:
        when: on_success
        paths:
          - build/
        expire_in: 20 mins
    
    
    deploy:
      stage: deploy
      needs:
        - build
      image: registry.gitlab.com/gitlab-org/cloud-deploy/aws-base:latest
      rules:
        - if: $CI_COMMIT_TAG                 # Run this job when a tag is created
      script:
        - echo "Running deploy"
        - aws s3 cp ./build s3://$S3_BUCKET/ --recursive
        - echo "Deployment successful"
    
    

Enter fullscreen mode Exit fullscreen mode

*   In the pipeline above, we made use of stages and passed artifacts (outputs) from one stage to another.
    
*   The `build` stage was written to mimic an actual build of a project which will then create output files in a build folder. Here, we created a build folder containing 2 files with shell commands.
    
*   The image used in the `deploy` phase [aws-base](https://gitlab.com/gitlab-org/cloud-deploy/-/blob/master/aws/base/Dockerfile) contains the aws CLI command necessary to run the aws deploy script and by default, detects the AWS environment variables with the exact names we added to the variables section of Gitlab earlier.
    

For a full description of the configuration options of the `.gitlab-ci.yml` file, [check here](https://docs.gitlab.com/ee/ci/yaml/).

Now, commit the file to the repo and push to the project we created earlier.

Notice in the images below that on the Gitlab project, only the build job was run.  
This is because of the line `- if: $CI_COMMIT_TAG` in the `rules` section of the `deploy` phase which will ensure that the deployment is only run when we push a new tag or create it on the Gitlab UI. Also, see here [Trigger pipeline with git tags](https://docs.gitlab.com/ee/user/project/releases/release_cicd_examples.html#create-a-release-when-a-git-tag-is-created).

[![Build job running](https://res.cloudinary.com/practicaldev/image/fetch/s--Fpj7smDu--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hiyfy80209828j82o8gf.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--Fpj7smDu--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hiyfy80209828j82o8gf.png)  
[![Build job completed](https://res.cloudinary.com/practicaldev/image/fetch/s--gIPAxI-W--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tjekwftorisieqdcu2p6.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--gIPAxI-W--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tjekwftorisieqdcu2p6.png)

### [](#test-the-overall-setup)Test the overall setup

**Step 1**:  
Tag your commit.  

    git tag 'V1'
    

Enter fullscreen mode Exit fullscreen mode

**Step 2**:  
Push your tag.  

    git push origin 'V1'
    

Enter fullscreen mode Exit fullscreen mode

Notice, we now have a new pipeline at the top that ran 2 jobs, the build and deploy jobs.

[![Pipeline showing 2 jobs completed](https://res.cloudinary.com/practicaldev/image/fetch/s--c9sBklxm--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n64twyk9ak5uzh5i9r81.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--c9sBklxm--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n64twyk9ak5uzh5i9r81.png)

Below is the completed deploy job.

[![Completed deploy job](https://res.cloudinary.com/practicaldev/image/fetch/s--tRPnmApc--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iut03s8nsm8g0q27ov0y.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--tRPnmApc--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iut03s8nsm8g0q27ov0y.png)

**Step 3**:  
Check the bucket on AWS S3

Refresh and notice that the S3 bucket is no longer empty and contains the files built and deployed from our pipeline as seen below.

[![S3 bucket containing uploaded files](https://res.cloudinary.com/practicaldev/image/fetch/s--CE4-7Har--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pevlyi5dnrfruics1y6q.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--CE4-7Har--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pevlyi5dnrfruics1y6q.png)

Congratulations, we did it! 🎉

### [](#conclusion)Conclusion

There are different ways to deploy code with the Gitlab CI/CD pipeline. This approach with git tags is one common approach used with npm packages and most organisations I have worked with and brings the advantage of easy rollback amongst many.

