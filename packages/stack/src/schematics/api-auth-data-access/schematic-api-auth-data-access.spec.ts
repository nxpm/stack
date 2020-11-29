import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { ApiAuthDataAccessSchematicSchema } from './schema'

describe('api-auth-data-access schematic', () => {
  let appTree: Tree
  const options: ApiAuthDataAccessSchematicSchema = { name: 'test', appName: 'api' }

  const testRunner = new SchematicTestRunner(
    '@nxpm/api-auth-data-accessauth',
    join(__dirname, '../../../collection.json'),
  )

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('api-auth-data-access', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
