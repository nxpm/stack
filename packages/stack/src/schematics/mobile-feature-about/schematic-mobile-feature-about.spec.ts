import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { MobileFeatureAboutSchematicSchema } from './schema'

describe('mobile-feature-about schematic', () => {
  let appTree: Tree
  const options: MobileFeatureAboutSchematicSchema = { appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/mobile-feature-about', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('mobile-feature-about', options, appTree).toPromise(),
    ).resolves.not.toThrowError()

    expect(appTree.read('libs/test/about/feature/src/lib/test-about-feature.module.ts').toString()).toMatchSnapshot()
  })
})
