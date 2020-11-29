import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebAssetsSchematicSchema } from './schema'

describe('web-assets schematic', () => {
  let appTree: Tree
  const options: WebAssetsSchematicSchema = { name: 'assets', appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/web-assets', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    const app = await testRunner.runSchematicAsync('web', { name: 'test' }, appTree).toPromise()
    await expect(testRunner.runSchematicAsync('web-assets', options, app).toPromise()).resolves.not.toThrowError()
  })
})
