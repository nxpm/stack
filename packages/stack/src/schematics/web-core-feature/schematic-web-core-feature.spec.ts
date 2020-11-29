import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebCoreFeatureSchematicSchema } from './schema'

describe('web-core-feature schematic', () => {
  let appTree: Tree
  const options: WebCoreFeatureSchematicSchema = { name: 'test', appName: 'web' }

  const testRunner = new SchematicTestRunner('@nxpm/web-core-feature', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('web-core-feature', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
