import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runCommandAsync,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing'
import { log } from 'nxpm'
import { runFileTests } from '../../e2e-file-utils'
import { apiFileTests, apiProjects } from './structure/api-structure'
import { initFileTests } from './structure/init-structure'
import { webFileTests, webProjects } from './structure/web-structure'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { mobileProjects } from './structure/mobile-structure'

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

describe('@nxpm/stack:init e2e', () => {
  const projectNameApi = 'api'
  const projectNameMobile = uniq('mobile')
  const projectNameWeb = uniq('web')

  beforeAll(async () => {
    // During this test we don't want to install the Husky hooks as it interferes with the hooks in this projects repo.
    process.env.HUSKY_SKIP_INSTALL = 'true'
    log('Create workspace')
    ensureNxProject('@nxpm/stack', 'dist/packages/stack')
    const packages = [
      '@nrwl/workspace',
      '@nrwl/cli',
      '@nrwl/tao',
      '@nrwl/angular',
      '@nrwl/nest',
      '@ngneat/tailwind@5.2.4',
      '@schematics/angular',
      '@angular/cli',
      '@nxtend/ionic-angular',
      '@nxtend/capacitor',
    ]
    log('Install packages')
    await runCommandAsync(`yarn add ${packages.join(' ')}`)
    log('Generate project')
    await runNxCommandAsync(`generate @nxpm/stack:init ${projectNameWeb} --mobile-name=${projectNameMobile}`)
    log('Install packages second run')
    await runCommandAsync(`yarn`)
    log('Test project created')
  })

  runFileTests(webFileTests(projectNameWeb))
  runFileTests(apiFileTests(projectNameApi))
  runFileTests(initFileTests())

  describe('workspace structure', () => {
    it('check if project names exist', (done) => {
      const nxJson = readJson('nx.json')
      const projectNames = Object.keys(nxJson.projects)

      expect(projectNames.sort()).toEqual(
        [...apiProjects(projectNameApi), ...mobileProjects(projectNameMobile), ...webProjects(projectNameWeb)].sort(),
      )
      done()
    })
  })

  describe('build the apps', () => {
    const apiSchemaFile = `api-schema.graphql`
    it(`should not have a ${apiSchemaFile}`, (done) => {
      expect(() => checkFilesExist(apiSchemaFile)).toThrow()
      done()
    })

    it('should run the db setup command', async (done) => {
      await runCommandAsync(`yarn prisma:db-push`)
      done()
    })

    it('should build the api', async (done) => {
      await runNxCommandAsync(`build ${projectNameApi}`)
      expect(() => checkFilesExist(`dist/apps/${projectNameApi}/main.js`)).not.toThrow()
      done()
    })

    it(`should run the ${projectNameApi}:e2e test`, async (done) => {
      await runNxCommandAsync(`e2e ${projectNameApi}-e2e`)
      expect(() => checkFilesExist(apiSchemaFile)).not.toThrow()
      done()
    })

    it('should build the web', async (done) => {
      writeFileSync(join('tmp/nx-e2e/proj', 'tailwind.config.js'), workingTailwindConfig())
      await runNxCommandAsync(`build ${projectNameWeb}`)
      expect(() => checkFilesExist(`dist/apps/${projectNameWeb}/index.html`)).not.toThrow()
      done()
    })

    it(`should run all the unit tests`, async (done) => {
      await runNxCommandAsync(`run-many --target test --all`)
      done()
    })

    it(`should add a api-crud and still build`, async (done) => {
      // Create the API crud
      await runNxCommandAsync(`generate @nxpm/stack:api-crud company --plural companies`)
      // Apply changes to Prisma
      await runCommandAsync(`yarn prisma:db-push`)
      // Build the API
      await runNxCommandAsync(`build ${projectNameWeb}`)
      // Run the e2e test to that api-schema.graphql gets re-generated (needed for running yarn build:sdk )
      await runNxCommandAsync(`e2e ${projectNameApi}-e2e`)
      // Create the Web crud
      await runNxCommandAsync(`generate @nxpm/stack:web-crud company --plural companies`)
      // Generate SDK
      await runCommandAsync(`yarn build:sdk`)
      // Build the Web
      await runNxCommandAsync(`build ${projectNameWeb}`)
      done()
    })
  })
})
