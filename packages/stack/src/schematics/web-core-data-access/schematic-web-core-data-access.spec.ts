import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebCoreDataAccessSchematicSchema } from './schema'

describe('web-core-data-access schematic', () => {
  let appTree: Tree
  const options: WebCoreDataAccessSchematicSchema = { name: 'core', appName: 'web-app' }

  const testRunner = new SchematicTestRunner('@nxpm/web-core-data-access', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('web-core-data-access', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
    const codegenPath = 'core/data-access/src/codegen.yml'
    expect(appTree.read('package.json').toString()).toContain(codegenPath)
  })
})
