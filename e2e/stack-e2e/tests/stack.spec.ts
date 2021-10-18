import { runCommandAsync, runNxCommandAsync, runPackageManagerInstall, uniq } from '@nrwl/nx-plugin/testing'
import { ensureNxProjects } from '../lib/testing'

describe('stack e2e', () => {
  const nameApi = uniq('api')
  const nameMobile = uniq('mobile')
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
    const params = ['--api-name', nameApi, '--mobile-name', nameMobile, '--web-name', nameWeb].join(' ')
    const command = `generate @nxpm/stack:init ${params}`
    console.log(`Generate project: nx ${command}`)
    await runNxCommandAsync(command)
    console.log('Install packages second run')
    await runPackageManagerInstall()
    console.log('Test project created')
  }, 600000)

  it('should push prisma schema', async () => {
    console.log('run prisma:db-push')
    const prismaResult = await runCommandAsync(`yarn prisma:db-push`)
    expect(prismaResult.stderr).toBe('')
    expect(prismaResult.stdout).toContain('Your database is now in sync with your schema.')
  }, 60000)

  it('should build api', async () => {
    console.log('Build API')
    const buildApiResult = await runCommandAsync(`yarn build:${nameApi}`)
    // Webpack 5
    expect(buildApiResult.stderr).toContain('Found an outdated version of webpack-merge')
    expect(buildApiResult.stdout).toContain('[entry]')
    expect(buildApiResult.stdout).toContain('[rendered]')
  }, 60000)

  it('should build web', async () => {
    console.log('Build Web')
    const buildWebResult = await runCommandAsync(`yarn build:${nameWeb}`)
    expect(buildWebResult.stdout).toContain('Build at:')
  }, 90000)

  it('should build mobile', async () => {
    console.log('Build Mobile')
    const buildMobileResult = await runCommandAsync(`yarn build:${nameMobile}`)
    expect(buildMobileResult.stdout).toContain('Build at:')
  }, 90000)
})
