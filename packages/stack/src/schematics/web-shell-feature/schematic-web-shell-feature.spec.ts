import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebShellFeatureSchematicSchema } from './schema'

describe('web-shell-feature schematic', () => {
  let appTree: Tree
  const options: WebShellFeatureSchematicSchema = { name: 'test', appName: 'web' }

  const testRunner = new SchematicTestRunner('@nxpm/web-shell-feature', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('web-shell-feature', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
