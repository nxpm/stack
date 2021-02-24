import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { MobileFeatureAuthSchematicSchema } from './schema'

describe('mobile-feature-auth schematic', () => {
  let appTree: Tree
  const options: MobileFeatureAuthSchematicSchema = { appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/mobile-feature-auth', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('mobile-feature-auth', options, appTree).toPromise(),
    ).resolves.not.toThrowError()

    expect(appTree.read('libs/test/auth/feature/src/lib/test-auth-feature.module.ts').toString()).toMatchSnapshot()
  })
})
