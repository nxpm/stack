import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { ApiFeatureAuthSchematicSchema } from './schema'

describe('api-feature-auth schematic', () => {
  let appTree: Tree
  const options: ApiFeatureAuthSchematicSchema = { appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/api-feature-auth', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('api-feature-auth', options, appTree).toPromise(),
    ).resolves.not.toThrowError()

    expect(
      appTree.read('libs/test/auth/data-access/src/lib/test-auth-data-access.module.ts').toString(),
    ).toMatchSnapshot()
    expect(
      appTree.read('libs/test/auth/data-access/src/lib/test-auth-data-access.service.ts').toString(),
    ).toMatchSnapshot()
    expect(appTree.read('libs/test/auth/feature/src/lib/test-auth-feature.module.ts').toString()).toMatchSnapshot()
    expect(appTree.read('libs/test/auth/feature/src/lib/test-auth-feature.resolver.ts').toString()).toMatchSnapshot()
  })
})
