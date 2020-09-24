import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { ApiLibSchematicSchema } from './schema'

describe('api-lib schematic', () => {
  let appTree: Tree
  const options: ApiLibSchematicSchema = { name: 'test', type: 'feature' }

  const testRunner = new SchematicTestRunner('@nxpm/api-lib', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync('api-lib', options, appTree).toPromise()).resolves.not.toThrowError()
  })
})
