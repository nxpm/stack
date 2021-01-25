import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebFeatureAccountSchematicSchema } from './schema'

describe('web-feature-account schematic', () => {
  let appTree: Tree
  const options: WebFeatureAccountSchematicSchema = { appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/web-feature-account', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('web-feature-account', options, appTree).toPromise(),
    ).resolves.not.toThrowError()

    expect(
      appTree.read('libs/test/account/feature/src/lib/test-account-feature.module.ts').toString(),
    ).toMatchSnapshot()
  })
})
