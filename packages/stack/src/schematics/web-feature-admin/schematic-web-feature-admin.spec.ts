import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebFeatureAdminSchematicSchema } from './schema'

describe('web-feature-admin schematic', () => {
  let appTree: Tree
  const options: WebFeatureAdminSchematicSchema = { appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/web-feature-admin', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('web-feature-admin', options, appTree).toPromise(),
    ).resolves.not.toThrowError()

    expect(appTree.read('libs/test/admin/feature/src/lib/test-admin-feature.module.ts').toString()).toMatchSnapshot()
  })
})
