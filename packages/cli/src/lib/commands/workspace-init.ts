import { bold, gray, inverse, magentaBright, white, cyanBright } from 'chalk'
import { execSync } from 'child_process'
import { existsSync } from 'fs-extra'
import { join } from 'path'
import { WebStyleLibrary } from '../interfaces'
import { writeFileSync } from 'fs'

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

function workingTailwindConfig() {
  return `module.exports = {
  prefix: '',
  purge: {
    enabled: process.argv.join(' ').includes('production'),
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}`
}

export async function workspaceInit({
  allowExisting,
  dryRun,
  name,
  cli,
  webStyleLibrary,
}: {
  allowExisting: boolean
  dryRun: boolean
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
    dryRun ? ' --dry-run ' : '',
  ]
  const createCommand = `yarn create nx-workspace ${name} ${params.join(' ')}`
  runCommand(createCommand)

  log('Install dependencies')
  const deps = ['@nxpm/stack', '@nrwl/angular', '@nrwl/nest', '@nxtend/ionic-angular', '@nxtend/capacitor']
  if (webStyleLibrary === 'tailwind') {
    deps.push('@ngneat/tailwind@5.2.4')
  }

  const installDeps = `yarn add -D ${deps.join(' ')}`
  runCommand(installDeps, target)

  log('Initialize @nxpm/stack')
  const initProject = `yarn nx g @nxpm/stack:init web --web-style-library ${webStyleLibrary}`
  runCommand(initProject, target)

  log('Finalize package installation')
  runCommand('yarn', target)

  writeFileSync(join(target, 'tailwind.config.js'), workingTailwindConfig())

  log('Rewrite git history')
  const rewriteGitHistory = `git checkout -B main && git add . && git commit -am "Initial commit of @nxpm/stack"`
  runCommand(rewriteGitHistory, target)

  info('Installation finished')
  info(`To get started         : ${gray(`cd ${name}`)}`)
  info(`Run setup              : ${gray(`yarn setup`)}`)
  info(`Start API              : ${gray(`yarn dev:api`)}`)
  info(`Start Web              : ${gray(`yarn dev:web`)}`)
}
