import { basename } from 'path'
import * as yargs from 'yargs'
import { workspaceLint } from './commands/workspace-lint'

yargs
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
