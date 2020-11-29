import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebLibSchematicSchema } from './schema'

describe('web-lib schematic', () => {
  let appTree: Tree
  const options: WebLibSchematicSchema = { name: 'test', type: 'feature' }

  const testRunner = new SchematicTestRunner('@nxpm/web-lib', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync('web-lib', options, appTree).toPromise()).resolves.not.toThrowError()
  })
})
