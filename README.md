# @nxpm/stack

## Introduction

`@nxpm/stack` is a set of schematics that generates an opinionated full-stack application in a Nx Workspace based on the PANNG Stack (Prisma, Angular, Nest, Nx, GraphQL).

## Creating a new project

### Using @nxpm/cli

You can create a new workspace by installing the @nxpm/cli package globally.

Run the following command:

```shell script
yarn global add @nxpm/cli
```

After the installation, you should have the `nxpm-stack` command available.

Run the following command to create a project called 'sandbox':

```shell script
nxpm-stack init --name sandbox
cd sandbox
```

### Manual installation

Alternatively, you can create a project manually:

Create a new Nx Workspace and make sure to use the `empty` preset.

```shell script
yarn create nx-workspace sandbox --preset=empty --nx-cloud true --cli=angular
cd sandbox
```

Install the dependencies:

```shell script
yarn add -D @nxpm/stack @nrwl/angular @nrwl/nest
```

Initialize a new project (where web is the name of the Angular frontend):

```shell script
nx g @nxpm/stack:init web
```

## Running the project

Before you can run the stack, there are some things you need to do.

### Starting the Docker server

The stack is configured to connect to a Postgres server on `localhost:5432` with a database called `prisma`, username `prisma` and password `prisma`.

There is a `docker-compose.yml` in the project root which provides this.

To start the server, run the following command:

```shell script
docker-compose up
```

> Currently, the database connection string is defined in `libs/api/data-access-core/src/prisma/.env`. When [this issue](https://github.com/prisma/prisma/issues/3720) is closed it will be defined in `.env`.

### Seed the database

When starting with an empty database, you need to make sure the table structure gets created.

To do this, run the following command:

```shell script
yarn setup
```

### Start the API app

You can now start the API by running the following command:

```shell script
yarn dev:api
```

You should be able to navigate to [http://localhost:3000/graphql](http://localhost:3000/graphql) and see the GraphQL Playground.

### Generate the SDK

Once the API is up and running, we want to make sure we can generate the SDK that is being used by the frontend.

Run the following command to generate the SDK:

```shell script
yarn sdk:web
```

### Start the Web app

With this all done, you can now start the Web by running the following command:

```shell script
yarn dev:web
```

You should be able to navigate to [http://localhost:4200](http://localhost:4200) and see the Angular app.

You can now register a new user, the initial user will get the Web role.

## MIT Licensed by beeman 🐝
