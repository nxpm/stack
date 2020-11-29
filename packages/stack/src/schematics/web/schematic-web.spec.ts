import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebSchematicSchema } from './schema'

describe('web schematic', () => {
  let appTree: Tree
  const options: WebSchematicSchema = { name: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/web', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync('web', options, appTree).toPromise()).resolves.not.toThrowError()
  })
})
