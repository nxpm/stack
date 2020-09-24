import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { ApiSchematicSchema } from './schema'

describe('api schematic', () => {
  let appTree: Tree
  const options: ApiSchematicSchema = { name: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/api', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync('api', options, appTree).toPromise()).resolves.not.toThrowError()
  })
})
