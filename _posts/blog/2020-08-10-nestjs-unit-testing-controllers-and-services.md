---
date: 2020-08-11
title: 'Testing in Nest JS unit and Integration Tests'
template: post
thumbnail: '../thumbnails/nestjs.png'
slug: unit-testing-nestjs-controllers-and-services
categories:
  - nestjs
  - nodejs
  - testing
  - controllers
  - services
  - e2e testing
tags:
  - javascript
  - nestjs
  - testing
---

![](https://i.ytimg.com/vi/ChdjnaRYOOI/maxresdefault.jpg)

# Unit Testing and Integration Testing Nestjs Application

## We will use Jest as Runner for Running tests for NestJS 
Lets first talk about Jest a little bit which is a popular test runner

Jest is a JavaScript test runner, that is, a JavaScript library for creating, running, and structuring tests.

Jest ships as an NPM package, you can install it in any JavaScript project. Jest is one of the most popular test runner these days, and the default choice for React projects.

#### Setting up the project
As with every JavaScript project you'll need an NPM environment (make sure to have Node installed on your system). Create a new folder and initialize the project with:

```
mkdir getting-started-with-jest && cd $_
npm init -y
```

Next up install Jest with:
```
npm i jest --save-dev
Let's also configure an NPM script for running our tests from the command line. Open up package.json and configure a script named test for running Jest:

  "scripts": {
    "test": "jest"
  },
```
Jest can be used with any javascript application React, angular, nestjs, Vue JS, express..

and you're good to go!

Before we begin, let's refresh the basic concepts of unit testing.

Unit testing focuses on writing tests for the smallest possible units. In most cases, they are functions defined in classes. MethodA in a class may be calling MethodB in another class. However, a unit test of MethodA is focused only on the logic of MethodA, not MethodB. Unit tests shouldn’t be dependent on the environment in which they are being run, and they are supposed to be fast. To write isolated unit tests, it’s common to mock all dependencies of a method/service. In the StudentService unit test, we’ll mock AppService by creating an ApiServiceMock class.
Test Doubles: Fakes, stubs, and mocks all belong to the category of test doubles. A test double is an object or system you use in a test instead of something else.

`Fakes`: an object with limited capabilities (for the purposes of testing), e.g. a fake web service. Fake has business behavior. You can drive a fake to behave in different ways by giving it different data. Fakes can be used when you can’t use a real implementation in your test.

`Mock`: an object on which you set expectations. A mock has expectations about the way it should be called, and a test should fail if it’s not called that way. Mocks are used to test interactions between objects.

`Stub`: an object that provides predefined answers to method calls. A stub has no logic and only returns what you tell it to return.
In case you are interested, here is a good discussion on fake/mock/stub.

`Spy`: Spy, spies on the caller. Often used to make sure a particular method has been called.

The job of a unit test is to verify an individual piece of code. A tested unit can be a module, a class, or a function. Each of our tests should be isolated and independent of each other. By writing unit tests, we can make sure that individual parts of our application work as expected.

Let’s write some tests for the  ApiService.
How a basic unit test looks like in nestjs 
```javascript

import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/common';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiService],
      imports: [HttpModule],
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it('ApiService - should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

Lets break this down first we are getting TestingModule by calling `Test.createTestingModule`, once we have module we can get services and controllers from module and test their methods with mock already done while creating test module 

```javascript  
beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiService],
      imports: [HttpModule],
    }).compile();
    // getting service modue from main module
    service = module.get<ApiService>(ApiService);
  });
  // now checking if service is available 
  it('ApiService - should be defined', () => {
    expect(service).toBeDefined();
  });
```
Lets say we are writing simple CRUD application and it has controllers and services
Here we will talk about different ways of testing controllers and services using Jest 
My controllers looks like this which is talking to service to fetch data from typeORM repositories 
Link : https://github.com/tkssharma/12-factor-app-microservices/tree/master/nestjs-cli-baseline

### Testing Controllers 

```javascript
import {
	Get,
	Post,
	Controller,
	HttpCode,
	HttpStatus,
	Body,
	Req,
	Param,
	ParamData,
	Patch,
	Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import NoteService  from '../services/note.service';
import { CreateNoteDto, GetNoteById } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/notes')
export class NoteController {
	constructor(private readonly noteService: NoteService) {}

	@Post()
  @ApiTags('notes')
  @ApiOperation({ description: 'Get All categories or sub-categories' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
	async saveNote(@Body() dto: CreateNoteDto) {
		return await this.noteService.saveNote(dto);
	}

  @ApiTags('notes')
  @Get('/')
  @ApiOperation({ description: 'Get All categories or sub-categories' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
	async getAllNote() {
		return await this.noteService.findAllNotes({});
	}

  @ApiTags('notes')
  @ApiOperation({ description: 'Get All categories or sub-categories' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
	@Get('/:id')
	async getNoteById(@Param() dto: GetNoteById) {
		return await this.noteService.findOneNote({
			where: {
				id: dto.id,
			},
		});
	}

  @ApiTags('notes')
  @ApiOperation({ description: 'Get All categories or sub-categories' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
	@Patch('/:id')
	async updateNoteById(
		@Param() param: GetNoteById,
		@Body() dto: UpdateNoteDto,
	) {
		return await this.noteService.updateNote(param.id, dto);
	}

  @ApiTags('notes')
  @ApiOperation({ description: 'delete notes' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
	@Delete('/:id')
	async deleteNoteById(@Param() param: GetNoteById,) {
		return await this.noteService.deleteNote(param.id);
	}
}

```

This controller is using notesService to fetch data from typeORM Repositories 
so we have controllers -> services -> Repositories -> Database 
So clearly here we have to mock service so we can test controllers independently 
Test will simply looks like 

```javascript
import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import NoteService from '../services/note.service';
import { CreateNoteDto, GetNoteById } from '../dto/create-note.dto';

describe("NoteController Unit Tests", () => {
  let noteController: NoteController;
  let spyService: NoteService
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: NoteService,
      useFactory: () => ({
        saveNote: jest.fn(() => []),
        findAllNotes: jest.fn(() => []),
        findOneNote: jest.fn(() => { }),
        updateNote: jest.fn(() => { }),
        deleteNote: jest.fn(() => { })
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [NoteService, ApiServiceProvider],
    }).compile();

    noteController = app.get<NoteController>(NoteController);
    spyService = app.get<NoteService>(NoteService);
  })

  it("calling saveNotes method", () => {
    const dto = new CreateNoteDto();
    expect(noteController.saveNote(dto)).not.toEqual(null);
  })

  it("calling saveNotes method", () => {
    const dto = new CreateNoteDto();
    noteController.saveNote(dto);
    expect(spyService.saveNote).toHaveBeenCalled();
    expect(spyService.saveNote).toHaveBeenCalledWith(dto);
  })

  it("calling getAllNote method", () => {
    noteController.getAllNote();
    expect(spyService.findAllNotes).toHaveBeenCalled();
  })

  it("calling find NoteById method", () => {
    const dto = new GetNoteById();
    dto.id = '3789';
    noteController.getNoteById(dto);
    expect(spyService.findOneNote).toHaveBeenCalled();
  })

});
```
Important part in this testing is mocking service methods either we can create mock using jest.mock methods
os simply create object 
```javascript
  const ApiServiceProvider = {
      provide: NoteService,
      useFactory: () => ({
        saveNote: jest.fn(() => []),
        findAllNotes: jest.fn(() => []),
        findOneNote: jest.fn(() => { }),
        updateNote: jest.fn(() => { }),
        deleteNote: jest.fn(() => { })
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [NoteService, ApiServiceProvider],
    }).compile();
```
ApiServiceProvider is a mock version of NoteService service and we are overriding the definition  of service with ApiServiceProvider where we are passing provide: serviceName and factory to override implementation 
### Testing services 
We can also use useClass and Provide mock class , lets see that in testing for services 
Here is our service class simple CRUD
```javascript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import Note from '../entity/note.entity';
import * as _ from 'lodash';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note-dto';

@Injectable()
export default class NoteService {
	constructor(
		@InjectRepository(Note) private readonly noteRepository: Repository<Note>,
	) {}
	async saveNote(dto: CreateNoteDto) {
		const note = new Note();
		note.text = dto.text;
    note.is_completed = dto.is_completed;
		return await this.noteRepository.save(note);
	}

	async findAllNotes(findAllOptions: FindManyOptions<Note>) {
		return await this.noteRepository.find(findAllOptions);
	}

	async findOneNote(findOneOptions: FindOneOptions<Note>) {
		return await this.noteRepository.findOne(findOneOptions);
	}

	async updateNote(noteId: string, dto: UpdateNoteDto) {
		const foundNote = await this.findOneNote({
			where: { id: noteId },
		});
		return await this.noteRepository.save(_.merge(foundNote, dto));
	}

	async deleteNote(noteId: string) {
		const foundNote = await this.findOneNote({
			where: { id: noteId },
		});
   if(foundNote) {
		await this.noteRepository.delete(foundNote);
		return foundNote;
   }
   return null;
	}
}
```
To test this we can use same way as we did in controller, Mock service methods 

```javascript
import { Test, TestingModule } from '@nestjs/testing';
import NoteService from './note.service';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note-dto';

class ApiServiceMock {
  saveNote(dto: any) {
     return [];
  }
  findOneNote() {
    return [];
  }
  deleteNote(id: string) {
    return null;
  }
  updateNote(id: string, dto: any) {
    return [];
  }
}
describe.only("NoteService", () => {

  let noteService: NoteService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: NoteService,
      useClass: ApiServiceMock,
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService, ApiServiceProvider
      ],
    }).compile();
    noteService = module.get<NoteService>(NoteService);
  })

  it('should call saveNote method with expected params', async () => {
    const createNoteSpy = jest.spyOn(noteService, 'saveNote');
    const dto = new CreateNoteDto();
    noteService.saveNote(dto);
    expect(createNoteSpy).toHaveBeenCalledWith(dto);
  });

  it('should call findOneNote method with expected param', async () => {
    const findOneNoteSpy = jest.spyOn(noteService, 'findOneNote');
    const findOneOptions: FindOneOptions = {};
    noteService.findOneNote(findOneOptions);
    expect(findOneNoteSpy).toHaveBeenCalledWith(findOneOptions);
  });

  it('should call updateNote method with expected params', async () => {
    const updateNoteSpy = jest.spyOn(noteService, 'updateNote');
    const noteId = 'noteId';
    const dto = new UpdateNoteDto();
    noteService.updateNote(noteId, dto);
    expect(updateNoteSpy).toHaveBeenCalledWith(noteId, dto);
  });

  it('should call deleteNote method with expected param', async () => {
    const deleteNoteSpy = jest.spyOn(noteService, 'deleteNote');
    const noteId = 'noteId';
    noteService.deleteNote(noteId);
    expect(deleteNoteSpy).toHaveBeenCalledWith(noteId);
  });
})
```
we create mockProvider class ApiServiceMock with all mock methods in it
```javascript
 const ApiServiceProvider = {
      provide: NoteService,
      useClass: ApiServiceMock,
    }
```    
### Mocking Database Connection and Repository 
We can mock Repository directly there is a way of doing it  

```javascript
import { getRepositoryToken } from '@nestjs/typeorm';

providers: [
  {
    provide: getRepositoryToken(User),
    useValue: {},
  }
],
```
```javascript
import {Test, TestingModule} from '@nestjs/testing';
import NoteService  from './note.service';
import * as sinon from 'sinon';
import { getRepositoryToken } from '@nestjs/typeorm';
import Note from '../entity/note.entity';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note-dto';

describe("NoteService", () => {
   let noteService: NoteService;
   let sandbox : sinon.SinonSandbox;
  beforeAll(async() => {
    sandbox = sinon.createSandbox();
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				NoteService,
				{
					provide: getRepositoryToken(Note),
					useValue: sinon.createStubInstance(Repository),
				},
			],
		}).compile();
		noteService = module.get<NoteService>(NoteService);
  })

  it('should call saveNote method with expected params', async () => {
		const createNoteSpy = jest.spyOn(noteService, 'saveNote');
		const dto = new CreateNoteDto();
		noteService.saveNote(dto);
		expect(createNoteSpy).toHaveBeenCalledWith(dto);
	});

  it('should call findOneNote method with expected param', async () => {
		const findOneNoteSpy = jest.spyOn(noteService, 'findOneNote');
		const findOneOptions: FindOneOptions = {};
		noteService.findOneNote(findOneOptions);
		expect(findOneNoteSpy).toHaveBeenCalledWith(findOneOptions);
	});
  
	it('should call updateNote method with expected params', async () => {
		const updateNoteSpy = jest.spyOn(noteService, 'updateNote');
		const noteId = 'noteId';
		const dto = new UpdateNoteDto();
		noteService.updateNote(noteId, dto);
		expect(updateNoteSpy).toHaveBeenCalledWith(noteId, dto);
	});

	it('should call deleteNote method with expected param', async () => {
		const deleteNoteSpy = jest.spyOn(noteService, 'deleteNote');
		const noteId = 'noteId';
		noteService.deleteNote(noteId);
		expect(deleteNoteSpy).toHaveBeenCalledWith(noteId);
	});

	afterAll(async () => {
		sandbox.restore();
	});
})
```

### Changing the mock per test
We do not always want to mock something the same way in each test. To change our implementation between tests, we can use  jest.Mock.
```javascript
src/users/tests/users.service.spec.ts
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
 
describe('The UsersService', () => {
  let usersService: UsersService;
  let findOne: jest.Mock;
  beforeEach(async () => {
    findOne = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne
          }
        }
      ],
    })
      .compile();
    usersService = await module.get(UsersService);
  })
  describe('when getting a user by email', () => {
    describe('and the user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      })
      it('should return the user', async () => {
        const fetchedUser = await usersService.getByEmail('test@test.com');
        expect(fetchedUser).toEqual(user);
      })
    })
    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      })
      it('should throw an error', async () => {
        await expect(usersService.getByEmail('test@test.com')).rejects.toThrow();
      })
    })
  })
});
```
### Testing external 3rd Party service 
Finally to Mock any external 3rd Party service we can use `overrideProvider` method from nestjs 
Here BlobUploadService is external service calling azure to upload a file to mock this we can override this will simple mock function 
`uploadToAzure` which will return upload file link 
```javascript
describe('testing', () => {
  let app: INestApplication;
  let testUtils: TestUtils;
  let moduleRef: TestingModule;
  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [TestUtils, DatabaseService],
    })
      .overrideProvider(AuthService)
      .useValue({
        init: (token: string) => testUtils.getRandomUser(token),
      })
      .overrideProvider(BlobUploadService)
      .useValue({ uploadToAzure: () => 'http://test__link_logo.com' })
      .compile();

    app = moduleRef.createNestApplication();
    testUtils = moduleRef.get<TestUtils>(TestUtils);
    await testUtils.reloadFixtures();
    await app.init();
  });
```

This is all about Unit Testing, i will add another Blog about E2E Testing with real database by hitting APIs and seeding data for all tables for testing
Here is the playlist if you want to see this in action 
https://www.youtube.com/watch?v=kROllv22WHw&list=PLIGDNOJWiL18srI6BmFLfwDPvorTmyQ_c
