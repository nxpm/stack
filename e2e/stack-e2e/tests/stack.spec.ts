import { runCommandAsync, runNxCommandAsync, runPackageManagerInstall, uniq } from '@nrwl/nx-plugin/testing'
import { log } from 'nxpm'
import { ensureNxProjects } from '../lib/testing'

describe('stack e2e', () => {
  const nameApi = uniq('api')
  const nameMobile = uniq('mobile')
  const nameWeb = uniq('web')
  const packageManager = 'pnpm'

  async function addCrud(model: string, plural: string) {
    log(`Create CRUD for ${model}/${plural}`)
    // Create the API crud
    await runNxCommandAsync(`generate @nxpm/api:api-crud ${model} --plural ${plural}`)
    // Apply changes to Prisma
    await runCommandAsync(`yarn prisma:db-push`)
    // Build the API
    await runNxCommandAsync(`build ${nameWeb}`)
    // Run the e2e test to that api-schema.graphql gets re-generated (needed for running yarn build:sdk )
    await runNxCommandAsync(`e2e ${nameApi}-e2e`)
    // Create the Web crud
    // await runNxCommandAsync(`generate @nxpm/web:web-crud ${model} --plural ${plural}`)
    // Generate SDK
    // await runCommandAsync(`yarn build:sdk`)
    // Build the Web
    // await runNxCommandAsync(`build ${nameWeb}`)
  }

  beforeAll(async () => {
    process.env.HUSKY_SKIP_INSTALL = 'true'
    console.log('Create workspace')
    ensureNxProjects(
      [
        { package: '@nxpm/api', path: 'dist/packages/api' },
        { package: '@nxpm/common', path: 'dist/packages/common' },
        { package: '@nxpm/mobile', path: 'dist/packages/mobile' },
        { package: '@nxpm/stack', path: 'dist/packages/stack' },
        { package: '@nxpm/web', path: 'dist/packages/web' },
      ],
      packageManager,
    )
    const params = ['--api-name', nameApi, '--mobile-name', nameMobile, '--web-name', nameWeb].join(' ')
    const command = `generate @nxpm/stack:init ${params}`
    console.log(`Generate project: nx ${command}`)
    await runNxCommandAsync(command)
    console.log('Install packages second run')
    await runPackageManagerInstall()
    console.log('Test project created')
  }, 3600000)

  it('should push prisma schema', async () => {
    console.log('run prisma:db-push')
    const prismaResult = await runCommandAsync(`yarn prisma:db-push`)
    expect(prismaResult.stderr).toBe('')
    expect(prismaResult.stdout).toContain('Your database is now in sync with your schema.')
  }, 900000)

  it('should build api', async () => {
    console.log('Build API')
    const buildApiResult = await runCommandAsync(`yarn build:${nameApi}`)
    expect(buildApiResult.stderr).toContain('')
    expect(buildApiResult.stdout).toContain('[entry]')
    expect(buildApiResult.stdout).toContain('[rendered]')
  }, 900000)

  it('should build web', async () => {
    console.log('Build Web')
    const buildWebResult = await runCommandAsync(`yarn build:${nameWeb}`)
    expect(buildWebResult.stdout).toContain('Build at:')
  }, 900000)

  it('should build mobile', async () => {
    console.log('Build Mobile')
    const buildMobileResult = await runCommandAsync(`yarn build:${nameMobile}`)
    expect(buildMobileResult.stdout).toContain('Build at:')
  }, 900000)

  it('should be true', () => {
    console.log('hja')
  })
  it(`should add a api-crud and still build`, async (done) => {
    await addCrud('company', 'companies')
    done()
  })

  it(`should add a api-crud dashed name and still build`, async (done) => {
    await addCrud('company-address', 'company-addresses')
    done()
  })
})
