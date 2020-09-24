import { checkFilesExist, ensureNxProject, readFile, readJson, runNxCommandAsync, uniq } from '@nrwl/nx-plugin/testing'
import { adminFilesExisting, adminFilesRemoved, adminFindStrings, adminProjects } from './admin-structure'
import { apiFilesExisting, apiFilesRemoved, apiFindStrings, apiProjects } from './api-structure'

describe('@nxpm/stack:init e2e', () => {
  const projectNameApi = 'api'
  const projectNameAdmin = uniq('admin')

  beforeAll(async () => {
    ensureNxProject('@nxpm/stack', 'dist/packages/stack')
    await runNxCommandAsync(`generate @nxpm/stack:init ${projectNameAdmin}`)
  })

  describe('workspace structure', () => {
    it('check if project names exist', (done) => {
      const nxJson = readJson('nx.json')
      const projectNames = Object.keys(nxJson.projects)

      expect(projectNames).toEqual([...apiProjects(projectNameApi), ...adminProjects(projectNameAdmin)])
      done()
    })
  })

  describe('check file existence', () => {
    const existingFiles = [...apiFilesExisting(projectNameApi), ...adminFilesExisting(projectNameAdmin)]

    for (let file of existingFiles) {
      it(`file: ${file}`, (done) => {
        expect(() => checkFilesExist(file)).not.toThrow()
        done()
      })
    }
  })

  describe('check file contents', () => {
    const findStrings = { ...apiFindStrings(projectNameApi), ...adminFindStrings(projectNameAdmin) }

    for (let file of Object.keys(findStrings)) {
      it(`file: ${file}`, (done) => {
        const lines = findStrings[file]
        for (let line of lines) {
          const content = readFile(file)
          expect(content).toContain(line)
        }
        done()
      })
    }
  })

  describe('check file removal', () => {
    const removedFiles = [...apiFilesRemoved(projectNameApi), ...adminFilesRemoved(projectNameAdmin)]
    for (let file of removedFiles) {
      it(`file: ${file}`, (done) => {
        expect(() => checkFilesExist(file)).toThrow()
        done()
      })
    }
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
