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

  it('check if project names exist', (done) => {
    const nxJson = readJson('nx.json')
    const projectNames = Object.keys(nxJson.projects)

    expect(projectNames).toEqual([...apiProjects(projectNameApi), ...adminProjects(projectNameAdmin)])
    done()
  })

  it('check if files exist', (done) => {
    const existingFiles = [...apiFilesExisting(projectNameApi), ...adminFilesExisting(projectNameAdmin)]

    for (let file of existingFiles) {
      expect(() => checkFilesExist(file)).not.toThrow()
    }
    done()
  })

  it('check if files are removed', (done) => {
    const removedFiles = [...apiFilesRemoved(projectNameApi), ...adminFilesRemoved(projectNameAdmin)]

    for (let file of removedFiles) {
      expect(() => checkFilesExist(file)).toThrow()
    }
    done()
  })

  it('check if files content exists', (done) => {
    const findStrings = { ...apiFindStrings(projectNameApi), ...adminFindStrings(projectNameAdmin) }

    for (let file of Object.keys(findStrings)) {
      const lines = findStrings[file]
      for (let line of lines) {
        const content = readFile(file)
        expect(content).toContain(line)
      }
    }
    done()
  })

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
