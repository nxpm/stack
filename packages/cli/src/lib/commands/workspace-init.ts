import { bold, gray, inverse, magentaBright, white, cyanBright } from 'chalk'
import { execSync } from 'child_process'
import { existsSync } from 'fs-extra'
import { join } from 'path'

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

export async function workspaceInit({ dryRun, name }: { dryRun: boolean; name: string }) {
  const target = join(process.cwd(), name)
  if (existsSync(target)) {
    throw new Error(`Path ${target} already exists`)
  }
  log('Creating Nx Workspace')
  const createCommand = `yarn create nx-workspace ${name} --cli=nx --nx-cloud=false --preset=empty ${
    dryRun ? ' --dry-run ' : ''
  }`
  runCommand(createCommand)

  log('Install dependencies')
  const installDeps = `yarn add -D @nxpm/stack @nrwl/angular @nrwl/nest`
  runCommand(installDeps, target)

  log('Initialize @nxpm/stack')
  const initProject = `yarn nx g @nxpm/stack:init admin`
  runCommand(initProject, target)

  info('Installation finished')
  info(`To get started         : ${gray(`cd ${name}`)}`)
  info(`Start database servers : ${gray(`docker-compose up`)}`)
  info(`Run setup              : ${gray(`yarn setup`)}`)
  info(`Start API              : ${gray(`yarn dev:api`)}`)
  info(`Start Admin            : ${gray(`yarn dev:admin`)}`)
}
