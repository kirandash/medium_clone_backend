# Notes

## 1. What are the technologies we will use?

- NestJS, Why not entirely Express? - Because Express is very bare minimum
- Database - Postgresql (Open source relational DB)
- TypeORM - ORM for interacting with Database
- TypeScript

## 2. What we will be implementing?

- demo: https://demo.realworld.io/#/
- api spec: https://realworld-docs.netlify.app/docs/specs/backend-specs/introduction
- we will not build the frontend but we will use the existing frontend code from the source above
- we will only build the backend using NestJS

## 3. Prerequisites

- NodeJS
- Follow nest installation guide from: https://docs.nestjs.com/
- postman

## 4. Module, controllers and providers

- A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that Nest makes use of to organize the application structure.
- Controllers are responsible for handling incoming requests and returning responses to the client.

## 5. Build Tag Module

## 6. Create Tag Service

## 7. Configuring absolute path and the start script

- use module-alias package for supporting absolute path for the JS files
- configure paths in tsconfig.json file for supporting absolute path for the ts files
- `ts-node`: ts-node is a TypeScript execution engine and REPL for Node.js. And used for dev mode
- `tsconfig-paths`: Use this to load modules whose location is specified in the paths section of tsconfig.json
- use nodemon package for using watch mode while starting server in dev
