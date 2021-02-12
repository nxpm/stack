import { basename } from 'path'
import * as yargs from 'yargs'
import { workspaceInit } from './commands/workspace-init'
import { workspaceLint } from './commands/workspace-lint'
import { WebStyleLibrary } from './interfaces'
import { workspaceDev } from './commands/workspace-dev'

yargs
  .command(
    'dev',
    'Run nxpm dev server',
    {
      port: {
        alias: 'p',
        type: 'number',
        demandOption: false,
        default: 7979,
      },
    },
    async (args) => {
      await workspaceDev({ port: args.port }).catch((e) => {
        console.log('Something went wrong :(', e)
      })
    },
  )
  .command(
    'init',
    'Initialize new nxpm workspace',
    {
      name: {
        alias: 'n',
        type: 'string',
        demandOption: true,
      },
      cli: {
        type: 'string',
        demandOption: false,
        default: 'nx',
      },
      webStyleLibrary: {
        type: 'string',
        demandOption: false,
        default: 'tailwind',
      },
    },
    async (args) => {
      await workspaceInit({
        dryRun: !!args.dryRun,
        name: args.name,
        cli: args.cli,
        webStyleLibrary: args.webStyleLibrary as WebStyleLibrary,
      })
    },
  )
  .command(
    'lint',
    'Run nxpm workspace linter',
    {
      skipPackageJson: {
        type: 'boolean',
      },
    },
    async (args) => {
      await workspaceLint({ dryRun: !!args.dryRun, skipPackageJson: args.skipPackageJson })
    },
  )
  .command(
    '$0',
    'Show usage',
    () => null,
    (args) => {
      console.log(basename(args['$0']))
      console.log(`See --help for usage.`)
      console.log(args)
    },
  ).argv
