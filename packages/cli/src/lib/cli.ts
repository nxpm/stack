import { basename } from 'path'
import * as yargs from 'yargs'
import { workspaceInit } from './commands/workspace-init'
import { workspaceLint } from './commands/workspace-lint'

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
    },
    async (args) => {
      await workspaceInit({ dryRun: !!args.dryRun, name: args.name })
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
