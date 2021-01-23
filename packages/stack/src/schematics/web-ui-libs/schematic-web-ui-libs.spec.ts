import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebUiLibsSchematicSchema } from './schema'

describe('web-ui-libs schematic', () => {
  let appTree: Tree
  const options: WebUiLibsSchematicSchema = { name: 'test', appName: 'web' }

  const testRunner = new SchematicTestRunner('@nxpm/web-ui-libs', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync('web-ui-libs', options, appTree).toPromise()).resolves.not.toThrowError()
  })
})
