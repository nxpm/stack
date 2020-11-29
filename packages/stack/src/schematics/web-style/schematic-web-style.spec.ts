import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebStyleSchematicSchema } from './schema'

describe('web-style schematic', () => {
  let appTree: Tree
  const options: WebStyleSchematicSchema = { name: 'style', appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/web-style', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    const app = await testRunner.runSchematicAsync('web', { name: 'test' }, appTree).toPromise()
    await expect(testRunner.runSchematicAsync('web-style', options, app).toPromise()).resolves.not.toThrowError()
  })
})
