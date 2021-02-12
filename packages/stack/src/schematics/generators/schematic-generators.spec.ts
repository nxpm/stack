import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { InitSchematicSchema } from './schema'

describe('generators schematic', () => {
  let appTree: Tree
  const options: InitSchematicSchema = { name: '' }

  const testRunner = new SchematicTestRunner('@nxpm/generators', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync('generators', options, appTree).toPromise()).resolves.not.toThrowError()
    expect(appTree.getDir('tools/generators').subdirs.toString()).toMatchSnapshot()
  })
})
