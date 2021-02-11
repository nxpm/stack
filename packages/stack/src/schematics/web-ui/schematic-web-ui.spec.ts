import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebUiSchematicSchema } from './schema'

describe('web-ui schematic', () => {
  let appTree: Tree
  const options: WebUiSchematicSchema = { name: 'test', type: 'feature' }

  const testRunner = new SchematicTestRunner('@nxpm/web-ui', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync('web-ui', options, appTree).toPromise()).resolves.not.toThrowError()
  })
})
