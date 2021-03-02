import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { MobileStyleSchematicSchema } from './schema'

describe('mobile-style schematic', () => {
  let appTree: Tree
  const options: MobileStyleSchematicSchema = { name: 'style', appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/mobile-style', join(__dirname, '../../../collection.json'))

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
    const app = await testRunner.runSchematicAsync('mobile', { name: 'test' }, appTree).toPromise()
    await expect(testRunner.runSchematicAsync('mobile-style', options, app).toPromise()).resolves.not.toThrowError()
  })
})
