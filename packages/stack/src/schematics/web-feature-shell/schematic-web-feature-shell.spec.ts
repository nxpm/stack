import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebFeatureShellSchematicSchema } from './schema'

describe('web-feature-shell schematic', () => {
  let appTree: Tree
  const options: WebFeatureShellSchematicSchema = { appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/web-feature-shell', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('web-feature-shell', options, appTree).toPromise(),
    ).resolves.not.toThrowError()

    expect(appTree.read('libs/test/shell/feature/src/lib/test-shell-feature.module.ts').toString()).toMatchSnapshot()
  })
})
