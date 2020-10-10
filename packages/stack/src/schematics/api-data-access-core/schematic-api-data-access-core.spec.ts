import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { ApiDataAccessCoreSchematicSchema } from './schema'

describe('api-data-access-core schematic', () => {
  let appTree: Tree
  const options: ApiDataAccessCoreSchematicSchema = { name: 'test', appName: 'api' }

  const testRunner = new SchematicTestRunner('@nxpm/api-data-access-core', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('api-data-access-core', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
