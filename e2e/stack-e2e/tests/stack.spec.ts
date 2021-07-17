import { runNxCommandAsync, uniq } from '@nrwl/nx-plugin/testing'
import { ensureNxProjects } from '../lib/testing'

describe('stack e2e', () => {
  it('should run stack initialization', async () => {
    ensureNxProjects([
      { package: '@nxpm/api', path: 'dist/packages/api' },
      { package: '@nxpm/common', path: 'dist/packages/common' },
      { package: '@nxpm/mobile', path: 'dist/packages/mobile' },
      { package: '@nxpm/stack', path: 'dist/packages/stack' },
      { package: '@nxpm/web', path: 'dist/packages/web' },
    ])

    const nameApi = uniq('api')
    const nameMobile = uniq('mobile')
    const nameStack = uniq('stack')
    const nameWeb = uniq('web')

    const params = [nameStack, '--api-name', nameApi, '--mobile-name', nameMobile, '--web-name', nameWeb].join(' ')
    const command = `generate @nxpm/stack:init ${params}`
    console.log(`command: nx ${command}`)
    await runNxCommandAsync(command)

    // const result = await runNxCommandAsync(`build ${plugin}`)
    // expect(result.stdout).toContain('Executor ran')
  }, 120000)

  // describe('--directory', () => {
  //   xit('should create src in the specified directory', async () => {
  //     const plugin = uniq('stack')
  //     ensureNxProject('@nxpm/stack', 'dist/packages/stack')
  //     await runNxCommandAsync(`generate @nxpm/stack:stack ${plugin} --directory subdir`)
  //     expect(() => checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)).not.toThrow()
  //   }, 120000)
  // })

  // describe('--tags', () => {
  //   xit('should add tags to nx.json', async () => {
  //     const plugin = uniq('stack')
  //     ensureNxProject('@nxpm/stack', 'dist/packages/stack')
  //     await runNxCommandAsync(`generate @nxpm/stack:stack ${plugin} --tags e2etag,e2ePackage`)
  //     const nxJson = readJson('nx.json')
  //     expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage'])
  //   }, 120000)
  // })
})
