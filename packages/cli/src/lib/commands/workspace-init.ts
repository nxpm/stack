import { bold, cyanBright, gray, inverse, magentaBright, white } from 'chalk'
import { execSync } from 'child_process'
import { existsSync } from 'fs-extra'
import { join } from 'path'
import { WebStyleLibrary } from '../interfaces'

function log(...msg) {
  console.log(magentaBright('>'), inverse(magentaBright(bold(` NXPM `))), ...msg)
}

function runCommand(command: string, cwd = process.cwd()) {
  log(inverse(gray(bold(` RUN `))), gray(command))
  execSync(command, { cwd, stdio: [] })
}

function info(message: string) {
  log(inverse(cyanBright(bold(` INFO `))), white(message))
}

export async function workspaceInit({
  allowExisting,
  dryRun,
  tag,
  name,
  cli,
  webStyleLibrary,
}: {
  allowExisting: boolean
  dryRun: boolean
  tag: string
  name: string
  cli: string
  webStyleLibrary: WebStyleLibrary
}) {
  const target = join(process.cwd(), name)
  if (existsSync(target) && !allowExisting) {
    throw new Error(`Path ${target} already exists`)
  }
  log('Creating Nx Workspace')
  const params = [
    `--cli=${cli}`,
    '--nx-cloud=false',
    '--preset=empty',
    '--skip-install',
    '--package-manager=yarn',
    '--default-base=main',
    dryRun ? ' --dry-run ' : '',
  ]
  const createCommand = `yarn create nx-workspace ${name} ${params.join(' ')}`
  runCommand(createCommand)

  log('Install dependencies')
  const deps = [
    `@nxpm/stack@${tag}`,
    '@nrwl/angular',
    '@nrwl/nest',
    '@nxtend/ionic-angular@beta',
    '@nxtend/capacitor@beta',
  ]

  const installDeps = `yarn add -D ${deps.join(' ')}`
  runCommand(installDeps, target)

  log('Initialize @nxpm/stack')
  const initProject = `yarn nx g @nxpm/stack:init`
  runCommand(initProject, target)

  log('Finalize package installation')
  runCommand('yarn', target)

  log('Formatting files')
  runCommand(`yarn nx format:write --all`, target)

  log('Rewrite git history')
  const rewriteGitHistory = `git checkout -B main && git add . && git commit -am "Initial commit of @nxpm/stack"`
  runCommand(rewriteGitHistory, target)

  info('Installation finished')
  info(`To get started         : ${gray(`cd ${name}`)}`)
  info(`Run setup              : ${gray(`yarn setup`)}`)
  info(`Start API              : ${gray(`yarn dev:api`)}`)
  info(`Start Mobile           : ${gray(`yarn dev:mobile`)}`)
  info(`Start Web              : ${gray(`yarn dev:web`)}`)
}
