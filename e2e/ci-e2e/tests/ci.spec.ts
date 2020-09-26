import { ensureNxProject, runNxCommandAsync } from '@nrwl/nx-plugin/testing'
import { runFileTests } from '../../e2e-file-utils'

describe('@nxpm/ci', () => {
  describe('github', () => {
    const githubWorkflowFile = '.github/workflows/build-test.yml'

    describe('github default branch', () => {
      beforeAll(async () => {
        ensureNxProject('@nxpm/ci', 'dist/packages/ci')
        await runNxCommandAsync(`generate @nxpm/ci:github`)
      })

      runFileTests({
        existing: [githubWorkflowFile],
        contain: {
          [githubWorkflowFile]: [`main`],
        },
      })
    })

    describe('github custom branch', () => {
      beforeAll(async () => {
        ensureNxProject('@nxpm/ci', 'dist/packages/ci')
        await runNxCommandAsync(`generate @nxpm/ci:github --main develop`)
      })

      runFileTests({
        existing: [githubWorkflowFile],
        contain: {
          [githubWorkflowFile]: [`develop`],
        },
      })
    })
  })
})
