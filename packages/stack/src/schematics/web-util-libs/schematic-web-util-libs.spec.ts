import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebUtilLibsSchematicSchema } from './schema'

describe('web-util-libs schematic', () => {
  let appTree: Tree
  const options: WebUtilLibsSchematicSchema = { appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/web-util-libs', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('web-util-libs', options, appTree).toPromise(),
    ).resolves.not.toThrowError()

    expect(appTree.read('libs/test/util/sdk/src/index.ts').toString()).toMatchSnapshot()
  })
})
