import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { WebStyleSchematicSchema } from './schema'

describe('web-style schematic', () => {
  let appTree: Tree
  const options: WebStyleSchematicSchema = { name: 'style', appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/web-style', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    const app = await testRunner.runSchematicAsync('web', { name: 'test' }, appTree).toPromise()
    await expect(testRunner.runSchematicAsync('web-style', options, app).toPromise()).resolves.not.toThrowError()
  })
})

describe('web-style schematic with tailwind', () => {
  let appTree: Tree
  const options: WebStyleSchematicSchema = { name: 'style', appName: 'test2', library: 'tailwind' }

  const testRunner = new SchematicTestRunner('@nxpm/web-style', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should add and run @ngneat/tailwind schematic', async () => {
    const app = await testRunner.runSchematicAsync('web', { name: 'test2' }, appTree).toPromise()
    await expect(testRunner.runSchematicAsync('web-style', options, app).toPromise()).resolves.not.toThrowError()
    expect(app.exists('tailwind.config.js')).toBeDefined()
    expect(app.exists('webpack.config.js')).toBeDefined()
  })
})
