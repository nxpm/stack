import { basename } from 'path'
import * as yargs from 'yargs'
import { workspaceLint } from './commands/workspace-lint'

yargs
  .command(
    'lint',
    'Run nxpm workspace linter',
    () => null,
    () => workspaceLint(),
  )
  .command(
    '$0',
    'Show usage',
    () => null,
    (args) => {
      console.log(basename(args['$0']))
      console.log(`See --help for usage.`)
    },
  ).argv
