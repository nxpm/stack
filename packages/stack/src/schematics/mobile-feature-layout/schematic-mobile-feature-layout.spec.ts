import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { MobileFeatureLayoutSchematicSchema } from './schema'

describe('mobile-feature-layout schematic', () => {
  let appTree: Tree
  const options: MobileFeatureLayoutSchematicSchema = { name: 'layout', appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/mobile-feature-layout', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('mobile-feature-layout', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
