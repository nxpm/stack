import { ensureNxProject, runNxCommandAsync } from '@nrwl/nx-plugin/testing'
import { runFileTests } from '../../e2e-file-utils'

describe('@nxpm/ci', () => {
  describe('github', () => {
    const workflowFile = '.github/workflows/build-test.yml'

    describe('github default branch', () => {
      beforeAll(async () => {
        ensureNxProject('@nxpm/ci', 'dist/packages/ci')
        await runNxCommandAsync(`generate @nxpm/ci:github`)
      })

      describe('file existence', () => {
        runFileTests({
          existing: [workflowFile],
          contain: {
            [workflowFile]: [
              `master`,
              `yarn install --frozen-lockfile`,
              `yarn build`,
              `yarn format:check`,
              `yarn test:ci`,
            ],
          },
        })
      })
    })

    describe('github custom branch', () => {
      beforeAll(async () => {
        ensureNxProject('@nxpm/ci', 'dist/packages/ci')
        await runNxCommandAsync(`generate @nxpm/ci:github --branch develop`)
      })

      describe('file contents', () => {
        runFileTests({
          existing: [workflowFile],
          contain: {
            [workflowFile]: [`develop`],
          },
        })
      })
    })

    describe('github custom workflow name', () => {
      beforeAll(async () => {
        ensureNxProject('@nxpm/ci', 'dist/packages/ci')
        await runNxCommandAsync(`generate @nxpm/ci:github --name build-deploy`)
      })

      const workflowFileCustom = '.github/workflows/build-deploy.yml'

      describe('file contents', () => {
        runFileTests({
          existing: [workflowFileCustom],
          contain: {
            [workflowFileCustom]: [`build-deploy`],
          },
        })
      })
    })

    describe('github custom workflow name and branch', () => {
      beforeAll(async () => {
        ensureNxProject('@nxpm/ci', 'dist/packages/ci')
        await runNxCommandAsync(`generate @nxpm/ci:github --branch develop --name build-deploy-develop`)
      })

      const workflowFileCustom = '.github/workflows/build-deploy-develop.yml'

      describe('file contents', () => {
        runFileTests({
          existing: [workflowFileCustom],
          contain: {
            [workflowFileCustom]: [`build-deploy`],
          },
        })
      })
    })
  })
})
