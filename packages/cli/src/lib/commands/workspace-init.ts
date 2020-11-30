import { bold, gray, inverse, magentaBright, white, cyanBright } from 'chalk'
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
  dryRun,
  name,
  cli,
  webStyleLibrary,
}: {
  dryRun: boolean
  name: string
  cli: string
  webStyleLibrary: WebStyleLibrary
}) {
  const target = join(process.cwd(), name)
  if (existsSync(target)) {
    throw new Error(`Path ${target} already exists`)
  }
  log('Creating Nx Workspace')
  const createCommand = `yarn create nx-workspace ${name} --cli=${cli} --nx-cloud=false --preset=empty ${
    dryRun ? ' --dry-run ' : ''
  }`
  runCommand(createCommand)

  log('Install dependencies')
  const deps = ['@nxpm/stack', '@nrwl/angular', '@nrwl/nest']
  if (webStyleLibrary === 'tailwind') {
    deps.push('@ngneat/tailwind')
  }

  const installDeps = `yarn add -D ${deps.join(' ')}`
  runCommand(installDeps, target)

  log('Initialize @nxpm/stack')
  const initProject = `yarn nx g @nxpm/stack:init web --library ${webStyleLibrary}`
  runCommand(initProject, target)

  info('Installation finished')
  info(`To get started         : ${gray(`cd ${name}`)}`)
  info(`Start database servers : ${gray(`docker-compose up`)}`)
  info(`Run setup              : ${gray(`yarn setup`)}`)
  info(`Start API              : ${gray(`yarn dev:api`)}`)
  info(`Start Web              : ${gray(`yarn dev:web`)}`)
}
