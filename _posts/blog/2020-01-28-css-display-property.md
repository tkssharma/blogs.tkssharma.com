---
date: 2020-01-28
title: 'CSS * Display Property in Depth'
template: post
thumbnail: '../thumbnails/css.png'
slug: css-display-property
categories:
  - Popular 
tags:
  - Javascript
---

The display [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) property sets whether an element is treated as a [block or inline element](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout) and the layout used for its children, such as [grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) or [flex](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout).

Formally, the display property sets an element's inner and outer *display types*. The outer typeset an element's participation in [flow layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout); the inner type sets the layout of children. Some values are fully defined in their own individual specifications; see the table at the end of this document for links to all relevant specifications.

## Syntax

    /* <display-outside> values */
    display: block;
    display: inline;
    display: run-in;

    /* <display-inside> values */
    display: flow;
    display: flow-root;
    display: table;
    display: flex;
    display: grid;
    display: ruby;

    /* <display-outside> plus <display-inside> values */
    display: block flow;
    display: inline table;
    display: flex run-in;

    /* <display-listitem> values */
    display: list-item;
    display: list-item block;
    display: list-item inline;
    display: list-item flow;
    display: list-item flow-root;
    display: list-item block flow;
    display: list-item block flow-root;
    display: flow list-item block;

    /* <display-internal> values */
    display: table-row-group;
    display: table-header-group;
    display: table-footer-group;
    display: table-row;
    display: table-cell;
    display: table-column-group;
    display: table-column;
    display: table-caption;
    display: ruby-base;
    display: ruby-text;
    display: ruby-base-container;
    display: ruby-text-container;

    /* <display-box> values */
    display: contents;
    display: none;

    /* <display-legacy> values */
    display: inline-block;
    display: inline-table;
    display: inline-flex;
    display: inline-grid;

    /* Global values */
    display: inherit;
    display: initial;
    display: unset;

The display property is specified using keyword values. Keyword values are grouped into six value categories:

![](https://cdn-images-1.medium.com/max/3092/1*092EXCMb7K5tj-HdTHCCvg.png)

display — Block: This property is used as the default property of div. This property places the div one after another vertically. Height and width of the div can be changed using the block property if the width is not mentioned, then div under block property will take up the width of the container.Every element on a web page is a rectangular box. The display property in CSS determines just how that rectangular box behaves. There are only a handful of values that are commonly used:
```css
    div {
      display: inline;        */* Default of all elements, unless UA stylesheet overrides */*
      display: inline-block;  */* Characteristics of block, but sits on a line */*
      display: block;         */* UA stylesheet makes things like <div> and <section> block */*
      display: run-in;        */* Not particularly well supported or common */*
      display: none;          */* Hide */*
    }
```
The default value for all elements is inline. Most “User Agent stylesheets” (the default styles the browser applies to all sites) reset many elements to “block”. Let’s go through each of these, and then cover some of the other less common values.

### Inline — display inline

The default value for elements. Think of elements like <span>, <em>, or <b> and how wrapping text in those elements within a string of text doesn't break the flow of the text.

![](https://cdn-images-1.medium.com/max/2000/0*re5eb-G6GcxfY161.png)

The <em> element has a 1px red border. Notice it sits right *inline* with the rest of the text.

An inline element will accept margin and padding, but the element still sits inline as you might expect. Margin and padding will only push other elements horizontally away, not vertically.

![](https://cdn-images-1.medium.com/max/2000/0*ENJ5fgxFe5oIO71J.png)

An inline element will not accept [height](http://css-tricks.com/almanac/properties/h/height/) and [width](http://css-tricks.com/almanac/properties/w/width/). It will just ignore it.

### Inline Block — display: inline-block

An element set to inline-block is very similar to inline in that it will set inline with the natural flow of text (on the "baseline"). The difference is that you are able to set a width and height which will be respected.

![](https://cdn-images-1.medium.com/max/2000/0*7He0UR6WLejr8ZJa.png)

Block — display: block
---------------------

### Display — Table Values

There is a whole set of display values that force non-table elements to behave like table-elements if you need that to happen. It’s rare-ish, but it sometimes allows you to be “more semantic” with your code while utilizing the unique positioning powers of tables.
```css
    div {
      display: table;
      display: table-cell;
      display: table-column;
      display: table-colgroup;
      display: table-header-group;
      display: table-row-group;
      display: table-footer-group;
      display: table-row;
      display: table-caption;
    }
```    

To use, just mimic normal table structure. Simple example:
```html
    <div style="display: table;">
      <div style="display: table-row;">
        <div style="display: table-cell;">
          Gross but sometimes useful.
        </div>
      </div>
    </div>
```    

The display the property specifies if/how an element is displayed.

Every HTML element has a default display value depending on what type of element it is. The default display value for most elements is block or inline.

## Block-level Elements

A block-level element always starts on a new line and takes up the full width available (stretches out to the left and right as far as it can).

The <div> element is a block-level element.

Examples of block-level elements:

```html
  
    <div>
    <h1> - <h6>
    <p>
    <form>
    <header>
    <footer>
    <section>
```

## Inline Elements

An inline element does not start on a new line and only takes up as much width as necessary.

This is an inline <span> element inside a paragraph.
```html
    <span>
    <a>
    <img>
```
## Display: none;

display: none; is commonly used with JavaScript to hide and show elements without deleting and recreating them. Take a look at our last example on this page if you want to know how this can be achieved.

The script element uses display: none; as default.

## Override The Default Display Value

As mentioned, every element has a default display value. However, you can override this.

Changing an inline element to a block element, or vice versa, can be useful for making the page look a specific way, and still follow the web standards.

A common example is making inline <li> elements for horizontal menus:

    li {

    display: inline;

    }

Note: Setting the display property of an element only changes how the element is displayed, NOT what kind of element it is. So, an inline element display: block; is not allowed to have other block elements inside it.

The following example displays <span> elements as block elements:

    span {
     display: block;
    }

The following example displays <a> elements as block elements:

    a {
     display: block;
    }

## Hide an Element — display:none or visibility:hidden?

display:none means that the tag in question will not appear on the page at all (although you can still interact with it through the dom). There will be no space allocated for it between the other tags.

visibility:hidden means that unlike display:none, the tag is not visible, but space is allocated for it on the page. The tag is rendered, it just isn't seen on the page. example ..

    test | <span style="[style-tag-value]">Appropriate style in this tag</span> | test

Replacing [style-tag-value] with display:none results in:

    test |   | test

Replacing [style-tag-value] with visibility:hidden results in:

    test |                        | test

display:none removes the element from the normal flow of the page, allowing other elements to fill in.

visibility:hidden leaves the element in the normal flow of the page such that is still occupies space.

Few examples
------------

![](https://cdn-images-1.medium.com/max/2000/1*NZJjIP5M343Er-NkUdSr8g.png)

Block: This property is used as the default property of div. This property places the div one after another vertically. Height and width of the div can be changed using the block property if the width is not mentioned, then div under block property will take up the width of the container.

![](https://cdn-images-1.medium.com/max/2000/1*tuZDY-YPl7t6NFzgJ1ph9w.png)

![](https://cdn-images-1.medium.com/max/2644/1*NHF1Esf_EAXWD3Jbch4NpQ.png)

examples captured from [https://www.geeksforgeeks.org/css-display-property/](https://www.geeksforgeeks.org/css-display-property/)

## More Information

* [MDN](https://developer.mozilla.org/en/CSS/display)

* [https://www.geeksforgeeks.org/css-display-property/](https://www.geeksforgeeks.org/css-display-property/)

* [https://developer.mozilla.org/en-US/docs/Web/CSS/display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)

* [https://www.w3schools.com/css/css_display_visibility.asp](https://www.w3schools.com/css/css_display_visibility.asp)
