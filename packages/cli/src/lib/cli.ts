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
      name: {
        alias: 'n',
        type: 'string',
        demandOption: true,
      },
      webStyleLibrary: {
        type: 'string',
        demandOption: false,
        default: 'bootstrap',
      },
    },
    async (args) => {
      await workspaceInit({
        dryRun: !!args.dryRun,
        name: args.name,
        webStyleLibrary: args.webStyleLibrary as WebStyleLibrary,
      })
    },
  )
  .command(
    'lint',
    'Run nxpm workspace linter',
    () => null,
    async (args) => {
      await workspaceLint({ dryRun: !!args.dryRun })
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
