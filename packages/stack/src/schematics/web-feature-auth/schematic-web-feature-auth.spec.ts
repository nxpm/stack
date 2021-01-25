import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebFeatureAuthSchematicSchema } from './schema'

describe('web-feature-auth schematic', () => {
  let appTree: Tree
  const options: WebFeatureAuthSchematicSchema = { appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/web-feature-auth', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('web-feature-auth', options, appTree).toPromise(),
    ).resolves.not.toThrowError()

    expect(appTree.read('libs/test/auth/feature/src/lib/test-auth-feature.module.ts').toString()).toMatchSnapshot()
  })
})
