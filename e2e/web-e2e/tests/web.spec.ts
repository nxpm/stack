import { checkFilesExist, ensureNxProject, readJson, runNxCommandAsync, uniq } from '@nrwl/nx-plugin/testing'
describe('web e2e', () => {
  xit('should create web', async () => {
    const plugin = uniq('web')
    ensureNxProject('@nxpm/web', 'dist/packages/web')
    await runNxCommandAsync(`generate @nxpm/web:web ${plugin}`)

    const result = await runNxCommandAsync(`build ${plugin}`)
    expect(result.stdout).toContain('Executor ran')
  }, 120000)

  describe('--directory', () => {
    xit('should create src in the specified directory', async () => {
      const plugin = uniq('web')
      ensureNxProject('@nxpm/web', 'dist/packages/web')
      await runNxCommandAsync(`generate @nxpm/web:web ${plugin} --directory subdir`)
      expect(() => checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)).not.toThrow()
    }, 120000)
  })

  describe('--tags', () => {
    xit('should add tags to nx.json', async () => {
      const plugin = uniq('web')
      ensureNxProject('@nxpm/web', 'dist/packages/web')
      await runNxCommandAsync(`generate @nxpm/web:web ${plugin} --tags e2etag,e2ePackage`)
      const nxJson = readJson('nx.json')
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage'])
    }, 120000)
  })
})
