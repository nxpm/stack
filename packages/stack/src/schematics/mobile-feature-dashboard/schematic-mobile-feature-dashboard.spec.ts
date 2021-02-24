import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { MobileFeatureDashboardSchematicSchema } from './schema'

describe('mobile-feature-dashboard schematic', () => {
  let appTree: Tree
  const options: MobileFeatureDashboardSchematicSchema = { appName: 'test' }

  const testRunner = new SchematicTestRunner(
    '@nxpm/mobile-feature-dashboard',
    join(__dirname, '../../../collection.json'),
  )

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('mobile-feature-dashboard', options, appTree).toPromise(),
    ).resolves.not.toThrowError()

    expect(
      appTree.read('libs/test/dashboard/feature/src/lib/test-dashboard-feature.module.ts').toString(),
    ).toMatchSnapshot()
  })
})
