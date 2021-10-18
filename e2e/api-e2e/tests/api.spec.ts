import { checkFilesExist, ensureNxProject, readJson, runNxCommandAsync, uniq } from '@nrwl/nx-plugin/testing'
describe('api e2e', () => {
  xit('should create api', async () => {
    const plugin = uniq('api')
    ensureNxProject('@nxpm/api', 'dist/packages/api')
    await runNxCommandAsync(`generate @nxpm/api:api ${plugin}`)

    const result = await runNxCommandAsync(`build ${plugin}`)
    expect(result.stdout).toContain('Executor ran')
  }, 120000)

  describe('--directory', () => {
    xit('should create src in the specified directory', async () => {
      const plugin = uniq('api')
      ensureNxProject('@nxpm/api', 'dist/packages/api')
      await runNxCommandAsync(`generate @nxpm/api:api ${plugin} --directory subdir`)
      expect(() => checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)).not.toThrow()
    }, 120000)
  })

  describe('--tags', () => {
    xit('should add tags to nx.json', async () => {
      const plugin = uniq('api')
      ensureNxProject('@nxpm/api', 'dist/packages/api')
      await runNxCommandAsync(`generate @nxpm/api:api ${plugin} --tags e2etag,e2ePackage`)
      const nxJson = readJson('nx.json')
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage'])
    }, 120000)
  })
})
