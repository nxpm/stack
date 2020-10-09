# @nxpm/cli

## Installation

Install the CLI as a dev dependency in an existing Nx Workspace:

```shell script
yarn add -D @nxpm/cli
```

## Usage

Currently, you can only run the linter:

```shell script
yarn nxpm-stack lint
```

## More to come :)

- [x] sort projects + paths
- [ ] sync package.json dependencies
  - [ ] read deps/devDeps in main package.json
  - [ ] for any other package.json in any for the projects
    - [ ] check deps/devDeps
    - [ ] set all listed deps to the version in main package.json
- [ ] sync package.json properties (license, author, repo)
- [ ] sync README
  - [ ] 1: sync from the main README to publishable packages
  - [ ] 2: sync from the package README's back to main README
- [ ] validate .env and .env.example
  - [ ] check if all props are available on both side.
- [ ] sync between .env.example and .env
- [ ] check if packages are up to date
- [ ] check if prisma migrations are up to date

## MIT Licensed by beeman 🐝
