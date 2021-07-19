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
  }, 240000)

  it('should push prisma schema', async () => {
    console.log('run prisma:db-push')
    const prismaResult = await runCommandAsync(`yarn prisma:db-push`)
    expect(prismaResult.stderr).toBe('')
    expect(prismaResult.stdout).toContain('Your database is now in sync with your schema.')
  }, 30000)

  it('should build api', async () => {
    console.log('Build API')
    const buildApiResult = await runCommandAsync(`yarn build:${nameApi}`)
    expect(buildApiResult.stderr).toBe('')
    expect(buildApiResult.stdout).toContain('[entry]')
    expect(buildApiResult.stdout).toContain('[rendered]')
  }, 30000)

  it('should build web', async () => {
    console.log('Build Web')
    const buildWebResult = await runCommandAsync(`yarn build:${nameWeb}`)
    expect(buildWebResult.stdout).toContain('Build at:')
  }, 90000)
})
