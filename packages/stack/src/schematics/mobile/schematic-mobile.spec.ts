import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { MobileSchematicSchema } from './schema'

describe('mobile schematic', () => {
  let appTree: Tree
  const options: MobileSchematicSchema = { name: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/mobile', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
    appTree.overwrite(
      'package.json',
      `
      {
        "name": "test-name",
        "dependencies": {},
        "devDependencies": {
          "@nrwl/workspace": "0.0.0"
        }
      }
      `,
    )
  })

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync('mobile', options, appTree).toPromise()).resolves.not.toThrowError()
  })
})
