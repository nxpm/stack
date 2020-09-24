# @nxpm/stack

Create a new Nx Workspace and make sure to use the `empty` preset!

```shell script
yarn create nx-workspace sandbox --preset=empty --nx-cloud true --cli=angular
cd sandbox
```

Install the dependencies:

```shell script
yarn add -D @nxpm/stack @nrwl/angular @nrwl/nest
```

Initialize a new project:

```shell script
nx g @nxpm/stack:init
```
