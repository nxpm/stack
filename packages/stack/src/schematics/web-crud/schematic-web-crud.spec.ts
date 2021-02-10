import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { ApiCrudSchematicSchema } from './schema'

describe('api-crud schematic', () => {
  let appTree: Tree
  const options: ApiCrudSchematicSchema = {
    name: 'test',
    model: 'Company',
    plural: 'Companies',
    nameField: 'name',
  }

  const testRunner = new SchematicTestRunner('@nxpm/api-crud', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync('api-crud', options, appTree).toPromise()).resolves.not.toThrowError()
  })
})
