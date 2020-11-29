import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebAuthFeatureSchematicSchema } from './schema'

describe('web-auth-feature schematic', () => {
  let appTree: Tree
  const options: WebAuthFeatureSchematicSchema = { name: 'test', appName: 'web' }

  const testRunner = new SchematicTestRunner('@nxpm/web-auth-feature', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('web-auth-feature', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
