---
layout: blog
category: blog
slug: css-handbook-for-developers
Title: css handbook fro developers
summary: css handbook for developers
tags:
  - css
  - html
  - nodejs
  - express
---

How do you learn CSS? CSS is a vast subject, with many different layers to learn about covering all different aspects of manipulating the display of elements on a page.

It is also an evolving topic, which sometimes makes it difficult to know what to study. This article is intended to be a resource for learning, finding the best resources around to learn each area of CSS.

Topics are arranged in an order that makes sense for learning from scratch. So if you're brand new to CSS, you should be able to start at the top and work downwards, gradually increasing your understanding.

If you have particular areas of CSS you want to brush up on, you can use the table of contents to jump to them.

If you're looking for comprehensive "learn everything from a single source" resources, you should jump down to comprehensive resources and courses.

And finally, if you're looking for ways to stay up to date, the newsletters portion at the very end will give you a number of options for continuing to hear about the latest and greatest.

**Affiliate disclosure**: Some of the links on this page are affiliate links, which means I may receive a commission if you decide to buy a product or service I have recommended. But if you’d prefer I didn’t receive a commission, that’s cool too. Just Google the vendor’s site instead of using my link. 🙂

### Table Of Contents

- [CSS Selectors](#css-selectors)
- [CSS Box Model](#css-box-model)
- [CSS Layout](#css-layout)
- [Styling Text with CSS](#styling-text)
- [Styling Boxes with CSS](#styling-boxes)
- [CSS Units](#css-units)
- [CSS Colors and Gradients](#css-colors-and-gradients)
- [CSS Transitions and Animations](#css-transitions-and-animations)
- [CSS Transforms](#css-transforms)
- [CSS Pseudo-classes and Pseudo-elements](#css-pseudo)
- [CSS At-Rules (e.g. Media Queries)](#css-at-rules)
- [CSS Specificity](#css-specificity)
- [CSS Preprocessors](#css-preprocessors)
- [CSS Naming Systems and Architecture](#css-naming-systems-and-architecture)
- [Common CSS Practices](#common-css-practices)
- [CSS Walkthroughs and Examples](#css-walkthroughs-and-examples)
- [Comprehensive CSS Resources](#comprehensive-resources)
- [CSS Frameworks](#css-frameworks)
- [Free CSS Courses](#free-courses)
- [Paid CSS Courses](#paid-courses)
- [CSS Newsletters](#css-newsletters)

</div>

</div>

<div class="page-section u-bg-secondary">

<div class="page-section__wrap page-section__wrap--narrow">

### CSS Selectors

One of the key initial concepts in CSS is selectors and how they work. From there you can move into advanced selectors and pseudoselectors, as well as understanding the various types of properties you can manipulate. But without selectors, you have no way to apply the things you learn, so this is where you start.

[Beginner Concepts: How CSS Selectors Work | CSS-Tricks](https://css-tricks.com/how-css-selectors-work/)  
One of the best introductions to CSS Selectors, walking you through the concept of selectors, how they work, and up through some psuedoselectors and combining selectors.

[Level up your CSS selector skills | LogRocket Blog](https://blog.logrocket.com/level-up-your-css-selector-skills-5d7bb45ddd37)  
Thorough walkthrough of CSS selector options, including relationship selectors, various types of wildcard selectors (starts with, ends with, etc) as well as advanced pseudoselectors. Definitely worth a read through and some experimenting.

</div>

</div>

<div class="page-section">

<div class="page-section__wrap page-section__wrap--narrow">

<div id="carbonads"><span><span class="carbon-wrap">[![ads via Carbon](https://cdn4.buysellads.net/uu/1/3386/1525189943-38523.png)](https://srv.carbonads.net/ads/click/x/GTND42QYCABICKQICY7LYKQMFTSI4KJMCKYDLZ3JCWAD5KQWCYBI553KC6BIE27MCVBDVK3EHJNCLSIZ?segment=placement:zendevcom;)[Limited time offer: Get 10 free Adobe Stock images.](https://srv.carbonads.net/ads/click/x/GTND42QYCABICKQICY7LYKQMFTSI4KJMCKYDLZ3JCWAD5KQWCYBI553KC6BIE27MCVBDVK3EHJNCLSIZ?segment=placement:zendevcom;)</span>[ads via Carbon](http://carbonads.net/?utm_source=zendevcom&utm_medium=ad_via_link&utm_campaign=in_unit&utm_term=carbon)</span></div>

### CSS Box Model

At the root of understanding CSS and how to manipulate elements on your page is the CSS box model. If you don't understand this, you won't get very far with the more advanced concepts and will be consistently frustrated by CSS.

[Opening the Box Model | Shay Howe](https://learn.shayhowe.com/html-css/opening-the-box-model/)  
Excellent introductory resource with well-done graphical explanations and a step by step introduction of the properties that make up the box model.

[The box model | MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Box_model)  
The definitive resource, covering all different pieces of the box model with interactive examples that you can tinker and play with.

</div>

</div>

<div class="page-section u-bg-secondary">

<div class="page-section__wrap page-section__wrap--narrow">

### CSS Layout

Once you have the ability to target html elements for styling, layout is the next core concept to master. Layout involves manipulating how elements lay out on the page. How much space do they take? Are they side by side or on top of each other? How do you manipulate this to create exactly the design you desire? This is an area of CSS that has changed and improved dramatically over the last few years with Flexbox and CSS Grid, but some of the fundamentals (flow and the box model) have remained the same.

Increasingly layouts can be done purely with CSS Grid and Flexbox, but for those who still must support older browsers, grid systems built using Flexbox or even floats are still useful.

[Getting Started With CSS Layout | Smashing Magazine](https://www.smashingmagazine.com/2018/05/guide-css-layout/)  
An awesome guide for CSS newbies, but also for anyone who doesn’t feel like they’ve mastered CSS layout or haven’t been keeping up with all the latest developments in CSS Layout. Takes you through the fundamentals of flow on the web, layers in floats and positioning, and then goes through Flexbox and Grid. Excellent.

[The Ultimate Guide to Flexbox — Learning Through Examples | Free Code Camp](https://medium.freecodecamp.org/the-ultimate-guide-to-flexbox-learning-through-examples-8c90248d4676)  
CSS Grid has stolen a little bit of its thunder, but Flexbox was the biggest innovation in browser layout in a decade, and continues to be a key piece of modern layout techniques. This takes you through all of the various properties with examples.

[A Comprehensive Guide to Flexbox Alignment | Tutsplus](https://webdesign.tutsplus.com/tutorials/a-comprehensive-guide-to-flexbox-alignment--cms-30183)  
Perhaps less addressed than the "flex" sizing components of Flexbox, alignment a key piece of the specification. Flexbox takes certain alignment issues that have been problematic since the beginning of web development and makes them trivial to solve.

[Flexbox Froggy](https://flexboxfroggy.com/)  
Wonderfully whimsical game that lets you practice your flexbox skills by positioning frogs on lilly pads. Hands down the best "learn by doing" resource out there for Flexbox.

[A Beginner’s Guide to CSS Grid | Free Code Camp](https://medium.freecodecamp.org/a-beginners-guide-to-css-grid-3889612c4b35)  
Great, simple, and very visual step by step guide to CSS Grid.

[A Complete Guide to Grid | CSS Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/)  
One of the most thorough online resources available for CSS Grid, shows all of the grid related properties, their potential values, and visual demonstrations of what all of those values do.

[Best Practices With CSS Grid Layout | Smashing Magazine](https://www.smashingmagazine.com/2018/04/best-practices-grid-layout/)  
CSS Grid has been around and being used long enough that we’re starting to see some best practices congeal. Rachel Andrew goes through a set of them, informed both by her own experience (she’s one of the foremost advocates and teachers of CSS Grid, and was involved with the spec) and a survey of developers using grid.

[Another Collection of Interesting Facts About CSS Grid | CSS Tricks](https://css-tricks.com/another-collection-of-interesting-facts-about-css-grid/)  
A set of lessons learned on how to use CSS Grid, some of the shorthand properties, and ways to handle explicit and implicit rows and columns. Filled with codepen-based examples, so you can dig in and tinker with the code to your heart’s content.

[Grid Layout Cheatsheet | alsacréations](https://www.alsacreations.com/xmedia/tools/grid-cheatsheet.pdf)  
Simple printable cheatsheet for the basics of grid layout. Extremely readable, perfect if you just want a onepager to have on your desk.

[CSS Grid Garden](https://cssgridgarden.com/)  
Another excellent learning game by the same developer as Flexbox Froggy. Learn CSS Grid by positioning carrots in a garden.

[How browsers position floats | meowni.ca](https://meowni.ca/posts/float-layout/)  
While many of us can now use Flexbox and Grid Layout for most of our layouts, there are still sometimes situations where you need to use floats. Or you’re working with an old CSS codebase that has floats all over the place. In those scenarios, it’s super helpful to understand the guts of how the browser treats floats. This is a great visual walkthrough of exactly that, letting you click through to see progressively more ways floats will get treated as you add new floating elements and clears.

[Learn CSS Positioning in Ten Steps | BarelyFitz Designs](http://www.barelyfitz.com/screencast/html-training/css/positioning/)  
Step by step tutorial on CSS positioning. A thorough grasp on relative and absolute positioning will give you some serious powers in implementing components. If you don't understand these, you are in danger of spending [an awful lot of energy](https://twitter.com/sarah_edo/status/908995987598798849) recreating something the browser will do for you.

[Z-Index Explained: How to Stack Elements Using CSS | FreeCodeCamp](https://medium.freecodecamp.org/z-index-explained-how-to-stack-elements-using-css-7c5aa0f179b3)  
Z-Index is one of the elements of CSS that seems like it should be straightforward, but there’s all sorts of complications when you start actually using it. Understanding the nuances, particularly the idea of a stacking context, is key to making z-index your friend rather than staring frustrated at your screen. This article does a great job of explaining.

[Positioning | MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning)  
The definitive resource on CSS positioning including Z-index and the new `position: sticky`.

[What’s the Deal with Margin Collapse? | Jonathan Harrell](https://jonathan-harrell.com/whats-the-deal-with-margin-collapse/)  
Margin collapse is a perennial issue when learning CSS layout, and it isn’t always easy to understand. This article does a great job of visually laying out the different ways in which margins can collapse, so if you are a visual learner definitely check this out.

</div>

</div>

<div class="page-section">

<div class="page-section__wrap page-section__wrap--narrow">

### Styling Text with CSS

One of the fundamental pieces of web styling is how we deal with text. Paragraphs, headers, links, lists... text is one of the fundamental building blocks of the web, and there are a myriad of ways to make it look good.

[Fundamental text and font styling | MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals)  
An excellent overview of the various tools in your hands when it comes to styling text. Fonts, colors, sizing, decoration, and more. Start here.

[The Definitive Guide To Styling Links With CSS | Smashing Magazine](https://www.smashingmagazine.com/2010/02/the-definitive-guide-to-styling-web-links/)  
Links are one of the fundamental building blocks of the web, and when styling them it's important to not only know the tools at your disposal but also think about the ways people _use_ links. That's why this is such a great guide - it goes through both the technical details and how you can style links in different states, but also the design thinking behind how you might want to.

[Styling lists | MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_lists)  
Lists are a fundamental part of displaying content on the web. Any time you have an array of data, there's a very good chance you'll be interested in displaying it as a list. While lists for the large part style like text, they have some unique pieces as well that this goes through in great detail.

[Using @font-face | CSS-Tricks](https://css-tricks.com/snippets/css/using-font-face/)  
A thorough guide to using custom fonts on your website. Covers font-face options for different levels of browser support, as well as alternatives like `@import`.

</div>

</div>

<div class="page-section u-bg-secondary">

<div class="page-section__wrap page-section__wrap--narrow">

### Styling Boxes with CSS

The other fundamental building block of how things appear on the web is boxes. As you learned above in the box model, everything in a webpage is a box, so understanding the tools at your disposal for styling those boxes is key.

[How to add fun CSS backgrounds to your sites | Creative Bloq](https://www.creativebloq.com/how-to/how-to-add-fun-backgrounds-to-your-sites-in-css)  
One of the most powerful tools at your disposal to change how a box-like element looks on the page is the background. Images, gradients, and more - the possibilities are endless.

[Styling Tables | MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_boxes/Styling_tables)  
Tables are not very glamorous, but for displaying _tabular_ data they are a key part of your arsenal. This guides you through the options available to you for making tables look good on the web.

[Box-shadow, one of CSS3’s best new features | CSS3.info](http://www.css3.info/preview/box-shadow/) A thorough introduction to box-shadows, breaking down the options available, what properties like spread and blur actually do, and even teaching about overlapping multiple box shadows.

[CSS Outline | Tutorial Republic](https://www.tutorialrepublic.com/css-tutorial/css-outline.php)  
While a lot of attention is paid to the border property, less is paid to the outline property, which can be another powerful tool in your toolchest, especially because they don't take up space in the box model the way borders do.

[Multiple Borders | CSS-Tricks](https://css-tricks.com/snippets/css/multiple-borders/)  
A number of the properties at your disposal to create multiple borders around a box. Pseudoelements, outline, and box shadows.

[CSS Filter Effects: Blur, Grayscale, Brightness And More In CSS! | Sitepoint](https://www.sitepoint.com/css-filter-effects-blur-grayscale-brightness-and-more-in-css/)  
Very step by step set of examples for how to use CSS filters. Keeps it very basic and visual, showing you the possibilities.

[filter | MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)  
The definitive source for CSS filters. Includes a number of examples, but also documents thoroughly all the options available to you.

</div>

</div>

<div class="page-section">

<div class="page-section__wrap page-section__wrap--narrow">

### CSS Units

Anything that involves sizing, positioning, or shading something involves units. We need to be explicit about _how much_ we want to size, position, or otherwise manipulate items in our page. TThis section goes through all the units available to us as web developers.

In responsive web frameworks like ZURB Foundation, the tendency is to use REMs for most sizing, but also to have functions available for converting between units for when pixels are necessary.

[CSS values and units | MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Values_and_units)  
An introduction to all of the different types of units in CSS. Pixels, rems, ems, unitless values, degrees, seconds, percentages, hexadecimals and more. Worth digging through for a big picture overview.

[REM vs EM – The Great Debate | Zell](https://zellwk.com/blog/rem-vs-em/)  
While pixels are probably the easiest unit to understand, creating accessible and responsive websites requires the use of `em` and `rem` units. This is the best introduction to these units I have seen, explaining in great detail how the units are defined, what that _means_ in real world use, and the pros and cons of each.

[A Look at CSS Viewport Units | Alligator.io](https://alligator.io/css/viewport-units/)  
Viewport units aren’t necessary very often, but there are a certain set of problems where they are incredibly useful, in fact there are no substitutes. If you’re not already familiar with them, take a look through this.

[Calc() function with Use Cases | Pineco](https://pineco.de/calc-function-with-use-cases/)  
Calc is one of the most useful general purpose tools in modern CSS toolkits - this article breaks down some of the many ways you can use it.

</div>

</div>

<div class="page-section u-bg-secondary">

<div class="page-section__wrap page-section__wrap--narrow">

### CSS Colors and Gradients

The web has not one but 3 unique color systems, as well as a a number of keywords and the ability to create complex gradients.

[Color | MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)  
A thorough document explaining all of the different color coordinate systems (hexadecimal vs rgb/rgba vs hsl/hsla) as well as color keywords.

[CSS Gradients | CSS-Tricks](https://css-tricks.com/css3-gradients/)  
Great explanation of all the different types of gradients, what they look like, and how they're supported across different browsers.

[CSS Gradient](https://cssgradient.io/)  
A visual tool for generating CSS Gradients. Test and tinker in real time, and when you get one you like simply copy out the CSS.

[How to add gradients to images with CSS ::after | Peter Ramsing](https://peter.coffee/how-to-use-css-pseudo-elements-to-add-a-gradient-to-images)  
Gradients can also be useful for manipulating images and all sorts of other good stuff. This shows how to do a nice gradient fade-out of an background image using a gradient.

[CSS3 Progress Bars | CSS-Tricks](https://css-tricks.com/css3-progress-bars/)  
Utilizing gradients to create beautiful progress bars.

</div>

</div>

<div class="page-section">

<div class="page-section__wrap page-section__wrap--narrow">

### CSS Transitions and Animations

Transitions and animations allow you to specify how elements change from one style to another. This can be as subtle as a tiny microinteraction on hover or as complex as a multi-step animation. These are key for adding flavor and interactivity to your website. Changing between states suddenly can be jarring, transitioning reduces user's cognitive load and makes things feel natural.

[CSS Transitions explained | Zell](https://zellwk.com/blog/css-transitions/)  
Great step by step introduction to using CSS Transitions to animate your elements.

[CSS Transitions | CSS3 = Awesome](http://css3.bradshawenterprises.com/transitions/)  
A good second article to read on transitions, once you understand the core concept. Includes some great examples of varied timing functions, and a thorough index of what properties can be transitioned.

[An Introduction To CSS Keyframes Animation](https://www.smashingmagazine.com/2011/05/an-introduction-to-css3-keyframe-animations/)  
While transitions are great, sometimes you need something a little bit more fine-grained that lets you specify multiple steps to your animations. Enter Keyframe Animations, and this article will show you how.

[Animista: CSS Animations on Demand](http://animista.net/)  
A GUI for exploring and creating CSS-based animations. You poke around, see the animations, tweak the parameters, and then export CSS animation code ready to integrate into your project. Super cool, useful both for learning and for ongoing development.

</div>

</div>

<div class="page-section u-bg-secondary">

<div class="page-section__wrap page-section__wrap--narrow">

### CSS Transforms

CSS Transforms allow you to shift and morph your elements in either 2d or 3d space. Not satisfied with simple rectangular boxes, and you want to create triangles? Chances are you'll be using transforms. They also let you animate some aspects of elements in a high-performance way by moving elements into their own layers and allowing you to GPU-accelerate the animations. Very useful!

[Transforms | Shay Howe](https://learn.shayhowe.com/advanced-html-css/css-transforms/)  
A great step by step introduction to the various types of CSS transforms and what their effects are.

[High Performance Animations | HTML5 Rocks](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)  
A look into the use of transforms for high performance animations. Explains some of the steps involved in CSS rendering and why transforms are helpful.

</div>

</div>

<div class="page-section">

<div class="page-section__wrap page-section__wrap--narrow">

### CSS Pseudo-classes and Pseudo-elements

Pseudo-classes and pseudo-elements are some of the most useful tools in your toolchest as you start to level up your CSS skills. Pseudo-classes allow you to target elements based on their state and relationship to other elements, while pseudo-elements are "implicit" elements that live within your elements, giving you new targets to manipulate.

This can let you do things like add icons to links or buttons, layer on additional borders, or other complex visual tricks.

[Learning To Use The :after And :before Pseudo-Elements In CSS | Smashing Magazine](https://www.smashingmagazine.com/2011/07/learning-to-use-the-before-and-after-pseudo-elements-in-css/)  
A thorough introduction to the `:before` and `:after` pseudo-elements, which are by far the most commonly used.

[A Whole Bunch of Amazing Stuff Pseudo Elements Can Do | CSS-Tricks](https://css-tricks.com/pseudo-element-roundup/)  
Once you've got the basics of pseudo-elements down you start looking for opportunities to use them. This is an incredible roundup of the varied ways designers and developers have found to take advantage.

[Animating pseudo-elements | CSSAnimation.rocks](https://cssanimation.rocks/pseudo-elements/)  
One item that isn't caught as much in the roundup above but is incredibly powerful is the ability to use pseudo-elements to create fancy animations. This gives you one example (a button that shimmers on hover) but also breaks down how to do it.

[Using pseudo-elements with CSS Grid | Codepen](https://codepen.io/michellebarker/post/using-pseudo-elements-with-css-grid)  
Did you know that pseudo-elements are considered direct child elements, and thus completely positionable and styleable via CSS Grid? This makes for some really interesting possibilities, and this is a great example of utilizing this tool to solve a common layout problem.

[How CSS pseudo-classes work, explained with code and lots of diagrams | FreeCodeCamp](https://medium.freecodecamp.org/explained-css-pseudo-classes-cef3c3177361)  
Great introductory explainer to pseudo-classes, with visual diagrams and step by step breakdown. If you're brand new to this, start here.

[Meet the Pseudo Class Selectors | CSS-Tricks](https://css-tricks.com/pseudo-class-selectors/)  
A thorough index of all available pseudo-classes. Once you understand how these things work in principle, read this to learn all the options available to you.

</div>

</div>

<div class="page-section u-bg-secondary">

<div class="page-section__wrap page-section__wrap--narrow">

### CSS At-Rules (e.g. Media Queries)

_Almost_ everything in CSS can be thought of as properties applied to elements chosen by some form of selector, but there are a few exceptions. So-called `at-rules` (rules starting with the `@` character) allow you to apply some additional behavior, doing things like specifying charset, importing external resources, and scoping blocks of CSS based on things like supported feature or device size. These rules (particulary media queries) are at the core of Responsive web development - development of pages and applications that "respond" to device size by laying out differently.

[The At-Rules of CSS | CSS-Tricks](https://css-tricks.com/the-at-rules-of-css/)  
An excellent introduction and overview of the different `at-rules` available and what they enable you to do.

[CSS Media Queries: Quick Reference & Guide | Alligator.io](https://alligator.io/css/media-queries/)  
Getting deeper into media queries, understanding how they work and how you can apply them to change the way a page looks based on screen type and size.

[How To Write Mobile-first CSS | Zell](https://zellwk.com/blog/how-to-write-mobile-first-css/)  
One of the most popular approaches to responsive design development is "mobile first" - defining your layout by starting at the smallest screens and then progressively enhancing them for larger screens. This is an excellent introduction to how "mobile first" works in CSS.

</div>

</div>

<div class="page-section">

<div class="page-section__wrap page-section__wrap--narrow">

### CSS Specificity

Once you've started to become comfortable with the basics of CSS - using it to change the layout and graphical features of your page, it is time to learn how to use it _well_. Once of the most important concepts to master as you start to dig into more advanced concepts is specificity - how the browser decides what styles to apply where. This will be key in understanding why and how different CSS naming systems and architectures are designed the way they are.

[Specifics on CSS Specificity | CSS Tricks](https://css-tricks.com/specifics-on-css-specificity/)  
A great introduction to CSS specificity. What it is, how it works, how to do specificity calculations. Short, to the point, and well, _specific_ about the details.

[CSS Specificity: Things You Should Know | Smashing Magazine](https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/)  
A thorough overview of the concept of specificity. Goes a lot of detail with many examples for practicing specificity calculations, and includes an incredible list of resources to dive deeper.

[Strategies for Keeping CSS Specificity Low | CSS Tricks](https://css-tricks.com/strategies-keeping-css-specificity-low/)  
As CSS best practices have evolved, we've come to realize that the more we can keep specificity low across our projects the better off we'll be. In fact, many of the CSS naming conventions that have arisen have low specificity as a fundamental principle. This is an introduction to strategies for keeping specificity low.

[Specificity in :not(), :has(), and :matches() | meyerweb.com](https://meyerweb.com/eric/thoughts/2018/06/05/specificity-in-not-has-and-matches/)  
This has definitely tripped me up before. Specificity of pseudoclasses follows some simple rules, but unless you know those rules you can easily end up expecting one thing and running into something completely different. This is a short and sweet article that will give you clarity.

</div>

</div>

<div class="page-section u-bg-secondary">

<div class="page-section__wrap page-section__wrap--narrow">

### CSS Preprocessors

The use of CSS preprocessors (primarily [Sass](http://sass-lang.com/) aka SCSS) has become so common that many developers (including the author) consider them almost a part of CSS, talking about things that are a part of e.g. SCSS while discussing CSS Architecture. Also, they make your life so much easier... if you're not already, definitely consider switching to SCSS.

[Why Sass | Alistapart](https://alistapart.com/article/why-sass)  
Explains some of the core value propositions of a compile to css language, using Sass as a particular example.

[Sass Basics | sass-lang.com](https://sass-lang.com/guide)  
A guide to the basic features of Sass. This is where to start learning.

[Sass control directives: @if, @for, @each and @while | TheSassWay](http://thesassway.com/intermediate/if-for-each-while)  
As you start using Sass more and want to create more reusable components, mixins, and functions it's key to understand the control flow primitives available to you.

[Take your Sass skills to the next level with list-maps | CodeFellows](https://www.codefellows.org/blog/so-you-want-to-play-with-list-maps/)  
Another key Sass feature, especially for things like color palletes and the like, is list-maps. Definitely worth reading into.

[Learn LESS in 10 Minutes (or Less) | Tutorialzine](https://tutorialzine.com/2015/07/learn-less-in-10-minutes-or-less)  
While much of the CSS world has standardized on Sass, there are still quite a few people using Less as well, including the [Semantic UI framework](https://semantic-ui.com/). It's pretty similar in functionality to Sass, but if you want to start with Less this is a good tutorial to do so.

[Stylus](_blank)  
Stylus is another compile-to-CSS language that remains somewhat popular. Those who particularly like terse syntax and don't mind whitespace sensitivity should check it out.

[PostCSS – A Comprehensive Introduction | Smashing Magazine](https://www.smashingmagazine.com/2015/12/introduction-to-postcss/)  
Less of a "compile to CSS" language and more of a framework for developing CSS extensions (equivalent to what <a target="_blank" href="">Babel</a> is for JavaScript), this is still a powerful tool to be aware of.

[CodeKit vs. Prepros](http://keroyu.logdown.com/posts/159824-codekit-vs-prepos)  
Most compile-to-CSS languages require a build system, these days typically built using Node.js. For those who are just getting started and don't want to worry about Node.js, CodeKit and Prepros are two options that will let you compile languages like Sass to CSS without having to deal with Node.

</div>

</div>

<div class="page-section">

<div class="page-section__wrap page-section__wrap--narrow">

### CSS Naming Systems and Architecture

If you're not careful, it is easy to write complex, confusing, and unmaintable CSS. That is why there has been so much work done thinking about good, scalable CSS naming systems and architectures. Understanding and sticking to these can be the difference between loving and hating CSS.

[An Introduction To Object Oriented CSS (OOCSS) | Smashing Magazine](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)  
While a majority of developers have gone beyond OOCSS and towards BEM, it can still be a good first place to start thinking about naming conventions and structuring CSS. OOCSS was one of the first low-specificity naming conventions to arise in CSS, and is still a reasonable naming convention for smaller sites.

[BEM For Beginners: Why You Need BEM | Smashing Magazine](https://www.smashingmagazine.com/2018/06/bem-for-beginners/)  
BEM is by far the most used CSS naming convention today. That said, it took me a long time to come around to BEM originally - being an old-school developer, and having come from a backend background way back in the day, it seemed overly verbose and complicated. Once I bridged over that initial impression, I’ve been very happy with using BEM for a wide variety of projects. What I appreciate about this article is it not only explains what BEM is, but the reasoning behind many of the choices. If I’d had those back when I was first learning about BEM, it might not have taken me so long to decide to use it.

[SMACSS](https://smacss.com/)  
Similar to the role OOCSS played in kicking off new thinking around CSS naming systems, SMACSS was one of the first big CSS architectural systems, and is still one of the best documented ones. Even if you intend eventually moving to a more modern architectural system like ITCSS, it can be super helpful to read through the SMACSS system to deeply understand the concept and why's around categorizing and systematizing your stylesheets.

[ITCSS: Scalable and Maintainable CSS Architecture | XFive Blog](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)  
ITCSS has a small but almost fanatical base of fans. Those who advocate it highlight its scalability, maintainability, and how ITCSS codebases are a joy to work with. The biggest challenge to adoption is the lack of good available free documentation and educational material. This blog post is one of the best I've found explaining it. For an example in code, check out [inuitcss](https://github.com/inuitcss/inuitcss).

[ECSS](http://ecss.io/)  
ECSS combines an architectural approach - organization via modules - with a naming convention that takes BEM style naming conventions and "turns them up to 11". Advocates of pure component-based styling will find much to like in this approach.

[The 80-20 Approach to Sustainable SCSS | ZenDev Blog](https://zendev.com/2018/05/30/the-80-20-approach-to-sustainable-scss.html)  
I’m a huge fan of the great strides we’ve taken in CSS architecture over the last few years, allowing us to design really powerful systems that are far more maintainable than CSS used to be, but this has come at the cost of making CSS and SCSS sometimes seem intimidating to newcomers. The vast majority of projects don’t need anything super complicated, so this post attempts to break down 2 quick decisions you can make that will take you a long way towards sustainable SCSS without requiring deep study or crazy complex systems.

</div>

</div>

<div class="page-section u-bg-secondary">

<div class="page-section__wrap page-section__wrap--narrow">

### Common CSS Practices

There are a number of pretty common practices - things like using a reset and/or normalizing CSS, linting, and more that don't fit in any particular bucket but are worth learning about.

[Autoprefixer | CSS-Tricks](https://css-tricks.com/autoprefixer/)  
Autoprefixer is a must-have tool for modern CSS, letting you stop worring about the different variations of properties across browsers and just specify what browsers you want to support and let the tool automatically handle it.

[Lint your CSS with stylelint | CSS-Tricks](https://css-tricks.com/stylelint/)  
An introduction to linting for CSS with stylelint. Keep your styles working, catch errors early, and enforce standards across your codebase!

[Reboot, Resets, and Reasoning | CSS-Tricks](https://css-tricks.com/reboot-resets-reasoning/)  
An explanation of the thinking behind resets, some of the history, and some modern options.

[About normalize.css | Nicolas Gallagher](http://nicolasgallagher.com/about-normalize-css/)  
A great description of what Normalize.css provides and the motivations behind it.

</div>

</div>

<div class="page-section">

<div class="page-section__wrap page-section__wrap--narrow">

### CSS Modules and Related Technologies

One of the trends in larger companies and projects is towards total programatic scoping of CSS. This has pros and cons, and occasionally takes on the flavor of a religious war, but as in most technology decisions the right choice depends on the context of project and team. These approaches tend to sacrifice some core pieces of CSS (the cascade) in order to gain other outcomes (total isolation of styles to a component). This tradeoff tends to make sense for large teams working on very large codebases, and less for smaller teams and smaller codebases.

[What are CSS Modules and why do we need them? | CSS-Tricks](https://css-tricks.com/css-modules-part-1-need/)  
A great introduction to CSS Modules - what they are, how they work, and how you might use them.

[CSS at Scale: LinkedIn’s New Open Source Projects Take on Stylesheet Performance | Linkedin Engineering](https://engineering.linkedin.com/blog/2018/04/css-at-scale--linkedins-new-open-source-projects-take-on-stylesh)  
Another take on CSS modules by Linkedin, CSS-blocks leans into some of the best of CSS while still focusing on component-oriented styles and complete isolation.

</div>

</div>

<div class="page-section u-bg-secondary">

<div class="page-section__wrap page-section__wrap--narrow">

### CSS Walkthroughs and Examples

Sometimes rather than deep diving into a particular topic, it's more useful to have a walkthrough of accomplishing a particular goal. Here are some especially well done walkthroughs.

[Styling buttons, the right way | florens verschelde](https://fvsch.com/code/styling-buttons/)  
Very nice walkthrough of the thinking and the CSS that goes into creating a well-styled, reusable component. In this case they take a button and walk you through step by step: first applying a reset, building out basic component styles, handling hover, focus, and active states, and finally addressing browser quirks around sticky focus styling. I appreciate the fact they show you the thought process throughout, so you can more easily apply this approach to building your own components.

[CSS Grid — Responsive layouts and components | Deemaze Writing Wall](https://medium.com/deemaze-software/css-grid-responsive-layouts-and-components-eee1badd5a2f)  
A walkthrough on using CSS Grid to build a layout and make it responsive, showing how to can use minmax, auto-fit, and auto-fill to add quite a bit of responsiveness before you even think about a media query.

[Drawing Images with CSS Gradients | CSS-Tricks](https://css-tricks.com/drawing-images-with-css-gradients/)  
A super-detailed step by step tutorial that will have you drawing fancy umbrellas, an iPhone, and even an animated radar all with CSS.

[How to create a simple CSS loading spinner & make it accessible | Codeburst](https://codeburst.io/how-to-create-a-simple-css-loading-spinner-make-it-accessible-e5c83c2e464c)  
A step by step guide to creating a reusable scss mixin for loading spinners that requires no image assets and is completely accessible.

[Creating a Bar Graph with CSS Grid | CSS-Tricks](https://css-tricks.com/creating-a-bar-graph-with-css-grid/)  
This article does a very nice job of using grid and CSS custom properties to make a super cool bar graph, and brings you along with the thinking the whole way.

[Contextual styling with custom properties | Simurai](http://simurai.com/blog/2018/04/01/contextual-styling)  
Great usecase and example of using CSS Custom properties to create a mix-and-match theming system letting you apply themes per component and location in the page.

[Using CSS Clip Path to Create Interactive Effects | CSS-Tricks](https://css-tricks.com/using-css-clip-path-create-interactive-effects/)  
Wow is this some cool stuff. Using CSS Clip path to create programatically controlled effects on an image, using pure CSS.

[Making The Transition From After Effects To CSS Transitions And Keyframes | Smashing Magazine](https://www.smashingmagazine.com/2017/12/after-effects-css-transitions-keyframes/)  
Practical walkthrough of how to take animations designed in After Effects and translate them into HTML and CSS.

[Animating Border](https://css-tricks.com/animating-border/)  
You would think that something as conceptually simple as animating the border on a button would be easy to do, right? But no… it’s actually very hard to do right. This article goes through the different approaches and their pros and cons.

</div>

</div>

<div class="page-section">

<div class="page-section__wrap page-section__wrap--narrow">

### Comprehensive CSS Resources

Resources covering large swathes of CSS, not particular topics.

[Caniuse.com](https://caniuse.com/)  
A key tool for determining browser support of any CSS feature. Not sure if the nifty new CSS tool you want to use will work for your audience? Caniuse can let you figure it out.

[Comprehensive CSS Cheat Sheet + PDF | OnBlastBlog](https://www.onblastblog.com/css3-cheat-sheet/)  
A massive downloadable cheat sheet covering pretty much every css property and what it's allowable values are. Great to print out and have on your desk to help you find and remember properties as you're learning them.

[CSS Almanac | CSS-Tricks](https://css-tricks.com/almanac/)  
An online, alphabetical almanac of CSS properties and keywords. Diving into each one shows both descriptions of the property or keyword, but also interactive examples built with codepen, browser support charts, and links to additional information. An incredible resource.

</div>

</div>

<div class="page-section u-bg-secondary">

<div class="page-section__wrap page-section__wrap--narrow">

### CSS Frameworks

As you've probably gathered by this point in this article, there is a _lot_ to CSS, and lots of edgecases and tricks to learn. One of the best ways to get most of those edgecases and tricks "for free" is to utilize a CSS framework. One can consider these sets of components and best practices packaged up for reuse. Some frameworks are focused on particular design languages, while others are more flexible and themeable, but they are all incredible resources to get you building great websites faster.

[Bootstrap](https://getbootstrap.com/)  
Bootstrap is the most popular CSS framework by a large distance. It tends to be pretty opinionated and difficult to customize deeply, but is a great place to begin.

[Learn Bootstrap 4 in 30 minutes by building a landing page website | FreeCodeCamp](https://medium.freecodecamp.org/learn-bootstrap-4-in-30-minute-by-building-a-landing-page-website-guide-for-beginners-f64e03833f33)  
This is a great one-stop tutorial that introduces you to many of the features of the latest version of Bootstrap.

[ZURB Foundation](https://foundation.zurb.com/sites/docs/)  
Often described as a "designer-focused" CSS Framework, ZURB Foundation places far more emphasis on being customizeable and extensible than providing a polished UI 'out of the box'. Offers tremendous customization simply by manipulating an SCSS settings file, plus every component is built using reusable SCSS mixins and functions that you can utilize to build your own customized components.

[Semantic UI](https://semantic-ui.com/)  
A natural language-focused CSS framework with extensive theming capabilities. A bit heavy-weight and challenging to break into subpieces, but extremely powerful.

[Learn Semantic](http://learnsemantic.com/)  
An extensive set of learning guides for Semantic UI.

[Bulma](https://bulma.io/)  
A compact, CSS-only framework that is excellent for those who find the above frameworks too heavyweight and complex. Where Bootstrap, ZURB Foundation, and Semantic all come with integrated JavaScript for some components, Bulma only ships CSS and leaves any JavaScript integration to the developer.

[MaterializeCSS](https://materializecss.com/)  
An implementation of Google's Material Design as a CSS Framework that does not have a dependency on any particular JavaScript framework. (Note: There are also Material Design implementations in [React](https://material-ui.com/), [Angular](https://material.angular.io/), and [Vue](https://vuetifyjs.com/en/).)

</div>

</div>

<div class="page-section">

<div class="page-section__wrap page-section__wrap--narrow">

### Free CSS Courses

[Learn CSS | Codecademy](https://www.codecademy.com/learn/learn-css)  
Requires a signup, but then gives you an interactive learning environment, with 3 resizable windows with written instruction, a code editor, and a rendered preview on the right. Has a very thorough set of instruction, but doesn't really let you skip around between lessons, so while it is great if you're starting from scratch folks who are already using CSS and want to improve one or two specific topics may get frustrated.

[freeCodeCamp](https://learn.freecodecamp.org/)  
Optional login if you want to track your progress. Lets you pick and choose lessons, but also has a beginning to end course on "Responsive Web Design" that covers HTML as well as. Similar to Codecademy in the interactive setup with multiple windows, but I think better because it lets you pick and choose resources if you like.

[What the Flexbox? | Wes Bos](https://flexbox.io/)  
Free 20-video course on mastering Flexbox. Videos are short, with the first 13 focused on fundamentals and the last 7 as code-alongs. Requires a registration with email.

[Let's Get Griddy With It | Wes Bos](https://flexbox.io/)  
Free 25-video course on mastering CSS Grid. About 4 hours of total video, with an initial focus on the fundamentals, and later transitioning into building out example layouts. Requires a registration with email.

</div>

</div>

<div class="page-section u-bg-secondary">

<div class="page-section__wrap page-section__wrap--narrow">

### Paid CSS Courses

While there are tons of great free resources available, sometimes you get waht you pay for, and these paid courses have a tremendous amount of depth while guiding you step by step. Plus, I know that when I pay for something it makes me way more likely to follow through.

[CSS - The Complete Guide (incl. Flexbox, Grid & Sass) | Udemy](https://click.linksynergy.com/deeplink?id=hIdOL5Z4eK4&mid=39197&murl=https%3A%2F%2Fwww.udemy.com%2Fcss-the-complete-guide-incl-flexbox-grid-sass%2F)  
Starts from scratch and takes you through to advanced use. Has 3 separate tracks depending on your current skill level, and provides over 22 hours of video content and over 300 supplemental resources. One of the instructors - Maximilian Schwarzmüller - is one of the top instructors on Udemy, and for good reason. He's excellent at breaking things down so you can understand no matter what your level of expertise.

[Advanced CSS and Sass: Flexbox, Grid, Animations and More! | Udemy](https://click.linksynergy.com/deeplink?id=hIdOL5Z4eK4&mid=39197&murl=https%3A%2F%2Fwww.udemy.com%2Fadvanced-css-and-sass%2F)  
For those already more advanced at CSS and wanting to truly become an expert, this course offers 28 hours of video content for taking you from intermediate to advanced. Organized around a series of projects, this is the top-rated CSS course on Udemy with over 500 ratings. Truly high quality stuff.

</div>

</div>

<div class="page-section">

<div class="page-section__wrap page-section__wrap--narrow">

### CSS Newsletters

The state of the art is constantly changing, and weekly newsletters can be a great way to keep up with that change. Here's some of the top CSS newsletters out there.

[Friday Frontend](https://zendev.com/friday-frontend.html)  
15 links each Friday with commentary, covering CSS, JavaScript, and other important web topics and news. Published by KBall, founder of ZenDev.

[CSS Weekly](https://css-weekly.com/)  
A weekly roundup of CSS focused articles, tutorials, experiments and tools curated by Zoran Jambor.

[CSS Layout News](http://csslayout.news/)  
A weekly collection of tutorials, news and information on all things CSS Layout, published by [Rachel Andrew](https://twitter.com/rachelandrew), editor in chief at Smashing Magazine.

[Layout Land](https://www.layout.land/)  
Primarily used to keep subscribers up to date of new videos on the [Layout Land Youtube Channel](https://www.youtube.com/layoutland), published by Mozilla Developer Advocate [Jen Simmons](https://www.smashingmagazine.com/2018/06/newsletters-for-designers-and-developers/).

[Frontend Focus](https://frontendfoc.us/)  
A once–weekly roundup of the best front-end news, articles and tutorials. HTML, CSS, WebGL, Canvas, browser tech, and more. Published by Cooperpress.

[HeyDesigner](https://heydesigner.com/newsletter/)  
Covers HTML, CSS, and SCSS, but also a range of other topics interesting to designers. Published weekly by [Tamas Sari](https://twitter.com/tamassari?lang=en).

---

P.S. - If you're interested in these types of topics, I send out a weekly newsletter called the 'Friday Frontend'. Every Friday I send out 15 links to the best articles, tutorials, and announcements in CSS/SCSS, JavaScript, and assorted other awesome Front-end News. Sign up now!
