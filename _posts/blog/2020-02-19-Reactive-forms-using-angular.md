---
date: 2020-02-19
title: 'Angular Forms are Crucial & little Complex'
template: post
thumbnail: '../thumbnails/angular.png'
slug: reactive-forms-in-angular-making-little-easy
categories:
  - Popular
  - Angular
tags:
  - Angular
---


Forms are probably the most crucial aspect of your web application. While we often get events from clicking on links or moving the mouse, it’s through *forms* where we get the majority of our rich data input from users.

On the surface, forms seem straightforward: you make an input tag, the user fills it out, and hits submit. How hard could it be?

It turns out, forms can be very complex. Here’s a few reasons why:

* Form inputs are meant to modify data, both on the page and the server
* Changes often need to be reflected elsewhere on the page
* Users have a lot of leeway in what they enter, so you need to validate values
* The UI needs to clearly state expectations and errors, if any
* Dependent fields can have complex logic
* We want to be able to test our forms, without relying on DOM selectors
Thankfully, Angular has tools to help with all of these things.

* FormControls encapsulate the inputs in our forms and give us objects to work with them
* Validators give us the ability to validate inputs, any way we'd like
* Observers let us watch our form for changes and respond accordingly
*
In this chapter we’re going to walk through building forms, step by step. We’ll start with some simple forms and build up to more complicated logic.

## FormControls and FormGroups

The two fundamental objects in Angular forms are FormControl and FormGroup.

## FormControl

A FormControl represents a single input field - it is the smallest unit of an Angular form.

FormControls encapsulate the field's value, and states such as being valid, dirty (changed), or has errors.

    // create a new FormControl with the value “Nate”
    let nameControl = new FormControl(“tarun”);
    let name = nameControl.value; // -> tarun
    // now we can query this control for certain values:
    nameControl.errors // -> StringMap<string, any> of errors
    nameControl.dirty // -> false
    nameControl.valid // -> true
    // etc.

For instance, here’s how we might use a FormControl in TypeScript:

To build up forms we create FormControls (and groups of FormControls) and then attach metadata and logic to them.

Like many things in Angular, we have a class (FormControl, in this case) that we attach to the DOM with an attribute (formControl, in this case). For instance, we might have the following in our form:

    <! — part of some bigger form →

    <input type=”text” [formControl]=”name” />

This will create a new FormControl object within the context of our form. We'll talk more about how that works below.

## FormGroup

Most forms have more than one field, so we need a way to manage multiple FormControls. If we wanted to check the validity of our form, it's cumbersome to iterate over an array of FormControls and check each FormControl for validity. FormGroups solve this issue by providing a wrapper interface around a collection of FormControls.

    let personInfo = new FormGroup({

    firstName: new FormControl(“Nate”),

    lastName: new FormControl(“Murray”),

    zip: new FormControl(“90210”)

    })

Here’s how you create a FormGroup:

FormGroup and FormControl have a common ancestor ([AbstractControl](https://angular.io/docs/ts/latest/api/forms/index/AbstractControl-class.html)). That means we can check the status or value of personInfo just as easily as a single FormControl:

    personInfo.value; // -> {
    // firstName: “Nate”,
    // lastName: “Murray”,
    // zip: “90210”
    // }
    // now we can query this control group for certain values, which have sensible
    // values depending on the children FormControl&apos;s values:
    personInfo.errors // -> StringMap<string, any> of errors
    personInfo.dirty // -> false
    personInfo.valid // -> true
    // etc.

Notice that when we tried to get the value from the FormGroup we received an object with key-value pairs. This is a really handy way to get the full set of values from our form without having to iterate over each FormControl individually.

## Our First Form

There are lots of moving pieces to create a form, and several important ones we haven’t touched on. Let’s jump in to a full example and I’ll explain each piece as we go along.

Here’s a screenshot of the very first form we’re going to build:

In our imaginary application we’re creating an e-commerce-type site where we’re listing products for sale. In this app we need to store the product’s name, so let’s create a simple form that takes the SKU as the only input field.

Let’s turn this form into a Component. If you recall, there are three parts to defining a component:

* Configure the @Component() decorator

* Create the template

* Implement custom functionality in the component definition class

Let’s take these in turn:

## Loading the FormsModule

In order to use the new forms library we need to first make sure we import the forms library in our NgModule.

There are two ways of using forms in Angular and we’ll talk about them both in this chapter: using FormsModule or using ReactiveFormsModule. Since we'll use both, we'll import them both into our module. To do this we do the following in our app.ts where we bootstrap the app:

    import {
    FormsModule,
    ReactiveFormsModule
    } from ‘[@angular/forms](http://twitter.com/angular/forms)’;
    // farther down…
    [@NgModule](http://twitter.com/NgModule)({
    declarations: [
    FormsDemoApp,
    DemoFormSkuComponent,
    // … our declarations here
    ],
    imports: [
    BrowserModule,
    FormsModule, // ← add this
    ReactiveFormsModule // ← and this
    ],
    bootstrap: [ FormsDemoApp ]
    })
    class FormsDemoAppModule {}

This ensures that we’re able to use the form directives in our views. At the risk of jumping ahead, the FormsModule gives us *template driven* directives such as:

* ngModel and

* NgForm

Whereas ReactiveFormsModule gives us directives like

* formControl and

* ngFormGroup

… and several more. We haven’t talked about how to use these directives or what they do, but we will shortly. For now, just know that by importing FormsModule and ReactiveFormsModule into our NgModule means we can *use any of the directives in that list* in our view template or *inject any of their respective providers* into our components.

## Simple Form: @Component Decorator

Now we can start creating our component:

    import { Component, OnInit } from ‘[@angular/core](http://twitter.com/angular/core)’;
    [@Component](http://twitter.com/Component)({
    selector: ‘app-demo-form’,
    templateUrl: ‘./demo-form.component.html’
    })
    class AppDemoComponent(){}

Here we define a selector of app-demo-form. If you recall, selector tells Angular what elements this component will bind to. In this case we can use this component by having a app-demo-form tag like so:

    <app-demo-form></app-demo-form>

## Simple Form: template

Let’s look at our template:

    <div class=”ui raised segment”>
    <h2 class=”ui header”>Demo Form: </h2>
    <form #f=”ngForm”
    (ngSubmit)=”onSubmit(f.value)”
    class=”ui form”>
    <div class=”field”>
    <label for=”Input”></label>
    <input type=”text”
    id=”Input”
    placeholder=””
    name=”” ngModel>
    </div>
    <button type=”submit” class=”ui button”>Submit</button>
    </form>
    </div>

### form & NgForm

Now things get interesting: because we imported FormsModule, that makes NgForm available to our view. Remember that whenever we make directives available to our view, they will get attached to any element that matches their selector.

NgForm does something handy but non-obvious: it includes the form tag in its selector (instead of requiring you to explicitly add ngForm as an attribute). What this means is that if you import FormsModule, NgForm will get *automatically*attached to any <form> tags you have in your view. This is really useful but potentially confusing because it happens behind the scenes.

There are two important pieces of functionality that NgForm gives us:

1. A FormGroup named ngForm

1. A (ngSubmit) output

You can see that we use both of these in the <form> tag in our view:

### <form #f=”ngForm” (ngSubmit)=”onSubmit(f.value)” />

First we have #f="ngForm". The #v=thing syntax says that we want to create a local variable for this view.

Here we’re creating an alias to ngForm, for this view, bound to the variable #f. Where did ngForm come from in the first place? It came from the NgFormdirective.

And what type of object is ngForm? It is a FormGroup. That means we can use f as a FormGroup in our view. And that's exactly what we do in the (ngSubmit) output.

Astute readers might notice that I just said above that NgForm is automatically attached to <form> tags (because of the default NgForm selector), which means we don't have to add an ngFormattribute to use NgForm. But here we're putting ngForm in an attribute (value) tag. Is this a typo?

No, it’s not a typo. If ngForm were the *key* of the attribute then we would be telling Angular that we want to use NgForm on this attribute. In this case, we're using ngForm as the *attribute* when we're assigning a *reference*. That is, we're saying the value of the evaluated expression ngForm should be assigned to a local template variable f.

ngForm is already on this element and you can think of it as if we are "exporting" this FormGroup so that we can reference it elsewhere in our view.

We bind to the ngSubmit action of our form by using the syntax: (ngSubmit)="onSubmit(f.value)".

* (ngSubmit) - comes from NgForm

* onSubmit() - will be implemented in our component definition class (below)

* f.value - f is the FormGroup that we specified above. And .value will return the key/value pairs of this FormGroup

Put it all together and that line says “when I submit the form, call onSubmit on my component instance, passing the value of the form as the arguments".

### input & NgModel

Our input tag has a few things we should touch on before we talk about NgModel:

    <form #f=”ngForm”
    (ngSubmit)=”onSubmit(f.value)”
    class=”ui form”>
    <div class=”field”>
    <label for=”Input”></label>
    <input type=”text”
    id=”Input”
    placeholder=”date input”
    name=”dataInput” ngModel>
    </div>

* class="ui form" and class="field" - these classes are totally optional. They come from the [CSS framework Semantic UI](http://semantic-ui.com/). I've added them in some of our examples just to give them a nice coat of CSS but they're not part of Angular.

* We set a placeholder of "data input Text", which is just a hint to the user for what this input should say when it is blank

The NgModel directive specifies a selector of ngModel. This means we can attach it to our input tag by adding this sort of attribute: ngModel="whatever". In this case, we specify ngModel with no attribute value.

There are a couple of different ways to specify ngModel in your templates and this is the first. When we use ngModel with no attribute value we are specifying:

1. a *one-way* data binding

1. we want to create a FormControl on this form with the name dataInput (because of the name attribute on the input tag)

NgModel creates a new FormControl that is automatically added to the parent FormGroup (in this case, on the form) and then binds a DOM element to that new FormControl. That is, it sets up an association between the input tag in our view and the FormControl and the association is matched by a name, in this case "dataInput".

NgModel vs. ngModel: what's the difference? Generally, when we use PascalCase, like NgModel, we're specifying the *class* and referring to the object as it's defined in code. The lower case (CamelCase), as in ngModel, comes from the selector of the directive and it's only used in the DOM / template.

It’s also worth pointing out that NgModel and FormControl are separate objects. NgModel is the *directive* that you use in your view, whereas FormControl is the object used for representing the data and validations in your form.

Sometimes we want to do *two-way* binding with ngModel like we used to do in Angular 1. We'll look at how to do that towards the end of this chapter.

## Simple Form: Component Definition Class

Now let’s look at our class definition:

    export class DemoFormSkuComponent implements OnInit {
    constructor() { }
    ngOnInit() {
    }
    onSubmit(form: any): void {
    console.log(‘you submitted value:’, form);
    }
    }

Here our class defines one function: onSubmit. This is the function that is called when the form is submitted. For now, we'll just console.log out the value that is passed in.

We just created basic form, In next part we will extend it to further.

## Angular Forms are Crucial & little Complex -2

![](https://cdn-images-1.medium.com/max/2560/1*LUOf6iFxnesal4Iq121WZQ.jpeg)

## Welcome to part-2
[Angular Forms are Crucial & little Complex -1
*Forms are probably the most crucial aspect of your web application. While we often get events from clicking on links or…*medium.com](https://medium.com/@tkssharma/angular-forms-are-crucial-forms-are-complex-22c025b239d0)

In order to use the new forms library we need to first make sure we import the forms library in our NgModule.

There are two ways of using forms in Angular and we’ll talk about them both in this chapter: using FormsModule or using ReactiveFormsModule. Since we'll use both, we'll import them both into our module. To do this we do the following in our app.ts where we bootstrap the app:

This ensures that we’re able to use the form directives in our views. At the risk of jumping ahead, the FormsModule gives us *template driven* directives such as:

* ngModel and

* NgForm

Whereas ReactiveFormsModule gives us directives like

* formControl and

* ngFormGroup

… and several more. We haven’t talked about how to use these directives or what they do, but we will shortly. For now, just know that by importing FormsModule and ReactiveFormsModule into our NgModule means we can *use any of the directives in that list* in our view template or *inject any of their respective providers* into our components. This is our form look like which we built in part-2 of this blog series. Lets see what else we have in angular Forms

## Using FormBuilder

Building our FormControls and FormGroups implicitly using ngForm and ngControl is convenient, but doesn't give us a lot of customization options. A more flexible and common way to configure forms is to use a FormBuilder.

FormBuilder is an aptly-named helper class that helps us build forms. As you recall, forms are made up of FormControls and FormGroups and the FormBuilderhelps us make them (you can think of it as a "factory" object).

Let’s add a FormBuilder to our previous example. Let's look at:

* how to use the FormBuilder in our component definition class

* how to use our custom FormGroup on a form in the view

## Reactive Forms with FormBuilder

For this component we’re going to be using the formGroup and formControldirectives which means we need to import the appropriate classes. We start by importing them like so:

    import { Component } from '@angular/core';

    import {

    FormBuilder,

    FormGroup ,

    Validators

    } from '@angular/forms';

## Using FormBuilder

We inject FormBuilder by creating an argument in the constructor of our component class:

    [@Component](http://twitter.com/Component)({
      selector: 'my-app',
      templateUrl: './app.component.html',
      styleUrls: [ './app.component.css' ]
    })
    export class AppComponent  {
      myForm: FormGroup;
      formInput:any;
      constructor(fb: FormBuilder) {
        this.myForm = fb.group({
          'formInput': ['', Validators.required]
        });
        this.formInput = this.myForm.controls['formInput'];
      }
      ngOnInit() {
      }
      onSubmit(value: string): void {
        console.log('you submitted value: ', value);
      }
    }

During injection an instance of FormBuilder will be created and we assign it to the fb variable (in the constructor).

There are two main functions we’ll use on FormBuilder:

* control - creates a new FormControl

* group - creates a new FormGroup

Notice that we’ve setup a new *instance variable* called myForm on this class. (We could have just as easily called it form, but I want to differentiate between our FormGroup and the form we had before.)

myForm is typed to be a FormGroup. We create a FormGroup by calling fb.group(). .group takes an object of key-value pairs that specify the FormControls in this group.

In this case, we’re setting up one control formInput, and the value is [""] - this says that the default value of this control is "". (You'll notice that is an array. That's because we'll be adding more configuration options there later.)

Now that we have myForm we need to use that in the view (i.e. we need to *bind* it to our form element).

## Using myForm in the view

We want to change our <form> to use myForm. If you recall, in the last section we said that ngForm is applied for us automatically when we use FormsModule. We also mentioned that ngForm creates its own FormGroup. Well, in this case, we don'twant to use an outside FormGroup. Instead we want to use our instance variable myForm, which we created with our FormBuilder. How can we do that?

Angular provides another directive that we use when we have an existing FormGroup: it's called formGroup and we use it like this:

    <form [formGroup]="myForm"
            (ngSubmit)="onSubmit(myForm.value)"

We also need to change onSubmit to use myForm instead of f, because now it is myForm that has our configuration and values.

There’s one last thing we need to do to make this work: bind our FormControl to the input tag. Remember that ngControl creates a new FormControl object, and attaches it to the parent FormGroup. But in this case, we used FormBuilder to create our own FormControls.

When we want to bind an existing FormControl to an input we use formControl:

    <form [formGroup]="myForm"
            (ngSubmit)="onSubmit(myForm.value)"
            class="ui form"
            [class.error]="!myForm.valid && myForm.touched">

        <div class="field"
            [class.error]="!formInput.valid && formInput.touched">
          <label for="formInput">formInput</label>
          <input type="text"
                 id="formInput"
                 placeholder="formInput"
                 [formControl]="formInput">
           <div *ngIf="!formInput.valid"
             class="ui error message">formInput is invalid</div>
           <div *ngIf="formInput.hasError('required')"
             class="ui error message">formInput is required</div>
        </div>

        <div *ngIf="!myForm.valid"
          class="ui error message">Form is invalid</div>

        <button type="submit" class="ui button">Submit</button>
      </form>

Here we’re telling Angular that we want to use myForm as the FormGroup for this form.

## Adding Validations

Our users aren’t always going to enter data in exactly the right format. If someone enters data in the wrong format, we want to give them feedback and not allow the form to be submitted. For this we use *validators*.

Validators are provided by the Validators module and the simplest validator is Validators.required which simply says that the designated field is required or else the FormControl will be considered invalid.

To use validators we need to do two things:

1. Assign a validator to the FormControl object

1. Check the status of the validator in the view and take action accordingly

To assign a validator to a FormControl object we simply pass it as the second argument to our FormControl constructor:

    constructor(fb: FormBuilder) {
    this.myForm = fb.group({
    'formInput': ['', Validators.required]
    });
    //  Important step
    this.formInput = this.myForm.controls['formInput'];
    }

Now we need to use our validation in the view. There are two ways we can access the validation value in the view:

1. We can explicitly assign the FormControl *formInput* to an instance variable of the class - which is more verbose, but gives us easy access to the FormControl in the view.

1. We can lookup the FormControl formInput from myForm in the view. This requires less work in the component definition class, but is slightly more verbose in the view.

To make this difference clearer, let’s look at this example both ways:

Notice that:

1. We setup formInput :AbstractControl at the top of the class and

1. We assign this.formInput after we've created myForm with the FormBuilder

This is great because it means we can reference sku anywhere in our component view. The downside is that by doing it this way, we'd have to setup an instance variable for every field in our form. For large forms, this can get pretty verbose.

Now that we have our FormInput being validated, I want to look at four different ways we can use it in our view:

1. Checking the validity of our whole form and displaying a message

1. Checking the validity of our individual field and displaying a message

1. Checking the validity of our individual field and coloring the field red if it’s invalid

1. Checking the validity of our individual field on a particular requirement and displaying a message

### Form message

We can check the validity of our whole form by looking at myForm.valid:

    <div *ngIf=”!myForm.valid”

Remember, myForm is a FormGroup and a FormGroup is valid if all of the children FormControls are also valid.

### Field message

We can also display a message for the specific field if that field’s FormControl is invalid:

    [formControl]=”formInput”>

    <div *ngIf=”!formInput.valid”

    class=”ui error message”>formInput is invalid</div>

    <div *ngIf=”formInput.hasError(‘required’)”

### Field coloring

I’m using the Semantic UI CSS Framework’s CSS class .error, which means if I add the class error to the <div class= "field"> it will show the input tag with a red border.

To do this, we can use the property syntax to set conditional classes:

    <div class=”field”
    [class.error]=”!formInput.valid && formInput.touched”>

Notice here that we have two conditions for setting the .error class: We're checking for !formInput.valid and formInput.touched. The idea here is that we only want to show the error state if the user has tried editing the form ("touched" it) and it's now invalid.

To try this out, enter some data into the input tag and then delete the contents of the field.

Putting all together

    <div class="ui raised segment">
      <h2 class="ui header">Demo Form: with validations</h2>
      <form [formGroup]="myForm"
            (ngSubmit)="onSubmit(myForm.value)"
            class="ui form"
            [class.error]="!myForm.valid && myForm.touched">

        <div class="field"
            [class.error]="!formInput.valid && formInput.touched">
          <label for="formInput">formInput</label>
          <input type="text"
                 id="formInput"
                 placeholder="formInput"
                 [formControl]="formInput">
           <div *ngIf="!formInput.valid"
             class="ui error message">formInput is invalid</div>
           <div *ngIf="formInput.hasError('required')"
             class="ui error message">formInput is required</div>
        </div>

        <div *ngIf="!myForm.valid"
          class="ui error message">Form is invalid</div>

        <button type="submit" class="ui button">Submit</button>
      </form>
    </div>

## Custom Validations

We often are going to want to write our own custom validations. Let’s take a look at how to do that.

To see how validators are implemented, let’s look at Validators.required from the Angular core source:

    export class Validators {

    static required(c: FormControl): StringMap<string, boolean> {
    return isBlank(c.value) || c.value == “” ? {“required”: true} : null;
    }

A validator:
- Takes a FormControl as its input and
- Returns a StringMap<string, boolean> where the key is "error code" and the value is true if it fails

### Writing the Validator

Let’s say we have specific requirements for our formInput. For example, say our formInput needs to begin with 123. We could write a validator like so:

    function formInputValidator(control: FormControl): { [s: string]: boolean } {

    if (!control.value.match(/123/)) {

    return {invalinput: true};

    }

    }

### Assigning the Validator to the FormControl

Now we need to add the validator to our FormControl. However, there's one small problem: we already have a validator on sku. How can we add multiple validators to a single field?

For that, we use Validators.compose:

    constructor(fb: FormBuilder) {
    this.myForm = fb.group({
    ‘formInput’: [‘’, Validators.compose([
    Validators.required, formInputValidator])]
    });

Now we can use our new validator in the view:

    Validators.compose wraps our two validators and lets us assign them both to the FormControl. The FormControl is not valid unless both validations are valid.

## Watching For Changes

So far we’ve only extracted the value from our form by calling onSubmit when the form is submitted. But often we want to watch for any value changes on a control.

Both FormGroup and FormControl have an EventEmitter that we can use to observe changes.

To watch for changes on a control we:

1. get access to the EventEmitter by calling control.valueChanges. Then we

1. add an *observer* using the .subscribe method

Here’s an example:

    export class AppComponent  {
      myForm: FormGroup;
      formInput: AbstractControl;
      constructor(fb: FormBuilder) {
        this.myForm = fb.group({
          'formInput': ['', Validators.required]
        });
        this.formInput = this.myForm.controls['formInput'];
          this.formInput.valueChanges.subscribe(
          (value: string) => {
            console.log('sku changed to:', value);
          }
        );

        this.myForm.valueChanges.subscribe(
          (form: any) => {
            console.log('form changed to:', form);
          }
        );
      }

Here we’re observing two separate events: changes on the formInput field and changes on the form as a whole.

The observable that we pass in is an object with a single key: next (there are other keys you can pass in, but we're not going to worry about those now). next is the function we want to call with the new value whenever the value changes.
