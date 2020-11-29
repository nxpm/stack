import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebAboutFeatureSchematicSchema } from './schema'

describe('web-about-feature schematic', () => {
  let appTree: Tree
  const options: WebAboutFeatureSchematicSchema = { name: 'test', appName: 'web' }

  const testRunner = new SchematicTestRunner('@nxpm/web-about-feature', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('web-about-feature', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
