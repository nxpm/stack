import { basename } from 'path'
import * as yargs from 'yargs'
import { workspaceInit } from './commands/workspace-init'
import { workspaceLint } from './commands/workspace-lint'
import { WebStyleLibrary } from './interfaces'

yargs
  .command(
    'init',
    'Initialize new nxpm workspace',
    {
      allowExisting: {
        type: 'boolean',
        demandOption: false,
      },
      tag: {
        type: 'string',
        demandOption: false,
        default: 'latest',
      },
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
      skipApi: {
        type: 'boolean',
        demandOption: false,
      },
      skipMobile: {
        type: 'boolean',
        demandOption: false,
      },
      skipWeb: {
        type: 'boolean',
        demandOption: false,
      },
      webStyleLibrary: {
        type: 'string',
        demandOption: false,
        default: 'tailwind',
      },
    },
    async (args) => {
      await workspaceInit({
        allowExisting: !!args.allowExisting,
        dryRun: !!args.dryRun,
        tag: args.tag,
        name: args.name,
        cli: args.cli,
        skipApi: !!args.skipApi,
        skipMobile: !!args.skipMobile,
        skipWeb: !!args.skipWeb,
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
