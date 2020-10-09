# @nxpm/stack

## Introduction

`@nxpm/stack` is a set of schematics that generates an opinionated full-stack application in a Nx Workspace based on the PANNG Stack (Prisma, Angular, Nest, Nx, GraphQL).

## Getting started

Create a new Nx Workspace and make sure to use the `empty` preset!

```shell script
yarn create nx-workspace sandbox --preset=empty --nx-cloud true --cli=angular
cd sandbox
```

Install the dependencies:

```shell script
yarn add -D @nxpm/stack @nrwl/angular @nrwl/nest
```

Initialize a new project (where admin is the name of the Angular frontend):

```shell script
nx g @nxpm/stack:init admin
```

## MIT Licensed by beeman 🐝
