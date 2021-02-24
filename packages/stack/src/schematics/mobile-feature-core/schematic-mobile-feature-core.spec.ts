import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { MobileFeatureCoreSchematicSchema } from './schema'

describe('mobile-feature-core schematic', () => {
  let appTree: Tree
  const options: MobileFeatureCoreSchematicSchema = { appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/mobile-feature-core', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('mobile-feature-core', options, appTree).toPromise(),
    ).resolves.not.toThrowError()

    expect(appTree.read('libs/test/core/feature/src/lib/test-core-feature.module.ts').toString()).toMatchSnapshot()
  })
})
