import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { ApiDataAccessAuthSchematicSchema } from './schema'

describe('api-data-access-auth schematic', () => {
  let appTree: Tree
  const options: ApiDataAccessAuthSchematicSchema = { name: 'test', appName: 'api' }

  const testRunner = new SchematicTestRunner('@nxpm/api-data-access-auth', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('api-data-access-auth', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
