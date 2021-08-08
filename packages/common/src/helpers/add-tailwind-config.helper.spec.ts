import { readProjectConfiguration, Tree } from '@nrwl/devkit'
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { addTailwindConfig } from './add-tailwind-config.helper'
import { applicationGenerator } from '@nrwl/angular/generators'

describe('add-tailwind-config helper', () => {
  let appTree: Tree
  const options = { name: 'app-name-test' }
  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should add Tailwind Config', async () => {
    await applicationGenerator(appTree, options)
    addTailwindConfig(appTree, options.name)
    const app = readProjectConfiguration(appTree, options.name)

    expect(appTree.read(`${app.sourceRoot}/index.html`).toString()).toMatchSnapshot()
    expect(appTree.read('tailwind.config.js').toString()).toMatchSnapshot()
  })
})
