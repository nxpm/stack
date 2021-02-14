import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { SharedUtilLibsSchematicSchema } from './schema'

describe('shared-util-libs schematic', () => {
  let appTree: Tree
  const options: SharedUtilLibsSchematicSchema = { appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/shared-util-libs', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('shared-util-libs', options, appTree).toPromise(),
    ).resolves.not.toThrowError()

    expect(appTree.read('libs/shared/util/sdk/src/index.ts').toString()).toMatchSnapshot()
  })
})
