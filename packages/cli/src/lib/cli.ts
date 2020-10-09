import { basename } from 'path'
import * as yargs from 'yargs'
import { workspaceLint } from './commands/workspace-lint'

/**

Workspace
 - sort projects + paths
 - sync package.json dependencies
    - read deps/devDeps in main package.json
    - for any other package.json in any for the projects
       - check deps/devDeps
       - set all listed deps to the version in main package.json
 - sync package.json properties
    - allow syncing license, author, repo, etc
 - sync README
   - 1: sync main README to publishable packages
   - 2: sync package README's back to main README
 - check if packages are up to date
 - check if prisma migrations are up to date
 - verify .env and .env.example, check if all props are available.
 - sync between .env.example and .env
*/

export function cli(): string {
  return 'cli'
}
//
// const parsedArgs = yargsParser(process.argv, {
//   string: ['cli', 'preset', 'appName', 'style', 'defaultBase'],
//   alias: {
//     appName: 'app-name',
//     nxCloud: 'nx-cloud',
//     defaultBase: 'default-base',
//   },
//   boolean: ['help', 'interactive', 'nxCloud'],
// })
//
// console.log(parsedArgs)

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
