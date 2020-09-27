# @nxpm/ci

Create CI configuration in a Nx Workspace!

## Install the dependencies:

```shell script
yarn add -D @nxpm/ci
```

## Create CI config

### GitHub

This will create GitHub Actions workflow called `build-test` that will run on pull requests and merges to the default branch specified in the `affected.defaultBase` property in `nx.json`.

```shell script
nx g @nxpm/ci:github
```

To select a different branch run:

```shell script
nx g @nxpm/ci:github --branch develop
```

To select a different name and branch run:

```shell script
nx g @nxpm/ci:github --branch stage --name deploy-stage
```

## TODO

- [ ] Add CircleCI
- [ ] Add Travis
- [ ] Add more flexibility of commands to run (currently: `build`, `format:check`, `test:ci`)

## License MIT
