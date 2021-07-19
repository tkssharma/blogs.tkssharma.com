---
date: 2020-02-25
title: 'Angular 2.0 Component Design live Application @component communication'
template: post
thumbnail: '../thumbnails/angular.png'
slug: angular-component-design-and-communication
categories:
  - Popular
  - Angular
tags:
  - Angular
---

When building an Angular application, one the most frequent questions that we are faced with right at the beginning is: how do we structure our application?

The immediate answer that we might find is: we just split everything into components! But we then quickly find out that there is more to it than that:

* what types of components are there?

* how should components interact?

* should I inject services into any component?

* how do I make my components reusable across views?

We will try to answer these and other questions by splitting components essentially into two types of specialized components (but there is more to it):

* Smart Components: also know sometimes as application-level components, container components or controller components

* Presentation Components: also known sometimes as pure components or dumb components

In this blog, I’ll take a simple example and go over various scenarios to give you an idea as to how they actually work. Specifically, I’ll go over:

1. Basic idea of components

2. Dissecting the Component API

3. Deep dive Components(Angular source code)

4. Component Interactions(Parent & child components communication)

5. Component lifecycle hooks

6. Classifying Components(Smart & dumb components😎)

7. Component inheritance(ES6 Inheritance👏🏽)

*Yes almost everything related to Components!!!*

## The app

*Throughout this article I’d be using a Youtube application to showcase most of the concepts in this article.*
[tkssharma/Web-Development-with-Angular-2-and-Bootstrap
*Web-Development-with-Angular-2-and-Bootstrap — Web Development with Angular 2 and Bootstrap Course on Packt*github.com](https://github.com/tkssharma/Web-Development-with-Angular-2-and-Bootstrap/tree/master/ng-2-training/ES6-YouTube%20App)

## Components: Basic Idea

Components are the basic building blocks of an angular application. Think of an application as a car then the transmission, braking system, engine etc are its components. All the components come together to make a car, likewise an application constitutes of ui components such as the header, footer, sidebar, main-area, notification panel etc.

![Component hierarchy one way graph](https://cdn-images-1.medium.com/max/2000/1*eLd4fABTXnl437c9VQv8zA.png)*Component hierarchy one way graph*

Top level component is the first node in the above illustration and it has further child components, these child components can further have child components. Its like a tree.

However, I also want to highlight that at any point in this graph a component can have further components as well as directives(more on directives in the future section of this series).

In fact components are the most important directives in angular > 2.x. Folks familiar with Angular 1.x would remember that we used directives with templates to structure our applications, so it made more sense to extract that under a new name(Component) and since the [WebComponents](http://webcomponents.org/) took the developer community by storm so angular team used the web component idea and gave existing angular 1.x directives a new name *Components*.
> However, directives can only be present at the leaf nodes since they don’t have templates to accommodate any more components or directives.

Components are intended to be self-contained because we want to encapsulate our component functions and we don’t want other code to arbitrarily reach into our components to read or change properties. Also, we don’t want our component to affect another component written by someone else. An obvious example is CSS — if we set CSS for one component we don’t want our CSS to “bleed out” to another components just as we don’t want other CSS to “bleed in” to our component.

## Dissecting the Component API

You create a component by creating a ES6 style class here in Typescript and adding a special decorator called Component above the class name.

Components are directives with a special decorator(@Component) and templates. This decorator hijacks the ES6 class and its constructor and adds its own magic such as initialisation params inside the constructor and hiding some details for us.

You also export the class so that it can be imported in other files and used throughout your application.

Let’s look at a simple component.

    @Component({
      selector: 'my-app',
      styles: [`
        .h2 {
          margin-left: 10px;
        }
      `],
    template: `
      <h2>My App</h2>
    `
    })

    export class AppComponent {
    }

This component can be used anywhere in the template like this <my-app></my-app> . Template and styles can be specified inline or by passing url.

A component can have properties which can then be accessed in the views like this {{myValue}}. These properties can be accessed using this.propertyNameanywhere in the component.

Now when we decide to create application first things is how should we structure our application how the data should flow in components. I am showing here youtube app which will behaving 3 components at least.

![](https://cdn-images-1.medium.com/max/4388/1*fpQGW6IY9LzZFiHf0WZuOw.png)

here we have search bar,Video list & video detail components and we are using @Input & @Output binding for data flow between components.

![](https://cdn-images-1.medium.com/max/2400/1*LFwcfykZUYYVqLItNue1yg.png)
```javaScript
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component
    ({
      selector: 'search-bar',
      template: '<div class="search-bar" ><input [(ngModel)]="searchText" (change)="handleChange()" /></div>' .  
})

export default class SearchBar implements OnInit {
  @Output() searchTextChange = new EventEmitter();
  searchText: string;
  constructor() { }
  ngOnInit() { }
  handleChange() {
    this.searchTextChange.emit({
      value: this.searchText
    })
  }
}
```
this component will emit event to root component when user enter any text in search bar this is the only task which this component is doing passing data to parent component using @Output annotation and sending search keyword using EventEmitter object.

```javaScript
@Component({selector: 'youtube', templateUrl: './youtube.html'})

export default class Youtube implements OnInit {
    Videos : video[];
    loaded : boolean;
    API_KEY : string;
    selectVideo : video;
    opts : any;
    constructor() {

    }
    ngOnInit() {
        this.loaded = false;
        var params = {
            part: 'snippet',
            q: 'Still into You paramore',
            maxResults: 5
          }
          client.search(params, (err:any, data:any) => {
            // your magic..
            console.dir(data);
            this.Videos = data.items;
            this.selectVideo = data.items[2]
            this.loaded = true;
          })
    }
 }
```
Here in root component i am getting list of videos from YouTube API, now i just need to pass this data to my child components to just show this on UI which are video-list and video details. This can be done by @Input annotation in child components.

```javaScript
@Component({
    selector: 'video-list',
    templateUrl: 'video-list.html'
})

 class VideoList implements OnInit {
   @Input() Videos:video[] ;
   @Output() clickParentChange = new EventEmitter();

   ngOnInit(){
     console.log(this.Videos);
   }
   handleClickChange(e:any){
    this.clickParentChange.emit({
      value: e
    });
    console.log(e);

   }
}
export default VideoList;
```
Happy Learning …stay tuned for more Blogs :)
