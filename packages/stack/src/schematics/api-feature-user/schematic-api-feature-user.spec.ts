import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { ApiFeatureUserSchematicSchema } from './schema'

describe('api-feature-user schematic', () => {
  let appTree: Tree
  const options: ApiFeatureUserSchematicSchema = { appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/api-feature-user', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('api-feature-user', options, appTree).toPromise(),
    ).resolves.not.toThrowError()

    expect(appTree.read('libs/test/user/feature/src/lib/test-user-feature.module.ts').toString()).toContain(
      'TestUserFeatureAdminResolver',
    )
    expect(appTree.read('libs/test/user/feature/src/lib/test-user-feature.resolver.ts').toString()).toContain(
      'TestUserDataAccessService',
    )
    expect(appTree.read('libs/test/user/feature/src/lib/test-user-feature-admin.resolver.ts').toString()).toContain(
      'TestUserDataAccessService',
    )
  })
})
