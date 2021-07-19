---
date: 2020-06-19
title: 'Scrape web with Node JS'
template: post
featured:  '../thumbnails/node.png'
thumbnail: '../thumbnails/node.png'
slug: scrape-web-with-nodejs
categories:
  - Popular
tags:
  - scrape
  - nodejs
  - puppeteer
  - cheerio
---

# Scrapping web with Node JS + puppeteer + cheerio

Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.

What can I do?
Most things that you can do manually in the browser can be done using Puppeteer! Here are a few examples to get you started:

Generate screenshots and PDFs of pages.
- Crawl a SPA (Single-Page Application) and generate pre-rendered content (i.e. "SSR" (Server-Side Rendering)).
- Automate form submission, UI testing, keyboard input, etc.
- Create an up-to-date, automated testing environment. Run your tests directly in the latest - version of Chrome using the latest JavaScript and browser features.
- Capture a timeline trace of your site to help diagnose performance issues.
- Test Chrome Extensions.

## Headless Chrome and Puppeteer
There are many web scraping tools that can be used for headless browsing, like Zombie.js or headless Firefox using Selenium. But today we’ll be exploring headless Chrome via Puppeteer, as it’s a relatively newer player, released at the start of 2018. Editor’s note: It’s worth mentioning Intoli’s Remote Browser, another new player, but that will have to be a subject for another article.

What exactly is Puppeteer? It’s a Node.js library which provides a high-level API to control headless Chrome or Chromium or to interact with the DevTools protocol. It’s maintained by the Chrome DevTools team and an awesome open-source community.

Enough talking—let’s jump into the code and explore the world of how to automate web scraping using Puppeteer’s headless browsing!

Preparing the Environment
First of all, you’ll need to have Node.js 8+ installed on your machine. You can install it here, or if you are CLI lover like me and like to work on Ubuntu, follow those commands:

```sh
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Setup Headless Chrome and Puppeteer
I’d recommend installing Puppeteer with npm, as it’ll also include the stable up-to-date Chromium version that is guaranteed to work with the library.

Run this command in your project root directory:

```sh
npm i puppeteer --save
```

Note: This might take a while as Puppeteer will need to download and install Chromium in the background.

Okay, now that we are all set and configured, let the fun begin!

Using Puppeteer API for Automated Web Scraping
Let’s start our Puppeteer tutorial with a basic example. We’ll write a script that will cause our headless browser to take a screenshot of a website of our choice.

Create a new file in your project directory named screenshot.js and open it in your favorite code editor.

First, let’s import the Puppeteer library in your script:

```javascript
const puppeteer = require('puppeteer');
```

Next up, let’s take the URL from command-line arguments:
```javascript
const url = process.argv[2];
if (!url) {
    throw "Please provide a URL as the first argument";
}
```

Now, we need to keep in mind that Puppeteer is a promise-based library: It performs asynchronous calls to the headless Chrome instance under the hood. Let’s keep the code clean by using async/await. For that, we need to define an async function first and put all the Puppeteer code in there:

```javascript
async function run () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path: 'screenshot.png'});
    browser.close();
}
run();
```

Altogether, the final code looks like this:

```javascript
const puppeteer = require('puppeteer');
const url = process.argv[2];
if (!url) {
    throw "Please provide URL as a first argument";
}
async function run () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path: 'screenshot.png'});
    browser.close();
}
run();
```

You can run it by executing the following command in the root directory of your project:

```sh
node screenshot.js https://github.com
```

### puppeteer just another way

```javascript
const puppeteer = require('puppeteer');

async function startBrowser() {
  let browser;
  try {
    console.log('Opening the browser......');
    browser = await puppeteer.launch({
      headless: true,
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    });
  } catch (err) {
    console.log('Could not create a browser instance => : ', err);
  }
  return browser;
}

module.exports = {
  startBrowser,
};
```

## Scrape content with Cheerio

Now that we have a nice way to get our pages, it’s time to scrape them. We are going to use the cheerio library. Cheerio is an HTML parser designed to use the same API as jQuery. Our task is to scrape the last 5 post titles of Hacker News.

### lets work with Cheerio and puppeteer 

Run this command in your project root directory:

```sh
npm i cheerio --save
```

Cheerio is not a web browser
Cheerio parses markup and provides an API for traversing/manipulating the resulting data structure. It does not interpret the result as a web browser does. Specifically, it does not produce a visual rendering, apply CSS, load external resources, or execute JavaScript. If your use case requires any of this functionality, you should consider projects like Puppeteer or JSDom.

API
Markup example we'll be using:
```html
<ul id="fruits">
  <li class="apple">Apple</li>
  <li class="orange">Orange</li>
  <li class="pear">Pear</li>
</ul>
```
This is the HTML markup we will be using in all of the API examples.

Loading
First you need to load in the HTML. This step in jQuery is implicit, since jQuery operates on the one, baked-in DOM. With Cheerio, we need to pass in the HTML document.

This is the preferred method:
```javascript
const cheerio = require('cheerio');
const $ = cheerio.load('<ul id="fruits">...</ul>');

$.html();
```
Similar to web browser contexts, load will introduce <html>, <head>, and <body> elements if they are not already present. You can set load's third argument to false to disable this.

```html
const $ = cheerio.load('<ul id="fruits">...</ul>', null, false);
$.html();
```

Puppeteer will launch browser and send DOM to cheerio and both works great with one another
### Step-1

```javascript
const puppeteer = require('puppeteer');

async function startBrowser() {
  let browser;
  try {
    console.log('Opening the browser......');
    browser = await puppeteer.launch({
      headless: true,
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    });
  } catch (err) {
    console.log('Could not create a browser instance => : ', err);
  }
  return browser;
}

module.exports = {
  startBrowser,
};
```
Lets see one example 
### Step-2

```javascript
const browser = await browserObject.startBrowser();
const page = await browser.newPage();
Logger.updateSpinnerText('----loading sitemap page------');
await page.goto(url);
await page.waitForSelector('#sitemap');
const content = await page.content();
await getLinks(content, childCategory)
```
### Step-3
Now this content can be passed to function to inspect DOM using cheerio
```javascript
 async getLinks(html, childCategory) {
    const $ = cheerio.load(html);
    $(`#${childCategory}`).each((row, rawElement) => {
      $(rawElement)
        .find('.sitemap-section')
        .each((i, elem) => {
          $(elem)
            .find('ul li')
            .each((j, element) => {
              const children = $(element).children();
              console.log(children.attr('href'));
            });
        });
    });
  }
  ```

  These are just some examples but this is how we are going to pair up things, Puppeteer will launch browser and cheerio will inspect DOM for us and give us what we need from web scraping

  I found it very useful when i did play around with both library as they works well with one another 