import { checkFilesExist, ensureNxProject, readJson, runNxCommandAsync, uniq } from '@nrwl/nx-plugin/testing'
import { runFileTests } from '../../e2e-file-utils'
import { adminFileTests, adminProjects } from './admin-structure'
import { apiFileTests, apiProjects } from './api-structure'

describe('@nxpm/stack:init e2e', () => {
  const projectNameApi = 'api'
  const projectNameAdmin = uniq('admin')

  beforeAll(async () => {
    ensureNxProject('@nxpm/stack', 'dist/packages/stack')
    await runNxCommandAsync(`generate @nxpm/stack:init ${projectNameAdmin}`)
  })

  runFileTests(adminFileTests(projectNameAdmin))
  runFileTests(apiFileTests(projectNameApi))

  describe('workspace structure', () => {
    it('check if project names exist', (done) => {
      const nxJson = readJson('nx.json')
      const projectNames = Object.keys(nxJson.projects)

      expect(projectNames).toEqual([...apiProjects(projectNameApi), ...adminProjects(projectNameAdmin)])
      done()
    })
  })

  describe('build the apps', () => {
    it('should build the api', async (done) => {
      await runNxCommandAsync(`build ${projectNameApi}`)
      expect(() => checkFilesExist(`dist/apps/${projectNameApi}/main.js`)).not.toThrow()
      done()
    })

    it('should build the admin', async (done) => {
      await runNxCommandAsync(`build ${projectNameAdmin}`)
      expect(() => checkFilesExist(`dist/apps/${projectNameAdmin}/index.html`)).not.toThrow()
      done()
    })
  })
})
