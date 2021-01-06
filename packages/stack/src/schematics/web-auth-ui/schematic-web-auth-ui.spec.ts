import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebAuthUiSchematicSchema } from './schema'

describe('web-auth-ui schematic', () => {
  let appTree: Tree
  const options: WebAuthUiSchematicSchema = { name: 'test', appName: 'web' }

  const testRunner = new SchematicTestRunner('@nxpm/web-auth-ui', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync('web-auth-ui', options, appTree).toPromise()).resolves.not.toThrowError()
  })
})
