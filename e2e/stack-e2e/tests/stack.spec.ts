import { runCommandAsync, runNxCommandAsync, runPackageManagerInstall, uniq } from '@nrwl/nx-plugin/testing'
import { ensureNxProjects } from '../lib/testing'

describe('stack e2e', () => {
  const nameApi = uniq('api')
  const nameMobile = uniq('mobile')
  const nameStack = uniq('stack')
  const nameWeb = uniq('web')

  beforeAll(async () => {
    process.env.HUSKY_SKIP_INSTALL = 'true'
    console.log('Create workspace')
    ensureNxProjects([
      { package: '@nxpm/api', path: 'dist/packages/api' },
      { package: '@nxpm/common', path: 'dist/packages/common' },
      { package: '@nxpm/mobile', path: 'dist/packages/mobile' },
      { package: '@nxpm/stack', path: 'dist/packages/stack' },
      { package: '@nxpm/web', path: 'dist/packages/web' },
    ])
    const params = [nameStack, '--api-name', nameApi, '--mobile-name', nameMobile, '--web-name', nameWeb].join(' ')
    const command = `generate @nxpm/stack:init ${params}`
    console.log(`Generate project: nx ${command}`)
    await runNxCommandAsync(command)
    console.log('Install packages second run')
    await runPackageManagerInstall()
    console.log('Test project created')
  }, 120000)

  it('should build the stack', async () => {
    const prismaResult = await runCommandAsync(`yarn prisma:db-push`)
    const buildApiResult = await runCommandAsync(`yarn build:${nameApi}`)
    console.log({ prismaResult, buildApiResult })
    // expect(result.stdout).toContain('Executor ran')
  }, 120000)
})
