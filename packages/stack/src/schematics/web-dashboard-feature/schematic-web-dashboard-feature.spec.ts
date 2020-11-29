import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebDashboardFeatureSchematicSchema } from './schema'

describe('web-dashboard-feature schematic', () => {
  let appTree: Tree
  const options: WebDashboardFeatureSchematicSchema = { name: 'test', appName: 'web' }

  const testRunner = new SchematicTestRunner('@nxpm/web-dashboard-feature', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('web-dashboard-feature', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
