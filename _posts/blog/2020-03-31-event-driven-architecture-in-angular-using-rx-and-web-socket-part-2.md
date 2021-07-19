---
date: 2020-03-31
title: 'Event Driven UI Using angular NgRx and WebSocket Part-2'
template: post
featured: '../thumbnails/ngrx-banner.png'
thumbnail: '../thumbnails/angular.png'
slug: event-driven-ui-using-angular-ngrx-and-websocket-Part-2
categories:
  - Popular
  - Javascript
  - Angular
tags:
  - Javascript
  - Angular
---

## This is Part-2 of Event Driven UI Using angular NgRx and WebSocket

- This blogs has different parts (Let's understand one by one)
- You should be aware how NgRx works (can be done without NgRx)
- You should know how websocket two way communication works
- You should be aware how angular service use observables to communicate data in components

Let's first talk about basic about NgRx how it works (not in details)

@ngrx/store — a state management library for Angular applications inspired by Redux. By using this library we are able to keep the current state of the app in one place — the store. This enables us to use the store as *a single source of truth* meaning we can reliably access the state of the app from this one place rather than components of the app holding their own state and having to communicate and pass data between them. This reduces the communication between components which is particularly helpful to scale our app without adding more complexity.

The below diagram gives a basic overview of the way the store/NgRx works in our app internally

## How ngrx/store Fits Into Angular

Before we look at the Flux pattern and how store/ngrx brings it to life, it’s important to note that it is not always a necessary component in building an Angular application. Using ngrx/store brings more complexity, and that complexity should be merited by the requirements of the app being constructed.

In a simple component, the store and view relate to eachother as seen in Figure 1.

![Figure 1: Simple Component with State](https://cdn-images-1.medium.com/max/2000/1*NeFOfH1UrkvYzbI7nDgwnA.png)*Figure 1: Simple Component with State*

When this suffices, well enough. However, as you know, an angular UI is composed of a hierarchical tree of components. These components can interact via @Input and eventing.

In simple cases, these are enough to manage shared state.

As applications grow, however, the inter-component interactions can become seriously cumbersome. It can become very difficult to understand and think about how events are impacting the state and how the components react to these state changes. Add to this the possibility of external actors on the state (like long-polling or server-push) and you have a strong case for using a central store like ngrx/store. This is seen in Figure 2.

![Figure 2: Component Tree with State Interactions](https://cdn-images-1.medium.com/max/2000/1*RWXLmMfo6gWCaFBiyepB2g.png)*Figure 2: Component Tree with State Interactions*

The solution to this problem is to externalize the state to central place, like you see in Figure 3.

![Figure 3: Centralized State](https://cdn-images-1.medium.com/max/2000/1*6L4nDADaYo_TKJFK2ohenA.png)*Figure 3: Centralized State*

Just like we create a state in a component and then allow the various view elements to reflect that state, the idea here is to move the shared state out of the component itself, and into a central place where all those concerned can interact with it.

## Digging Into Centralized State

This is an easy idea to understand, and you may be wondering what ngrx/store does, since the above central-state idea could be implemented by injecting a global service into the components. This is a great question to ask. In fact, you may well be able to handle your applications needs by using shared services. Moreover, if you can identify subsets of components that use the same state, you can isolate your shared service state holders to smaller segments of the application.

Nevertheless, the idea of keeping all application state in a central place has a compelling simplicity to it. This is a central tenant of flux-thinking: one source of application truth. Therefore, let’s assume that you have determined your application merits a central state management solution. What does ngrx/store bring to the table beyond simply making a globally observable state?

## Actions and Discrete State Changes

One prominent feature of ngrx/store is that it allows you to modify the state only via actions. An action is a single type of state change that components can invoke. An action is executed, and the component does not know about how the state is affected. This is a key element in isolating the components from the store.

You can think of an Action as a Command (in the sense of the classic [Gang of Four Pattern](https://en.wikipedia.org/wiki/Command_pattern)).

```javascript
import { LoadSongsAction } from './actions/songs'; 
import { Store } from '@ngrx/store';

import * as fromRoot from './reducers'; // The convention is to define fromRoot as our namespace for reducers import { Observable } from 'rxjs/Observable';

@Component({ selector: 'app-root', 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush 
 }) 

export class SongComponent implements OnInit {
  public song$: Observable<song>;

  constructor(public store: Store<fromRoot.State>) {
      this.song$ = store.select(fromRoot.getSong);
  }
  
  ngOnInit() {
    this.store.dispatch(new LoadSongsAction());
  }
}
```

An action is a simple command. Here’s a look at the simple LoadSongAction.

```javascript
import { Number } from './../models/song';
import { Action } from '@ngrx/store';

export const LOADSONGS = '[Song] LoadAll';
export const SONGDELETED = '[Song] Delete';
export class LoadSongAction implements Action {
  type = LOAD_SONGS; 
}
export class DeleteSongAction implements Action { 
  type = SONG_DELETED;
}
```

The action internally defines a constant, which convention uses a bracketed type definition followed by the activity given: ‘[Song] LoadAll’. This action can then be used as a discrete action that can be sent to the store.

## Reducers

There are two places where actions come into the store: reducers and effects.

Reducers are pure functions, meaning they don’t produce side-effects (that is, they perform all their work internally to the function itself — another flux tenant). They are responsible for taking an action that is dispatched from the app, and applying it to the state. For example, in Listing 3, we define a reducer which applies the delete action.

```javascript
export function songReducer(state = initialState, action: Action) { 

  switch(action.type) { 
    case 'DELETE_SONG': const songId = action.payload; 
    return state.filter(id => id !== songId); 
    default: return state; 
  } 
}
```
The numberReducer has a typical reducer signature: it gets the initialState and the action in its arguments. In this case, it takes a payload from the action, which will contain the id of the item to be deleted. The reducer then uses the id to filter the removed element from the state.

## Effects

Effects, as the name implies, allow for side-effects. A common use for effects is to watch for actions which require loading data. Something like Listing 4 is typical.

```javascript
@Injectable() export class SongEffects { 
  @Effect() update$: Observable<Action> = this.action$
    .ofType(songs.LOAD_SONGS) 
    .switchMap(() => this.songService 
    .getRates() 
    .map(data => new SongsAreLoadedAction(data))
  );
  
  constructor( private currencyService: SongService, private action$: Actions ) {} 
}
```
This effect watches for the LOAD_SONGS Action, and uses a song service (injected into this class) to do that work.

## Alternatives to Using Effect’s for Service Interactions

Although this can be a useful pattern, using effects to interact with backend services can become unwieldy as applications become more complex. This is because it can become difficult to manage the subscription and unsubscription from multiple components in the effect — if the user navigates away from the view, a new event type (e.g., CANCEL_LOAD_SONGS) can become necessary.

Moreover, if interleaving of requests is important to dependant components, it can become difficult to track when the data is loaded.

In short, effects can become a source of sprawling logic dependency.

![*An effect can catch an action, do some processing and then emit another one or more actions.*](https://cdn-images-1.medium.com/max/2436/1*HLZRojLLZPGw7TP304-JJQ.png)An effect can catch an action, do some processing and then emit another one or more actions.

![*A facade is used to abstract away the store pattern from the components.*](https://cdn-images-1.medium.com/max/2466/1*rkfbyP4jD0zz6PS_yo45Uw.png)A facade is used to abstract away the store pattern from the components.

### Another Part is Event driven UI with NgRx, Here we will subscribe http and websocket events

# Ngrx + Effects with a simple REST Service

- This is basic example where we are getting data from http api calls 
- write NgRx store/action/reducers and effects to deal with async calls 
- HTTP calls will trigger action, effects and update store 
- Angular components will get data from updates store data

Now what if we add socket service in above picture, the change is now we have socket push events coming 
from which we can get data, we just need socket client to connect and receive and send events to socket api server

![image from https://github.com/avatsaev](../thumbnails/arch-ng-rx.png)

# Ngrx + Effects with a simple REST and Socket Service 

- NgRx will work same as it was just addition of another type of effects (web socket events)
- Now with HTTP events we will also capture web socket events and get updated data

![image from https://github.com/avatsaev](../thumbnails/arch-ng-rx2.png)

## let's understand it using Code 

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://i.imgur.com/R2NlsFd.png" /></a>
</p>

This application uses [@ngrx/store](https://github.com/ngrx/platform/blob/master/docs/store/README.md) to manage application state, and [@ngrx/effects](https://github.com/ngrx/platform/blob/master/docs/effects/README.md) to manange side effects (http+sockets), It also uses NgRx fractal state management to leverage lazy loading of reducers and effects

Repo Url 👍
- https://github.com/tkssharma/ng-dashboard-training/settings
- https://github.com/tkssharma/ng-dashboard-nestjs-apis 

![App POC ](../thumbnails/screen.png)

Node JS APIs
-------------

```bash
node_1   | socket initialized
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RoutesResolver] AppController {/}: +726ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RouterExplorer] Mapped {/, GET} route +6ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RoutesResolver] ContactsController {/contacts}: +3ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RouterExplorer] Mapped {/, GET} route +4ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RouterExplorer] Mapped {/:id, GET} route +3ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RouterExplorer] Mapped {/, POST} route +4ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RouterExplorer] Mapped {/bulk, POST} route +5ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RouterExplorer] Mapped {/:id, PATCH} route +4ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RouterExplorer] Mapped {/:id, DELETE} route +2ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [NestApplication] Nest application successfully started +7ms
node_1   | SERVER IS RUNNING ON PORT 3000
```
The Important Part of application is handling Socket and HTTP events from API server 

Conntact Actions
----------------

```javascript 
import {createAction, props} from '@ngrx/store';
import { Contact } from '@app/core/models';

export const loadAll = createAction(
  '[Contacts] Load all'
);

export const load = createAction(
  '[Contacts] Load',
  props<{id: number}>()
);

export const create = createAction(
  '[Contacts] Create',
  props<{contact: Contact}>()
);

export const update = createAction(
  '[Contacts] Update',
  props<{contact: Partial<Contact>}>()
);

export const remove = createAction(
  '[Contacts] Remove',
  props<{id: number}>()
);
```

Socket service to listen to socket events like update Delete 

```javascript
import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {environment} from '@app/env';
import {ContactsEventTypes} from '@app/core/models/contact.events';
import {Contact} from '@app/core/models';


@Injectable()
export class ContactsSocketService extends Socket {

  liveCreated$ = this.fromEvent<Contact>(ContactsEventTypes.LIVE_CREATED);
  liveUpdated$ = this.fromEvent<Contact>(ContactsEventTypes.LIVE_UPDATED);
  liveDeleted$ = this.fromEvent<number>(ContactsEventTypes.LIVE_DELETED);

  constructor() {
    super({
      url: `${environment.socketConfig.url}/contacts`,
      options: environment.socketConfig.opts
    });
  }
}

```
All such events will be passed to Effects to update state tree
```javascript

  @Effect()
  liveCreate$ = this.contactsSocket.liveCreated$.pipe(
    map(contact => createSuccess({contact}))
  );
  @Effect()
  liveUpdate$ = this.contactsSocket.liveUpdated$.pipe(
    map(contact => updateSuccess({contact}))
  );
  @Effect()
  liveDestroy$ = this.contactsSocket.liveDeleted$.pipe(
    map(id => removeSuccess({id}))
  );
  constructor(
    private actions$: Actions,
    private contactsService: ContactsService,
    private contactsSocket: ContactsSocketService
  ) {}

}
```
Finally our reducer which will get new state based on update & delete action and store gets updated from async socket events
```javascript
export const reducer = createReducer<State>(
  INIT_STATE,
  on(loadAllSuccess, (state, {contacts}) =>
    contactsAdapter.addAll(contacts, state)
  ),
  on(loadSuccess, (state, {contact}) =>
    contactsAdapter.upsertOne(contact, state)
  ),
  on(createSuccess, (state, {contact}) =>
    contactsAdapter.addOne(contact, state)
  ),
  on(updateSuccess, (state, {contact}) =>
    contactsAdapter.updateOne({id: contact.id, changes: contact}, state)
  ),
  on(removeSuccess, (state, {id}) =>
    contactsAdapter.removeOne(id, state)
  )
);
```

Now you can open application in two differant tabs and can play around, Action being performed on one tab will also impact UI being shown in another Tab, this is how socket events will be triggered

Example like
-  new contact added 
-  Api triggered in nestJS server 
-  Api will emit socket event for update 
-  Event will be handled by connected clients 
-  Clients will update their local store 
-  UI gets new data from socket event using NgRx Flow


There are a lot of things which you can understand one by one
- nestJS socket events 
- NgRx pattern (we can use simple Angular without NgRx)
- SocketIo client 
  
  