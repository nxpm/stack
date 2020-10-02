import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { ApiE2eSchematicSchema } from './schema'

describe('api-e2e schematic', () => {
  let appTree: Tree
  const options: ApiE2eSchematicSchema = { name: 'e2e', appName: 'api' }

  const testRunner = new SchematicTestRunner('@nxpm/api-e2e', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync('api-e2e', options, appTree).toPromise()).resolves.not.toThrowError()
  })
})
