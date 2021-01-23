import { FileTests } from '../../../e2e-file-utils'

export function initFileTests(): FileTests {
  return {
    existing: [
      `tools/generators/api-feature/index.ts`,
      `tools/generators/prisma-seed/index.ts`,
      `tools/generators/web-feature/index.ts`,
      `tools/generators/workspace-setup/index.ts`,
    ],
    missing: [],
    contain: {
      [`README.md`]: [`This project was generated using [@nxpm/stack](https://github.com/nxpm/stack)`],
    },
  }
}
