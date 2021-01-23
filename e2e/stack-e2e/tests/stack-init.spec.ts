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
import { apiFileTests, apiProjects } from './api-structure'
import { webFileTests, webProjects } from './web-structure'

describe('@nxpm/stack:init e2e', () => {
  const projectNameApi = 'api'
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
      '@ngneat/tailwind',
      '@schematics/angular',
      '@angular/cli',
    ]
    log('Install packages')
    await runCommandAsync(`yarn add ${packages.join(' ')}`)
    log('Generate project')
    await runNxCommandAsync(`generate @nxpm/stack:init ${projectNameWeb}`)
    log('Install packages second run')
    await runCommandAsync(`yarn`)
  })

  runFileTests(webFileTests(projectNameWeb))
  runFileTests(apiFileTests(projectNameApi))

  describe('workspace structure', () => {
    it('check if project names exist', (done) => {
      const nxJson = readJson('nx.json')
      const projectNames = Object.keys(nxJson.projects)

      expect(projectNames.sort()).toEqual([...apiProjects(projectNameApi), ...webProjects(projectNameWeb)].sort())
      done()
    })
  })

  describe('build the apps', () => {
    const apiSchemaFile = `api-schema.graphql`
    it(`should not have a ${apiSchemaFile}`, (done) => {
      expect(() => checkFilesExist(apiSchemaFile)).toThrow()
      done()
    })

    it('should run the setup', async (done) => {
      await runCommandAsync(`yarn setup`)
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
      await runNxCommandAsync(`build ${projectNameWeb}`)
      expect(() => checkFilesExist(`dist/apps/${projectNameWeb}/index.html`)).not.toThrow()
      done()
    })

    it(`should run all the unit tests`, async (done) => {
      await runNxCommandAsync(`yarn nx run-many --target test --all`)
      done()
    })
  })
})
