---
date: 2024-05-19
title: 'Is NestJS Already Implementing SOLID Principles?'
template: post
thumbnail: '../thumbnails/nodejs.png'
slug: nestjs-implementing-solid-principles
categories:
  - Javascript
  - nodejs
tags:
  - Javascript
  - nodejs
  - security
---


Is NestJS Already Implementing SOLID Principles?
------------------------------------------------

NestJS, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications, has gained significant popularity among developers due to its robust architecture and developer-friendly features. As software engineering principles continue to evolve, developers often assess how well frameworks adhere to these principles, including the SOLID principles of object-oriented design. In this article, we’ll explore whether NestJS aligns with SOLID principles and how it supports developers in writing clean, maintainable code.

SOLID is an acronym introduced by Robert C. Martin, also known as Uncle Bob, to represent five key principles of object-oriented programming and design. These principles aim to guide developers in writing code that is easy to understand, maintain, and extend:

1.  Single Responsibility Principle (SRP): A class should have only one reason to change.
2.  Open/Closed Principle (OCP): Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.
3.  Liskov Substitution Principle (LSP): Objects of a superclass should be replaceable with objects of its subclass without affecting the correctness of the program.
4.  Interface Segregation Principle (ISP): Clients should not be forced to depend on interfaces they do not use.
5.  Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.

but before that, I will provide an overview of the folder structure so you can understand what I said in the explanation below

```sh
project-root/  
│  
├── src/  
│   ├── app.module.ts  
│   ├── main.ts  
│   │  
│   ├── modules/  
│   │   ├── module-one/  
│   │   │   ├── module-one.module.ts  
│   │   │   ├── controllers/  
│   │   │   │   └── *.controller.ts  
│   │   │   ├── services/  
│   │   │   │   └── *.service.ts  
│   │   │   └── ...  
│   │   │  
│   │   ├── module-two/  
│   │   │   ├── module-two.module.ts  
│   │   │   ├── controllers/  
│   │   │   │   └── *.controller.ts  
│   │   │   ├── services/  
│   │   │   │   └── *.service.ts  
│   │   │   └── ...  
│   │   └── ...  
│   │  
│   └── common/  
│       ├── decorators/  
│       │   └── *.ts  
│       │  
│       ├── utils/  
│       │   └── *.ts  
│       └── ...  
│  
├── test/  
│   └── *.spec.ts  
│  
├── public/  
│   └── assets/  
│       └── ...  
│  
├── dist/            (Generated during build)  
│   └── ...  
│  
├── node_modules/    (Dependencies)  
│   └── ...  
│  
├── package.json  
├── tsconfig.json  
└── README.md

```

1. Single Responsibility Principle (SRP):
----------------------------------------

NestJS encourages developers to create modular applications where each module or class has a single responsibility. You can see this in the folder structure where NestJS provides or implements a “modules” folder for developers to create module(s) that suit their use. Modules encapsulate related functionality, such as controllers, services, and repositories (not in all case). This modular approach ensures that each component focuses on a specific task, adhering to the SRP.

![](https://miro.medium.com/v2/resize:fit:320/1*xcVupS6anQRPtgJKouYjrg.png)

Example of Module in NextJS (Auth Module)

2. Open/Closed Principle (OCP):
-------------------------------

NestJS supports the OCP by advocating for the use of dependency injection and decorators. With dependency injection, developers can inject dependencies into classes without modifying their code directly, thus extending behavior without altering existing code. Similarly, decorators enable the extension of classes and methods without modifying their source code, maintaining the principle of being closed for modification but open for extension.

Example of dependency injection
-------------------------------

```js
import { Injectable } from '@nestjs/common';  
  
@Injectable()  
export class UserProvider {  
  getUsers(): User[] {  
    // Retrieve users from database  
    // Example implementation  
    return [  
      {  
        id: '1',  
        name: 'John Doe',  
        email: 'john@example.com',  
      },  
      {  
        id: '2',  
        name: 'Jane Smith',  
        email: 'jane@example.com',  
      },  
    ];  
  }  
  
  // Other methods for retrieving users...  
}
```

// UserController.ts  

```js

import { Injectable } from '@nestjs/common';  
import { UserProvider } from './UserProvider';  
  
@Injectable()  
export class UserController {  
  constructor(private readonly userProvider: UserProvider) {}  
  
  getUsers(): User[] {  
    return this.userProvider.getUsers();  
  }  
  
  // Other user-related methods...  
}
```

Maybe with this example, you still don’t really see what OCP is like. I will give an example of using a “decorator” where we can add programs or logic to a controller without having to touch the code of the controller. So there will be no defects in the existing controller code.

This is the Decorator Code that we will implement:

```js
// This is RoleGuard Decorator for   
// checking the role before it execute the controller  
@Injectable()  
export class RoleGuard implements CanActivate {  
  constructor(    private userService: AuthService,  
    private readonly reflector: Reflector,  ) {}  
  
  async canActivate(context: ExecutionContext): Promise<boolean> {  
    const roles = this.reflector.get<string[]>('roles', context.getHandler());  
    if (!roles) {  
      return true; // No roles specified, allow access  
    }  
  
    const request = context.switchToHttp().getRequest();  
    const userId = request.user.sub;  
  
    // Fetch user roles from the database  
    const userRoles = await this.userService.user(userId);  
  
    // Check if user has any of the allowed roles  
    const hasPermission = roles.some((role) => userRoles?.role === role);  
    return hasPermission;  
  }  
}
```

This is the controller that does not yet implement decorators:

```js
@Controller('document')  
export class DocumentController {  
  constructor(private readonly documentService: DocumentService) {}  
  
  @Post('main')  
  @HttpCode(HttpStatus.CREATED)  
  createDocument(  
    @Body() dto: CreateDocumentDto,  
    @GetCurrentUserId() userId: string,  
  ): Promise<Document> {  
    return this.documentService.createDocument(dto, userId);  
  }  
}
```

This is a controller that already implements the decorator:

```js
@Controller('document')  
export class DocumentController {  
  constructor(private readonly documentService: DocumentService) {}  
  
  @Post('main')  
  @HttpCode(HttpStatus.CREATED)  
  @UseGuards(RoleGuard) // This is Decorator  
  @Roles('ADMIN') // This is Decorator  
  createDocument(  
    @Body() dto: CreateDocumentDto,  
    @GetCurrentUserId() userId: string,  
  ): Promise<Document> {  
    return this.documentService.createDocument(dto, userId);  
  }  
}
```

Previously, the endpoint implemented by the createDocument function in the controller file was public access, meaning anyone could access it without restrictions. By adding decorators, we provide RBAC (Role-Based Access Control) features to those endpoints without having to change existing code. This means we can change the status of an endpoint from public to private, limit access to only authorized users, and even limit access to only users with certain predefined roles. Using parameters in the decorator, we can define the roles that are allowed to access that endpoint, allowing us to control who can access it.

With this approach, we implement the “open/closed” principle in our system design. That is, we make it possible to close access to a particular endpoint (make it private) without having to change or modify existing code, just by adding the appropriate decorator. This makes testing easier to do because there is no need to change a lot of existing code, just managing decorators to control access to those endpoints.

3. Liskov Substitution Principle (LSP):
---------------------------------------

While NestJS does not enforce the LSP explicitly, it provides the tools and patterns for developers to adhere to it. By defining clear interfaces and contracts between modules and components, NestJS facilitates the interchangeability of implementations. This allows developers to substitute one module or component with another as long as they conform to the same interface, ensuring that the behavior of the program remains consistent. However, you can implement this in the following way.

```js
// document.interface.ts  
  
export interface Document {  
  transliterate(): string;  
}

// pegon.model.ts  
  
import { Document } from './document.interface';  
  
export class Pegon implements Document {  
  transliterate(): string {  
    // do the transliterate program for pegon docs  
  }  
}

// latin.model.ts  
  
import { Document } from './document.interface';  
  
export class Latin implements Document {  
  transliterate(): string {  
    // do the transliterate program for latin docs  
  }  
}

// transliterate.service.ts  
  
import { Injectable } from '@nestjs/common';  
import { Document } from './animal.interface';  
  
@Injectable()  
export class TransliterateService {  
  constructor(private readonly document: Document) {}  
  
  transliterate(): string {  
    return this.document.makeSound();  
  }  
}

// app.module.ts  
  
import { Module } from '@nestjs/common';  
import { TransliterateService } from './transliterate.service';  
import { Latin } from './latin.model';   
import { Pegon } from './pegon.model';   
import { Document } from './document.interface';  
  
@Module({  
  providers: [  
    // Provide Pegon class when TransliterateService is requested  
    { provide: Document, useClass: Pegon },  
    // Alternatively, provide Latin class  
    // { provide: Document, useClass: Latin},  
    TransliterateService,  
  ],  
  exports: [TransliterateService],  
})  
export class AppModule {}
```

4. Interface Segregation Principle (ISP):
----------------------------------------

NestJS encourages the use of interfaces to define contracts between different parts of the application. By defining granular interfaces tailored to specific use cases, NestJS ensures that clients only depend on the interfaces they need, avoiding unnecessary dependencies. This adherence to the ISP results in more modular and maintainable codebases.

Apart from that, we can also apply it to our program. Here the example of ISP with NestJS:

```js
// user.interface.ts  
  
export interface User {  
  id: string;  
  username: string;  
  email: string;  
}

// userRegistration.interface.ts  
  
export interface UserRegistration {  
  username: string;  
  email: string;  
  password: string;  
}

// userAuthentication.interface.ts  
  
export interface UserAuthentication {  
  email: string;  
  password: string;  
}

// user.service.ts  
  
import { Injectable } from '@nestjs/common';  
import { User } from './user.interface';  
import { UserRegistration } from './userRegistration.interface';  
import { UserAuthentication } from './userAuthentication.interface';  
  
@Injectable()  
export class UserService {  
  getAllUsers(): User[] {  
    // Implementation to fetch all users  
  }  
  
  getUserById(userId: string): User {  
    // Implementation to fetch user by ID  
  }  
  
  registerUser(userData: UserRegistration): User {  
    // Implementation to register a new user  
  }  
  
  authenticateUser(authData: UserAuthentication): boolean {  
    // Implementation to authenticate user  
  }  
}
```

In this example:

*   The `User` interface defines the structure of a user object.
*   The `UserRegistration` interface specifies the data required for user registration.
*   The `UserAuthentication` interface defines the data needed for user authentication.

By defining these granular interfaces, NestJS ensures that clients of the `UserService` only depend on the interfaces they need. For instance, a component responsible for user registration will only depend on the `UserRegistration` interface, while a component handling user authentication will only depend on the `UserAuthentication` interface. This adherence to the Interface Segregation Principle results in a more modular and maintainable codebase, where components are decoupled and dependencies are minimized.

5. Dependency Inversion Principle (DIP):
----------------------------------------

NestJS promotes the DIP through its reliance on dependency injection and inversion of control (IoC) containers. By decoupling high-level modules from their concrete implementations and depending on abstractions, NestJS allows for flexible and testable code. Developers can easily swap implementations and manage dependencies, facilitating the development of loosely coupled and highly cohesive systems.

Let’s illustrate the Dependency Inversion Principle (DIP) in a NestJS context with an example where we have a service that depends on a repository interface, and we inject different implementations of this repository interface using dependency injection.

1. Define the repository interface:

```js

// user.repository.interface.ts  
  
import { User } from './user.model';  
  
export interface UserRepository {  
  getUserById(userId: string): Promise<User>;  
}

2. Implement concrete repository classes:

// database.user.repository.ts  
  
import { Injectable } from '@nestjs/common';  
import { UserRepository } from './user.repository.interface';  
import { User } from './user.model';  
  
@Injectable()  
export class DatabaseUserRepository implements UserRepository {  
  async getUserById(userId: string): Promise<User> {  
    // Logic to retrieve user from a database  
  }  
}

// file.user.repository.ts  
  
import { Injectable } from '@nestjs/common';  
import { UserRepository } from './user.repository.interface';  
import { User } from './user.model';  
  
@Injectable()  
export class FileUserRepository implements UserRepository {  
  async getUserById(userId: string): Promise<User> {  
    // Logic to retrieve user from a file  
  }  
}

3. Create a service that depends on the repository interface:

// user.service.ts  
  
import { Injectable } from '@nestjs/common';  
import { UserRepository } from './user.repository.interface';  
import { User } from './user.model';  
  
@Injectable()  
export class UserService {  
  constructor(private readonly userRepository: UserRepository) {}  
  
  async getUserById(userId: string): Promise<User> {  
    return this.userRepository.getUserById(userId);  
  }  
}

4. Utilize the service and inject different repository implementations in a module:

// app.module.ts  
  
import { Module } from '@nestjs/common';  
import { UserService } from './user.service';  
import { DatabaseUserRepository } from './database.user.repository'; // Import the database repository  
// import { FileUserRepository } from './file.user.repository'; // Alternatively, import the file repository  
  
@Module({  
  providers: [  
    // Inject the DatabaseUserRepository  
    { provide: 'UserRepository', useClass: DatabaseUserRepository },  
    // Alternatively, inject the FileUserRepository  
    // { provide: 'UserRepository', useClass: FileUserRepository },  
    UserService,  
  ],  
})  
export class AppModule {}
```


In this example, the `UserService` depends on the `UserRepository` interface, which defines the contract for retrieving user data. Different implementations of this interface (`DatabaseUserRepository` and `FileUserRepository`) can be injected into the `UserService` via dependency injection, depending on the specific requirements or configurations of the application. This adherence to the Dependency Inversion Principle allows for flexible and testable code, as high-level modules (such as the `UserService`) depend on abstractions (interfaces) rather than concrete implementations.
