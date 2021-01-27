import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebLayoutSchematicSchema } from './schema'

describe('web-layout schematic', () => {
  let appTree: Tree
  const options: WebLayoutSchematicSchema = { name: 'layout', appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/web-layout', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync('web-layout', options, appTree).toPromise()).resolves.not.toThrowError()
  })
})
