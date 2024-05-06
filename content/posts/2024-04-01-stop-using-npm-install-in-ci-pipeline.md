---
date: 2024-04-01
title: 'Stop using `npm install` in your CI/CD pipeline'
template: post
featuredImage: '../thumbnails/node.png'
thumbnail: '../thumbnails/node.png'
slug: stop-using-npm-install-in-your-ci-pipeline
categories:
  - nodejs
  - javascript
tags:
  - nodejs
  - javascript
---

# Stop using `npm install` in your CI/CD pipeline

Why is this still a topic that has to be addressed?
---------------------------------------------------

In the last couple of months I have noticed that developers are struggling to find the right command to install the dependencies.

Recently, the following questions have been asked by developers a lot.

> Why does the CI/CD pipeline not work anymore? We just wanted to do a bug fix. Two weeks ago everything was fine, now the pipeline fails.
> 
> We have run “npm install” and now we get type-errors. What did we do wrong?
> 
> “npm install” failed because of some peer dependency conflicts. We have added “ — legacy-peer-deps” and now some dependencies are missing at build time. Why?
> 
> We have changed the artifactory URL in the .npmrc. However, everytime we perform “npm install”, the old artifactory URL is added to the package-lock.json. Why?

![](https://miro.medium.com/v2/resize:fit:700/0*PjPiHh-ABsts4kH7.jpg)

Stop Sign \[[https://pixabay.com/de/photos/stoppen-unterzeichnen-verkehrsschild-634941/](https://pixabay.com/de/photos/stoppen-unterzeichnen-verkehrsschild-634941/)\]

“npm install” vs “npm ci”
=========================

Most of the time dependency versions are listed with a carret (^) or a tilde (~). In such a case, npm will not install the exact version given, but the newest one in the given [range](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#dependencies).

*   **~version:** “_Approximately equivalent to version_” (**_~1.2.3_ :=** _\>=1.2.3 <1.(2+1).0 := >=1.2.3 <1.3.0–0_)
*   **^version:** “Compatible with version” (**1.2.3 :=** _\>=1.2.3 <2.0.0–0_)

“npm install”
-------------

So, what does exactly happen? In short, with “_npm install_” the newest dependencies — listed in the _package.json —_ and their peer-dependencies will not only be downloaded and added to the local _node\_modules_ folder, but also placed into the OS specific cache-folder and the given dependency tree stored in the _package-lock.json_. Thus, removing the whole _node\_modules_ folder does not mean that all is downloaded again, but rather that the associated packages are searched for in the cache-folder.

“npm ci”
--------

In contrast to “_npm install_” the “_npm ci_” command uses the _package-lock.json_ and installs all dependencies according to this tree. Therefore, as long as the _package-lock.json_ does not change, exactly the same dependencies will be installed every time “_npm ci_” is performed.

“ — legacy-peer-deps” vs “ — force”
-----------------------------------

During the installation _peer-dependency-conflicts_ may happen.

_What are peer dependency conflicts?_ If two or more dependencies need a package in a different version. For example, if package A requires version 2_.0.0_ and package B version _1.0.0_.

With “ _— legacy-peer-deps_” the peer-dependencies are ignored and skipped from the [installation process](https://docs.npmjs.com/cli/v7/using-npm/config#legacy-peer-deps). Therefore, no more _peer-dependency-conflicts_ will happen. This is the recommended option to use. However, this could also lead to missing packages.

_How can one apply this option?_ This option can be either added to the _npm config_ or just passed as additional parameter.

```sh
npm config set legacy-peer-deps=true \--location=project  
npm ci \--legacy-peer-deps

On the other hand, _“ — force”_ does not skip the peer-dependencies, but rather installs all associated _peer-dependency_ versions instead. This may not be the desired behavior as this will blow up the _node\_modules_ folder.

npm install \--force
```

In short, _“ — legacy-peer-deps”_ should do the trick. However, if you ran into missing dependencies, then _“ — force”_ should be used.

Installing dependencies from scratch
------------------------------------

Sometimes developers want to remove all their existing local dependencies and install everything again. For example, if the artifactory URL has changed, and they are asked to locally test the change. This can be done as follows.

```sh
// remove the local node\_modules folder  
rm -rf node\_modules  
// remove all cached dependencies  
npm cache clean \--force  
npm install \--force
```

Setting up the right artifactory
--------------------------------

The artifactory has to be set in the _.npmrc_ file stored in the user-folder. Unfortunately, only one artifactory can be configured. However, if you want to use multiple ones, scoped repositories can be used.

```sh
registry=https://FIRST-REPO-URL  
// define a scoped repository  
@test:registry=http://SECOND-REPO-URL
```

Questions
=========

These are the most recent questions that I have been asked by developers in the last couple of months. I will set them into context and provide the solution.

> Why does the CI/CD pipeline not work anymore? We just wanted to do a bug fix. Two weeks ago everything was fine, now the pipeline fails.

In this case, the CI/CD pipeline did not use _“npm ci”_, but _“npm install”_. As the repository is not updated on a regular basis, but just once in a while, newer packages where installed and the _package-lock.json_ overwritten. This did lead to some type errors. Therefore, please always use _“npm ci”_.

> We have run “npm install” and now we get type-errors. What did we do wrong?

The same problem as the one before. The following error appeared.

Type 'Server' is not generic

_“@types/ws”_ had to be added with an exact version.

"@types/ws": "8.5.4"

> “npm install” failed because of some peer dependency conflicts. We have added “ — legacy-peer-deps” and now some dependencies are missing at build time. Why?

The peer-dependencies were skipped. This did lead to missing dependencies. Therefore, _“npm ci — force”_ had to be used.

> We have changed the artifactory URL in the .npmrc. However, everytime we perform “npm install”, the old artifactory URL is added to the package-lock.json. Why?

The local _node\_modules_ folder was deleted. However, the OS specific cache-folder still contained the requested dependencies. The following command had to be performed.

npm cache clean \--force

Summing Up
==========

I have not only shown the difference between _“npm install”_ and _“npm ci”_, but also given an introduction to the options _“ — legacy-peer-deps”_ and _“ — force”_. Moreover, I have listed the most recent asked questions that I have encountered during the last months and answered all of them.

To sum up, please use _“npm ci”_ in your CI/CD pipeline. Otherwise, the build may break, due to newer dependency versions.
