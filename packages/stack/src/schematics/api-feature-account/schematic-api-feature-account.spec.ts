import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { ApiFeatureAccountSchematicSchema } from './schema'

describe('api-feature-account schematic', () => {
  let appTree: Tree
  const options: ApiFeatureAccountSchematicSchema = { appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/api-feature-account', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('api-feature-account', options, appTree).toPromise(),
    ).resolves.not.toThrowError()

    expect(
      appTree.read('libs/test/account/feature/src/lib/test-account-feature.module.ts').toString(),
    ).toMatchSnapshot()
    expect(
      appTree.read('libs/test/account/feature/src/lib/test-account-feature.resolver.ts').toString(),
    ).toMatchSnapshot()
  })
})
